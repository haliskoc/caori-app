import {
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const goals = pgTable("goals", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  waterGoalMl: integer("water_goal_ml").notNull().default(2500),
  calorieGoal: integer("calorie_goal").notNull().default(2200),
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
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
