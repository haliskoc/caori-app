import type {
  ActivityEntry,
  ActivityType,
  DrinkEntry,
  Entry,
  FoodEntry,
  MealType,
  SleepEntry,
  WaterEntry,
} from "@calai/shared/types";
import { all, run } from "@/db";
import { createId } from "@/lib/id";

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

function toNumber(value: unknown, fallback = 0) {
  const num = typeof value === "string" ? Number.parseFloat(value) : Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function normalizeFood(input: Partial<FoodEntry>): FoodEntry {
  return {
    id: input.id || createId("food"),
    type: "food",
    name: (input.name || "").trim() || "Belirtilmedi",
    calories: Math.round(toNumber(input.calories, 0)),
    mealType: MEAL_TYPES.includes(input.mealType as MealType) ? (input.mealType as MealType) : "snack",
    amountG: Number.isFinite(toNumber(input.amountG, Number.NaN))
      ? Math.round(toNumber(input.amountG, 0))
      : undefined,
    proteinG: Number.isFinite(toNumber(input.proteinG, Number.NaN))
      ? toNumber(input.proteinG, 0)
      : undefined,
    carbsG: Number.isFinite(toNumber(input.carbsG, Number.NaN))
      ? toNumber(input.carbsG, 0)
      : undefined,
    fatG: Number.isFinite(toNumber(input.fatG, Number.NaN))
      ? toNumber(input.fatG, 0)
      : undefined,
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };
}

function normalizeDrink(input: Partial<DrinkEntry>): DrinkEntry {
  return {
    id: input.id || createId("drink"),
    type: "drink",
    name: (input.name || "").trim() || "Belirtilmedi",
    amountMl: Math.round(toNumber(input.amountMl, 0)),
    calories: Math.round(toNumber(input.calories, 0)),
    proteinG: Number.isFinite(toNumber(input.proteinG, Number.NaN))
      ? toNumber(input.proteinG, 0)
      : undefined,
    carbsG: Number.isFinite(toNumber(input.carbsG, Number.NaN))
      ? toNumber(input.carbsG, 0)
      : undefined,
    fatG: Number.isFinite(toNumber(input.fatG, Number.NaN))
      ? toNumber(input.fatG, 0)
      : undefined,
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };
}

function normalizeWater(input: Partial<WaterEntry>): WaterEntry {
  return {
    id: input.id || createId("water"),
    type: "water",
    amountMl: Math.round(toNumber(input.amountMl, 0)),
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };
}

function normalizeActivity(input: Partial<ActivityEntry>): ActivityEntry {
  return {
    id: input.id || createId("activity"),
    type: "activity",
    activityType: ACTIVITY_TYPES.includes(input.activityType as ActivityType)
      ? (input.activityType as ActivityType)
      : "walking",
    durationMin: Math.round(toNumber(input.durationMin, 0)),
    estimatedCalories: Math.round(toNumber(input.estimatedCalories, 0)),
    note: input.note?.trim() || undefined,
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };
}

function normalizeSleep(input: Partial<SleepEntry>): SleepEntry {
  const sleepStart = input.sleepStart ? new Date(input.sleepStart) : new Date();
  const sleepEnd = input.sleepEnd ? new Date(input.sleepEnd) : new Date();
  const durationMin = Math.max(0, Math.round((sleepEnd.getTime() - sleepStart.getTime()) / 60000));
  return {
    id: input.id || createId("sleep"),
    type: "sleep",
    sleepStart: sleepStart.toISOString(),
    sleepEnd: sleepEnd.toISOString(),
    durationMin: input.durationMin ?? durationMin,
    quality: (input.quality as SleepEntry["quality"]) || "good",
    note: input.note?.trim() || undefined,
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };
}

export async function addFood(userId: string, input: Partial<FoodEntry>) {
  const entry = normalizeFood(input);
  await run(
    `INSERT INTO entries (
      id, user_id, type, name, note, calories, meal_type, amount_g,
      protein_g, carbs_g, fat_g, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      entry.id,
      userId,
      entry.type,
      entry.name,
      null,
      entry.calories,
      entry.mealType,
      entry.amountG ?? null,
      entry.proteinG ?? null,
      entry.carbsG ?? null,
      entry.fatG ?? null,
      entry.timestamp,
      new Date().toISOString(),
    ]
  );
  return entry;
}

export async function addDrink(userId: string, input: Partial<DrinkEntry>) {
  const entry = normalizeDrink(input);
  await run(
    `INSERT INTO entries (
      id, user_id, type, name, note, calories, amount_ml,
      protein_g, carbs_g, fat_g, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      entry.id,
      userId,
      entry.type,
      entry.name,
      null,
      entry.calories,
      entry.amountMl,
      entry.proteinG ?? null,
      entry.carbsG ?? null,
      entry.fatG ?? null,
      entry.timestamp,
      new Date().toISOString(),
    ]
  );
  return entry;
}

export async function addWater(userId: string, input: Partial<WaterEntry>) {
  const entry = normalizeWater(input);
  await run(
    `INSERT INTO entries (
      id, user_id, type, amount_ml, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?)` ,
    [entry.id, userId, entry.type, entry.amountMl, entry.timestamp, new Date().toISOString()]
  );
  return entry;
}

export async function addActivity(userId: string, input: Partial<ActivityEntry>) {
  const entry = normalizeActivity(input);
  await run(
    `INSERT INTO entries (
      id, user_id, type, activity_type, duration_min, estimated_calories, note, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      entry.id,
      userId,
      entry.type,
      entry.activityType,
      entry.durationMin,
      entry.estimatedCalories,
      entry.note ?? null,
      entry.timestamp,
      new Date().toISOString(),
    ]
  );
  return entry;
}

export async function addSleep(userId: string, input: Partial<SleepEntry>) {
  const entry = normalizeSleep(input);
  await run(
    `INSERT INTO sleep_logs (
      id, user_id, sleep_start, sleep_end, duration_min, quality, note, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      entry.id,
      userId,
      entry.sleepStart,
      entry.sleepEnd,
      entry.durationMin,
      entry.quality,
      entry.note ?? null,
      entry.timestamp,
      new Date().toISOString(),
    ]
  );
  return entry;
}

export async function updateEntry(userId: string, entry: Entry) {
  if (entry.type === "sleep") {
    await run(
      `UPDATE sleep_logs SET sleep_start = ?, sleep_end = ?, duration_min = ?, quality = ?, note = ?, timestamp = ?
       WHERE id = ? AND user_id = ?` ,
      [
        entry.sleepStart,
        entry.sleepEnd,
        entry.durationMin,
        entry.quality,
        entry.note ?? null,
        entry.timestamp,
        entry.id,
        userId,
      ]
    );
    return;
  }

  await run(
    `UPDATE entries SET
      name = ?,
      note = ?,
      calories = ?,
      meal_type = ?,
      amount_ml = ?,
      activity_type = ?,
      duration_min = ?,
      estimated_calories = ?,
      amount_g = ?,
      protein_g = ?,
      carbs_g = ?,
      fat_g = ?,
      timestamp = ?
    WHERE id = ? AND user_id = ?` ,
    [
      "name" in entry ? (entry as FoodEntry | DrinkEntry).name ?? null : null,
      "note" in entry ? (entry as ActivityEntry).note ?? null : null,
      "calories" in entry ? (entry as FoodEntry | DrinkEntry).calories ?? null : null,
      "mealType" in entry ? (entry as FoodEntry).mealType ?? null : null,
      "amountMl" in entry ? (entry as WaterEntry | DrinkEntry).amountMl ?? null : null,
      "activityType" in entry ? (entry as ActivityEntry).activityType ?? null : null,
      "durationMin" in entry ? (entry as ActivityEntry).durationMin ?? null : null,
      "estimatedCalories" in entry ? (entry as ActivityEntry).estimatedCalories ?? null : null,
      "amountG" in entry ? (entry as FoodEntry).amountG ?? null : null,
      "proteinG" in entry ? (entry as FoodEntry | DrinkEntry).proteinG ?? null : null,
      "carbsG" in entry ? (entry as FoodEntry | DrinkEntry).carbsG ?? null : null,
      "fatG" in entry ? (entry as FoodEntry | DrinkEntry).fatG ?? null : null,
      entry.timestamp,
      entry.id,
      userId,
    ]
  );
}

export async function removeEntry(userId: string, id: string, type?: Entry["type"]) {
  if (type === "sleep") {
    await run("DELETE FROM sleep_logs WHERE id = ? AND user_id = ?", [id, userId]);
    return;
  }
  await run("DELETE FROM entries WHERE id = ? AND user_id = ?", [id, userId]);
}

function rowToEntry(row: any): Entry | null {
  if (!row?.type) return null;
  if (row.type === "food") {
    return {
      id: row.id,
      type: "food",
      name: row.name,
      calories: row.calories ?? 0,
      mealType: row.meal_type,
      amountG: row.amount_g ?? undefined,
      proteinG: row.protein_g ?? undefined,
      carbsG: row.carbs_g ?? undefined,
      fatG: row.fat_g ?? undefined,
      timestamp: row.timestamp,
    } as FoodEntry;
  }
  if (row.type === "drink") {
    return {
      id: row.id,
      type: "drink",
      name: row.name,
      amountMl: row.amount_ml ?? 0,
      calories: row.calories ?? 0,
      proteinG: row.protein_g ?? undefined,
      carbsG: row.carbs_g ?? undefined,
      fatG: row.fat_g ?? undefined,
      timestamp: row.timestamp,
    } as DrinkEntry;
  }
  if (row.type === "water") {
    return {
      id: row.id,
      type: "water",
      amountMl: row.amount_ml ?? 0,
      timestamp: row.timestamp,
    } as WaterEntry;
  }
  if (row.type === "activity") {
    return {
      id: row.id,
      type: "activity",
      activityType: row.activity_type,
      durationMin: row.duration_min ?? 0,
      estimatedCalories: row.estimated_calories ?? 0,
      note: row.note ?? undefined,
      timestamp: row.timestamp,
    } as ActivityEntry;
  }
  return null;
}

function rowToSleep(row: any): SleepEntry | null {
  if (!row?.id) return null;
  return {
    id: row.id,
    type: "sleep",
    sleepStart: row.sleep_start,
    sleepEnd: row.sleep_end,
    durationMin: row.duration_min,
    quality: row.quality,
    note: row.note ?? undefined,
    timestamp: row.timestamp,
  } as SleepEntry;
}

export async function getEntries(userId: string): Promise<Entry[]> {
  const rows = await all<any>(
    "SELECT * FROM entries WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  const sleepRows = await all<any>(
    "SELECT * FROM sleep_logs WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  const entries = rows.map(rowToEntry).filter((entry): entry is Entry => Boolean(entry));
  const sleepEntries = sleepRows
    .map(rowToSleep)
    .filter((entry): entry is SleepEntry => Boolean(entry));

  return [...entries, ...sleepEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function getSleepEntries(userId: string) {
  const sleepRows = await all<any>(
    "SELECT * FROM sleep_logs WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  return sleepRows
    .map(rowToSleep)
    .filter((entry): entry is SleepEntry => Boolean(entry));
}

export async function addEntries(userId: string, entries: Entry[]) {
  let added = 0;
  for (const entry of entries) {
    if (entry.type === "food") {
      await addFood(userId, entry);
      added += 1;
    } else if (entry.type === "drink") {
      await addDrink(userId, entry);
      added += 1;
    } else if (entry.type === "water") {
      await addWater(userId, entry);
      added += 1;
    } else if (entry.type === "activity") {
      await addActivity(userId, entry);
      added += 1;
    } else if (entry.type === "sleep") {
      await addSleep(userId, entry);
      added += 1;
    }
  }
  return added;
}
