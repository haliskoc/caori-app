import React, { useEffect, useRef, useMemo } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t, getDayKey } from "@calai/shared";
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
    User,
    ChevronRight,
    Target,
    Flame,
    Droplets,
    Calendar,
    Scale,
    Ruler,
    TrendingUp,
    Award,
    Zap,
    Activity,
    BarChart3,
    History,
    Brain,
    Crown,
    Check,
} from "lucide-react-native";

// Badge tanımları - Web'deki gibi
const badgeDefinitions = [
    {
        id: "streak-3",
        title: "Ateş Başlangıcı",
        description: "3 gün üst üste kayıt",
        threshold: 3,
        category: "streak",
        color: THEME.colors.primary[500],
        bgColor: THEME.colors.primary[50],
    },
    {
        id: "streak-7",
        title: "Hafta İstikrarı",
        description: "7 gün seri",
        threshold: 7,
        category: "streak",
        color: "#f59e0b",
        bgColor: "#fef3c7",
    },
    {
        id: "streak-30",
        title: "Seri Efsanesi",
        description: "30 gün kesintisiz",
        threshold: 30,
        category: "streak",
        color: "#ef4444",
        bgColor: "#fef2f2",
    },
    {
        id: "water-7",
        title: "Su İstikrarı",
        description: "7 gün su hedefi",
        threshold: 7,
        category: "water",
        color: "#3b82f6",
        bgColor: "#eff6ff",
    },
    {
        id: "activity-7",
        title: "Aktivite İstikrarı",
        description: "7 gün aktivite hedefi",
        threshold: 7,
        category: "activity",
        color: "#22c55e",
        bgColor: "#f0fdf4",
    },
    {
        id: "meal-7",
        title: "Dengeli Hafta",
        description: "7 gün tam öğün",
        threshold: 7,
        category: "meal",
        color: "#8b5cf6",
        bgColor: "#f5f3ff",
    },
];

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

// BMI Label
function getBmiLabel(bmi: number) {
    if (bmi < 18.5) return { label: t("Zayıf"), color: "#3b82f6" };
    if (bmi < 25) return { label: t("Normal"), color: THEME.colors.primary[600] };
    if (bmi < 30) return { label: t("Fazla Kilolu"), color: "#f59e0b" };
    return { label: t("Obez"), color: "#ef4444" };
}

// Badge bileşeni
function Badge({
    badge,
    progress,
    isEarned,
}: {
    badge: typeof badgeDefinitions[0];
    progress: number;
    isEarned: boolean;
}) {
    const progressPercent = Math.min(100, (progress / badge.threshold) * 100);

    return (
        <View style={[styles.badgeCard, { opacity: isEarned ? 1 : 0.5 }]}>
            <View style={[styles.badgeIcon, { backgroundColor: badge.bgColor }]}>
                {badge.category === "streak" && <Flame size={18} color={badge.color} />}
                {badge.category === "water" && <Droplets size={18} color={badge.color} />}
                {badge.category === "activity" && <Activity size={18} color={badge.color} />}
                {badge.category === "meal" && <Zap size={18} color={badge.color} />}
            </View>
            <Text style={styles.badgeTitle} numberOfLines={1}>{badge.title}</Text>
            <View style={styles.badgeProgressBg}>
                <View
                    style={[
                        styles.badgeProgressFill,
                        { width: `${progressPercent}%`, backgroundColor: badge.color }
                    ]}
                />
            </View>
            <Text style={styles.badgeProgress}>
                {progress}/{badge.threshold}
            </Text>
        </View>
    );
}

