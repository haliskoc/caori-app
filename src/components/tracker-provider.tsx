"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import type {
  ActivityType,
  Entry,
  FoodEntry,
  MealType,
  WaterEntry,
} from "@/lib/types";
import { loadEntries, saveEntries } from "@/lib/storage";
import { buildWeeklySummary, createId, getDayKey } from "@/lib/utils";
import { FeatureFlags, defaultFlags, loadFlags, saveFlags } from "@/lib/flags";

type Goals = {
  waterGoalMl: number;
  calorieGoal: number;
};

type TrackerContextValue = {
  entries: Entry[];
  addFood: (input: { name: string; calories: number; mealType: MealType }) => Promise<void>;
  addWater: (input: { amountMl: number }) => Promise<void>;
  addActivity: (input: {
    activityType: ActivityType;
    durationMin: number;
    estimatedCalories: number;
  }) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  dailySummary: { caloriesIn: number; caloriesOut: number; waterMl: number };
  weeklySummary: ReturnType<typeof buildWeeklySummary>;
  goals: Goals;
  updateGoals: (next: Partial<Goals>) => Promise<void>;
  flags: FeatureFlags;
  updateFlags: (next: Partial<FeatureFlags>) => void;
  dataMode: "local" | "remote";
  importLocalEntries: () => Promise<number>;
};

const TrackerContext = createContext<TrackerContextValue | null>(null);

const GOALS_KEY = "calai.goals.v1";
const DEFAULT_GOALS: Goals = { waterGoalMl: 2500, calorieGoal: 2200 };

function loadGoals(): Goals {
  if (typeof window === "undefined") {
    return DEFAULT_GOALS;
  }
  try {
    const raw = window.localStorage.getItem(GOALS_KEY);
    if (!raw) {
      return DEFAULT_GOALS;
    }
    const parsed = JSON.parse(raw) as Partial<Goals>;
    return { ...DEFAULT_GOALS, ...parsed };
  } catch {
    return DEFAULT_GOALS;
  }
}

