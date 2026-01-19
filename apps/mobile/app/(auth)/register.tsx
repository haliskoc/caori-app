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
import { UserPlus, Mail, Lock, User, ChevronLeft } from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { Button } from "../../src/components/atoms/Button";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const { signup, isLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !name) return;
    await signup(email, name, password);
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.colors.background.primary }}>
      <AnimatedBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.8)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              padding: 24,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <View
                style={{
                  height: 72,
                  width: 72,
                  borderRadius: 24,
                  backgroundColor: THEME.colors.primary[100],
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <UserPlus size={36} color={THEME.colors.primary[600]} />
              </View>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "900",
                  color: THEME.colors.text.primary,
                }}
              >
                {t("Hesap Oluştur")}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: THEME.colors.text.muted,
                  textAlign: "center",
                  marginTop: 4,
                  paddingHorizontal: 20,
                }}
              >
                {t("Sağlıklı yaşam yolculuğuna bugün katıl.")}
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
                  {t("Ad Soyad")}
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
                  <User size={18} color={THEME.colors.text.muted} />
                  <TextInput
                    style={{
                      flex: 1,
                      padding: 12,
                      fontSize: 16,
                      color: THEME.colors.text.primary,
                    }}
                    placeholder="Adınız"
                    value={name}
                    onChangeText={setName}
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
                label={t("Şimdi Kayıt Ol")}
                onPress={() => handleRegister()}
                variant="primary"
                style={{ marginTop: 8 }}
                disabled={isLoading}
              />

              <TouchableOpacity
                onPress={() => router.push("/(auth)/login" as any)}
                style={{ alignItems: "center", marginTop: 12 }}
              >
                <Text
                  style={{ color: THEME.colors.text.muted, fontWeight: "600" }}
                >
                  {t("Zaten hesabın var mı?")}{" "}
                  <Text
                    style={{
                      color: THEME.colors.primary[700],
                      fontWeight: "800",
                    }}
                  >
                    {t("Giriş Yap")}
                  </Text>
                </Text>
              </TouchableOpacity>
            </LiquidGlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
