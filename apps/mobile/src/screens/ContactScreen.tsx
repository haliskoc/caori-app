import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function ContactScreen() {
  const { theme } = useTracker();
  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title={t("İletişim")} subtitle={t("Bize ulaşın")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.text, { color: theme.text }]}>{t("E-posta: support@calmet.local")}</Text>
          <Text style={[styles.text, { color: theme.text }]}>{t("Telefon: +90 212 000 00 00")}</Text>
          <Text style={[styles.text, { color: theme.text }]}>{t("Adres: İstanbul, Türkiye")}</Text>
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
