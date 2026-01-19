import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "../../../src/components/atoms/Text";
import { BackgroundGlow } from "../../../src/components/atoms/BackgroundGlow";

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <BackgroundGlow />
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">{t("Gizlilik Politikası")}</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        <View className="bg-white rounded-[2rem] border border-emerald-100 p-5 shadow-sm">
          <Text className="text-gray-900 font-black mb-3">{t("Gizlilik Politikası")}</Text>
          <Text className="text-gray-500 font-medium">
            {t("Verileriniz güvenli şekilde saklanır ve yalnızca izin verdiğiniz paylaşımlar üzerinden erişilebilir.")}
          </Text>
          <Text className="text-gray-500 font-medium mt-3">
            {t("Calmet, hesap ve takip bilgilerinizi uygulama deneyimini iyileştirmek için kullanır.")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
