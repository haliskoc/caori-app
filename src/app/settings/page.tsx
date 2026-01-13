"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";
import { entriesFromCsv, entriesToCsv, parseCsv } from "@/lib/csv";
import { getIntlLocale, setLocale, t } from "@/lib/i18n";
import { useLocaleValue } from "@/components/locale-provider";
import { localeOptions } from "@/locales/manifest";

export default function SettingsPage() {
  const {
    goals,
    updateGoals,
    flags,
    updateFlags,
    dataMode,
    importLocalEntries,
    entries,
    addEntries,
    theme,
    updateTheme,
    reminder,
    updateReminder,
    auditLog,
    clearAuditLog,
  } = useTracker();
  const [waterGoal, setWaterGoal] = useState(String(goals.waterGoalMl));
  const [calorieGoal, setCalorieGoal] = useState(String(goals.calorieGoal));
  const [activityGoal, setActivityGoal] = useState(String(goals.activityGoalMin));
  const [mealGoal, setMealGoal] = useState(String(goals.mealGoalCount));
  const [weightGoal, setWeightGoal] = useState(String(goals.weightGoalKg));
  const [proteinGoal, setProteinGoal] = useState(String(goals.proteinGoalG));
  const [carbsGoal, setCarbsGoal] = useState(String(goals.carbsGoalG));
  const [fatGoal, setFatGoal] = useState(String(goals.fatGoalG));
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [csvMessage, setCsvMessage] = useState<string | null>(null);
  const [isCsvImporting, setIsCsvImporting] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const locale = useLocaleValue();

  useEffect(() => {
    setWaterGoal(String(goals.waterGoalMl));
    setCalorieGoal(String(goals.calorieGoal));
    setActivityGoal(String(goals.activityGoalMin));
    setMealGoal(String(goals.mealGoalCount));
    setWeightGoal(String(goals.weightGoalKg));
    setProteinGoal(String(goals.proteinGoalG));
    setCarbsGoal(String(goals.carbsGoalG));
    setFatGoal(String(goals.fatGoalG));
  }, [goals]);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setNotificationStatus("unsupported");
    } else {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  function downloadCsv() {
    const csv = entriesToCsv(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calai-kayitlari-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    setCsvMessage(t("CSV dışa aktarıldı."));
  }

  async function handleCsvImport(file: File) {
    setIsCsvImporting(true);
    setCsvMessage(null);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      const importedEntries = entriesFromCsv(rows);
      const count = await addEntries(importedEntries, { mode: "merge", source: "csv" });
      setCsvMessage(
        count > 0
          ? t("{count} kayıt içe aktarıldı.", { count })
          : t("CSV içinde kayıt bulunamadı.")
      );
    } catch {
      setCsvMessage(t("CSV okunamadı. Formatı kontrol edin."));
    } finally {
      setIsCsvImporting(false);
    }
  }

  const accentOptions = [
    { value: "amber", label: t("Amber"), swatch: "bg-amber-500" },
    { value: "teal", label: t("Teal"), swatch: "bg-teal-500" },
    { value: "rose", label: t("Rose"), swatch: "bg-rose-500" },
  ] as const;

  const auditPreview = auditLog.slice(0, 10);
  const auditFormatter = new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">{t("Hesap")}</p>
          <p className="text-xs text-muted">
            {dataMode === "remote" ? t("Bulut (Neon) aktif") : t("Yerel cihaz modu")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {dataMode === "remote" && (
            <button
              onClick={async () => {
                setIsImporting(true);
                const count = await importLocalEntries();
                setImportedCount(count);
                setIsImporting(false);
              }}
              className="rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              {isImporting ? t("Taşınıyor...") : t("Cihazdaki kayıtları taşı")}
            </button>
          )}
        </div>
        {importedCount !== null && (
          <p className="text-xs text-muted">{t("{count} kayıt taşındı.", { count: importedCount })}</p>
        )}
      </Card>

      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">{t("Dil")}</p>
          <p className="text-xs text-muted">{t("Uygulama dili")}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={locale}
            onChange={(event) => {
              setLocale(event.target.value);
              window.location.reload();
            }}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs font-bold sm:max-w-[200px] outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {localeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted">
            {t("Yeni dil dosyalarını public/locales/{code}.json olarak ekleyebilirsin.", {
              code: "en",
            })}
          </p>
        </div>
      </Card>

      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">{t("Rapor Dışa Aktarım")}</p>
          <p className="text-xs text-muted">{t("Grafikli PDF + Excel çıktısı")}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-xs font-bold text-emerald-700">
          {t("Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.")}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/report"
            className="rounded-xl bg-gray-900 px-6 py-2 text-sm font-black text-white hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200"
          >
            {t("Raporu Aç")}
          </Link>
        </div>
      </Card>

      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">{t("Hedefler")}</p>
          <p className="text-xs text-muted">{t("Yerel cihazınızda saklanır")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-muted">{t("Günlük Su Hedefi (ml)")}</label>
            <input
              value={waterGoal}
              onChange={(event) => setWaterGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Günlük Kalori Hedefi")}</label>
            <input
              value={calorieGoal}
              onChange={(event) => setCalorieGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Günlük Aktivite Hedefi (dk)")}</label>
            <input
              value={activityGoal}
              onChange={(event) => setActivityGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Günlük Öğün Hedefi (adet)")}</label>
            <input
              value={mealGoal}
              onChange={(event) => setMealGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Hedef Kilo (kg)")}</label>
            <input
              value={weightGoal}
              onChange={(event) => setWeightGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Protein Hedefi (g)")}</label>
            <input
              value={proteinGoal}
              onChange={(event) => setProteinGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Karbonhidrat Hedefi (g)")}</label>
            <input
              value={carbsGoal}
              onChange={(event) => setCarbsGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">{t("Yağ Hedefi (g)")}</label>
            <input
              value={fatGoal}
              onChange={(event) => setFatGoal(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
              type="number"
              min="0"
            />
          </div>
        </div>
        <button
          onClick={() => {
            updateGoals({
              waterGoalMl: Number(waterGoal),
              calorieGoal: Number(calorieGoal),
              activityGoalMin: Number(activityGoal),
              mealGoalCount: Number(mealGoal),
              weightGoalKg: Number(weightGoal),
              proteinGoalG: Number(proteinGoal),
              carbsGoalG: Number(carbsGoal),
              fatGoalG: Number(fatGoal),
            });
          }}
          className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-100 hover:bg-gray-900 transition-all active:scale-95"
        >
          {t("Hedefleri Güncelle")}
        </button>
      </Card>



      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">{t("Hatırlatıcılar")}</p>
          <p className="text-xs text-muted">{t("Tarayıcı bildirimi ile günlük hatırlatma.")}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 px-4 py-3 text-xs font-bold text-emerald-800">
          {notificationStatus === "unsupported" && t("Tarayıcı bildirimleri desteklenmiyor.")}
          {notificationStatus === "default" && t("Bildirim izni verilmedi.")}
          {notificationStatus === "denied" && t("Bildirim izni reddedildi.")}
          {notificationStatus === "granted" && t("Bildirim izni açık.")}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-500">
            <input
              type="checkbox"
              checked={reminder.enabled}
              onChange={(event) => updateReminder({ enabled: event.target.checked })}
              className="h-4 w-4 rounded-lg accent-emerald-600"
            />
            {t("Günlük hatırlatma")}
          </label>
          <input
            type="time"
            value={reminder.time}
            onChange={(event) => updateReminder({ time: event.target.value })}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs font-bold sm:w-auto"
          />
          {notificationStatus !== "granted" && notificationStatus !== "unsupported" && (
            <button
              onClick={async () => {
                if (typeof Notification === "undefined") {
                  setNotificationStatus("unsupported");
                  return;
                }
                const permission = await Notification.requestPermission();
                setNotificationStatus(permission);
              }}
              className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-50 transition-colors sm:w-auto"
            >
              {t("İzin Ver")}
            </button>
          )}
        </div>
        {reminder.enabled && notificationStatus !== "granted" && notificationStatus !== "unsupported" && (
          <p className="text-xs text-muted">
            {t("Hatırlatma için tarayıcı izni gereklidir.")}
          </p>
        )}
      </Card>

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">{t("Veri Yönetimi")}</p>
          <p className="text-xs text-muted">{t("CSV içe/dışa aktarma (cihaz veya bulut).")}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            onClick={downloadCsv}
            className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 text-xs font-black text-emerald-700 hover:bg-emerald-50 transition-colors sm:w-auto"
            disabled={entries.length === 0}
          >
            {t("CSV Dışa Aktar")}
          </button>
          <label className="w-full cursor-pointer rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-black text-white hover:bg-gray-900 shadow-lg shadow-emerald-100 transition-all active:scale-95 sm:w-auto">
            {isCsvImporting ? t("İçe aktarılıyor...") : t("CSV İçe Aktar")}
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void handleCsvImport(file);
                }
                event.currentTarget.value = "";
              }}
              disabled={isCsvImporting}
            />
          </label>
        </div>
        {csvMessage && <p className="text-xs text-muted">{csvMessage}</p>}
      </Card>

      <Card className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{t("Değişiklik Geçmişi")}</p>
            <p className="text-xs text-muted">{t("Son işlemler cihazda saklanır.")}</p>
          </div>
          <button
            onClick={clearAuditLog}
            className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 text-xs font-black text-emerald-700 hover:bg-emerald-50 transition-colors sm:w-auto"
            disabled={auditLog.length === 0}
          >
            {t("Temizle")}
          </button>
        </div>
        {auditPreview.length === 0 && (
          <p className="text-xs text-muted">{t("Henüz kayıtlı bir işlem yok.")}</p>
        )}
        {auditPreview.length > 0 && (
          <div className="space-y-2 text-xs text-muted">
            {auditPreview.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-1 rounded-2xl border border-emerald-50 bg-emerald-50/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-bold text-emerald-900">{event.detail}</span>
                <span className="text-[11px] font-black text-emerald-600/60 uppercase">
                  {auditFormatter.format(new Date(event.timestamp))}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Google Fit Integration Temporarily Disabled
      {user && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Google Fit Entegrasyonu</p>
            <p className="text-xs text-muted">Salt okunur. Yazma izni yoktur.</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-muted">
            <span>Bağlantı Durumu</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] text-emerald-700">
              {flags.googleFit ? "Aktif" : "Pasif"}
            </span>
          </div>
          <a
            href="/api/integrations/google/auth"
            className={`block w-full text-center rounded-xl px-4 py-2 text-sm font-semibold ${
              flags.googleFit
                ? "bg-accent text-white hover:bg-accent-strong"
                : "cursor-not-allowed bg-emerald-100 text-emerald-400 pointer-events-none"
            }`}
          >
            Google Fit ile Bağlan
          </a>
          <p className="text-xs text-muted">
            Adım, aktif kalori ve temel aktivite verileri çekilir. Kullanıcı istediği zaman
            bağlantıyı kesebilir.
          </p>
        </Card>
      )}
      */}

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">{t("Özellik Bayrakları")}</p>
          <p className="text-xs text-muted">{t("AI özellikleri varsayılan olarak kapalı")}</p>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-xs font-bold transition-all hover:border-emerald-300">
            <span className="text-gray-600">{t("AI Görsel Tanıma")}</span>
            <input
              type="checkbox"
              checked={flags.aiVisual}
              onChange={(event) => updateFlags({ aiVisual: event.target.checked })}
              className="h-5 w-5 rounded-lg accent-emerald-600"
            />
          </label>
        </div>
      </Card>
    </div >
  );
}
