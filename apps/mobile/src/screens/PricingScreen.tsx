import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function PricingScreen() {
  const navigation = useNavigation<any>();
  const { theme, settings } = useTracker();
  const isPremium = settings.premium.active;
  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title={t("Paketler")} subtitle={t("Premium seçenekler")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.title, { color: theme.text }]}>{t("Free")}</Text>
          <Text style={[styles.text, { color: theme.muted }]}>{t("Temel takip ve raporlar")}</Text>
        </Card>
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.title, { color: theme.text }]}>{t("Pro")}</Text>
          <Text style={[styles.text, { color: theme.muted }]}>{t("Sınırsız rapor ve gelişmiş analiz")}</Text>
          <Button
            label={isPremium ? t("Premium Aktif") : t("Premium'a Geç")}
            onPress={() => navigation.navigate("Premium")}
            theme={theme}
            variant={isPremium ? "secondary" : "primary"}
          />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 12 },
  card: { gap: 8 },
  title: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 18 },
  text: { fontFamily: "Archivo_400Regular", fontSize: 12 },
});
