import { StateCreator } from "zustand";
import { Goals } from "@calai/shared";
import api from "../../api/axios-instance";

export interface ProfileSlice {
  goals: Goals;
  updateGoals: (next: Partial<Goals>) => Promise<void>;
  saveGoalsToApi: () => Promise<void>;
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

  updateGoals: async (next) => {
    set((state) => ({
      goals: { ...state.goals, ...next },
    }));
  },

  saveGoalsToApi: async () => {
    const { goals } = get();
    try {
      await api.put("/goals", goals);
    } catch (error) {
      console.error("Failed to save goals", error);
    }
  },
});
