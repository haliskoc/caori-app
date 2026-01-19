import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { ChevronLeft, Check, Scale, Ruler } from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useStore } from "../../src/store";

interface UnitOption { value: "metric" | "imperial"; label: string; examples: string[]; icon: React.ReactNode; }

const UNIT_OPTIONS: UnitOption[] = [
  { value: "metric", label: "Metrik", examples: ["Kilogram (kg)", "Santimetre (cm)", "Litre (L)"], icon: <Scale size={22} color={THEME.colors.primary[600]} /> },
  { value: "imperial", label: "İmperyal", examples: ["Pound (lb)", "İnç (in)", "Ons (oz)"], icon: <Ruler size={22} color={THEME.colors.primary[600]} /> },
];

function UnitCard({ option, isSelected, onSelect }: { option: UnitOption; isSelected: boolean; onSelect: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
      <Animated.View style={[styles.unitCard, isSelected && styles.unitCardSelected, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.unitHeader}>
          <View style={[styles.unitIconBg, isSelected && styles.unitIconBgSelected]}>{option.icon}</View>
          <View style={styles.unitHeaderText}>
            <Text style={[styles.unitLabel, isSelected && styles.unitLabelSelected]}>{t(option.label)}</Text>
            <Text style={styles.unitSubtext}>{t('Ölçü birimi sistemi')}</Text>
          </View>
          {isSelected && <View style={styles.checkIcon}><Check size={16} color="#fff" /></View>}
        </View>
        <View style={styles.examplesContainer}>
          {option.examples.map((example, idx) => (
            <View key={idx} style={[styles.exampleTag, isSelected && styles.exampleTagSelected]}>
              <Text style={[styles.exampleText, isSelected && styles.exampleTextSelected]}>{example}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function UnitsScreen() {
  const router = useRouter();
  const { settings, updateSettings, saveSettings } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [selectedUnit, setSelectedUnit] = useState<"metric" | "imperial">(settings.units || "metric");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSelect = async (value: "metric" | "imperial") => {
    setSelectedUnit(value);
    updateSettings({ units: value });
    await saveSettings();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><ChevronLeft size={24} color={THEME.colors.text.primary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Birimler')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <Text style={styles.infoText}>{t('Ölçü birimlerini tercihlerinize göre ayarlayın. Bu değişiklik tüm uygulamada geçerli olacaktır.')}</Text>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View style={styles.unitsContainer}>
              {UNIT_OPTIONS.map((option) => (
                <UnitCard key={option.value} option={option} isSelected={selectedUnit === option.value} onSelect={() => handleSelect(option.value)} />
              ))}
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.noteCard}>
              <Text style={styles.noteTitle}>{t('Dönüşüm Örnekleri')}</Text>
              <View style={styles.conversionRow}>
                <Text style={styles.conversionLabel}>1 kg</Text>
                <Text style={styles.conversionEquals}>=</Text>
                <Text style={styles.conversionValue}>2.2 lb</Text>
              </View>
              <View style={styles.conversionRow}>
                <Text style={styles.conversionLabel}>1 cm</Text>
                <Text style={styles.conversionEquals}>=</Text>
                <Text style={styles.conversionValue}>0.39 in</Text>
              </View>
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
  infoCard: { marginBottom: 24 },
  infoText: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 20, textAlign: 'center' },
  unitsContainer: { gap: 16, marginBottom: 24 },
  unitCard: { backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 20, padding: 20, borderWidth: 2, borderColor: 'transparent' },
  unitCardSelected: { backgroundColor: THEME.colors.primary[50], borderColor: THEME.colors.primary[400] },
  unitHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  unitIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.9)', alignItems: 'center', justifyContent: 'center' },
  unitIconBgSelected: { backgroundColor: THEME.colors.primary[100] },
  unitHeaderText: { flex: 1 },
  unitLabel: { fontSize: 17, fontWeight: '800', color: THEME.colors.text.primary },
  unitLabelSelected: { color: THEME.colors.primary[700] },
  unitSubtext: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 2 },
  checkIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: THEME.colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  examplesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  exampleTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  exampleTagSelected: { backgroundColor: THEME.colors.primary[100] },
  exampleText: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.secondary },
  exampleTextSelected: { color: THEME.colors.primary[700] },
  noteCard: { marginTop: 8 },
  noteTitle: { fontSize: 14, fontWeight: '700', color: THEME.colors.text.primary, marginBottom: 12 },
  conversionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  conversionLabel: { fontSize: 14, fontWeight: '700', color: THEME.colors.primary[600], width: 50 },
  conversionEquals: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.muted },
  conversionValue: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.secondary },
});
