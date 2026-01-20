import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Easing,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { Copy, Share, Trash2, X } from "lucide-react-native";
import { Text } from "../atoms/Text";
import { THEME } from "../../theme";

export interface MessageActionsProps {
    visible: boolean;
    message: string;
    isOwnMessage: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onCopy?: () => void;
    onShare?: () => void;
}

interface ActionButton {
    id: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
    color: string;
    onPress: () => void;
}

export function MessageActions({
    visible,
    message,
    isOwnMessage,
    onClose,
    onDelete,
    onCopy,
    onShare,
}: MessageActionsProps) {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.9));

    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.9);
        }
    }, [visible]);

    const handleCopy = async () => {
        try {
            await Clipboard.setStringAsync(message);
            onCopy?.();
            onClose();
        } catch (error) {
            console.error("Failed to copy", error);
        }
    };

    const handleShare = async () => {
        try {
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                console.log("Sharing not available");
                return;
            }

            await Sharing.shareAsync(message, {
                mimeType: "text/plain",
                dialogTitle: "Mesajı Paylaş",
            });

            onShare?.();
            onClose();
        } catch (error) {
            console.error("Failed to share", error);
        }
    };

    const handleDelete = () => {
        onDelete?.();
        onClose();
    };

    const actions: ActionButton[] = [
        {
            id: "copy",
            icon: Copy,
            label: "Kopyala",
            color: THEME.colors.primary[600],
            onPress: handleCopy,
        },
        {
            id: "share",
            icon: Share,
            label: "Paylaş",
            color: "#3b82f6",
            onPress: handleShare,
        },
    ];

    if (isOwnMessage) {
        actions.push({
            id: "delete",
            icon: Trash2,
            label: "Sil",
            color: THEME.colors.semantic.error,
            onPress: handleDelete,
        });
    }

    const backdropPressed = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={backdropPressed}
        >
            <Animated.View
                style={[styles.backdrop, { opacity: fadeAnim }]}
                onStartShouldSetResponder={() => true}
                onResponderRelease={backdropPressed}
            >
                <Animated.View
                    style={[
                       styles.actionSheet,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                    onStartShouldSetResponder={() => true}
                >
                    {/* Handle */}
                    <View style={styles.handle} />

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        {actions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <TouchableOpacity
                                    key={action.id}
                                    style={styles.actionButton}
                                    onPress={action.onPress}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={[
                                            styles.actionIcon,
                                            { backgroundColor: `${action.color}15` },
                                        ]}
                                    >
                                        <Icon size={24} color={action.color} />
                                    </View>
                                    <Text style={[styles.actionLabel, { color: action.color }]}>
                                        {action.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={backdropPressed}
                        activeOpacity={0.7}
                    >
                        <X size={20} color={THEME.colors.text.muted} />
                        <Text style={styles.cancelButtonText}>{"İptal"}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

// Hook for managing message actions
export function useMessageActions() {
    const [actionsVisible, setActionsVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<{
        message: string;
        isOwnMessage: boolean;
    } | null>(null);

    const showActions = (message: string, isOwnMessage: boolean) => {
        setSelectedMessage({ message, isOwnMessage });
        setActionsVisible(true);
    };

    const hideActions = () => {
        setActionsVisible(false);
        setSelectedMessage(null);
    };

    return {
        actionsVisible,
        selectedMessage,
        showActions,
        hideActions,
    };
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    actionSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 34,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: THEME.colors.text.muted,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 12,
        marginBottom: 16,
    },
    actionButton: {
        flex: 1,
        alignItems: "center",
        gap: 10,
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: "700",
    },
    cancelButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: THEME.colors.primary[50],
        borderRadius: 14,
        paddingVertical: 14,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: THEME.colors.text.muted,
    },
});
