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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/providers/AuthProvider";
import { t } from "@calai/shared";
import { Sparkles, Mail, Lock } from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { Button } from "../../src/components/atoms/Button";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) return;
    await login(email, password);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: THEME.colors.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: THEME.colors.background.primary }}>
      <AnimatedBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              padding: 24,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 28,
                  backgroundColor: THEME.colors.primary[100],
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Sparkles size={40} color={THEME.colors.primary[600]} />
              </View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "900",
                  color: THEME.colors.text.primary,
                }}
              >
                Cal<Text style={{ color: THEME.colors.primary[600] }}>met</Text>
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: THEME.colors.text.muted,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {t("Yapay zeka destekli sağlık asistanınız")}
              </Text>
            </View>

            <LiquidGlassCard
              variant="elevated"
              style={{ padding: 24, gap: 16 }}
            >
              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: THEME.colors.text.primary,
                  }}
                >
                  {t("E-posta")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: THEME.colors.glass.border,
                  }}
                >
                  <Mail size={18} color={THEME.colors.text.muted} />
                  <TextInput
                    style={{
                      flex: 1,
                      padding: 12,
                      fontSize: 16,
                      color: THEME.colors.text.primary,
                    }}
                    placeholder="ornek@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: THEME.colors.text.primary,
                  }}
                >
                  {t("Şifre")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: THEME.colors.glass.border,
                  }}
                >
                  <Lock size={18} color={THEME.colors.text.muted} />
                  <TextInput
                    style={{
                      flex: 1,
                      padding: 12,
                      fontSize: 16,
                      color: THEME.colors.text.primary,
                    }}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <Button
                label={t("Giriş Yap")}
                onPress={handleLogin}
                variant="primary"
                style={{ marginTop: 8 }}
              />

              <TouchableOpacity
                onPress={() => router.push("/(auth)/register" as any)}
                style={{ alignItems: "center", marginTop: 12 }}
              >
                <Text
                  style={{ color: THEME.colors.text.muted, fontWeight: "600" }}
                >
                  {t("Henüz hesabın yok mu?")}{" "}
                  <Text
                    style={{
                      color: THEME.colors.primary[700],
                      fontWeight: "800",
                    }}
                  >
                    {t("Hesap Aç")}
                  </Text>
                </Text>
              </TouchableOpacity>
            </LiquidGlassCard>

            <TouchableOpacity
              onPress={() => login()}
              style={{ marginTop: 24, alignItems: "center" }}
            >
              <Text
                style={{
                  color: THEME.colors.text.muted,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {t("Misafir olarak devam et")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
