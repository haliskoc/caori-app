import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { userSettings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { defaultTheme, type ThemeSettings } from "@/lib/theme";
import { defaultReminder, type ReminderSettings } from "@/lib/reminders";
import { defaultFlags, type FeatureFlags } from "@/lib/flags";
import { isSameOrigin } from "@/lib/security";

export const dynamic = "force-dynamic";

type SettingsPayload = {
  theme?: Partial<ThemeSettings>;
  reminder?: Partial<ReminderSettings>;
  flags?: Partial<FeatureFlags>;
};

function isValidReminderTime(value?: string) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) {
    return false;
  }
  const [hour, minute] = value.split(":").map(Number);
  return (
    Number.isFinite(hour) &&
    Number.isFinite(minute) &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59
  );
}

function rowToSettings(row: typeof userSettings.$inferSelect | null) {
  const theme: ThemeSettings = {
    mode: row?.themeMode === "dim" ? "dim" : defaultTheme.mode,
    accent:
      row?.themeAccent === "teal" || row?.themeAccent === "rose"
        ? row.themeAccent
        : defaultTheme.accent,
  };
  const reminder: ReminderSettings = {
    enabled: row?.reminderEnabled ?? defaultReminder.enabled,
    time: row?.reminderTime ?? defaultReminder.time,
    lastNotifiedDay: row?.reminderLastNotifiedDay ?? undefined,
  };
  const flags: FeatureFlags = {
    aiVisual: row?.aiVisual ?? defaultFlags.aiVisual,
    googleFit: row?.googleFit ?? defaultFlags.googleFit,
    darkMode: row?.darkMode ?? defaultFlags.darkMode,
  };
  return { theme, reminder, flags };
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const [row] = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, session.user.sub));

  if (!row) {
    const [created] = await db
      .insert(userSettings)
      .values({
        userId: session.user.sub,
        themeMode: defaultTheme.mode,
        themeAccent: defaultTheme.accent,
        reminderEnabled: defaultReminder.enabled,
        reminderTime: defaultReminder.time,
        reminderLastNotifiedDay: defaultReminder.lastNotifiedDay ?? null,
        aiVisual: defaultFlags.aiVisual,
        googleFit: defaultFlags.googleFit,
        darkMode: defaultFlags.darkMode,
      })
      .returning();
    return NextResponse.json(rowToSettings(created ?? null));
  }

  return NextResponse.json(rowToSettings(row));
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SettingsPayload;
  const nextTheme: ThemeSettings = {
    mode: body.theme?.mode === "dim" ? "dim" : defaultTheme.mode,
    accent:
      body.theme?.accent === "teal" || body.theme?.accent === "rose"
        ? body.theme?.accent
        : defaultTheme.accent,
  };
  const nextReminder: ReminderSettings = {
    enabled:
      typeof body.reminder?.enabled === "boolean"
        ? body.reminder.enabled
        : defaultReminder.enabled,
    time: isValidReminderTime(body.reminder?.time)
      ? body.reminder?.time ?? defaultReminder.time
      : defaultReminder.time,
    lastNotifiedDay: body.reminder?.lastNotifiedDay ?? defaultReminder.lastNotifiedDay,
  };
  const nextFlags: FeatureFlags = {
    aiVisual:
      typeof body.flags?.aiVisual === "boolean"
        ? body.flags.aiVisual
        : defaultFlags.aiVisual,
    googleFit:
      typeof body.flags?.googleFit === "boolean"
        ? body.flags.googleFit
        : defaultFlags.googleFit,
    darkMode:
      typeof body.flags?.darkMode === "boolean"
        ? body.flags.darkMode
        : defaultFlags.darkMode,
  };

  await ensureUser(session.user);
  const db = getDb();
  const [row] = await db
    .insert(userSettings)
    .values({
      userId: session.user.sub,
      themeMode: nextTheme.mode,
      themeAccent: nextTheme.accent,
      reminderEnabled: nextReminder.enabled,
      reminderTime: nextReminder.time,
      reminderLastNotifiedDay: nextReminder.lastNotifiedDay ?? null,
      aiVisual: nextFlags.aiVisual,
      googleFit: nextFlags.googleFit,
      darkMode: nextFlags.darkMode,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: {
        themeMode: nextTheme.mode,
        themeAccent: nextTheme.accent,
        reminderEnabled: nextReminder.enabled,
        reminderTime: nextReminder.time,
        reminderLastNotifiedDay: nextReminder.lastNotifiedDay ?? null,
        aiVisual: nextFlags.aiVisual,
        googleFit: nextFlags.googleFit,
        darkMode: nextFlags.darkMode,
        updatedAt: new Date(),
      },
    })
    .returning();

  return NextResponse.json(rowToSettings(row ?? null));
}
