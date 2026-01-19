export type MainGoal =
  | "fat_burn"
  | "muscle_gain"
  | "fit_form"
  | "conditioning"
  | "healthy";
export type SportLevel = "beginner" | "sometimes" | "regular" | "advanced";
export type WorkoutDays = "1-2" | "3-4" | "5+";
export type WorkoutPlace = "home" | "gym" | "outdoor";
export type EquipmentLevel = "none" | "basic" | "full";
export type InjuryType = "none" | "knee" | "back" | "shoulder" | "other";
export type DoctorRestriction = "no" | "yes";
export type ReferralSource =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "friend"
  | "search"
  | "other";

export type ProfileInfo = {
  fullName: string;
  age: string;
  heightCm: string;
  weightKg: string;
  mainGoal: MainGoal | "";
  sportLevel: SportLevel | "";
  workoutDays: WorkoutDays | "";
  workoutPlace: WorkoutPlace | "";
  equipmentLevel: EquipmentLevel | "";
  injury: InjuryType | "";
  injuryDetail: string;
  doctorRestriction: DoctorRestriction | "";
  referralSource: ReferralSource | "";
  expectation: string;
};

export const defaultProfile: ProfileInfo = {
  fullName: "",
  age: "",
  heightCm: "",
  weightKg: "",
  mainGoal: "",
  sportLevel: "",
  workoutDays: "",
  workoutPlace: "",
  equipmentLevel: "",
  injury: "",
  injuryDetail: "",
  doctorRestriction: "",
  referralSource: "",
  expectation: "",
};
