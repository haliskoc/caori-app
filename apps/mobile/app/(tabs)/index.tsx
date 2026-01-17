import React, { useEffect } from "react";
import { ScrollView, SafeAreaView, RefreshControl, View } from "react-native";
import { t } from "@calai/shared";
import { useStore } from "../../src/store";
import { DailySummary } from "../../src/components/organisms/DailySummary";
import { WaterWidget } from "../../src/components/organisms/WaterWidget";
import { SleepSummaryCard } from "../../src/components/organisms/SleepSummaryCard";
import { Text } from "../../src/components/atoms/Text";
import { getDayKey } from "@calai/shared";

import { useRouter } from "expo-router";
import { Bot } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function DashboardScreen() {
  const { dailySummary, fetchDailySummary, isLoading, addEntry, goals } =
    useStore();
  const router = useRouter();
  const today = getDayKey(new Date());

  useEffect(() => {
    fetchDailySummary(today);
  }, []);

  const onRefresh = () => {
    fetchDailySummary(today);
  };

  const handleAddWater = (amount: number) => {
    addEntry({
      type: "water",
      amountMl: amount,
      timestamp: new Date().toISOString(),
    });
    fetchDailySummary(today);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <ScrollView
        className="flex-1 px-4 py-6"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor="#10b981"
          />
        }
      >
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text variant="caption" className="uppercase">
              {t("Bugün Özeti")}
            </Text>
            <Text variant="h1">{t("Merhaba!")}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/ai-assistant")}
            className="h-12 w-12 bg-emerald-100 rounded-2xl items-center justify-center border border-emerald-200 shadow-sm"
          >
            <Bot size={28} color="#10b981" />
          </TouchableOpacity>
        </View>

        <DailySummary
          caloriesIn={dailySummary?.caloriesIn || 0}
          caloriesOut={dailySummary?.caloriesOut || 0}
          proteinG={dailySummary?.proteinG || 0}
          carbsG={dailySummary?.carbsG || 0}
          fatG={dailySummary?.fatG || 0}
        />

        <View className="mt-6">
          <WaterWidget
            currentMl={dailySummary?.waterMl || 0}
            goalMl={goals.waterGoalMl}
            onAddWater={handleAddWater}
          />
        </View>

        <View className="mt-6 mb-8">
          <SleepSummaryCard
            sleepDurationHours={dailySummary?.sleepHours || 0}
            sleepGoalHours={goals.sleepGoalHours || 8}
            quality={dailySummary?.sleepQuality || null}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
