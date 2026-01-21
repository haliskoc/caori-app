import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/providers/AppProvider";
import { DEFAULT_THEME } from "@/lib/theme";
import { t } from "@/lib/i18n";

export function LoginScreen({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login({ email, password });
    } catch (err: any) {
      setError(
        err?.message === "INVALID_INPUT"
          ? t("E-posta ve şifre zorunludur.")
          : t("Giriş başarısız. Bilgileri kontrol edin.")
      );
    }
  };

  return (
    <LinearGradient colors={["#ecfdf5", "#f7fffb"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t("Calmet")}</Text>
        <Text style={styles.subtitle}>{t("Sağlıklı yaşamı kolaylaştır")}</Text>
        <View style={styles.form}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t("E-posta")}
            keyboardType="email-address"
            theme={DEFAULT_THEME}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder={t("Şifre")}
            secureTextEntry
            theme={DEFAULT_THEME}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button label={t("Giriş Yap")} onPress={handleLogin} theme={DEFAULT_THEME} />
          <Button
            label={t("Hesap Oluştur")}
            onPress={() => navigation.navigate("Register")}
            theme={DEFAULT_THEME}
            variant="secondary"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
    color: "#6b7280",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  form: {
    marginTop: 24,
    gap: 12,
  },
  error: {
    color: "#ef4444",
    fontFamily: "Archivo_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});
