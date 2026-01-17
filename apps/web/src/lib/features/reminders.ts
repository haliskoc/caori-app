export type ReminderSettings = {
  enabled: boolean;
  time: string;
  lastNotifiedDay?: string;
};

const REMINDER_KEY = "calai.reminders.v1";

export const defaultReminder: ReminderSettings = {
  enabled: false,
  time: "20:00",
  lastNotifiedDay: undefined,
};

export function loadReminder(): ReminderSettings {
  if (typeof window === "undefined") {
    return defaultReminder;
  }
  try {
    const raw = window.localStorage.getItem(REMINDER_KEY);
    if (!raw) {
      return defaultReminder;
    }
    const parsed = JSON.parse(raw) as Partial<ReminderSettings>;
    return {
      enabled: Boolean(parsed.enabled),
      time: typeof parsed.time === "string" ? parsed.time : defaultReminder.time,
      lastNotifiedDay: typeof parsed.lastNotifiedDay === "string" ? parsed.lastNotifiedDay : undefined,
    };
  } catch {
    return defaultReminder;
  }
}

export function saveReminder(settings: ReminderSettings) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
}
