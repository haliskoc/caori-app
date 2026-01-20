import { StateCreator } from "zustand";
import { Goals } from "@calai/shared";
import api from "../../api/axios-instance";
import { defaultProfile, ProfileInfo } from "../../types/profile";

export interface ProfileSlice {
  goals: Goals;
  goalsLoading: boolean;
  profile: ProfileInfo;
  profileLoading: boolean;
  fetchGoals: () => Promise<void>;
  updateGoals: (next: Partial<Goals>) => Promise<void>;
  saveGoalsToApi: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (next: Partial<ProfileInfo>) => void;
  saveProfileToApi: () => Promise<void>;
}

const DEFAULT_GOALS: Goals = {
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

export const createProfileSlice: StateCreator<ProfileSlice> = (set, get) => ({
  goals: DEFAULT_GOALS,
  goalsLoading: false,
  profile: defaultProfile,
  profileLoading: false,

  fetchGoals: async () => {
    set({ goalsLoading: true });
    try {
      const response = await api.get("/goals");
      if (response.data) {
        set({ goals: { ...DEFAULT_GOALS, ...response.data } });
      }
    } catch (error: any) {
      // Network hatasıysa sessizce devam et (offline mod)
      if (error?.isNetworkError) {
        console.log("Offline: using local goals");
      } else {
        console.warn("Failed to fetch goals", error?.message || error);
      }
    } finally {
      set({ goalsLoading: false });
    }
  },

  updateGoals: async (next) => {
    set((state) => ({
      goals: { ...state.goals, ...next },
    }));
  },

  saveGoalsToApi: async () => {
    const { goals } = get();
    try {
      const response = await api.put("/goals", goals);
      if (response.data) {
        set({ goals: { ...DEFAULT_GOALS, ...response.data } });
      }
    } catch (error: any) {
      if (error?.isNetworkError) {
        console.log("Offline: goals will sync when online");
      } else {
        console.warn("Failed to save goals", error?.message || error);
      }
    }
  },

  fetchProfile: async () => {
    set({ profileLoading: true });
    try {
      const response = await api.get("/profile");
      if (response.data) {
        set({ profile: { ...defaultProfile, ...response.data } });
      }
    } catch (error: any) {
      // Network hatasıysa sessizce devam et (offline mod)
      if (error?.isNetworkError) {
        console.log("Offline: using local profile");
      } else {
        console.warn("Failed to fetch profile", error?.message || error);
      }
    } finally {
      set({ profileLoading: false });
    }
  },

  updateProfile: (next) => {
    set((state) => ({
      profile: { ...state.profile, ...next },
    }));
  },

  saveProfileToApi: async () => {
    const { profile } = get();
    set({ profileLoading: true });
    try {
      const response = await api.put("/profile", profile);
      if (response.data) {
        set({ profile: { ...defaultProfile, ...response.data } });
      }
    } catch (error: any) {
      if (error?.isNetworkError) {
        console.log("Offline: profile will sync when online");
      } else {
        console.warn("Failed to save profile", error?.message || error);
      }
    } finally {
      set({ profileLoading: false });
    }
  },
});
