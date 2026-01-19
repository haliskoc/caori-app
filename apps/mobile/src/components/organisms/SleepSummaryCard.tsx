import React from "react";
import { View } from "react-native";
import { Text } from "../atoms/Text";
import { Moon, Star, Sparkles, Clock } from "lucide-react-native";
import { SleepQuality, t } from "@calai/shared";
import { GlassCard } from "../atoms/GlassCard";

interface Props {
  sleepDurationHours: number;
  sleepGoalHours: number;
  quality: SleepQuality | null;
}

const QUALITY_STYLES: Record<SleepQuality, { color: string; bg: string; label: string }> = {
  poor: { color: "#ef4444", bg: "bg-red-50", label: t("Kötü") },
  fair: { color: "#f59e0b", bg: "bg-amber-50", label: t("Orta") },
  good: { color: "#10b981", bg: "bg-emerald-50", label: t("İyi") },
  excellent: { color: "#3b82f6", bg: "bg-blue-50", label: t("Mükemmel") },
};

export function SleepSummaryCard({
  sleepDurationHours,
  sleepGoalHours,
  quality,
}: Props) {
  const progress = Math.min(1, sleepDurationHours / (sleepGoalHours || 8));
  const style = quality ? QUALITY_STYLES[quality] : null;

  return (
    <GlassCard>
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-3">
          <View className="p-2 bg-indigo-100 rounded-xl">
            <Moon size={22} color="#4f46e5" />
          </View>
          <View>
            <Text variant="h3" className="text-indigo-950 leading-tight">
              {t("Uyku Analizi")}
            </Text>
            <Text className="text-indigo-700/60 font-black text-[10px] uppercase tracking-widest">
              {sleepDurationHours.toFixed(1)} / {sleepGoalHours} sa
            </Text>
          </View>
        </View>
        <View className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          <Text className="text-[10px] font-black text-indigo-700">
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      <View className="h-4 w-full bg-indigo-50/50 border border-indigo-100 rounded-full overflow-hidden mb-6 shadow-sm">
        <View
          className="h-full bg-indigo-600 rounded-full relative"
          style={{ width: `${progress * 100}%` }}
        >
          <View className="absolute inset-0 bg-white/10 opacity-20" />
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5 bg-white/60 px-3 py-2 rounded-2xl border border-white/60">
            <Clock size={14} color="#4f46e5" />
            <Text className="text-[10px] font-black text-indigo-900">
              {sleepDurationHours.toFixed(1)} {t("saat")}
            </Text>
          </View>

          {quality && style && (
            <View className={`flex-row items-center gap-1.5 ${style.bg} px-3 py-2 rounded-2xl border border-indigo-50`}>
              <Star size={14} color={style.color} fill={style.color} />
              <Text className="text-[10px] font-black" style={{ color: style.color }}>
                {style.label} {t("Uyku")}
              </Text>
            </View>
          )}
        </View>

        {!quality && (
          <View className="flex-row items-center gap-1.5">
            <Sparkles size={14} color="#94a3b8" />
            <Text className="text-[10px] font-bold text-slate-400">
              {t("Veri Bekleniyor")}
            </Text>
          </View>
        )}
      </View>
    </GlassCard>
  );
}
