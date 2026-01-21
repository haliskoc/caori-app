import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTracker } from "@/providers/TrackerProvider";
import { Card } from "@/components/ui/Card";
import { sleepQualityEmojis, formatDuration, getSleepQualityLabel } from "@/lib/sleep";
import { t } from "@/lib/i18n";

export function SleepWidget() {
  const navigation = useNavigation<any>();
  const { entries, goals, theme } = useTracker();
  const lastSleep = entries.find((entry) => entry.type === "sleep");

  return (
    <Card theme={theme} style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>{t("Uyku Özeti")}</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            {t("Hedef {value} saat", { value: goals.sleepGoalHours })}
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Sleep")}>
          <Text style={[styles.link, { color: theme.accent }]}>{t("Detaylar")}</Text>
        </Pressable>
      </View>
      {lastSleep && lastSleep.type === "sleep" ? (
        <View style={styles.bodyRow}>
          <Text style={styles.emoji}>{sleepQualityEmojis[lastSleep.quality]}</Text>
          <View>
            <Text style={[styles.value, { color: theme.text }]}>{formatDuration(lastSleep.durationMin)}</Text>
            <Text style={[styles.subtitle, { color: theme.muted }]}>
              {getSleepQualityLabel(lastSleep.quality)}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={[styles.subtitle, { color: theme.muted }]}>{t("Henüz uyku kaydı yok.")}</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
  },
  link: {
    fontSize: 12,
    fontFamily: "Archivo_600SemiBold",
  },
  bodyRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  emoji: {
    fontSize: 28,
  },
  value: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
  },
});
