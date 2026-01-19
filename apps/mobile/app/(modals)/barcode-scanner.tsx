import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, Vibration, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useRouter } from 'expo-router';
import { X, Zap, ZapOff, Scan, RefreshCw } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { t } from '@calai/shared';
import { BlurView } from 'expo-blur';
import { THEME } from '../../src/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCAN_AREA_SIZE = SCREEN_WIDTH * 0.7;

// Supported barcode types for food products
const BARCODE_TYPES = [
  'ean13',
  'ean8', 
  'upc_a',
  'upc_e',
  'code128',
  'code39',
  'code93',
  'datamatrix',
  'qr',
] as const;

export default function BarcodeScannerModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);
  const router = useRouter();
  
  // Animation refs
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cornerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    // Scan line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation for corners
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Corner fade in
    Animated.timing(cornerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!permission) return <View style={styles.container} />;
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.permissionContent}>
          <View style={styles.permissionIcon}>
            <Scan size={48} color={THEME.colors.primary[500]} />
          </View>
          <Text style={styles.permissionTitle}>{t("Kamera İzni Gerekli")}</Text>
          <Text style={styles.permissionText}>
            {t("Barkod taramak için kamera erişimine izin vermeniz gerekmektedir.")}
          </Text>
          <TouchableOpacity 
            onPress={requestPermission}
            style={styles.permissionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>{t("İzin Ver")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;
    
    const { data, type } = result;
    
    // Validate barcode data
    if (!data || data.length < 8) {
      console.log('Invalid barcode data:', data);
      return;
    }

    // Prevent duplicate scans
    if (data === lastBarcode) return;
    
    setScanned(true);
    setLastBarcode(data);
    
    // Haptic feedback
    Vibration.vibrate(100);
    
    console.log('Scanned barcode:', data, 'Type:', type);
    
    // Navigate to result page
    const encoded = encodeURIComponent(data);
    router.replace(`/(modals)/barcode-result?code=${encoded}`);
  };

  const handleRetry = () => {
    setScanned(false);
    setLastBarcode(null);
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCAN_AREA_SIZE - 4],
  });

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: BARCODE_TYPES as any,
        }}
        enableTorch={torch}
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View style={styles.overlayTop} />
          
          {/* Middle row with scan area */}
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            
            {/* Scan area */}
            <Animated.View 
              style={[
                styles.scanArea, 
                { opacity: cornerAnim, transform: [{ scale: pulseAnim }] }
              ]}
            >
              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              
              {/* Scan line */}
              <Animated.View 
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslateY }] }
                ]} 
              />
            </Animated.View>
            
            <View style={styles.overlaySide} />
          </View>
          
          {/* Bottom overlay */}
          <View style={styles.overlayBottom} />
        </View>

        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.headerButton}
              activeOpacity={0.7}
            >
              <BlurView intensity={60} tint="dark" style={styles.headerButtonBlur}>
                <X size={24} color="white" />
              </BlurView>
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Scan size={20} color="white" />
              <Text style={styles.headerTitle}>{t("Barkod Tara")}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => setTorch(!torch)} 
              style={styles.headerButton}
              activeOpacity={0.7}
            >
              <BlurView 
                intensity={60} 
                tint="dark" 
                style={[styles.headerButtonBlur, torch && styles.torchActive]}
              >
                {torch ? (
                  <Zap size={24} color="#fbbf24" />
                ) : (
                  <ZapOff size={24} color="white" />
                )}
              </BlurView>
            </TouchableOpacity>
          </View>
          
          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <BlurView intensity={60} tint="dark" style={styles.instructionsBlur}>
              <Text style={styles.instructionsText}>
                {scanned 
                  ? t("Barkod tarandı! Yönlendiriliyor...")
                  : t("Barkodu çerçevenin içine hizalayın")}
              </Text>
            </BlurView>
          </View>

          {/* Retry button when scanned */}
          {scanned && (
            <View style={styles.retryContainer}>
              <TouchableOpacity 
                onPress={handleRetry}
                style={styles.retryButton}
                activeOpacity={0.8}
              >
                <RefreshCw size={20} color="white" />
                <Text style={styles.retryText}>{t("Tekrar Tara")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.background.primary,
  },
  permissionContent: {
    alignItems: 'center',
    padding: 32,
    maxWidth: 320,
  },
  permissionIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: THEME.colors.text.muted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: THEME.colors.primary[600],
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    ...THEME.shadow.md,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: SCAN_AREA_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: THEME.colors.primary[400],
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  scanLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: THEME.colors.primary[400],
    borderRadius: 2,
    shadowColor: THEME.colors.primary[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  headerButtonBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  torchActive: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionsBlur: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  instructionsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.colors.primary[600],
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    ...THEME.shadow.md,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
