import { StateCreator } from "zustand";
import {
  Entry,
  DailySummary,
  SleepEntry,
  SleepQuality,
  buildWeeklySummary,
  FoodEntry as SharedFoodEntry,
  WaterEntry as SharedWaterEntry,
  ActivityEntry as SharedActivityEntry,
} from "@calai/shared";
import type { ReportData } from "@calai/shared";
import api from "../../api/axios-instance";
import { FoodEntriesRepository } from "../../lib/database/repositories/food-entries.repo";
import { WaterEntriesRepository } from "../../lib/database/repositories/water-entries.repo";
import { ActivityEntriesRepository } from "../../lib/database/repositories/activity-entries.repo";
import { nanoid } from "nanoid/non-secure";

export interface TrackerSlice {
  entries: Entry[];
  pendingEntries: Entry[];
  dailySummary: DailySummary | null;
  sleepLogs: SleepEntry[];
  isLoading: boolean;
  sleepLoading: boolean;
  error: string | null;

  fetchDailySummary: (date: string) => Promise<void>;
  fetchEntries: (date: string) => Promise<void>;
  fetchReportData: (rangeDays: number) => Promise<ReportData | null>;
  addEntry: (entry: Omit<Entry, "id">) => Promise<void>;
  updateEntry: (
    id: string,
    entry: Partial<Entry> & { type: Entry["type"] },
  ) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  syncPendingEntries: () => Promise<void>;
  fetchSleepLogs: () => Promise<void>;
  addSleepLog: (input: {
    sleepStart: string;
    sleepEnd: string;
    quality: SleepQuality;
    note?: string;
  }) => Promise<void>;
  updateSleepLog: (
    id: string,
    input: {
      sleepStart: string;
      sleepEnd: string;
      quality: SleepQuality;
      note?: string;
    },
  ) => Promise<void>;
  deleteSleepLog: (id: string) => Promise<void>;
}

