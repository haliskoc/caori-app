import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Scale, Ruler, TrendingUp } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';

export default function MeasurementsScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">{t("Vücut Ölçümleri")}</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        <View className="bg-blue-50 p-6 rounded-[2.5rem] mb-8 border border-blue-100">
          <Text className="text-blue-900 font-black mb-2">{t("Gelişimi Takip Et")}</Text>
          <Text className="text-blue-700 text-xs font-bold">
            {t("Düzenli ölçüm girmek, hedefinize ne kadar yaklaştığınızı görmenizi sağlar.")}
          </Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Güncel Kilo (kg)")}</Text>
            <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-16">
              <Scale size={24} color="#3b82f6" />
              <TextInput 
                className="flex-1 ml-3 font-black text-2xl text-gray-900"
                keyboardType="numeric"
                placeholder="0.0"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-50 items-center shadow-sm">
              <TrendingUp size={24} color="#10b981" />
              <Text className="text-emerald-600 font-black mt-2">-2.4 kg</Text>
              <Text variant="caption">{t("Son 30 Gün")}</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-50 items-center shadow-sm">
              <Ruler size={24} color="#f59e0b" />
              <Text className="text-amber-600 font-black mt-2">24.2</Text>
              <Text variant="caption">{t("Vücut Kitle Endeksi")}</Text>
            </View>
          </View>

          <Button label={t("Ölçümü Kaydet")} className="mt-8" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
