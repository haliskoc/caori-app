import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function PremiumScreen() {
  const { theme, settings, updateSettings } = useTracker();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const isPremium = settings.premium.active;
  const badgeStyle = useMemo(
    () => [
      styles.badge,
      {
        backgroundColor: isPremium ? theme.accentSoft : theme.card,
        borderColor: isPremium ? theme.accent : theme.border,
      },
    ],
    [isPremium, theme]
  );

  const handleActivate = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage(t("Aktivasyon kodu gerekli."));
      return;
    }
    if (trimmed.length < 6) {
      setStatus("error");
      setMessage(t("Kod en az {value} karakter olmalı.", { value: 6 }));
      return;
    }
    await updateSettings({
      premium: {
        active: true,
        code: trimmed.toUpperCase(),
        activatedAt: new Date().toISOString(),
      },
    });
    setCode("");
    setStatus("success");
    setMessage(t("Premium aktif edildi."));
  };
  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title={t("Premium")} subtitle={t("Aktivasyon")} theme={theme} />
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.text, { color: theme.muted }]}>{t("Premium kodunu girerek aktive edin.")}</Text>
          <View style={styles.badgeRow}>
            <View style={badgeStyle}>
              <Text style={[styles.badgeText, { color: isPremium ? theme.accentText : theme.muted }]}>
                {isPremium ? t("Premium Aktif") : t("Premium Pasif")}
              </Text>
            </View>
          </View>
          <Input value={code} onChangeText={setCode} placeholder={t("Aktivasyon Kodu")} theme={theme} />
          <Button label={t("Aktive Et")} onPress={handleActivate} theme={theme} />
          {message ? (
            <Text
              style={[
                styles.text,
                { color: status === "error" ? theme.danger : theme.accentText },
              ]}
            >
              {message}
            </Text>
          ) : null}
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 12 },
  card: { gap: 12 },
  text: { fontFamily: "Archivo_400Regular", fontSize: 12 },
  badgeRow: { flexDirection: "row" },
  badge: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { fontFamily: "Archivo_600SemiBold", fontSize: 11 },
});
