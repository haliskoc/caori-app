import { View, Text, StyleSheet } from "react-native";
import type { DailySummary } from "@calai/shared/types";
import { formatShortDate } from "@calai/shared/utils";
import { useTracker } from "@/providers/TrackerProvider";
import { Card } from "@/components/ui/Card";
import { t } from "@/lib/i18n";

export function WeeklyChart({ summary }: { summary: DailySummary[] }) {
  const { theme } = useTracker();
  const maxCalories = Math.max(...summary.map((day) => day.caloriesIn), 1);

  return (
    <Card theme={theme} style={styles.card}>
      <Text style={[styles.title, { color: theme.text }]}>{t("Haftalık Trend")}</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>{t("Günlük kalori girişi")}</Text>
      <View style={styles.chartRow}>
        {summary.map((day) => {
          const height = Math.max(8, (day.caloriesIn / maxCalories) * 120);
          return (
            <View key={day.date} style={styles.barWrap}>
              <View
                style={[
                  styles.bar,
                  { height, backgroundColor: theme.accent, opacity: day.caloriesIn ? 1 : 0.3 },
                ]}
              />
              <Text style={[styles.label, { color: theme.muted }]}>{formatShortDate(day.date)}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barWrap: {
    flex: 1,
    alignItems: "center",
  },
  bar: {
    width: 16,
    borderRadius: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    fontFamily: "Archivo_400Regular",
  },
});
