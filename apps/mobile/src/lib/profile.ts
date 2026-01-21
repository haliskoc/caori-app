import { getFirst, run } from "@/db";

export type Profile = {
  fullName?: string | null;
  age?: number | null;
  heightCm?: number | null;
  weightKg?: number | null;
  mainGoal?: string | null;
  sportLevel?: string | null;
  workoutDays?: string | null;
  workoutPlace?: string | null;
  equipmentLevel?: string | null;
  injury?: string | null;
  injuryDetail?: string | null;
  doctorRestriction?: string | null;
  referralSource?: string | null;
  expectation?: string | null;
};

export async function getProfile(userId: string): Promise<Profile> {
  const row = await getFirst<any>("SELECT * FROM profiles WHERE user_id = ?", [userId]);
  if (!row) {
    return {};
  }
  return {
    fullName: row.full_name ?? null,
    age: row.age ?? null,
    heightCm: row.height_cm ?? null,
    weightKg: row.weight_kg ?? null,
    mainGoal: row.main_goal ?? null,
    sportLevel: row.sport_level ?? null,
    workoutDays: row.workout_days ?? null,
    workoutPlace: row.workout_place ?? null,
    equipmentLevel: row.equipment_level ?? null,
    injury: row.injury ?? null,
    injuryDetail: row.injury_detail ?? null,
    doctorRestriction: row.doctor_restriction ?? null,
    referralSource: row.referral_source ?? null,
    expectation: row.expectation ?? null,
  };
}

export async function updateProfile(userId: string, patch: Profile) {
  const now = new Date().toISOString();
  const current = await getProfile(userId);
  const next = { ...current, ...patch };

  const exists = await getFirst<{ user_id: string }>(
    "SELECT user_id FROM profiles WHERE user_id = ?",
    [userId]
  );

  if (!exists?.user_id) {
    await run(
      `INSERT INTO profiles (
        user_id,
        full_name,
        age,
        height_cm,
        weight_kg,
        main_goal,
        sport_level,
        workout_days,
        workout_place,
        equipment_level,
        injury,
        injury_detail,
        doctor_restriction,
        referral_source,
        expectation,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        userId,
        next.fullName ?? null,
        next.age ?? null,
        next.heightCm ?? null,
        next.weightKg ?? null,
        next.mainGoal ?? null,
        next.sportLevel ?? null,
        next.workoutDays ?? null,
        next.workoutPlace ?? null,
        next.equipmentLevel ?? null,
        next.injury ?? null,
        next.injuryDetail ?? null,
        next.doctorRestriction ?? null,
        next.referralSource ?? null,
        next.expectation ?? null,
        now,
      ]
    );
  } else {
    await run(
      `UPDATE profiles SET
        full_name = ?,
        age = ?,
        height_cm = ?,
        weight_kg = ?,
        main_goal = ?,
        sport_level = ?,
        workout_days = ?,
        workout_place = ?,
        equipment_level = ?,
        injury = ?,
        injury_detail = ?,
        doctor_restriction = ?,
        referral_source = ?,
        expectation = ?,
        updated_at = ?
      WHERE user_id = ?` ,
      [
        next.fullName ?? null,
        next.age ?? null,
        next.heightCm ?? null,
        next.weightKg ?? null,
        next.mainGoal ?? null,
        next.sportLevel ?? null,
        next.workoutDays ?? null,
        next.workoutPlace ?? null,
        next.equipmentLevel ?? null,
        next.injury ?? null,
        next.injuryDetail ?? null,
        next.doctorRestriction ?? null,
        next.referralSource ?? null,
        next.expectation ?? null,
        now,
        userId,
      ]
    );
  }

  return next;
}

export function isProfileComplete(profile: Profile) {
  return Boolean(profile.fullName && profile.mainGoal && profile.sportLevel);
}
