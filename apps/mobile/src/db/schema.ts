import { run } from "./connection";

export async function initDb() {
  await run("PRAGMA foreign_keys = ON");

  await run(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT UNIQUE,
      name TEXT,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS goals (
      user_id TEXT PRIMARY KEY NOT NULL,
      water_goal_ml INTEGER NOT NULL DEFAULT 2500,
      calorie_goal INTEGER NOT NULL DEFAULT 2200,
      activity_goal_min INTEGER NOT NULL DEFAULT 30,
      meal_goal_count INTEGER NOT NULL DEFAULT 3,
      weight_goal_kg INTEGER NOT NULL DEFAULT 0,
      protein_goal_g INTEGER NOT NULL DEFAULT 0,
      carbs_goal_g INTEGER NOT NULL DEFAULT 0,
      fat_goal_g INTEGER NOT NULL DEFAULT 0,
      sleep_goal_hours INTEGER NOT NULL DEFAULT 8,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      name TEXT,
      note TEXT,
      calories INTEGER,
      meal_type TEXT,
      amount_ml INTEGER,
      activity_type TEXT,
      duration_min INTEGER,
      estimated_calories INTEGER,
      amount_g INTEGER,
      protein_g REAL,
      carbs_g REAL,
      fat_g REAL,
      timestamp TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS food_library (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      calories_per_100 INTEGER,
      protein_per_100 INTEGER,
      carbs_per_100 INTEGER,
      fat_per_100 INTEGER,
      barcode TEXT,
      image_url TEXT,
      source TEXT NOT NULL DEFAULT 'manual',
      favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS profiles (
      user_id TEXT PRIMARY KEY NOT NULL,
      full_name TEXT,
      age INTEGER,
      height_cm INTEGER,
      weight_kg INTEGER,
      main_goal TEXT,
      sport_level TEXT,
      workout_days TEXT,
      workout_place TEXT,
      equipment_level TEXT,
      injury TEXT,
      injury_detail TEXT,
      doctor_restriction TEXT,
      referral_source TEXT,
      expectation TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS user_settings (
      user_id TEXT PRIMARY KEY NOT NULL,
      theme_mode TEXT NOT NULL DEFAULT 'light',
      theme_accent TEXT NOT NULL DEFAULT 'emerald',
      reminder_enabled INTEGER NOT NULL DEFAULT 0,
      reminder_time TEXT NOT NULL DEFAULT '20:00',
      reminder_last_notified_day TEXT,
      ai_visual INTEGER NOT NULL DEFAULT 0,
      google_fit INTEGER NOT NULL DEFAULT 0,
      dark_mode INTEGER NOT NULL DEFAULT 0,
      locale TEXT NOT NULL DEFAULT 'tr',
      premium_active INTEGER NOT NULL DEFAULT 0,
      premium_code TEXT,
      premium_activated_at TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  const ensureUserSettingsColumn = async (column: string, definition: string) => {
    try {
      await run(`ALTER TABLE user_settings ADD COLUMN ${column} ${definition}`);
    } catch {
      // Ignore duplicate column errors on existing installs.
    }
  };

  await ensureUserSettingsColumn("premium_active", "INTEGER NOT NULL DEFAULT 0");
  await ensureUserSettingsColumn("premium_code", "TEXT");
  await ensureUserSettingsColumn("premium_activated_at", "TEXT");

  await run(
    `CREATE TABLE IF NOT EXISTS audit_log (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      detail TEXT NOT NULL,
      meta TEXT,
      timestamp TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS measurements (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      value REAL NOT NULL,
      unit TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS sleep_logs (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      sleep_start TEXT NOT NULL,
      sleep_end TEXT NOT NULL,
      duration_min INTEGER NOT NULL,
      quality TEXT NOT NULL DEFAULT 'good',
      note TEXT,
      timestamp TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS integrations (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'disconnected',
      access_token TEXT,
      refresh_token TEXT,
      expiry_date INTEGER,
      scopes TEXT,
      meta TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  );
}
