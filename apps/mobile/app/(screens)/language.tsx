import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { locales, t, setLocale } from '@calai/shared';
import { ChevronLeft, Globe, Check } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

interface Language { code: string; name: string; nativeName: string; flag: string; }

const LANGUAGES: Language[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

function LanguageItem({ language, isSelected, onSelect }: { language: Language; isSelected: boolean; onSelect: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
      <Animated.View style={[styles.languageItem, isSelected && styles.languageItemSelected, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.flagText}>{language.flag}</Text>
        <View style={styles.languageInfo}>
          <Text style={styles.languageName}>{language.nativeName}</Text>
          <Text style={styles.languageEnglish}>{language.name}</Text>
        </View>
        {isSelected && <View style={styles.checkIcon}><Check size={18} color="#fff" /></View>}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function LanguageScreen() {
  const router = useRouter();
  const { settings, updateSettings, saveSettings } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [selectedLanguage, setSelectedLanguage] = useState(settings.locale || 'tr');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSelectLanguage = async (code: string) => {
    setSelectedLanguage(code);
    setLocale(code);
    updateSettings({ locale: code });
    await saveSettings();
    router.back();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><ChevronLeft size={24} color={THEME.colors.text.primary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Dil Seçimi')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}><Globe size={20} color={THEME.colors.primary[600]} /></View>
              <Text style={styles.infoText}>{t('Uygulama dilini seçin. Değişiklik hemen uygulanacaktır.')}</Text>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard style={styles.languagesCard}>
              {LANGUAGES.map((language, idx) => (
                <View key={language.code}>
                  <LanguageItem language={language} isSelected={selectedLanguage === language.code} onSelect={() => handleSelectLanguage(language.code)} />
                  {idx < LANGUAGES.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </LiquidGlassCard>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background.primary },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border, overflow: 'hidden' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: THEME.colors.text.primary },
  headerSpacer: { width: 40 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.primary[100], alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1, fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 18 },
  languagesCard: { padding: 0, overflow: 'hidden' },
  languageItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  languageItemSelected: { backgroundColor: THEME.colors.primary[50] },
  flagText: { fontSize: 28 },
  languageInfo: { flex: 1 },
  languageName: { fontSize: 15, fontWeight: '700', color: THEME.colors.text.primary },
  languageEnglish: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 2 },
  checkIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: THEME.colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, backgroundColor: THEME.colors.glass.border, marginHorizontal: 16 },
});
