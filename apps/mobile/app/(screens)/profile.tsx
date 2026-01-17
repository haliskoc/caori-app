import React from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, User, Mail, Calendar, Ruler } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';
import { useStore } from '../../src/store';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">{t("Profil Bilgileri")}</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        <View className="items-center mb-10">
          <View className="h-24 w-24 rounded-[3rem] bg-emerald-100 items-center justify-center border-4 border-white shadow-sm">
            <User size={48} color="#10b981" />
          </View>
          <Text variant="h2" className="mt-4">{user?.name || t("Kullanıcı")}</Text>
          <Text className="text-gray-400 font-bold">{user?.email}</Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Ad Soyad")}</Text>
            <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14">
              <User size={20} color="#9ca3af" />
              <TextInput 
                className="flex-1 ml-3 font-bold text-gray-900"
                value={user?.name}
                placeholder={t("Adınız")}
              />
            </View>
          </View>

          <View>
            <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("E-posta")}</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14">
              <Mail size={20} color="#9ca3af" />
              <Text className="flex-1 ml-3 font-bold text-gray-400">{user?.email}</Text>
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Boy (cm)")}</Text>
              <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14">
                <Ruler size={20} color="#9ca3af" />
                <TextInput className="flex-1 ml-3 font-bold text-gray-900" keyboardType="numeric" placeholder="175" />
              </View>
            </View>
            <View className="flex-1">
              <Text variant="caption" className="mb-2 uppercase font-black text-gray-400">{t("Yaş")}</Text>
              <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14">
                <Calendar size={20} color="#9ca3af" />
                <TextInput className="flex-1 ml-3 font-bold text-gray-900" keyboardType="numeric" placeholder="25" />
              </View>
            </View>
          </View>

          <Button label={t("Güncelle")} className="mt-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
