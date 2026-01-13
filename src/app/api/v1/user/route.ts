import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const [row] = await db.select().from(users).where(eq(users.id, session.user.sub));
  const plan = row?.plan ?? "free";

  return NextResponse.json({
    plan,
    subscriptionStatus: row?.subscriptionStatus ?? "active",
    isPremium: plan !== "free",
  });
}
