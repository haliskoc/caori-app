import { NextResponse } from "next/server";
import { getDb, ensureUser } from "@/lib/database/db";
import { reportShares } from "@/lib/database/schema";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { nanoid } from "nanoid";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const rangeDays = toSafeNumber(body?.rangeDays, 30, {
    min: 7,
    max: 90,
    integer: true,
  });
  const expiresInDays = toSafeNumber(body?.expiresInDays, 30, {
    min: 1,
    max: 90,
    integer: true,
  });
  const token = nanoid(12);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();
  await db.insert(reportShares).values({
    id: token,
    userId: principal.userId,
    rangeDays,
    expiresAt,
  });

  return NextResponse.json({ token, rangeDays, expiresAt }, { status: 201 });
}
