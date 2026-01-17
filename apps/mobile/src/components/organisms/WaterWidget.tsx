import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { Droplets, Plus } from 'lucide-react-native';

interface Props {
  currentMl: number;
  goalMl: number;
  onAddWater: (amount: number) => void;
}

export function WaterWidget({ currentMl, goalMl, onAddWater }: Props) {
  const progress = Math.min(1, currentMl / (goalMl || 2500));

  return (
    <View className="bg-white p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-3">
          <View className="p-2 bg-emerald-100 rounded-xl">
            <Droplets size={20} color="#10b981" />
          </View>
          <Text variant="h3">{t("Su Takibi")}</Text>
        </View>
        <Text className="text-emerald-700 font-black">{currentMl} / {goalMl} ml</Text>
      </View>

      <View className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden mb-6">
        <View 
          className="h-full bg-emerald-500 rounded-full" 
          style={{ width: `${progress * 100}%` }} 
        />
      </View>

      <View className="flex-row gap-2">
        {[250, 500].map((amount) => (
          <TouchableOpacity 
            key={amount}
            onPress={() => onAddWater(amount)}
            className="flex-1 h-12 bg-emerald-50 rounded-2xl flex-row items-center justify-center gap-2 border border-emerald-100"
          >
            <Plus size={16} color="#10b981" />
            <Text className="text-emerald-700 font-bold">{amount}ml</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
