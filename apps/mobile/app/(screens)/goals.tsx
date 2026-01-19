import React, { useEffect, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Target, Flame, Droplets, Utensils, Activity, Moon, Scale, Check, Info } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

interface GoalInputProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: string;
  unit: string;
  color: string;
  onChange: (value: string) => void;
}

function GoalInput({ icon: Icon, label, value, unit, color, onChange }: GoalInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={[styles.inputIcon, { backgroundColor: `${color}15` }]}>
          <Icon size={18} color={color} />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={THEME.colors.text.muted}
        />
        <Text style={styles.inputUnit}>{unit}</Text>
      </View>
    </View>
  );
}

export default function GoalsScreen() {
  const router = useRouter();
  const { goals, updateGoals, saveGoalsToApi, fetchGoals, goalsLoading } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchGoals();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, [fetchGoals]);

  const toNumber = (value: string) => {
    const normalized = value.trim().replace(",", ".");
    if (!normalized) return 0;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const handleUpdate = (key: string, value: string) => {
    updateGoals({ [key]: toNumber(value) });
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Hedeflerim")}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Target size={20} color={THEME.colors.primary[600]} />
              </View>
              <Text style={styles.infoText}>{t("İlerleyişini bu hedeflere göre takip edeceğiz.")}</Text>
            </LiquidGlassCard>

            <LiquidGlassCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{t("Ana Hedefler")}</Text>
              <GoalInput
                icon={Flame} label={t("Günlük Kalori Hedefi")} value={goals.calorieGoal?.toString() || ''} 
                unit="kcal" color={THEME.colors.semantic.warning} onChange={(v) => handleUpdate('calorieGoal', v)}
              />
              <GoalInput
                icon={Droplets} label={t("Günlük Su Hedefi")} value={goals.waterGoalMl?.toString() || ''} 
                unit="ml" color="#3b82f6" onChange={(v) => handleUpdate('waterGoalMl', v)}
              />
            </LiquidGlassCard>

            <LiquidGlassCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{t("Makro Besin Hedefleri")}</Text>
              <View style={styles.macrosRow}>
                <View style={styles.macroCard}>
                  <Text style={styles.macroLabel}>{t("Protein")}</Text>
                  <TextInput 
                    style={styles.macroInput} keyboardType="numeric" value={goals.proteinGoalG?.toString() || ''}
                    onChangeText={(v) => handleUpdate('proteinGoalG', v)} placeholder="0" placeholderTextColor={THEME.colors.text.muted}
                  />
                  <Text style={styles.macroUnit}>gram</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text style={styles.macroLabel}>{t("Karb")}</Text>
                  <TextInput 
                    style={[styles.macroInput, { color: THEME.colors.primary[600] }]} keyboardType="numeric" value={goals.carbsGoalG?.toString() || ''}
                    onChangeText={(v) => handleUpdate('carbsGoalG', v)} placeholder="0" placeholderTextColor={THEME.colors.text.muted}
                  />
                  <Text style={styles.macroUnit}>gram</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text style={styles.macroLabel}>{t("Yağ")}</Text>
                  <TextInput 
                    style={[styles.macroInput, { color: '#f43f5e' }]} keyboardType="numeric" value={goals.fatGoalG?.toString() || ''}
                    onChangeText={(v) => handleUpdate('fatGoalG', v)} placeholder="0" placeholderTextColor={THEME.colors.text.muted}
                  />
                  <Text style={styles.macroUnit}>gram</Text>
                </View>
              </View>
            </LiquidGlassCard>

            <LiquidGlassCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{t("Diğer Hedefler")}</Text>
              <GoalInput icon={Activity} label={t("Aktivite Hedefi")} value={goals.activityGoalMin?.toString() || ''} unit="dk" color="#f97316" onChange={(v) => handleUpdate('activityGoalMin', v)} />
              <GoalInput icon={Utensils} label={t("Günlük Öğün Hedefi")} value={goals.mealGoalCount?.toString() || ''} unit={t("adet")} color={THEME.colors.primary[600]} onChange={(v) => handleUpdate('mealGoalCount', v)} />
              <GoalInput icon={Moon} label={t("Uyku Hedefi")} value={goals.sleepGoalHours?.toString() || ''} unit={t("saat")} color="#8b5cf6" onChange={(v) => handleUpdate('sleepGoalHours', v)} />
              <GoalInput icon={Scale} label={t("Hedef Kilo")} value={goals.weightGoalKg?.toString() || ''} unit="kg" color="#3b82f6" onChange={(v) => handleUpdate('weightGoalKg', v)} />
            </LiquidGlassCard>

            <TouchableOpacity
              style={[styles.saveButton, goalsLoading && styles.saveButtonLoading]}
              onPress={async () => { await saveGoalsToApi(); router.back(); }}
              disabled={goalsLoading}
            >
              {goalsLoading ? <Text style={styles.saveButtonText}>{t('Kaydediliyor...')}</Text> : (
                <><Check size={22} color="#fff" /><Text style={styles.saveButtonText}>{t('Hedefleri Kaydet')}</Text></>
              )}
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.primary[100], alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1, fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 18 },
  sectionCard: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 16 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 14, borderWidth: 1, borderColor: THEME.colors.glass.border, paddingHorizontal: 12 },
  inputIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  input: { flex: 1, height: 52, fontSize: 16, fontWeight: '700', color: THEME.colors.text.primary },
  inputUnit: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.muted },
  macrosRow: { flexDirection: 'row', gap: 10 },
  macroCard: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 16, borderWidth: 1, borderColor: THEME.colors.glass.border, padding: 14, alignItems: 'center' },
  macroLabel: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted, marginBottom: 6 },
  macroInput: { fontSize: 22, fontWeight: '900', color: THEME.colors.primary[700], textAlign: 'center', width: '100%' },
  macroUnit: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 4 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.primary[600], borderRadius: 16, paddingVertical: 18, gap: 10, marginTop: 8, ...THEME.shadow.lg },
  saveButtonLoading: { opacity: 0.7 },
  saveButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
