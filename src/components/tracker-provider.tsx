"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { FeatureFlags, loadFlags, saveFlags } from "@/lib/flags";
import {
  AuditEvent,
  appendAuditEvent,
  buildAuditEvent,
  loadAuditLog,
  saveAuditLog,
} from "@/lib/audit";
import { ThemeSettings, applyTheme, loadTheme, saveTheme } from "@/lib/theme";
import { ReminderSettings, loadReminder, saveReminder } from "@/lib/reminders";

type Goals = {
  waterGoalMl: number;
  calorieGoal: number;
};

type TrackerContextValue = {
  entries: Entry[];
  addFood: (input: {
    name: string;
    calories: number;
    mealType: MealType;
    amountG?: number;
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
  }) => Promise<void>;
  addWater: (input: { amountMl: number }) => Promise<void>;
  addActivity: (input: {
    activityType: ActivityType;
    durationMin: number;
    estimatedCalories: number;
  }) => Promise<void>;
  addEntries: (
    items: Entry[],
    options?: { mode?: "merge" | "replace"; source?: string }
  ) => Promise<number>;
  removeEntry: (id: string) => Promise<void>;
  dailySummary: {
    caloriesIn: number;
    caloriesOut: number;
    waterMl: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
  };
  weeklySummary: ReturnType<typeof buildWeeklySummary>;
  goals: Goals;
  updateGoals: (next: Partial<Goals>) => Promise<void>;
  flags: FeatureFlags;
  updateFlags: (next: Partial<FeatureFlags>) => void;
  theme: ThemeSettings;
  updateTheme: (next: Partial<ThemeSettings>) => void;
  reminder: ReminderSettings;
  updateReminder: (next: Partial<ReminderSettings>) => void;
  auditLog: AuditEvent[];
  clearAuditLog: () => void;
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
  const [entries, setEntries] = useState<Entry[]>(() => loadEntries());
  const [goals, setGoals] = useState<Goals>(() => loadGoals());
  const [flags, setFlags] = useState<FeatureFlags>(() => loadFlags());
  const [theme, setTheme] = useState<ThemeSettings>(() => loadTheme());
  const [reminder, setReminder] = useState<ReminderSettings>(() => loadReminder());
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(() => loadAuditLog());
  const dataMode: "local" | "remote" = user?.sub ? "remote" : "local";
  const autoSyncRef = useRef(false);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  useEffect(() => {
    if (dataMode === "local") {
      saveGoals(goals);
    }
  }, [goals, dataMode]);

  useEffect(() => {
    if (dataMode === "local") {
      saveFlags(flags);
    }
  }, [dataMode, flags]);

  useEffect(() => {
    if (dataMode === "local") {
      saveTheme(theme);
    }
    applyTheme(theme);
  }, [dataMode, theme]);

  useEffect(() => {
    if (dataMode === "local") {
      saveReminder(reminder);
    }
  }, [dataMode, reminder]);

  useEffect(() => {
    if (dataMode === "local") {
      saveAuditLog(auditLog);
    }
  }, [auditLog, dataMode]);

  function mergeEntries(primary: Entry[], secondary: Entry[]) {
    const merged = new Map<string, Entry>();
    for (const entry of primary) {
      merged.set(entry.id, entry);
    }
    for (const entry of secondary) {
      if (!merged.has(entry.id)) {
        merged.set(entry.id, entry);
      }
    }
    return sortEntries(Array.from(merged.values()));
  }

  const loadRemoteData = useCallback(async () => {
    try {
      const [entriesRes, goalsRes, settingsRes, auditRes] = await Promise.all([
        fetch("/api/v1/entries", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/goals", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/settings", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/audit", { credentials: "include", cache: "no-store" }),
      ]);
      if (entriesRes.ok) {
        const data = (await entriesRes.json()) as Entry[];
        const normalized = Array.isArray(data) ? data.map(normalizeEntry) : [];
        const localEntries = loadEntries();
        const merged = mergeEntries(normalized, localEntries);
        setEntries(merged);
        saveEntries(merged);
      } else {
        const localEntries = loadEntries();
        if (localEntries.length > 0) {
          setEntries(localEntries);
        }
      }
      if (goalsRes.ok) {
        const data = (await goalsRes.json()) as Goals;
        setGoals({
          waterGoalMl: data?.waterGoalMl ?? DEFAULT_GOALS.waterGoalMl,
          calorieGoal: data?.calorieGoal ?? DEFAULT_GOALS.calorieGoal,
        });
      }
      if (settingsRes.ok) {
        const data = (await settingsRes.json()) as {
          theme?: ThemeSettings;
          reminder?: ReminderSettings;
          flags?: FeatureFlags;
        };
        if (data?.theme) {
          setTheme((prev) => ({ ...prev, ...data.theme }));
        }
        if (data?.reminder) {
          setReminder((prev) => ({ ...prev, ...data.reminder }));
        }
        if (data?.flags) {
          setFlags((prev) => ({ ...prev, ...data.flags }));
        }
      }
      if (auditRes.ok) {
        const data = (await auditRes.json()) as AuditEvent[];
        setAuditLog(Array.isArray(data) ? data : []);
      }
    } catch {
      // ignore network errors for MVP
    }
  }, []);

  const hydrateLocal = useCallback(() => {
    setEntries(loadEntries());
    setGoals(loadGoals());
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user?.sub) {
      const localSnapshot = loadEntries();
      if (localSnapshot.length > 0) {
        setEntries(localSnapshot);
      }
      setGoals(DEFAULT_GOALS);
      setAuditLog([]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadRemoteData();
      return;
    }
    autoSyncRef.current = false;
    hydrateLocal();
  }, [hydrateLocal, isLoading, loadRemoteData, user]);

  useEffect(() => {
    if (dataMode !== "remote") {
      return;
    }
    if (!autoSyncRef.current) {
      autoSyncRef.current = true;
      void importLocalEntries();
    }
  }, [dataMode, importLocalEntries]);

  useEffect(() => {
    if (dataMode !== "remote") {
      return;
    }
    function handleOnline() {
      void importLocalEntries();
    }
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [dataMode, importLocalEntries]);

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
      proteinG: todayEntries.reduce((sum, entry) => {
        if (entry.type === "food") {
          return sum + (entry.proteinG ?? 0);
        }
        return sum;
      }, 0),
      carbsG: todayEntries.reduce((sum, entry) => {
        if (entry.type === "food") {
          return sum + (entry.carbsG ?? 0);
        }
        return sum;
      }, 0),
      fatG: todayEntries.reduce((sum, entry) => {
        if (entry.type === "food") {
          return sum + (entry.fatG ?? 0);
        }
        return sum;
      }, 0),
    };
  }, [entries]);

  const weeklySummary = useMemo(() => buildWeeklySummary(entries, 7), [entries]);

  const syncSettings = useCallback(
    async (nextSettings: {
      theme: ThemeSettings;
      reminder: ReminderSettings;
      flags: FeatureFlags;
    }) => {
      if (dataMode !== "remote") {
        return;
      }
      try {
        await fetch("/api/v1/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(nextSettings),
        });
      } catch {
        // ignore persistence errors for MVP
      }
    },
    [dataMode]
  );

  const recordAudit = useCallback(
    (
      action: AuditEvent["action"],
      detail: string,
      meta?: Record<string, string | number | boolean>
    ) => {
      const event = buildAuditEvent({ action, detail, meta });
      setAuditLog((prev) => appendAuditEvent(event, prev));
      if (dataMode === "remote") {
        void fetch("/api/v1/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(event),
        }).catch(() => undefined);
      }
    },
    [dataMode]
  );

  function normalizeEntry(entry: Entry): Entry {
    const timestampDate = new Date(entry.timestamp);
    const timestamp = Number.isNaN(timestampDate.getTime())
      ? new Date().toISOString()
      : timestampDate.toISOString();
    const id = entry.id || createId();
    if (entry.type === "food") {
      const mealType: MealType[] = ["breakfast", "lunch", "dinner", "snack"];
      return {
        id,
        type: "food",
        name: entry.name?.trim() || "Belirtilmedi",
        calories: Number(entry.calories) || 0,
        mealType: mealType.includes(entry.mealType) ? entry.mealType : "snack",
        amountG: Number.isFinite(Number(entry.amountG)) ? Number(entry.amountG) : undefined,
        proteinG: Number.isFinite(Number(entry.proteinG)) ? Number(entry.proteinG) : undefined,
        carbsG: Number.isFinite(Number(entry.carbsG)) ? Number(entry.carbsG) : undefined,
        fatG: Number.isFinite(Number(entry.fatG)) ? Number(entry.fatG) : undefined,
        timestamp,
      };
    }
    if (entry.type === "water") {
      return {
        id,
        type: "water",
        amountMl: Number(entry.amountMl) || 0,
        timestamp,
      };
    }
    const activityType: ActivityType[] = ["walking", "running", "gym"];
    return {
      id,
      type: "activity",
      activityType: activityType.includes(entry.activityType) ? entry.activityType : "walking",
      durationMin: Number(entry.durationMin) || 0,
      estimatedCalories: Number(entry.estimatedCalories) || 0,
      timestamp,
    };
  }

  function sortEntries(list: Entry[]) {
    return [...list].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async function addEntries(
    items: Entry[],
    options?: { mode?: "merge" | "replace"; source?: string }
  ) {
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }
    const normalized = items.map(normalizeEntry);
    const mode = options?.mode ?? "merge";
    if (dataMode === "remote") {
      const response = await fetch("/api/v1/entries/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ entries: normalized }),
      });
      if (response.ok) {
        await loadRemoteData();
        recordAudit("import", "Toplu içe aktarma (bulut)", {
          count: normalized.length,
          source: options?.source ?? "bulk",
        });
        return normalized.length;
      }
      return 0;
    }
    setEntries((prev) => {
      if (mode === "replace") {
        return sortEntries(normalized);
      }
      const existingIds = new Set(prev.map((entry) => entry.id));
      const merged = [
        ...normalized,
        ...prev.filter((entry) => !existingIds.has(entry.id)),
      ];
      return sortEntries(merged);
    });
    recordAudit("import", "Toplu içe aktarma (cihaz)", {
      count: normalized.length,
      source: options?.source ?? "bulk",
    });
    return normalized.length;
  }

  async function addFood(input: {
    name: string;
    calories: number;
    mealType: MealType;
    amountG?: number;
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
  }) {
    const entry: FoodEntry = {
      id: createId(),
      type: "food",
      name: input.name.trim() || "Belirtilmedi",
      calories: Number(input.calories) || 0,
      mealType: input.mealType,
      amountG: input.amountG,
      proteinG: input.proteinG,
      carbsG: input.carbsG,
      fatG: input.fatG,
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
          amountG: entry.amountG,
          proteinG: entry.proteinG,
          carbsG: entry.carbsG,
          fatG: entry.fatG,
          timestamp: entry.timestamp,
        }),
      });
      if (response.ok) {
        const created = (await response.json()) as Entry;
        const normalized = normalizeEntry(created);
        setEntries((prev) => [normalized, ...prev]);
        recordAudit("add", "Yemek eklendi", {
          calories: entry.calories,
          mealType: entry.mealType,
        });
        void loadRemoteData();
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", "Yemek eklendi (yerel)", {
          calories: entry.calories,
          mealType: entry.mealType,
        });
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", "Yemek eklendi", {
      calories: entry.calories,
      mealType: entry.mealType,
    });
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
        const normalized = normalizeEntry(created);
        setEntries((prev) => [normalized, ...prev]);
        recordAudit("add", "Su eklendi", { amountMl: entry.amountMl });
        void loadRemoteData();
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", "Su eklendi (yerel)", { amountMl: entry.amountMl });
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", "Su eklendi", { amountMl: entry.amountMl });
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
        const normalized = normalizeEntry(created);
        setEntries((prev) => [normalized, ...prev]);
        recordAudit("add", "Aktivite eklendi", {
          activityType: entry.activityType,
          durationMin: entry.durationMin,
        });
        void loadRemoteData();
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", "Aktivite eklendi (yerel)", {
          activityType: entry.activityType,
          durationMin: entry.durationMin,
        });
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", "Aktivite eklendi", {
      activityType: entry.activityType,
      durationMin: entry.durationMin,
    });
  }

  async function removeEntry(id: string) {
    const target = entries.find((entry) => entry.id === id);
    if (dataMode === "remote") {
      await fetch(`/api/v1/entries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (target) {
      recordAudit("remove", "Kayıt silindi", { type: target.type });
    }
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
        recordAudit("update-goals", "Hedefler güncellendi", {
          waterGoalMl: data?.waterGoalMl ?? updated.waterGoalMl,
          calorieGoal: data?.calorieGoal ?? updated.calorieGoal,
        });
        return;
      }
    }
    setGoals(updated);
    recordAudit("update-goals", "Hedefler güncellendi", updated);
  }

  function updateFlags(next: Partial<FeatureFlags>) {
    const merged = { ...flags, ...next };
    setFlags(merged);
    void syncSettings({ theme, reminder, flags: merged });
    recordAudit("update-flags", "Özellik bayrakları güncellendi", next as Record<string, boolean>);
  }

  function updateTheme(next: Partial<ThemeSettings>) {
    const merged = { ...theme, ...next };
    setTheme(merged);
    void syncSettings({ theme: merged, reminder, flags });
    recordAudit("theme", "Tema güncellendi", next as Record<string, string>);
  }

  function updateReminder(next: Partial<ReminderSettings>) {
    const merged = { ...reminder, ...next };
    setReminder(merged);
    void syncSettings({ theme, reminder: merged, flags });
    const shouldLog = Object.keys(next).some((key) => key !== "lastNotifiedDay");
    if (shouldLog) {
      recordAudit("reminder", "Hatırlatıcı güncellendi", next as Record<string, boolean | string>);
    }
  }

  function clearAuditLog() {
    setAuditLog([]);
    if (dataMode === "remote") {
      void fetch("/api/v1/audit", {
        method: "DELETE",
        credentials: "include",
      }).catch(() => undefined);
    }
  }

  const importLocalEntries = useCallback(async () => {
    if (dataMode !== "remote") {
      return 0;
    }
    const localEntries = loadEntries();
    if (localEntries.length === 0) {
      return 0;
    }
    const batchSize = 200;
    let importedTotal = 0;
    for (let index = 0; index < localEntries.length; index += batchSize) {
      const batch = localEntries.slice(index, index + batchSize);
      const response = await fetch("/api/v1/entries/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ entries: batch }),
      });
      if (!response.ok) {
        break;
      }
      const data = (await response.json()) as { imported: number } | null;
      importedTotal += data?.imported ?? batch.length;
    }
    if (importedTotal > 0) {
      await loadRemoteData();
      recordAudit("import", "Yerel kayıtlar buluta taşındı", { count: importedTotal });
    }
    return importedTotal;
  }, [dataMode, loadRemoteData, recordAudit]);

  const value: TrackerContextValue = {
    entries,
    addFood,
    addWater,
    addActivity,
    addEntries,
    removeEntry,
    dailySummary,
    weeklySummary,
    goals,
    updateGoals,
    flags,
    updateFlags,
    theme,
    updateTheme,
    reminder,
    updateReminder,
    auditLog,
    clearAuditLog,
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
