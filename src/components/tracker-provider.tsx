"use client";

/* eslint-disable react-hooks/set-state-in-effect */

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
  Goals,
  MealType,
  MeasurementEntry,
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
import {
  loadMeasurements,
  saveMeasurements,
  normalizeMeasurement,
  measurementUnits,
} from "@/lib/measurements";
import { t } from "@/lib/i18n";

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
    note?: string;
  }) => Promise<void>;
  addEntries: (
    items: Entry[],
    options?: { mode?: "merge" | "replace"; source?: string }
  ) => Promise<number>;
  removeEntry: (id: string) => Promise<void>;
  updateEntry: (id: string, input: Entry) => Promise<void>;
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
  measurements: MeasurementEntry[];
  addMeasurement: (input: {
    type: MeasurementEntry["type"];
    value: number;
    unit?: string;
    timestamp?: string;
  }) => Promise<void>;
  updateMeasurement: (id: string, input: Partial<MeasurementEntry>) => Promise<void>;
  removeMeasurement: (id: string) => Promise<void>;
  importLocalMeasurements: () => Promise<number>;
};

const TrackerContext = createContext<TrackerContextValue | null>(null);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const GOALS_KEY = "calai.goals.v1";
const DEFAULT_GOALS: Goals = {
  waterGoalMl: 2500,
  calorieGoal: 2200,
  activityGoalMin: 30,
  mealGoalCount: 3,
  weightGoalKg: 0,
  proteinGoalG: 0,
  carbsGoalG: 0,
  fatGoalG: 0,
};

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];
const ACTIVITY_TYPES: ActivityType[] = [
  "walking",
  "running",
  "gym",
  "cycling",
  "swimming",
  "yoga",
  "hiit",
  "pilates",
  "stairs",
];
const AUDIT_ENABLED = false;

