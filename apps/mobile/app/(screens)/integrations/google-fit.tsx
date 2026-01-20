import React, { useEffect, useRef, useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { t } from "@calai/shared";
import { AnimatedBackground } from "../../../src/components/atoms/AnimatedBackground";
import { Text } from "../../../src/components/atoms/Text";
import { THEME } from "../../../src/theme";
import {
    ChevronLeft,
    Smartphone,
    Link2,
    CheckCircle,
    AlertCircle,
    Footprints,
    Flame,
    Clock,
    RefreshCw,
} from "lucide-react-native";

interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    iconColor: string;
}

const FIT_FEATURES: FeatureItem[] = [
    {
        id: "steps",
        title: t("Adımlar"),
        description: t("Günlük adım sayısı"),
        icon: Footprints,
        iconColor: "#3b82f6",
    },
    {
        id: "calories",
        title: t("Kalori"),
        description: t("Yakılan kaloriler"),
        icon: Flame,
        iconColor: "#ef4444",
    },
    {
        id: "distance",
        title: t("Mesafe"),
        description: t("Yürünen mesafe"),
        icon: Footprints,
        iconColor: "#22c55e",
    },
    {
        id: "active-minutes",
        title: t("Aktif Dakika"),
        description: t("Fiziksel aktivite süresi"),
        icon: Clock,
        iconColor: "#f59e0b",
    },
];

function FeatureCard({ feature }: { feature: FeatureItem }) {
    const Icon = feature.icon;
    return (
        <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: `${feature.iconColor}15` }]}>
                <Icon size={20} color={feature.iconColor} />
            </View>
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <CheckCircle size={20} color={THEME.colors.semantic.success} />
        </View>
    );
}