export default function ProfileTabScreen() {
    const router = useRouter();
    const {
        user,
        profile,
        entries,
        goals,
        measurements,
    } = useStore();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    // İstatistikleri hesapla
    const stats = useMemo(() => {
        const dayMap = new Map<string, { water: number; activity: number; meals: Set<string> }>();

        for (const entry of entries) {
            const dayKey = getDayKey(entry.timestamp);
            if (!dayMap.has(dayKey)) {
                dayMap.set(dayKey, { water: 0, activity: 0, meals: new Set() });
            }
            const bucket = dayMap.get(dayKey)!;

            if (entry.type === "food") {
                bucket.meals.add(entry.mealType);
            }
            if (entry.type === "water") {
                bucket.water += entry.amountMl;
            }
            if (entry.type === "activity") {
                bucket.activity += entry.durationMin;
            }
        }

        const dayKeys = Array.from(dayMap.keys()).sort();
        const daySet = new Set(dayKeys);

        // Streak hesapla
        const getStreak = (targetDays: Set<string>) => {
            let streak = 0;
            let cursor = new Date();
            while (targetDays.has(getDayKey(cursor))) {
                streak++;
                cursor = new Date(cursor.getTime() - 86400000);
            }
            return streak;
        };

        // Su hedefi günleri
        const waterGoalDays = new Set<string>();
        const activityGoalDays = new Set<string>();
        const mealGoalDays = new Set<string>();

        for (const [key, bucket] of dayMap) {
            if (goals?.waterGoalMl && bucket.water >= goals.waterGoalMl) {
                waterGoalDays.add(key);
            }
            if (goals?.activityGoalMin && bucket.activity >= goals.activityGoalMin) {
                activityGoalDays.add(key);
            }
            if (goals?.mealGoalCount && bucket.meals.size >= goals.mealGoalCount) {
                mealGoalDays.add(key);
            }
        }

        return {
            totalEntries: entries.length,
            daysCount: daySet.size,
            currentStreak: getStreak(daySet),
            waterStreak: getStreak(waterGoalDays),
            activityStreak: getStreak(activityGoalDays),
            mealStreak: getStreak(mealGoalDays),
        };
    }, [entries, goals]);

    // Profil tamamlama yüzdesi
    const profileCompletion = useMemo(() => {
        const fields = [
            profile.age,
            profile.heightCm,
            profile.weightKg,
            profile.mainGoal,
            profile.sportLevel,
        ];
        const filled = fields.filter(f => f && String(f).trim()).length;
        return Math.round((filled / fields.length) * 100);
    }, [profile]);

    // BMI hesapla
    const bmiData = useMemo(() => {
        const heightCm = Number(profile.heightCm);
        const weightKg = Number(profile.weightKg);
        if (heightCm > 0 && weightKg > 0) {
            const bmi = weightKg / Math.pow(heightCm / 100, 2);
            return { value: bmi.toFixed(1), ...getBmiLabel(bmi) };
        }
        return null;
    }, [profile]);

    const latestWeight = useMemo(() => {
        const weightMeasurements = measurements.filter(m => m.type === "weight");
        if (weightMeasurements.length === 0) return null;
        return weightMeasurements.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0]?.value || null;
    }, [measurements]);

    // Badge progress
    const badgeProgress = {
        streak: stats.currentStreak,
        water: stats.waterStreak,
        activity: stats.activityStreak,
        meal: stats.mealStreak,
    };

    return (
        <View style={styles.container}>
            <AnimatedBackground />

            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t("Profil")}</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profil Kartı */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Card style={styles.profileCard}>
                            <View style={styles.profileTop}>
                                <View style={styles.profileAvatarContainer}>
                                    <View style={styles.profileAvatar}>
                                        <Text style={styles.profileInitial}>
                                            {(user?.name || profile.name || "U").charAt(0)}
                                        </Text>
                                    </View>
                                    <View style={styles.profileBadge}>
                                        <Award size={12} color="#fff" />
                                    </View>
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>
                                        {user?.name || profile.name || t("Kullanıcı")}
                                    </Text>
                                    <Text style={styles.profileEmail}>
                                        {user?.email || "user@example.com"}
                                    </Text>
                                    <View style={styles.planBadge}>
                                        <Text style={styles.planBadgeText}>{t("Ücretsiz")}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Profil Tamamlama - Web'deki gibi */}
                            <View style={styles.completionContainer}>
                                <View style={styles.completionHeader}>
                                    <Text style={styles.completionLabel}>{t("Profil Tamamlama")}</Text>
                                    <Text style={styles.completionPercent}>%{profileCompletion}</Text>
                                </View>
                                <View style={styles.completionBarBg}>
                                    <View style={[styles.completionBarFill, { width: `${profileCompletion}%` }]} />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => router.push("/(screens)/profile" as any)}
                            >
                                <Text style={styles.editButtonText}>{t("Düzenle")}</Text>
                                <ChevronRight size={16} color={THEME.colors.primary[700]} />
                            </TouchableOpacity>
                        </Card>
                    </Animated.View>

                    {/* BMI Kartı - Web'deki gibi */}
                    {bmiData && (
                        <Card style={styles.bmiCard}>
                            <View style={styles.bmiContent}>
                                <View style={[styles.bmiIcon, { backgroundColor: `${bmiData.color}15` }]}>
                                    <Scale size={20} color={bmiData.color} />
                                </View>
                                <View style={styles.bmiInfo}>
                                    <Text style={styles.bmiLabel}>{t("Vücut Kitle İndeksi (BMI)")}</Text>
                                    <View style={styles.bmiValueRow}>
                                        <Text style={styles.bmiValue}>{bmiData.value}</Text>
                                        <View style={[styles.bmiStatusBadge, { backgroundColor: `${bmiData.color}15` }]}>
                                            <Text style={[styles.bmiStatusText, { color: bmiData.color }]}>
                                                {bmiData.label}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}

                    {/* Weekly Charts Link */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push("/(screens)/weekly" as any)}
                    >
                        <Card style={styles.weeklyCard}>
                            <View style={styles.weeklyIcon}>
                                <BarChart3 size={28} color={THEME.colors.primary[600]} />
                            </View>
                            <View style={styles.weeklyInfo}>
                                <Text style={styles.weeklyTitle}>{t("Haftalık Grafikler")}</Text>
                                <Text style={styles.weeklySubtitle}>
                                    {t("Son 7 günlük detaylı analiz")}
                                </Text>
                            </View>
                            <ChevronRight size={22} color={THEME.colors.primary[600]} />
                        </Card>
                    </TouchableOpacity>

                    {/* İstatistik Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Flame size={20} color="#f59e0b" />
                            <Text style={styles.statValue}>{stats.currentStreak}</Text>
                            <Text style={styles.statLabel}>{t("Gün Seri")}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Calendar size={20} color={THEME.colors.primary[600]} />
                            <Text style={styles.statValue}>{stats.daysCount}</Text>
                            <Text style={styles.statLabel}>{t("Kayıtlı Gün")}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Target size={20} color="#3b82f6" />
                            <Text style={styles.statValue}>{stats.totalEntries}</Text>
                            <Text style={styles.statLabel}>{t("Toplam Kayıt")}</Text>
                        </View>
                    </View>

                    {/* History Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push("/(screens)/history" as any)}
                    >
                        <Card style={styles.featureCard}>
                            <View style={[styles.featureIcon, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
                                <History size={24} color="#3b82f6" />
                            </View>
                            <View style={styles.featureInfo}>
                                <Text style={styles.featureTitle}>{t("Geçmiş Kayıtlar")}</Text>
                                <Text style={styles.featureSubtitle}>
                                    {t("Tüm kayıtlarınızı görüntüleyin")}
                                </Text>
                            </View>
                            <ChevronRight size={20} color="#9ca3af" />
                        </Card>
                    </TouchableOpacity>

                    {/* Lab Modules Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push("/(screens)/lab" as any)}
                    >
                        <Card style={styles.featureCard}>
                            <View style={[styles.featureIcon, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
                                <Brain size={24} color="#8b5cf6" />
                            </View>
                            <View style={styles.featureInfo}>
                                <Text style={styles.featureTitle}>{t("AI Lab")}</Text>
                                <Text style={styles.featureSubtitle}>
                                    {t("Akıllı hedefleme ve beslenme planı")}
                                </Text>
                            </View>
                            <ChevronRight size={20} color="#9ca3af" />
                        </Card>
                    </TouchableOpacity>

                    {/* Premium Upgrade Card - Only for free users */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push("/(screens)/premium" as any)}
                    >
                        <Card style={styles.premiumCard}>
                            <View style={styles.premiumHeader}>
                                <View style={styles.premiumIcon}>
                                    <Crown size={28} color="#f59e0b" />
                                </View>
                                <View style={styles.premiumInfo}>
                                    <Text style={styles.premiumTitle}>{t("Premium'a Geç")}</Text>
                                    <Text style={styles.premiumSubtitle}>
                                        {t("Sınırsız AI ve detaylı raporlar")}
                                    </Text>
                                </View>
                                <ChevronRight size={20} color="#f59e0b" />
                            </View>
                            <View style={styles.premiumFeatures}>
                                <View style={styles.premiumFeature}>
                                    <Check size={14} color={THEME.colors.primary[600]} />
                                    <Text style={styles.premiumFeatureText}>{t("Sınırsız AI Asistan")}</Text>
                                </View>
                                <View style={styles.premiumFeature}>
                                    <Check size={14} color={THEME.colors.primary[600]} />
                                    <Text style={styles.premiumFeatureText}>{t("Detaylı Raporlar")}</Text>
                                </View>
                                <View style={styles.premiumFeature}>
                                    <Check size={14} color={THEME.colors.primary[600]} />
                                    <Text style={styles.premiumFeatureText}>{t("Özel Makro Hedefleri")}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>

                    {/* Başarılar (Badges) - Web'deki gibi */}
                    <Text style={styles.sectionTitle}>{t("Başarılar")}</Text>
                    <View style={styles.badgesGrid}>
                        {badgeDefinitions.map((badge) => {
                            const progress = badgeProgress[badge.category as keyof typeof badgeProgress] || 0;
                            const isEarned = progress >= badge.threshold;
                            return (
                                <Badge
                                    key={badge.id}
                                    badge={badge}
                                    progress={progress}
                                    isEarned={isEarned}
                                />
                            );
                        })}
                    </View>

                    {/* Fiziksel Bilgiler */}
                    <Text style={styles.sectionTitle}>{t("Fiziksel Bilgiler")}</Text>
                    <Card>
                        <View style={styles.physicalGrid}>
                            <View style={styles.physicalItem}>
                                <View style={styles.physicalIcon}>
                                    <Scale size={18} color={THEME.colors.primary[600]} />
                                </View>
                                <View>
                                    <Text style={styles.physicalLabel}>{t("Kilo")}</Text>
                                    <Text style={styles.physicalValue}>
                                        {latestWeight ? `${latestWeight} kg` : profile.weightKg ? `${profile.weightKg} kg` : "-"}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.physicalDivider} />
                            <View style={styles.physicalItem}>
                                <View style={styles.physicalIcon}>
                                    <Ruler size={18} color={THEME.colors.primary[600]} />
                                </View>
                                <View>
                                    <Text style={styles.physicalLabel}>{t("Boy")}</Text>
                                    <Text style={styles.physicalValue}>
                                        {profile.heightCm ? `${profile.heightCm} cm` : "-"}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.physicalDivider} />
                            <View style={styles.physicalItem}>
                                <View style={styles.physicalIcon}>
                                    <User size={18} color={THEME.colors.primary[600]} />
                                </View>
                                <View>
                                    <Text style={styles.physicalLabel}>{t("Yaş")}</Text>
                                    <Text style={styles.physicalValue}>
                                        {profile.age ? `${profile.age}` : "-"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Card>

                    {/* Hedeflerim */}
                    <Text style={styles.sectionTitle}>{t("Günlük Hedefler")}</Text>
                    <Card>
                        <TouchableOpacity
                            style={styles.goalRow}
                            onPress={() => router.push("/(screens)/goals" as any)}
                        >
                            <View style={styles.goalInfo}>
                                <View style={[styles.goalIcon, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
                                    <TrendingUp size={18} color={THEME.colors.primary[600]} />
                                </View>
                                <View>
                                    <Text style={styles.goalLabel}>{t("Kalori Hedefi")}</Text>
                                    <Text style={styles.goalValue}>
                                        {goals?.calorieGoal || 2000} kcal
                                    </Text>
                                </View>
                            </View>
                            <ChevronRight size={20} color="#9ca3af" />
                        </TouchableOpacity>
                        <View style={styles.goalDivider} />
                        <View style={styles.goalRow}>
                            <View style={styles.goalInfo}>
                                <View style={[styles.goalIcon, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
                                    <Droplets size={18} color="#3b82f6" />
                                </View>
                                <View>
                                    <Text style={styles.goalLabel}>{t("Su Hedefi")}</Text>
                                    <Text style={styles.goalValue}>
                                        {Math.round((goals?.waterGoalMl || 2500) / 1000)} L
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Card>

                    {/* Ölçüm Takibi */}
                    <Text style={styles.sectionTitle}>{t("Ölçüm Takibi")}</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push("/(screens)/measurements" as any)}
                    >
                        <Card style={styles.measurementCard}>
                            <View style={styles.measurementIcon}>
                                <Scale size={24} color={THEME.colors.primary[600]} />
                            </View>
                            <View style={styles.measurementInfo}>
                                <Text style={styles.measurementTitle}>{t("Kilo & Ölçüm Takibi")}</Text>
                                <Text style={styles.measurementSubtitle}>
                                    {measurements.length > 0
                                        ? t("{count} kayıt mevcut", { count: measurements.length })
                                        : t("Ölçümlerinizi takip edin")}
                                </Text>
                            </View>
                            <ChevronRight size={20} color="#9ca3af" />
                        </Card>
                    </TouchableOpacity>

                    <View style={styles.bottomSpacing} />
                </ScrollView>
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
        padding: 20,
        marginBottom: 16,
    },
    profileCard: {},
    profileTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    profileAvatarContainer: {
        position: "relative",
        marginRight: 16,
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: THEME.colors.primary[100],
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    profileInitial: {
        fontSize: 28,
        fontWeight: "700",
        color: THEME.colors.primary[600],
    },
    profileBadge: {
        position: "absolute",
        bottom: -4,
        right: -4,
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: THEME.colors.primary[500],
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
    },
    profileEmail: {
        fontSize: 13,
        fontWeight: "500",
        color: "#6b7280",
        marginTop: 2,
    },
    planBadge: {
        backgroundColor: THEME.colors.primary[50],
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginTop: 8,
    },
    planBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: THEME.colors.primary[700],
    },
    // Completion Bar
    completionContainer: {
        marginBottom: 16,
    },
    completionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    completionLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6b7280",
    },
    completionPercent: {
        fontSize: 12,
        fontWeight: "700",
        color: THEME.colors.primary[600],
    },
    completionBarBg: {
        height: 8,
        borderRadius: 4,
        backgroundColor: THEME.colors.primary[100],
    },
    completionBarFill: {
        height: 8,
        borderRadius: 4,
        backgroundColor: THEME.colors.primary[500],
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 14,
        paddingVertical: 12,
        gap: 6,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: THEME.colors.primary[700],
    },
    // BMI Card
    bmiCard: {
        backgroundColor: "#fff",
    },
    // Weekly Card
    weeklyCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: THEME.colors.primary[50] + "30",
        borderWidth: 2,
        borderColor: THEME.colors.primary[200],
    },
    weeklyIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: THEME.colors.primary[100],
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    weeklyInfo: {
        flex: 1,
    },
    weeklyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: THEME.colors.text.primary,
        marginBottom: 2,
    },
    weeklySubtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: THEME.colors.text.muted,
    },
    bmiContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    bmiIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    bmiInfo: {
        flex: 1,
    },
    bmiLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6b7280",
    },
    bmiValueRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 4,
    },
    bmiValue: {
        fontSize: 24,
        fontWeight: "900",
        color: "#111827",
    },
    bmiStatusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    bmiStatusText: {
        fontSize: 12,
        fontWeight: "700",
    },
    // Stats Grid
    statsGrid: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 20,
        padding: 16,
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "900",
        color: "#111827",
        marginTop: 8,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#6b7280",
        marginTop: 4,
    },
    // Badges
    badgesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    badgeCard: {
        width: "30%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
    },
    badgeIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    badgeTitle: {
        fontSize: 10,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 6,
    },
    badgeProgressBg: {
        width: "100%",
        height: 4,
        borderRadius: 2,
        backgroundColor: "#f3f4f6",
        marginBottom: 4,
    },
    badgeProgressFill: {
        height: 4,
        borderRadius: 2,
    },
    badgeProgress: {
        fontSize: 9,
        fontWeight: "600",
        color: "#9ca3af",
    },
    // Section
    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    // Physical Info
    physicalGrid: {
        flexDirection: "row",
        alignItems: "center",
    },
    physicalItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    physicalIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: THEME.colors.primary[50],
        alignItems: "center",
        justifyContent: "center",
    },
    physicalLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#6b7280",
    },
    physicalValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginTop: 2,
    },
    physicalDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#f3f4f6",
        marginHorizontal: 8,
    },
    // Goals
    goalRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    goalInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    goalIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    goalLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6b7280",
    },
    goalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginTop: 2,
    },
    goalDivider: {
        height: 1,
        backgroundColor: "#f3f4f6",
        marginVertical: 16,
        marginLeft: 58,
    },
    // Measurement Card
    measurementCard: {
        flexDirection: "row",
        alignItems: "center",
    },
    measurementIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: THEME.colors.primary[50],
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    measurementInfo: {
        flex: 1,
    },
    measurementTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },
    measurementSubtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6b7280",
        marginTop: 2,
    },
    bottomSpacing: {
        height: 40,
    },
    // Feature Cards (History, Lab)
    featureCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    featureIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    featureInfo: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    featureSubtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6b7280",
        marginTop: 2,
    },
    // Premium Card
    premiumCard: {
        backgroundColor: "#fef3c7",
        borderWidth: 2,
        borderColor: "#f59e0b",
        marginBottom: 12,
    },
    premiumHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    premiumIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    premiumInfo: {
        flex: 1,
    },
    premiumTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#92400e",
    },
    premiumSubtitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#b45309",
        marginTop: 2,
    },
    premiumFeatures: {
        gap: 8,
    },
    premiumFeature: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    premiumFeatureText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#78350f",
    },
});
