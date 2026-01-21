import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type {
  ActivityType,
  DrinkEntry,
  Entry,
  FoodEntry,
  Goals,
  MeasurementEntry,
  SleepEntry,
  WaterEntry,
} from "@calai/shared/types";
import { buildWeeklySummary, getDayKey } from "@calai/shared/utils";
import { addActivity, addDrink, addFood, addSleep, addWater, addEntries, getEntries, removeEntry, updateEntry } from "@/lib/entries";
import { getGoals, updateGoals as updateGoalsDb } from "@/lib/goals";
import { getSettings, updateSettings as updateSettingsDb, UserSettings, FeatureFlags, ThemeSettings } from "@/lib/settings";
import { buildTheme, AppTheme } from "@/lib/theme";
import { getMeasurements, addMeasurement as addMeasurementDb, updateMeasurement as updateMeasurementDb, removeMeasurement as removeMeasurementDb } from "@/lib/measurements";
import type { FoodLibraryItem } from "@/lib/food-library";
import { addFoodLibraryItem, getFoodLibrary, removeFoodLibraryItem, toggleFoodLibraryFavorite, updateFoodLibraryItem } from "@/lib/food-library";
import { applyLocale, resolveLocale } from "@/lib/i18n";
import { clearReminders, scheduleDailyReminder } from "@/lib/reminders";
import { appendAuditEvent, clearAuditLog, loadAuditLog, AuditEvent } from "@/lib/audit";

type TrackerContextValue = {
  entries: Entry[];
  dailySummary: {
    caloriesIn: number;
    caloriesOut: number;
    waterMl: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    activityMin: number;
    mealCount: number;
    sleepHours: number;
    sleepQuality: string | null;
  };
  weeklySummary: ReturnType<typeof buildWeeklySummary>;
  goals: Goals;
  updateGoals: (next: Partial<Goals>) => Promise<void>;
  settings: UserSettings;
  updateSettings: (next: Partial<UserSettings>) => Promise<void>;
  theme: AppTheme;
  flags: FeatureFlags;
  updateFlags: (next: Partial<FeatureFlags>) => Promise<void>;
  addFood: (input: Partial<FoodEntry>) => Promise<void>;
  addDrink: (input: Partial<DrinkEntry>) => Promise<void>;
  addWater: (input: Partial<WaterEntry>) => Promise<void>;
  addActivity: (input: { activityType: ActivityType; durationMin: number; estimatedCalories: number; note?: string }) => Promise<void>;
  addSleep: (input: { sleepStart: string; sleepEnd: string; quality?: SleepEntry["quality"]; note?: string }) => Promise<void>;
  addEntries: (items: Entry[]) => Promise<number>;
  updateEntry: (entry: Entry) => Promise<void>;
  removeEntry: (id: string, type?: Entry["type"]) => Promise<void>;
  measurements: MeasurementEntry[];
  addMeasurement: (input: { type: MeasurementEntry["type"]; value: number; unit?: string; timestamp?: string }) => Promise<void>;
  updateMeasurement: (entry: MeasurementEntry) => Promise<void>;
  removeMeasurement: (id: string) => Promise<void>;
  foodLibrary: FoodLibraryItem[];
  addFoodLibraryItem: (input: Partial<FoodLibraryItem>) => Promise<void>;
  updateFoodLibraryItem: (item: FoodLibraryItem) => Promise<void>;
  removeFoodLibraryItem: (id: string) => Promise<void>;
  toggleFoodLibraryFavorite: (id: string, favorite: boolean) => Promise<void>;
  auditLog: AuditEvent[];
  appendAudit: (action: string, detail: string, meta?: Record<string, unknown>) => Promise<void>;
  clearAuditLog: () => Promise<void>;
  refresh: () => Promise<void>;
};

const TrackerContext = createContext<TrackerContextValue | null>(null);

function buildDailySummary(entries: Entry[]) {
  const todayKey = getDayKey(new Date());
  const todays = entries.filter((entry) => getDayKey(entry.timestamp) === todayKey);
  const mealSet = new Set<string>();
  const summary = todays.reduce(
    (acc, entry) => {
      if (entry.type === "food") {
        acc.caloriesIn += entry.calories;
        acc.proteinG += entry.proteinG ?? 0;
        acc.carbsG += entry.carbsG ?? 0;
        acc.fatG += entry.fatG ?? 0;
        mealSet.add(entry.mealType);
      } else if (entry.type === "drink") {
        acc.caloriesIn += entry.calories;
        acc.proteinG += entry.proteinG ?? 0;
        acc.carbsG += entry.carbsG ?? 0;
        acc.fatG += entry.fatG ?? 0;
      } else if (entry.type === "water") {
        acc.waterMl += entry.amountMl;
      } else if (entry.type === "activity") {
        acc.caloriesOut += entry.estimatedCalories;
        acc.activityMin += entry.durationMin;
      } else if (entry.type === "sleep") {
        acc.sleepHours += entry.durationMin / 60;
        acc.sleepQuality = entry.quality;
      }
      return acc;
    },
    {
      caloriesIn: 0,
      caloriesOut: 0,
      waterMl: 0,
      proteinG: 0,
      carbsG: 0,
      fatG: 0,
      activityMin: 0,
      mealCount: 0,
      sleepHours: 0,
      sleepQuality: null as string | null,
    }
  );
  summary.mealCount = mealSet.size;
  return summary;
}

