import React, { useEffect, useRef } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
    ChevronLeft,
    Brain,
    Target,
    Utensils,
    FileText,
    CheckCircle,
    Sparkles,
    TrendingUp,
    Calendar,
} from "lucide-react-native";

interface LabModule {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    iconColor: string;
    iconBg: string;
    comingSoon?: boolean;
    route: string;
}

const LAB_MODULES: LabModule[] = [
    {
        id: "smart-goals",
        title: t("Akıllı Hedefleme"),
        description: t("AI destekli kişiselleştirilmiş hedefler"),
        icon: Target,
        iconColor: "#ef4444",
        iconBg: "rgba(239, 68, 68, 0.1)",
        comingSoon: true,
        route: "/(screens)/lab/smart-goals",
    },
    {
        id: "meal-plan",
        title: t("Beslenme Planı"),
        description: t("AI tarafından oluşturulan yemek planları"),
        icon: Utensils,
        iconColor: "#f59e0b",
        iconBg: "rgba(245, 158, 11, 0.1)",
        comingSoon: true,
        route: "/(screens)/lab/meal-plan",
    },
    {
        id: "reports",
        title: t("Gelişmiş Raporlar"),
        description: t("Detaylı analiz ve öneriler"),
        icon: FileText,
        iconColor: "#3b82f6",
        iconBg: "rgba(59, 130, 246, 0.1)",
        comingSoon: true,
        route: "/(screens)/lab/reports",
    },
    {
        id: "check-in",
        title: t("Günlük Check-in"),
        description: t("AI ile günlük değerlendirme"),
        icon: CheckCircle,
        iconColor: "#22c55e",
        iconBg: "rgba(34, 197, 94, 0.1)",
        comingSoon: true,
        route: "/(screens)/lab/check-in",
    },
];

function ModuleCard({ module, index }: { module: LabModule; index: number }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const delay = index * 100;
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    from: 0.9,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const router = useRouter();

    const handlePress = () => {
        if (module.comingSoon) {
            // Show coming soon alert
            return;
        }
        router.push(module.route as any);
    };

    const Icon = module.icon;

    return (
        <Animated.View
            style={[
                styles.moduleCard,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <TouchableOpacity
                style={styles.moduleCardInner}
                onPress={handlePress}
                activeOpacity={0.8}
                disabled={module.comingSoon}
            >
                <View style={[styles.moduleIcon, { backgroundColor: module.iconBg }]}>
                    <Icon size={28} color={module.iconColor} />
                </View>
                <View style={styles.moduleContent}>
                    <View style={styles.moduleHeader}>
                        <Text style={styles.moduleTitle}>{module.title}</Text>
                        {module.comingSoon && (
                            <View style={styles.comingSoonBadge}>
                                <Text style={styles.comingSoonText}>{t("Yakında")}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.moduleDescription}>{module.description}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default function LabScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <AnimatedBackground />

            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ChevronLeft size={24} color={THEME.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t("AI Lab")}</Text>
                    <View style={styles.headerIcon}>
                        <Brain size={22} color={THEME.colors.primary[600]} />
                    </View>
                </View>

                {/* Hero Section */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <View style={styles.hero}>
                        <View style={styles.heroIcon}>
                            <Sparkles size={40} color={THEME.colors.primary[600]} />
                        </View>
                        <Text style={styles.heroTitle}>{t("Yapay Zeka Laboratuvarı")}</Text>
                        <Text style={styles.heroDescription}>
                            {t("AI destekli akıllı özellikler ile yolculuğunuzu bir üst seviyeye taşıyın")}
                        </Text>
                    </View>
                </Animated.View>

                {/* Features Preview */}
                <View style={styles.featuresPreview}>
                    <View style={styles.featureItem}>
                        <TrendingUp size={16} color={THEME.colors.primary[600]} />
                        <Text style={styles.featureText}>{t("Kişiselleştirilmiş")}</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Calendar size={16} color={THEME.colors.primary[600]} />
                        <Text style={styles.featureText}>{t("7/24 Destek")}</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Brain size={16} color={THEME.colors.primary[600]} />
                        <Text style={styles.featureText}>{t("AI Destekli")}</Text>
                    </View>
                </View>

                {/* Modules Grid */}
                <ScrollView
                    style={styles.modulesScroll}
                    contentContainerStyle={styles.modulesContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>{t("Modüller")}</Text>
                    {LAB_MODULES.map((module, index) => (
                        <ModuleCard key={module.id} module={module} index={index} />
                    ))}
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
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.primary[100],
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: THEME.colors.primary[50],
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "800",
        color: THEME.colors.text.primary,
        textAlign: "center",
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: THEME.colors.primary[100],
        alignItems: "center",
        justifyContent: "center",
    },
    // Hero Section
    hero: {
        alignItems: "center",
        padding: 24,
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
    heroIcon: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: THEME.colors.primary[100],
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: THEME.colors.text.primary,
        textAlign: "center",
        marginBottom: 8,
    },
    heroDescription: {
        fontSize: 13,
        fontWeight: "500",
        color: THEME.colors.text.secondary,
        textAlign: "center",
        lineHeight: 20,
    },
    // Features Preview
    featuresPreview: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        paddingVertical: 16,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    featureText: {
        fontSize: 12,
        fontWeight: "600",
        color: THEME.colors.primary[700],
    },
    // Modules
    modulesScroll: {
        flex: 1,
        marginTop: 8,
    },
    modulesContent: {
        paddingHorizontal: 16,
        paddingBottom: 120,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: THEME.colors.text.primary,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    moduleCard: {
        marginBottom: 14,
    },
    moduleCardInner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 20,
        padding: 16,
    },
    moduleIcon: {
        width: 60,
        height: 60,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    moduleContent: {
        flex: 1,
    },
    moduleHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    moduleTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: THEME.colors.text.primary,
    },
    comingSoonBadge: {
        backgroundColor: THEME.colors.primary[100],
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    comingSoonText: {
        fontSize: 10,
        fontWeight: "700",
        color: THEME.colors.primary[700],
    },
    moduleDescription: {
        fontSize: 13,
        fontWeight: "500",
        color: THEME.colors.text.secondary,
    },
});
