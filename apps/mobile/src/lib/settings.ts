import { run, getFirst } from "@/db";

export type ThemeSettings = {
  mode: "light" | "dim";
  accent: "emerald" | "amber" | "rose" | "sky";
};

export type ReminderSettings = {
  enabled: boolean;
  time: string;
  lastNotifiedDay?: string | null;
};

export type FeatureFlags = {
  aiVisual: boolean;
  googleFit: boolean;
};

export type PremiumSettings = {
  active: boolean;
  code?: string | null;
  activatedAt?: string | null;
};

export type UserSettings = {
  theme: ThemeSettings;
  reminder: ReminderSettings;
  flags: FeatureFlags;
  locale: string;
  premium: PremiumSettings;
};

export const DEFAULT_SETTINGS: UserSettings = {
  theme: { mode: "light", accent: "emerald" },
  reminder: { enabled: false, time: "20:00", lastNotifiedDay: null },
  flags: { aiVisual: false, googleFit: false },
  locale: "tr",
  premium: { active: false, code: null, activatedAt: null },
};

export async function getSettings(userId: string): Promise<UserSettings> {
  const row = await getFirst<{
    theme_mode: string;
    theme_accent: string;
    reminder_enabled: number;
    reminder_time: string;
    reminder_last_notified_day: string | null;
    ai_visual: number;
    google_fit: number;
    locale: string;
    premium_active?: number | null;
    premium_code?: string | null;
    premium_activated_at?: string | null;
  }>("SELECT * FROM user_settings WHERE user_id = ?", [userId]);

  if (!row) {
    const now = new Date().toISOString();
    await run(
      `INSERT INTO user_settings (
        user_id,
        theme_mode,
        theme_accent,
        reminder_enabled,
        reminder_time,
        reminder_last_notified_day,
        ai_visual,
        google_fit,
        dark_mode,
        locale,
        premium_active,
        premium_code,
        premium_activated_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        userId,
        DEFAULT_SETTINGS.theme.mode,
        DEFAULT_SETTINGS.theme.accent,
        DEFAULT_SETTINGS.reminder.enabled ? 1 : 0,
        DEFAULT_SETTINGS.reminder.time,
        DEFAULT_SETTINGS.reminder.lastNotifiedDay ?? null,
        DEFAULT_SETTINGS.flags.aiVisual ? 1 : 0,
        DEFAULT_SETTINGS.flags.googleFit ? 1 : 0,
        DEFAULT_SETTINGS.theme.mode === "dim" ? 1 : 0,
        DEFAULT_SETTINGS.locale,
        DEFAULT_SETTINGS.premium.active ? 1 : 0,
        DEFAULT_SETTINGS.premium.code ?? null,
        DEFAULT_SETTINGS.premium.activatedAt ?? null,
        now,
      ]
    );
    return { ...DEFAULT_SETTINGS };
  }

  return {
    theme: {
      mode: row.theme_mode === "dim" ? "dim" : "light",
      accent: (row.theme_accent as ThemeSettings["accent"]) ?? "emerald",
    },
    reminder: {
      enabled: Boolean(row.reminder_enabled),
      time: row.reminder_time || DEFAULT_SETTINGS.reminder.time,
      lastNotifiedDay: row.reminder_last_notified_day,
    },
    flags: {
      aiVisual: Boolean(row.ai_visual),
      googleFit: Boolean(row.google_fit),
    },
    locale: row.locale || DEFAULT_SETTINGS.locale,
    premium: {
      active: Boolean(row.premium_active),
      code: row.premium_code ?? null,
      activatedAt: row.premium_activated_at ?? null,
    },
  };
}

export async function updateSettings(
  userId: string,
  patch: Partial<UserSettings>
): Promise<UserSettings> {
  const current = await getSettings(userId);
  const next: UserSettings = {
    theme: { ...current.theme, ...patch.theme },
    reminder: { ...current.reminder, ...patch.reminder },
    flags: { ...current.flags, ...patch.flags },
    locale: patch.locale ?? current.locale,
    premium: { ...current.premium, ...patch.premium },
  };
  const now = new Date().toISOString();

  await run(
    `UPDATE user_settings SET
      theme_mode = ?,
      theme_accent = ?,
      reminder_enabled = ?,
      reminder_time = ?,
      reminder_last_notified_day = ?,
      ai_visual = ?,
      google_fit = ?,
      dark_mode = ?,
      locale = ?,
      premium_active = ?,
      premium_code = ?,
      premium_activated_at = ?,
      updated_at = ?
    WHERE user_id = ?` ,
    [
      next.theme.mode,
      next.theme.accent,
      next.reminder.enabled ? 1 : 0,
      next.reminder.time,
      next.reminder.lastNotifiedDay ?? null,
      next.flags.aiVisual ? 1 : 0,
      next.flags.googleFit ? 1 : 0,
      next.theme.mode === "dim" ? 1 : 0,
      next.locale,
      next.premium.active ? 1 : 0,
      next.premium.code ?? null,
      next.premium.activatedAt ?? null,
      now,
      userId,
    ]
  );

  return next;
}
