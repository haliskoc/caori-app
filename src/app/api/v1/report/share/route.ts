import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { reportShares } from "@/lib/schema";
import { isSameOrigin, toSafeNumber } from "@/lib/security";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
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

  await ensureUser(session.user);
  const db = getDb();
  await db.insert(reportShares).values({
    id: token,
    userId: session.user.sub,
    rangeDays,
    expiresAt,
  });

  return NextResponse.json({ token, rangeDays, expiresAt }, { status: 201 });
}
