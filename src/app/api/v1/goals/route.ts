import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { eq } from "drizzle-orm";
import { goals, users } from "@/lib/schema";
import { getDb } from "@/lib/db";

async function ensureUser(user: { sub: string; email?: string; name?: string }) {
  const db = getDb();
  await db
    .insert(users)
    .values({ id: user.sub, email: user.email ?? null, name: user.name ?? null })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: user.email ?? null, name: user.name ?? null },
    });
}

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
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const waterGoalMl = Number(body?.waterGoalMl);
  const calorieGoal = Number(body?.calorieGoal);

  await ensureUser(session.user);
  const db = getDb();
  await db
    .insert(goals)
    .values({
      userId: session.user.sub,
      waterGoalMl: Number.isFinite(waterGoalMl) ? waterGoalMl : 2500,
      calorieGoal: Number.isFinite(calorieGoal) ? calorieGoal : 2200,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: goals.userId,
      set: {
        waterGoalMl: Number.isFinite(waterGoalMl) ? waterGoalMl : 2500,
        calorieGoal: Number.isFinite(calorieGoal) ? calorieGoal : 2200,
        updatedAt: new Date(),
      },
    });

  const [row] = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
  return NextResponse.json(row);
}
