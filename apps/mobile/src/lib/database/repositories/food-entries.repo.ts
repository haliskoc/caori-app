import { getDatabase } from "../index";
import { DatabaseError, DatabaseErrorCode } from "../errors";

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
  created_at?: string;
  updated_at?: string;
}

export type FoodEntryInsert = Omit<FoodEntry, 'created_at' | 'updated_at'>;
export type FoodEntryUpdate = Partial<Omit<FoodEntry, 'id' | 'created_at'>>;

const TABLE_NAME = 'food_entries';

export const FoodEntriesRepository = {
  /**
   * Insert a new food entry
   * @throws DatabaseError if insert fails
   */
  async insert(entry: FoodEntryInsert): Promise<void> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'insert',
        table: TABLE_NAME,
      });
    }

    try {
      await db.runAsync(
        `INSERT INTO ${TABLE_NAME} (id, user_id, name, brand, calories, protein_g, carbs_g, fat_g, amount_g, barcode, meal_type, timestamp, sync_status)
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
    } catch (error) {
      throw DatabaseError.insertFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Get a food entry by ID
   * @throws DatabaseError if query fails
   */
  async getById(id: string): Promise<FoodEntry | null> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'getById',
        table: TABLE_NAME,
      });
    }

    try {
      const result = await db.getFirstAsync<FoodEntry>(
        `SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
        [id]
      );
      return result || null;
    } catch (error) {
      throw DatabaseError.queryFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Update a food entry
   * @throws DatabaseError if update fails
   */
  async update(id: string, entry: FoodEntryUpdate): Promise<void> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'update',
        table: TABLE_NAME,
      });
    }

    // Build dynamic update query
    const fields: string[] = [];
    const values: unknown[] = [];

    if (entry.name !== undefined) { fields.push('name = ?'); values.push(entry.name); }
    if (entry.brand !== undefined) { fields.push('brand = ?'); values.push(entry.brand); }
    if (entry.calories !== undefined) { fields.push('calories = ?'); values.push(entry.calories); }
    if (entry.protein_g !== undefined) { fields.push('protein_g = ?'); values.push(entry.protein_g); }
    if (entry.carbs_g !== undefined) { fields.push('carbs_g = ?'); values.push(entry.carbs_g); }
    if (entry.fat_g !== undefined) { fields.push('fat_g = ?'); values.push(entry.fat_g); }
    if (entry.amount_g !== undefined) { fields.push('amount_g = ?'); values.push(entry.amount_g); }
    if (entry.barcode !== undefined) { fields.push('barcode = ?'); values.push(entry.barcode); }
    if (entry.meal_type !== undefined) { fields.push('meal_type = ?'); values.push(entry.meal_type); }
    if (entry.timestamp !== undefined) { fields.push('timestamp = ?'); values.push(entry.timestamp); }
    if (entry.sync_status !== undefined) { fields.push('sync_status = ?'); values.push(entry.sync_status); }
    if (entry.user_id !== undefined) { fields.push('user_id = ?'); values.push(entry.user_id); }

    if (fields.length === 0) {
      return; // Nothing to update
    }

    // Always update the updated_at timestamp
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    try {
      await db.runAsync(
        `UPDATE ${TABLE_NAME} SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
    } catch (error) {
      throw DatabaseError.updateFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Mark an entry as synced
   * @throws DatabaseError if update fails
   */
  async markAsSynced(id: string): Promise<void> {
    await this.update(id, { sync_status: 'synced' });
  },

  /**
   * Get all food entries for a specific day
   * @throws DatabaseError if query fails
   */
  async getAllByDay(dayKey: string): Promise<FoodEntry[]> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'getAllByDay',
        table: TABLE_NAME,
      });
    }

    try {
      // Using BETWEEN for better index usage instead of LIKE
      const startOfDay = `${dayKey}T00:00:00`;
      const endOfDay = `${dayKey}T23:59:59`;

      const results = await db.getAllAsync<FoodEntry>(
        `SELECT * FROM ${TABLE_NAME} WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC`,
        [startOfDay, endOfDay],
      );
      return results;
    } catch (error) {
      throw DatabaseError.queryFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Get all pending (unsynced) entries
   * @throws DatabaseError if query fails
   */
  async getPending(): Promise<FoodEntry[]> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'getPending',
        table: TABLE_NAME,
      });
    }

    try {
      const results = await db.getAllAsync<FoodEntry>(
        `SELECT * FROM ${TABLE_NAME} WHERE sync_status = 'pending' ORDER BY timestamp DESC`
      );
      return results;
    } catch (error) {
      throw DatabaseError.queryFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Delete a food entry by ID
   * @throws DatabaseError if delete fails
   */
  async delete(id: string): Promise<void> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'delete',
        table: TABLE_NAME,
      });
    }

    try {
      await db.runAsync(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    } catch (error) {
      throw DatabaseError.deleteFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Delete all entries for a user
   * @throws DatabaseError if delete fails
   */
  async deleteAllForUser(userId: string): Promise<void> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'deleteAllForUser',
        table: TABLE_NAME,
      });
    }

    try {
      await db.runAsync(`DELETE FROM ${TABLE_NAME} WHERE user_id = ?`, [userId]);
    } catch (error) {
      throw DatabaseError.deleteFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Batch insert multiple entries
   * @throws DatabaseError if any insert fails
   */
  async batchInsert(entries: FoodEntryInsert[]): Promise<void> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'batchInsert',
        table: TABLE_NAME,
      });
    }

    try {
      await db.execAsync('BEGIN TRANSACTION');

      for (const entry of entries) {
        await db.runAsync(
          `INSERT INTO ${TABLE_NAME} (id, user_id, name, brand, calories, protein_g, carbs_g, fat_g, amount_g, barcode, meal_type, timestamp, sync_status)
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
      }

      await db.execAsync('COMMIT');
    } catch (error) {
      await db.execAsync('ROLLBACK');
      throw DatabaseError.insertFailed(TABLE_NAME, error as Error);
    }
  },

  /**
   * Count entries for a specific day
   */
  async countByDay(dayKey: string): Promise<number> {
    const db = await getDatabase();
    if (!db) {
      throw new DatabaseError('Database not available', {
        code: DatabaseErrorCode.CONNECTION_FAILED,
        operation: 'countByDay',
        table: TABLE_NAME,
      });
    }

    try {
      const startOfDay = `${dayKey}T00:00:00`;
      const endOfDay = `${dayKey}T23:59:59`;

      const result = await db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM ${TABLE_NAME} WHERE timestamp BETWEEN ? AND ?`,
        [startOfDay, endOfDay],
      );
      return result?.count || 0;
    } catch (error) {
      throw DatabaseError.queryFailed(TABLE_NAME, error as Error);
    }
  },
};
