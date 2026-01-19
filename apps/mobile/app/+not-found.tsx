import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "../src/components/atoms/Text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Bulunamadı" }} />
      <View className="flex-1 items-center justify-center bg-[#fffcf9] px-6">
        <Text variant="h2" className="text-center">
          Sayfa bulunamadı
        </Text>
        <Link href="/" className="mt-4">
          <Text className="text-emerald-600 font-black">Ana sayfaya dön</Text>
        </Link>
      </View>
    </>
  );
}
