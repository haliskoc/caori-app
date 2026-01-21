import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/providers/AppProvider";
import { useTracker } from "@/providers/TrackerProvider";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { exportEntriesCsv, exportEntriesXls, pickCsvFile, parseEntriesFromCsv } from "@/lib/csv";
import { Input } from "@/components/ui/Input";
import { t } from "@/lib/i18n";

export function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { settings, updateSettings, theme, entries, addEntries } = useTracker();

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Ayarlar")} subtitle={t("Kişisel tercihler")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Tema")}</Text>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.muted }]}>{t("Dim Mod")}</Text>
            <Switch
              value={settings.theme.mode === "dim"}
              onValueChange={(value) => updateSettings({ theme: { mode: value ? "dim" : "light" } })}
            />
          </View>
          <View style={styles.filterRow}>
            {["emerald", "amber", "rose", "sky"].map((accent) => (
              <Pressable
                key={accent}
                onPress={() => updateSettings({ theme: { accent: accent as any } })}
                style={[
                  styles.filterChip,
                  { borderColor: theme.border },
                  settings.theme.accent === accent && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: settings.theme.accent === accent ? theme.accentText : theme.muted }}>
                  {accent.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Dil")}</Text>
          <View style={styles.filterRow}>
            {["tr", "en", "es", "fr", "ru", "pt"].map((locale) => (
              <Pressable
                key={locale}
                onPress={() => updateSettings({ locale })}
                style={[
                  styles.filterChip,
                  { borderColor: theme.border },
                  settings.locale === locale && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: settings.locale === locale ? theme.accentText : theme.muted }}>
                  {locale.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Hatırlatıcı")}</Text>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.muted }]}>{t("Günlük Hatırlatıcı")}</Text>
            <Switch
              value={settings.reminder.enabled}
              onValueChange={(value) => updateSettings({ reminder: { enabled: value } })}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.muted }]}>{t("Saat")}</Text>
            <Text style={[styles.helper, { color: theme.text }]}>{settings.reminder.time}</Text>
          </View>
          <Input
            value={settings.reminder.time}
            onChangeText={(value) => updateSettings({ reminder: { time: value } })}
            placeholder={t("HH:mm")}
            theme={theme}
          />
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Hesap")}</Text>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Profile")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Profil")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Düzenle")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Goals")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Hedefler")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Kalori, su, aktivite")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Measurements")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Ölçümler")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Kilo, bel, yağ")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("FoodLibrary")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Yemek Kütüphanesi")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Favoriler")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Sleep")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Uyku")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Kayıtlar")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Chat")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("AI Asistan")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Hızlı kayıt")}</Text>
          </Pressable>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Özellik Bayrakları")}</Text>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.muted }]}>{t("AI Görsel Tanıma")}</Text>
            <Switch
              value={settings.flags.aiVisual}
              onValueChange={(value) => updateSettings({ flags: { aiVisual: value } })}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.muted }]}>{t("Google Fit")}</Text>
            <Switch
              value={settings.flags.googleFit}
              onValueChange={(value) => updateSettings({ flags: { googleFit: value } })}
            />
          </View>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Destek")}</Text>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Help")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Yardım")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Kılavuz")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("FAQ")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("SSS")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Sık sorulan")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Contact")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("İletişim")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("Destek hattı")}</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => navigation.navigate("Legal")}>
            <Text style={[styles.linkLabel, { color: theme.text }]}>{t("Gizlilik & Şartlar")}</Text>
            <Text style={[styles.linkHint, { color: theme.muted }]}>{t("KVKK")}</Text>
          </Pressable>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Premium")}</Text>
          <Text style={[styles.helper, { color: theme.muted }]}>
            {settings.premium.active ? t("Premium Aktif") : t("Premium Pasif")}
          </Text>
          <Button label={t("Paketleri Gör")} onPress={() => navigation.navigate("Pricing")} theme={theme} />
          <Button label={t("Premium Aktivasyonu")} onPress={() => navigation.navigate("Premium")} theme={theme} variant="secondary" />
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Veri Yönetimi")}</Text>
          <Button label={t("CSV Dışa Aktar")} onPress={() => exportEntriesCsv(entries)} theme={theme} />
          <Button label={t("Excel (.xls)")} onPress={() => exportEntriesXls(entries)} theme={theme} variant="secondary" />
          <Button
            label={t("CSV İçe Aktar")}
            onPress={async () => {
              const csv = await pickCsvFile();
              if (!csv) return;
              const parsed = parseEntriesFromCsv(csv);
              await addEntries(parsed);
            }}
            theme={theme}
            variant="secondary"
          />
        </Card>

        <Button label={t("Çıkış Yap")} onPress={logout} theme={theme} variant="ghost" />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLabel: { fontFamily: "Archivo_400Regular", fontSize: 12 },
  helper: { fontFamily: "Archivo_400Regular", fontSize: 12 },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filterChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  linkRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  linkLabel: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  linkHint: { fontFamily: "Archivo_400Regular", fontSize: 11 },
});
