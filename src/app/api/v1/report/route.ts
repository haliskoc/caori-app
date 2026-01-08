import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { entries, goals } from "@/lib/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { toSafeNumber } from "@/lib/security";
import { buildReportData } from "@/lib/report";

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
  const report = buildReportData(
    data,
    rangeDays,
    goalRow
      ? { calorieGoal: goalRow.calorieGoal, waterGoalMl: goalRow.waterGoalMl }
      : undefined
  );

  return NextResponse.json(report);
}
