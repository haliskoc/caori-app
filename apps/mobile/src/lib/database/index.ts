import * as SQLite from 'expo-sqlite';
import { SCHEMA } from './schema';

const DB_NAME = 'calai.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
    return dbInstance;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
}

export async function initDatabase(retries = 3): Promise<boolean> {
  // Zaten başlatıldıysa tekrar başlatma
  if (isInitialized) {
    return true;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const db = await getDatabase();

      if (!db) {
        throw new Error('Database connection is null');
      }

      // Execute all schema creation queries
      for (const query of SCHEMA) {
        await db.execAsync(query);
      }

      isInitialized = true;
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error(`Local DB Error (attempt ${attempt}/${retries}):`, error);

      // Son deneme değilse bir süre bekle ve tekrar dene
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        // Bağlantıyı sıfırla
        dbInstance = null;
      }
    }
  }

  // Tüm denemeler başarısız olduysa, yine de uygulamayı çökertme
  console.warn('Database initialization failed after all retries. App will continue with limited functionality.');
  return false;
}

// Helper for running migrations or dropping tables if needed during development
export async function resetDatabase(): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (!db) {
      console.warn("Database not available - cannot reset database");
      return false;
    }

    await db.execAsync('DROP TABLE IF EXISTS users');
    await db.execAsync('DROP TABLE IF EXISTS food_entries');
    await db.execAsync('DROP TABLE IF EXISTS water_entries');
    await db.execAsync('DROP TABLE IF EXISTS activity_entries');
    await db.execAsync('DROP TABLE IF EXISTS food_library');
    await db.execAsync('DROP TABLE IF EXISTS settings');

    // Reset initialization flag so tables can be recreated
    isInitialized = false;

    return await initDatabase();
  } catch (error) {
    console.error("Failed to reset database:", error);
    return false;
  }
}
