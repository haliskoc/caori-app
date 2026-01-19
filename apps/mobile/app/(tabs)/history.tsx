import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t, getDayKey } from '@calai/shared';
import { Calendar, Clock } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { HorizontalCalendar } from '../../src/components/organisms/HorizontalCalendar';
import { EntryList } from '../../src/components/organisms/EntryList';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState(getDayKey(new Date()));
  const { entries, fetchEntries, deleteEntry, dailySummary, isLoading } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchEntries(selectedDate);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selectedDate]);

  const onRefresh = () => {
    fetchEntries(selectedDate);
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === getDayKey(today)) {
      return t('Bugün');
    } else if (dateStr === getDayKey(yesterday)) {
      return t('Dün');
    }
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    });
  };

  const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);
  const totalProtein = entries.reduce((sum, e) => sum + (e.proteinG || 0), 0);
  const totalCarbs = entries.reduce((sum, e) => sum + (e.carbsG || 0), 0);
  const totalFat = entries.reduce((sum, e) => sum + (e.fatG || 0), 0);

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Calendar size={22} color={THEME.colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t('Geçmiş')}</Text>
              <Text style={styles.headerSubtitle}>{formatDate(selectedDate)}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Calendar */}
        <HorizontalCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Day Summary Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
          }}
        >
          <LiquidGlassCard style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{totalCalories}</Text>
                <Text style={styles.summaryLabel}>kcal</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: THEME.colors.macro.protein }]}>
                  {totalProtein.toFixed(0)}g
                </Text>
                <Text style={styles.summaryLabel}>{t('Protein')}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: THEME.colors.macro.carbs }]}>
                  {totalCarbs.toFixed(0)}g
                </Text>
                <Text style={styles.summaryLabel}>{t('Karb')}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: THEME.colors.macro.fat }]}>
                  {totalFat.toFixed(0)}g
                </Text>
                <Text style={styles.summaryLabel}>{t('Yağ')}</Text>
              </View>
            </View>
          </LiquidGlassCard>
        </Animated.View>

        {/* Entries List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              tintColor={THEME.colors.primary[500]}
              colors={[THEME.colors.primary[500]]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {entries.length === 0 ? (
            <LiquidGlassCard style={styles.emptyCard}>
              <Clock size={40} color={THEME.colors.text.muted} />
              <Text style={styles.emptyTitle}>{t('Kayıt Bulunamadı')}</Text>
              <Text style={styles.emptyText}>
                {t('Bu tarihte henüz bir kayıt eklenmemiş.')}
              </Text>
            </LiquidGlassCard>
          ) : (
            <EntryList entries={entries} onDelete={deleteEntry} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  summaryCard: {
    marginTop: 12,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: THEME.colors.glass.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textAlign: 'center',
  },
});
