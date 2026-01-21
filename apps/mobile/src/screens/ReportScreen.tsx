import { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTracker } from "@/providers/TrackerProvider";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { buildReport } from "@/lib/report";
import { exportEntriesCsv } from "@/lib/csv";
import { exportReportPdf } from "@/lib/pdf";
import { t } from "@/lib/i18n";

const RANGE_OPTIONS = [7, 30, 90];

export function ReportScreen() {
  const { entries, goals, theme } = useTracker();
  const [range, setRange] = useState(30);

  const report = useMemo(() => buildReport(entries, range, goals), [entries, range, goals]);

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Rapor")} subtitle={t("Detaylı analiz")} theme={theme} />

        <View style={styles.rangeRow}>
          {RANGE_OPTIONS.map((option) => (
            <Pressable
              key={option}
              onPress={() => setRange(option)}
              style={[
                styles.rangeChip,
                { borderColor: theme.border },
                range === option && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
              ]}
            >
                <Text style={{ color: range === option ? theme.accentText : theme.muted }}>{t("{value} gün", { value: option })}</Text>
            </Pressable>
          ))}
        </View>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Toplamlar")}</Text>
          <View style={styles.statRow}>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: theme.muted }]}>{t("Kalori In")}</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>{report.totals.caloriesIn}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: theme.muted }]}>{t("Kalori Out")}</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>{report.totals.caloriesOut}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: theme.muted }]}>{t("Net")}</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>{report.totals.netCalories}</Text>
            </View>
          </View>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("İçgörüler")}</Text>
          {report.insights.map((insight) => (
            <View key={insight.id} style={styles.insightRow}>
              <Text style={[styles.insightTitle, { color: theme.text }]}>{insight.title}</Text>
              <Text style={[styles.insightBody, { color: theme.muted }]}>{insight.message}</Text>
            </View>
          ))}
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Motivasyon")}</Text>
          <Text style={[styles.insightBody, { color: theme.muted }]}>{report.comment}</Text>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Dışa Aktarım")}</Text>
          <Button label={t("CSV İndir")} onPress={() => exportEntriesCsv(entries)} theme={theme} />
          <Button label={t("PDF Raporu")} onPress={() => exportReportPdf(report)} theme={theme} variant="secondary" />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  rangeRow: { flexDirection: "row", gap: 8 },
  rangeChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  card: { gap: 12 },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  statRow: { flexDirection: "row", justifyContent: "space-between" },
  statBlock: { flex: 1, gap: 4 },
  statLabel: { fontFamily: "Archivo_600SemiBold", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 },
  statValue: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 18 },
  insightRow: { gap: 4, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  insightTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  insightBody: { fontFamily: "Archivo_400Regular", fontSize: 12 },
});
