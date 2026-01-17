import React from "react";
import { View } from "react-native";
import { Text } from "../atoms/Text";
import { SleepEntry, SleepQuality } from "@calai/shared";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Props {
  entry: SleepEntry;
}

const QUALITY_COLORS: Record<SleepQuality, string> = {
  poor: "bg-red-500",
  fair: "bg-yellow-500",
  good: "bg-emerald-500",
  excellent: "bg-blue-500",
};

export function SleepLogItem({ entry }: Props) {
  const startDate = new Date(entry.sleepStart);
  const endDate = new Date(entry.sleepEnd);

  const formattedStart = format(startDate, "HH:mm", { locale: tr });
  const formattedEnd = format(endDate, "HH:mm", { locale: tr });
  const hours = Math.floor(entry.durationMin / 60);
  const minutes = entry.durationMin % 60;

  return (
    <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 mb-3 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View
          className={`w-2 h-10 rounded-full ${QUALITY_COLORS[entry.quality]}`}
        />
        <View>
          <Text variant="h3" className="text-gray-900">
            {formattedStart} - {formattedEnd}
          </Text>
          <Text className="text-gray-500 text-sm mt-0.5">
            {hours}sa {minutes > 0 ? `${minutes}dk` : ""}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="font-bold text-gray-400 capitalize">
          {entry.quality === "excellent"
            ? "Mukemmel"
            : entry.quality === "good"
              ? "Iyi"
              : entry.quality === "fair"
                ? "Orta"
                : "Kotu"}
        </Text>
      </View>
    </View>
  );
}
