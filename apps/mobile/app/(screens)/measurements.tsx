import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { MeasurementType, t } from '@calai/shared';
import { ChevronLeft, Scale, Ruler, TrendingUp, Trash2, Check, Activity } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

export default function MeasurementsScreen() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [activeType, setActiveType] = useState<MeasurementType>('weight');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const { measurements, measurementsLoading, fetchMeasurements, addMeasurement, deleteMeasurement, profile } = useStore();

  useEffect(() => {
    fetchMeasurements();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, [fetchMeasurements]);

  const normalizedValue = value.trim().replace(",", ".");
  const parsedValue = Number(normalizedValue);
  const canSubmit = Number.isFinite(parsedValue) && parsedValue > 0;

  const latestWeight = useMemo(() => measurements.find((entry) => entry.type === 'weight')?.value ?? null, [measurements]);
  const bmi = useMemo(() => {
    const heightCm = Number(profile.heightCm);
    if (!Number.isFinite(heightCm) || heightCm <= 0) return null;
    const weightKg = Number.isFinite(latestWeight ?? NaN) ? Number(latestWeight) : Number(profile.weightKg);
    if (!Number.isFinite(weightKg) || weightKg <= 0) return null;
    const value = weightKg / Math.pow(heightCm / 100, 2);
    return Number.isFinite(value) ? value : null;
  }, [latestWeight, profile.heightCm, profile.weightKg]);

  const trend30 = useMemo(() => {
    const weightEntries = measurements.filter((entry) => entry.type === 'weight');
    if (weightEntries.length < 2) return null;
    const latest = weightEntries[0];
    const oldest = weightEntries[Math.min(weightEntries.length - 1, 9)];
    if (!latest || !oldest) return null;
    return Math.round((latest.value - oldest.value) * 10) / 10;
  }, [measurements]);

  const typeOptions: { type: MeasurementType; label: string; unit: string; color: string }[] = [
    { type: 'weight', label: t("Kilo"), unit: 'kg', color: THEME.colors.primary[600] },
    { type: 'waist', label: t("Bel"), unit: 'cm', color: '#f97316' },
    { type: 'hip', label: t("Kalça"), unit: 'cm', color: '#8b5cf6' },
    { type: 'chest', label: t("Göğüs"), unit: 'cm', color: '#3b82f6' },
    { type: 'bodyFat', label: t("Yağ Oranı"), unit: '%', color: '#f43f5e' },
  ];

  const activeOption = typeOptions.find((item) => item.type === activeType);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Vücut Ölçümleri")}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}><Activity size={20} color={THEME.colors.primary[600]} /></View>
              <Text style={styles.infoText}>{t("Düzenli ölçüm girmek, hedefinize ne kadar yaklaştığınızı görmenizi sağlar.")}</Text>
            </LiquidGlassCard>

            <Text style={styles.sectionLabel}>{t("Ölçüm Türü")}</Text>
            <View style={styles.typeRow}>
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.type}
                  onPress={() => setActiveType(option.type)}
                  style={[styles.typeButton, activeType === option.type && { backgroundColor: option.color, borderColor: option.color }]}
                >
                  <Text style={[styles.typeButtonText, activeType === option.type && styles.typeButtonTextActive]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <LiquidGlassCard style={styles.inputCard}>
              <Text style={styles.inputLabel}>{t("Güncel Ölçüm")} ({activeOption?.unit})</Text>
              <View style={styles.inputRow}>
                <View style={[styles.inputIcon, { backgroundColor: `${activeOption?.color}15` }]}>
                  <Scale size={22} color={activeOption?.color} />
                </View>
                <TextInput style={styles.input} keyboardType="numeric" placeholder="0.0" placeholderTextColor={THEME.colors.text.muted} value={value} onChangeText={setValue} />
              </View>
            </LiquidGlassCard>

            <View style={styles.statsRow}>
              <LiquidGlassCard style={styles.statCard}>
                <TrendingUp size={22} color={THEME.colors.semantic.success} />
                <Text style={[styles.statValue, { color: THEME.colors.semantic.success }]}>{typeof trend30 === 'number' ? `${trend30 > 0 ? '+' : ''}${trend30} kg` : '--'}</Text>
                <Text style={styles.statLabel}>{t("Son 30 Gün")}</Text>
              </LiquidGlassCard>
              <LiquidGlassCard style={styles.statCard}>
                <Ruler size={22} color={THEME.colors.semantic.warning} />
                <Text style={[styles.statValue, { color: THEME.colors.semantic.warning }]}>{bmi ? bmi.toFixed(1) : '--'}</Text>
                <Text style={styles.statLabel}>{t("BMI")}</Text>
              </LiquidGlassCard>
            </View>

            <TouchableOpacity
              style={[styles.saveButton, (!canSubmit || measurementsLoading) && styles.saveButtonDisabled]}
              onPress={async () => {
                if (!canSubmit) return;
                await addMeasurement({ type: activeType, value: parsedValue, unit: activeOption?.unit, timestamp: new Date().toISOString() });
                setValue('');
              }}
              disabled={!canSubmit || measurementsLoading}
            >
              <Check size={22} color="#fff" />
              <Text style={styles.saveButtonText}>{measurementsLoading ? t('Kaydediliyor...') : t('Ölçümü Kaydet')}</Text>
            </TouchableOpacity>

            <Text style={styles.historyTitle}>{t("Son Ölçümler")}</Text>
            {measurements.length === 0 && <Text style={styles.emptyText}>{t("Henüz ölçüm bulunamadı.")}</Text>}
            {measurements.slice(0, 6).map((entry) => (
              <LiquidGlassCard key={entry.id} style={styles.historyCard}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyType}>{typeOptions.find((item) => item.type === entry.type)?.label || entry.type}</Text>
                  <Text style={styles.historyDate}>{new Date(entry.timestamp).toLocaleDateString()}</Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyValue}>{entry.value} {entry.unit}</Text>
                  <TouchableOpacity onPress={() => deleteMeasurement(entry.id)} style={styles.deleteButton}>
                    <Trash2 size={16} color="#f43f5e" />
                  </TouchableOpacity>
                </View>
              </LiquidGlassCard>
            ))}
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
  sectionLabel: { fontSize: 12, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  typeButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderWidth: 1, borderColor: THEME.colors.glass.border },
  typeButtonText: { fontSize: 13, fontWeight: '700', color: THEME.colors.text.primary },
  typeButtonTextActive: { color: '#fff' },
  inputCard: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 14, borderWidth: 1, borderColor: THEME.colors.glass.border, paddingHorizontal: 12 },
  inputIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  input: { flex: 1, height: 56, fontSize: 24, fontWeight: '900', color: THEME.colors.text.primary },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statValue: { fontSize: 20, fontWeight: '900', marginTop: 8 },
  statLabel: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 4 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.primary[600], borderRadius: 16, paddingVertical: 18, gap: 10, marginBottom: 24, ...THEME.shadow.lg },
  saveButtonDisabled: { opacity: 0.5 },
  saveButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  historyTitle: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 12 },
  emptyText: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.muted },
  historyCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  historyInfo: { flex: 1 },
  historyType: { fontSize: 14, fontWeight: '700', color: THEME.colors.text.primary },
  historyDate: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 2 },
  historyRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyValue: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary },
  deleteButton: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#fef2f2', alignItems: 'center', justifyContent: 'center' },
});
