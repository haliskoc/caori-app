import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { eq } from "drizzle-orm";
import { goals } from "@/lib/schema";
import { getDb, ensureUser } from "@/lib/db";
import { isSameOrigin, toSafeNumber } from "@/lib/security";

export const dynamic = "force-dynamic";

async function ensureGoals(userId: string) {
  const db = getDb();
  await db.insert(goals).values({ userId }).onConflictDoNothing();
  const [row] = await db.select().from(goals).where(eq(goals.userId, userId));
  return row;
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const row = await ensureGoals(session.user.sub);
  return NextResponse.json(row);
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
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

  await ensureUser(session.user);
  const db = getDb();
  await db
    .insert(goals)
    .values({
      userId: session.user.sub,
      waterGoalMl,
      calorieGoal,
      activityGoalMin,
      mealGoalCount,
      weightGoalKg,
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
        updatedAt: new Date(),
      },
    });

  const [row] = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
  return NextResponse.json(row);
}
