import React, { useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from "react-native";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react-native";
import { Text } from "./Text";
import { THEME } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TOAST_WIDTH = SCREEN_WIDTH - 32;

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onDismiss?: () => void;
}

const TOAST_CONFIG = {
    success: {
        icon: CheckCircle,
        backgroundColor: THEME.colors.semantic.success,
        iconColor: "#fff",
    },
    error: {
        icon: AlertCircle,
        backgroundColor: THEME.colors.semantic.error,
        iconColor: "#fff",
    },
    warning: {
        icon: AlertTriangle,
        backgroundColor: THEME.colors.semantic.warning,
        iconColor: "#fff",
    },
    info: {
        icon: Info,
        backgroundColor: "#3b82f6",
        iconColor: "#fff",
    },
};

export function Toast({ type, message, duration = 3000, onDismiss }: ToastProps) {
    const fadeAnim = useRef(new Animated.Value(0));
    const slideAnim = useRef(new Animated.Value(-50));
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Animate in
        Animated.parallel([
            Animated.timing(fadeAnim.current, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim.current, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto dismiss
        if (duration > 0) {
            timerRef.current = setTimeout(() => {
                handleDismiss();
            }, duration);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(fadeAnim.current, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim.current, {
                toValue: -50,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onDismiss?.();
        });
    };

    const config = TOAST_CONFIG[type];
    const Icon = config.icon;

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    backgroundColor: config.backgroundColor,
                    opacity: fadeAnim.current,
                    transform: [{ translateY: slideAnim.current }],
                },
            ]}
        >
            <View style={styles.toastContent}>
                <View style={styles.toastIcon}>
                    <Icon size={22} color={config.iconColor} />
                </View>
                <Text style={styles.toastMessage} numberOfLines={2}>
                    {message}
                </Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleDismiss}
                    activeOpacity={0.7}
                >
                    <X size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 9999,
    },
    toastContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        gap: 12,
    },
    toastIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    toastMessage: {
        flex: 1,
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        lineHeight: 20,
    },
    closeButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
});
