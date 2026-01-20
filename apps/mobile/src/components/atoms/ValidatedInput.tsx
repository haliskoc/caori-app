import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text as RNText,
} from "react-native";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react-native";
import { Text } from "./Text";
import { THEME } from "../../theme";

export interface ValidatedInputProps {
    value: string;
    onChangeText: (text: string) => void;
    validate?: (value: string) => string | null;
    label?: string;
    placeholder?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "decimal-pad";
    secureTextEntry?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoCorrect?: boolean;
    maxLength?: number;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    style?: any;
    containerStyle?: any;
    error?: string;
    showSuccessIndicator?: boolean;
    showCharacterCount?: boolean;
    debounceMs?: number;
    onBlur?: () => void;
    onFocus?: () => void;
}

export function ValidatedInput({
    value,
    onChangeText,
    validate,
    label,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    autoCapitalize = "none",
    autoCorrect = false,
    maxLength,
    multiline = false,
    numberOfLines,
    editable = true,
    style,
    containerStyle,
    error: externalError,
    showSuccessIndicator = true,
    showCharacterCount = false,
    debounceMs = 300,
    onBlur,
    onFocus,
}: ValidatedInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Debounce validation
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [value, debounceMs]);

    // Validate debounced value
    useEffect(() => {
        if (debouncedValue.length > 0 && validate) {
            const error = validate(debouncedValue);
            setValidationError(error);
            setIsValid(!error);
        } else if (debouncedValue.length === 0) {
            setValidationError(null);
            setIsValid(false);
        }
    }, [debouncedValue, validate]);

    const handleTextChange = useCallback((text: string) => {
        if (maxLength && text.length > maxLength) {
            return;
        }
        onChangeText(text);
    }, [maxLength, onChangeText]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        if (validate && value.length > 0) {
            const error = validate(value);
            setValidationError(error);
            setIsValid(!error);
        }
        onBlur?.();
    }, [validate, value, onBlur]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        onFocus?.();
    }, [onFocus]);

    const displayError = externalError || validationError;
    const hasError = !!displayError;
    const showErrorIcon = hasError && isFocused;
    const showSuccessIcon = isValid && showSuccessIndicator && !hasError && value.length > 0;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}

            <View
                style={[
                    styles.inputContainer,
                    hasError && styles.inputError,
                    isFocused && styles.inputFocused,
                    !editable && styles.inputDisabled,
                ]}
            >
                <TextInput
                    style={[styles.input, style]}
                    value={value}
                    onChangeText={handleTextChange}
                    placeholder={placeholder}
                    placeholderTextColor={THEME.colors.text.muted}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !showPassword}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                <View style={styles.rightIcons}>
                    {showErrorIcon && (
                        <AlertCircle size={20} color={THEME.colors.semantic.error} />
                    )}
                    {showSuccessIcon && (
                        <CheckCircle size={20} color={THEME.colors.semantic.success} />
                    )}
                    {secureTextEntry && (
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={0.6}
                        >
                            {showPassword ? (
                                <EyeOff size={20} color={THEME.colors.text.muted} />
                            ) : (
                                <Eye size={20} color={THEME.colors.text.muted} />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {hasError && (
                <Text style={styles.errorText}>
                    {displayError}
                </Text>
            )}

            {showCharacterCount && maxLength && (
                <View style={styles.characterCount}>
                    <Text style={styles.characterCountText}>
                        {value.length} / {maxLength}
                    </Text>
                </View>
            )}
        </View>
    );
}

// Preset validated inputs

export function NumberInput(props: Omit<ValidatedInputProps, "keyboardType">) {
    return (
        <ValidatedInput
            {...props}
            keyboardType="numeric"
        />
    );
}

export function EmailInput(props: Omit<ValidatedInputProps, "keyboardType" | "autoCapitalize">) {
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return null;
        if (!emailRegex.test(email)) {
            return "Geçerli bir e-posta adresi girin";
        }
        return null;
    };

    return (
        <ValidatedInput
            {...props}
            keyboardType="email-address"
            autoCapitalize="none"
            validate={props.validate || validateEmail}
        />
    );
}

export function PasswordInput(props: Omit<ValidatedInputProps, "secureTextEntry" | "autoCapitalize">) {
    const validatePassword = (password: string) => {
        if (!password) return null;
        if (password.length < 6) {
            return "Şifre en az 6 karakter olmalıdır";
        }
        return null;
    };

    return (
        <ValidatedInput
            {...props}
            secureTextEntry={true}
            autoCapitalize="none"
            validate={props.validate || validatePassword}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: THEME.colors.text.primary,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: THEME.colors.primary[100],
        borderRadius: 12,
        paddingHorizontal: 14,
        minHeight: 50,
    },
    inputFocused: {
        borderColor: THEME.colors.primary[400],
        borderWidth: 2,
    },
    inputError: {
        borderColor: THEME.colors.semantic.error,
        borderWidth: 2,
    },
    inputDisabled: {
        backgroundColor: THEME.colors.primary[50],
        opacity: 0.6,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: THEME.colors.text.primary,
        paddingVertical: 12,
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    errorText: {
        fontSize: 12,
        fontWeight: "500",
        color: THEME.colors.semantic.error,
        marginTop: 6,
        marginLeft: 4,
    },
    characterCount: {
        alignSelf: "flex-end",
        marginTop: 4,
    },
    characterCountText: {
        fontSize: 11,
        fontWeight: "600",
        color: THEME.colors.text.muted,
    },
});
