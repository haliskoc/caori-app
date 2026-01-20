import React, { useEffect, useRef, useState } from "react";
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
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
    ChevronLeft,
    Filter,
    Flame,
    Droplet,
    Activity,
    Apple,
    Calendar,
} from "lucide-react-native";

type EntryType = "all" | "food" | "water" | "activity";

function EntryCard({ entry, onPress }: { entry: any; onPress: () => void }) {
    const getIcon = () => {
        switch (entry.type) {
            case "food":
                return <Apple size={20} color={THEME.colors.semantic.warning} />;
            case "water":
                return <Droplet size={20} color="#3b82f6" />;
            case "activity":
                return <Activity size={20} color={THEME.colors.semantic.success} />;
            default:
                return <Flame size={20} color={THEME.colors.primary[500]} />;
        }
    };

    const getDetails = () => {
        switch (entry.type) {
            case "food":
                return `${entry.calories || 0} kcal`;
            case "water":
                return `${entry.amountMl || 0} ml`;
            case "activity":
                return `${entry.durationMin || 0} dk • ${entry.estimatedCalories || 0} kcal`;
            default:
                return "-";
        }
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <TouchableOpacity
            style={styles.entryCard}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.entryIcon}>{getIcon()}</View>
            <View style={styles.entryContent}>
                <View style={styles.entryHeader}>
                    <Text style={styles.entryName} numberOfLines={1}>
                        {entry.name || entry.activityType || t("Kayıt")}
                    </Text>
                    <Text style={styles.entryDate}>{formatDate(entry.timestamp)}</Text>
                </View>
                <Text style={styles.entryDetails}>{getDetails()}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function HistoryScreen() {
    const router = useRouter();
    const { entries } = useStore();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [filter, setFilter] = useState<EntryType>("all");
    const [filteredEntries, setFilteredEntries] = useState(entries);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        if (filter === "all") {
            setFilteredEntries(entries);
        } else {
            setFilteredEntries(entries.filter((e) => e.type === filter));
        }
    }, [filter, entries]);

    const sortedEntries = [...filteredEntries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const getFilterLabel = (type: EntryType) => {
        switch (type) {
            case "all":
                return t("Tümü");
            case "food":
                return t("Yiyecek");
            case "water":
                return t("Su");
            case "activity":
                return t("Aktivite");
        }
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
                    <Text style={styles.headerTitle}>{t("Geçmiş Kayıtlar")}</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Filter Pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filterScroll}
                    contentContainerStyle={styles.filterContainer}
                >
                    {(["all", "food", "water", "activity"] as EntryType[]).map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.filterPill,
                                filter === type && styles.filterPillActive,
                            ]}
                            onPress={() => setFilter(type)}
                            activeOpacity={0.8}
                        >
                            <Filter
                                size={16}
                                color={filter === type ? "#fff" : THEME.colors.text.muted}
                            />
                            <Text
                                style={[
                                    styles.filterPillText,
                                    filter === type && styles.filterPillTextActive,
                                ]}
                            >
                                {getFilterLabel(type)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Entries List */}
                <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                    <ScrollView
                        style={styles.entriesScroll}
                        contentContainerStyle={styles.entriesContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {sortedEntries.length > 0 ? (
                            sortedEntries.map((entry) => (
                                <EntryCard
                                    key={entry.id}
                                    entry={entry}
                                    onPress={() => {}}
                                />
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Calendar size={48} color={THEME.colors.text.muted} />
                                <Text style={styles.emptyTitle}>{t("Kayıt Bulunamadı")}</Text>
                                <Text style={styles.emptyText}>
                                    {t("Bu filtre için kayıt yok")}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </Animated.View>
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
    headerSpacer: {
        width: 40,
    },
    // Filter Pills
    filterScroll: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    filterContainer: {
        gap: 10,
        paddingRight: 16,
    },
    filterPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
    filterPillActive: {
        backgroundColor: THEME.colors.primary[600],
        borderColor: THEME.colors.primary[500],
    },
    filterPillText: {
        fontSize: 13,
        fontWeight: "600",
        color: THEME.colors.text.secondary,
    },
    filterPillTextActive: {
        color: "#fff",
    },
    // Entries List
    entriesScroll: {
        flex: 1,
        paddingTop: 16,
    },
    entriesContent: {
        paddingHorizontal: 16,
        paddingBottom: 120,
        gap: 10,
    },
    entryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
        borderRadius: 16,
        padding: 14,
    },
    entryIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: THEME.colors.primary[50],
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    entryContent: {
        flex: 1,
    },
    entryHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    entryName: {
        flex: 1,
        fontSize: 15,
        fontWeight: "700",
        color: THEME.colors.text.primary,
    },
    entryDate: {
        fontSize: 11,
        fontWeight: "600",
        color: THEME.colors.text.muted,
    },
    entryDetails: {
        fontSize: 13,
        fontWeight: "500",
        color: THEME.colors.text.secondary,
    },
    // Empty State
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: THEME.colors.text.primary,
        marginTop: 16,
    },
    emptyText: {
        fontSize: 13,
        fontWeight: "500",
        color: THEME.colors.text.muted,
        marginTop: 4,
    },
});
