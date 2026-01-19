import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/providers/AuthProvider';
import { t } from '@calai/shared';
import { Sparkles } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#fffcf9]">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center mb-12">
          <View className="h-20 w-20 rounded-[2.5rem] bg-emerald-50 items-center justify-center mb-6 border border-emerald-100 shadow-sm">
            <Sparkles size={40} color="#10b981" />
          </View>
          <Text variant="h1" className="text-center">
            Cal<Text variant="h1" className="text-emerald-500">met</Text>
          </Text>
          <Text className="text-gray-500 font-medium text-center mt-2 px-4">
            {t("Calmet; yapay zeka destekli diyet takvimi ve analizlerle sağlık hedeflerinize ulaştırır.")}
          </Text>
        </View>

        <View className="w-full space-y-4">
          <Button 
            label={t("Giriş Yap")}
            onPress={login}
          />
          
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')}
            className="mt-4"
          >
            <Text className="text-gray-500 text-center font-bold">
              {t("Henüz hesabın yok mu?")} <Text className="text-emerald-600">{t("Hesap Aç")}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text variant="caption" className="text-center mt-8 px-10">
          {t("Kredi kartı gerekmez. Saniyeler içinde başla.")}
        </Text>
      </View>
    </SafeAreaView>
  );
}
