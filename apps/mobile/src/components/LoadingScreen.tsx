import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "@/lib/i18n";

export function LoadingScreen() {
  return (
    <LinearGradient colors={["#ecfdf5", "#f7fffb"]} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.orb} />
        <Text style={styles.title}>{t("Calmet")}</Text>
        <Text style={styles.subtitle}>{t("Sağlıklı Yaşam")}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 32,
    paddingHorizontal: 40,
    borderRadius: 28,
    shadowColor: "#0f172a",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
  orb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#10b981",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Archivo_400Regular",
    color: "#6b7280",
  },
});
