import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, G, Circle, Rect, Line, Text as SvgText } from 'react-native-svg';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { THEME } from '../../theme';
import { Flame, Droplet, Activity, Apple, PieChart as PieChartIcon } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;

// Types
export interface DailySummary {
  date: string;
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  activityMin: number;
  mealCount: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

interface WeeklyChartsProps {
  summaries: DailySummary[];
  hasEntries?: boolean;
}

// Turkish day labels
const getDayLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  return days[date.getDay()];
};

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

// Simple Bar Chart Component
function SimpleBarChart({
  data,
  color,
  maxVal,
  unit,
}: {
  data: { label: string; value: number }[];
  color: string;
  maxVal: number;
  unit: string;
}) {
  const barWidth = 20;
  const chartHeight = 120;
  const chartWidth = CHART_WIDTH;
  const padding = { left: 30, right: 10, top: 10, bottom: 30 };
  const availableWidth = chartWidth - padding.left - padding.right;
  const barGap = (availableWidth - data.length * barWidth) / (data.length + 1);

  return (
    <Svg width={chartWidth} height={chartHeight + padding.top + padding.bottom}>
      {data.map((item, index) => {
        const barHeight = maxVal > 0 ? (item.value / maxVal) * chartHeight : 0;
        const x = padding.left + barGap + index * (barWidth + barGap);
        const y = padding.top + (chartHeight - barHeight);

        return (
          <React.Fragment key={index}>
            {/* Bar */}
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={6}
            />
            {/* Label */}
            <SvgText
              x={x + barWidth / 2}
              y={padding.top + chartHeight + 15}
              fontSize={10}
              fill={THEME.colors.text.muted}
              fontWeight="700"
              textAnchor="middle"
            >
              {item.label}
            </SvgText>
            {/* Value */}
            <SvgText
              x={x + barWidth / 2}
              y={y - 5}
              fontSize={10}
              fill={THEME.colors.text.primary}
              fontWeight="700"
              textAnchor="middle"
            >
              {item.value}
            </SvgText>
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

// Simple Line Chart Component
function SimpleLineChart({
  data,
  color,
  color2,
  maxVal,
}: {
  data: { label: string; value: number; value2?: number }[];
  color: string;
  color2: string;
  maxVal: number;
}) {
  const chartHeight = 120;
  const chartWidth = CHART_WIDTH;
  const padding = { left: 30, right: 10, top: 20, bottom: 30 };
  const availableWidth = chartWidth - padding.left - padding.right;
  const stepX = availableWidth / (data.length - 1);

  const points1 = data.map((item, index) => {
    const x = padding.left + index * stepX;
    const y = padding.top + chartHeight - (maxVal > 0 ? (item.value / maxVal) * chartHeight : 0);
    return `${x},${y}`;
  }).join(' ');

  const points2 = data.map((item, index) => {
    const x = padding.left + index * stepX;
    const y = padding.top + chartHeight - (maxVal > 0 && item.value2 ? (item.value2 / maxVal) * chartHeight : 0);
    return `${x},${y}`;
  }).join(' ');

  return (
    <Svg width={chartWidth} height={chartHeight + padding.top + padding.bottom}>
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </LinearGradient>
        <LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={color2} stopOpacity={0.2} />
          <Stop offset="100%" stopColor={color2} stopOpacity={0} />
        </LinearGradient>
      </Defs>

      {/* Area 1 */}
      <Path
        d={`M ${padding.left},${padding.top + chartHeight} L ${points1} L ${padding.left + (data.length - 1) * stepX},${padding.top + chartHeight} Z`}
        fill="url(#gradient1)"
      />

      {/* Area 2 */}
      <Path
        d={`M ${padding.left},${padding.top + chartHeight} L ${points2} L ${padding.left + (data.length - 1) * stepX},${padding.top + chartHeight} Z`}
        fill="url(#gradient2)"
      />

      {/* Line 1 */}
      <Path
        d={`M ${points1}`}
        stroke={color}
        strokeWidth={2}
        fill="none"
      />

      {/* Line 2 */}
      <Path
        d={`M ${points2}`}
        stroke={color2}
        strokeWidth={2}
        fill="none"
        strokeDasharray="4,4"
      />

      {/* Labels */}
      {data.map((item, index) => {
        const x = padding.left + index * stepX;
        return (
          <SvgText
            key={index}
            x={x}
            y={padding.top + chartHeight + 15}
            fontSize={10}
            fill={THEME.colors.text.muted}
            fontWeight="700"
            textAnchor="middle"
          >
            {item.label}
          </SvgText>
        );
      })}
    </Svg>
  );
}

// Simple Pie Chart Component
function SimplePieChart({
  data,
  colors,
}: {
  data: { label: string; value: number }[];
  colors: string[];
}) {
  const size = 120;
  const radius = size / 2;
  const center = size / 2;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = -90; // Start from top

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate path
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = `M ${center},${center} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;

    currentAngle = endAngle;

    return (
      <G key={index}>
        <Path d={path} fill={colors[index % colors.length]} />
      </G>
    );
  });

  // Legend
  const legendY = size + 20;

  return (
    <Svg width={CHART_WIDTH} height={size + 80}>
      <G transform={{ x: Math.round((CHART_WIDTH - size) / 2), y: 10 }}>
        {slices}
      </G>

      {/* Legend */}
      {data.map((item, index) => (
        <G key={index}>
          <Rect
            x={Math.round((CHART_WIDTH - size) / 2 + index * 60)}
            y={legendY}
            width={12}
            height={12}
            rx={3}
            fill={colors[index % colors.length]}
          />
          <SvgText
            x={Math.round((CHART_WIDTH - size) / 2 + index * 60 + 18)}
            y={legendY + 10}
            fontSize={11}
            fill={THEME.colors.text.primary}
            fontWeight="700"
          >
            {item.label}: {item.value}g
          </SvgText>
        </G>
      ))}
    </Svg>
  );
}

// Chart Card Component
function ChartCard({
  title,
  subtitle,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  children: React.ReactNode;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <LiquidGlassCard style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={[styles.chartIcon, { backgroundColor: `${color}15` }]}>
            <Icon size={18} color={color} />
          </View>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>{title}</Text>
            <Text style={styles.chartSubtitle}>{subtitle}</Text>
          </View>
        </View>
        {children}
      </LiquidGlassCard>
    </Animated.View>
  );
}

export function WeeklyCharts({ summaries, hasEntries = true }: WeeklyChartsProps) {
  const isEmpty = !hasEntries || summaries.every(
    day => day.caloriesIn === 0 && day.caloriesOut === 0 && day.waterMl === 0
  );

  // Transform data for charts
  const chartData = summaries.map(day => ({
    label: getDayLabel(day.date),
    value: day.caloriesIn,
    value2: day.caloriesOut,
    water: day.waterMl,
    activity: day.activityMin,
    meals: day.mealCount,
  }));

  const maxCalories = Math.max(...chartData.map(d => Math.max(d.value, d.value2 || 0)), 100);
  const maxWater = Math.max(...chartData.map(d => d.water), 2000);
  const maxActivity = Math.max(...chartData.map(d => d.activity), 30);
  const maxMeals = Math.max(...chartData.map(d => d.meals), 5);

  // Macro data for pie chart
  const macroTotals = summaries.reduce(
    (acc, day) => ({
      protein: acc.protein + day.proteinG,
      carbs: acc.carbs + day.carbsG,
      fat: acc.fat + day.fatG,
    }),
    { protein: 0, carbs: 0, fat: 0 }
  );

  const macroData = [
    { label: t('Protein'), value: Math.round(macroTotals.protein) },
    { label: t('Karbonhidrat'), value: Math.round(macroTotals.carbs) },
    { label: t('Yağ'), value: Math.round(macroTotals.fat) },
  ].filter(item => item.value > 0);

  const totalMacro = macroTotals.protein + macroTotals.carbs + macroTotals.fat;

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ChartCard
          title={t('Haftalık Grafikler')}
          subtitle={t('Veri bekleniyor')}
          icon={Activity}
          color={THEME.colors.primary[500]}
        >
          <EmptyState message={t('Henüz veri yok. İlk kayıtlar grafiği dolduracak.')} />
        </ChartCard>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Calorie Balance Chart */}
      <ChartCard
        title={t('Haftalık Kalori Dengesi')}
        subtitle={t('Girilen ve yakılan kalori')}
        icon={Flame}
        color={THEME.colors.primary[500]}
      >
        <View style={styles.chartContainer}>
          <SimpleLineChart
            data={chartData.map(d => ({ label: d.label, value: d.value, value2: d.value2 }))}
            color={THEME.colors.primary[500]}
            color2={THEME.colors.text.primary}
            maxVal={maxCalories}
          />
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: THEME.colors.primary[500] }]} />
            <Text style={styles.legendText}>{t('Alınan')}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: THEME.colors.text.muted }]} />
            <Text style={styles.legendText}>{t('Yakılan')}</Text>
          </View>
        </View>
      </ChartCard>

      {/* Water Intake Chart */}
      <ChartCard
        title={t('Haftalık Su Alımı')}
        subtitle={t('Günlük su tüketimi (ml)')}
        icon={Droplet}
        color="#3b82f6"
      >
        <View style={styles.chartContainer}>
          <SimpleBarChart
            data={chartData.map(d => ({ label: d.label, value: d.water }))}
            color="#3b82f6"
            maxVal={maxWater}
            unit="ml"
          />
        </View>
        <Text style={styles.chartNote}>{t('Hedef: 2000ml/gün')}</Text>
      </ChartCard>

      {/* Activity Duration Chart */}
      <ChartCard
        title={t('Aktivite Süresi')}
        subtitle={t('Günlük hareket (dakika)')}
        icon={Activity}
        color={THEME.colors.semantic.success}
      >
        <View style={styles.chartContainer}>
          <SimpleBarChart
            data={chartData.map(d => ({ label: d.label, value: d.activity }))}
            color={THEME.colors.semantic.success}
            maxVal={maxActivity}
            unit="min"
          />
        </View>
        <Text style={styles.chartNote}>{t('Hedef: 30 dakika/gün')}</Text>
      </ChartCard>

      {/* Meal Count Chart */}
      <ChartCard
        title={t('Öğün Sayısı')}
        subtitle={t('Günlük öğün ritmi')}
        icon={Apple}
        color={THEME.colors.semantic.warning}
      >
        <View style={styles.chartContainer}>
          <SimpleBarChart
            data={chartData.map(d => ({ label: d.label, value: d.meals }))}
            color={THEME.colors.semantic.warning}
            maxVal={maxMeals}
            unit="öğün"
          />
        </View>
        <Text style={styles.chartNote}>{t('Hedef: 3 ana öğün')}</Text>
      </ChartCard>

      {/* Macro Distribution Pie Chart */}
      <ChartCard
        title={t('Makro Dağılımı')}
        subtitle={t('Protein / Karbonhidrat / Yağ')}
        icon={PieChartIcon}
        color={THEME.colors.primary[500]}
      >
        <View style={styles.pieChartContainer}>
          {totalMacro > 0 ? (
            <SimplePieChart
              data={macroData}
              colors={[THEME.colors.primary[500], THEME.colors.semantic.warning, THEME.colors.semantic.error]}
            />
          ) : (
            <EmptyState message={t('Makro verisi oluştuğunda burada görünecek.')} />
          )}
        </View>
      </ChartCard>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chartTitleContainer: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  chartSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.secondary,
  },
  chartNote: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textAlign: 'center',
    marginTop: 8,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary[600],
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});
