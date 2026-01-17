import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTrackerSlice, TrackerSlice } from "./slices/tracker.slice";
import { createAuthSlice, AuthSlice } from "./slices/auth.slice";
import { createProfileSlice, ProfileSlice } from "./slices/profile.slice";

type StoreState = TrackerSlice & AuthSlice & ProfileSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createTrackerSlice(...a),
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
    }),
    {
      name: "calai-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        entries: state.entries,
        dailySummary: state.dailySummary,
        sleepLogs: state.sleepLogs,
        goals: state.goals,
      }),
    },
  ),
);
