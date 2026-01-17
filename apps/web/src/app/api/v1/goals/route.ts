import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { goals } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { isSameOrigin, toSafeNumber } from "@/lib/auth/security";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export const dynamic = "force-dynamic";

async function ensureGoals(userId: string) {
  const db = getDb();
  await db.insert(goals).values({ userId }).onConflictDoNothing();
  const [row] = await db.select().from(goals).where(eq(goals.userId, userId));
  return row;
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
  const row = await ensureGoals(principal.userId);
  return NextResponse.json(row);
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const waterGoalMl = toSafeNumber(body?.waterGoalMl, 2500, {
    min: 0,
    max: 100000,
    integer: true,
  });
  const calorieGoal = toSafeNumber(body?.calorieGoal, 2200, {
    min: 0,
    max: 20000,
    integer: true,
  });
  const activityGoalMin = toSafeNumber(body?.activityGoalMin, 30, {
    min: 0,
    max: 1000,
    integer: true,
  });
  const mealGoalCount = toSafeNumber(body?.mealGoalCount, 3, {
    min: 0,
    max: 10,
    integer: true,
  });
  const weightGoalKg = toSafeNumber(body?.weightGoalKg, 0, {
    min: 0,
    max: 500,
    integer: true,
  });
  const proteinGoalG = toSafeNumber(body?.proteinGoalG, 0, {
    min: 0,
    max: 1000,
    integer: true,
  });
  const carbsGoalG = toSafeNumber(body?.carbsGoalG, 0, {
    min: 0,
    max: 1500,
    integer: true,
  });
  const fatGoalG = toSafeNumber(body?.fatGoalG, 0, {
    min: 0,
    max: 500,
    integer: true,
  });

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();
  await db
    .insert(goals)
    .values({
      userId: principal.userId,
      waterGoalMl,
      calorieGoal,
      activityGoalMin,
      mealGoalCount,
      weightGoalKg,
      proteinGoalG,
      carbsGoalG,
      fatGoalG,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: goals.userId,
      set: {
        waterGoalMl,
        calorieGoal,
        activityGoalMin,
        mealGoalCount,
        weightGoalKg,
        proteinGoalG,
        carbsGoalG,
        fatGoalG,
        updatedAt: new Date(),
      },
    });

  const [row] = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, principal.userId));
  return NextResponse.json(row);
}
