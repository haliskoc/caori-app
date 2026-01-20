import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useStore } from '../store';
import {
    ensureNotificationPermissions,
    scheduleDailyReminder,
    cancelDailyReminders,
    scheduleCustomReminders,
} from '../lib/notifications';

type NotificationContextType = {
    hasPermission: boolean;
    requestPermission: () => Promise<boolean>;
    setupReminders: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [hasPermission, setHasPermission] = useState(false);
    const { settings } = useStore();

    // Check permissions on mount and when app comes to foreground
    useEffect(() => {
        const checkPermissions = async () => {
            const granted = await ensureNotificationPermissions();
            setHasPermission(granted);
        };

        checkPermissions();

        const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
            if (nextState === 'active') {
                checkPermissions();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Setup reminders when settings change
    useEffect(() => {
        if (hasPermission) {
            setupReminders();
        }
    }, [hasPermission, settings.reminder, settings.mealReminders, settings.sleepReminder]);

    const requestPermission = async (): Promise<boolean> => {
        const granted = await ensureNotificationPermissions();
        setHasPermission(granted);
        return granted;
    };

    const setupReminders = async () => {
        if (!hasPermission) return;

        const reminders: Array<{ time: string; title: string; body: string }> = [];

        // Daily reminder
        if (settings.reminder?.enabled && settings.reminder.time) {
            reminders.push({
                time: settings.reminder.time,
                title: 'Calmet AI',
                body: 'Günlük hedeflerini kontrol etmeyi unutma! 🎯',
            });
        }

        // Meal reminders
        if (settings.mealReminders?.enabled) {
            if (settings.mealReminders.breakfast) {
                reminders.push({
                    time: settings.mealReminders.breakfast,
                    title: 'Kahvaltı Zamanı ☀️',
                    body: 'Güne enerjik başlamak için kahvaltını unutma!',
                });
            }
            if (settings.mealReminders.lunch) {
                reminders.push({
                    time: settings.mealReminders.lunch,
                    title: 'Öğle Yemeği 🍽️',
                    body: 'Öğle yemeğini kaydetmeyi unutma!',
                });
            }
            if (settings.mealReminders.dinner) {
                reminders.push({
                    time: settings.mealReminders.dinner,
                    title: 'Akşam Yemeği 🌙',
                    body: 'Akşam yemeğini kaydetmeyi unutma!',
                });
            }
        }

        // Sleep reminder
        if (settings.sleepReminder?.enabled && settings.sleepReminder.time) {
            reminders.push({
                time: settings.sleepReminder.time,
                title: 'Uyku Zamanı 😴',
                body: 'Kaliteli bir uyku için yatma vakti geldi!',
            });
        }

        // Water reminder (every 2 hours during daytime)
        // This would require a different scheduling approach

        if (reminders.length > 0) {
            await scheduleCustomReminders(reminders);
        } else {
            await cancelDailyReminders();
        }
    };

    const value = {
        hasPermission,
        requestPermission,
        setupReminders,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
}
