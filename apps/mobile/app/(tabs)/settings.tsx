import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { useStore } from "../../src/store";
import { useAuth } from "../../src/providers/AuthProvider";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import { exportEntriesToCSV, importEntriesFromCSV } from "../../src/utils/export";
import { ExportModal } from "../../src/components/organisms/ExportModal";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import {
  User,
  LogOut,
  ChevronRight,
  Bell,
  Target,
  FileDown,
  FileUp,
  Globe,
  HelpCircle,
  CreditCard,
  Moon,
  MessageCircle,
  Shield,
  Sparkles,
  Dumbbell,
  Droplets,
  Flame,
  Beef,
  Wheat,
  Cookie,
  Heart,
  Smartphone,
} from "lucide-react-native";

// Card bileşeni
function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

// Ayar satırı bileşeni
function SettingRow({
  icon: Icon,
  iconColor,
  label,
  description,
  onPress,
  rightElement,
  showChevron = true,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  label: string;
  description?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.settingIcon, { backgroundColor: `${iconColor}15` }]}>
        <Icon size={20} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      {rightElement}
      {showChevron && onPress && (
        <ChevronRight size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
}

// Hedef input bileşeni
function GoalInput({
  icon: Icon,
  iconColor,
  label,
  value,
  onChangeText,
  unit,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  unit: string;
}) {
  return (
    <View style={styles.goalInputContainer}>
      <View style={[styles.goalInputIcon, { backgroundColor: `${iconColor}15` }]}>
        <Icon size={18} color={iconColor} />
      </View>
      <View style={styles.goalInputContent}>
        <Text style={styles.goalInputLabel}>{label}</Text>
        <View style={styles.goalInputRow}>
          <TextInput
            style={styles.goalInputField}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9ca3af"
          />
          <Text style={styles.goalInputUnit}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const {
    user,
    profile,
    settings,
    updateSettings,
    entries,
    goals,
    updateGoals,
    addEntries,
  } = useStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Hedef state'leri
  const [calorieGoal, setCalorieGoal] = useState(String(goals?.calorieGoal || 2000));
  const [waterGoal, setWaterGoal] = useState(String(goals?.waterGoalMl || 2500));
  const [proteinGoal, setProteinGoal] = useState(String(goals?.proteinGoalG || 120));
  const [carbsGoal, setCarbsGoal] = useState(String(goals?.carbsGoalG || 250));
  const [fatGoal, setFatGoal] = useState(String(goals?.fatGoalG || 65));
  const [activityGoal, setActivityGoal] = useState(String(goals?.activityGoalMin || 30));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setCalorieGoal(String(goals?.calorieGoal || 2000));
    setWaterGoal(String(goals?.waterGoalMl || 2500));
    setProteinGoal(String(goals?.proteinGoalG || 120));
    setCarbsGoal(String(goals?.carbsGoalG || 250));
    setFatGoal(String(goals?.fatGoalG || 65));
    setActivityGoal(String(goals?.activityGoalMin || 30));
  }, [goals]);

  const handleExport = () => {
    if (entries.length === 0) {
      Alert.alert(t("Uyarı"), t("Dışa aktarılacak kayıt bulunamadı."));
      return;
    }
    setShowExportModal(true);
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) {
        setImporting(false);
        return;
      }

      const fileUri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(fileUri);

      // CSV parse et ve entries'e ekle
      const importedEntries = importEntriesFromCSV(content);

      if (importedEntries.length > 0) {
        await addEntries(importedEntries);
        Alert.alert(
          t("Başarılı"),
          t("{count} kayıt içe aktarıldı.", { count: importedEntries.length })
        );
      } else {
        Alert.alert(t("Uyarı"), t("CSV içinde kayıt bulunamadı."));
      }
    } catch (error) {
      console.error("Import error:", error);
      Alert.alert(t("Hata"), t("İçe aktarma başarısız oldu."));
    } finally {
      setImporting(false);
    }
  };

  const handleSaveGoals = () => {
    updateGoals({
      calorieGoal: Number(calorieGoal) || 2000,
      waterGoalMl: Number(waterGoal) || 2500,
      proteinGoalG: Number(proteinGoal) || 120,
      carbsGoalG: Number(carbsGoal) || 250,
      fatGoalG: Number(fatGoal) || 65,
      activityGoalMin: Number(activityGoal) || 30,
    });
    Alert.alert(t("Başarılı"), t("Hedefler güncellendi."));
  };

  const handleLogout = () => {
    Alert.alert(
      t("Çıkış Yap"),
      t("Hesabınızdan çıkış yapmak istediğinize emin misiniz?"),
      [
        { text: t("İptal"), style: "cancel" },
        {
          text: t("Çıkış Yap"),
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("Ayarlar")}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profil Kartı */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(screens)/profile" as any)}
          >
            <Card style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileInitial}>
                  {(user?.name || profile.name || "U").charAt(0)}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.name || profile.name || t("Kullanıcı")}
                </Text>
                <Text style={styles.profileEmail}>
                  {user?.email || "user@example.com"}
                </Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </Card>
          </TouchableOpacity>

          {/* Hedefler - Web'deki gibi detaylı */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.sectionTitle}>{t("Günlük Hedefler")}</Text>
            <Card>
              <Text style={styles.sectionSubtitle}>{t("Temel Hedefler")}</Text>
              <GoalInput
                icon={Flame}
                iconColor="#ef4444"
                label={t("Kalori Hedefi")}
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                unit="kcal"
              />
              <View style={styles.goalDivider} />
              <GoalInput
                icon={Droplets}
                iconColor="#3b82f6"
                label={t("Su Hedefi")}
                value={waterGoal}
                onChangeText={setWaterGoal}
                unit="ml"
              />
              <View style={styles.goalDivider} />
              <GoalInput
                icon={Dumbbell}
                iconColor={THEME.colors.primary[600]}
                label={t("Aktivite Hedefi")}
                value={activityGoal}
                onChangeText={setActivityGoal}
                unit="dk"
              />
            </Card>

            <Card>
              <Text style={styles.sectionSubtitle}>{t("Makro Hedefleri")}</Text>
              <GoalInput
                icon={Beef}
                iconColor="#dc2626"
                label={t("Protein")}
                value={proteinGoal}
                onChangeText={setProteinGoal}
                unit="g"
              />
              <View style={styles.goalDivider} />
              <GoalInput
                icon={Wheat}
                iconColor="#f59e0b"
                label={t("Karbonhidrat")}
                value={carbsGoal}
                onChangeText={setCarbsGoal}
                unit="g"
              />
              <View style={styles.goalDivider} />
              <GoalInput
                icon={Cookie}
                iconColor="#8b5cf6"
                label={t("Yağ")}
                value={fatGoal}
                onChangeText={setFatGoal}
                unit="g"
              />
            </Card>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoals}>
              <Text style={styles.saveButtonText}>{t("Hedefleri Kaydet")}</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Hesap Bölümü */}
          <Text style={styles.sectionTitle}>{t("Hesap")}</Text>
          <Card>
            <SettingRow
              icon={Target}
              iconColor={THEME.colors.primary[600]}
              label={t("Hedef Detayları")}
              description={t("Tüm hedeflerini düzenle")}
              onPress={() => router.push("/(screens)/goals" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={CreditCard}
              iconColor="#f59e0b"
              label={t("Premium")}
              description={t("Paket ve abonelik")}
              onPress={() => router.push("/(screens)/premium" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Moon}
              iconColor="#8b5cf6"
              label={t("Uyku Takibi")}
              description={t("Uyku kayıtları")}
              onPress={() => router.push("/(screens)/sleep" as any)}
            />
          </Card>

          {/* Uygulama Bölümü */}
          <Text style={styles.sectionTitle}>{t("Uygulama")}</Text>
          <Card>
            <SettingRow
              icon={Bell}
              iconColor={THEME.colors.primary[600]}
              label={t("Hatırlatıcılar")}
              description={t("Bildirim ayarları")}
              onPress={() => router.push("/(screens)/reminders" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Globe}
              iconColor="#3b82f6"
              label={t("Dil")}
              description={settings.locale === "tr" ? "Türkçe" : "English"}
              onPress={() => router.push("/(screens)/language" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Sparkles}
              iconColor={THEME.colors.primary[500]}
              label={t("AI Görsel Tanıma")}
              showChevron={false}
              rightElement={
                <Switch
                  value={settings.flags?.aiVisual || false}
                  onValueChange={(value) =>
                    updateSettings({
                      flags: { ...settings.flags, aiVisual: value },
                    })
                  }
                  trackColor={{
                    false: "#e5e7eb",
                    true: THEME.colors.primary[400],
                  }}
                  thumbColor={
                    settings.flags?.aiVisual
                      ? THEME.colors.primary[600]
                      : "#f4f3f4"
                  }
                />
              }
            />
          </Card>

          {/* Entegrasyonlar */}
          <Text style={styles.sectionTitle}>{t("Entegrasyonlar")}</Text>
          <Card>
            <SettingRow
              icon={Smartphone}
              iconColor="#34a853"
              label={t("Google Fit")}
              description={t("Aktivite ve adım takibi")}
              onPress={() => router.push("/(screens)/integrations/google-fit" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Heart}
              iconColor="#f59e0b"
              label={t("Apple Health")}
              description={t("Yakında")}
              onPress={undefined}
              showChevron={false}
            />
          </Card>

          {/* Veri Yönetimi - Web'deki gibi Import/Export */}
          <Text style={styles.sectionTitle}>{t("Veri Yönetimi")}</Text>
          <Card>
            <SettingRow
              icon={FileDown}
              iconColor={THEME.colors.primary[600]}
              label={exporting ? t("Dışa aktarılıyor...") : t("CSV Dışa Aktar")}
              description={t("{count} kayıt mevcut", { count: entries.length })}
              onPress={handleExport}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={FileUp}
              iconColor="#8b5cf6"
              label={importing ? t("İçe aktarılıyor...") : t("CSV İçe Aktar")}
              description={t("Yedekten geri yükle")}
              onPress={handleImport}
            />
          </Card>

          {/* Destek */}
          <Text style={styles.sectionTitle}>{t("Destek")}</Text>
          <Card>
            <SettingRow
              icon={HelpCircle}
              iconColor="#6b7280"
              label={t("Sık Sorulan Sorular")}
              onPress={() => router.push("/(screens)/faq" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={MessageCircle}
              iconColor="#6b7280"
              label={t("İletişim")}
              onPress={() => router.push("/(screens)/contact" as any)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Shield}
              iconColor="#6b7280"
              label={t("Gizlilik Politikası")}
              onPress={() => router.push("/(screens)/legal/privacy" as any)}
            />
          </Card>

          {/* Çıkış */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>{t("Çıkış Yap")}</Text>
          </TouchableOpacity>

          {/* Versiyon */}
          <Text style={styles.versionText}>Calmet AI v1.0.0</Text>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Export Modal */}
        <ExportModal
          visible={showExportModal}
          onClose={() => setShowExportModal(false)}
          entries={entries}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fffb",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16, 185, 129, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    marginBottom: 16,
    overflow: "hidden",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME.colors.primary[600],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  profileEmail: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginLeft: 70,
  },
  // Goal Input
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  goalInputIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  goalInputContent: {
    flex: 1,
  },
  goalInputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  goalInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  goalInputField: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    minWidth: 60,
    paddingVertical: 0,
  },
  goalInputUnit: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9ca3af",
    marginLeft: 4,
  },
  goalDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginLeft: 64,
  },
  saveButton: {
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    gap: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ef4444",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "#9ca3af",
    marginTop: 24,
  },
  bottomSpacing: {
    height: 40,
  },
});
