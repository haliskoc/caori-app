import { all, run } from "@/db";
import { createId } from "@/lib/id";
import { t } from "@/lib/i18n";

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

export function normalizeFoodLibraryItem(item: Partial<FoodLibraryItem>): FoodLibraryItem {
  const now = new Date().toISOString();
  return {
    id: item.id ?? createId("foodlib"),
    name: typeof item.name === "string" && item.name.trim() ? item.name.trim() : t("Urun"),
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

function rowToItem(row: any): FoodLibraryItem {
  return normalizeFoodLibraryItem({
    id: row.id,
    name: row.name,
    caloriesPer100: row.calories_per_100,
    proteinPer100: row.protein_per_100,
    carbsPer100: row.carbs_per_100,
    fatPer100: row.fat_per_100,
    imageUrl: row.image_url ?? undefined,
    barcode: row.barcode ?? undefined,
    source: row.source,
    favorite: Boolean(row.favorite),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

export async function getFoodLibrary(userId: string) {
  const rows = await all<any>(
    "SELECT * FROM food_library WHERE user_id = ? ORDER BY updated_at DESC",
    [userId]
  );
  return rows.map(rowToItem);
}

export async function addFoodLibraryItem(userId: string, input: Partial<FoodLibraryItem>) {
  const item = normalizeFoodLibraryItem(input);
  const now = new Date().toISOString();
  await run(
    `INSERT INTO food_library (
      id, user_id, name, calories_per_100, protein_per_100, carbs_per_100, fat_per_100,
      barcode, image_url, source, favorite, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      item.id,
      userId,
      item.name,
      item.caloriesPer100,
      item.proteinPer100 ?? null,
      item.carbsPer100 ?? null,
      item.fatPer100 ?? null,
      item.barcode ?? null,
      item.imageUrl ?? null,
      item.source,
      item.favorite ? 1 : 0,
      now,
      now,
    ]
  );
  return item;
}

export async function updateFoodLibraryItem(userId: string, item: FoodLibraryItem) {
  const now = new Date().toISOString();
  await run(
    `UPDATE food_library SET
      name = ?,
      calories_per_100 = ?,
      protein_per_100 = ?,
      carbs_per_100 = ?,
      fat_per_100 = ?,
      barcode = ?,
      image_url = ?,
      source = ?,
      favorite = ?,
      updated_at = ?
    WHERE id = ? AND user_id = ?` ,
    [
      item.name,
      item.caloriesPer100,
      item.proteinPer100 ?? null,
      item.carbsPer100 ?? null,
      item.fatPer100 ?? null,
      item.barcode ?? null,
      item.imageUrl ?? null,
      item.source,
      item.favorite ? 1 : 0,
      now,
      item.id,
      userId,
    ]
  );
}

export async function removeFoodLibraryItem(userId: string, id: string) {
  await run("DELETE FROM food_library WHERE id = ? AND user_id = ?", [id, userId]);
}

export async function toggleFoodLibraryFavorite(userId: string, id: string, favorite: boolean) {
  await run(
    "UPDATE food_library SET favorite = ?, updated_at = ? WHERE id = ? AND user_id = ?",
    [favorite ? 1 : 0, new Date().toISOString(), id, userId]
  );
}
