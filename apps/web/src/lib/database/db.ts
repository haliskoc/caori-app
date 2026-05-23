import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "@/lib/database/schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = neon(databaseUrl);
  return drizzle(client, { schema });
}

export async function ensureUser(user: {
  sub: string;
  email?: string | null;
  name?: string | null;
}) {
  const db = getDb();
  
  // First, try to find if user exists
  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.sub),
  });
  
  if (existing) {
    // Update existing user
    await db
      .update(schema.users)
      .set({ email: user.email ?? null, name: user.name ?? null })
      .where(eq(schema.users.id, user.sub));
  } else {
    // Insert new user with explicit values for fields with defaults
    await db.insert(schema.users).values({
      id: user.sub,
      email: user.email ?? null,
      name: user.name ?? null,
      plan: "free",
      subscriptionStatus: "active",
      usageCount: 0,
      webSearchCount: 0,
    });
  }
}
