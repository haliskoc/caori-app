"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Moon, Sun, Clock, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { t } from "@/lib/core/i18n";
import { SleepEntry, SleepQuality } from "@/lib/core/types";
import {
    SLEEP_QUALITIES,
    sleepQualityLabels,
    sleepQualityEmojis,
    sleepQualityColors,
    formatDuration,
    formatSleepTime,
    formatSleepDate,
    loadSleepLogs,
    saveSleepLogs,
    normalizeSleepEntry,
    getSleepInsight,
} from "@/lib/features/sleep";
import { createId } from "@/lib/core/utils";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function SleepPage() {
    const { user } = useUser();
    const [sleepLogs, setSleepLogs] = useState<SleepEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [sleepStart, setSleepStart] = useState("");
    const [sleepEnd, setSleepEnd] = useState("");
    const [quality, setQuality] = useState<SleepQuality>("good");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const dataMode = user?.sub ? "remote" : "local";
    const sleepGoalHours = 8;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            if (dataMode === "remote") {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/v1/sleep`, {
                        credentials: "include",
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setSleepLogs(data);
                    } else {
                        setSleepLogs(loadSleepLogs());
                    }
                } catch {
                    setSleepLogs(loadSleepLogs());
                }
            } else {
                setSleepLogs(loadSleepLogs());
            }
            setLoading(false);
        };
        loadData();
    }, [dataMode]);

    // Set default times
    useEffect(() => {
        if (showAddForm && !sleepStart && !sleepEnd) {
            const now = new Date();
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 0, 0, 0);

            const wakeUp = new Date(now);
            wakeUp.setHours(7, 0, 0, 0);

            setSleepStart(yesterday.toISOString().slice(0, 16));
            setSleepEnd(wakeUp.toISOString().slice(0, 16));
        }
    }, [showAddForm, sleepStart, sleepEnd]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sleepStart || !sleepEnd) return;

        setSubmitting(true);

        const startDate = new Date(sleepStart);
        const endDate = new Date(sleepEnd);
        const durationMin = Math.round((endDate.getTime() - startDate.getTime()) / 60000);

        if (durationMin <= 0) {
            alert(t("Uyku bitiş zamanı başlangıçtan sonra olmalıdır."));
            setSubmitting(false);
            return;
        }

        const entry = normalizeSleepEntry({
            id: createId(),
            sleepStart: startDate.toISOString(),
            sleepEnd: endDate.toISOString(),
            durationMin,
            quality,
            note: note.trim() || undefined,
            timestamp: new Date().toISOString(),
        });

        if (!entry) {
            setSubmitting(false);
            return;
        }

        if (dataMode === "remote") {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/sleep`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(entry),
                });
                if (res.ok) {
                    const created = await res.json();
                    setSleepLogs((prev) => [created, ...prev]);
                } else {
                    const updated = [entry, ...sleepLogs];
                    setSleepLogs(updated);
                    saveSleepLogs(updated);
                }
            } catch {
                const updated = [entry, ...sleepLogs];
                setSleepLogs(updated);
                saveSleepLogs(updated);
            }
        } else {
            const updated = [entry, ...sleepLogs];
            setSleepLogs(updated);
            saveSleepLogs(updated);
        }

        // Reset form
        setSleepStart("");
        setSleepEnd("");
        setQuality("good");
        setNote("");
        setShowAddForm(false);
        setSubmitting(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t("Bu uyku kaydını silmek istediğinize emin misiniz?"))) return;

        if (dataMode === "remote") {
            try {
                await fetch(`${API_BASE_URL}/api/v1/sleep/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
            } catch {
                // ignore
            }
        }

        const updated = sleepLogs.filter((log) => log.id !== id);
        setSleepLogs(updated);
        if (dataMode === "local") {
            saveSleepLogs(updated);
        }
    };

    // Calculate today's sleep
    const today = new Date().toDateString();
    const todaySleep = sleepLogs.find(
        (log) => new Date(log.timestamp).toDateString() === today
    );

    const insight = todaySleep
        ? getSleepInsight(todaySleep.durationMin, sleepGoalHours)
        : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900">{t("Uyku Takibi")}</h1>
                        <p className="text-sm text-gray-500">{t("Uyku düzeninizi takip edin")}</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                >
                    <Plus className="h-4 w-4" />
                    {t("Uyku Ekle")}
                </button>
            </div>

            {/* Today's Summary */}
            {todaySleep && (
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Moon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white/80">{t("Bugünkü Uykunuz")}</p>
                            <p className="text-3xl font-black">{formatDuration(todaySleep.durationMin)}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-lg">{sleepQualityEmojis[todaySleep.quality]}</span>
                                <span className="text-sm font-medium text-white/80">
                                    {sleepQualityLabels[todaySleep.quality]}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-white/80">
                                <Sun className="h-4 w-4" />
                                <span className="text-sm">{formatSleepTime(todaySleep.sleepEnd)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/80 mt-1">
                                <Moon className="h-4 w-4" />
                                <span className="text-sm">{formatSleepTime(todaySleep.sleepStart)}</span>
                            </div>
                        </div>
                    </div>
                    {insight && (
                        <div
                            className={`mt-4 rounded-xl p-3 ${insight.tone === "positive"
                                    ? "bg-white/20"
                                    : insight.tone === "warning"
                                        ? "bg-red-500/30"
                                        : "bg-white/10"
                                }`}
                        >
                            <p className="text-sm font-medium">{insight.message}</p>
                        </div>
                    )}
                </Card>
            )}

            {/* Add Form */}
            {showAddForm && (
                <Card className="border-emerald-100 bg-emerald-50/50">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs font-bold text-gray-600 uppercase">
                                    {t("Uyku Başlangıcı")}
                                </label>
                                <input
                                    type="datetime-local"
                                    value={sleepStart}
                                    onChange={(e) => setSleepStart(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-bold text-gray-600 uppercase">
                                    {t("Uyku Bitişi")}
                                </label>
                                <input
                                    type="datetime-local"
                                    value={sleepEnd}
                                    onChange={(e) => setSleepEnd(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-600 uppercase">
                                {t("Uyku Kalitesi")}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {SLEEP_QUALITIES.map((q) => (
                                    <button
                                        key={q}
                                        type="button"
                                        onClick={() => setQuality(q)}
                                        className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${quality === q
                                                ? "border-emerald-500 bg-emerald-50"
                                                : "border-gray-200 bg-white hover:border-emerald-200"
                                            }`}
                                    >
                                        <span className="text-2xl">{sleepQualityEmojis[q]}</span>
                                        <span className={`text-xs font-bold ${sleepQualityColors[q]}`}>
                                            {sleepQualityLabels[q]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-600 uppercase">
                                {t("Not (Opsiyonel)")}
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder={t("Örn: Gece yarısı uyandım, rüya gördüm...")}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 resize-none"
                                rows={2}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                            >
                                {t("İptal")}
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50"
                            >
                                {submitting ? t("Kaydediliyor...") : t("Kaydet")}
                            </button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Sleep Goal Card */}
            <Card className="border-emerald-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{t("Günlük Uyku Hedefi")}</p>
                            <p className="text-xs text-gray-500">{t("Önerilen: 7-9 saat")}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-emerald-600">{sleepGoalHours}</p>
                        <p className="text-xs text-gray-500">{t("saat")}</p>
                    </div>
                </div>
            </Card>

            {/* Sleep History */}
            <div>
                <h2 className="mb-4 text-lg font-bold text-gray-900">{t("Uyku Geçmişi")}</h2>
                {loading ? (
                    <Card className="text-center text-gray-500">{t("Yükleniyor...")}</Card>
                ) : sleepLogs.length === 0 ? (
                    <Card className="text-center text-gray-500">
                        {t("Henüz uyku kaydı yok. İlk kaydınızı ekleyin!")}
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {sleepLogs.map((log) => (
                            <Card
                                key={log.id}
                                className="flex items-center justify-between border-gray-100 hover:border-emerald-100 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                                        {sleepQualityEmojis[log.quality]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {formatDuration(log.durationMin)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatSleepDate(log.sleepStart)} • {formatSleepTime(log.sleepStart)} -{" "}
                                            {formatSleepTime(log.sleepEnd)}
                                        </p>
                                        {log.note && (
                                            <p className="mt-1 text-xs text-gray-400 italic">{log.note}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-bold ${log.quality === "excellent"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : log.quality === "good"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : log.quality === "fair"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {sleepQualityLabels[log.quality]}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(log.id)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
