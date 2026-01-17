import React from "react";
import { View } from "react-native";
import { Text } from "../atoms/Text";
import { Moon, Star } from "lucide-react-native";
import { SleepQuality } from "@calai/shared";

interface Props {
  sleepDurationHours: number;
  sleepGoalHours: number;
  quality: SleepQuality | null;
}

const QUALITY_COLORS: Record<SleepQuality, string> = {
  poor: "text-red-500",
  fair: "text-yellow-600",
  good: "text-emerald-600",
  excellent: "text-blue-600",
};

const QUALITY_BG_COLORS: Record<SleepQuality, string> = {
  poor: "bg-red-100",
  fair: "bg-yellow-100",
  good: "bg-emerald-100",
  excellent: "bg-blue-100",
};

const QUALITY_LABELS: Record<SleepQuality, string> = {
  poor: "Kotu",
  fair: "Orta",
  good: "Iyi",
  excellent: "Mukemmel",
};

export function SleepSummaryCard({
  sleepDurationHours,
  sleepGoalHours,
  quality,
}: Props) {
  const progress = Math.min(1, sleepDurationHours / (sleepGoalHours || 8));

  const progressPercent = `${Math.round(progress * 100)}%`;

  return (
    <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-3">
          <View className="p-2 bg-emerald-100 rounded-xl">
            <Moon size={20} color="#10b981" />
          </View>
          <Text variant="h3">Uyku</Text>
        </View>
        <Text className="text-emerald-900 font-black">
          {sleepDurationHours.toFixed(1)} / {sleepGoalHours} sa
        </Text>
      </View>

      <View className="h-3 w-full bg-emerald-50 rounded-full overflow-hidden mb-6">
        <View
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: progressPercent }}
        />
      </View>

      {quality ? (
        <View
          className={`flex-row items-center self-start px-3 py-1.5 rounded-full ${QUALITY_BG_COLORS[quality]}`}
        >
          <Star size={14} className="mr-1.5" color="#4b5563" />
          <Text className={`text-xs font-bold ${QUALITY_COLORS[quality]}`}>
            {QUALITY_LABELS[quality]} Kalite
          </Text>
        </View>
      ) : (
        <Text className="text-gray-400 text-sm">Henuz veri yok</Text>
      )}
    </View>
  );
}
