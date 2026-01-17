export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type ActivityType =
  | "walking"
  | "running"
  | "gym"
  | "cycling"
  | "swimming"
  | "yoga"
  | "hiit"
  | "pilates"
  | "stairs";

export type SleepQuality = "poor" | "fair" | "good" | "excellent";

export type MeasurementType = "weight" | "waist" | "hip" | "chest" | "bodyFat";

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

export type DrinkEntry = {
  id: string;
  type: "drink";
  name: string;
  amountMl: number;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  timestamp: string;
};

export type ActivityEntry = {
  id: string;
  type: "activity";
  activityType: ActivityType;
  durationMin: number;
  estimatedCalories: number;
  note?: string;
  timestamp: string;
};

export type SleepEntry = {
  id: string;
  type: "sleep";
  sleepStart: string;
  sleepEnd: string;
  durationMin: number;
  quality: SleepQuality;
  note?: string;
  timestamp: string;
};

export type Entry = FoodEntry | WaterEntry | DrinkEntry | ActivityEntry | SleepEntry;

export type Goals = {
  waterGoalMl: number;
  calorieGoal: number;
  activityGoalMin: number;
  mealGoalCount: number;
  weightGoalKg: number;
  proteinGoalG: number;
  carbsGoalG: number;
  fatGoalG: number;
  sleepGoalHours: number;
};

export type DailySummary = {
  date: string;
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  activityMin: number;
  mealCount: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  sleepHours: number;
  sleepQuality: SleepQuality | null;
};

export type WeeklySummary = DailySummary[];

export type MeasurementEntry = {
  id: string;
  type: MeasurementType;
  value: number;
  unit: string;
  timestamp: string;
};
