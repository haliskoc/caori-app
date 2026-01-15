import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { and, eq } from "drizzle-orm";
import { foodLibrary } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { createId } from "@/lib/core/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const items = await db
    .select()
    .from(foodLibrary)
    .where(eq(foodLibrary.userId, session.user.sub));
  return NextResponse.json(items);
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
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const caloriesPer100 = toSafeNumber(body?.caloriesPer100, 0, {
    min: 0,
    max: 2000,
    integer: true,
  });
  const proteinPer100 = toSafeNumber(body?.proteinPer100, 0, {
    min: 0,
    max: 500,
    integer: true,
  });
  const carbsPer100 = toSafeNumber(body?.carbsPer100, 0, {
    min: 0,
    max: 500,
    integer: true,
  });
  const fatPer100 = toSafeNumber(body?.fatPer100, 0, {
    min: 0,
    max: 500,
    integer: true,
  });

  const source = body?.source === "off" ? "off" : "manual";
  const favorite = Boolean(body?.favorite);
  const barcode = typeof body?.barcode === "string" ? body.barcode.trim() : null;
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl.trim() : null;

  await ensureUser(session.user);
  const db = getDb();
  const id = createId();
  await db.insert(foodLibrary).values({
    id,
    userId: session.user.sub,
    name,
    caloriesPer100,
    proteinPer100: proteinPer100 || null,
    carbsPer100: carbsPer100 || null,
    fatPer100: fatPer100 || null,
    barcode,
    imageUrl,
    source,
    favorite,
    updatedAt: new Date(),
  });

  const [row] = await db
    .select()
    .from(foodLibrary)
    .where(and(eq(foodLibrary.id, id), eq(foodLibrary.userId, session.user.sub)));
  return NextResponse.json(row);
}
