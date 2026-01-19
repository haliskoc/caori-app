import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t, getDayKey } from "@calai/shared";
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { CalorieSummaryWidget } from "../../src/components/organisms/CalorieSummaryWidget";
import { QuickCalorieAddWidget } from "../../src/components/organisms/QuickCalorieAddWidget";
import { WaterTrackingWidget } from "../../src/components/organisms/WaterTrackingWidget";
import { WeeklyCalorieChart } from "../../src/components/organisms/WeeklyCalorieChart";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
  Bot,
  Bell,
  Flame,
  Droplets,
  Footprints,
  Target,
  TrendingUp,
  Award,
  Utensils,
  Beef,
  Wheat,
  CircleDot,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// Quick stats card component
function QuickStatCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  progress,
}: {
  icon: any;
  label: string;
  value: number;
  unit: string;
  color: string;
  progress?: number;
}) {
  return (
    <LiquidGlassCard variant="subtle" style={styles.quickStatCard}>
      <View style={[styles.quickStatIcon, { backgroundColor: color + "20" }]}>
        <Icon size={18} color={color} />
      </View>
      <Text style={styles.quickStatValue}>
        {value}
        <Text style={styles.quickStatUnit}> {unit}</Text>
      </Text>
      <Text style={styles.quickStatLabel}>{label}</Text>
      {progress !== undefined && (
        <View style={styles.quickStatProgress}>
          <View
            style={[
              styles.quickStatProgressFill,
              { width: `${Math.min(progress, 100)}%`, backgroundColor: color },
            ]}
          />
        </View>
      )}
    </LiquidGlassCard>
  );
}