export function TrackerProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [goals, setGoals] = useState<Goals>({
    waterGoalMl: 2500,
    calorieGoal: 2200,
    activityGoalMin: 30,
    mealGoalCount: 3,
    weightGoalKg: 0,
    proteinGoalG: 0,
    carbsGoalG: 0,
    fatGoalG: 0,
    sleepGoalHours: 8,
  });
  const [settings, setSettings] = useState<UserSettings>({
    theme: { mode: "light", accent: "emerald" },
    reminder: { enabled: false, time: "20:00", lastNotifiedDay: null },
    flags: { aiVisual: false, googleFit: false },
    locale: "tr",
    premium: { active: false, code: null, activatedAt: null },
  });
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>([]);
  const [foodLibrary, setFoodLibrary] = useState<FoodLibraryItem[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEvent[]>([]);

  const theme = useMemo(() => buildTheme(settings.theme), [settings.theme]);

  const refresh = useCallback(async () => {
    const [entriesData, goalsData, settingsData, measurementsData, foodLibraryData, auditData] = await Promise.all([
      getEntries(userId),
      getGoals(userId),
      getSettings(userId),
      getMeasurements(userId),
      getFoodLibrary(userId),
      loadAuditLog(userId),
    ]);
    setEntries(entriesData);
    setGoals(goalsData);
    setSettings(settingsData);
    setMeasurements(measurementsData);
    setFoodLibrary(foodLibraryData);
    setAuditLog(auditData);
    applyLocale(resolveLocale(settingsData.locale));
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (settings.reminder.enabled) {
      scheduleDailyReminder(settings.reminder.time).catch(() => undefined);
    } else {
      clearReminders().catch(() => undefined);
    }
  }, [settings.reminder.enabled, settings.reminder.time]);

  const updateGoals = useCallback(
    async (next: Partial<Goals>) => {
      const updated = await updateGoalsDb(userId, next);
      setGoals(updated);
    },
    [userId]
  );

  const updateSettings = useCallback(
    async (next: Partial<UserSettings>) => {
      const updated = await updateSettingsDb(userId, next);
      setSettings(updated);
      applyLocale(resolveLocale(updated.locale));
    },
    [userId]
  );

  const updateFlags = useCallback(
    async (next: Partial<FeatureFlags>) => {
      const updated = await updateSettingsDb(userId, { flags: next });
      setSettings(updated);
    },
    [userId]
  );

  const addFoodHandler = useCallback(
    async (input: Partial<FoodEntry>) => {
      const entry = await addFood(userId, input);
      setEntries((prev) => [entry, ...prev]);
      void appendAuditEvent(userId, {
        action: "entry:add",
        detail: `Food: ${entry.name}`,
      });
    },
    [userId]
  );

  const addDrinkHandler = useCallback(
    async (input: Partial<DrinkEntry>) => {
      const entry = await addDrink(userId, input);
      setEntries((prev) => [entry, ...prev]);
      void appendAuditEvent(userId, {
        action: "entry:add",
        detail: `Drink: ${entry.name}`,
      });
    },
    [userId]
  );

  const addWaterHandler = useCallback(
    async (input: Partial<WaterEntry>) => {
      const entry = await addWater(userId, input);
      setEntries((prev) => [entry, ...prev]);
      void appendAuditEvent(userId, {
        action: "entry:add",
        detail: `Water: ${entry.amountMl}ml`,
      });
    },
    [userId]
  );

  const addActivityHandler = useCallback(
    async (input: { activityType: ActivityType; durationMin: number; estimatedCalories: number; note?: string }) => {
      const entry = await addActivity(userId, input);
      setEntries((prev) => [entry, ...prev]);
      void appendAuditEvent(userId, {
        action: "entry:add",
        detail: `Activity: ${entry.activityType}`,
      });
    },
    [userId]
  );

  const addSleepHandler = useCallback(
    async (input: { sleepStart: string; sleepEnd: string; quality?: string; note?: string }) => {
      const entry = await addSleep(userId, {
        sleepStart: input.sleepStart,
        sleepEnd: input.sleepEnd,
        quality: (input.quality as any) || "good",
        note: input.note,
      });
      setEntries((prev) => [entry, ...prev]);
      void appendAuditEvent(userId, {
        action: "sleep:add",
        detail: `Sleep ${entry.durationMin} min`,
      });
    },
    [userId]
  );

  const addEntriesHandler = useCallback(
    async (items: Entry[]) => {
      const count = await addEntries(userId, items);
      const updated = await getEntries(userId);
      setEntries(updated);
      return count;
    },
    [userId]
  );

  const updateEntryHandler = useCallback(
    async (entry: Entry) => {
      await updateEntry(userId, entry);
      const updated = await getEntries(userId);
      setEntries(updated);
    },
    [userId]
  );

  const removeEntryHandler = useCallback(
    async (id: string, type?: Entry["type"]) => {
      await removeEntry(userId, id, type);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    },
    [userId]
  );

  const addMeasurementHandler = useCallback(
    async (input: { type: MeasurementEntry["type"]; value: number; unit?: string; timestamp?: string }) => {
      const entry = await addMeasurementDb(userId, {
        type: input.type,
        value: input.value,
        unit: input.unit,
        timestamp: input.timestamp,
      });
      setMeasurements((prev) => [entry, ...prev]);
    },
    [userId]
  );

  const updateMeasurementHandler = useCallback(
    async (entry: MeasurementEntry) => {
      await updateMeasurementDb(userId, entry);
      const updated = await getMeasurements(userId);
      setMeasurements(updated);
    },
    [userId]
  );

  const removeMeasurementHandler = useCallback(
    async (id: string) => {
      await removeMeasurementDb(userId, id);
      setMeasurements((prev) => prev.filter((entry) => entry.id !== id));
    },
    [userId]
  );

  const addFoodLibraryHandler = useCallback(
    async (input: Partial<FoodLibraryItem>) => {
      const item = await addFoodLibraryItem(userId, input);
      setFoodLibrary((prev) => [item, ...prev]);
    },
    [userId]
  );

  const updateFoodLibraryHandler = useCallback(
    async (item: FoodLibraryItem) => {
      await updateFoodLibraryItem(userId, item);
      const updated = await getFoodLibrary(userId);
      setFoodLibrary(updated);
    },
    [userId]
  );

  const removeFoodLibraryHandler = useCallback(
    async (id: string) => {
      await removeFoodLibraryItem(userId, id);
      setFoodLibrary((prev) => prev.filter((item) => item.id !== id));
    },
    [userId]
  );

  const toggleFoodFavoriteHandler = useCallback(
    async (id: string, favorite: boolean) => {
      await toggleFoodLibraryFavorite(userId, id, favorite);
      const updated = await getFoodLibrary(userId);
      setFoodLibrary(updated);
    },
    [userId]
  );

  const appendAudit = useCallback(
    async (action: string, detail: string, meta?: Record<string, unknown>) => {
      const event = await appendAuditEvent(userId, { action, detail, meta });
      setAuditLog((prev) => [event, ...prev]);
    },
    [userId]
  );

  const clearAudit = useCallback(async () => {
    await clearAuditLog(userId);
    setAuditLog([]);
  }, [userId]);

  const dailySummary = useMemo(() => buildDailySummary(entries), [entries]);
  const weeklySummary = useMemo(() => buildWeeklySummary(entries, 7), [entries]);

  const value = useMemo<TrackerContextValue>(
    () => ({
      entries,
      dailySummary: { ...dailySummary, mealCount: dailySummary.mealCount },
      weeklySummary,
      goals,
      updateGoals,
      settings,
      updateSettings,
      theme,
      flags: settings.flags,
      updateFlags,
      addFood: addFoodHandler,
      addDrink: addDrinkHandler,
      addWater: addWaterHandler,
      addActivity: addActivityHandler,
      addSleep: addSleepHandler,
      addEntries: addEntriesHandler,
      updateEntry: updateEntryHandler,
      removeEntry: removeEntryHandler,
      measurements,
      addMeasurement: addMeasurementHandler,
      updateMeasurement: updateMeasurementHandler,
      removeMeasurement: removeMeasurementHandler,
      foodLibrary,
      addFoodLibraryItem: addFoodLibraryHandler,
      updateFoodLibraryItem: updateFoodLibraryHandler,
      removeFoodLibraryItem: removeFoodLibraryHandler,
      toggleFoodLibraryFavorite: toggleFoodFavoriteHandler,
      auditLog,
      appendAudit,
      clearAuditLog: clearAudit,
      refresh,
    }),
    [
      entries,
      dailySummary,
      weeklySummary,
      goals,
      updateGoals,
      settings,
      updateSettings,
      theme,
      updateFlags,
      addFoodHandler,
      addDrinkHandler,
      addWaterHandler,
      addActivityHandler,
      addSleepHandler,
      addEntriesHandler,
      updateEntryHandler,
      removeEntryHandler,
      measurements,
      addMeasurementHandler,
      updateMeasurementHandler,
      removeMeasurementHandler,
      foodLibrary,
      addFoodLibraryHandler,
      updateFoodLibraryHandler,
      removeFoodLibraryHandler,
      toggleFoodFavoriteHandler,
      auditLog,
      appendAudit,
      clearAudit,
      refresh,
    ]
  );

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within TrackerProvider");
  }
  return context;
}
