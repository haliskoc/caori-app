import { Entry, MealType } from "./types";
import { DAY_MS, createId } from "./utils";

const demoMeals: { name: string; calories: number; mealType: MealType }[] = [
  { name: "Avokadolu Tost", calories: 420, mealType: "breakfast" },
  { name: "Tavuklu Salata", calories: 520, mealType: "lunch" },
  { name: "Fırında Somon", calories: 640, mealType: "dinner" },
  { name: "Yoğurt + Meyve", calories: 210, mealType: "snack" },
];

export function getDemoEntries(): Entry[] {
  const now = new Date();
  const entries: Entry[] = [];

  for (let day = 0; day < 6; day += 1) {
    const base = new Date(now.getTime() - day * DAY_MS);
    const meal = demoMeals[day % demoMeals.length];
    const mealTime = new Date(base);
    mealTime.setHours(9 + (day % 3) * 4, 10, 0, 0);
    entries.push({
      id: createId(),
      type: "food",
      name: meal.name,
      calories: meal.calories,
      mealType: meal.mealType,
      timestamp: mealTime.toISOString(),
    });

    const waterTime = new Date(base);
    waterTime.setHours(13, 0, 0, 0);
    entries.push({
      id: createId(),
      type: "water",
      amountMl: 500 + day * 120,
      timestamp: waterTime.toISOString(),
    });

    if (day % 2 === 0) {
      const activityTime = new Date(base);
      activityTime.setHours(18, 30, 0, 0);
      entries.push({
        id: createId(),
        type: "activity",
        activityType: "walking",
        durationMin: 25 + day * 5,
        estimatedCalories: 140 + day * 20,
        timestamp: activityTime.toISOString(),
      });
    }
  }

  return entries;
}
