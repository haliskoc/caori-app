import type { Goals } from "@calai/shared/types";
import { run, getFirst } from "@/db";

export const DEFAULT_GOALS: Goals = {
  waterGoalMl: 2500,
  calorieGoal: 2200,
  activityGoalMin: 30,
  mealGoalCount: 3,
  weightGoalKg: 0,
  proteinGoalG: 0,
  carbsGoalG: 0,
  fatGoalG: 0,
  sleepGoalHours: 8,
};

export async function getGoals(userId: string): Promise<Goals> {
  const row = await getFirst<{
    water_goal_ml: number;
    calorie_goal: number;
    activity_goal_min: number;
    meal_goal_count: number;
    weight_goal_kg: number;
    protein_goal_g: number;
    carbs_goal_g: number;
    fat_goal_g: number;
    sleep_goal_hours: number;
  }>("SELECT * FROM goals WHERE user_id = ?", [userId]);

  if (!row) {
    const now = new Date().toISOString();
    await run(
      `INSERT INTO goals (
        user_id,
        water_goal_ml,
        calorie_goal,
        activity_goal_min,
        meal_goal_count,
        weight_goal_kg,
        protein_goal_g,
        carbs_goal_g,
        fat_goal_g,
        sleep_goal_hours,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        userId,
        DEFAULT_GOALS.waterGoalMl,
        DEFAULT_GOALS.calorieGoal,
        DEFAULT_GOALS.activityGoalMin,
        DEFAULT_GOALS.mealGoalCount,
        DEFAULT_GOALS.weightGoalKg,
        DEFAULT_GOALS.proteinGoalG,
        DEFAULT_GOALS.carbsGoalG,
        DEFAULT_GOALS.fatGoalG,
        DEFAULT_GOALS.sleepGoalHours,
        now,
      ]
    );
    return { ...DEFAULT_GOALS };
  }

  return {
    waterGoalMl: row.water_goal_ml ?? DEFAULT_GOALS.waterGoalMl,
    calorieGoal: row.calorie_goal ?? DEFAULT_GOALS.calorieGoal,
    activityGoalMin: row.activity_goal_min ?? DEFAULT_GOALS.activityGoalMin,
    mealGoalCount: row.meal_goal_count ?? DEFAULT_GOALS.mealGoalCount,
    weightGoalKg: row.weight_goal_kg ?? DEFAULT_GOALS.weightGoalKg,
    proteinGoalG: row.protein_goal_g ?? DEFAULT_GOALS.proteinGoalG,
    carbsGoalG: row.carbs_goal_g ?? DEFAULT_GOALS.carbsGoalG,
    fatGoalG: row.fat_goal_g ?? DEFAULT_GOALS.fatGoalG,
    sleepGoalHours: row.sleep_goal_hours ?? DEFAULT_GOALS.sleepGoalHours,
  };
}

export async function updateGoals(userId: string, patch: Partial<Goals>): Promise<Goals> {
  const current = await getGoals(userId);
  const next: Goals = { ...current, ...patch };
  const now = new Date().toISOString();

  await run(
    `UPDATE goals SET
      water_goal_ml = ?,
      calorie_goal = ?,
      activity_goal_min = ?,
      meal_goal_count = ?,
      weight_goal_kg = ?,
      protein_goal_g = ?,
      carbs_goal_g = ?,
      fat_goal_g = ?,
      sleep_goal_hours = ?,
      updated_at = ?
    WHERE user_id = ?` ,
    [
      next.waterGoalMl,
      next.calorieGoal,
      next.activityGoalMin,
      next.mealGoalCount,
      next.weightGoalKg,
      next.proteinGoalG,
      next.carbsGoalG,
      next.fatGoalG,
      next.sleepGoalHours,
      now,
      userId,
    ]
  );

  return next;
}
