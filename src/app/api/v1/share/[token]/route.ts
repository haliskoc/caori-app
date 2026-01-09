import { NextResponse } from "next/server";
import { and, eq, gte, lte, desc } from "drizzle-orm";
import { entries, goals, measurements, profiles, reportShares } from "@/lib/schema";
import { getDb } from "@/lib/db";
import { buildReportData } from "@/lib/report";
import type { ActivityType, Entry, MealType, MeasurementEntry } from "@/lib/types";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type EntryRow = typeof entries.$inferSelect;

const allowedMeals: MealType[] = ["breakfast", "lunch", "dinner", "snack"];
const allowedActivities: ActivityType[] = [
  "walking",
  "running",
  "gym",
  "cycling",
  "swimming",
  "yoga",
  "hiit",
  "pilates",
  "stairs",
];

function normalizeEntry(row: EntryRow): Entry | null {
  const timestamp = row.timestamp instanceof Date ? row.timestamp : new Date(row.timestamp);
  const safeTimestamp = Number.isNaN(timestamp.getTime())
    ? new Date().toISOString()
    : timestamp.toISOString();
  if (row.type === "water") {
    return {
      id: row.id,
      type: "water",
      amountMl: row.amountMl ?? 0,
      timestamp: safeTimestamp,
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
      timestamp: safeTimestamp,
    };
  }
  if (row.type === "food") {
    return {
      id: row.id,
      type: "food",
      name: row.name ?? t("Belirtilmedi"),
      calories: row.calories ?? 0,
      mealType: allowedMeals.includes(row.mealType as MealType)
        ? (row.mealType as MealType)
        : "snack",
      amountG: row.amountG ?? undefined,
      proteinG: row.proteinG ?? undefined,
      carbsG: row.carbsG ?? undefined,
      fatG: row.fatG ?? undefined,
      timestamp: safeTimestamp,
    };
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const db = getDb();
  const [share] = await db
    .select()
    .from(reportShares)
    .where(eq(reportShares.id, token));

  if (!share) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (share.expiresAt && share.expiresAt < new Date()) {
    return NextResponse.json({ error: "Expired" }, { status: 410 });
  }

  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - share.rangeDays + 1);

  const data = await db
    .select()
    .from(entries)
    .where(
      and(
        eq(entries.userId, share.userId),
        gte(entries.timestamp, start),
        lte(entries.timestamp, end)
      )
    );
  const [goalRow] = await db.select().from(goals).where(eq(goals.userId, share.userId));
  const normalized = data
    .map((row) => normalizeEntry(row))
    .filter((entry): entry is Entry => Boolean(entry));

  const report = buildReportData(
    normalized,
    share.rangeDays,
    goalRow
      ? {
          calorieGoal: goalRow.calorieGoal,
          waterGoalMl: goalRow.waterGoalMl,
          activityGoalMin: goalRow.activityGoalMin ?? 30,
          mealGoalCount: goalRow.mealGoalCount ?? 3,
          weightGoalKg: goalRow.weightGoalKg ?? 0,
          proteinGoalG: goalRow.proteinGoalG ?? 0,
          carbsGoalG: goalRow.carbsGoalG ?? 0,
          fatGoalG: goalRow.fatGoalG ?? 0,
        }
      : undefined
  );

  const measurementRows = await db
    .select()
    .from(measurements)
    .where(eq(measurements.userId, share.userId))
    .orderBy(desc(measurements.timestamp))
    .limit(180);

  const measurementData: MeasurementEntry[] = measurementRows.map((row) => ({
    id: row.id,
    type: row.type as MeasurementEntry["type"],
    value: Number(row.value),
    unit: row.unit,
    timestamp: row.timestamp.toISOString(),
  }));

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, share.userId));

  return NextResponse.json({
    share: {
      rangeDays: share.rangeDays,
      expiresAt: share.expiresAt?.toISOString() ?? null,
      createdAt: share.createdAt?.toISOString() ?? null,
    },
    report,
    measurements: measurementData,
    profile: {
      fullName: profile?.fullName ?? "",
      weightKg: profile?.weightKg ?? null,
    },
  });
}
