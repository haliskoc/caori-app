import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function GoalsScreen() {
  const { goals, updateGoals, theme } = useTracker();
  const [local, setLocal] = useState({
    waterGoalMl: goals.waterGoalMl,
    calorieGoal: goals.calorieGoal,
    activityGoalMin: goals.activityGoalMin,
    mealGoalCount: goals.mealGoalCount,
    weightGoalKg: goals.weightGoalKg,
    proteinGoalG: goals.proteinGoalG,
    carbsGoalG: goals.carbsGoalG,
    fatGoalG: goals.fatGoalG,
    sleepGoalHours: goals.sleepGoalHours,
  });

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Hedefler")} subtitle={t("Günlük plan")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Input
            value={String(local.waterGoalMl)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, waterGoalMl: Number(value) || 0 }))}
            placeholder={t("Su hedefi (ml)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.calorieGoal)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, calorieGoal: Number(value) || 0 }))}
            placeholder={t("Kalori hedefi")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.activityGoalMin)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, activityGoalMin: Number(value) || 0 }))}
            placeholder={t("Aktivite hedefi (dk)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.mealGoalCount)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, mealGoalCount: Number(value) || 0 }))}
            placeholder={t("Öğün hedefi")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.proteinGoalG)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, proteinGoalG: Number(value) || 0 }))}
            placeholder={t("Protein (g)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.carbsGoalG)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, carbsGoalG: Number(value) || 0 }))}
            placeholder={t("Karbonhidrat (g)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.fatGoalG)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, fatGoalG: Number(value) || 0 }))}
            placeholder={t("Yağ (g)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={String(local.sleepGoalHours)}
            onChangeText={(value) => setLocal((prev) => ({ ...prev, sleepGoalHours: Number(value) || 0 }))}
            placeholder={t("Uyku hedefi (saat)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Button label={t("Hedefleri Kaydet")} onPress={() => updateGoals(local)} theme={theme} />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
});
