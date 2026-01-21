import { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTracker } from "@/providers/TrackerProvider";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { WeeklyChart } from "@/components/features/WeeklyChart";
import { SleepWidget } from "@/components/features/SleepWidget";
import { MealType } from "@calai/shared/types";
import { QuickActionsSheet } from "@/components/QuickActionsSheet";
import { t } from "@/lib/i18n";

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { entries, dailySummary, weeklySummary, goals, addFood, addWater, updateSettings, settings, theme } = useTracker();
  const [quickCalories, setQuickCalories] = useState("");
  const [quickMeal, setQuickMeal] = useState<MealType>("snack");
  const [quickOpen, setQuickOpen] = useState(false);

  const mealLabels: Record<MealType, string> = {
    breakfast: t("Kahvaltı"),
    lunch: t("Öğle"),
    dinner: t("Akşam"),
    snack: t("Atıştırmalık"),
  };

  const netCalories = dailySummary.caloriesIn - dailySummary.caloriesOut;
  const waterLeft = Math.max(goals.waterGoalMl - dailySummary.waterMl, 0);
  const hasEntries = entries.length > 0;

  const macroGoals = useMemo(
    () => [
      { key: "protein", label: t("Protein"), goal: goals.proteinGoalG, value: dailySummary.proteinG },
      { key: "carbs", label: t("Karbonhidrat"), goal: goals.carbsGoalG, value: dailySummary.carbsG },
      { key: "fat", label: t("Yağ"), goal: goals.fatGoalG, value: dailySummary.fatG },
    ],
    [dailySummary.carbsG, dailySummary.fatG, dailySummary.proteinG, goals]
  );

  const handleQuickAdd = async () => {
    if (!quickCalories) return;
    await addFood({
      name: t("Hızlı Ekleme"),
      calories: Number(quickCalories),
      mealType: quickMeal,
    });
    setQuickCalories("");
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Calmet")} subtitle={t("Bugün Özeti")} theme={theme} onAction={() => setQuickOpen(true)} />

        <View style={styles.grid}>
          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Günlük Özet")}</Text>
            <Text style={[styles.sectionSub, { color: theme.muted }]}>{t("Kalori girişi ve çıkışı")}</Text>
            <View style={styles.statsRow}>
              <View style={[styles.statBox, { backgroundColor: theme.accentSoft, borderColor: theme.border }]}
              >
                <Text style={[styles.statLabel, { color: theme.accentText }]}>{t("Kalori Giriş")}</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{dailySummary.caloriesIn}</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: "#0f172a", borderColor: "#0f172a" }]}
              >
                <Text style={[styles.statLabel, { color: "#94a3b8" }]}>{t("Kalori Çıkış")}</Text>
                <Text style={[styles.statValue, { color: "#f8fafc" }]}>{dailySummary.caloriesOut}</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: theme.surface, borderColor: theme.border }]}
              >
                <Text style={[styles.statLabel, { color: theme.muted }]}>{t("Net")}</Text>
                <Text style={[styles.statValue, { color: theme.text }]}>{netCalories}</Text>
              </View>
            </View>

            <View style={styles.macroRow}>
              {macroGoals.map((macro) => (
                <View key={macro.key} style={[styles.macroCard, { borderColor: theme.border }]}
                >
                  <Text style={[styles.macroLabel, { color: theme.muted }]}>{macro.label}</Text>
                  <Text style={[styles.macroValue, { color: theme.text }]}>{Math.round(macro.value)} g</Text>
                  {macro.goal > 0 ? (
                    <View style={[styles.progressTrack, { backgroundColor: theme.accentSoft }]}
                    >
                      <View
                        style={{
                          width: `${Math.min(100, (macro.value / macro.goal) * 100)}%`,
                          backgroundColor: theme.accent,
                          height: "100%",
                          borderRadius: 999,
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>

            <View style={[styles.quickCard, { borderColor: theme.border, backgroundColor: theme.surface }]}
            >
              <Text style={[styles.quickTitle, { color: theme.muted }]}>{t("Hızlı Kalori Ekle")}</Text>
              <Input
                value={quickCalories}
                onChangeText={setQuickCalories}
                placeholder={t("Örn: 420")}
                keyboardType="numeric"
                theme={theme}
              />
              <View style={styles.mealRow}>
                {Object.entries(mealLabels).map(([value, label]) => (
                  <Pressable
                    key={value}
                    onPress={() => setQuickMeal(value as MealType)}
                    style={[
                      styles.mealChip,
                      { borderColor: theme.border },
                      quickMeal === value && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                    ]}
                  >
                    <Text style={{ color: quickMeal === value ? theme.accentText : theme.muted }}>
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Button label={t("Kaydet")} onPress={handleQuickAdd} theme={theme} />
            </View>
          </Card>

          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Su Takibi")}</Text>
            <Text style={[styles.sectionSub, { color: theme.muted }]}>
              {t("Günlük hedef {value} L", { value: Math.round(goals.waterGoalMl / 1000) })}
            </Text>
            <ProgressRing value={dailySummary.waterMl} goal={goals.waterGoalMl} theme={theme} />
            <Text style={[styles.waterLeft, { color: theme.muted }]}>
              {t("Kalan {value} ml", { value: Math.round(waterLeft) })}
            </Text>
            <View style={styles.waterButtons}>
              {[200, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  label={t("+{value}", { value: amount === 1000 ? "1L" : `${amount}ml` })}
                  onPress={() => addWater({ amountMl: amount })}
                  theme={theme}
                  variant="secondary"
                  style={styles.waterButton}
                />
              ))}
            </View>
          </Card>
        </View>

        <SleepWidget />

        <WeeklyChart summary={weeklySummary} />

        {!hasEntries && (
          <Card theme={theme} style={styles.emptyCard}>
            <Text style={[styles.sectionSub, { color: theme.muted }]}>
              {t("Henüz kayıt yok. Ekle sekmesiyle başlayın.")}
            </Text>
          </Card>
        )}
      </ScrollView>

      <QuickActionsSheet
        visible={quickOpen}
        onClose={() => setQuickOpen(false)}
        theme={theme}
        actions={[
          { id: "nav-add", label: t("Yeni kayıt ekle"), hint: t("Ekle"), onPress: () => navigation.navigate("Main", { screen: "Add" }) },
          { id: "nav-report", label: t("Raporu aç"), hint: t("Rapor"), onPress: () => navigation.navigate("Main", { screen: "Report" }) },
          { id: "water-250", label: t("250 ml su ekle"), hint: t("Hızlı"), onPress: () => addWater({ amountMl: 250 }) },
          { id: "water-500", label: t("500 ml su ekle"), hint: t("Hızlı"), onPress: () => addWater({ amountMl: 500 }) },
          {
            id: "theme-toggle",
            label: settings.theme.mode === "light" ? t("Dim tema") : t("Aydınlık tema"),
            hint: t("Tema"),
            onPress: () => updateSettings({ theme: { mode: settings.theme.mode === "light" ? "dim" : "light" } }),
          },
        ]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  grid: {
    gap: 16,
  },
  card: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
  },
  sectionSub: {
    fontFamily: "Archivo_400Regular",
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Archivo_600SemiBold",
  },
  statValue: {
    marginTop: 6,
    fontSize: 20,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  macroRow: {
    flexDirection: "row",
    gap: 10,
  },
  macroCard: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  macroLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Archivo_600SemiBold",
  },
  macroValue: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  quickCard: {
    marginTop: 8,
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickTitle: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Archivo_600SemiBold",
  },
  mealRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  mealChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  waterLeft: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
  },
  waterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  waterButton: {
    minWidth: 90,
  },
  emptyCard: {
    alignItems: "center",
  },
});
