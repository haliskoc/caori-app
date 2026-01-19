import { ProfileInfo } from "../types/profile";
import { Goals } from "@calai/shared";

export function calculateGoals(profile: ProfileInfo): Partial<Goals> {
  const { gender, weightKg, heightCm, age, activityLevel, goal } = profile;

  if (!weightKg || !heightCm || !age) return {};

  // Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Activity Multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const tdee = bmr * (activityMultipliers[activityLevel || 'sedentary']);

  // Goal Adjustments
  let calorieGoal = tdee;
  if (goal === 'lose') calorieGoal -= 500;
  else if (goal === 'gain') calorieGoal += 500;

  calorieGoal = Math.round(calorieGoal);

  // Macro Ratios (Proteins 30%, Carbs 40%, Fats 30%)
  const proteinGoalG = Math.round((calorieGoal * 0.30) / 4);
  const carbsGoalG = Math.round((calorieGoal * 0.40) / 4);
  const fatGoalG = Math.round((calorieGoal * 0.30) / 9);

  return {
    calorieGoal,
    proteinGoalG,
    carbsGoalG,
    fatGoalG,
    waterGoalMl: Math.round(weightKg * 35), // 35ml per kg
  };
}
