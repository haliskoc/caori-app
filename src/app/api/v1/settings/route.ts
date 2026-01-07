import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { userSettings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { defaultTheme, type ThemeSettings } from "@/lib/theme";
import { defaultReminder, type ReminderSettings } from "@/lib/reminders";
import { defaultFlags, type FeatureFlags } from "@/lib/flags";

type SettingsPayload = {
  theme?: Partial<ThemeSettings>;
  reminder?: Partial<ReminderSettings>;
  flags?: Partial<FeatureFlags>;
};

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
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SettingsPayload;
  const nextTheme: ThemeSettings = {
    ...defaultTheme,
    ...(body.theme ?? {}),
  };
  const nextReminder: ReminderSettings = {
    ...defaultReminder,
    ...(body.reminder ?? {}),
  };
  const nextFlags: FeatureFlags = {
    ...defaultFlags,
    ...(body.flags ?? {}),
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
