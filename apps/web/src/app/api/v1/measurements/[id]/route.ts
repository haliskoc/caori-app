import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { measurements } from "@/lib/database/schema";
import { getDb } from "@/lib/database/db";
import { and, eq } from "drizzle-orm";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["weight", "waist", "hip", "chest", "bodyFat"]);

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const update: Partial<typeof measurements.$inferInsert> = {};

  if (body?.type !== undefined) {
    const nextType = String(body.type ?? "");
    if (!allowedTypes.has(nextType)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    update.type = nextType;
  }

  if (body?.value !== undefined) {
    const value = toSafeNumber(body.value, 0, { min: 0.1, max: 1000 });
    if (!Number.isFinite(value) || value <= 0) {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }
    update.value = value;
  }

  if (body?.unit !== undefined) {
    update.unit = typeof body.unit === "string" ? body.unit.trim() : "";
  }

  if (body?.timestamp !== undefined) {
    const timestamp = new Date(body.timestamp);
    if (Number.isNaN(timestamp.getTime())) {
      return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
    }
    update.timestamp = timestamp;
  }

  const db = getDb();
  await db
    .update(measurements)
    .set(update)
    .where(and(eq(measurements.id, id), eq(measurements.userId, session.user.sub)));

  const [row] = await db
    .select()
    .from(measurements)
    .where(and(eq(measurements.id, id), eq(measurements.userId, session.user.sub)));
  return NextResponse.json(row ?? null);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  await db
    .delete(measurements)
    .where(and(eq(measurements.id, id), eq(measurements.userId, session.user.sub)));

  return NextResponse.json({ success: true });
}