export default function GoogleFitScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(null);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleConnect = async () => {
        if (isConnected) {
            // Disconnect
            Alert.alert(
                t("Google Fit Bağlantısını Kes"),
                t("Google Fit ile veri senkronizasyonunu durdurmak istediğinize emin misiniz?"),
                [
                    { text: t("İptal"), style: "cancel" },
                    {
                        text: t("Bağlantıyı Kes"),
                        style: "destructive",
                        onPress: () => {
                            setIsConnected(false);
                            setLastSync(null);
                        },
                    },
                ]
            );
        } else {
            // Connect (mock for now)
            setIsConnecting(true);
            setTimeout(() => {
                setIsConnecting(false);
                setIsConnected(true);
                setLastSync(new Date().toLocaleString("tr-TR"));
                Alert.alert(
                    t("Başarılı"),
                    t("Google Fit başarıyla bağlandı!")
                );
            }, 2000);
        }
    };

    const handleSync = async () => {
        if (!isConnected) return;

        Alert.alert(
            t("Senkronize Ediliyor"),
            t("Google Fit verileri çekiliyor...")
        );

        // Mock sync
        setTimeout(() => {
            setLastSync(new Date().toLocaleString("tr-TR"));
            Alert.alert(
                t("Başarılı"),
                t("Veriler senkronize edildi!")
            );
        }, 1500);
    };

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
                    <Text style={styles.headerTitle}>{t("Google Fit")}</Text>
                    <View style={styles.headerIcon}>
                        <Smartphone size={22} color="#34a853" />
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Connection Status Card */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <View
                            style={[
                                styles.statusCard,
                                isConnected
                                    ? styles.statusCardConnected
                                    : styles.statusCardDisconnected,
                            ]}
                        >
                            <View style={styles.statusHeader}>
                                <View style={styles.statusIconContainer}>
                                    {isConnected ? (
                                        <CheckCircle size={32} color="#fff" />
                                    ) : (
                                        <Link2 size={32} color="#fff" />
                                    )}
                                </View>
                                <View style={styles.statusContent}>
                                    <Text style={styles.statusTitle}>
                                        {isConnected
                                            ? t("Bağlı")
                                            : t("Bağlı Değil")}
                                    </Text>
                                    <Text style={styles.statusDescription}>
                                        {isConnected
                                            ? t("Google Fit ile senkronize")
                                            : t("Bağlantıyı başlatın")}
                                    </Text>
                                </View>
                            </View>

                            {lastSync && (
                                <View style={styles.lastSync}>
                                    <Clock size={14} color="rgba(255, 255, 255, 0.8)" />
                                    <Text style={styles.lastSyncText}>
                                        {t("Son senkronizasyon")}: {lastSync}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </Animated.View>

                    {/* Connect/Disconnect Button */}
                    <TouchableOpacity
                        style={[
                            styles.connectButton,
                            isConnected && styles.connectButtonDisconnect,
                        ]}
                        onPress={handleConnect}
                        disabled={isConnecting}
                        activeOpacity={0.8}
                    >
                        {isConnecting ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Link2 size={20} color="#fff" />
                                <Text style={styles.connectButtonText}>
                                    {isConnected ? t("Bağlantıyı Kes") : t("Google Fit'e Bağlan")}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Manual Sync Button (only show when connected) */}
                    {isConnected && (
                        <TouchableOpacity
                            style={styles.syncButton}
                            onPress={handleSync}
                            activeOpacity={0.8}
                        >
                            <RefreshCw size={18} color={THEME.colors.primary[600]} />
                            <Text style={styles.syncButtonText}>{t("Şimdi Senkronize Et")}</Text>
                        </TouchableOpacity>
                    )}

                    {/* Features Section */}
                    {isConnected && (
                        <>
                            <Text style={styles.sectionTitle}>{t("Senkronize Edilen Veriler")}</Text>
                            <View style={styles.featuresContainer}>
                                {FIT_FEATURES.map((feature) => (
                                    <FeatureCard key={feature.id} feature={feature} />
                                ))}
                            </View>
                        </>
                    )}

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <AlertCircle size={20} color={THEME.colors.semantic.warning} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>{t("Bilgi")}</Text>
                            <Text style={styles.infoText}>
                                {t("Google Fit verileri her gün otomatik olarak senkronize edilir. Aktiviteleriniz Cal AI uygulamanıza yansıtılır.")}
                            </Text>
                        </View>
                    </View>
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
        backgroundColor: "rgba(52, 168, 83, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 120,
    },
    // Status Card
    statusCard: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
    },
    statusCardConnected: {
        backgroundColor: "#22c55e",
    },
    statusCardDisconnected: {
        backgroundColor: THEME.colors.text.muted,
    },
    statusHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    statusIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    statusContent: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 4,
    },
    statusDescription: {
        fontSize: 13,
        fontWeight: "600",
        color: "rgba(255, 255, 255, 0.9)",
    },
    lastSync: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    lastSyncText: {
        fontSize: 11,
        fontWeight: "600",
        color: "rgba(255, 255, 255, 0.9)",
    },
    // Connect Button
    connectButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#34a853",
        borderRadius: 16,
        paddingVertical: 16,
        gap: 10,
        marginBottom: 12,
    },
    connectButtonDisconnect: {
        backgroundColor: "#ef4444",
    },
    connectButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    // Sync Button
    syncButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: THEME.colors.primary[200],
        borderRadius: 16,
        paddingVertical: 14,
        gap: 10,
        marginBottom: 20,
    },
    syncButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: THEME.colors.primary[700],
    },
    // Section
    sectionTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: THEME.colors.text.primary,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    // Features
    featuresContainer: {
        gap: 10,
        marginBottom: 20,
    },
    featureCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 16,
        padding: 14,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: THEME.colors.text.primary,
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: 12,
        fontWeight: "500",
        color: THEME.colors.text.secondary,
    },
    // Info Card
    infoCard: {
        flexDirection: "row",
        backgroundColor: "#fffbeb",
        borderWidth: 1,
        borderColor: "#fcd34d",
        borderRadius: 16,
        padding: 14,
        gap: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#92400e",
        marginBottom: 4,
    },
    infoText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#b45309",
        lineHeight: 18,
    },
});
