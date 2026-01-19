import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { t } from "@calai/shared";
import { Text } from "../atoms/Text";
import { Droplets, Plus, GlassWater } from "lucide-react-native";
import { GlassCard } from "../atoms/GlassCard";

interface Props {
  currentMl: number;
  goalMl: number;
  onAddWater: (amount: number) => void;
}

export function WaterWidget({ currentMl, goalMl, onAddWater }: Props) {
  const progress = Math.min(1, currentMl / (goalMl || 2500));
  const [customAmount, setCustomAmount] = useState("");
  const parsedCustom = Number(customAmount.trim().replace(",", "."));

  return (
    <GlassCard>
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-3">
          <View className="p-2 bg-blue-100 rounded-xl">
            <Droplets size={22} color="#2563eb" />
          </View>
          <View>
            <Text variant="h3" className="text-blue-900 leading-tight">
              {t("Su Takibi")}
            </Text>
            <Text className="text-blue-700/60 font-black text-[10px] uppercase tracking-widest">
              {currentMl} / {goalMl} ml
            </Text>
          </View>
        </View>
        <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <Text className="text-[10px] font-black text-blue-700">
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      <View className="h-4 w-full bg-blue-50/50 border border-blue-100 rounded-full overflow-hidden mb-8 shadow-sm">
        <View
          className="h-full bg-blue-500 rounded-full relative"
          style={{ width: `${progress * 100}%` }}
        >
          <View className="absolute inset-0 bg-white/20 opacity-30" />
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2.5 mb-6">
        {[250, 500, 750, 1000].map((amount) => (
          <TouchableOpacity
            key={amount}
            onPress={() => onAddWater(amount)}
            className="h-14 flex-1 bg-white rounded-2xl flex-row items-center justify-center gap-2 border border-blue-50 shadow-sm"
          >
            <View className="p-1 bg-blue-50 rounded-lg">
              <Plus size={14} color="#2563eb" />
            </View>
            <Text className="text-blue-900 font-black text-xs">
              {amount === 1000 ? "1L" : `${amount}ml`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row items-center gap-2">
        <View className="flex-1 flex-row items-center bg-white border border-blue-50 rounded-2xl px-4 h-14 shadow-sm">
          <GlassWater size={18} color="#2563eb" className="mr-3" />
          <TextInput
            className="flex-1 font-black text-blue-950 text-base h-full"
            placeholder={t("Özel ml...")}
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!Number.isFinite(parsedCustom) || parsedCustom <= 0) return;
            onAddWater(Math.round(parsedCustom));
            setCustomAmount("");
          }}
          className="h-14 px-6 rounded-2xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-200"
        >
          <Text className="text-white font-black">{t("Ekle")}</Text>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}