export const createTrackerSlice: StateCreator<TrackerSlice> = (set, get) => ({
  entries: [],
  pendingEntries: [],
  dailySummary: null,
  sleepLogs: [],
  isLoading: false,
  sleepLoading: false,
  error: null,

  fetchDailySummary: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      // 1. First try to load from local SQLite
      const foodLocal = await FoodEntriesRepository.getAllByDay(date);
      const waterLocal = await WaterEntriesRepository.getAllByDay(date);
      const activityLocal = await ActivityEntriesRepository.getAllByDay(date);

      // Merge and map to Entry type
      const localEntries: Entry[] = [
        ...foodLocal.map((f) => ({ ...f, type: "food" }) as any),
        ...waterLocal.map((w) => ({ ...w, type: "water" }) as any),
        ...activityLocal.map((a) => ({ ...a, type: "activity" }) as any),
      ];

      // Calculate summary locally if API fails or we want offline-first
      const summary = buildWeeklySummary(localEntries, 1)[0] || null;
      set({ dailySummary: summary, entries: localEntries });

      // 2. Optionally try to sync with API
      try {
        const response = await api.get(`/entries/summary?date=${date}`);
        if (response.data) {
          set({ dailySummary: response.data });
        }
      } catch (e) {
        console.log("Offline mode: using local summary");
      }
    } catch (error) {
      set({ error: "Failed to fetch summary" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEntries: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const foodLocal = await FoodEntriesRepository.getAllByDay(date);
      const waterLocal = await WaterEntriesRepository.getAllByDay(date);
      const activityLocal = await ActivityEntriesRepository.getAllByDay(date);

      const localEntries: Entry[] = [
        ...foodLocal.map((f) => ({ ...f, type: "food" }) as any),
        ...waterLocal.map((w) => ({ ...w, type: "water" }) as any),
        ...activityLocal.map((a) => ({ ...a, type: "activity" }) as any),
      ];

      set({ entries: localEntries });
    } catch (error) {
      set({ error: "Failed to fetch entries" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReportData: async (rangeDays: number) => {
    try {
      const response = await api.get(`/report?range=${rangeDays}`);
      return response.data as ReportData;
    } catch (error) {
      set({ error: "Failed to fetch report" });
      return null;
    }
  },

  addEntry: async (entry) => {
    set({ isLoading: true, error: null });
    const id = nanoid();
    const newEntry = { ...entry, id } as Entry;

    try {
      // 1. Save to SQLite first (Offline First)
      if (entry.type === "food") {
        const e = entry as SharedFoodEntry;
        await FoodEntriesRepository.insert({
          id,
          name: e.name,
          brand: e.brand,
          calories: e.calories,
          protein_g: e.proteinG,
          carbs_g: e.carbsG,
          fat_g: e.fatG,
          amount_g: e.amountG,
          barcode: e.barcode,
          meal_type: e.mealType,
          timestamp: e.timestamp,
        });
      } else if (entry.type === "water") {
        const e = entry as SharedWaterEntry;
        await WaterEntriesRepository.insert({
          id,
          amount_ml: e.amountMl,
          timestamp: e.timestamp,
        });
      } else if (entry.type === "activity") {
        const e = entry as SharedActivityEntry;
        await ActivityEntriesRepository.insert({
          id,
          activity_type: e.activityType,
          duration_min: e.durationMin,
          calories_burned: e.estimatedCalories,
          timestamp: e.timestamp,
        });
      }

      set((state) => ({
        entries: [newEntry, ...state.entries],
      }));

      // 2. Try to sync with API in background
      api.post("/entries", entry).catch((err) => {
        console.log("API Sync failed, entry remains in local DB", err);
        set((state) => ({
          pendingEntries: [...state.pendingEntries, newEntry],
        }));
      });
    } catch (error) {
      console.error("Local DB Error:", error);
      set({ error: "Failed to add entry locally" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateEntry: async (id, entry) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/entries/${id}`, entry);
      if (response.data) {
        set((state) => ({
          entries: state.entries.map((item) =>
            item.id === id ? response.data : item,
          ),
        }));
      }
    } catch (error) {
      set({ error: "Failed to update entry" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEntry: async (id: string) => {
    set({ isLoading: true });
    try {
      // 1. Delete from SQLite
      await FoodEntriesRepository.delete(id);
      await WaterEntriesRepository.delete(id);
      await ActivityEntriesRepository.delete(id);

      set((state) => ({
        entries: state.entries.filter((e) => e.id !== id),
      }));

      // 2. Delete from API
      await api
        .delete(`/entries/${id}`)
        .catch((e) => console.log("API Delete failed"));
    } catch (error) {
      set({ error: "Failed to delete entry" });
    } finally {
      set({ isLoading: false });
    }
  },

  syncPendingEntries: async () => {
    const { pendingEntries } = get();
    if (pendingEntries.length === 0) return;
    set({ isLoading: true });
    try {
      const synced: string[] = [];
      for (const entry of pendingEntries) {
        const { id: _id, ...payload } = entry;
        const response = await api.post("/entries", payload);
        if (response.data) {
          synced.push(entry.id);
          set((state) => ({
            entries: state.entries.map((item) =>
              item.id === entry.id ? response.data : item,
            ),
          }));
        }
      }
      if (synced.length) {
        set((state) => ({
          pendingEntries: state.pendingEntries.filter(
            (item) => !synced.includes(item.id),
          ),
        }));
      }
    } catch (error) {
      set({ error: "Failed to sync entries" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSleepLogs: async () => {
    set({ sleepLoading: true, error: null });
    try {
      const response = await api.get("/sleep");
      set({ sleepLogs: response.data });
    } catch (error) {
      set({ error: "Failed to fetch sleep logs" });
    } finally {
      set({ sleepLoading: false });
    }
  },

  addSleepLog: async (input) => {
    set({ sleepLoading: true, error: null });
    try {
      const response = await api.post("/sleep", input);
      set((state) => ({
        sleepLogs: [response.data, ...state.sleepLogs],
      }));
    } catch (error) {
      set({ error: "Failed to add sleep log" });
    } finally {
      set({ sleepLoading: false });
    }
  },

  updateSleepLog: async (id, input) => {
    set({ sleepLoading: true, error: null });
    try {
      const response = await api.put(`/sleep/${id}`, input);
      set((state) => ({
        sleepLogs: state.sleepLogs.map((log) =>
          log.id === id ? response.data : log,
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update sleep log" });
    } finally {
      set({ sleepLoading: false });
    }
  },

  deleteSleepLog: async (id: string) => {
    set({ sleepLoading: true, error: null });
    try {
      await api.delete(`/sleep/${id}`);
      set((state) => ({
        sleepLogs: state.sleepLogs.filter((log) => log.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete sleep log" });
    } finally {
      set({ sleepLoading: false });
    }
  },
});
