import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { entries } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { createId } from "@/lib/core/utils";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { t } from "@/lib/core/i18n";

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
const MAX_IMPORT = 500;

function toOptionalNumber(value: unknown, options: { min: number; max: number }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return toSafeNumber(value, 0, { ...options, integer: true });
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
  const items = Array.isArray(body) ? body : body?.entries;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();

  const prepared = items
    .map((item) => {
      const type = String(item?.type ?? "");
      if (!allowedTypes.has(type)) {
        return null;
      }
      const timestamp = item?.timestamp ? new Date(item.timestamp) : new Date();
      const activityNote =
        typeof item?.note === "string" && item.note.trim()
          ? item.note.trim().slice(0, 200)
          : null;
      return {
        id: item?.id ? String(item.id) : createId(),
        userId: session.user.sub,
        type,
         name:
           type === "food" || type === "drink"
             ? String(item?.name ?? t("Belirtilmedi")).trim().slice(0, 120)
             : type === "activity"
               ? activityNote
               : null,
         calories:
           type === "food" || type === "drink"
             ? toSafeNumber(item?.calories, 0, { min: 0, max: 50000, integer: true })
             : null,
         mealType:
           type === "food" && allowedMeals.has(String(item?.mealType))
             ? String(item?.mealType)
             : type === "food"
               ? "snack"
               : null,
         amountG:
           type === "food" ? toOptionalNumber(item?.amountG, { min: 0, max: 5000 }) : null,
         proteinG:
           type === "food" || type === "drink"
             ? toOptionalNumber(item?.proteinG, { min: 0, max: 5000 })
             : null,
         carbsG:
           type === "food" || type === "drink"
             ? toOptionalNumber(item?.carbsG, { min: 0, max: 5000 })
             : null,
         fatG:
           type === "food" || type === "drink"
             ? toOptionalNumber(item?.fatG, { min: 0, max: 5000 })
             : null,
         amountMl:
           type === "water" || type === "drink"
             ? toSafeNumber(item?.amountMl, 0, { min: 0, max: 20000, integer: true })
             : null,

        activityType:
          type === "activity" && allowedActivities.has(String(item?.activityType))
            ? String(item?.activityType)
            : type === "activity"
              ? "walking"
              : null,
        durationMin:
          type === "activity"
            ? toSafeNumber(item?.durationMin, 0, { min: 0, max: 1440, integer: true })
            : null,
        estimatedCalories:
          type === "activity"
            ? toSafeNumber(item?.estimatedCalories, 0, {
                min: 0,
                max: 50000,
                integer: true,
              })
            : null,
        timestamp: Number.isNaN(timestamp.getTime()) ? new Date() : timestamp,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, MAX_IMPORT);

  if (prepared.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  await db.insert(entries).values(prepared).onConflictDoNothing();
  return NextResponse.json({ imported: prepared.length });
}
