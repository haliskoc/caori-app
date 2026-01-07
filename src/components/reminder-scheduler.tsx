"use client";

import { useEffect } from "react";
import { useTracker } from "@/components/tracker-provider";
import { getDayKey } from "@/lib/utils";

export function ReminderScheduler() {
  const { reminder, updateReminder, dailySummary, goals } = useTracker();

  useEffect(() => {
    if (!reminder.enabled) {
      return;
    }
    if (typeof Notification === "undefined") {
      return;
    }
    if (Notification.permission !== "granted") {
      return;
    }

    const checkReminder = () => {
      const now = new Date();
      const [hour, minute] = reminder.time.split(":").map((value) => Number(value));
      if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
        return;
      }
      if (now.getHours() !== hour || now.getMinutes() !== minute) {
        return;
      }
      const todayKey = getDayKey(now);
      if (reminder.lastNotifiedDay === todayKey) {
        return;
      }
      const waterLeft = Math.max(goals.waterGoalMl - dailySummary.waterMl, 0);
      const netCalories = dailySummary.caloriesIn - dailySummary.caloriesOut;
      const body = `Net: ${netCalories} kcal • Su: ${Math.round(waterLeft)} ml kaldı`;
      new Notification("Cal AI Hatırlatma", { body });
      updateReminder({ lastNotifiedDay: todayKey });
    };

    checkReminder();
    const interval = window.setInterval(checkReminder, 60000);
    return () => window.clearInterval(interval);
  }, [
    dailySummary.caloriesIn,
    dailySummary.caloriesOut,
    dailySummary.waterMl,
    goals.waterGoalMl,
    reminder.enabled,
    reminder.lastNotifiedDay,
    reminder.time,
    updateReminder,
  ]);

  return null;
}
