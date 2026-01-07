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

const PROFILE_KEY = "calai.profile.v1";

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

function normalizeProfile(profile: Partial<ProfileInfo>): ProfileInfo {
  const goals: MainGoal[] = [
    "fat_burn",
    "muscle_gain",
    "fit_form",
    "conditioning",
    "healthy",
  ];
  const levels: SportLevel[] = ["beginner", "sometimes", "regular", "advanced"];
  const workoutDays: WorkoutDays[] = ["1-2", "3-4", "5+"];
  const places: WorkoutPlace[] = ["home", "gym", "outdoor"];
  const equipment: EquipmentLevel[] = ["none", "basic", "full"];
  const injuries: InjuryType[] = ["none", "knee", "back", "shoulder", "other"];
  const doctorRestriction: DoctorRestriction[] = ["no", "yes"];
  const referrals: ReferralSource[] = [
    "instagram",
    "tiktok",
    "youtube",
    "friend",
    "search",
    "other",
  ];

  return {
    fullName: typeof profile.fullName === "string" ? profile.fullName : "",
    age: typeof profile.age === "string" ? profile.age : "",
    heightCm: typeof profile.heightCm === "string" ? profile.heightCm : "",
    weightKg: typeof profile.weightKg === "string" ? profile.weightKg : "",
    mainGoal: goals.includes(profile.mainGoal as MainGoal)
      ? (profile.mainGoal as MainGoal)
      : "",
    sportLevel: levels.includes(profile.sportLevel as SportLevel)
      ? (profile.sportLevel as SportLevel)
      : "",
    workoutDays: workoutDays.includes(profile.workoutDays as WorkoutDays)
      ? (profile.workoutDays as WorkoutDays)
      : "",
    workoutPlace: places.includes(profile.workoutPlace as WorkoutPlace)
      ? (profile.workoutPlace as WorkoutPlace)
      : "",
    equipmentLevel: equipment.includes(profile.equipmentLevel as EquipmentLevel)
      ? (profile.equipmentLevel as EquipmentLevel)
      : "",
    injury: injuries.includes(profile.injury as InjuryType)
      ? (profile.injury as InjuryType)
      : "",
    injuryDetail: typeof profile.injuryDetail === "string" ? profile.injuryDetail : "",
    doctorRestriction: doctorRestriction.includes(profile.doctorRestriction as DoctorRestriction)
      ? (profile.doctorRestriction as DoctorRestriction)
      : "",
    referralSource: referrals.includes(profile.referralSource as ReferralSource)
      ? (profile.referralSource as ReferralSource)
      : "",
    expectation: typeof profile.expectation === "string" ? profile.expectation : "",
  };
}

export function loadProfile(): ProfileInfo {
  if (typeof window === "undefined") {
    return defaultProfile;
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      return defaultProfile;
    }
    const parsed = JSON.parse(raw) as Partial<ProfileInfo>;
    return normalizeProfile(parsed);
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: ProfileInfo) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function isProfileComplete(profile: ProfileInfo) {
  return Boolean(
    profile.age.trim() &&
      profile.heightCm.trim() &&
      profile.weightKg.trim() &&
      profile.mainGoal &&
      profile.sportLevel &&
      profile.workoutDays &&
      profile.workoutPlace &&
      profile.equipmentLevel
  );
}
