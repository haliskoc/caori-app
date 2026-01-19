import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { Text } from "../../src/components/atoms/Text";
import { Button } from "../../src/components/atoms/Button";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { useStore } from "../../src/store";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Scale,
  Droplets,
  User,
  Calendar,
  Dumbbell,
  MapPin,
  Heart,
  MessageCircle,
  Star,
} from "lucide-react-native";
import { calculateGoals } from "../../src/utils/calculations";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Step definitions matching web
const steps = [
  { id: 1, label: "Merhaba!", icon: User },
  { id: 2, label: "Seni tanıyalım", icon: Calendar },
  { id: 3, label: "Vücut bilgileri", icon: Scale },
  { id: 4, label: "Hedefini seç", icon: Target },
  { id: 5, label: "Spor geçmişin", icon: Dumbbell },
  { id: 6, label: "Koşulların", icon: MapPin },
  { id: 7, label: "Sağlık & güvenlik", icon: Heart },
  { id: 8, label: "Bizi nereden duydun", icon: MessageCircle },
  { id: 9, label: "Beklentin", icon: Star },
  { id: 10, label: "Hedeflerin", icon: Droplets },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const totalSteps = steps.length;
  const router = useRouter();
  const { goals, updateGoals, profile, updateProfile, updateSettings } =
    useStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (step === totalSteps) {
      const calculated = calculateGoals(profile);
      updateGoals(calculated);
    }
  }, [profile, step]);

  const animateTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      animateTransition(() => setStep(step + 1));
    } else {
      finishOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      animateTransition(() => setStep(step - 1));
    }
  };

  const finishOnboarding = async () => {
    updateSettings({ onboardingCompleted: true });
    router.replace("/(tabs)");
  };

  const currentStepInfo = steps.find((s) => s.id === step);

  const renderStep = () => {
    switch (step) {
      // Step 1: Name & Gender
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <User size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Merhaba! 👋")}</Text>
            <Text style={styles.stepDesc}>
              {t("Seni tanımaktan mutluluk duyarız.")}
            </Text>

            <LiquidGlassCard variant="subtle" style={styles.inputCard}>
              <Text style={styles.inputLabel}>{t("Adın ve Soyadın")}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t("Örn: Ahmet Yılmaz")}
                placeholderTextColor={THEME.colors.text.muted}
                value={profile.name}
                onChangeText={(val) => updateProfile({ name: val })}
              />
            </LiquidGlassCard>

            <Text style={styles.hintText}>
              {t("Sana isminle hitap etmek isteriz.")}
            </Text>

            <View style={styles.genderRow}>
              {["male", "female"].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => updateProfile({ gender: g as any })}
                  style={[
                    styles.genderBtn,
                    profile.gender === g && styles.genderBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.genderBtnText,
                      profile.gender === g && styles.genderBtnTextActive,
                    ]}
                  >
                    {g === "male" ? t("Erkek") : t("Kadın")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // Step 2: Age
      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Calendar size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Seni tanıyalım")}</Text>
            <Text style={styles.stepDesc}>
              {t("Temel ölçüleri öğrenelim.")}
            </Text>

            <LiquidGlassCard variant="subtle" style={styles.inputCard}>
              <Text style={styles.inputLabel}>{t("Yaşın kaç?")}</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="26"
                placeholderTextColor={THEME.colors.text.muted}
                value={profile.age > 0 ? profile.age.toString() : ""}
                onChangeText={(val) => updateProfile({ age: Number(val) || 0 })}
              />
            </LiquidGlassCard>
          </View>
        );

      // Step 3: Height & Weight
      case 3:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Scale size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Vücut Bilgileri")}</Text>
            <Text style={styles.stepDesc}>
              {t("Boyunu ve kilonu girerek BMI değerini görelim.")}
            </Text>

            <View style={styles.multiInputRow}>
              <LiquidGlassCard
                variant="subtle"
                style={[styles.inputCard, { flex: 1 }]}
              >
                <Text style={styles.inputLabel}>{t("Boyun kaç cm?")}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="175"
                  placeholderTextColor={THEME.colors.text.muted}
                  value={
                    profile.heightCm > 0 ? profile.heightCm.toString() : ""
                  }
                  onChangeText={(val) =>
                    updateProfile({ heightCm: Number(val) || 0 })
                  }
                />
              </LiquidGlassCard>
              <LiquidGlassCard
                variant="subtle"
                style={[styles.inputCard, { flex: 1 }]}
              >
                <Text style={styles.inputLabel}>{t("Kilon kaç kg?")}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor={THEME.colors.text.muted}
                  value={
                    profile.weightKg > 0 ? profile.weightKg.toString() : ""
                  }
                  onChangeText={(val) =>
                    updateProfile({ weightKg: Number(val) || 0 })
                  }
                />
              </LiquidGlassCard>
            </View>
          </View>
        );

      // Step 4: Main Goal
      case 4:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Target size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Hedefini Seç")}</Text>
            <Text style={styles.stepDesc}>{t("Ana odağını belirle.")}</Text>

            {[
              { value: "fat_burn", label: t("Yağ yakmak") },
              { value: "muscle_gain", label: t("Kas kazanmak") },
              { value: "fit_form", label: t("Fit & form kalmak") },
              { value: "conditioning", label: t("Kondisyon artırmak") },
              { value: "healthy", label: t("Sağlıklı yaşamak") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  updateProfile({ mainGoal: option.value as any });
                  // Map to simple goal type
                  if (option.value === "fat_burn") {
                    updateProfile({ goal: "lose" });
                  } else if (option.value === "muscle_gain") {
                    updateProfile({ goal: "gain" });
                  } else {
                    updateProfile({ goal: "maintain" });
                  }
                }}
                style={[
                  styles.optionCard,
                  profile.mainGoal === option.value && styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.mainGoal === option.value &&
                      styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
                {profile.mainGoal === option.value && (
                  <ChevronRight size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      // Step 5: Sport Level & Workout Days
      case 5:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Dumbbell size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Spor Geçmişin")}</Text>
            <Text style={styles.stepDesc}>{t("Deneyimini öğrenelim.")}</Text>

            <Text style={styles.sectionLabel}>
              {t("Spor seviyeni nasıl tanımlarsın?")}
            </Text>
            {[
              { value: "beginner", label: t("Yeni başlıyorum") },
              { value: "sometimes", label: t("Ara sıra yapıyorum") },
              { value: "regular", label: t("Düzenli yapıyorum") },
              { value: "advanced", label: t("İleri seviye") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  updateProfile({ sportLevel: option.value as any });
                  // Map to activity level
                  const mapping: Record<string, any> = {
                    beginner: "sedentary",
                    sometimes: "light",
                    regular: "moderate",
                    advanced: "active",
                  };
                  updateProfile({ activityLevel: mapping[option.value] });
                }}
                style={[
                  styles.optionCardSmall,
                  profile.sportLevel === option.value &&
                    styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.sportLevel === option.value &&
                      styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
              {t("Haftada kaç gün spor yapabilirsin?")}
            </Text>
            <View style={styles.optionRow}>
              {[
                { value: "1-2", label: "1–2 gün" },
                { value: "3-4", label: "3–4 gün" },
                { value: "5+", label: "5+ gün" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() =>
                    updateProfile({ workoutDays: option.value as any })
                  }
                  style={[
                    styles.optionChip,
                    profile.workoutDays === option.value &&
                      styles.optionChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      profile.workoutDays === option.value &&
                        styles.optionChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // Step 6: Workout Place & Equipment
      case 6:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <MapPin size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Koşulların")}</Text>
            <Text style={styles.stepDesc}>{t("Antrenman ortamı.")}</Text>

            <Text style={styles.sectionLabel}>
              {t("Nerede spor yapacaksın?")}
            </Text>
            {[
              { value: "home", label: t("Ev") },
              { value: "gym", label: t("Spor salonu") },
              { value: "outdoor", label: t("Açık alan") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() =>
                  updateProfile({ workoutPlace: option.value as any })
                }
                style={[
                  styles.optionCardSmall,
                  profile.workoutPlace === option.value &&
                    styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.workoutPlace === option.value &&
                      styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
              {t("Ekipman durumun nedir?")}
            </Text>
            {[
              { value: "none", label: t("Ekipman yok") },
              { value: "basic", label: t("Temel ekipman (dumbbell vb.)") },
              { value: "full", label: t("Tam ekipman") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() =>
                  updateProfile({ equipmentLevel: option.value as any })
                }
                style={[
                  styles.optionCardSmall,
                  profile.equipmentLevel === option.value &&
                    styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.equipmentLevel === option.value &&
                      styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      // Step 7: Health & Safety
      case 7:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Heart size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Sağlık & Güvenlik")}</Text>
            <Text style={styles.stepDesc}>{t("Sakatlık bilgisi.")}</Text>

            <Text style={styles.sectionLabel}>
              {t("Bilinen bir sakatlığın var mı?")}
            </Text>
            {[
              { value: "none", label: t("Yok") },
              { value: "knee", label: t("Diz") },
              { value: "back", label: t("Bel") },
              { value: "shoulder", label: t("Omuz") },
              { value: "other", label: t("Diğer (yaz)") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => updateProfile({ injury: option.value as any })}
                style={[
                  styles.optionCardSmall,
                  profile.injury === option.value && styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.injury === option.value && styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            {profile.injury === "other" && (
              <LiquidGlassCard
                variant="subtle"
                style={[styles.inputCard, { marginTop: 16 }]}
              >
                <Text style={styles.inputLabel}>{t("Sakatlık detayı")}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t("Sakatlık detayını yaz")}
                  placeholderTextColor={THEME.colors.text.muted}
                  value={profile.injuryDetail}
                  onChangeText={(val) => updateProfile({ injuryDetail: val })}
                />
              </LiquidGlassCard>
            )}

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
              {t("Doktorun sporla ilgili bir kısıt koydu mu?")}
            </Text>
            <View style={styles.optionRow}>
              {[
                { value: false, label: t("Hayır") },
                { value: true, label: t("Evet") },
              ].map((option) => (
                <TouchableOpacity
                  key={String(option.value)}
                  onPress={() =>
                    updateProfile({ doctorRestriction: option.value })
                  }
                  style={[
                    styles.optionChip,
                    profile.doctorRestriction === option.value &&
                      styles.optionChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      profile.doctorRestriction === option.value &&
                        styles.optionChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // Step 8: Referral Source
      case 8:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <MessageCircle size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Bizi nereden duydun?")}</Text>
            <Text style={styles.stepDesc}>
              {t("Tek soru, altın değerinde.")}
            </Text>

            {[
              { value: "instagram", label: "Instagram" },
              { value: "tiktok", label: "TikTok" },
              { value: "youtube", label: "YouTube" },
              { value: "friend", label: t("Arkadaş tavsiyesi") },
              { value: "search", label: "Google / App Store" },
              { value: "other", label: t("Diğer") },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() =>
                  updateProfile({ referralSource: option.value as any })
                }
                style={[
                  styles.optionCardSmall,
                  profile.referralSource === option.value &&
                    styles.optionCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    profile.referralSource === option.value &&
                      styles.optionTitleActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      // Step 9: Expectation
      case 9:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Star size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Beklentin")}</Text>
            <Text style={styles.stepDesc}>
              {t("Seni tanımamıza yardımcı olur.")}
            </Text>

            <LiquidGlassCard variant="subtle" style={styles.inputCard}>
              <Text style={styles.inputLabel}>
                {t("Bu uygulamadan en büyük beklentin ne?")}
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { minHeight: 100, textAlignVertical: "top" },
                ]}
                placeholder={t("Kısa not...")}
                placeholderTextColor={THEME.colors.text.muted}
                value={profile.expectation}
                onChangeText={(val) => updateProfile({ expectation: val })}
                multiline
                numberOfLines={4}
              />
            </LiquidGlassCard>
          </View>
        );

      // Step 10: Summary & Goals
      case 10:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
              <Droplets size={40} color={THEME.colors.primary[600]} />
            </View>
            <Text style={styles.stepTitle}>{t("Günlük Hedeflerin")}</Text>
            <Text style={styles.stepDesc}>
              {t(
                "Profiline göre hesapladığımız önerilen değerleri kontrol et."
              )}
            </Text>

            <LiquidGlassCard variant="elevated" style={styles.targetCard}>
              <View style={styles.targetRow}>
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>
                    {goals.calorieGoal || 2200}
                  </Text>
                  <Text style={styles.targetLabel}>kcal</Text>
                </View>
                <View style={styles.dividerV} />
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>
                    {goals.waterGoalMl || 2500}
                  </Text>
                  <Text style={styles.targetLabel}>ml Su</Text>
                </View>
              </View>

              <View style={styles.macroRow}>
                <View style={styles.macroItem}>
                  <View
                    style={[
                      styles.macroDot,
                      { backgroundColor: THEME.colors.macro.protein },
                    ]}
                  />
                  <Text style={styles.macroText}>
                    {t("Protein: {val}g", { val: goals.proteinGoalG || 150 })}
                  </Text>
                </View>
                <View style={styles.macroItem}>
                  <View
                    style={[
                      styles.macroDot,
                      { backgroundColor: THEME.colors.macro.carbs },
                    ]}
                  />
                  <Text style={styles.macroText}>
                    {t("Karb: {val}g", { val: goals.carbsGoalG || 250 })}
                  </Text>
                </View>
                <View style={styles.macroItem}>
                  <View
                    style={[
                      styles.macroDot,
                      { backgroundColor: THEME.colors.macro.fat },
                    ]}
                  />
                  <Text style={styles.macroText}>
                    {t("Yağ: {val}g", { val: goals.fatGoalG || 65 })}
                  </Text>
                </View>
              </View>
            </LiquidGlassCard>

            <Text style={styles.infoNote}>
              {t("Bu hedefleri daha sonra ayarlardan değiştirebilirsin.")}
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.topNav}>
            {step > 1 ? (
              <TouchableOpacity onPress={prevStep} style={styles.roundBtn}>
                <ChevronLeft size={24} color={THEME.colors.text.primary} />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 44 }} />
            )}

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>
                {step}/{totalSteps}
              </Text>
            </View>

            <TouchableOpacity onPress={finishOnboarding} style={styles.skipBtn}>
              <Text style={styles.skipText}>{t("Atla")}</Text>
            </TouchableOpacity>
          </View>

          {/* Step indicator pills */}
          <View style={styles.stepIndicators}>
            <Text style={styles.stepLabel}>{currentStepInfo?.label || ""}</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                flex: 1,
              }}
            >
              {renderStep()}
            </Animated.View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              label={step === totalSteps ? t("Başlayalım!") : t("İleri")}
              onPress={nextStep}
              variant="primary"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background.primary },
  safeArea: { flex: 1 },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primary[100],
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: THEME.colors.primary[500],
    borderRadius: 3,
  },
  progressText: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.text.muted,
  },
  skipBtn: { padding: 8 },
  skipText: { color: THEME.colors.text.muted, fontWeight: "700" },
  stepIndicators: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: THEME.colors.primary[600],
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  scrollContent: { flexGrow: 1, padding: 24, paddingBottom: 100 },
  stepContainer: { flex: 1, alignItems: "center" },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 32,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: THEME.colors.text.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  stepDesc: {
    fontSize: 16,
    color: THEME.colors.text.muted,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  hintText: {
    fontSize: 13,
    color: THEME.colors.text.muted,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    textAlign: "left",
    width: "100%",
    marginBottom: 12,
  },
  inputCard: { width: "100%", marginBottom: 16, padding: 20 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: THEME.colors.text.muted,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  textInput: {
    fontSize: 20,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    paddingVertical: 8,
  },
  genderRow: { flexDirection: "row", gap: 12, width: "100%", marginTop: 8 },
  genderBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  genderBtnActive: {
    backgroundColor: THEME.colors.primary[500],
    borderColor: THEME.colors.primary[500],
  },
  genderBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.text.primary,
  },
  genderBtnTextActive: { color: "#fff" },
  multiInputRow: { flexDirection: "row", gap: 12, width: "100%" },
  optionCard: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  optionCardSmall: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  optionCardActive: {
    backgroundColor: THEME.colors.primary[500],
    borderColor: THEME.colors.primary[500],
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.text.primary,
  },
  optionTitleActive: { color: "#fff" },
  optionRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    flexWrap: "wrap",
  },
  optionChip: {
    flex: 1,
    minWidth: 80,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  optionChipActive: {
    backgroundColor: THEME.colors.primary[500],
    borderColor: THEME.colors.primary[500],
  },
  optionChipText: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.text.primary,
  },
  optionChipTextActive: { color: "#fff" },
  targetCard: { width: "100%", padding: 24 },
  targetRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  targetItem: { alignItems: "center" },
  targetValue: {
    fontSize: 32,
    fontWeight: "900",
    color: THEME.colors.primary[600],
  },
  targetLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.text.muted,
  },
  dividerV: {
    width: 1,
    height: 40,
    backgroundColor: THEME.colors.primary[100],
  },
  macroRow: { gap: 12 },
  macroItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  macroDot: { width: 10, height: 10, borderRadius: 5 },
  macroText: {
    fontSize: 15,
    fontWeight: "600",
    color: THEME.colors.text.primary,
  },
  infoNote: {
    fontSize: 13,
    color: THEME.colors.text.muted,
    textAlign: "center",
    marginTop: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: "transparent",
  },
});
