import { getDatabase } from "../index";

export interface WaterEntry {
  id: string;
  user_id?: string;
  amount_ml: number;
  timestamp: string;
  sync_status?: "pending" | "synced";
}

export const WaterEntriesRepository = {
  async insert(entry: WaterEntry) {
    const db = await getDatabase();
    await db.runAsync(
      "INSERT INTO water_entries (id, user_id, amount_ml, timestamp, sync_status) VALUES (?, ?, ?, ?, ?)",
      [
        entry.id,
        entry.user_id || null,
        entry.amount_ml,
        entry.timestamp,
        entry.sync_status || "pending",
      ],
    );
  },

  async getAllByDay(dayKey: string) {
    const db = await getDatabase();
    const results = await db.getAllAsync<WaterEntry>(
      "SELECT * FROM water_entries WHERE timestamp LIKE ? ORDER BY timestamp DESC",
      [`${dayKey}%`],
    );
    return results;
  },

  async delete(id: string) {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM water_entries WHERE id = ?", [id]);
  },
};
