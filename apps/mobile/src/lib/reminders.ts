import { Platform } from "react-native";
import Constants from "expo-constants";

export type ReminderSettings = {
  enabled: boolean;
  time: string;
};

function parseTime(value: string) {
  const [hour, minute] = value.split(":").map((part) => Number(part));
  return {
    hour: Number.isFinite(hour) ? hour : 20,
    minute: Number.isFinite(minute) ? minute : 0,
  };
}

export async function scheduleDailyReminder(time: string) {
  const isExpoGo =
    Constants.executionEnvironment === "storeClient" || Constants.appOwnership === "expo";
  if (isExpoGo && Platform.OS === "android") {
    return;
  }
  const Notifications = await import("expo-notifications");
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("NOTIFICATION_DENIED");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily", {
      name: "Daily Reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
  const { hour, minute } = parseTime(time);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Calmet Hatırlatıcı",
      body: "Bugünkü kayıtlarını tamamlamayı unutma!",
      sound: true,
    },
    trigger: { hour, minute, repeats: true, channelId: Platform.OS === "android" ? "daily" : undefined },
  });
}

export async function clearReminders() {
  const isExpoGo =
    Constants.executionEnvironment === "storeClient" || Constants.appOwnership === "expo";
  if (isExpoGo && Platform.OS === "android") {
    return;
  }
  const Notifications = await import("expo-notifications");
  await Notifications.cancelAllScheduledNotificationsAsync();
}
