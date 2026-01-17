import React, { useEffect, useMemo, useState } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { t, ReportData } from "@calai/shared";
import { Text } from "../../src/components/atoms/Text";
import { BarChart, CartesianChart } from "victory-native";
import { useStore } from "../../src/store";

const RANGE_OPTIONS = [7, 30, 60, 90];

export default function ReportScreen() {
  const { fetchReportData } = useStore();
  const [rangeDays, setRangeDays] = useState(30);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchReportData(rangeDays);
      if (active) {
        setReport(data);
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [rangeDays, fetchReportData]);

  const chartData = useMemo(() => {
    if (!report?.daily?.length) {
      return [] as { day: string; calories: number }[];
    }
    return report.daily.slice(-7).map((day) => ({
      day: day.date.slice(5),
      calories: Math.round(day.caloriesIn),
    }));
  }, [report]);

  const averageCalories = report?.averages?.caloriesIn ?? 0;
  const waterTarget = report?.goals?.waterGoalMl ?? 2500;
  const waterAverage = report?.averages?.waterMl ?? 0;
  const waterPct =
    waterTarget > 0 ? Math.round((waterAverage / waterTarget) * 100) : 0;

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <ScrollView className="flex-1 px-4 py-6">
        <Text variant="h1" className="mb-6">
          {t("Raporlar")}
        </Text>

        <View className="flex-row gap-2 mb-6">
          {RANGE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setRangeDays(option)}
              className={`flex-1 py-2 rounded-2xl border ${
                option === rangeDays
                  ? "bg-emerald-600 border-emerald-600"
                  : "bg-white border-gray-100"
              }`}
            >
              <Text
                className={`text-center text-xs font-black ${
                  option === rangeDays ? "text-white" : "text-gray-600"
                }`}
              >
                {t("{value} gun", { value: option })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && (
          <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm mb-6">
            <Text className="text-gray-500 font-bold">
              {t("Yukleniyor...")}
            </Text>
          </View>
        )}

        {!loading && !report && (
          <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm mb-6">
            <Text className="text-gray-400 font-bold">
              {t("Veri bulunamadi")}
            </Text>
          </View>
        )}

        {!loading && report && (
          <>
            <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm mb-6">
              <Text variant="h3" className="mb-4">
                {t("Haftalik Kalori Dengesi")}
              </Text>
              <View style={{ height: 220 }}>
                <CartesianChart
                  data={chartData}
                  xKey="day"
                  yKeys={["calories"]}
                >
                  {({ points }) => (
                    <BarChart
                      points={points.calories}
                      color="#10b981"
                      roundedCorners={{ topLeft: 12, topRight: 12 }}
                      barWidth={30}
                    />
                  )}
                </CartesianChart>
              </View>
            </View>

            <View className="flex-row gap-4 mb-6">
              <View className="flex-1 bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <Text
                  variant="caption"
                  className="text-emerald-600 font-black uppercase"
                >
                  {t("Ort. Kalori")}
                </Text>
                <Text className="text-2xl font-black text-gray-900">
                  {averageCalories}
                </Text>
              </View>
              <View className="flex-1 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <Text
                  variant="caption"
                  className="text-blue-600 font-black uppercase"
                >
                  {t("Su Hedefi")}
                </Text>
                <Text className="text-2xl font-black text-gray-900">
                  %{waterPct}
                </Text>
              </View>
            </View>

            <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm mb-6">
              <Text variant="h3" className="mb-4">
                {t("Toplamlar")}
              </Text>
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text variant="h3" className="text-emerald-700">
                    {Math.round(report.totals.caloriesIn)}
                  </Text>
                  <Text variant="caption">{t("Kalori")}</Text>
                </View>
                <View className="items-center">
                  <Text variant="h3" className="text-emerald-600">
                    {Math.round(report.totals.waterMl)}
                  </Text>
                  <Text variant="caption">{t("Su")}</Text>
                </View>
                <View className="items-center">
                  <Text variant="h3" className="text-rose-500">
                    {Math.round(report.totals.activityMin)}
                  </Text>
                  <Text variant="caption">{t("Aktivite")}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
