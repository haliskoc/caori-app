export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT,
    name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `CREATE TABLE IF NOT EXISTS food_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    brand TEXT,
    calories INTEGER NOT NULL,
    protein_g REAL,
    carbs_g REAL,
    fat_g REAL,
    amount_g INTEGER,
    barcode TEXT,
    meal_type TEXT,
    timestamp TEXT NOT NULL,
    sync_status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `CREATE TABLE IF NOT EXISTS water_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    amount_ml INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    sync_status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `CREATE TABLE IF NOT EXISTS activity_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    activity_type TEXT NOT NULL,
    duration_min INTEGER NOT NULL,
    calories_burned INTEGER,
    timestamp TEXT NOT NULL,
    sync_status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `CREATE TABLE IF NOT EXISTS food_library (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    calories_per_100 INTEGER,
    protein_per_100 REAL,
    carbs_per_100 REAL,
    fat_per_100 REAL,
    barcode TEXT,
    image_url TEXT,
    source TEXT,
    favorite INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    country TEXT DEFAULT 'TR',
    auto_detect_country INTEGER DEFAULT 1,
    locale TEXT DEFAULT 'tr',
    theme_mode TEXT DEFAULT 'light',
    dark_mode INTEGER DEFAULT 0,
    reminder_enabled INTEGER DEFAULT 0,
    reminder_time TEXT DEFAULT '09:00',
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`
];
