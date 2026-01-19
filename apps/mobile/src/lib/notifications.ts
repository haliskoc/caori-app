import Constants from "expo-constants";

let Notifications: typeof import("expo-notifications") | null = null;
let notificationsReady = false;

async function loadNotifications() {
  if (notificationsReady) return Notifications;
  notificationsReady = true;
  const isExpoGo = Constants.appOwnership === "expo";
  if (isExpoGo) {
    Notifications = null;
    return null;
  }
  try {
    const mod = await import("expo-notifications");
    Notifications = mod;
    Notifications?.setNotificationHandler?.({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch {
    Notifications = null;
  }
  return Notifications;
}

export async function ensureNotificationPermissions() {
  const module = await loadNotifications();
  if (!module) return false;
  const { status } = await module.getPermissionsAsync();
  if (status === "granted") return true;
  const request = await module.requestPermissionsAsync();
  return request.status === "granted";
}

export async function scheduleDailyReminder(time: string) {
  const module = await loadNotifications();
  if (!module) return;
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return;

  await module.cancelAllScheduledNotificationsAsync();
  await module.scheduleNotificationAsync({
    content: {
      title: "Calmet",
      body: "Günlük hedeflerini kontrol etmeyi unutma.",
      sound: "default",
    },
    trigger: { hour, minute, repeats: true },
  });
}

export async function cancelDailyReminders() {
  const module = await loadNotifications();
  if (!module) return;
  await module.cancelAllScheduledNotificationsAsync();
}

export async function scheduleCustomReminders(
  reminders: Array<{ time: string; title: string; body: string }>,
) {
  const module = await loadNotifications();
  if (!module) return;
  await module.cancelAllScheduledNotificationsAsync();
  for (const reminder of reminders) {
    const [hourStr, minuteStr] = reminder.time.split(":");
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
      continue;
    }
    await module.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.body,
        sound: "default",
      },
      trigger: { hour, minute, repeats: true },
    });
  }
}
