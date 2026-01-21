import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AppProvider";
import { useTracker } from "@/providers/TrackerProvider";
import { getProfile, updateProfile, Profile } from "@/lib/profile";
import { t } from "@/lib/i18n";

export function OnboardingScreen({ navigation }: { navigation: any }) {
  const { user } = useAuth();
  const { theme } = useTracker();
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    if (!user?.id) return;
    getProfile(user.id).then(setProfile).catch(() => undefined);
  }, [user?.id]);

  const handleSave = async () => {
    if (!user?.id) return;
    await updateProfile(user.id, profile);
    navigation.goBack();
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Onboarding")} subtitle={t("Kişisel plan")} theme={theme} />
        <Card theme={theme} style={styles.card}>
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
            placeholder={t("Haftada kaç gün?")}
            theme={theme}
          />
          <Input
            value={profile.workoutPlace ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, workoutPlace: value }))}
            placeholder={t("Antrenman yeri")}
            theme={theme}
          />
          <Input
            value={profile.equipmentLevel ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, equipmentLevel: value }))}
            placeholder={t("Ekipman durumu")}
            theme={theme}
          />
          <Input
            value={profile.expectation ?? ""}
            onChangeText={(value) => setProfile((prev) => ({ ...prev, expectation: value }))}
            placeholder={t("Beklenti")}
            theme={theme}
          />
          <Button label={t("Onboarding Tamamla")} onPress={handleSave} theme={theme} />
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
