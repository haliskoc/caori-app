import { getDatabase } from "../index";

export interface ActivityEntry {
  id: string;
  user_id?: string;
  activity_type: string;
  duration_min: number;
  calories_burned?: number;
  timestamp: string;
  sync_status?: "pending" | "synced";
}

export const ActivityEntriesRepository = {
  async insert(entry: ActivityEntry) {
    try {
      const db = await getDatabase();
      if (!db) {
        console.warn("Database not available - skipping activity entry insert");
        return;
      }
      await db.runAsync(
        "INSERT INTO activity_entries (id, user_id, activity_type, duration_min, calories_burned, timestamp, sync_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          entry.id,
          entry.user_id || null,
          entry.activity_type,
          entry.duration_min,
          entry.calories_burned || null,
          entry.timestamp,
          entry.sync_status || "pending",
        ],
      );
    } catch (error) {
      console.error("Local DB Error:", error);
    }
  },

  async getAllByDay(dayKey: string): Promise<ActivityEntry[]> {
    try {
      const db = await getDatabase();
      if (!db) {
        console.warn("Database not available - returning empty activity entries");
        return [];
      }
      const results = await db.getAllAsync<ActivityEntry>(
        "SELECT * FROM activity_entries WHERE timestamp LIKE ? ORDER BY timestamp DESC",
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
        console.warn("Database not available - skipping activity entry delete");
        return;
      }
      await db.runAsync("DELETE FROM activity_entries WHERE id = ?", [id]);
    } catch (error) {
      console.error("Local DB Error:", error);
    }
  },
};
