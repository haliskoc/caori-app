import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Switch, StyleSheet, Animated, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { ChevronLeft, Moon, Sun, Palette, Monitor, Check } from "lucide-react-native";
import { t } from "@calai/shared";
import { Text } from "../../src/components/atoms/Text";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useStore } from "../../src/store";

interface ThemeOption { id: string; label: string; icon: React.ReactNode; }

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', label: 'Açık', icon: <Sun size={22} color={THEME.colors.primary[600]} /> },
  { id: 'dark', label: 'Koyu', icon: <Moon size={22} color={THEME.colors.primary[600]} /> },
  { id: 'system', label: 'Sistem', icon: <Monitor size={22} color={THEME.colors.primary[600]} /> },
];

const ACCENT_COLORS = [
  { id: 'emerald', color: '#10b981', label: 'Zümrüt' },
  { id: 'blue', color: '#3b82f6', label: 'Mavi' },
  { id: 'purple', color: '#8b5cf6', label: 'Mor' },
  { id: 'rose', color: '#f43f5e', label: 'Gül' },
  { id: 'orange', color: '#f97316', label: 'Turuncu' },
];

function ThemeCard({ option, isSelected, onSelect }: { option: ThemeOption; isSelected: boolean; onSelect: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9} style={styles.themeCardWrapper}>
      <Animated.View style={[styles.themeCard, isSelected && styles.themeCardSelected, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.themeIconBg, isSelected && styles.themeIconBgSelected]}>{option.icon}</View>
        <Text style={[styles.themeCardLabel, isSelected && styles.themeCardLabelSelected]}>{t(option.label)}</Text>
        {isSelected && <View style={styles.selectedCheck}><Check size={14} color="#fff" /></View>}
      </Animated.View>
    </TouchableOpacity>
  );
}

function ColorOption({ color, isSelected, onSelect }: { color: typeof ACCENT_COLORS[0]; isSelected: boolean; onSelect: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
      <Animated.View style={[styles.colorOption, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.colorCircle, { backgroundColor: color.color }, isSelected && styles.colorCircleSelected]}>
          {isSelected && <Check size={18} color="#fff" />}
        </View>
        <Text style={styles.colorLabel}>{t(color.label)}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function ThemeScreen() {
  const router = useRouter();
  const { settings, updateSettings, saveSettings } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [themeMode, setThemeMode] = useState(settings.theme?.mode || 'light');
  const [accentColor, setAccentColor] = useState(settings.theme?.accent || 'emerald');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSave = async () => {
    updateSettings({
      flags: { darkMode: themeMode === 'dark' },
      theme: { accent: accentColor, mode: themeMode },
    });
    await saveSettings();
    router.back();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><ChevronLeft size={24} color={THEME.colors.text.primary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Tema')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.sectionLabel}>{t('Görünüm')}</Text>
            <LiquidGlassCard style={styles.themeSection}>
              <View style={styles.themeCardsRow}>
                {THEME_OPTIONS.map((option) => (
                  <ThemeCard key={option.id} option={option} isSelected={themeMode === option.id} onSelect={() => setThemeMode(option.id)} />
                ))}
              </View>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.sectionLabel}>{t('Vurgu Rengi')}</Text>
            <LiquidGlassCard style={styles.colorsSection}>
              <View style={styles.colorsRow}>
                {ACCENT_COLORS.map((color) => (
                  <ColorOption key={color.id} color={color} isSelected={accentColor === color.id} onSelect={() => setAccentColor(color.id)} />
                ))}
              </View>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.sectionLabel}>{t('Önizleme')}</Text>
            <LiquidGlassCard variant="elevated" style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <View style={[styles.previewDot, { backgroundColor: ACCENT_COLORS.find(c => c.id === accentColor)?.color }]} />
                <Text style={styles.previewTitle}>{t('Örnek Kartı')}</Text>
              </View>
              <Text style={styles.previewText}>{t('Seçtiğiniz tema ve renk bu şekilde görünecek.')}</Text>
              <View style={[styles.previewButton, { backgroundColor: ACCENT_COLORS.find(c => c.id === accentColor)?.color }]}>
                <Text style={styles.previewButtonText}>{t('Örnek Buton')}</Text>
              </View>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.9}>
              <Text style={styles.saveButtonText}>{t('Değişiklikleri Kaydet')}</Text>
            </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginLeft: 4 },
  themeSection: { marginBottom: 28 },
  themeCardsRow: { flexDirection: 'row', gap: 12 },
  themeCardWrapper: { flex: 1 },
  themeCard: { alignItems: 'center', padding: 16, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 2, borderColor: 'transparent' },
  themeCardSelected: { backgroundColor: THEME.colors.primary[50], borderColor: THEME.colors.primary[400] },
  themeIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.8)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  themeIconBgSelected: { backgroundColor: THEME.colors.primary[100] },
  themeCardLabel: { fontSize: 13, fontWeight: '700', color: THEME.colors.text.secondary },
  themeCardLabelSelected: { color: THEME.colors.primary[700] },
  selectedCheck: { position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: THEME.colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  colorsSection: { marginBottom: 28 },
  colorsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  colorOption: { alignItems: 'center' },
  colorCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  colorCircleSelected: { borderWidth: 3, borderColor: 'rgba(255, 255, 255, 0.9)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  colorLabel: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted },
  previewCard: { marginBottom: 28 },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  previewDot: { width: 12, height: 12, borderRadius: 6 },
  previewTitle: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary },
  previewText: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 20, marginBottom: 16 },
  previewButton: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  previewButtonText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  saveButton: { backgroundColor: THEME.colors.primary[600], paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: THEME.colors.primary[600], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8 },
  saveButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
