export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type ActivityType = "walking" | "running" | "gym";

export type FoodEntry = {
  id: string;
  type: "food";
  name: string;
  calories: number;
  mealType: MealType;
  amountG?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  timestamp: string;
};

export type WaterEntry = {
  id: string;
  type: "water";
  amountMl: number;
  timestamp: string;
};

export type ActivityEntry = {
  id: string;
  type: "activity";
  activityType: ActivityType;
  durationMin: number;
  estimatedCalories: number;
  timestamp: string;
};

export type Entry = FoodEntry | WaterEntry | ActivityEntry;

export type DailySummary = {
  date: string;
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type WeeklySummary = DailySummary[];
