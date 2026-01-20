import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t, getDayKey } from "@calai/shared";
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
  Bell,
  Droplets,
  TrendingUp,
  Sparkles,
  Moon,
  ChevronRight,
} from "lucide-react-native";
import { QuickActions } from "../../src/components/molecules/QuickActions";

const { width } = Dimensions.get("window");

// Web'deki Card bileşeninin mobil karşılığı
function Card({
  children,
  style,
  variant = "default",
}: {
  children: React.ReactNode;
  style?: any;
  variant?: "default" | "dark" | "emerald" | "subtle";
}) {
  const variantStyles = {
    default: styles.cardDefault,
    dark: styles.cardDark,
    emerald: styles.cardEmerald,
    subtle: styles.cardSubtle,
  };

  return (
    <View style={[styles.card, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

// Progress Ring - Web'deki gibi
function ProgressRing({ value, goal }: { value: number; goal: number }) {
  const progress = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.progressRingContainer}>
      <View style={styles.progressRingOuter}>
        <View style={[styles.progressRingTrack, { width: size, height: size }]}>
          <View style={styles.progressRingFill} />
        </View>
        <View style={styles.progressRingContent}>
          <Text style={styles.progressRingValue}>{Math.round(value)}</Text>
          <Text style={styles.progressRingUnit}>ml</Text>
        </View>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const {
    entries,
    dailySummary,
    goals,
    fetchDailySummary,
    addEntry,
    user,
    profile,
    sleepLogs,
    fetchSleepLogs,
  } = useStore();

  const [refreshing, setRefreshing] = useState(false);
  const [quickCalories, setQuickCalories] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const today = getDayKey(new Date());
    fetchDailySummary(today);
    fetchSleepLogs();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const today = getDayKey(new Date());
    await fetchDailySummary(today);
    await fetchSleepLogs();
    setRefreshing(false);
  }, [fetchDailySummary, fetchSleepLogs]);

  const handleQuickAdd = () => {
    if (!quickCalories) return;
    addEntry({
      type: "food",
      name: t("Hızlı Ekleme"),
      calories: Number(quickCalories),
      mealType: "snack",
      timestamp: new Date().toISOString(),
    } as any);
    setQuickCalories("");
  };

  const handleAddWater = (amountMl: number) => {
    addEntry({
      type: "water",
      amountMl,
      timestamp: new Date().toISOString(),
    } as any);
  };

  const netCalories = (dailySummary?.caloriesIn || 0) - (dailySummary?.caloriesOut || 0);
  const waterLeft = Math.max((goals?.waterGoalMl || 2500) - (dailySummary?.waterMl || 0), 0);
  const hasEntries = entries.length > 0;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("Günaydın");
    if (hour < 18) return t("İyi günler");
    return t("İyi akşamlar");
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header - Web'deki gibi */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>
              Cal<Text style={styles.logoAccent}>met</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push("/(screens)/reminders" as any)}
            >
              <Bell size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/(screens)/profile" as any)}
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.profileInitial}>
                  {(user?.name || profile.name || "U").charAt(0)}
                </Text>
              </View>
              <View style={styles.profileDot} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={THEME.colors.primary[500]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Uyarı Banner - Web'deki gibi */}
          <View style={styles.warningBanner}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningIconText}>!</Text>
            </View>
            <Text style={styles.warningText}>
              {t("Bu platform yalnızca takip ve farkındalık amaçlıdır. Tıbbi tavsiye sunmaz.")}
            </Text>
          </View>

          {/* Bugün Özeti Card - Web'deki gibi */}
          <Card style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryTitle}>{t("Bugün Özeti")}</Text>
                <Text style={styles.summarySubtitle}>{t("Kalori girişi ve çıkışı")}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t("Tahmini")}</Text>
              </View>
            </View>

            {/* Kalori Grid - Web'deki 3 kolon */}
            <View style={styles.calorieGrid}>
              <View style={styles.calorieCardIn}>
                <Text style={styles.calorieLabel}>{t("Kalori Giriş")}</Text>
                <Text style={styles.calorieValueIn}>{dailySummary?.caloriesIn || 0}</Text>
              </View>
              <View style={styles.calorieCardOut}>
                <Text style={styles.calorieLabelOut}>{t("Kalori Çıkış")}</Text>
                <Text style={styles.calorieValueOut}>{dailySummary?.caloriesOut || 0}</Text>
              </View>
              <View style={styles.calorieCardNet}>
                <Text style={styles.calorieLabel}>{t("Net")}</Text>
                <Text style={styles.calorieValueNet}>{netCalories}</Text>
              </View>
            </View>

            {/* Makro Grid */}
            <View style={styles.macroGrid}>
              <View style={styles.macroCard}>
                <Text style={styles.macroLabel}>{t("Protein")}</Text>
                <Text style={styles.macroValueGreen}>
                  {Math.round(dailySummary?.proteinG || 0)} g
                </Text>
              </View>
              <View style={styles.macroCard}>
                <Text style={styles.macroLabel}>{t("Karbonhidrat")}</Text>
                <Text style={styles.macroValueGreen}>
                  {Math.round(dailySummary?.carbsG || 0)} g
                </Text>
              </View>
              <View style={styles.macroCard}>
                <Text style={styles.macroLabel}>{t("Yağ")}</Text>
                <Text style={styles.macroValueRose}>
                  {Math.round(dailySummary?.fatG || 0)} g
                </Text>
              </View>
            </View>

            {/* Hızlı Kalori Ekle - Web'deki gibi */}
            <View style={styles.quickAddSection}>
              <View style={styles.quickAddHeader}>
                <Text style={styles.quickAddTitle}>{t("Hızlı Kalori Ekle")}</Text>
                <View style={styles.tooltipIcon}>
                  <Text style={styles.tooltipText}>?</Text>
                </View>
              </View>
              <View style={styles.quickAddRow}>
                <TextInput
                  style={styles.quickAddInput}
                  value={quickCalories}
                  onChangeText={setQuickCalories}
                  placeholder={t("Örn: 420")}
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleQuickAdd}
                />
                <TouchableOpacity style={styles.quickAddButton} onPress={handleQuickAdd}>
                  <Text style={styles.quickAddButtonText}>{t("Kaydet")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Quick Actions - Hızlı Erişim Butonları */}
          <QuickActions
            onAddWater={(amount) => handleAddWater(amount)}
            onAddFood={(calories, name) => {
              addEntry({
                type: "food",
                name,
                calories,
                mealType: "snack",
                timestamp: new Date().toISOString(),
              } as any);
            }}
            onOpenFoodModal={() => {
              // Navigate to food search modal
              router.push("/(modals)/add-entry" as any);
            }}
          />

          {/* Su Takibi Card - Web'deki gibi */}
          <Card style={styles.waterCard}>
            <View style={styles.waterHeader}>
              <Text style={styles.waterTitle}>{t("Su Takibi")}</Text>
              <Text style={styles.waterSubtitle}>
                {t("Günlük hedef")} {Math.round((goals?.waterGoalMl || 2500) / 1000)} L
              </Text>
            </View>

            <View style={styles.waterProgress}>
              <View style={styles.waterBar}>
                <View
                  style={[
                    styles.waterBarFill,
                    {
                      width: `${Math.min(
                        100,
                        ((dailySummary?.waterMl || 0) / (goals?.waterGoalMl || 2500)) * 100
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.waterInfo}>
                {dailySummary?.waterMl || 0} / {goals?.waterGoalMl || 2500} ml
              </Text>
            </View>

            <View style={styles.waterButtons}>
              {[200, 500, 1000].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={styles.waterButton}
                  onPress={() => handleAddWater(amount)}
                >
                  <Text style={styles.waterButtonText}>
                    +{amount === 1000 ? "1L" : `${amount}ml`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Uyku Widget */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(screens)/sleep" as any)}
          >
            <Card style={styles.sleepCard}>
              <View style={styles.sleepHeader}>
                <View style={styles.sleepIcon}>
                  <Moon size={20} color={THEME.colors.primary[600]} />
                </View>
                <View style={styles.sleepInfo}>
                  <Text style={styles.sleepTitle}>{t("Uyku Takibi")}</Text>
                  <Text style={styles.sleepSubtitle}>
                    {sleepLogs.length > 0
                      ? t("{count} kayıt", { count: sleepLogs.length })
                      : t("Kayıt ekle")}
                  </Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </View>
            </Card>
          </TouchableOpacity>

          {/* Haftalık Özet */}
          <Card style={styles.weeklyCard}>
            <View style={styles.weeklyHeader}>
              <TrendingUp size={18} color={THEME.colors.primary[600]} />
              <Text style={styles.weeklyTitle}>{t("Haftalık Trend")}</Text>
            </View>
            <Text style={styles.weeklyDescription}>
              {t("Detaylı grafikleri görmek için Rapor sekmesine gidin.")}
            </Text>
          </Card>

          {/* AI Özellikleri Card */}
          <Card>
            <Text style={styles.aiTitle}>{t("AI Özellikleri")}</Text>
            <Text style={styles.aiDescription}>
              {t("Görüntü tabanlı loglama şu an kapalıdır.")}
            </Text>
            <View style={styles.aiStatus}>
              <Text style={styles.aiStatusLabel}>{t("AI Görsel Tanıma")}</Text>
              <View style={styles.aiStatusBadge}>
                <Text style={styles.aiStatusText}>{t("Kapalı")}</Text>
              </View>
            </View>
          </Card>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fffb", // Web'deki arka plan
  },
  safeArea: {
    flex: 1,
  },
  // Header - Web'deki gibi
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16, 185, 129, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  headerLeft: {},
  logo: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -1,
  },
  logoAccent: {
    color: THEME.colors.primary[500],
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  profileButton: {
    position: "relative",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.primary[600],
  },
  profileDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.colors.primary[500],
    borderWidth: 2,
    borderColor: "#fff",
  },
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  // Warning Banner
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  warningIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
  },
  warningIconText: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.primary[700],
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: THEME.colors.primary[900],
    lineHeight: 16,
  },
  // Card
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    marginBottom: 16,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardDefault: {},
  cardDark: {
    backgroundColor: "#111827",
    borderColor: "#1f2937",
  },
  cardEmerald: {
    backgroundColor: THEME.colors.primary[50],
    borderColor: THEME.colors.primary[100],
  },
  cardSubtle: {
    backgroundColor: "#f9fafb",
    borderColor: "#f3f4f6",
  },
  // Summary Card
  summaryCard: {},
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  summarySubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  badge: {
    backgroundColor: THEME.colors.primary[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.primary[700],
  },
  // Calorie Grid
  calorieGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  calorieCardIn: {
    flex: 1,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    borderRadius: 16,
    padding: 12,
  },
  calorieCardOut: {
    flex: 1,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 12,
  },
  calorieCardNet: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 16,
    padding: 12,
  },
  calorieLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: THEME.colors.primary[600],
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  calorieLabelOut: {
    fontSize: 10,
    fontWeight: "900",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  calorieValueIn: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginTop: 4,
  },
  calorieValueOut: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginTop: 4,
  },
  calorieValueNet: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginTop: 4,
  },
  // Macro Grid
  macroGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  macroCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: THEME.colors.primary[50],
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  macroValueGreen: {
    fontSize: 18,
    fontWeight: "900",
    color: THEME.colors.primary[700],
    marginTop: 4,
  },
  macroValueRose: {
    fontSize: 18,
    fontWeight: "900",
    color: "#f43f5e",
    marginTop: 4,
  },
  // Quick Add
  quickAddSection: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 16,
    padding: 16,
  },
  quickAddHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  quickAddTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  tooltipIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9ca3af",
  },
  quickAddRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickAddInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  quickAddButton: {
    backgroundColor: THEME.colors.primary[600],
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.colors.primary[300],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quickAddButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  // Water Card
  waterCard: {},
  waterHeader: {
    marginBottom: 16,
  },
  waterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  waterSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  waterProgress: {
    marginBottom: 16,
  },
  waterBar: {
    height: 8,
    backgroundColor: THEME.colors.primary[100],
    borderRadius: 4,
    overflow: "hidden",
  },
  waterBarFill: {
    height: "100%",
    backgroundColor: THEME.colors.primary[500],
    borderRadius: 4,
  },
  waterInfo: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  waterButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  waterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  waterButtonText: {
    fontSize: 11,
    fontWeight: "900",
    color: THEME.colors.primary[700],
  },
  // Sleep Card
  sleepCard: {},
  sleepHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sleepIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sleepInfo: {
    flex: 1,
  },
  sleepTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  sleepSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  // Weekly Card
  weeklyCard: {
    backgroundColor: THEME.colors.primary[50],
  },
  weeklyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  weeklyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  weeklyDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  // AI Card
  aiTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  aiDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 12,
  },
  aiStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.colors.primary[50],
    borderRadius: 16,
    padding: 16,
  },
  aiStatusLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.primary[700],
  },
  aiStatusBadge: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  aiStatusText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#111827",
  },
  // Progress Ring
  progressRingContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  progressRingOuter: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  progressRingTrack: {
    position: "absolute",
    borderRadius: 60,
    borderWidth: 10,
    borderColor: THEME.colors.primary[100],
  },
  progressRingFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: THEME.colors.primary[500],
  },
  progressRingContent: {
    alignItems: "center",
  },
  progressRingValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },
  progressRingUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  bottomSpacing: {
    height: 40,
  },
});
