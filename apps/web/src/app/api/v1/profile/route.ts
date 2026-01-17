import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { getDb, ensureUser } from "@/lib/database/db";
import { profiles } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { defaultProfile, type ProfileInfo } from "@/lib/features/profile";
import { isSameOrigin } from "@/lib/auth/security";

export const dynamic = "force-dynamic";

const MAIN_GOALS = new Set([
  "fat_burn",
  "muscle_gain",
  "fit_form",
  "conditioning",
  "healthy",
]);
const SPORT_LEVELS = new Set(["beginner", "sometimes", "regular", "advanced"]);
const WORKOUT_DAYS = new Set(["1-2", "3-4", "5+"]);
const WORKOUT_PLACES = new Set(["home", "gym", "outdoor"]);
const EQUIPMENT_LEVELS = new Set(["none", "basic", "full"]);
const INJURY_TYPES = new Set(["none", "knee", "back", "shoulder", "other"]);
const DOCTOR_RESTRICTIONS = new Set(["no", "yes"]);
const REFERRAL_SOURCES = new Set([
  "instagram",
  "tiktok",
  "youtube",
  "friend",
  "search",
  "other",
]);

function toIntOrNull(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

function toTextOrNull(value: unknown) {
  const text = typeof value === "string" ? value.trim() : "";
  return text ? text : null;
}

function toEnumOrNull(value: unknown, allowed: Set<string>) {
  const text = typeof value === "string" ? value.trim() : "";
  return allowed.has(text) ? text : null;
}

function toProfilePayload(body: Partial<ProfileInfo>) {
  return {
    fullName: toTextOrNull(body.fullName),
    age: toIntOrNull(body.age),
    heightCm: toIntOrNull(body.heightCm),
    weightKg: toIntOrNull(body.weightKg),
    mainGoal: toEnumOrNull(body.mainGoal, MAIN_GOALS),
    sportLevel: toEnumOrNull(body.sportLevel, SPORT_LEVELS),
    workoutDays: toEnumOrNull(body.workoutDays, WORKOUT_DAYS),
    workoutPlace: toEnumOrNull(body.workoutPlace, WORKOUT_PLACES),
    equipmentLevel: toEnumOrNull(body.equipmentLevel, EQUIPMENT_LEVELS),
    injury: toEnumOrNull(body.injury, INJURY_TYPES),
    injuryDetail: toTextOrNull(body.injuryDetail),
    doctorRestriction: toEnumOrNull(body.doctorRestriction, DOCTOR_RESTRICTIONS),
    referralSource: toEnumOrNull(body.referralSource, REFERRAL_SOURCES),
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
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

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
