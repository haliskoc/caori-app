import { Entry } from "@/lib/core/types";

const ENTRY_KEY = "calai.entries.v1";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadEntries() {
  return readStorage<Entry[]>(ENTRY_KEY, []);
}

export function saveEntries(entries: Entry[]) {
  writeStorage<Entry[]>(ENTRY_KEY, entries);
}