function normalizeEntry(entry: Entry): Entry {
  const timestampDate = new Date(entry.timestamp);
  const timestamp = Number.isNaN(timestampDate.getTime())
    ? new Date().toISOString()
    : timestampDate.toISOString();
  const id = entry.id || createId();
  if (entry.type === "food") {
    return {
      id,
      type: "food",
      name: entry.name?.trim() || t("Belirtilmedi"),
      calories: Number(entry.calories) || 0,
      mealType: MEAL_TYPES.includes(entry.mealType) ? entry.mealType : "snack",
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
  return {
    id,
    type: "activity",
    activityType: ACTIVITY_TYPES.includes(entry.activityType)
      ? entry.activityType
      : "walking",
    durationMin: Number(entry.durationMin) || 0,
    estimatedCalories: Number(entry.estimatedCalories) || 0,
    note:
      typeof (entry as { note?: string; name?: string }).note === "string"
        ? (entry as { note?: string }).note?.trim() || undefined
        : typeof (entry as { name?: string }).name === "string"
          ? (entry as { name?: string }).name?.trim() || undefined
          : undefined,
    timestamp,
  };
}

function sortEntries(list: Entry[]) {
  return [...list].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

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

function sortMeasurements(list: MeasurementEntry[]) {
  return [...list].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

function mergeMeasurements(primary: MeasurementEntry[], secondary: MeasurementEntry[]) {
  const merged = new Map<string, MeasurementEntry>();
  for (const entry of primary) {
    merged.set(entry.id, entry);
  }
  for (const entry of secondary) {
    if (!merged.has(entry.id)) {
      merged.set(entry.id, entry);
    }
  }
  return sortMeasurements(Array.from(merged.values()));
}

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
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(() =>
    AUDIT_ENABLED ? loadAuditLog() : []
  );
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>(() =>
    loadMeasurements()
  );
  const dataMode: "local" | "remote" = user?.sub ? "remote" : "local";
  const autoSyncRef = useRef({ entries: false, measurements: false });

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
    if (dataMode === "local" && AUDIT_ENABLED) {
      saveAuditLog(auditLog);
    }
  }, [auditLog, dataMode]);

  useEffect(() => {
    if (dataMode === "local") {
      saveMeasurements(measurements);
    }
  }, [dataMode, measurements]);

  const loadRemoteData = useCallback(async () => {
    try {
      const auditPromise = AUDIT_ENABLED
        ? fetch(`${API_BASE_URL}/api/v1/audit`, { credentials: "include", cache: "no-store" })
        : Promise.resolve(null);
      const [entriesRes, goalsRes, settingsRes, measurementsRes, auditRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/entries`, { credentials: "include", cache: "no-store" }),
        fetch(`${API_BASE_URL}/api/v1/goals`, { credentials: "include", cache: "no-store" }),
        fetch(`${API_BASE_URL}/api/v1/settings`, { credentials: "include", cache: "no-store" }),
        fetch(`${API_BASE_URL}/api/v1/measurements`, { credentials: "include", cache: "no-store" }),
        auditPromise,
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
          activityGoalMin: data?.activityGoalMin ?? DEFAULT_GOALS.activityGoalMin,
          mealGoalCount: data?.mealGoalCount ?? DEFAULT_GOALS.mealGoalCount,
          weightGoalKg: data?.weightGoalKg ?? DEFAULT_GOALS.weightGoalKg,
          proteinGoalG: data?.proteinGoalG ?? DEFAULT_GOALS.proteinGoalG,
          carbsGoalG: data?.carbsGoalG ?? DEFAULT_GOALS.carbsGoalG,
          fatGoalG: data?.fatGoalG ?? DEFAULT_GOALS.fatGoalG,
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
      if (AUDIT_ENABLED && auditRes && "ok" in auditRes && auditRes.ok) {
        const data = (await auditRes.json()) as AuditEvent[];
        setAuditLog(Array.isArray(data) ? data : []);
      }
      if (measurementsRes.ok) {
        const data = (await measurementsRes.json()) as MeasurementEntry[];
        const normalized = Array.isArray(data)
          ? data
            .map((entry) => normalizeMeasurement(entry))
            .filter((entry): entry is MeasurementEntry => Boolean(entry))
          : [];
        const localMeasurements = loadMeasurements();
        const merged = mergeMeasurements(normalized, localMeasurements);
        setMeasurements(merged);
        saveMeasurements(merged);
      } else {
        const localMeasurements = loadMeasurements();
        if (localMeasurements.length > 0) {
          setMeasurements(localMeasurements);
        }
      }
    } catch {
      // ignore network errors for MVP
    }
  }, []);

  const hydrateLocal = useCallback(() => {
    setEntries(loadEntries());
    setGoals(loadGoals());
    setMeasurements(loadMeasurements());
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
      void loadRemoteData();
      return;
    }
    autoSyncRef.current = { entries: false, measurements: false };
    hydrateLocal();
  }, [hydrateLocal, isLoading, loadRemoteData, user]);

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
        await fetch(`${API_BASE_URL}/api/v1/settings`, {
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
      if (!AUDIT_ENABLED) {
        return;
      }
      const event = buildAuditEvent({ action, detail, meta });
      setAuditLog((prev) => appendAuditEvent(event, prev));
      if (dataMode === "remote") {
        void fetch(`${API_BASE_URL}/api/v1/audit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(event),
        }).catch(() => undefined);
      }
    },
    [dataMode]
  );

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
      const response = await fetch(`${API_BASE_URL}/api/v1/entries/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ entries: normalized }),
      });
      if (response.ok) {
        await loadRemoteData();
        recordAudit("import", t("Toplu içe aktarma (bulut)"), {
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
    recordAudit("import", t("Toplu içe aktarma (cihaz)"), {
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
      name: input.name.trim() || t("Belirtilmedi"),
      calories: Number(input.calories) || 0,
      mealType: input.mealType,
      amountG: input.amountG,
      proteinG: input.proteinG,
      carbsG: input.carbsG,
      fatG: input.fatG,
      timestamp: new Date().toISOString(),
    };
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
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
        recordAudit("add", t("Yemek eklendi"), {
          calories: entry.calories,
          mealType: entry.mealType,
        });
        void loadRemoteData();
        return;
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", t("Yemek eklendi (yerel)"), {
          calories: entry.calories,
          mealType: entry.mealType,
        });
      }
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", t("Yemek eklendi"), {
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
      const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
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
        recordAudit("add", t("Su eklendi"), { amountMl: entry.amountMl });
        void loadRemoteData();
        return;
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", t("Su eklendi (yerel)"), { amountMl: entry.amountMl });
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", t("Su eklendi"), { amountMl: entry.amountMl });
  }

  async function addActivity(input: {
    activityType: ActivityType;
    durationMin: number;
    estimatedCalories: number;
    note?: string;
  }) {
    const entry: Entry = {
      id: createId(),
      type: "activity",
      activityType: input.activityType,
      durationMin: Number(input.durationMin) || 0,
      estimatedCalories: Number(input.estimatedCalories) || 0,
      note: input.note?.trim() || undefined,
      timestamp: new Date().toISOString(),
    };
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "activity",
          activityType: entry.activityType,
          durationMin: entry.durationMin,
          estimatedCalories: entry.estimatedCalories,
          note: entry.note,
          timestamp: entry.timestamp,
        }),
      });
      if (response.ok) {
        const created = (await response.json()) as Entry;
        const normalized = normalizeEntry(created);
        setEntries((prev) => [normalized, ...prev]);
        recordAudit("add", t("Aktivite eklendi"), {
          activityType: entry.activityType,
          durationMin: entry.durationMin,
        });
        void loadRemoteData();
        return;
      } else {
        setEntries((prev) => {
          const next = [entry, ...prev];
          saveEntries(next);
          return next;
        });
        recordAudit("add", t("Aktivite eklendi (yerel)"), {
          activityType: entry.activityType,
          durationMin: entry.durationMin,
        });
      }
      return;
    }
    setEntries((prev) => [entry, ...prev]);
    recordAudit("add", t("Aktivite eklendi"), {
      activityType: entry.activityType,
      durationMin: entry.durationMin,
    });
  }

  async function removeEntry(id: string) {
    const target = entries.find((entry) => entry.id === id);
    if (dataMode === "remote") {
      await fetch(`${API_BASE_URL}/api/v1/entries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (target) {
      recordAudit("remove", t("Kayıt silindi"), { type: target.type });
    }
  }

  async function updateGoals(next: Partial<Goals>) {
    const updated = { ...goals, ...next };
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/goals`, {
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
          activityGoalMin: data?.activityGoalMin ?? updated.activityGoalMin,
          mealGoalCount: data?.mealGoalCount ?? updated.mealGoalCount,
          weightGoalKg: data?.weightGoalKg ?? updated.weightGoalKg,
          proteinGoalG: data?.proteinGoalG ?? updated.proteinGoalG,
          carbsGoalG: data?.carbsGoalG ?? updated.carbsGoalG,
          fatGoalG: data?.fatGoalG ?? updated.fatGoalG,
        });
        recordAudit("update-goals", t("Hedefler güncellendi"), {
          waterGoalMl: data?.waterGoalMl ?? updated.waterGoalMl,
          calorieGoal: data?.calorieGoal ?? updated.calorieGoal,
          activityGoalMin: data?.activityGoalMin ?? updated.activityGoalMin,
          mealGoalCount: data?.mealGoalCount ?? updated.mealGoalCount,
          weightGoalKg: data?.weightGoalKg ?? updated.weightGoalKg,
          proteinGoalG: data?.proteinGoalG ?? updated.proteinGoalG,
          carbsGoalG: data?.carbsGoalG ?? updated.carbsGoalG,
          fatGoalG: data?.fatGoalG ?? updated.fatGoalG,
        });
        return;
      }
    }
    setGoals(updated);
    recordAudit("update-goals", t("Hedefler güncellendi"), updated);
  }

  async function updateEntry(id: string, input: Entry) {
    const normalized = normalizeEntry(input);
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/entries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...normalized, type: normalized.type }),
      });
      if (response.ok) {
        const updated = (await response.json()) as Entry;
        const nextEntry = normalizeEntry(updated);
        setEntries((prev) =>
          prev.map((entry) => (entry.id === id ? nextEntry : entry))
        );
        recordAudit("update-entry", t("Kayıt güncellendi"), {
          type: nextEntry.type,
        });
        void loadRemoteData();
        return;
      }
    }
    setEntries((prev) => prev.map((entry) => (entry.id === id ? normalized : entry)));
    recordAudit("update-entry", t("Kayıt güncellendi"), { type: normalized.type });
  }

  async function addMeasurement(input: {
    type: MeasurementEntry["type"];
    value: number;
    unit?: string;
    timestamp?: string;
  }) {
    const timestamp = input.timestamp ?? new Date().toISOString();
    const entry: MeasurementEntry = {
      id: createId(),
      type: input.type,
      value: Number(input.value) || 0,
      unit: input.unit || measurementUnits[input.type],
      timestamp,
    };
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/measurements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(entry),
      });
      if (response.ok) {
        const created = (await response.json()) as MeasurementEntry;
        const normalized = normalizeMeasurement(created);
        if (normalized) {
          setMeasurements((prev) => sortMeasurements([normalized, ...prev]));
        }
        recordAudit("measurement", t("Ölçüm eklendi"), {
          type: entry.type,
        });
        void loadRemoteData();
        return;
      }
    }
    setMeasurements((prev) => sortMeasurements([entry, ...prev]));
    recordAudit("measurement", t("Ölçüm eklendi"), { type: entry.type });
  }

  async function updateMeasurement(id: string, input: Partial<MeasurementEntry>) {
    if (dataMode === "remote") {
      const response = await fetch(`${API_BASE_URL}/api/v1/measurements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      });
      if (response.ok) {
        const updated = (await response.json()) as MeasurementEntry;
        const normalized = normalizeMeasurement(updated);
        if (normalized) {
          setMeasurements((prev) =>
            prev.map((entry) => (entry.id === id ? normalized : entry))
          );
        }
        recordAudit("measurement", t("Ölçüm güncellendi"), { id });
        void loadRemoteData();
        return;
      }
    }
    setMeasurements((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, ...input, id: entry.id } : entry
      )
    );
    recordAudit("measurement", t("Ölçüm güncellendi"), { id });
  }

  async function removeMeasurement(id: string) {
    if (dataMode === "remote") {
      await fetch(`${API_BASE_URL}/api/v1/measurements/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    setMeasurements((prev) => prev.filter((entry) => entry.id !== id));
    recordAudit("measurement", t("Ölçüm silindi"), { id });
  }

  function updateFlags(next: Partial<FeatureFlags>) {
    const merged = { ...flags, ...next };
    setFlags(merged);
    void syncSettings({ theme, reminder, flags: merged });
    recordAudit(
      "update-flags",
      t("Özellik bayrakları güncellendi"),
      next as Record<string, boolean>
    );
  }

  function updateTheme(next: Partial<ThemeSettings>) {
    const merged = { ...theme, ...next };
    setTheme(merged);
    void syncSettings({ theme: merged, reminder, flags });
    recordAudit("theme", t("Tema güncellendi"), next as Record<string, string>);
  }

  function updateReminder(next: Partial<ReminderSettings>) {
    const merged = { ...reminder, ...next };
    setReminder(merged);
    void syncSettings({ theme, reminder: merged, flags });
    const shouldLog = Object.keys(next).some((key) => key !== "lastNotifiedDay");
    if (shouldLog) {
      recordAudit(
        "reminder",
        t("Hatırlatıcı güncellendi"),
        next as Record<string, boolean | string>
      );
    }
  }

  function clearAuditLog() {
    if (!AUDIT_ENABLED) {
      return;
    }
    setAuditLog([]);
    if (dataMode === "remote") {
      void fetch(`${API_BASE_URL}/api/v1/audit`, {
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
      const response = await fetch(`${API_BASE_URL}/api/v1/entries/import`, {
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
      recordAudit("import", t("Yerel kayıtlar buluta taşındı"), { count: importedTotal });
    }
    return importedTotal;
  }, [dataMode, loadRemoteData, recordAudit]);

  const importLocalMeasurements = useCallback(async () => {
    if (dataMode !== "remote") {
      return 0;
    }
    const local = loadMeasurements();
    if (local.length === 0) {
      return 0;
    }
    const batchSize = 150;
    let importedTotal = 0;
    for (let index = 0; index < local.length; index += batchSize) {
      const batch = local.slice(index, index + batchSize);
      const response = await fetch(`${API_BASE_URL}/api/v1/measurements/import`, {
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
      recordAudit("measurement", t("Yerel ölçümler buluta taşındı"), {
        count: importedTotal,
      });
    }
    return importedTotal;
  }, [dataMode, loadRemoteData, recordAudit]);

  useEffect(() => {
    if (dataMode !== "remote") {
      return;
    }
    if (!autoSyncRef.current.entries) {
      autoSyncRef.current.entries = true;
      void importLocalEntries();
    }
    if (!autoSyncRef.current.measurements) {
      autoSyncRef.current.measurements = true;
      void importLocalMeasurements();
    }
  }, [dataMode, importLocalEntries, importLocalMeasurements]);

  useEffect(() => {
    if (dataMode !== "remote") {
      return;
    }
    function handleOnline() {
      void importLocalEntries();
      void importLocalMeasurements();
    }
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [dataMode, importLocalEntries, importLocalMeasurements]);

  useEffect(() => {
    if (dataMode !== "remote" || isLoading) {
      return;
    }
    void loadRemoteData();
    const interval = window.setInterval(() => {
      void loadRemoteData();
    }, 30000);
    return () => window.clearInterval(interval);
  }, [dataMode, isLoading, loadRemoteData]);

  const value: TrackerContextValue = {
    entries,
    addFood,
    addWater,
    addActivity,
    addEntries,
    removeEntry,
    updateEntry,
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
    measurements,
    addMeasurement,
    updateMeasurement,
    removeMeasurement,
    importLocalMeasurements,
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
