import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureUser } from "@/lib/database/db";
import { users } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { getApiPrincipal } from "@/lib/auth/api-auth";
import { isSameOrigin } from "@/lib/auth/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();
  const [row] = await db.select().from(users).where(eq(users.id, principal.userId));
  const plan = row?.plan ?? "free";

  return NextResponse.json({
    plan,
    subscriptionStatus: row?.subscriptionStatus ?? "active",
    isPremium: plan !== "free",
  });
}
