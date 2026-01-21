import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function FaqScreen() {
  const { theme } = useTracker();
  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title={t("SSS")} subtitle={t("Sık sorulanlar")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.question, { color: theme.text }]}>{t("Verilerim nerede saklanıyor?")}</Text>
          <Text style={[styles.answer, { color: theme.muted }]}>{t("Tüm veriler cihazınızdaki yerel veritabanında saklanır.")}</Text>
          <Text style={[styles.question, { color: theme.text }]}>{t("İnternet bağlantısı gerekli mi?")}</Text>
          <Text style={[styles.answer, { color: theme.muted }]}>{t("Hayır, uygulama tamamen çevrimdışı çalışır.")}</Text>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 12 },
  card: { gap: 12 },
  question: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  answer: { fontFamily: "Archivo_400Regular", fontSize: 12 },
});
