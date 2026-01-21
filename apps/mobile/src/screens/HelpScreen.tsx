import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function HelpScreen() {
  const { theme } = useTracker();
  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title={t("Yardım")} subtitle={t("Kullanım rehberi")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.text, { color: theme.text }]}>{t("1. Günlük kayıtları \"Ekle\" sekmesinden girin.")}</Text>
          <Text style={[styles.text, { color: theme.text }]}>{t("2. Rapor ekranında trendleri inceleyin.")}</Text>
          <Text style={[styles.text, { color: theme.text }]}>{t("3. Ayarlardan hedeflerinizi güncelleyin.")}</Text>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 12 },
  card: { gap: 12 },
  text: { fontFamily: "Archivo_400Regular", fontSize: 13 },
});
