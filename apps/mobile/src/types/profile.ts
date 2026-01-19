export type Gender = "male" | "female" | "other";
export type GoalType = "lose" | "maintain" | "gain";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

// Extended goal types matching web
export type MainGoal = "fat_burn" | "muscle_gain" | "fit_form" | "conditioning" | "healthy";
export type SportLevel = "beginner" | "sometimes" | "regular" | "advanced";
export type WorkoutDays = "1-2" | "3-4" | "5+";
export type WorkoutPlace = "home" | "gym" | "outdoor";
export type EquipmentLevel = "none" | "basic" | "full";
export type InjuryType = "none" | "knee" | "back" | "shoulder" | "other";
export type ReferralSource = "instagram" | "tiktok" | "youtube" | "friend" | "search" | "other";

export type ProfileInfo = {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goal: GoalType;
  activityLevel: ActivityLevel;
  // Extended fields matching web onboarding
  mainGoal: MainGoal;
  sportLevel: SportLevel;
  workoutDays: WorkoutDays;
  workoutPlace: WorkoutPlace;
  equipmentLevel: EquipmentLevel;
  injury: InjuryType;
  injuryDetail: string;
  doctorRestriction: boolean;
  referralSource: ReferralSource;
  expectation: string;
};

export const defaultProfile: ProfileInfo = {
  name: "",
  age: 25,
  gender: "male",
  heightCm: 170,
  weightKg: 70,
  goal: "maintain",
  activityLevel: "moderate",
  // Extended defaults
  mainGoal: "healthy",
  sportLevel: "beginner",
  workoutDays: "3-4",
  workoutPlace: "home",
  equipmentLevel: "none",
  injury: "none",
  injuryDetail: "",
  doctorRestriction: false,
  referralSource: "search",
  expectation: "",
};
