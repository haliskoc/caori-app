import React from "react";
import { View } from "react-native";
import { t } from "@calai/shared";
import { Text } from "../atoms/Text";
import { GlassCard } from "../atoms/GlassCard";
import { CircularProgress } from "../atoms/CircularProgress";
import { Flame, Activity as ActivityIcon, Zap } from "lucide-react-native";

interface Props {
  caloriesIn: number;
  caloriesOut: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  calorieGoal?: number;
  proteinGoalG?: number;
  carbsGoalG?: number;
  fatGoalG?: number;
}

export function DailySummary({
  caloriesIn,
  caloriesOut,
  proteinG,
  carbsG,
  fatG,
  calorieGoal,
  proteinGoalG,
  carbsGoalG,
  fatGoalG,
}: Props) {
  const progress = calorieGoal ? Math.min(1, caloriesIn / calorieGoal) : 0;
  const hasMacroGoals =
    (proteinGoalG || 0) > 0 || (carbsGoalG || 0) > 0 || (fatGoalG || 0) > 0;

  return (
    <GlassCard>
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-2">
          <View className="p-1.5 bg-emerald-100 rounded-lg">
            <Zap size={16} color="#059669" />
          </View>
          <Text variant="caption" className="text-emerald-900 font-black uppercase tracking-widest">
            {t("Günlük Enerji")}
          </Text>
        </View>
        <View className="bg-white/50 px-3 py-1 rounded-full border border-emerald-50">
          <Text className="text-[10px] font-black text-emerald-700">
            {calorieGoal ? `${Math.round(progress * 100)}% ${t("Tamamlandı")}` : t("Hedef Yok")}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 items-center mb-8">
        <View className="flex-1 bg-white border border-emerald-50 p-4 rounded-[2.5rem] shadow-sm relative overflow-hidden">
          <View className="absolute -right-2 -top-2 opacity-5">
            <Flame size={64} color="#10b981" />
          </View>
          <Text variant="caption" className="text-emerald-600 font-black uppercase tracking-widest mb-1 text-[10px]">
            {t("Alınan")}
          </Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-gray-900 text-3xl font-black">{caloriesIn}</Text>
            <Text className="text-gray-400 text-xs font-black">kcal</Text>
          </View>
        </View>
        <View className="flex-1 bg-gray-900 p-4 rounded-[2.5rem] shadow-lg relative overflow-hidden">
          <View className="absolute -right-2 -top-2 opacity-10">
            <ActivityIcon size={64} color="white" />
          </View>
          <Text variant="caption" className="text-gray-400 font-black uppercase tracking-widest mb-1 text-[10px]">
            {t("Yakılan")}
          </Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-white text-3xl font-black">{caloriesOut}</Text>
            <Text className="text-gray-500 text-xs font-black">kcal</Text>
          </View>
        </View>
      </View>

      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text variant="caption" className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
            {t("Makro Dağılımı")}
          </Text>
          <View className="h-1 flex-1 mx-4 bg-gray-50 rounded-full overflow-hidden flex-row">
            <View style={{ flex: proteinG || 1 }} className="bg-emerald-500" />
            <View style={{ flex: carbsG || 1 }} className="bg-amber-400" />
            <View style={{ flex: fatG || 1 }} className="bg-rose-500" />
          </View>
        </View>
        <View className="flex-row justify-between">
          <MacroItem label={t("Protein")} value={proteinG} goal={proteinGoalG} color="text-emerald-600" dotColor="bg-emerald-500" />
          <MacroItem label={t("Karb")} value={carbsG} goal={carbsGoalG} color="text-amber-600" dotColor="bg-amber-400" />
          <MacroItem label={t("Yağ")} value={fatG} goal={fatGoalG} color="text-rose-500" dotColor="bg-rose-500" />
        </View>
      </View>

      {hasMacroGoals && (
        <View className="mt-2 pt-5 border-t border-emerald-50/50">
          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-1 h-3 bg-emerald-500 rounded-full" />
            <Text variant="caption" className="text-emerald-900 font-black uppercase tracking-widest text-[10px]">
              {t("Hedef Takibi")}
            </Text>
          </View>
          <View className="gap-3">
            {[
              { label: t("Protein"), value: proteinG, goal: proteinGoalG || 0, color: "bg-emerald-500" },
              { label: t("Karbonhidrat"), value: carbsG, goal: carbsGoalG || 0, color: "bg-amber-400" },
              { label: t("Yağ"), value: fatG, goal: fatGoalG || 0, color: "bg-rose-500" },
            ].map((macro) => {
              const pct = macro.goal > 0 ? Math.min(1, macro.value / macro.goal) : 0;
              return (
                <View key={macro.label}>
                  <View className="flex-row items-center justify-between mb-1.5">
                    <Text className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{macro.label}</Text>
                    <Text className="text-[10px] font-black text-emerald-800">
                      {Math.round(macro.value)} / {Math.round(macro.goal)}g
                    </Text>
                  </View>
                  <View className="h-1.5 w-full rounded-full bg-white border border-emerald-50 overflow-hidden shadow-sm">
                    <View
                      className={`h-full ${macro.color} rounded-full`}
                      style={{ width: `${pct * 100}%` }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </GlassCard>
  );
}

function MacroItem({ label, value, goal, color, dotColor }: any) {
  return (
    <View className="items-center bg-white/40 px-3 py-2 rounded-2xl border border-white/60">
      <View className="flex-row items-center gap-1.5 mb-0.5">
        <View className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <Text variant="caption" className="text-[10px] uppercase font-black">{label}</Text>
      </View>
      <Text className={`font-black text-lg ${color}`}>{Math.round(value)}g</Text>
      {goal > 0 && (
        <Text className="text-[9px] text-gray-400 font-bold">/ {Math.round(goal)}g</Text>
      )}
    </View>
  );
}
