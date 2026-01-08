import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  bigint,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const googleFitTokens = pgTable("google_fit_tokens", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiryDate: bigint("expiry_date", { mode: "number" }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const goals = pgTable("goals", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  waterGoalMl: integer("water_goal_ml").notNull().default(2500),
  calorieGoal: integer("calorie_goal").notNull().default(2200),
  activityGoalMin: integer("activity_goal_min").notNull().default(30),
  mealGoalCount: integer("meal_goal_count").notNull().default(3),
  weightGoalKg: integer("weight_goal_kg").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const entries = pgTable("entries", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  name: text("name"),
  calories: integer("calories"),
  mealType: text("meal_type"),
  amountMl: integer("amount_ml"),
  activityType: text("activity_type"),
  durationMin: integer("duration_min"),
  estimatedCalories: integer("estimated_calories"),
  amountG: integer("amount_g"),
  proteinG: integer("protein_g"),
  carbsG: integer("carbs_g"),
  fatG: integer("fat_g"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const foodLibrary = pgTable("food_library", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  caloriesPer100: integer("calories_per_100"),
  proteinPer100: integer("protein_per_100"),
  carbsPer100: integer("carbs_per_100"),
  fatPer100: integer("fat_per_100"),
  barcode: text("barcode"),
  imageUrl: text("image_url"),
  source: text("source").notNull().default("manual"),
  favorite: boolean("favorite").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  age: integer("age"),
  heightCm: integer("height_cm"),
  weightKg: integer("weight_kg"),
  mainGoal: text("main_goal"),
  sportLevel: text("sport_level"),
  workoutDays: text("workout_days"),
  workoutPlace: text("workout_place"),
  equipmentLevel: text("equipment_level"),
  injury: text("injury"),
  injuryDetail: text("injury_detail"),
  doctorRestriction: text("doctor_restriction"),
  referralSource: text("referral_source"),
  expectation: text("expectation"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const userSettings = pgTable("user_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  themeMode: text("theme_mode").notNull().default("light"),
  themeAccent: text("theme_accent").notNull().default("amber"),
  reminderEnabled: boolean("reminder_enabled").notNull().default(false),
  reminderTime: text("reminder_time").notNull().default("20:00"),
  reminderLastNotifiedDay: text("reminder_last_notified_day"),
  aiVisual: boolean("ai_visual").notNull().default(false),
  googleFit: boolean("google_fit").notNull().default(false),
  darkMode: boolean("dark_mode").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  detail: text("detail").notNull(),
  meta: jsonb("meta"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
