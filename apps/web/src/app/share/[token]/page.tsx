"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ReportCharts } from "@/components/features/charts/report-charts";
import { MeasurementTrends } from "@/components/features/charts/measurement-trends";
import type { ReportData } from "@/lib/features/report";
import type { MeasurementEntry } from "@/lib/core/types";
import { formatShortDate } from "@/lib/core/utils";
import { activityLabels } from "@/lib/features/activity";
import { t } from "@/lib/core/i18n";

type SharePayload = {
  share: {
    rangeDays: number;
    expiresAt: string | null;
    createdAt: string | null;
  };
  report: ReportData;
  measurements: MeasurementEntry[];
  profile: {
    fullName: string;
    weightKg: number | null;
  };
};

export default function ShareReportPage() {
  const params = useParams<{ token: string }>();
  const searchParams = useSearchParams();
  const token = params?.token;
  const [data, setData] = useState<SharePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dietMode, setDietMode] = useState(true);
  const isAnon = searchParams?.get("anon") === "1";

  useEffect(() => {
    if (!token) {
      return;
    }
    let active = true;
    fetch(`/api/v1/share/${token}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 410 ? "expired" : "missing");
        }
        return res.json();
      })
      .then((payload) => {
        if (active) {
          setData(payload as SharePayload);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
        }
      });
    return () => {
      active = false;
    };
  }, [token]);

  const title = isAnon ? t("Paylaşılan Rapor") : data?.profile.fullName?.trim() || t("Paylaşılan Rapor");
  const rangeLabel = data ? t("Son {value} gün", { value: data.report.rangeDays }) : "";
  const lastUpdated = data?.share.createdAt
    ? formatShortDate(data.share.createdAt.slice(0, 10))
    : "-";

  const numberFormat = useMemo(() => new Intl.NumberFormat("tr-TR"), []);
  const formatNumber = (value: number) => numberFormat.format(Math.round(value));

  if (error) {
    return (
      <div className="min-h-screen bg-app px-4 py-12">
        <Card className="mx-auto max-w-2xl text-center">
          <p className="text-lg font-semibold text-ink">{t("Paylaşım bulunamadı")}</p>
          <p className="mt-2 text-sm text-muted">
            {error === "expired"
              ? t("Bu bağlantının süresi dolmuş.")
              : t("Bağlantı hatalı veya kaldırılmış olabilir.")}
          </p>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-app px-4 py-12">
        <Card className="mx-auto max-w-2xl text-center text-sm text-muted">
          {t("Rapor yükleniyor...")}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{t("Paylaşılan Rapor")}</p>
            <h1 className="text-2xl font-semibold text-ink">{title}</h1>
            <p className="text-xs text-muted">
              {rangeLabel} • {t("Güncellendi")}: {lastUpdated}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDietMode((prev) => !prev)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                dietMode
                  ? "bg-emerald-600 text-white"
                  : "border border-emerald-100 bg-white text-emerald-700"
              }`}
            >
              {dietMode ? t("Diyetisyen modu açık") : t("Diyetisyen modu kapalı")}
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="space-y-1 text-center">
            <p className="text-[11px] text-muted">{t("Uyum Skoru")}</p>
            <p className="text-2xl font-semibold text-ink">%{data.report.adherenceScore}</p>
          </Card>
          <Card className="space-y-1 text-center">
            <p className="text-[11px] text-muted">{t("Ortalama Kalori")}</p>
            <p className="text-2xl font-semibold text-ink">
              {formatNumber(data.report.averages.caloriesIn)}
            </p>
          </Card>
          <Card className="space-y-1 text-center">
            <p className="text-[11px] text-muted">{t("Ortalama Su")}</p>
            <p className="text-2xl font-semibold text-ink">
              {formatNumber(data.report.averages.waterMl)}
            </p>
          </Card>
          <Card className="space-y-1 text-center">
            <p className="text-[11px] text-muted">{t("Ortalama Aktivite")}</p>
            <p className="text-2xl font-semibold text-ink">
              {formatNumber(data.report.averages.activityMin)}
            </p>
          </Card>
        </div>

        <Card className="space-y-2">
          <p className="text-sm font-semibold text-ink">{t("Analiz Notu")}</p>
          <p className="text-sm text-muted">{data.report.comment}</p>
        </Card>

        <ReportCharts summary={data.report.daily} hasEntries={data.report.entryCount > 0} />
        <MeasurementTrends measurements={data.measurements} rangeDays={data.report.rangeDays} />

        {dietMode && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="space-y-3">
              <p className="text-sm font-semibold">{t("Öne Çıkan Öğünler")}</p>
              {data.report.topFoods.length === 0 ? (
                <p className="text-xs text-muted">{t("Kayıt bulunamadı.")}</p>
              ) : (
                <div className="space-y-2 text-xs text-muted">
                  {data.report.topFoods.map((food) => (
                    <div
                      key={food.name}
                      className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white px-3 py-2"
                    >
                      <span className="font-semibold text-ink">{food.name}</span>
                      <span>{formatNumber(food.calories)} kcal</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            <Card className="space-y-3">
              <p className="text-sm font-semibold">{t("Öne Çıkan Aktiviteler")}</p>
              {data.report.topActivities.length === 0 ? (
                <p className="text-xs text-muted">{t("Kayıt bulunamadı.")}</p>
              ) : (
                <div className="space-y-2 text-xs text-muted">
                  {data.report.topActivities.map((activity) => (
                    <div
                      key={activity.activityType}
                      className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white px-3 py-2"
                    >
                      <span className="font-semibold text-ink">
                        {activityLabels[activity.activityType as keyof typeof activityLabels] ??
                          t("Aktivite")}
                      </span>
                      <span>{formatNumber(activity.durationMin)} {t("dk")}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        <p className="text-[11px] text-muted">
          {t("Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.")}
        </p>
      </div>
    </div>
  );
}
