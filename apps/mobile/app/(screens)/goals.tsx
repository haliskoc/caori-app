import React from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Target, Flame, Droplets, Utensils } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';
import { useStore } from '../../src/store';

export default function GoalsScreen() {
  const router = useRouter();
  const { goals, updateGoals } = useStore();

  const handleUpdate = (key: string, value: string) => {
    updateGoals({ [key]: Number(value) });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">{t("Hedeflerim")}</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        <View className="bg-emerald-50 p-6 rounded-[2.5rem] flex-row items-center gap-4 mb-8 border border-emerald-100">
          <View className="bg-emerald-600 p-3 rounded-2xl">
            <Target size={24} color="white" />
          </View>
          <View>
            <Text className="text-emerald-900 font-black">{t("Hedef Belirle")}</Text>
            <Text className="text-emerald-700 text-xs font-bold">{t("İlerleyişini bu hedeflere göre takip edeceğiz.")}</Text>
          </View>
        </View>

        <View className="space-y-6">
          <View>
            <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Günlük Kalori Hedefi")}</Text>
            <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14">
              <Flame size={20} color="#10b981" />
              <TextInput 
                className="flex-1 ml-3 font-bold text-gray-900"
                keyboardType="numeric"
                value={goals.calorieGoal?.toString()}
                onChangeText={(v) => handleUpdate('calorieGoal', v)}
              />
              <Text className="text-gray-400 font-bold ml-2">kcal</Text>
            </View>
          </View>

          <View>
            <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Günlük Su Hedefi")}</Text>
            <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14">
              <Droplets size={20} color="#3b82f6" />
              <TextInput 
                className="flex-1 ml-3 font-bold text-gray-900"
                keyboardType="numeric"
                value={goals.waterGoalMl?.toString()}
                onChangeText={(v) => handleUpdate('waterGoalMl', v)}
              />
              <Text className="text-gray-400 font-bold ml-2">ml</Text>
            </View>
          </View>

          <View className="pt-4">
            <Text variant="h3" className="mb-4">{t("Makro Besin Hedefleri")}</Text>
            <View className="grid grid-cols-3 gap-4">
              <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center">
                <Text variant="caption" className="mb-1">{t("Protein")}</Text>
                <TextInput 
                  className="font-black text-emerald-700 text-lg text-center"
                  keyboardType="numeric"
                  value={goals.proteinGoalG?.toString()}
                  onChangeText={(v) => handleUpdate('proteinGoalG', v)}
                />
                <Text variant="caption">gram</Text>
              </View>
              <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center">
                <Text variant="caption" className="mb-1">{t("Karb")}</Text>
                <TextInput 
                  className="font-black text-emerald-600 text-lg text-center"
                  keyboardType="numeric"
                  value={goals.carbsGoalG?.toString()}
                  onChangeText={(v) => handleUpdate('carbsGoalG', v)}
                />
                <Text variant="caption">gram</Text>
              </View>
              <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center">
                <Text variant="caption" className="mb-1">{t("Yağ")}</Text>
                <TextInput 
                  className="font-black text-rose-500 text-lg text-center"
                  keyboardType="numeric"
                  value={goals.fatGoalG?.toString()}
                  onChangeText={(v) => handleUpdate('fatGoalG', v)}
                />
                <Text variant="caption">gram</Text>
              </View>
            </View>
          </View>

          <Button label={t("Kaydet")} className="mt-8" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
