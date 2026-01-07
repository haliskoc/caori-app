import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { profiles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { defaultProfile, type ProfileInfo } from "@/lib/profile";

function toIntOrNull(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

function toTextOrNull(value: unknown) {
  const text = typeof value === "string" ? value.trim() : "";
  return text ? text : null;
}

function toProfilePayload(body: Partial<ProfileInfo>) {
  return {
    fullName: toTextOrNull(body.fullName),
    age: toIntOrNull(body.age),
    heightCm: toIntOrNull(body.heightCm),
    weightKg: toIntOrNull(body.weightKg),
    mainGoal: toTextOrNull(body.mainGoal),
    sportLevel: toTextOrNull(body.sportLevel),
    workoutDays: toTextOrNull(body.workoutDays),
    workoutPlace: toTextOrNull(body.workoutPlace),
    equipmentLevel: toTextOrNull(body.equipmentLevel),
    injury: toTextOrNull(body.injury),
    injuryDetail: toTextOrNull(body.injuryDetail),
    doctorRestriction: toTextOrNull(body.doctorRestriction),
    referralSource: toTextOrNull(body.referralSource),
    expectation: toTextOrNull(body.expectation),
  };
}

function rowToProfile(row: typeof profiles.$inferSelect | null): ProfileInfo {
  if (!row) {
    return defaultProfile;
  }
  return {
    fullName: row.fullName ?? "",
    age: row.age ? String(row.age) : "",
    heightCm: row.heightCm ? String(row.heightCm) : "",
    weightKg: row.weightKg ? String(row.weightKg) : "",
    mainGoal: (row.mainGoal as ProfileInfo["mainGoal"]) ?? "",
    sportLevel: (row.sportLevel as ProfileInfo["sportLevel"]) ?? "",
    workoutDays: (row.workoutDays as ProfileInfo["workoutDays"]) ?? "",
    workoutPlace: (row.workoutPlace as ProfileInfo["workoutPlace"]) ?? "",
    equipmentLevel: (row.equipmentLevel as ProfileInfo["equipmentLevel"]) ?? "",
    injury: (row.injury as ProfileInfo["injury"]) ?? "",
    injuryDetail: row.injuryDetail ?? "",
    doctorRestriction: (row.doctorRestriction as ProfileInfo["doctorRestriction"]) ?? "",
    referralSource: (row.referralSource as ProfileInfo["referralSource"]) ?? "",
    expectation: row.expectation ?? "",
  };
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const [row] = await db.select().from(profiles).where(eq(profiles.userId, session.user.sub));
  return NextResponse.json(rowToProfile(row ?? null));
}

export async function PUT(request: Request) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ProfileInfo>;
  await ensureUser(session.user);
  const db = getDb();
  const payload = toProfilePayload(body);

  const [row] = await db
    .insert(profiles)
    .values({
      userId: session.user.sub,
      ...payload,
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        ...payload,
        updatedAt: new Date(),
      },
    })
    .returning();

  return NextResponse.json(rowToProfile(row ?? null));
}
