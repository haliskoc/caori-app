import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/providers/AuthProvider';
import { t } from '@calai/shared';
import { 
  User, LogOut, ChevronRight, Bell, Shield, 
  Moon, Target, FileDown, Globe, HelpCircle, 
  CreditCard, Scale 
} from 'lucide-react-native';
import { useStore } from '../../src/store';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useStore();

  const handleExport = () => {
    Alert.alert(t("Verileri Dışa Aktar"), t("Tüm kayıtlarınız CSV formatında e-posta adresinize gönderilecektir."), [
      { text: t("İptal"), style: "cancel" },
      { text: t("Gönder"), onPress: () => console.log("Export triggered") }
    ]);
  };

  const sections = [
    {
      title: t("Hesap"),
      items: [
        { icon: User, label: t("Profil Bilgileri"), onPress: () => router.push('/(screens)/profile'), color: "#10b981" },
        { icon: Target, label: t("Hedeflerim"), onPress: () => router.push('/(screens)/goals'), color: "#10b981" },
        { icon: Scale, label: t("Vücut Ölçümleri"), onPress: () => router.push('/(screens)/measurements'), color: "#3b82f6" },
        { icon: CreditCard, label: t("Premium Abonelik"), onPress: () => router.push('/(screens)/premium'), color: "#f59e0b" },
      ]
    },
    {
      title: t("Uygulama"),
      items: [
        { icon: Bell, label: t("Hatırlatıcılar"), color: "#3b82f6" },
        { icon: Globe, label: t("Dil Seçimi"), color: "#8b5cf6" },
        { icon: Moon, label: t("Koyu Tema"), color: "#111827" },
      ]
    },
    {
      title: t("Veri ve Destek"),
      items: [
        { icon: FileDown, label: t("Verileri Dışa Aktar (CSV)"), onPress: handleExport, color: "#10b981" },
        { icon: HelpCircle, label: t("Yardım ve SSS"), color: "#6b7280" },
        { icon: Shield, label: t("Gizlilik Politikası"), color: "#6b7280" },
      ]
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-8 ml-4">
          <Text className="text-3xl font-black text-gray-900">{t("Ayarlar")}</Text>
          <View className="flex-row items-center mt-2 gap-2">
            <View className="h-2 w-2 rounded-full bg-emerald-500" />
            <Text className="text-gray-400 font-bold">{user?.email}</Text>
          </View>
        </View>
        
        {sections.map((section, sIdx) => (
          <View key={sIdx} className="mb-8">
            <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-4">
              {section.title}
            </Text>
            <View className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm overflow-hidden">
              {section.items.map((item, iIdx) => (
                <TouchableOpacity 
                  key={iIdx}
                  onPress={item.onPress}
                  className={`flex-row items-center justify-between p-5 ${iIdx !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <View className="flex-row items-center gap-4">
                    <View style={{ backgroundColor: `${item.color}10` }} className="p-2 rounded-xl">
                      <item.icon size={20} color={item.color} />
                    </View>
                    <Text className="text-gray-900 font-bold">{item.label}</Text>
                  </View>
                  <ChevronRight size={18} color="#d1d5db" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          onPress={logout}
          className="bg-rose-50 rounded-[2rem] p-5 flex-row items-center justify-center gap-3 border border-rose-100 mb-10 mx-4"
        >
          <LogOut size={20} color="#f43f5e" />
          <Text className="text-rose-500 font-black">{t("Çıkış Yap")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
