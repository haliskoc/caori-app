import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { foodLibrary } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const update: Partial<typeof foodLibrary.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (typeof body?.name === "string" && body.name.trim()) {
    update.name = body.name.trim();
  }
  if (body?.caloriesPer100 !== undefined) {
    update.caloriesPer100 = toSafeNumber(body.caloriesPer100, 0, {
      min: 0,
      max: 2000,
      integer: true,
    });
  }
  if (body?.proteinPer100 !== undefined) {
    const value = toSafeNumber(body.proteinPer100, 0, {
      min: 0,
      max: 500,
      integer: true,
    });
    update.proteinPer100 = value || null;
  }
  if (body?.carbsPer100 !== undefined) {
    const value = toSafeNumber(body.carbsPer100, 0, {
      min: 0,
      max: 500,
      integer: true,
    });
    update.carbsPer100 = value || null;
  }
  if (body?.fatPer100 !== undefined) {
    const value = toSafeNumber(body.fatPer100, 0, {
      min: 0,
      max: 500,
      integer: true,
    });
    update.fatPer100 = value || null;
  }
  if (body?.barcode !== undefined) {
    update.barcode =
      typeof body.barcode === "string" ? body.barcode.trim() : null;
  }
  if (body?.imageUrl !== undefined) {
    update.imageUrl =
      typeof body.imageUrl === "string" ? body.imageUrl.trim() : null;
  }
  if (body?.source !== undefined) {
    update.source = body.source === "off" ? "off" : "manual";
  }
  if (body?.favorite !== undefined) {
    update.favorite = Boolean(body.favorite);
  }

  const db = getDb();
  await db
    .update(foodLibrary)
    .set(update)
    .where(
      and(eq(foodLibrary.id, id), eq(foodLibrary.userId, principal.userId)),
    );

  const [row] = await db
    .select()
    .from(foodLibrary)
    .where(
      and(eq(foodLibrary.id, id), eq(foodLibrary.userId, principal.userId)),
    );
  return NextResponse.json(row ?? null);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  await db
    .delete(foodLibrary)
    .where(
      and(eq(foodLibrary.id, id), eq(foodLibrary.userId, principal.userId)),
    );

  return NextResponse.json({ success: true });
}
