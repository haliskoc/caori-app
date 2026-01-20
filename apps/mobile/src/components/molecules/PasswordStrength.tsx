import React, { useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Check, X } from "lucide-react-native";
import { Text } from "../atoms/Text";
import { THEME } from "../../theme";

export interface PasswordStrengthProps {
    password: string;
    showRequirements?: boolean;
}

interface Requirement {
    id: string;
    label: string;
    check: (password: string) => boolean;
}

const REQUIREMENTS: Requirement[] = [
    {
        id: "length",
        label: "En az 8 karakter",
        check: (p) => p.length >= 8,
    },
    {
        id: "lowercase",
        label: "Küçük harf (a-z)",
        check: (p) => /[a-z]/.test(p),
    },
    {
        id: "uppercase",
        label: "Büyük harf (A-Z)",
        check: (p) => /[A-Z]/.test(p),
    },
    {
        id: "number",
        label: "Rakam (0-9)",
        check: (p) => /[0-9]/.test(p),
    },
    {
        id: "special",
        label: "Özel karakter (!@#$%^&*)",
        check: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
    },
];

export function PasswordStrength({
    password,
    showRequirements = true,
}: PasswordStrengthProps) {
    const { strength, percentage, color, label, fulfilledRequirements } = useMemo(() => {
        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        // Calculate percentage (max score is 6)
        const percentage = (score / 6) * 100;

        // Determine strength level
        let strength: "weak" | "medium" | "strong" = "weak";
        let color = THEME.colors.semantic.error;
        let label = "Zayıf";

        if (percentage >= 80) {
            strength = "strong";
            color = THEME.colors.semantic.success;
            label = "Güçlü";
        } else if (percentage >= 50) {
            strength = "medium";
            color = THEME.colors.semantic.warning;
            label = "Orta";
        }

        // Check requirements
        const fulfilledRequirements = REQUIREMENTS.map((req) => ({
            ...req,
            fulfilled: password.length > 0 && req.check(password),
        }));

        return {
            strength,
            percentage,
            color,
            label,
            fulfilledRequirements,
        };
    }, [password]);

    return (
        <View style={styles.container}>
            {/* Strength Bar */}
            <View style={styles.strengthBarContainer}>
                <View style={styles.strengthBarBg}>
                    <Animated.View
                        style={[
                            styles.strengthBarFill,
                            {
                                width: `${percentage}%`,
                                backgroundColor: color,
                            },
                        ]}
                    />
                </View>
                <Text
                    style={[styles.strengthLabel, { color }]}
                >
                    {label}
                </Text>
            </View>

            {/* Requirements List */}
            {showRequirements && password.length > 0 && (
                <View style={styles.requirementsContainer}>
                    {fulfilledRequirements.map((req) => (
                        <View key={req.id} style={styles.requirementItem}>
                            {req.fulfilled ? (
                                <Check size={16} color={THEME.colors.semantic.success} />
                            ) : (
                                <X size={16} color={THEME.colors.text.muted} />
                            )}
                            <Text
                                style={[
                                    styles.requirementText,
                                    !req.fulfilled && styles.requirementTextUnfulfilled,
                                ]}
                            >
                                {req.label}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },
    strengthBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    strengthBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: THEME.colors.primary[100],
        borderRadius: 4,
        overflow: "hidden",
    },
    strengthBarFill: {
        height: "100%",
        borderRadius: 4,
    },
    strengthLabel: {
        fontSize: 13,
        fontWeight: "700",
        minWidth: 50,
        textAlign: "right",
    },
    requirementsContainer: {
        marginTop: 16,
        gap: 8,
    },
    requirementItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    requirementText: {
        fontSize: 13,
        fontWeight: "500",
        color: THEME.colors.text.primary,
    },
    requirementTextUnfulfilled: {
        color: THEME.colors.text.muted,
    },
});
