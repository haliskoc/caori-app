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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/providers/AuthProvider";
import { t } from "@calai/shared";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ChevronLeft,
  Globe,
  ArrowRight,
  Check,
} from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useRouter } from "expo-router";
import { loginWithWeb } from "../../src/lib/auth/web-auth";
import { useStore } from "../../src/store";

export default function RegisterScreen() {
  const { signup, isLoading } = useAuth();
  const router = useRouter();
  const { setUser } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webLoading, setWebLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !name) {
      Alert.alert(t("Hata"), t("Lütfen tüm alanları doldurun."));
      return;
    }
    if (password.length < 6) {
      Alert.alert(t("Hata"), t("Şifre en az 6 karakter olmalıdır."));
      return;
    }
    await signup(email, name, password);
    router.replace("/onboarding" as any);
  };

  const handleWebRegister = async () => {
    setWebLoading(true);
    try {
      const result = await loginWithWeb();
      if (result.success && result.user) {
        setUser(result.user);
        router.replace("/onboarding" as any);
      } else {
        Alert.alert(t("Hata"), result.error || t("Bir hata oluştu."));
      }
    } catch (error) {
      Alert.alert(t("Hata"), t("Bağlantı hatası oluştu."));
    } finally {
      setWebLoading(false);
    }
  };

  if (isLoading || webLoading) {
    return (
      <View style={styles.loadingContainer}>
        <AnimatedBackground />
        <LiquidGlassCard variant="elevated" style={styles.loadingCard}>
          <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
          <Text style={styles.loadingText}>{t("Hesap oluşturuluyor...")}</Text>
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
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ChevronLeft size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Branding */}
            <View style={styles.brandingSection}>
              <View style={styles.iconContainer}>
                <View style={styles.iconGlow} />
                <View style={styles.iconCircle}>
                  <UserPlus size={40} color={THEME.colors.primary[600]} />
                </View>
              </View>
              <Text style={styles.title}>{t("Hesap Oluştur")}</Text>
              <Text style={styles.subtitle}>
                {t("Sağlıklı yaşam yolculuğuna bugün başla")}
              </Text>
            </View>

            {/* Registration Card */}
            <LiquidGlassCard variant="elevated" style={styles.registerCard}>
              {/* Web Register Button */}
              <TouchableOpacity
                style={styles.webButton}
                onPress={handleWebRegister}
                activeOpacity={0.85}
              >
                <View style={styles.webButtonIcon}>
                  <Globe size={22} color="#fff" />
                </View>
                <View style={styles.webButtonContent}>
                  <Text style={styles.webButtonTitle}>{t("Web ile Kayıt Ol")}</Text>
                  <Text style={styles.webButtonSubtitle}>
                    {t("Hızlı ve güvenli kayıt")}
                  </Text>
                </View>
                <ArrowRight size={20} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t("veya e-posta ile")}</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("Ad Soyad")}</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIcon}>
                    <User size={18} color={THEME.colors.text.muted} />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t("Adınız Soyadınız")}
                    placeholderTextColor={THEME.colors.text.light}
                    value={name}
                    onChangeText={setName}
                    autoComplete="name"
                  />
                </View>
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
                    autoComplete="new-password"
                  />
                </View>
                <Text style={styles.passwordHint}>{t("En az 6 karakter")}</Text>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.85}
              >
                <Text style={styles.registerButtonText}>{t("Kayıt Ol")}</Text>
                <Check size={20} color="#fff" />
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/login" as any)}
                style={styles.loginLink}
              >
                <Text style={styles.loginText}>
                  {t("Zaten hesabın var mı?")}{" "}
                  <Text style={styles.loginTextBold}>{t("Giriş Yap")}</Text>
                </Text>
              </TouchableOpacity>
            </LiquidGlassCard>

            {/* Terms */}
            <Text style={styles.termsText}>
              {t("Kayıt olarak")}{" "}
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 8,
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
    marginBottom: 28,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 16,
  },
  iconGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.primary[300],
    opacity: 0.25,
    top: -14,
    left: -14,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: THEME.colors.glass.border,
    ...THEME.shadow.md,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: THEME.colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: THEME.colors.text.muted,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
  // Register Card
  registerCard: {
    padding: 24,
    gap: 18,
  },
  // Web Button
  webButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    padding: 16,
    gap: 14,
    ...THEME.shadow.md,
  },
  webButtonIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  webButtonContent: {
    flex: 1,
  },
  webButtonTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  webButtonSubtitle: {
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
    fontSize: 12,
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
  passwordHint: {
    fontSize: 12,
    color: THEME.colors.text.light,
    marginLeft: 4,
    fontWeight: "500",
  },
  // Register Button
  registerButton: {
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
  registerButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  // Login Link
  loginLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  loginText: {
    color: THEME.colors.text.muted,
    fontWeight: "500",
    fontSize: 14,
  },
  loginTextBold: {
    color: THEME.colors.primary[700],
    fontWeight: "800",
  },
  // Terms
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: THEME.colors.text.light,
    marginTop: 24,
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  termsLink: {
    color: THEME.colors.primary[600],
    fontWeight: "600",
  },
});
