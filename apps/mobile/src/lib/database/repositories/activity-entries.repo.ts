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
    const db = await getDatabase();
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
  },

  async getAllByDay(dayKey: string) {
    const db = await getDatabase();
    const results = await db.getAllAsync<ActivityEntry>(
      "SELECT * FROM activity_entries WHERE timestamp LIKE ? ORDER BY timestamp DESC",
      [`${dayKey}%`],
    );
    return results;
  },

  async delete(id: string) {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM activity_entries WHERE id = ?", [id]);
  },
};
