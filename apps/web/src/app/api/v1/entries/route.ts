import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { entries } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { createId } from "@/lib/core/utils";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { t } from "@/lib/core/i18n";
import { getApiPrincipal } from "@/lib/auth/api-auth";
import { getDayKey } from "@calai/shared";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["food", "water", "drink", "activity"]);
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

export async function GET(request: Request) {
  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const data = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, principal.userId))
    .orderBy(desc(entries.timestamp));

  if (!date) {
    return NextResponse.json(data);
  }

  const dayKey = getDayKey(date);
  const filtered = data.filter(
    (entry) => getDayKey(entry.timestamp) === dayKey,
  );
  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const type = body?.type as string;
  if (!type || !allowedTypes.has(type)) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  const timestamp = body?.timestamp ? new Date(body.timestamp) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }
  const activityNote =
    typeof body?.note === "string" && body.note.trim()
      ? body.note.trim().slice(0, 200)
      : null;

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();

  const entry = {
    id: createId(),
    userId: principal.userId,
    type,
    name:
      type === "food" || type === "drink"
        ? String(body?.name ?? t("Belirtilmedi"))
            .trim()
            .slice(0, 120)
        : type === "activity"
          ? activityNote
          : null,
    calories:
      type === "food" || type === "drink"
        ? toSafeNumber(body?.calories, 0, { min: 0, max: 50000, integer: true })
        : null,
    mealType:
      type === "food" && allowedMeals.has(String(body?.mealType))
        ? String(body?.mealType)
        : type === "food"
          ? "snack"
          : null,
    amountG:
      type === "food"
        ? toOptionalNumber(body?.amountG, { min: 0, max: 5000 })
        : null,
    proteinG:
      type === "food" || type === "drink"
        ? toOptionalNumber(body?.proteinG, { min: 0, max: 5000 })
        : null,
    carbsG:
      type === "food" || type === "drink"
        ? toOptionalNumber(body?.carbsG, { min: 0, max: 5000 })
        : null,
    fatG:
      type === "food" || type === "drink"
        ? toOptionalNumber(body?.fatG, { min: 0, max: 5000 })
        : null,
    amountMl:
      type === "water" || type === "drink"
        ? toSafeNumber(body?.amountMl, 0, { min: 0, max: 20000, integer: true })
        : null,
    activityType:
      type === "activity" && allowedActivities.has(String(body?.activityType))
        ? String(body?.activityType)
        : type === "activity"
          ? "walking"
          : null,
    durationMin:
      type === "activity"
        ? toSafeNumber(body?.durationMin, 0, {
            min: 0,
            max: 1440,
            integer: true,
          })
        : null,
    estimatedCalories:
      type === "activity"
        ? toSafeNumber(body?.estimatedCalories, 0, {
            min: 0,
            max: 50000,
            integer: true,
          })
        : null,
    timestamp,
  };

  const [created] = await db.insert(entries).values(entry).returning();
  return NextResponse.json(created, { status: 201 });
}
