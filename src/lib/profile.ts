export type ActivityLevel = "low" | "moderate" | "high";
export type GoalType = "lose" | "maintain" | "gain";
export type DietPreference = "balanced" | "vegetarian" | "vegan" | "lowcarb";

export type ProfileInfo = {
  fullName: string;
  birthYear: string;
  heightCm: string;
  weightKg: string;
  targetWeightKg: string;
  activityLevel: ActivityLevel;
  goal: GoalType;
  dietPreference: DietPreference;
  notes: string;
};

const PROFILE_KEY = "calai.profile.v1";

export const defaultProfile: ProfileInfo = {
  fullName: "",
  birthYear: "",
  heightCm: "",
  weightKg: "",
  targetWeightKg: "",
  activityLevel: "moderate",
  goal: "maintain",
  dietPreference: "balanced",
  notes: "",
};

function normalizeProfile(profile: Partial<ProfileInfo>): ProfileInfo {
  const activity: ActivityLevel[] = ["low", "moderate", "high"];
  const goals: GoalType[] = ["lose", "maintain", "gain"];
  const diets: DietPreference[] = ["balanced", "vegetarian", "vegan", "lowcarb"];

  return {
    fullName: typeof profile.fullName === "string" ? profile.fullName : "",
    birthYear: typeof profile.birthYear === "string" ? profile.birthYear : "",
    heightCm: typeof profile.heightCm === "string" ? profile.heightCm : "",
    weightKg: typeof profile.weightKg === "string" ? profile.weightKg : "",
    targetWeightKg: typeof profile.targetWeightKg === "string" ? profile.targetWeightKg : "",
    activityLevel: activity.includes(profile.activityLevel as ActivityLevel)
      ? (profile.activityLevel as ActivityLevel)
      : "moderate",
    goal: goals.includes(profile.goal as GoalType) ? (profile.goal as GoalType) : "maintain",
    dietPreference: diets.includes(profile.dietPreference as DietPreference)
      ? (profile.dietPreference as DietPreference)
      : "balanced",
    notes: typeof profile.notes === "string" ? profile.notes : "",
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
    profile.birthYear.trim() && profile.heightCm.trim() && profile.weightKg.trim()
  );
}

export function getAgeFromBirthYear(birthYear: string) {
  const year = Number(birthYear);
  if (!Number.isFinite(year)) {
    return null;
  }
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return null;
  }
  return currentYear - year;
}
