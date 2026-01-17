"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, ArrowRight } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/ui/card";
import { t } from "@/lib/core/i18n";
import { SleepEntry } from "@/lib/core/types";
import {
    loadSleepLogs,
    formatDuration,
    sleepQualityEmojis,
    sleepQualityLabels,
    getSleepInsight,
} from "@/lib/features/sleep";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function SleepWidget() {
    const { user } = useUser();
    const [todaySleep, setTodaySleep] = useState<SleepEntry | null>(null);
    const [loading, setLoading] = useState(true);

    const dataMode = user?.sub ? "remote" : "local";
    const sleepGoalHours = 8;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const today = new Date().toDateString();

            if (dataMode === "remote") {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/v1/sleep`, {
                        credentials: "include",
                    });
                    if (res.ok) {
                        const data: SleepEntry[] = await res.json();
                        const todayLog = data.find(
                            (log) => new Date(log.timestamp).toDateString() === today
                        );
                        setTodaySleep(todayLog || null);
                    } else {
                        const local = loadSleepLogs();
                        const todayLog = local.find(
                            (log) => new Date(log.timestamp).toDateString() === today
                        );
                        setTodaySleep(todayLog || null);
                    }
                } catch {
                    const local = loadSleepLogs();
                    const todayLog = local.find(
                        (log) => new Date(log.timestamp).toDateString() === today
                    );
                    setTodaySleep(todayLog || null);
                }
            } else {
                const local = loadSleepLogs();
                const todayLog = local.find(
                    (log) => new Date(log.timestamp).toDateString() === today
                );
                setTodaySleep(todayLog || null);
            }
            setLoading(false);
        };
        loadData();
    }, [dataMode]);

    const insight = todaySleep
        ? getSleepInsight(todaySleep.durationMin, sleepGoalHours)
        : null;

    const sleepProgress = todaySleep
        ? Math.min(100, (todaySleep.durationMin / 60 / sleepGoalHours) * 100)
        : 0;

    if (loading) {
        return (
            <Card className="border-emerald-100 animate-pulse">
                <div className="h-24 bg-gray-100 rounded-xl" />
            </Card>
        );
    }

    return (
        <Link href="/sleep" className="block">
            <Card className="border-emerald-100 hover:border-emerald-200 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-all">
                            <Moon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{t("Uyku Takibi")}</p>
                            {todaySleep ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{sleepQualityEmojis[todaySleep.quality]}</span>
                                    <span className="text-xs text-gray-500">
                                        {sleepQualityLabels[todaySleep.quality]}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">{t("Bugün kayıt yok")}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {todaySleep ? (
                            <div className="text-right">
                                <p className="text-xl font-black text-emerald-600">
                                    {formatDuration(todaySleep.durationMin)}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    {t("Hedef: {value} saat", { value: sleepGoalHours })}
                                </p>
                            </div>
                        ) : (
                            <div className="text-right">
                                <p className="text-sm font-bold text-emerald-600">{t("Uyku Ekle")}</p>
                            </div>
                        )}
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>

                {/* Progress Bar */}
                {todaySleep && (
                    <div className="mt-4">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                style={{ width: `${sleepProgress}%` }}
                            />
                        </div>
                        {insight && (
                            <p
                                className={`mt-2 text-xs ${insight.tone === "positive"
                                        ? "text-emerald-600"
                                        : insight.tone === "warning"
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`}
                            >
                                {insight.message}
                            </p>
                        )}
                    </div>
                )}
            </Card>
        </Link>
    );
}