// Macro indicator component
function MacroIndicator({
  label,
  current,
  goal,
  color,
}: {
  label: string;
  current: number;
  goal: number;
  color: string;
}) {
  const progress = goal > 0 ? (current / goal) * 100 : 0;
  return (
    <View style={styles.macroIndicator}>
      <View style={styles.macroHeader}>
        <View style={[styles.macroDot, { backgroundColor: color }]} />
        <Text style={styles.macroLabel}>{label}</Text>
      </View>
      <Text style={styles.macroValue}>
        {current}
        <Text style={styles.macroGoal}>/{goal}g</Text>
      </Text>
      <View style={styles.macroProgressBar}>
        <View
          style={[
            styles.macroProgressFill,
            { width: `${Math.min(progress, 100)}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const {
    dailySummary,
    fetchDailySummary,
    isLoading,
    addEntry,
    goals,
    fetchReportData,
    profile,
  } = useStore();

  const today = getDayKey(new Date());
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [greeting, setGreeting] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t("Günaydın"));
    } else if (hour < 18) {
      setGreeting(t("İyi Günler"));
    } else {
      setGreeting(t("İyi Akşamlar"));
    }
  }, []);

  useEffect(() => {
    fetchDailySummary(today);
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    const reportData = await fetchReportData(7);
    if (reportData?.daily) {
      setWeeklyData(reportData.daily);
      // Calculate streak from data
      let currentStreak = 0;
      for (const day of [...reportData.daily].reverse()) {
        if (day.caloriesIn > 0) {
          currentStreak++;
        } else {
          break;
        }
      }
      setStreak(currentStreak);
    } else {
      // Mock data for demonstration
      setWeeklyData([
        { date: "2026-01-13", caloriesIn: 1800, caloriesOut: 300 },
        { date: "2026-01-14", caloriesIn: 2100, caloriesOut: 450 },
        { date: "2026-01-15", caloriesIn: 1950, caloriesOut: 200 },
        { date: "2026-01-16", caloriesIn: 2200, caloriesOut: 500 },
        { date: "2026-01-17", caloriesIn: 1700, caloriesOut: 350 },
        { date: "2026-01-18", caloriesIn: 2000, caloriesOut: 400 },
        {
          date: "2026-01-19",
          caloriesIn: dailySummary?.caloriesIn || 0,
          caloriesOut: dailySummary?.caloriesOut || 0,
        },
      ]);
      setStreak(7);
    }
  };

  const onRefresh = useCallback(() => {
    fetchDailySummary(today);
    loadWeeklyData();
  }, [today]);

  const handleAddWater = async (amount: number) => {
    const entry = {
      type: "water",
      amountMl: amount,
      timestamp: new Date().toISOString(),
    } as const;
    await addEntry(entry as any);
    fetchDailySummary(today);
  };

  const handleQuickCalorieAdd = async (amount: number) => {
    const entry = {
      type: "food",
      name: t("Hızlı Ekleme"),
      calories: amount,
      mealType: "snack",
      timestamp: new Date().toISOString(),
    } as const;
    await addEntry(entry as any);
    fetchDailySummary(today);
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return new Date().toLocaleDateString("tr-TR", options);
  };

  // Calculate progress percentages
  const calorieProgress = goals?.calorieGoal
    ? ((dailySummary?.caloriesIn || 0) / goals.calorieGoal) * 100
    : 0;
  const waterProgress = goals?.waterGoalMl
    ? ((dailySummary?.waterMl || 0) / goals.waterGoalMl) * 100
    : 0;
  const activityProgress = goals?.activityGoalMin
    ? ((dailySummary?.activityMin || 0) / goals.activityGoalMin) * 100
    : 0;

  // Calculate remaining calories
  const remainingCalories =
    (goals?.calorieGoal || 2200) - (dailySummary?.caloriesIn || 0);
  const netCalories =
    (dailySummary?.caloriesIn || 0) - (dailySummary?.caloriesOut || 0);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              tintColor={THEME.colors.primary[500]}
              colors={[THEME.colors.primary[500]]}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>
                {greeting}
                {profile.name ? `, ${profile.name.split(" ")[0]}` : ""}
              </Text>
              <Text style={styles.date}>{formatDate()}</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => {
                  /* Notifications */
                }}
              >
                <Bell
                  size={22}
                  color={THEME.colors.text.secondary}
                  strokeWidth={2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, styles.aiButton]}
                onPress={() => router.push("/(modals)/ai-assistant")}
              >
                <Bot
                  size={22}
                  color={THEME.colors.primary[600]}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Streak & Daily Goal Card */}
          <LiquidGlassCard variant="elevated" style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View style={styles.streakLeft}>
                <View style={styles.streakBadge}>
                  <Award size={24} color={THEME.colors.semantic.warning} />
                  <Text style={styles.streakNumber}>{streak}</Text>
                </View>
                <Text style={styles.streakLabel}>{t("Günlük Seri")}</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakRight}>
                <Text style={styles.remainingCalories}>
                  {remainingCalories > 0 ? remainingCalories : 0}
                </Text>
                <Text style={styles.remainingLabel}>{t("kalan kalori")}</Text>
              </View>
            </View>
          </LiquidGlassCard>

          {/* Quick Stats Row */}
          <View style={styles.quickStatsRow}>
            <QuickStatCard
              icon={Flame}
              label={t("Kalori")}
              value={dailySummary?.caloriesIn || 0}
              unit="kcal"
              color={THEME.colors.semantic.warning}
              progress={calorieProgress}
            />
            <QuickStatCard
              icon={Droplets}
              label={t("Su")}
              value={Math.round((dailySummary?.waterMl || 0) / 1000 * 10) / 10}
              unit="L"
              color={THEME.colors.primary[500]}
              progress={waterProgress}
            />
            <QuickStatCard
              icon={Footprints}
              label={t("Aktivite")}
              value={dailySummary?.activityMin || 0}
              unit="dk"
              color={THEME.colors.semantic.success}
              progress={activityProgress}
            />
          </View>

          {/* Macro Breakdown Card */}
          <LiquidGlassCard variant="subtle" style={styles.macroCard}>
            <View style={styles.macroCardHeader}>
              <Utensils size={18} color={THEME.colors.text.muted} />
              <Text style={styles.macroCardTitle}>{t("Makro Dağılımı")}</Text>
            </View>
            <View style={styles.macroGrid}>
              <MacroIndicator
                label={t("Protein")}
                current={dailySummary?.proteinG || 0}
                goal={goals?.proteinGoalG || 150}
                color={THEME.colors.macro.protein}
              />
              <MacroIndicator
                label={t("Karbonhidrat")}
                current={dailySummary?.carbsG || 0}
                goal={goals?.carbsGoalG || 250}
                color={THEME.colors.macro.carbs}
              />
              <MacroIndicator
                label={t("Yağ")}
                current={dailySummary?.fatG || 0}
                goal={goals?.fatGoalG || 65}
                color={THEME.colors.macro.fat}
              />
            </View>
          </LiquidGlassCard>

          {/* Main Calorie Summary Widget */}
          <View style={styles.section}>
            <CalorieSummaryWidget
              caloriesIn={dailySummary?.caloriesIn || 0}
              caloriesOut={dailySummary?.caloriesOut || 0}
              proteinG={dailySummary?.proteinG || 0}
              carbsG={dailySummary?.carbsG || 0}
              fatG={dailySummary?.fatG || 0}
              calorieGoal={goals?.calorieGoal || 2000}
              proteinGoalG={goals?.proteinGoalG || 150}
              carbsGoalG={goals?.carbsGoalG || 250}
              fatGoalG={goals?.fatGoalG || 65}
            />
          </View>

          {/* Quick Calorie Add */}
          <View style={styles.section}>
            <QuickCalorieAddWidget onAddCalories={handleQuickCalorieAdd} />
          </View>

          {/* Water Tracking */}
          <View style={styles.section}>
            <WaterTrackingWidget
              currentMl={dailySummary?.waterMl || 0}
              goalMl={goals?.waterGoalMl || 2500}
              onAddWater={handleAddWater}
            />
          </View>

          {/* Weekly Trend Card */}
          <LiquidGlassCard variant="subtle" style={styles.trendCard}>
            <View style={styles.trendHeader}>
              <View style={styles.trendHeaderLeft}>
                <TrendingUp size={18} color={THEME.colors.primary[600]} />
                <Text style={styles.trendTitle}>{t("Haftalık Trend")}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/(tabs)/report")}>
                <Text style={styles.trendViewAll}>{t("Tümünü Gör")}</Text>
              </TouchableOpacity>
            </View>
            <WeeklyCalorieChart data={weeklyData} />
          </LiquidGlassCard>

          {/* Today's Meals Summary */}
          <LiquidGlassCard variant="subtle" style={styles.mealsCard}>
            <View style={styles.mealsHeader}>
              <Utensils size={18} color={THEME.colors.text.muted} />
              <Text style={styles.mealsTitle}>{t("Bugünün Öğünleri")}</Text>
            </View>
            <View style={styles.mealsGrid}>
              {[
                { label: t("Kahvaltı"), icon: "☀️", time: "08:00" },
                { label: t("Öğle"), icon: "🌤️", time: "13:00" },
                { label: t("Akşam"), icon: "🌙", time: "19:00" },
                { label: t("Atıştırma"), icon: "🍎", time: "" },
              ].map((meal, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.mealItem}
                  onPress={() => router.push("/(tabs)/add")}
                >
                  <Text style={styles.mealIcon}>{meal.icon}</Text>
                  <Text style={styles.mealLabel}>{meal.label}</Text>
                  {meal.time && (
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </LiquidGlassCard>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "900",
    color: THEME.colors.text.primary,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.text.muted,
    marginTop: 4,
    textTransform: "capitalize",
  },
  headerRight: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  aiButton: {
    backgroundColor: THEME.colors.primary[100],
    borderColor: THEME.colors.primary[200],
  },
  streakCard: {
    padding: 20,
    marginBottom: 16,
  },
  streakContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakLeft: {
    flex: 1,
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: "900",
    color: THEME.colors.semantic.warning,
  },
  streakLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.colors.text.muted,
    marginTop: 4,
  },
  streakDivider: {
    width: 1,
    height: 50,
    backgroundColor: THEME.colors.glass.border,
    marginHorizontal: 20,
  },
  streakRight: {
    flex: 1,
    alignItems: "center",
  },
  remainingCalories: {
    fontSize: 32,
    fontWeight: "900",
    color: THEME.colors.primary[600],
  },
  remainingLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.colors.text.muted,
    marginTop: 4,
  },
  quickStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  quickStatCard: {
    flex: 1,
    padding: 14,
    alignItems: "center",
  },
  quickStatIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  quickStatUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: THEME.colors.text.muted,
  },
  quickStatLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  quickStatProgress: {
    width: "100%",
    height: 4,
    backgroundColor: THEME.colors.glass.border,
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  quickStatProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  macroCard: {
    padding: 16,
    marginBottom: 16,
  },
  macroCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  macroCardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  macroGrid: {
    flexDirection: "row",
    gap: 12,
  },
  macroIndicator: {
    flex: 1,
  },
  macroHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  macroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.text.muted,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  macroGoal: {
    fontSize: 12,
    fontWeight: "600",
    color: THEME.colors.text.muted,
  },
  macroProgressBar: {
    height: 6,
    backgroundColor: THEME.colors.glass.border,
    borderRadius: 3,
    marginTop: 6,
    overflow: "hidden",
  },
  macroProgressFill: {
    height: "100%",
    borderRadius: 3,
  },
  section: {
    marginBottom: 16,
  },
  trendCard: {
    padding: 16,
    marginBottom: 16,
  },
  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  trendHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  trendViewAll: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.primary[600],
  },
  mealsCard: {
    padding: 16,
    marginBottom: 16,
  },
  mealsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  mealsTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  mealsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  mealItem: {
    width: (width - 40 - 36 - 12) / 4,
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  mealIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  mealLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    textAlign: "center",
  },
  mealTime: {
    fontSize: 10,
    fontWeight: "600",
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  bottomSpacing: {
    height: 100,
  },
});
