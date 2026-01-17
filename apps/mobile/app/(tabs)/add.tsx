import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getDayKey, t } from "@calai/shared";
import { useStore } from "../../src/store";
import { FoodForm } from "../../src/features/tracker/components/FoodForm";
import { DrinkForm } from "../../src/features/tracker/components/DrinkForm";
import { ActivityForm } from "../../src/features/tracker/components/ActivityForm";
import { SleepEntryForm } from "../../src/components/organisms/SleepEntryForm";
import { SleepLogList } from "../../src/components/organisms/SleepLogList";
import { Text } from "../../src/components/atoms/Text";
import { Barcode, Utensils, Coffee, Activity, Moon } from "lucide-react-native";

type TabType = "food" | "drink" | "activity" | "sleep";

export default function AddScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("food");
  const {
    addEntry,
    isLoading,
    fetchDailySummary,
    addSleepLog,
    fetchSleepLogs,
    sleepLogs,
    sleepLoading,
    goals,
  } = useStore();
  const router = useRouter();

  React.useEffect(() => {
    if (activeTab === "sleep") {
      fetchSleepLogs();
    }
  }, [activeTab]);

  const handleEntrySubmit = async (data: any) => {
    await addEntry({
      type: activeTab as any,
      ...data,
      timestamp: new Date().toISOString(),
    });

    const today = getDayKey(new Date());
    await fetchDailySummary(today);
    router.replace("/(tabs)");
  };

  const handleSleepSubmit = async (data: any) => {
    const now = new Date();
    const [startHour, startMinute] = String(data.sleepStart).split(":");
    const [endHour, endMinute] = String(data.sleepEnd).split(":");

    const startDate = new Date(now);
    startDate.setHours(Number(startHour) || 0, Number(startMinute) || 0, 0, 0);
    const endDate = new Date(now);
    endDate.setHours(Number(endHour) || 0, Number(endMinute) || 0, 0, 0);

    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const durationMin = Math.round(
      (endDate.getTime() - startDate.getTime()) / 60000,
    );

    await addSleepLog({
      sleepStart: startDate.toISOString(),
      sleepEnd: endDate.toISOString(),
      durationMin,
      quality: data.quality,
      note: data.note,
      timestamp: new Date().toISOString(),
    });

    const today = getDayKey(new Date());
    await fetchDailySummary(today);
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "food", label: t("Yemek"), icon: Utensils },
    { id: "drink", label: t("İçecek"), icon: Coffee },
    { id: "activity", label: t("Egzersiz"), icon: Activity },
    { id: "sleep", label: t("Uyku"), icon: Moon },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text variant="h2">{t("Yeni Kayıt")}</Text>
              <Text className="text-gray-500 font-medium">
                {t("Gününe bir ekleme yap.")}
              </Text>
            </View>
            {activeTab === "food" && (
              <TouchableOpacity
                onPress={() => router.push("/(modals)/barcode-scanner")}
                className="h-12 w-12 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm"
              >
                <Barcode size={24} color="#10b981" />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row bg-emerald-50/50 p-1.5 rounded-3xl mb-8 border border-emerald-100">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl gap-2 ${activeTab === tab.id ? "bg-white shadow-sm" : ""}`}
              >
                <tab.icon
                  size={16}
                  color={activeTab === tab.id ? "#10b981" : "#9ca3af"}
                />
                {activeTab === tab.id && (
                  <Text className="text-emerald-700 font-black text-xs">
                    {tab.label}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === "food" && (
            <FoodForm onSubmit={handleEntrySubmit} loading={isLoading} />
          )}

          {activeTab === "drink" && (
            <DrinkForm onSubmit={handleEntrySubmit} loading={isLoading} />
          )}

          {activeTab === "activity" && (
            <ActivityForm
              onSubmit={handleEntrySubmit}
              loading={isLoading}
              weightKg={goals.weightGoalKg}
            />
          )}

          {activeTab === "sleep" && (
            <View className="gap-8">
              <SleepEntryForm
                onSubmit={handleSleepSubmit}
                isLoading={sleepLoading}
              />
              <SleepLogList entries={sleepLogs} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
