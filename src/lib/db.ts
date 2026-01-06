import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = neon(databaseUrl);
  return drizzle(client, { schema });
}

export async function ensureUser(user: { sub: string; email?: string | null; name?: string | null }) {
  const db = getDb();
  await db
    .insert(schema.users)
    .values({ id: user.sub, email: user.email ?? null, name: user.name ?? null })
    .onConflictDoUpdate({
      target: schema.users.id,
      set: { email: user.email ?? null, name: user.name ?? null },
    });
}
