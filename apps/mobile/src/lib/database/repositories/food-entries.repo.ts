import { getDatabase } from "../index";

export interface FoodEntry {
  id: string;
  user_id?: string;
  name: string;
  brand?: string;
  calories: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  amount_g?: number;
  barcode?: string;
  meal_type?: string;
  timestamp: string;
  sync_status?: "pending" | "synced";
}

export const FoodEntriesRepository = {
  async insert(entry: FoodEntry) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO food_entries (id, user_id, name, brand, calories, protein_g, carbs_g, fat_g, amount_g, barcode, meal_type, timestamp, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.id,
        entry.user_id || null,
        entry.name,
        entry.brand || null,
        entry.calories,
        entry.protein_g || null,
        entry.carbs_g || null,
        entry.fat_g || null,
        entry.amount_g || null,
        entry.barcode || null,
        entry.meal_type || null,
        entry.timestamp,
        entry.sync_status || "pending",
      ],
    );
  },

  async getAllByDay(dayKey: string) {
    const db = await getDatabase();
    const results = await db.getAllAsync<FoodEntry>(
      "SELECT * FROM food_entries WHERE timestamp LIKE ? ORDER BY timestamp DESC",
      [`${dayKey}%`],
    );
    return results;
  },

  async delete(id: string) {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM food_entries WHERE id = ?", [id]);
  },
};
