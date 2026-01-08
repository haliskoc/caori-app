import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { eq } from "drizzle-orm";
import { goals } from "@/lib/schema";
import { getDb, ensureUser } from "@/lib/db";
import { isSameOrigin, toSafeNumber } from "@/lib/security";

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

  await ensureUser(session.user);
  const db = getDb();
  await db
    .insert(goals)
    .values({
      userId: session.user.sub,
      waterGoalMl,
      calorieGoal,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: goals.userId,
      set: {
        waterGoalMl,
        calorieGoal,
        updatedAt: new Date(),
      },
    });

  const [row] = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
  return NextResponse.json(row);
}
