import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/providers/AuthProvider';
import { t } from '@calai/shared';
import { UserPlus, ChevronLeft } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const { signup } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center mb-12">
          <View className="h-20 w-20 rounded-[2.5rem] bg-emerald-50 items-center justify-center mb-6 border border-emerald-100 shadow-sm">
            <UserPlus size={40} color="#10b981" />
          </View>
          <Text variant="h1" className="text-center">{t("Hesap Oluştur")}</Text>
          <Text className="text-gray-500 font-medium text-center mt-2 px-4">
            {t("Sağlıklı yaşam yolculuğuna bugün katıl. Ücretsiz hesabını saniyeler içinde oluştur.")}
          </Text>
        </View>

        <View className="w-full space-y-4">
          <Button 
            label={t("Şimdi Kayıt Ol")}
            onPress={signup}
          />
          
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            className="mt-4"
          >
            <Text className="text-gray-500 text-center font-bold">
              {t("Zaten hesabın var mı?")} <Text className="text-emerald-600">{t("Giriş Yap")}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-12 p-6 bg-white rounded-3xl border border-gray-100">
          <Text variant="caption" className="text-center text-gray-400">
            {t("Kayıt olarak Kullanım Şartları ve Gizlilik Politikamızı kabul etmiş sayılırsınız.")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
