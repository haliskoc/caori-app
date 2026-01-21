import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AppProvider";
import { useTracker } from "@/providers/TrackerProvider";
import { getProfile, updateProfile, Profile } from "@/lib/profile";
import { t } from "@/lib/i18n";

export function ProfileScreen() {
  const { user } = useAuth();
  const { theme } = useTracker();
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    if (!user?.id) return;
    getProfile(user.id).then(setProfile).catch(() => undefined);
  }, [user?.id]);

  const handleSave = async () => {
    if (!user?.id) return;
    const updated = await updateProfile(user.id, profile);
    setProfile(updated);
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Profil")} subtitle={t("Kişisel bilgiler")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Input
            value={profile.fullName ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, fullName: value }))}
            placeholder={t("Ad Soyad")}
            theme={theme}
          />
          <Input
            value={profile.age?.toString() ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, age: Number(value) || undefined }))}
            placeholder={t("Yaş")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={profile.heightCm?.toString() ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, heightCm: Number(value) || undefined }))}
            placeholder={t("Boy (cm)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={profile.weightKg?.toString() ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, weightKg: Number(value) || undefined }))}
            placeholder={t("Kilo (kg)")}
            keyboardType="numeric"
            theme={theme}
          />
          <Input
            value={profile.mainGoal ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, mainGoal: value }))}
            placeholder={t("Ana hedef")}
            theme={theme}
          />
          <Input
            value={profile.sportLevel ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, sportLevel: value }))}
            placeholder={t("Spor seviyesi")}
            theme={theme}
          />
          <Input
            value={profile.workoutDays ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, workoutDays: value }))}
            placeholder={t("Haftalık antrenman günü")}
            theme={theme}
          />
          <Button label={t("Kaydet")} onPress={handleSave} theme={theme} />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
});
