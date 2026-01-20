import React, { Component, ReactNode } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AlertTriangle, RefreshCw, Home } from "lucide-react-native";
import { Text } from "./Text";
import { THEME } from "../../theme";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console
        console.error("Error Boundary caught an error:", error, errorInfo);

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // In production, you might want to send this to an error tracking service
        // like Sentry, Bugsnag, etc.
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    handleGoHome = () => {
        this.handleReset();
        // You might want to navigate to home screen here
        // For now, just reset the error state
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.iconContainer}>
                            <AlertTriangle size={64} color={THEME.colors.semantic.error} />
                        </View>

                        <Text style={styles.title}>{"Bir Şeyler Yanlış Gitti"}</Text>

                        <Text style={styles.message}>
                            {"Uygulama beklenmedik bir hatayla karşılaştı. " +
                                "Endişelenmeyin, verileriniz güvende."}
                        </Text>

                        {this.state.error && __DEV__ && (
                            <View style={styles.errorDetails}>
                                <Text style={styles.errorTitle}>Hata Detayları:</Text>
                                <Text style={styles.errorMessage}>
                                    {this.state.error.toString()}
                                </Text>
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={this.handleReset}
                                activeOpacity={0.8}
                            >
                                <RefreshCw size={20} color="#fff" />
                                <Text style={styles.retryButtonText}>{"Tekrar Dene"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.homeButton}
                                onPress={this.handleGoHome}
                                activeOpacity={0.8}
                            >
                                <Home size={20} color={THEME.colors.primary[600]} />
                                <Text style={styles.homeButtonText}>{"Ana Sayfaya Dön"}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }

        return this.props.children;
    }
}

// Simpler functional component version for wrapping individual components
interface FallbackProps {
    error: Error;
    resetError: () => void;
}

export function DefaultFallback({ error, resetError }: FallbackProps) {
    return (
        <View style={styles.fallbackContainer}>
            <AlertTriangle size={32} color={THEME.colors.semantic.error} />
            <Text style={styles.fallbackText}>{"Bir hata oluştu"}</Text>
            {__DEV__ && (
                <Text style={styles.fallbackError}>{error.toString()}</Text>
            )}
            <TouchableOpacity
                style={styles.fallbackButton}
                onPress={resetError}
                activeOpacity={0.8}
            >
                <Text style={styles.fallbackButtonText}>{"Tekrar Dene"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background.primary,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: THEME.colors.text.primary,
        textAlign: "center",
        marginBottom: 12,
    },
    message: {
        fontSize: 15,
        fontWeight: "500",
        color: THEME.colors.text.secondary,
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    errorDetails: {
        width: "100%",
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    errorTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#991b1b",
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 11,
        fontWeight: "500",
        color: "#b91c1c",
        fontFamily: "monospace",
        lineHeight: 16,
    },
    buttonContainer: {
        width: "100%",
        gap: 12,
    },
    retryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.colors.primary[600],
        borderRadius: 14,
        paddingVertical: 16,
        gap: 10,
        shadowColor: THEME.colors.primary[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    retryButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    homeButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: THEME.colors.primary[200],
        borderRadius: 14,
        paddingVertical: 14,
        gap: 10,
    },
    homeButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: THEME.colors.primary[700],
    },
    // Fallback styles
    fallbackContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fef2f2",
        borderRadius: 12,
        margin: 16,
    },
    fallbackText: {
        fontSize: 14,
        fontWeight: "600",
        color: THEME.colors.text.primary,
        marginTop: 12,
        marginBottom: 8,
    },
    fallbackError: {
        fontSize: 11,
        fontWeight: "500",
        color: THEME.colors.semantic.error,
        textAlign: "center",
        fontFamily: "monospace",
        marginBottom: 16,
    },
    fallbackButton: {
        backgroundColor: THEME.colors.primary[600],
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    fallbackButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
});
