import React from 'react';
import { View } from 'react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';

interface Props {
  caloriesIn: number;
  caloriesOut: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export function DailySummary({ caloriesIn, caloriesOut, proteinG, carbsG, fatG }: Props) {
  return (
    <View className="space-y-4">
      <View className="flex-row gap-3">
        <View className="flex-1 bg-emerald-500 p-5 rounded-[2.5rem] shadow-sm">
          <Text variant="caption" className="text-white/80 font-black uppercase tracking-widest">{t("Alınan")}</Text>
          <Text className="text-white text-3xl font-black">{caloriesIn}</Text>
        </View>
        <View className="flex-1 bg-gray-900 p-5 rounded-[2.5rem] shadow-sm">
          <Text variant="caption" className="text-gray-400 font-black uppercase tracking-widest">{t("Yakılan")}</Text>
          <Text className="text-white text-3xl font-black">{caloriesOut}</Text>
        </View>
      </View>

      <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm">
        <Text variant="caption" className="text-gray-400 font-black uppercase mb-4">{t("Makrolar")}</Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text variant="h3" className="text-emerald-700">{Math.round(proteinG)}g</Text>
            <Text variant="caption">{t("Protein")}</Text>
          </View>
          <View className="items-center">
            <Text variant="h3" className="text-emerald-600">{Math.round(carbsG)}g</Text>
            <Text variant="caption">{t("Karb")}</Text>
          </View>
          <View className="items-center">
            <Text variant="h3" className="text-rose-500">{Math.round(fatG)}g</Text>
            <Text variant="caption">{t("Yağ")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
