import { run, getFirst } from "@/db";
import { DEFAULT_GOALS } from "@/lib/goals";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export async function ensureUserDefaults(userId: string) {
  const goalsRow = await getFirst<{ user_id: string }>(
    "SELECT user_id FROM goals WHERE user_id = ?",
    [userId]
  );
  if (!goalsRow?.user_id) {
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
  }

  const settingsRow = await getFirst<{ user_id: string }>(
    "SELECT user_id FROM user_settings WHERE user_id = ?",
    [userId]
  );
  if (!settingsRow?.user_id) {
    const now = new Date().toISOString();
    await run(
      `INSERT INTO user_settings (
        user_id,
        theme_mode,
        theme_accent,
        reminder_enabled,
        reminder_time,
        reminder_last_notified_day,
        ai_visual,
        google_fit,
        dark_mode,
        locale,
        premium_active,
        premium_code,
        premium_activated_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        userId,
        DEFAULT_SETTINGS.theme.mode,
        DEFAULT_SETTINGS.theme.accent,
        DEFAULT_SETTINGS.reminder.enabled ? 1 : 0,
        DEFAULT_SETTINGS.reminder.time,
        DEFAULT_SETTINGS.reminder.lastNotifiedDay ?? null,
        DEFAULT_SETTINGS.flags.aiVisual ? 1 : 0,
        DEFAULT_SETTINGS.flags.googleFit ? 1 : 0,
        DEFAULT_SETTINGS.theme.mode === "dim" ? 1 : 0,
        DEFAULT_SETTINGS.locale,
        DEFAULT_SETTINGS.premium.active ? 1 : 0,
        DEFAULT_SETTINGS.premium.code ?? null,
        DEFAULT_SETTINGS.premium.activatedAt ?? null,
        now,
      ]
    );
  }
}
