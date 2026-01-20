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
    try {
      const db = await getDatabase();
      if (!db) {
        console.warn("Database not available - skipping water entry insert");
        return;
      }
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
    } catch (error) {
      console.error("Local DB Error:", error);
    }
  },

  async getAllByDay(dayKey: string): Promise<WaterEntry[]> {
    try {
      const db = await getDatabase();
      if (!db) {
        console.warn("Database not available - returning empty water entries");
        return [];
      }
      const results = await db.getAllAsync<WaterEntry>(
        "SELECT * FROM water_entries WHERE timestamp LIKE ? ORDER BY timestamp DESC",
        [`${dayKey}%`],
      );
      return results;
    } catch (error) {
      console.error("Local DB Error:", error);
      return [];
    }
  },

  async delete(id: string) {
    try {
      const db = await getDatabase();
      if (!db) {
        console.warn("Database not available - skipping water entry delete");
        return;
      }
      await db.runAsync("DELETE FROM water_entries WHERE id = ?", [id]);
    } catch (error) {
      console.error("Local DB Error:", error);
    }
  },
};
