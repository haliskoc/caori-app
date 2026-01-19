import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { AnimatedDonutChart } from '../atoms/AnimatedDonutChart';
import { THEME } from '../../theme';
import { Flame, Activity } from 'lucide-react-native';

interface Props {
  caloriesIn: number;
  caloriesOut: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  calorieGoal?: number;
  proteinGoalG?: number;
  carbsGoalG?: number;
  fatGoalG?: number;
}

export function CalorieSummaryWidget({
  caloriesIn,
  caloriesOut,
  proteinG,
  carbsG,
  fatG,
  calorieGoal = 2000,
  proteinGoalG = 150,
  carbsGoalG = 250,
  fatGoalG = 65,
}: Props) {
  const netCalories = caloriesIn - caloriesOut;
  const remainingCalories = Math.max(0, calorieGoal - caloriesIn);
  const progress = Math.min(1, caloriesIn / calorieGoal);

  const countAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(countAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [caloriesIn, caloriesOut]);

  const macroSegments = [
    { value: proteinG, color: THEME.colors.macro.protein, label: t('Protein') },
    { value: carbsG, color: THEME.colors.macro.carbs, label: t('Karb') },
    { value: fatG, color: THEME.colors.macro.fat, label: t('Yağ') },
  ];

  return (
    <LiquidGlassCard variant="elevated">
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconWrapper}>
            <Flame size={18} color={THEME.colors.primary[600]} strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>{t('Günlük Enerji')}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      {/* Main Content - Donut + Stats */}
      <View style={styles.mainContent}>
        {/* Donut Chart */}
        <View style={styles.chartContainer}>
          <AnimatedDonutChart
            segments={macroSegments}
            size={140}
            strokeWidth={16}
          >
            <Text style={styles.chartValue}>{caloriesIn}</Text>
            <Text style={styles.chartLabel}>kcal</Text>
          </AnimatedDonutChart>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {/* Calories In */}
          <View style={[styles.statCard, styles.statCardIn]}>
            <View style={styles.statIcon}>
              <Flame size={16} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.statLabel}>{t('Alınan')}</Text>
            <Text style={styles.statValue}>{caloriesIn}</Text>
            <Text style={styles.statUnit}>kcal</Text>
          </View>

          {/* Calories Out */}
          <View style={[styles.statCard, styles.statCardOut]}>
            <View style={styles.statIconDark}>
              <Activity size={16} color="#fff" />
            </View>
            <Text style={styles.statLabelLight}>{t('Yakılan')}</Text>
            <Text style={styles.statValueLight}>{caloriesOut}</Text>
            <Text style={styles.statUnitLight}>kcal</Text>
          </View>

          {/* Net Calories */}
          <View style={[styles.statCard, styles.statCardNet]}>
            <Text style={styles.statLabel}>{t('Net')}</Text>
            <Text style={[styles.statValue, netCalories < 0 && styles.negative]}>
              {netCalories > 0 ? '+' : ''}{netCalories}
            </Text>
            <Text style={styles.statUnit}>kcal</Text>
          </View>

          {/* Remaining */}
          <View style={[styles.statCard, styles.statCardRemaining]}>
            <Text style={styles.statLabel}>{t('Kalan')}</Text>
            <Text style={styles.statValue}>{remainingCalories}</Text>
            <Text style={styles.statUnit}>kcal</Text>
          </View>
        </View>
      </View>

      {/* Macro Distribution */}
      <View style={styles.macroSection}>
        <Text style={styles.sectionTitle}>{t('Makro Dağılımı')}</Text>
        <View style={styles.macroBar}>
          {macroSegments.map((seg, i) => (
            <View
              key={i}
              style={[
                styles.macroSegment,
                { backgroundColor: seg.color, flex: Math.max(seg.value, 1) },
              ]}
            />
          ))}
        </View>
        <View style={styles.macroLegend}>
          {[
            { label: t('Protein'), value: proteinG, goal: proteinGoalG, color: THEME.colors.macro.protein },
            { label: t('Karb'), value: carbsG, goal: carbsGoalG, color: THEME.colors.macro.carbs },
            { label: t('Yağ'), value: fatG, goal: fatGoalG, color: THEME.colors.macro.fat },
          ].map((macro, i) => (
            <View key={i} style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: macro.color }]} />
              <View>
                <Text style={styles.macroLabel}>{macro.label}</Text>
                <Text style={styles.macroValue}>
                  {Math.round(macro.value)}g
                  <Text style={styles.macroGoal}> / {macro.goal}g</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </LiquidGlassCard>
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
    gap: 10,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    letterSpacing: 0.5,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary[100],
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primary[700],
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartValue: {
    fontSize: 28,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    marginTop: -4,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: -2,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statCard: {
    width: '47%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  statCardIn: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  statCardOut: {
    backgroundColor: THEME.colors.text.primary,
  },
  statCardNet: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  statCardRemaining: {
    backgroundColor: THEME.colors.primary[50],
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  statIcon: {
    marginBottom: 4,
  },
  statIconDark: {
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statLabelLight: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    marginTop: 2,
  },
  statValueLight: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginTop: 2,
  },
  negative: {
    color: THEME.colors.semantic.error,
  },
  statUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  statUnitLight: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  macroSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.primary[100],
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  macroBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  macroSegment: {
    height: '100%',
  },
  macroLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macroDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  macroGoal: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
});
