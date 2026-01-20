import React, { useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Dimensions,
} from "react-native";
import {
    RectButton,
    Swipeable,
} from "react-native-gesture-handler";
import { Trash2, Edit, Archive } from "lucide-react-native";
import { THEME } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

export interface SwipeableAction {
    id: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
    color: string;
    backgroundColor: string;
    onPress: () => void;
}

export interface SwipeableItemProps {
    children: React.ReactNode;
    onDelete?: () => void;
    onEdit?: () => void;
    onArchive?: () => void;
    leftActions?: SwipeableAction[];
    rightActions?: SwipeableAction[];
    swipeEnabled?: boolean;
}

// Default swipe actions
const defaultRightActions: SwipeableAction[] = [
    {
        id: "delete",
        icon: Trash2,
        label: "Sil",
        color: "#fff",
        backgroundColor: THEME.colors.semantic.error,
        onPress: () => {}, // Will be overridden by onDelete
    },
];

const defaultLeftActions: SwipeableAction[] = [
    {
        id: "edit",
        icon: Edit,
        label: "Düzenle",
        color: "#fff",
        backgroundColor: THEME.colors.primary[600],
        onPress: () => {}, // Will be overridden by onEdit
    },
];

// Swipe action button component
function SwipeAction({
    action,
    progress,
    x,
    onPress,
}: {
    action: SwipeableAction;
    progress: Animated.AnimatedInterpolation<number>;
    x: number;
    onPress: () => void;
}) {
    const Icon = action.icon;
    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
    });

    const opacity = progress.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <Animated.View
            style={[
                styles.actionContainer,
                {
                    backgroundColor: action.backgroundColor,
                    transform: [{ translateX }],
                    opacity,
                },
            ]}
        >
            <RectButton style={styles.actionButton} onPress={onPress}>
                <Icon size={24} color={action.color} />
                <Text style={styles.actionLabel}>{action.label}</Text>
            </RectButton>
        </Animated.View>
    );
}

export function SwipeableItem({
    children,
    onDelete,
    onEdit,
    onArchive,
    leftActions,
    rightActions,
    swipeEnabled = true,
}: SwipeableItemProps) {
    const swipeableRef = useRef<Swipeable>(null);

    // Merge default actions with custom actions
    const finalRightActions = rightActions || (onDelete ? defaultRightActions.map(action => ({
        ...action,
        onPress: action.id === "delete" ? onDelete : action.onPress,
    })) : []);

    const finalLeftActions = leftActions || (onEdit ? defaultLeftActions.map(action => ({
        ...action,
        onPress: action.id === "edit" ? onEdit : action.onPress,
    })) : []);

    // Render right actions (delete, etc.)
    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => {
        return (
            <View style={styles.actionsContainer}>
                {finalRightActions.map((action, index) => {
                    const x = 80 * (index + 1);
                    return (
                        <SwipeAction
                            key={action.id}
                            action={action}
                            progress={progress}
                            x={x}
                            onPress={() => {
                                action.onPress();
                                swipeableRef.current?.close();
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    // Render left actions (edit, etc.)
    const renderLeftActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => {
        return (
            <View style={styles.actionsContainer}>
                {finalLeftActions.map((action, index) => {
                    const x = -80 * (index + 1);
                    return (
                        <SwipeAction
                            key={action.id}
                            action={action}
                            progress={progress}
                            x={x}
                            onPress={() => {
                                action.onPress();
                                swipeableRef.current?.close();
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    // Prevent swipe if disabled
    if (!swipeEnabled || (finalRightActions.length === 0 && finalLeftActions.length === 0)) {
        return <>{children}</>;
    }

    return (
        <Swipeable
            ref={swipeableRef}
            friction={2}
            leftThreshold={SWIPE_THRESHOLD}
            rightThreshold={SWIPE_THRESHOLD}
            renderLeftActions={finalLeftActions.length > 0 ? renderLeftActions : undefined}
            renderRightActions={finalRightActions.length > 0 ? renderRightActions : undefined}
        >
            {children}
        </Swipeable>
    );
}

// Preset swipeable items

export function SwipeableListItem({
    children,
    onDelete,
    onEdit,
}: {
    children: React.ReactNode;
    onDelete?: () => void;
    onEdit?: () => void;
}) {
    return (
        <SwipeableItem
            onDelete={onDelete}
            onEdit={onEdit}
            swipeEnabled={true}
        >
            {children}
        </SwipeableItem>
    );
}

export function SwipeableHistoryItem({
    children,
    onDelete,
}: {
    children: React.ReactNode;
    onDelete?: () => void;
}) {
    return (
        <SwipeableItem
            onDelete={onDelete}
            swipeEnabled={true}
        >
            {children}
        </SwipeableItem>
    );
}

const styles = StyleSheet.create({
    actionsContainer: {
        width: SCREEN_WIDTH,
        flexDirection: "row",
    },
    actionContainer: {
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    actionButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    actionLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#fff",
        marginTop: 4,
    },
});
