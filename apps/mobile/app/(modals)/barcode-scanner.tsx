import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { X, Zap, ZapOff } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { t } from '@calai/shared';

export default function BarcodeScannerModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text variant="h2" className="text-center mb-4">{t("Kamera İzni Gerekli")}</Text>
        <Text className="text-center text-gray-500 mb-8">{t("Barkod taramak için kamera erişimine izin vermeniz gerekmektedir.")}</Text>
        <TouchableOpacity 
          onPress={requestPermission}
          className="bg-emerald-600 px-8 py-4 rounded-3xl"
        >
          <Text className="text-white font-black">{t("İzin Ver")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    router.back();
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        enableTorch={torch}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity onPress={() => router.back()} className="p-2 bg-black/50 rounded-full">
              <X size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTorch(!torch)} className="p-2 bg-black/50 rounded-full">
              {torch ? <Zap size={24} color="#fbbf24" /> : <ZapOff size={24} color="white" />}
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-64 border-2 border-emerald-500 rounded-3xl bg-transparent" />
            <Text className="text-white font-black mt-8 text-center bg-black/50 px-6 py-2 rounded-full overflow-hidden">
              {t("Barkodu çerçevenin içine hizalayın")}
            </Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}
