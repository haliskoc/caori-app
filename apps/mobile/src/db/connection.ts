import {
  openDatabaseAsync,
  openDatabaseSync,
  type SQLiteBindValue,
  type SQLiteDatabase,
  type SQLiteRunResult,
} from "expo-sqlite";

let dbPromise: Promise<SQLiteDatabase> | null = null;

const OPEN_TIMEOUT_MS = 1500;

async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      const syncOpen = () => openDatabaseSync("calai.db");
      const timeoutPromise = new Promise<SQLiteDatabase>((resolve) => {
        timeoutId = setTimeout(() => resolve(syncOpen()), OPEN_TIMEOUT_MS);
      });
      try {
        const db = await Promise.race([openDatabaseAsync("calai.db"), timeoutPromise]);
        if (timeoutId) clearTimeout(timeoutId);
        return db;
      } catch {
        if (timeoutId) clearTimeout(timeoutId);
        return syncOpen();
      }
    })();
  }
  return dbPromise;
}

export async function run(sql: string, params: SQLiteBindValue[] = []): Promise<SQLiteRunResult> {
  const db = await getDb();
  return db.runAsync(sql, params);
}

export async function all<T>(sql: string, params: SQLiteBindValue[] = []): Promise<T[]> {
  const db = await getDb();
  return db.getAllAsync<T>(sql, params);
}

export async function getFirst<T>(sql: string, params: SQLiteBindValue[] = []): Promise<T | undefined> {
  const db = await getDb();
  const row = await db.getFirstAsync<T>(sql, params);
  return row ?? undefined;
}
