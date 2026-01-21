import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { sleepQualityEmojis, getSleepQualityLabel } from "@/lib/sleep";
import type { SleepQuality } from "@calai/shared/types";
import { t } from "@/lib/i18n";

const QUALITIES: SleepQuality[] = ["poor", "fair", "good", "excellent"];

export function SleepScreen() {
  const { entries, addSleep, removeEntry, theme } = useTracker();
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [quality, setQuality] = useState<SleepQuality>("good");
  const [note, setNote] = useState("");

  const sleepEntries = entries.filter((entry) => entry.type === "sleep");

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Uyku")} subtitle={t("Uyku kayıtları")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Yeni Uyku")}</Text>
          <Input value={sleepStart} onChangeText={setSleepStart} placeholder={t("Başlangıç (ISO)")} theme={theme} />
          <Input value={sleepEnd} onChangeText={setSleepEnd} placeholder={t("Bitiş (ISO)")} theme={theme} />
          <View style={styles.qualityRow}>
            {QUALITIES.map((item) => (
              <Pressable
                key={item}
                onPress={() => setQuality(item)}
                style={[
                  styles.qualityChip,
                  { borderColor: theme.border },
                  quality === item && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: quality === item ? theme.accentText : theme.muted }}>
                  {sleepQualityEmojis[item]} {getSleepQualityLabel(item)}
                </Text>
              </Pressable>
            ))}
          </View>
          <Input value={note} onChangeText={setNote} placeholder={t("Not")} theme={theme} />
          <Button
            label={t("Uyku Kaydet")}
            onPress={() =>
              addSleep({
                sleepStart: sleepStart || new Date().toISOString(),
                sleepEnd: sleepEnd || new Date().toISOString(),
                quality,
                note,
              })
            }
            theme={theme}
          />
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Geçmiş")}</Text>
          {sleepEntries.map((entry) => (
            <View key={entry.id} style={styles.row}>
              <View>
                <Text style={[styles.rowTitle, { color: theme.text }]}>
                  {sleepQualityEmojis[entry.quality]} {getSleepQualityLabel(entry.quality)}
                </Text>
                <Text style={[styles.rowSub, { color: theme.muted }]}>{entry.timestamp}</Text>
              </View>
              <Button label={t("Sil")} onPress={() => removeEntry(entry.id, entry.type)} theme={theme} variant="ghost" />
            </View>
          ))}
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  qualityRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  qualityChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  rowSub: { fontFamily: "Archivo_400Regular", fontSize: 11 },
});