function saveGoals(goals: Goals) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [goals, setGoals] = useState<Goals>(DEFAULT_GOALS);
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const [dataMode, setDataMode] = useState<"local" | "remote">("local");

  useEffect(() => {
    setFlags(loadFlags());
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/v1/flags")
      .then((response) => (response.ok ? response.json() : null))
      .then((remoteFlags) => {
        if (!remoteFlags || !active) {
          return;
        }
        setFlags((prev) => ({ ...prev, ...remoteFlags }));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (dataMode === "local") {
      saveEntries(entries);
    }
  }, [entries, dataMode]);

  useEffect(() => {
    if (dataMode === "local") {
      saveGoals(goals);
    }
  }, [goals, dataMode]);

  useEffect(() => {
    saveFlags(flags);
  }, [flags]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user?.sub) {
      setDataMode("remote");
      void loadRemoteData();
    } else {
      setDataMode("local");
      setEntries(loadEntries());
      setGoals(loadGoals());
    }
  }, [user, isLoading]);

  const dailySummary = useMemo(() => {
    const todayKey = getDayKey(new Date());
    const todayEntries = entries.filter((entry) => getDayKey(entry.timestamp) === todayKey);
    return {
      caloriesIn: todayEntries.reduce((sum, entry) => {
        if (entry.type === "food") {
          return sum + entry.calories;
        }
        return sum;
      }, 0),
      caloriesOut: todayEntries.reduce((sum, entry) => {
        if (entry.type === "activity") {
          return sum + entry.estimatedCalories;
        }
        return sum;
      }, 0),
      waterMl: todayEntries.reduce((sum, entry) => {
        if (entry.type === "water") {
          return sum + entry.amountMl;
        }
        return sum;
      }, 0),
    };
  }, [entries]);

  const weeklySummary = useMemo(() => buildWeeklySummary(entries, 7), [entries]);

  async function loadRemoteData() {
    try {
      const [entriesRes, goalsRes] = await Promise.all([
        fetch("/api/v1/entries", { credentials: "include" }),
        fetch("/api/v1/goals", { credentials: "include" }),
      ]);
      if (entriesRes.ok) {
        const data = (await entriesRes.json()) as Entry[];
        setEntries(data);
      }
      if (goalsRes.ok) {
        const data = (await goalsRes.json()) as Goals;
        setGoals({
          waterGoalMl: data?.waterGoalMl ?? DEFAULT_GOALS.waterGoalMl,
          calorieGoal: data?.calorieGoal ?? DEFAULT_GOALS.calorieGoal,
        });
      }
    } catch {
      // ignore network errors for MVP
    }
  }

  async function addFood(input: { name: string; calories: number; mealType: MealType }) {
    const entry: FoodEntry = {
      id: createId(),
      type: "food",
      name: input.name.trim() || "Belirtilmedi",
      calories: Number(input.calories) || 0,
      mealType: input.mealType,
      timestamp: new Date().toISOString(),
    };
    if (dataMode === "remote") {
      const response = await fetch("/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "food",
          name: entry.name,
          calories: entry.calories,
          mealType: entry.mealType,
          timestamp: entry.timestamp,
        }),
      });
      if (response.ok) {
        const created = (await response.json()) as Entry;
        setEntries((prev) => [created, ...prev]);
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
  }

  async function addWater(input: { amountMl: number }) {
    const entry: WaterEntry = {
      id: createId(),
      type: "water",
      amountMl: Number(input.amountMl) || 0,
      timestamp: new Date().toISOString(),
    };
    if (dataMode === "remote") {
      const response = await fetch("/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "water",
          amountMl: entry.amountMl,
          timestamp: entry.timestamp,
        }),
      });
      if (response.ok) {
        const created = (await response.json()) as Entry;
        setEntries((prev) => [created, ...prev]);
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
  }

  async function addActivity(input: {
    activityType: ActivityType;
    durationMin: number;
    estimatedCalories: number;
  }) {
    const entry: Entry = {
      id: createId(),
      type: "activity",
      activityType: input.activityType,
      durationMin: Number(input.durationMin) || 0,
      estimatedCalories: Number(input.estimatedCalories) || 0,
      timestamp: new Date().toISOString(),
    };
    if (dataMode === "remote") {
      const response = await fetch("/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "activity",
          activityType: entry.activityType,
          durationMin: entry.durationMin,
          estimatedCalories: entry.estimatedCalories,
          timestamp: entry.timestamp,
        }),
      });
      if (response.ok) {
        const created = (await response.json()) as Entry;
        setEntries((prev) => [created, ...prev]);
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
  }

  async function removeEntry(id: string) {
    if (dataMode === "remote") {
      await fetch(`/api/v1/entries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  async function updateGoals(next: Partial<Goals>) {
    const updated = { ...goals, ...next };
    if (dataMode === "remote") {
      const response = await fetch("/api/v1/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updated),
      });
      if (response.ok) {
        const data = (await response.json()) as Goals;
        setGoals({
          waterGoalMl: data?.waterGoalMl ?? updated.waterGoalMl,
          calorieGoal: data?.calorieGoal ?? updated.calorieGoal,
        });
        return;
      }
    }
    setGoals(updated);
  }

  function updateFlags(next: Partial<FeatureFlags>) {
    setFlags((prev) => ({ ...prev, ...next }));
  }

  async function importLocalEntries() {
    if (dataMode !== "remote") {
      return 0;
    }
    const localEntries = loadEntries();
    if (localEntries.length === 0) {
      return 0;
    }
    const response = await fetch("/api/v1/entries/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ entries: localEntries }),
    });
    if (response.ok) {
      const data = (await response.json()) as { imported: number } | null;
      await loadRemoteData();
      return data?.imported ?? localEntries.length;
    }
    return 0;
  }

  const value: TrackerContextValue = {
    entries,
    addFood,
    addWater,
    addActivity,
    removeEntry,
    dailySummary,
    weeklySummary,
    goals,
    updateGoals,
    flags,
    updateFlags,
    dataMode,
    importLocalEntries,
  };

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within TrackerProvider");
  }
  return context;
}
