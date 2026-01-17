import { StateCreator } from "zustand";
import {
  Entry,
  DailySummary,
  SleepEntry,
  SleepQuality,
  buildWeeklySummary,
} from "@calai/shared";
import type { ReportData } from "@calai/shared";
import api from "../../api/axios-instance";

export interface TrackerSlice {
  entries: Entry[];
  dailySummary: DailySummary | null;
  sleepLogs: SleepEntry[];
  isLoading: boolean;
  sleepLoading: boolean;
  error: string | null;

  fetchDailySummary: (date: string) => Promise<void>;
  fetchEntries: (date: string) => Promise<void>;
  fetchReportData: (rangeDays: number) => Promise<ReportData | null>;
  addEntry: (entry: Omit<Entry, "id">) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
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
  dailySummary: null,
  sleepLogs: [],
  isLoading: false,
  sleepLoading: false,
  error: null,

  fetchDailySummary: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/entries/summary?date=${date}`);
      set({ dailySummary: response.data });
    } catch (error) {
      try {
        const entriesResponse = await api.get(`/entries?date=${date}`);
        const fallback = buildWeeklySummary(entriesResponse.data, 1)[0] || null;
        set({ dailySummary: fallback || null });
      } catch (innerError) {
        set({ error: "Failed to fetch summary" });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEntries: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/entries?date=${date}`);
      set({ entries: response.data });
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
    try {
      const tempId = Math.random().toString();
      const newEntry = { ...entry, id: tempId } as Entry;

      set((state) => ({
        entries: [...state.entries, newEntry],
      }));

      const response = await api.post("/entries", entry);

      set((state) => ({
        entries: state.entries.map((e) =>
          e.id === tempId ? response.data : e,
        ),
      }));
    } catch (error) {
      set({ error: "Failed to add entry" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEntry: async (id: string) => {
    set({ isLoading: true });
    try {
      await api.delete(`/entries/${id}`);
      set((state) => ({
        entries: state.entries.filter((e) => e.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete entry" });
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
