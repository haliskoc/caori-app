import * as SQLite from 'expo-sqlite';
import { SCHEMA } from './schema';

const DB_NAME = 'calai.db';

export async function getDatabase() {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  return db;
}

export async function initDatabase() {
  const db = await getDatabase();
  
  try {
    // Execute all schema creation queries
    for (const query of SCHEMA) {
      await db.execAsync(query);
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Helper for running migrations or dropping tables if needed during development
export async function resetDatabase() {
  const db = await getDatabase();
  await db.execAsync('DROP TABLE IF EXISTS users');
  await db.execAsync('DROP TABLE IF EXISTS food_entries');
  await db.execAsync('DROP TABLE IF EXISTS water_entries');
  await db.execAsync('DROP TABLE IF EXISTS activity_entries');
  await db.execAsync('DROP TABLE IF EXISTS food_library');
  await db.execAsync('DROP TABLE IF EXISTS settings');
  await initDatabase();
}
