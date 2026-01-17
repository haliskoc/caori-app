import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { entries } from "@/lib/database/schema";
import { getDb } from "@/lib/database/db";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { t } from "@/lib/core/i18n";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export const dynamic = "force-dynamic";

const allowedMeals = new Set(["breakfast", "lunch", "dinner", "snack"]);
const allowedActivities = new Set([
  "walking",
  "running",
  "gym",
  "cycling",
  "swimming",
  "yoga",
  "hiit",
  "pilates",
  "stairs",
]);

function toOptionalNumber(
  value: unknown,
  options: { min: number; max: number },
) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return toSafeNumber(value, 0, { ...options, integer: true });
}

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
  const activityNote =
    typeof body?.note === "string" && body.note.trim()
      ? body.note.trim().slice(0, 200)
      : null;
  const type = String(body?.type ?? "");
  if (
    type !== "food" &&
    type !== "water" &&
    type !== "drink" &&
    type !== "activity"
  ) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const timestamp = body?.timestamp ? new Date(body.timestamp) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }

  const update: Partial<typeof entries.$inferInsert> = {
    timestamp,
  };

  if (type === "food") {
    update.name = String(body?.name ?? t("Belirtilmedi"))
      .trim()
      .slice(0, 120);
    update.calories = toSafeNumber(body?.calories, 0, {
      min: 0,
      max: 50000,
      integer: true,
    });
    update.mealType = allowedMeals.has(String(body?.mealType))
      ? String(body?.mealType)
      : "snack";
    update.amountG = toOptionalNumber(body?.amountG, { min: 0, max: 5000 });
    update.proteinG = toOptionalNumber(body?.proteinG, { min: 0, max: 5000 });
    update.carbsG = toOptionalNumber(body?.carbsG, { min: 0, max: 5000 });
    update.fatG = toOptionalNumber(body?.fatG, { min: 0, max: 5000 });
    update.amountMl = null;
    update.activityType = null;
    update.durationMin = null;
    update.estimatedCalories = null;
  } else if (type === "drink") {
    update.name = String(body?.name ?? t("Belirtilmedi"))
      .trim()
      .slice(0, 120);
    update.calories = toSafeNumber(body?.calories, 0, {
      min: 0,
      max: 50000,
      integer: true,
    });
    update.amountMl = toSafeNumber(body?.amountMl, 0, {
      min: 0,
      max: 20000,
      integer: true,
    });
    update.proteinG = toOptionalNumber(body?.proteinG, { min: 0, max: 5000 });
    update.carbsG = toOptionalNumber(body?.carbsG, { min: 0, max: 5000 });
    update.fatG = toOptionalNumber(body?.fatG, { min: 0, max: 5000 });
    update.mealType = null;
    update.amountG = null;
    update.activityType = null;
    update.durationMin = null;
    update.estimatedCalories = null;
  } else if (type === "water") {
    update.amountMl = toSafeNumber(body?.amountMl, 0, {
      min: 0,
      max: 20000,
      integer: true,
    });
    update.name = null;
    update.calories = null;
    update.mealType = null;
    update.amountG = null;
    update.proteinG = null;
    update.carbsG = null;
    update.fatG = null;
    update.activityType = null;
    update.durationMin = null;
    update.estimatedCalories = null;
  } else {
    update.activityType = allowedActivities.has(String(body?.activityType))
      ? String(body?.activityType)
      : "walking";
    update.durationMin = toSafeNumber(body?.durationMin, 0, {
      min: 0,
      max: 1440,
      integer: true,
    });
    update.estimatedCalories = toSafeNumber(body?.estimatedCalories, 0, {
      min: 0,
      max: 50000,
      integer: true,
    });
    update.name = activityNote;
    update.calories = null;
    update.mealType = null;
    update.amountG = null;
    update.proteinG = null;
    update.carbsG = null;
    update.fatG = null;
    update.amountMl = null;
  }

  const db = getDb();
  await db
    .update(entries)
    .set(update)
    .where(and(eq(entries.id, id), eq(entries.userId, principal.userId)));

  const [row] = await db
    .select()
    .from(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, principal.userId)));
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
  await db
    .delete(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, principal.userId)));

  return NextResponse.json({ success: true });
}
