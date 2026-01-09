import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { measurements } from "@/lib/schema";
import { getDb, ensureUser } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { isSameOrigin, toSafeNumber } from "@/lib/security";
import { createId } from "@/lib/utils";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["weight", "waist", "hip", "chest", "bodyFat"]);
const unitByType: Record<string, string> = {
  weight: "kg",
  waist: "cm",
  hip: "cm",
  chest: "cm",
  bodyFat: "%",
};

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const rows = await db
    .select()
    .from(measurements)
    .where(eq(measurements.userId, session.user.sub))
    .orderBy(desc(measurements.timestamp));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const type = String(body?.type ?? "");
  if (!allowedTypes.has(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const value = toSafeNumber(body?.value, 0, { min: 0.1, max: 1000 });
  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json({ error: "Invalid value" }, { status: 400 });
  }
  const unit = typeof body?.unit === "string" && body.unit.trim()
    ? body.unit.trim()
    : unitByType[type];
  const timestamp = body?.timestamp ? new Date(body.timestamp) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const id = createId();
  await db.insert(measurements).values({
    id,
    userId: session.user.sub,
    type,
    value,
    unit,
    timestamp,
  });
  const [row] = await db
    .select()
    .from(measurements)
    .where(eq(measurements.id, id));
  return NextResponse.json(row ?? null, { status: 201 });
}
