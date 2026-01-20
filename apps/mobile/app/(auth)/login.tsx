import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/providers/AuthProvider";
import { t } from "@calai/shared";
import {
  Sparkles,
  Mail,
  Lock,
  Globe,
  User,
  ArrowRight,
  ChevronRight,
} from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { Button } from "../../src/components/atoms/Button";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useRouter } from "expo-router";
import { loginWithWeb } from "../../src/lib/auth/web-auth";
import { useStore } from "../../src/store";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webLoading, setWebLoading] = useState(false);

  // Web ile giriş yap
  const handleWebLogin = async () => {
    setWebLoading(true);
    try {
      const result = await loginWithWeb();

      if (result.success && result.user) {
        // Store'a kullanıcıyı kaydet
        setUser(result.user);
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          t("Giriş Başarısız"),
          result.error || t("Bir hata oluştu. Tekrar deneyin."),
          [{ text: t("Tamam") }]
        );
      }
    } catch (error) {
      Alert.alert(t("Hata"), t("Bağlantı hatası oluştu."));
    } finally {
      setWebLoading(false);
    }
  };

  // Email ile giriş
  const handleEmailLogin = async () => {
    if (!email) {
      Alert.alert(t("Hata"), t("Lütfen e-posta adresinizi girin."));
      return;
    }
    await login(email, password);
  };

  // Misafir girişi
  const handleGuestLogin = async () => {
    await login();
    router.replace("/(tabs)");
  };

  if (isLoading || webLoading) {
    return (
      <View style={styles.loadingContainer}>
        <AnimatedBackground />
        <LiquidGlassCard variant="elevated" style={styles.loadingCard}>
          <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
          <Text style={styles.loadingText}>
            {webLoading ? t("Web'de oturum açılıyor...") : t("Yükleniyor...")}
          </Text>
        </LiquidGlassCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo & Branding */}
            <View style={styles.brandingSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoGlow} />
                <View style={styles.logoCircle}>
                  <Sparkles size={44} color={THEME.colors.primary[600]} />
                </View>
              </View>
              <Text style={styles.appName}>
                Cal<Text style={styles.appNameAccent}>met</Text>
              </Text>
              <Text style={styles.tagline}>
                {t("Yapay zeka destekli sağlık asistanınız")}
              </Text>
            </View>

            {/* Login Card */}
            <LiquidGlassCard variant="elevated" style={styles.loginCard}>
              {/* Web Login Button - Primary */}
              <TouchableOpacity
                style={styles.webLoginButton}
                onPress={handleWebLogin}
                activeOpacity={0.85}
              >
                <View style={styles.webLoginIcon}>
                  <Globe size={22} color="#fff" />
                </View>
                <View style={styles.webLoginContent}>
                  <Text style={styles.webLoginTitle}>{t("Web ile Giriş Yap")}</Text>
                  <Text style={styles.webLoginSubtitle}>
                    {t("Mevcut hesabınızla devam edin")}
                  </Text>
                </View>
                <ChevronRight size={20} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t("veya")}</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("E-posta")}</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIcon}>
                    <Mail size={18} color={THEME.colors.text.muted} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="ornek@email.com"
                    placeholderTextColor={THEME.colors.text.light}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("Şifre")}</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIcon}>
                    <Lock size={18} color={THEME.colors.text.muted} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor={THEME.colors.text.light}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="password"
                  />
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleEmailLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>{t("Giriş Yap")}</Text>
                <ArrowRight size={20} color="#fff" />
              </TouchableOpacity>

              {/* Register Link */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/register" as any)}
                style={styles.registerLink}
              >
                <Text style={styles.registerText}>
                  {t("Henüz hesabın yok mu?")}{" "}
                  <Text style={styles.registerTextBold}>{t("Hesap Aç")}</Text>
                </Text>
              </TouchableOpacity>
            </LiquidGlassCard>

            {/* Guest Login */}
            <TouchableOpacity
              onPress={handleGuestLogin}
              style={styles.guestButton}
              activeOpacity={0.7}
            >
              <View style={styles.guestIcon}>
                <User size={18} color={THEME.colors.text.muted} />
              </View>
              <Text style={styles.guestText}>{t("Misafir olarak devam et")}</Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              {t("Giriş yaparak")}{" "}
              <Text style={styles.termsLink}>{t("Kullanım Koşulları")}</Text>
              {" "}{t("ve")}{" "}
              <Text style={styles.termsLink}>{t("Gizlilik Politikası")}</Text>
              {t("'nı kabul etmiş olursunuz.")}
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background.primary,
  },
  loadingCard: {
    padding: 32,
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.text.secondary,
  },
  // Branding
  brandingSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    position: "relative",
    marginBottom: 20,
  },
  logoGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME.colors.primary[300],
    opacity: 0.3,
    top: -20,
    left: -20,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 32,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: THEME.colors.glass.border,
    ...THEME.shadow.lg,
  },
  appName: {
    fontSize: 38,
    fontWeight: "900",
    color: THEME.colors.text.primary,
    letterSpacing: -1,
  },
  appNameAccent: {
    color: THEME.colors.primary[600],
  },
  tagline: {
    fontSize: 15,
    color: THEME.colors.text.muted,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
  // Login Card
  loginCard: {
    padding: 24,
    gap: 20,
  },
  // Web Login Button
  webLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    padding: 16,
    gap: 14,
    ...THEME.shadow.md,
  },
  webLoginIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  webLoginContent: {
    flex: 1,
  },
  webLoginTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  webLoginSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.colors.glass.border,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "600",
    color: THEME.colors.text.muted,
  },
  // Input
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    overflow: "hidden",
  },
  inputIcon: {
    paddingLeft: 14,
  },
  textInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    fontWeight: "500",
    color: THEME.colors.text.primary,
  },
  // Login Button
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary[500],
    borderRadius: 14,
    padding: 16,
    gap: 8,
    marginTop: 4,
    ...THEME.shadow.sm,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  // Register Link
  registerLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  registerText: {
    color: THEME.colors.text.muted,
    fontWeight: "500",
    fontSize: 14,
  },
  registerTextBold: {
    color: THEME.colors.primary[700],
    fontWeight: "800",
  },
  // Guest Button
  guestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    gap: 10,
  },
  guestIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  guestText: {
    color: THEME.colors.text.secondary,
    fontSize: 15,
    fontWeight: "600",
  },
  // Terms
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.colors.text.light,
    marginTop: 24,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  termsLink: {
    color: THEME.colors.primary[600],
    fontWeight: "600",
  },
});
