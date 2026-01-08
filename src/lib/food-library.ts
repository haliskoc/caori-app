export type FoodLibrarySource = "manual" | "off";

export type FoodLibraryItem = {
  id: string;
  name: string;
  caloriesPer100: number;
  proteinPer100?: number;
  carbsPer100?: number;
  fatPer100?: number;
  imageUrl?: string;
  barcode?: string;
  source: FoodLibrarySource;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

const FOOD_LIBRARY_KEY = "calai.food-library.v1";

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

export function normalizeFoodLibraryItem(item: Partial<FoodLibraryItem>): FoodLibraryItem {
  const now = new Date().toISOString();
  return {
    id: item.id ?? `local-${Math.random().toString(36).slice(2, 9)}`,
    name: typeof item.name === "string" && item.name.trim() ? item.name.trim() : "Urun",
    caloriesPer100: Number(item.caloriesPer100) || 0,
    proteinPer100: Number(item.proteinPer100) || undefined,
    carbsPer100: Number(item.carbsPer100) || undefined,
    fatPer100: Number(item.fatPer100) || undefined,
    imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined,
    barcode: typeof item.barcode === "string" ? item.barcode : undefined,
    source: item.source === "off" ? "off" : "manual",
    favorite: Boolean(item.favorite),
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : now,
  };
}

export function loadFoodLibrary() {
  const items = readStorage<FoodLibraryItem[]>(FOOD_LIBRARY_KEY, []);
  return items.map((item) => normalizeFoodLibraryItem(item));
}

export function saveFoodLibrary(items: FoodLibraryItem[]) {
  writeStorage(FOOD_LIBRARY_KEY, items);
}
