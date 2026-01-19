import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTrackerSlice, TrackerSlice } from "./slices/tracker.slice";
import { createAuthSlice, AuthSlice } from "./slices/auth.slice";
import { createProfileSlice, ProfileSlice } from "./slices/profile.slice";
import {
  createMeasurementsSlice,
  MeasurementsSlice,
} from "./slices/measurements.slice";
import { createSettingsSlice, SettingsSlice } from "./slices/settings.slice";

type StoreState = TrackerSlice &
  AuthSlice &
  ProfileSlice &
  MeasurementsSlice &
  SettingsSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createTrackerSlice(...a),
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createMeasurementsSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: "calai-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        entries: state.entries,
        pendingEntries: state.pendingEntries,
        dailySummary: state.dailySummary,
        sleepLogs: state.sleepLogs,
        goals: state.goals,
        profile: state.profile,
        measurements: state.measurements,
        settings: state.settings,
      }),
    },
  ),
);
