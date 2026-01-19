import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { AnimatedLineChart } from '../atoms/AnimatedLineChart';
import { THEME } from '../../theme';
import { TrendingUp, Activity } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DailyData {
  date: string;
  caloriesIn: number;
  caloriesOut: number;
}

interface Props {
  data: DailyData[];
  onViewMore?: () => void;
}

const dayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export function WeeklyCalorieChart({ data, onViewMore }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Transform data for chart
  const chartDataIn = data.map((d, i) => ({
    label: dayLabels[i] || `G${i + 1}`,
    value: d.caloriesIn,
    date: d.date,
  }));

  const chartDataOut = data.map((d, i) => ({
    label: dayLabels[i] || `G${i + 1}`,
    value: d.caloriesOut,
    date: d.date,
  }));

  // Calculate averages and trends
  const avgIn = data.length > 0 
    ? Math.round(data.reduce((sum, d) => sum + d.caloriesIn, 0) / data.length)
    : 0;
  const avgOut = data.length > 0
    ? Math.round(data.reduce((sum, d) => sum + d.caloriesOut, 0) / data.length)
    : 0;
  
  const todayIn = data[data.length - 1]?.caloriesIn || 0;
  const yesterdayIn = data[data.length - 2]?.caloriesIn || 0;
  const trend = yesterdayIn > 0 ? Math.round(((todayIn - yesterdayIn) / yesterdayIn) * 100) : 0;

  return (
    <Animated.View style={{ opacity }}>
      <LiquidGlassCard variant="elevated">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.iconWrapper}>
              <TrendingUp size={18} color={THEME.colors.primary[600]} strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.title}>{t('Haftalık Özet')}</Text>
              <Text style={styles.subtitle}>{t('Son 7 günlük kalori takibi')}</Text>
            </View>
          </View>
          {trend !== 0 && (
            <View style={[styles.trendBadge, trend > 0 ? styles.trendUp : styles.trendDown]}>
              <Text style={styles.trendText}>
                {trend > 0 ? '+' : ''}{trend}%
              </Text>
            </View>
          )}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <AnimatedLineChart
            data={chartDataIn}
            height={160}
            width={SCREEN_WIDTH - 96}
            color={THEME.colors.primary[500]}
            showGradient={true}
          />
        </View>

        {/* Legend & Stats */}
        <View style={styles.statsRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: THEME.colors.primary[500] }]} />
            <View>
              <Text style={styles.legendLabel}>{t('Alınan')}</Text>
              <Text style={styles.legendValue}>{avgIn} <Text style={styles.legendUnit}>ort. kcal</Text></Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: THEME.colors.semantic.warning }]} />
            <View>
              <Text style={styles.legendLabel}>{t('Yakılan')}</Text>
              <Text style={styles.legendValue}>{avgOut} <Text style={styles.legendUnit}>ort. kcal</Text></Text>
            </View>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryCardPrimary]}>
            <Activity size={18} color={THEME.colors.primary[600]} />
            <Text style={styles.summaryValue}>
              {data.reduce((sum, d) => sum + d.caloriesIn, 0).toLocaleString()}
            </Text>
            <Text style={styles.summaryLabel}>{t('Toplam Kalori')}</Text>
          </View>
          <View style={[styles.summaryCard, styles.summaryCardSecondary]}>
            <TrendingUp size={18} color="#fff" />
            <Text style={styles.summaryValueLight}>
              {data.reduce((sum, d) => sum + (d.caloriesIn - d.caloriesOut), 0).toLocaleString()}
            </Text>
            <Text style={styles.summaryLabelLight}>{t('Net Kalori')}</Text>
          </View>
        </View>
      </LiquidGlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  trendBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendUp: {
    backgroundColor: THEME.colors.primary[100],
  },
  trendDown: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.primary[700],
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: THEME.colors.primary[100],
    marginBottom: 16,
  },
  legendItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
  },
  legendValue: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginTop: 2,
  },
  legendUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: THEME.colors.primary[100],
    marginHorizontal: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  summaryCardPrimary: {
    backgroundColor: THEME.colors.primary[50],
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  summaryCardSecondary: {
    backgroundColor: THEME.colors.text.primary,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  summaryValueLight: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
  },
  summaryLabelLight: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
  },
});
