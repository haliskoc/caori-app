import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { THEME } from "../../theme";

interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: any;
    variant?: "rect" | "circle";
    backgroundColor?: string;
    highlightColor?: string;
}

const DEFAULT_BACKGROUND = THEME.colors.primary[100];
const DEFAULT_HIGHLIGHT = THEME.colors.primary[50];

export function Skeleton({
    width = "100%",
    height = 20,
    borderRadius = 4,
    style,
    variant = "rect",
    backgroundColor = DEFAULT_BACKGROUND,
    highlightColor = DEFAULT_HIGHLIGHT,
}: SkeletonProps) {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmerAnimation = Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        shimmerAnimation.start();

        return () => shimmerAnimation.stop();
    }, []);

    const interpolateColor = shimmerAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [backgroundColor, highlightColor, backgroundColor],
    });

    const finalStyle = {
        width,
        height,
        borderRadius: variant === "circle" ? height / 2 : borderRadius,
        backgroundColor: interpolateColor,
    };

    return (
        <Animated.View style={[styles.skeleton, finalStyle, style]} />
    );
}

// Preset Skeleton Components

export function CardSkeleton({ style }: { style?: any }) {
    return (
        <View style={[styles.cardSkeleton, style]}>
            <View style={styles.cardHeader}>
                <Skeleton
                    width={48}
                    height={48}
                    variant="circle"
                    style={styles.avatar}
                />
                <View style={styles.cardHeaderText}>
                    <Skeleton width={120} height={16} />
                    <Skeleton width={80} height={12} marginTop={8} />
                </View>
            </View>
            <View style={styles.cardBody}>
                <Skeleton width="100%" height={12} />
                <Skeleton width="80%" height={12} marginTop={8} />
                <Skeleton width="60%" height={12} marginTop={8} />
            </View>
        </View>
    );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <View style={styles.listSkeleton}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index} style={styles.listItem}>
                    <Skeleton width={40} height={40} variant="circle" />
                    <View style={styles.listItemContent}>
                        <Skeleton width={150} height={14} />
                        <Skeleton width={100} height={12} marginTop={6} />
                    </View>
                </View>
            ))}
        </View>
    );
}

export function TextSkeleton({ width, lines = 1 }: { width?: number | string; lines?: number }) {
    return (
        <View style={styles.textSkeleton}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    width={width || (index === lines - 1 ? "60%" : "100%")}
                    height={14}
                    marginTop={index > 0 ? 6 : 0}
                />
            ))}
        </View>
    );
}

export function AvatarSkeleton({ size = 40 }: { size?: number }) {
    return <Skeleton width={size} height={size} variant="circle" />;
}

export function StatsGridSkeleton() {
    return (
        <View style={styles.statsGrid}>
            {[1, 2, 3].map((index) => (
                <View key={index} style={styles.statCard}>
                    <Skeleton width={24} height={24} />
                    <Skeleton width={40} height={20} marginTop={8} />
                    <Skeleton width={60} height={10} marginTop={4} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    skeleton: {
        overflow: "hidden",
    },
    cardSkeleton: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        marginRight: 12,
    },
    cardHeaderText: {
        flex: 1,
    },
    cardBody: {
        gap: 8,
    },
    listSkeleton: {
        gap: 12,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
    listItemContent: {
        flex: 1,
        marginLeft: 12,
    },
    textSkeleton: {
        gap: 6,
    },
    statsGrid: {
        flexDirection: "row",
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: THEME.colors.primary[100],
    },
});
