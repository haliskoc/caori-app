import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { entries, goals } from "@/lib/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { toSafeNumber } from "@/lib/security";
import { buildReportData } from "@/lib/report";
import type { ActivityType, Entry, MealType } from "@/lib/types";

export const dynamic = "force-dynamic";

type EntryRow = typeof entries.$inferSelect;

const allowedMeals: MealType[] = ["breakfast", "lunch", "dinner", "snack"];
const allowedActivities: ActivityType[] = ["walking", "running", "gym"];

function toIso(value: unknown) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

function normalizeEntry(row: EntryRow): Entry | null {
  const timestamp = toIso(row.timestamp);
  if (row.type === "water") {
    return {
      id: row.id,
      type: "water",
      amountMl: row.amountMl ?? 0,
      timestamp,
    };
  }
  if (row.type === "activity") {
    return {
      id: row.id,
      type: "activity",
      activityType: allowedActivities.includes(row.activityType as ActivityType)
        ? (row.activityType as ActivityType)
        : "walking",
      durationMin: row.durationMin ?? 0,
      estimatedCalories: row.estimatedCalories ?? 0,
      timestamp,
    };
  }
  if (row.type === "food") {
    return {
      id: row.id,
      type: "food",
      name: row.name ?? "Belirtilmedi",
      calories: row.calories ?? 0,
      mealType: allowedMeals.includes(row.mealType as MealType)
        ? (row.mealType as MealType)
        : "snack",
      amountG: row.amountG ?? undefined,
      proteinG: row.proteinG ?? undefined,
      carbsG: row.carbsG ?? undefined,
      fatG: row.fatG ?? undefined,
      timestamp,
    };
  }
  return null;
}

export async function GET(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rangeParam = request.nextUrl.searchParams.get("range");
  const rangeDays = toSafeNumber(rangeParam, 30, { min: 1, max: 90, integer: true });

  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - rangeDays + 1);

  await ensureUser(session.user);
  const db = getDb();
  const data = await db
    .select()
    .from(entries)
    .where(
      and(
        eq(entries.userId, session.user.sub),
        gte(entries.timestamp, start),
        lte(entries.timestamp, end)
      )
    );

  const [goalRow] = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
  const normalized = data
    .map((row) => normalizeEntry(row))
    .filter((entry): entry is Entry => Boolean(entry));
  const report = buildReportData(
    normalized,
    rangeDays,
    goalRow
      ? {
          calorieGoal: goalRow.calorieGoal,
          waterGoalMl: goalRow.waterGoalMl,
          activityGoalMin: goalRow.activityGoalMin ?? 30,
          mealGoalCount: goalRow.mealGoalCount ?? 3,
          weightGoalKg: goalRow.weightGoalKg ?? 0,
        }
      : undefined
  );

  return NextResponse.json(report);
}
