import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t, ReportData } from '@calai/shared';
import {
  BarChart3,
  Flame,
  Droplets,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { AnimatedLineChart } from '../../src/components/atoms/AnimatedLineChart';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RANGE_OPTIONS = [7, 30, 60, 90];

// Range button component
function RangeButton({
  value,
  isSelected,
  onPress,
}: {
  value: number;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.rangeButton,
          isSelected && styles.rangeButtonActive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={[styles.rangeButtonText, isSelected && styles.rangeButtonTextActive]}>
          {value} {t('gün')}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// Stat card component
function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  unit,
  trend,
  backgroundColor,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  label: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral';
  backgroundColor: string;
}) {
  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <LiquidGlassCard style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor }]}>
        <Icon size={20} color={iconColor} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{Math.round(value)}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
      {trend && (
        <View
          style={[
            styles.trendBadge,
            {
              backgroundColor:
                trend === 'up'
                  ? 'rgba(34, 197, 94, 0.1)'
                  : trend === 'down'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(156, 163, 175, 0.1)',
            },
          ]}
        >
          <TrendIcon
            size={12}
            color={
              trend === 'up'
                ? THEME.colors.semantic.success
                : trend === 'down'
                ? THEME.colors.semantic.error
                : THEME.colors.text.muted
            }
          />
        </View>
      )}
    </LiquidGlassCard>
  );
}

export default function ReportScreen() {
  const { fetchReportData } = useStore();
  const [rangeDays, setRangeDays] = useState(30);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchReportData(rangeDays);
      if (active) {
        setReport(data);
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [rangeDays, fetchReportData]);

  useEffect(() => {
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
  }, []);

  const chartData = useMemo(() => {
    if (!report?.daily?.length) {
      return [] as { day: string; value: number }[];
    }
    return report.daily.slice(-7).map((day) => ({
      day: day.date.slice(5),
      value: Math.round(day.caloriesIn),
    }));
  }, [report]);

  const averageCalories = report?.averages?.caloriesIn ?? 0;
  const waterTarget = report?.goals?.waterGoalMl ?? 2500;
  const waterAverage = report?.averages?.waterMl ?? 0;
  const waterPct = waterTarget > 0 ? Math.round((waterAverage / waterTarget) * 100) : 0;

  // Calculate trends (simplified)
  const calorieTrend = averageCalories > 1800 ? 'up' : averageCalories < 1500 ? 'down' : 'neutral';
  const waterTrend = waterPct >= 80 ? 'up' : waterPct < 50 ? 'down' : 'neutral';

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
              <BarChart3 size={22} color={THEME.colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t('Raporlar')}</Text>
              <Text style={styles.headerSubtitle}>
                {t('Son')} {rangeDays} {t('gün')}
              </Text>
            </View>
          </View>
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Range Selector */}
          <Animated.View
            style={[
              styles.rangeSelector,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {RANGE_OPTIONS.map((option) => (
              <RangeButton
                key={option}
                value={option}
                isSelected={option === rangeDays}
                onPress={() => setRangeDays(option)}
              />
            ))}
          </Animated.View>

          {/* Loading State */}
          {loading && (
            <LiquidGlassCard style={styles.loadingCard}>
              <Text style={styles.loadingText}>{t('Yükleniyor...')}</Text>
            </LiquidGlassCard>
          )}

          {/* No Data State */}
          {!loading && !report && (
            <LiquidGlassCard style={styles.emptyCard}>
              <BarChart3 size={40} color={THEME.colors.text.muted} />
              <Text style={styles.emptyTitle}>{t('Veri Bulunamadı')}</Text>
              <Text style={styles.emptyText}>
                {t('Bu dönem için henüz veri bulunmuyor.')}
              </Text>
            </LiquidGlassCard>
          )}

          {/* Report Content */}
          {!loading && report && (
            <>
              {/* Weekly Chart */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <LiquidGlassCard variant="elevated" style={styles.chartCard}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{t('Haftalık Kalori')}</Text>
                    <View style={styles.chartBadge}>
                      <Text style={styles.chartBadgeText}>
                        {t('Ort.')} {Math.round(averageCalories)}
                      </Text>
                    </View>
                  </View>
                  <AnimatedLineChart
                    data={chartData.map((d) => d.value)}
                    labels={chartData.map((d) => d.day)}
                    height={180}
                    color={THEME.colors.primary[500]}
                  />
                </LiquidGlassCard>
              </Animated.View>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <StatCard
                  icon={Flame}
                  iconColor={THEME.colors.semantic.warning}
                  label={t('Ort. Kalori')}
                  value={averageCalories}
                  unit="kcal"
                  trend={calorieTrend}
                  backgroundColor="rgba(245, 158, 11, 0.1)"
                />
                <StatCard
                  icon={Droplets}
                  iconColor="#3b82f6"
                  label={t('Su Hedefi')}
                  value={waterPct}
                  unit="%"
                  trend={waterTrend}
                  backgroundColor="rgba(59, 130, 246, 0.1)"
                />
              </View>

              {/* Totals Card */}
              <LiquidGlassCard style={styles.totalsCard}>
                <Text style={styles.totalsTitle}>{t('Toplam')}</Text>
                <View style={styles.totalsGrid}>
                  <View style={styles.totalItem}>
                    <Flame size={24} color={THEME.colors.semantic.warning} />
                    <Text style={styles.totalValue}>
                      {Math.round(report.totals.caloriesIn).toLocaleString()}
                    </Text>
                    <Text style={styles.totalLabel}>{t('Kalori')}</Text>
                  </View>
                  <View style={styles.totalDivider} />
                  <View style={styles.totalItem}>
                    <Droplets size={24} color="#3b82f6" />
                    <Text style={styles.totalValue}>
                      {(report.totals.waterMl / 1000).toFixed(1)}L
                    </Text>
                    <Text style={styles.totalLabel}>{t('Su')}</Text>
                  </View>
                  <View style={styles.totalDivider} />
                  <View style={styles.totalItem}>
                    <Activity size={24} color={THEME.colors.semantic.error} />
                    <Text style={styles.totalValue}>
                      {Math.round(report.totals.activityMin)}
                    </Text>
                    <Text style={styles.totalLabel}>{t('Dakika')}</Text>
                  </View>
                </View>
              </LiquidGlassCard>
            </>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  rangeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    alignItems: 'center',
  },
  rangeButtonActive: {
    backgroundColor: THEME.colors.primary[600],
    borderColor: THEME.colors.primary[600],
  },
  rangeButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.text.primary,
  },
  rangeButtonTextActive: {
    color: '#fff',
  },
  loadingCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
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
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  chartBadge: {
    backgroundColor: THEME.colors.primary[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chartBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary[700],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    position: 'relative',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  statUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  trendBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalsCard: {
    marginBottom: 16,
  },
  totalsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 20,
  },
  totalsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  totalDivider: {
    width: 1,
    height: 50,
    backgroundColor: THEME.colors.glass.border,
  },
});
