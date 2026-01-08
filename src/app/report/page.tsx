"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/card";
import { ReportCharts } from "@/components/report-charts";
import { useTracker } from "@/components/tracker-provider";
import { buildReportData, type ReportData } from "@/lib/report";
import { formatShortDate } from "@/lib/utils";
import { ActivityType } from "@/lib/types";

const activityLabels: Record<ActivityType, string> = {
  walking: "Yürümek",
  running: "Koşu",
  gym: "Salon",
};

export default function ReportPage() {
  const { user } = useUser();
  const { entries, goals, dataMode } = useTracker();
  const [rangeDays, setRangeDays] = useState(30);
  const [remoteReport, setRemoteReport] = useState<ReportData | null>(null);

  const localReport = useMemo(
    () => buildReportData(entries, rangeDays, goals),
    [entries, rangeDays, goals]
  );

  useEffect(() => {
    setRemoteReport(null);
    if (dataMode !== "remote") {
      return;
    }
    let active = true;
    fetch(`/api/v1/report?range=${rangeDays}`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data) {
          setRemoteReport(data as ReportData);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [dataMode, rangeDays]);

  const report = remoteReport ?? localReport;
  const name = user?.name ?? user?.email ?? "Kullanıcı";
  const rangeLabel = `Son ${report.rangeDays} gün`;

  return (
    <div className="print-page space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Rapor</p>
          <h1 className="text-2xl font-semibold text-ink">Performans Özeti</h1>
          <p className="text-xs text-muted">
            {name} • {rangeLabel} • {formatShortDate(report.startDate)} -{" "}
            {formatShortDate(report.endDate)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 print-hidden">
          <select
            value={rangeDays}
            onChange={(event) => setRangeDays(Number(event.target.value))}
            className="rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs"
          >
            <option value={7}>7 gün</option>
            <option value={30}>30 gün</option>
            <option value={60}>60 gün</option>
            <option value={90}>90 gün</option>
          </select>
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white"
          >
            PDF Olarak Kaydet
          </button>
        </div>
      </div>

      <Card className="space-y-2">
        <p className="text-sm font-semibold">Motivasyon Notu</p>
        <p className="text-sm text-muted">{report.comment}</p>
        <p className="text-xs text-muted">
          Aktif gün: {report.activeDays}/{report.rangeDays} • Toplam kayıt: {report.entryCount}
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="space-y-1">
          <p className="text-xs text-muted">Toplam Kalori</p>
          <p className="text-2xl font-semibold text-ink">{report.totals.caloriesIn}</p>
          <p className="text-[11px] text-muted">Net {report.totals.netCalories}</p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs text-muted">Aktivite Kalorisi</p>
          <p className="text-2xl font-semibold text-ink">{report.totals.caloriesOut}</p>
          <p className="text-[11px] text-muted">
            Günlük ort. {report.averages.caloriesOut}
          </p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs text-muted">Su</p>
          <p className="text-2xl font-semibold text-ink">{report.totals.waterMl} ml</p>
          <p className="text-[11px] text-muted">
            Günlük ort. {report.averages.waterMl} ml
          </p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs text-muted">Makro Toplamı</p>
          <p className="text-2xl font-semibold text-ink">
            {report.totals.proteinG + report.totals.carbsG + report.totals.fatG} g
          </p>
          <p className="text-[11px] text-muted">
            P {report.averages.proteinG} • K {report.averages.carbsG} • Y {report.averages.fatG}
          </p>
        </Card>
      </div>

      <ReportCharts summary={report.daily} hasEntries={report.entryCount > 0} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Öne Çıkan Öğünler</p>
            <p className="text-xs text-muted">En çok kalori getiren seçimler</p>
          </div>
          {report.topFoods.length === 0 ? (
            <p className="text-xs text-muted">Henüz öğün kaydı yok.</p>
          ) : (
            <div className="space-y-2 text-sm">
              {report.topFoods.map((food) => (
                <div key={food.name} className="flex items-center justify-between">
                  <span className="truncate">{food.name}</span>
                  <span className="text-xs text-muted">
                    {food.calories} kcal • {food.count} kez
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Öne Çıkan Aktiviteler</p>
            <p className="text-xs text-muted">Hareket yoğunluğu özeti</p>
          </div>
          {report.topActivities.length === 0 ? (
            <p className="text-xs text-muted">Henüz aktivite kaydı yok.</p>
          ) : (
            <div className="space-y-2 text-sm">
              {report.topActivities.map((activity) => (
                <div key={activity.activityType} className="flex items-center justify-between">
                  <span>{activityLabels[activity.activityType as ActivityType] ?? "Aktivite"}</span>
                  <span className="text-xs text-muted">
                    {activity.calories} kcal • {activity.durationMin} dk
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">Günlük Detaylar</p>
          <p className="text-xs text-muted">Kayıtların gün bazlı özeti</p>
        </div>
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1 text-xs print:max-h-none print:overflow-visible">
          {report.daily.map((day) => (
            <div
              key={day.date}
              className="flex flex-wrap items-center justify-between rounded-xl border border-amber-100 bg-white px-3 py-2"
            >
              <span className="text-muted">{formatShortDate(day.date)}</span>
              <span>
                {day.caloriesIn} kcal • {day.caloriesOut} kcal • {day.waterMl} ml
              </span>
              <span className="text-muted">
                P {day.proteinG} • K {day.carbsG} • Y {day.fatG}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
