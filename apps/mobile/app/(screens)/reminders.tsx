import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput, Switch, Alert, StyleSheet, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Bell, ChevronLeft, Clock, Utensils, Droplets, Activity, Moon, Check } from 'lucide-react-native';
import { t } from '@calai/shared';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';
import { ensureNotificationPermissions, scheduleDailyReminder, cancelDailyReminders } from '../../src/lib/notifications';

interface ReminderItem { id: string; icon: React.ComponentType<{ size: number; color: string }>; label: string; description: string; color: string; enabled: boolean; time: string; }

function ReminderCard({ item, onToggle, onTimeChange }: { item: ReminderItem; onToggle: () => void; onTimeChange: (time: string) => void }) {
  const Icon = item.icon;
  return (
    <LiquidGlassCard style={styles.reminderCard}>
      <View style={styles.reminderHeader}>
        <View style={[styles.reminderIcon, { backgroundColor: `${item.color}15` }]}><Icon size={22} color={item.color} /></View>
        <View style={styles.reminderInfo}>
          <Text style={styles.reminderLabel}>{item.label}</Text>
          <Text style={styles.reminderDescription}>{item.description}</Text>
        </View>
        <Switch value={item.enabled} onValueChange={onToggle} trackColor={{ false: THEME.colors.glass.border, true: THEME.colors.primary[400] }} thumbColor={item.enabled ? THEME.colors.primary[600] : '#f4f3f4'} />
      </View>
      {item.enabled && (
        <View style={styles.timeRow}>
          <Clock size={16} color={THEME.colors.primary[600]} />
          <TextInput style={styles.timeInput} value={item.time} onChangeText={onTimeChange} placeholder="09:00" placeholderTextColor={THEME.colors.text.muted} keyboardType="numbers-and-punctuation" maxLength={5} />
        </View>
      )}
    </LiquidGlassCard>
  );
}

export default function RemindersScreen() {
  const router = useRouter();
  const { settings, updateSettings, saveSettings } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const [reminders, setReminders] = useState<ReminderItem[]>([
    { id: 'meals', icon: Utensils, label: t('Öğün Hatırlatıcısı'), description: t('Yemek zamanlarını hatırlat'), color: THEME.colors.primary[600], enabled: settings.reminder.enabled, time: settings.reminder.time },
    { id: 'water', icon: Droplets, label: t('Su Hatırlatıcısı'), description: t('Her 2 saatte bir su iç'), color: '#3b82f6', enabled: false, time: '09:00' },
    { id: 'activity', icon: Activity, label: t('Aktivite Hatırlatıcısı'), description: t('Hareket etmeyi unutma'), color: THEME.colors.semantic.warning, enabled: false, time: '18:00' },
    { id: 'sleep', icon: Moon, label: t('Uyku Hatırlatıcısı'), description: t('Uyku saatini hatırlat'), color: '#8b5cf6', enabled: false, time: '22:00' },
  ]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleToggle = (id: string) => setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  const handleTimeChange = (id: string, time: string) => setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, time } : r)));

  const handleSave = async () => {
    const mealReminder = reminders.find((r) => r.id === 'meals');
    const time = mealReminder?.time || '09:00';
    const enabled = mealReminder?.enabled || false;
    
    if (enabled) {
      const valid = /^\d{2}:\d{2}$/.test(time);
      if (!valid) { Alert.alert(t('Geçersiz saat'), t('Lütfen HH:MM formatında girin.')); return; }
      const ok = await ensureNotificationPermissions();
      if (!ok) { Alert.alert(t('İzin gerekli'), t('Hatırlatıcılar için bildirim izni gereklidir.')); return; }
      await scheduleDailyReminder(time);
    } else {
      await cancelDailyReminders();
    }
    updateSettings({ reminder: { enabled, time } });
    await saveSettings();
    router.back();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><ChevronLeft size={24} color={THEME.colors.text.primary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Hatırlatıcılar')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}><Bell size={20} color={THEME.colors.primary[600]} /></View>
              <Text style={styles.infoText}>{t('Hatırlatıcılar sağlıklı alışkanlıklar oluşturmanıza yardımcı olur.')}</Text>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {reminders.map((reminder) => (
              <ReminderCard key={reminder.id} item={reminder} onToggle={() => handleToggle(reminder.id)} onTimeChange={(time) => handleTimeChange(reminder.id, time)} />
            ))}
          </Animated.View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Check size={22} color="#fff" />
            <Text style={styles.saveButtonText}>{t('Kaydet')}</Text>
          </TouchableOpacity>
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
  reminderCard: { marginBottom: 12 },
  reminderHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  reminderIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  reminderInfo: { flex: 1 },
  reminderLabel: { fontSize: 15, fontWeight: '700', color: THEME.colors.text.primary },
  reminderDescription: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: THEME.colors.primary[100], paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginTop: 12, alignSelf: 'flex-start' },
  timeInput: { fontSize: 14, fontWeight: '700', color: THEME.colors.primary[700], minWidth: 50 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.primary[600], borderRadius: 16, paddingVertical: 18, gap: 10, marginTop: 16, ...THEME.shadow.lg },
  saveButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
