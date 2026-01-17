import React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';

export default function PremiumScreen() {
  const router = useRouter();

  const features = [
    t("Sınırsız AI Chat Asistanı"),
    t("Barkod ile Hızlı Yemek Arama"),
    t("Detaylı Haftalık/Aylık Raporlar"),
    t("Google Fit / Apple Health Senkronizasyonu"),
    t("Reklamsız Deneyim"),
    t("Özel Diyet Şablonları"),
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pb-10">
        <View className="items-center mb-10">
          <View className="h-20 w-20 rounded-[2.5rem] bg-amber-50 items-center justify-center mb-6">
            <Sparkles size={40} color="#f59e0b" />
          </View>
          <Text variant="h1" className="text-center">{t("Premium'a Geç")}</Text>
          <Text className="text-gray-500 font-medium text-center mt-2">
            {t("Sağlık yolculuğunu bir üst seviyeye taşı.")}
          </Text>
        </View>

        <View className="space-y-4 mb-10">
          {features.map((feature, idx) => (
            <View key={idx} className="flex-row items-center gap-3">
              <View className="h-6 w-6 rounded-full bg-emerald-100 items-center justify-center">
                <Check size={14} color="#10b981" strokeWidth={3} />
              </View>
              <Text className="text-gray-700 font-bold">{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity className="bg-gray-900 p-6 rounded-[2.5rem] mb-6 border-4 border-emerald-500 shadow-xl shadow-emerald-200">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white font-black text-xl">{t("Yıllık Plan")}</Text>
            <View className="bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-white text-[10px] font-black uppercase">En Popüler</Text>
            </View>
          </View>
          <Text className="text-white/60 font-bold mb-4">{t("₺49.99 / ay (Yıllık faturalandırılır)")}</Text>
          <Button label={t("Abone Ol")} variant="primary" className="h-12 bg-white" style={{ backgroundColor: 'white' }} />
          <Text className="text-emerald-400 font-bold text-center mt-3 text-xs">{t("%40 Tasarruf Edin")}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-6 rounded-[2.5rem] border border-gray-100 mb-10">
          <Text className="text-gray-900 font-black text-xl mb-1">{t("Aylık Plan")}</Text>
          <Text className="text-gray-400 font-bold">{t("₺149.99 / ay")}</Text>
        </TouchableOpacity>

        <View className="items-center gap-2 mb-10 opacity-50">
          <ShieldCheck size={20} color="#9ca3af" />
          <Text variant="caption" className="text-center">
            {t("İstediğiniz zaman iptal edebilirsiniz. Güvenli ödeme.")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
