import { StateCreator } from "zustand";
import api from "../../api/axios-instance";

export type ThemeMode = "light" | "dim";
export type ThemeAccent = "teal" | "rose";

export type ReminderSettings = {
  enabled: boolean;
  time: string;
  lastNotifiedDay?: string;
};

export type MealReminderSettings = {
  enabled: boolean;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export type SleepReminderSettings = {
  enabled: boolean;
  time: string;
};

export type FeatureFlags = {
  aiVisual: boolean;
  googleFit: boolean;
  darkMode: boolean;
};

export type ThemeSettings = {
  mode: ThemeMode;
  accent: ThemeAccent;
};

export type UnitSystem = "metric" | "imperial";

export type Integrations = {
  googleFit: {
    connected: boolean;
    lastSync?: string;
  };
  appleHealth: {
    connected: boolean;
    lastSync?: string;
  };
};

export type AppSettings = {
  theme: ThemeSettings;
  reminder: ReminderSettings;
  mealReminders: MealReminderSettings;
  sleepReminder: SleepReminderSettings;
  flags: FeatureFlags;
  locale: string;
  units: UnitSystem;
  country: string;
  autoDetectCountry: boolean;
  onboardingCompleted: boolean;
  integrations: Integrations;
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: { mode: "light", accent: "teal" },
  reminder: { enabled: false, time: "09:00" },
  mealReminders: {
    enabled: false,
    breakfast: "08:00",
    lunch: "13:00",
    dinner: "19:00",
  },
  sleepReminder: {
    enabled: false,
    time: "23:00",
  },
  flags: { aiVisual: false, googleFit: false, darkMode: false },
  locale: "tr",
  units: "metric",
  country: "TR",
  autoDetectCountry: true,
  onboardingCompleted: false,
  integrations: {
    googleFit: { connected: false },
    appleHealth: { connected: false },
  },
};

export interface SettingsSlice {
  settings: AppSettings;
  settingsLoading: boolean;
  settingsError: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (next: Partial<AppSettings>) => void;
  saveSettings: () => Promise<void>;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set, get) => ({
  settings: DEFAULT_SETTINGS,
  settingsLoading: false,
  settingsError: null,

  fetchSettings: async () => {
    set({ settingsLoading: true, settingsError: null });
    try {
      const response = await api.get("/settings");
      if (response.data) {
        set({
          settings: {
            ...DEFAULT_SETTINGS,
            ...response.data,
            locale: get().settings.locale || DEFAULT_SETTINGS.locale,
            country:
              response.data.country ||
              get().settings.country ||
              DEFAULT_SETTINGS.country,
            autoDetectCountry:
              response.data.autoDetectCountry !== undefined
                ? response.data.autoDetectCountry
                : get().settings.autoDetectCountry,
            integrations: {
              ...DEFAULT_SETTINGS.integrations,
              ...response.data.integrations,
              googleFit: {
                ...DEFAULT_SETTINGS.integrations.googleFit,
                ...response.data.integrations?.googleFit,
              },
              appleHealth: {
                ...DEFAULT_SETTINGS.integrations.appleHealth,
                ...response.data.integrations?.appleHealth,
              },
            },
          },
        });
      }
    } catch (error) {
      set({ settingsError: "Failed to fetch settings" });
    } finally {
      set({ settingsLoading: false });
    }
  },

  updateSettings: (next) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...next,
        theme: { ...state.settings.theme, ...next.theme },
        reminder: { ...state.settings.reminder, ...next.reminder },
        mealReminders: {
          ...state.settings.mealReminders,
          ...next.mealReminders,
        },
        sleepReminder: {
          ...state.settings.sleepReminder,
          ...next.sleepReminder,
        },
        flags: { ...state.settings.flags, ...next.flags },
        integrations: {
          ...state.settings.integrations,
          ...next.integrations,
          googleFit: {
            ...state.settings.integrations.googleFit,
            ...next.integrations?.googleFit,
          },
          appleHealth: {
            ...state.settings.integrations.appleHealth,
            ...next.integrations?.appleHealth,
          },
        },
      },
    }));
  },

  saveSettings: async () => {
    const { settings } = get();
    set({ settingsLoading: true, settingsError: null });
    try {
      const response = await api.put("/settings", {
        theme: settings.theme,
        reminder: settings.reminder,
        flags: settings.flags,
        country: settings.country,
        autoDetectCountry: settings.autoDetectCountry,
        onboardingCompleted: settings.onboardingCompleted,
        integrations: settings.integrations,
      });
      if (response.data) {
        set({
          settings: {
            ...settings,
            ...response.data,
          },
        });
      }
    } catch (error) {
      set({ settingsError: "Failed to save settings" });
    } finally {
      set({ settingsLoading: false });
    }
  },
});
