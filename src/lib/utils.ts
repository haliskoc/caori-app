import { Entry, DailySummary } from "./types";

export const DAY_MS = 24 * 60 * 60 * 1000;

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2, 10)}`;
}

export function getDayKey(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLastNDays(n: number, from = new Date()) {
  return Array.from({ length: n }).map((_, index) => {
    const date = new Date(from.getTime() - (n - index - 1) * DAY_MS);
    return getDayKey(date);
  });
}

export function formatShortDate(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function buildWeeklySummary(entries: Entry[], days = 7): DailySummary[] {
  const dayKeys = getLastNDays(days);
  return dayKeys.map((date) => {
    const dailyEntries = entries.filter((entry) => getDayKey(entry.timestamp) === date);
    const mealSet = new Set<string>();
    const caloriesIn = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food") {
        mealSet.add(entry.mealType);
        return sum + entry.calories;
      }
      return sum;
    }, 0);
    const caloriesOut = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "activity") {
        return sum + entry.estimatedCalories;
      }
      return sum;
    }, 0);
    const activityMin = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "activity") {
        return sum + entry.durationMin;
      }
      return sum;
    }, 0);
    const waterMl = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "water") {
        return sum + entry.amountMl;
      }
      return sum;
    }, 0);
    const proteinG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food") {
        return sum + (entry.proteinG ?? 0);
      }
      return sum;
    }, 0);
    const carbsG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food") {
        return sum + (entry.carbsG ?? 0);
      }
      return sum;
    }, 0);
    const fatG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food") {
        return sum + (entry.fatG ?? 0);
      }
      return sum;
    }, 0);
    return {
      date,
      caloriesIn,
      caloriesOut,
      waterMl,
      activityMin,
      mealCount: mealSet.size,
      proteinG,
      carbsG,
      fatG,
    };
  });
}
