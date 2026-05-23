import { eq } from "drizzle-orm";
import { createId } from "@/lib/core/utils";
import { getDb } from "@/lib/database/db";
import { users, goals, userSettings } from "@/lib/database/schema";
import { defaultTheme } from "@/lib/core/theme";
import { defaultReminder } from "@/lib/features/reminders";
import { defaultFlags } from "@/lib/core/flags";
import { createSalt, hashPassword, normalizeEmail } from "@/lib/auth/password";
import {
  clearSessionCookie,
  getSessionUser,
  setSessionCookie,
  type SessionUser,
} from "@/lib/auth/session";

export type { SessionUser };

export async function registerUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<SessionUser> {
  const email = normalizeEmail(input.email);
  if (!email || !input.password.trim()) {
    throw new Error("INVALID_INPUT");
  }

  const db = getDb();
  const existing = await db.query.users.findFirst({
    where: (table, { eq: equals }) => equals(table.email, email),
  });
  if (existing) {
    throw new Error("EMAIL_EXISTS");
  }

  const id = createId();
  const salt = createSalt();
  const passwordHash = hashPassword(input.password, salt);
  const name = input.name?.trim() || null;

  await db.insert(users).values({
    id,
    email,
    name,
    passwordHash,
    salt,
    plan: "free",
    subscriptionStatus: "active",
    usageCount: 0,
    webSearchCount: 0,
  });

  await ensureUserDefaults(id);

  const sessionUser: SessionUser = { sub: id, email, name };
  await setSessionCookie(sessionUser);
  return sessionUser;
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<SessionUser> {
  const email = normalizeEmail(input.email);
  if (!email || !input.password.trim()) {
    throw new Error("INVALID_INPUT");
  }

  const db = getDb();
  const row = await db.query.users.findFirst({
    where: (table, { eq: equals }) => equals(table.email, email),
  });

  if (!row?.passwordHash || !row.salt) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordHash = hashPassword(input.password, row.salt);
  if (passwordHash !== row.passwordHash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  await ensureUserDefaults(row.id);

  const sessionUser: SessionUser = {
    sub: row.id,
    email: row.email ?? email,
    name: row.name,
  };
  await setSessionCookie(sessionUser);
  return sessionUser;
}

export async function logoutUser() {
  await clearSessionCookie();
}

export { getSessionUser };

async function ensureUserDefaults(userId: string) {
  const db = getDb();
  const [goalsRow] = await db
    .select({ userId: goals.userId })
    .from(goals)
    .where(eq(goals.userId, userId))
    .limit(1);
  if (!goalsRow) {
    await db.insert(goals).values({ userId });
  }

  const [settingsRow] = await db
    .select({ userId: userSettings.userId })
    .from(userSettings)
    .where(eq(userSettings.userId, userId))
    .limit(1);
  if (!settingsRow) {
    await db.insert(userSettings).values({
      userId,
      themeMode: defaultTheme.mode,
      themeAccent: defaultTheme.accent,
      reminderEnabled: defaultReminder.enabled,
      reminderTime: defaultReminder.time,
      reminderLastNotifiedDay: defaultReminder.lastNotifiedDay ?? null,
      aiVisual: defaultFlags.aiVisual,
      googleFit: defaultFlags.googleFit,
      darkMode: defaultFlags.darkMode,
    });
  }
}
