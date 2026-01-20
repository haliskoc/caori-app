import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { t, getDayKey, getLastNDays } from '@calai/shared';
import { useStore } from '../../src/store';
import { WeeklyCharts, DailySummary } from '../../src/components/organisms/WeeklyCharts';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { Text } from '../../src/components/atoms/Text';
import { THEME } from '../../src/theme';
import { BarChart3 } from 'lucide-react-native';

export default function WeeklyScreen() {
  const router = useRouter();
  const { entries, goals } = useStore();
  const [summaries, setSummaries] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Get last 7 days
    const last7Days = getLastNDays(7);

    // Build daily summaries
    const dailySummaries = last7Days.map(dayKey => {
      // Filter entries for this day
      const dayEntries = entries.filter(entry => {
        const entryDayKey = getDayKey(entry.timestamp);
        return entryDayKey === dayKey;
      });

      // Calculate totals
      let caloriesIn = 0;
      let caloriesOut = 0;
      let waterMl = 0;
      let activityMin = 0;
      let mealCount = 0;
      let proteinG = 0;
      let carbsG = 0;
      let fatG = 0;

      dayEntries.forEach(entry => {
        switch (entry.type) {
          case 'food':
            caloriesIn += entry.calories || 0;
            proteinG += entry.proteinG || 0;
            carbsG += entry.carbsG || 0;
            fatG += entry.fatG || 0;
            mealCount += 1;
            break;
          case 'water':
            waterMl += entry.amountMl || 0;
            break;
          case 'activity':
            caloriesOut += entry.estimatedCalories || 0;
            activityMin += entry.durationMin || 0;
            break;
        }
      });

      return {
        date: dayKey,
        caloriesIn,
        caloriesOut,
        waterMl,
        activityMin,
        mealCount,
        proteinG,
        carbsG,
        fatG,
      } as DailySummary;
    });

    setSummaries(dailySummaries);
    setLoading(false);
  }, [entries]);

  const hasEntries = entries.length > 0;

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <BarChart3 size={20} color={THEME.colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t('Haftalık Grafikler')}</Text>
              <Text style={styles.headerSubtitle}>{t('Son 7 günlük özet')}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
            <Text style={styles.loadingText}>{t('Yükleniyor...')}</Text>
          </View>
        ) : (
          <WeeklyCharts summaries={summaries} hasEntries={hasEntries} />
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.primary[100],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
});
