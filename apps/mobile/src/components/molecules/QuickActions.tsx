import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Droplets,
  Apple,
  Coffee,
  Sandwich,
  X,
  ChevronDown,
  Utensils,
} from "lucide-react-native";
import { Text } from "../atoms/Text";
import { THEME } from "../../theme";
import { haptic } from "../../utils/haptics";
import { t } from "@calai/shared";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface QuickAction {
  id: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  color: string;
  backgroundColor: string;
  onPress: () => void;
  longPress?: () => void;
}

// Water quick actions
const waterQuickActions: QuickAction[] = [
  {
    id: "water-100",
    icon: Droplets,
    label: "+100ml",
    color: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    onPress: () => {}, // Will be overridden
  },
  {
    id: "water-250",
    icon: Droplets,
    label: "+250ml",
    color: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    onPress: () => {},
  },
  {
    id: "water-500",
    icon: Droplets,
    label: "+500ml",
    color: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    onPress: () => {},
  },
];

// Food quick actions
const foodQuickActions: QuickAction[] = [
  {
    id: "food-apple",
    icon: Apple,
    label: "Elma\n95 kcal",
    color: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    onPress: () => {},
  },
  {
    id: "food-coffee",
    icon: Coffee,
    label: "Kahve\n5 kcal",
    color: "#8b5cf6",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    onPress: () => {},
  },
  {
    id: "food-sandwich",
    icon: Sandwich,
    label: "Sandviç\n350 kcal",
    color: "#f59e0b",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    onPress: () => {},
  },
  {
    id: "food-custom",
    icon: Utensils,
    label: "Özel\nYemek",
    color: THEME.colors.primary[600],
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    onPress: () => {},
    longPress: () => {},
  },
];

export interface QuickActionsProps {
  onAddWater: (amount: number) => void;
  onAddFood: (calories: number, name: string) => void;
  onOpenFoodModal?: () => void;
}

// Single action button
function QuickActionButton({
  action,
  size = "medium",
  onPress,
  onLongPress,
}: {
  action: QuickAction;
  size?: "small" | "medium" | "large";
  onPress: () => void;
  onLongPress?: () => void;
}) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const sizeStyles = {
    small: { width: 56, height: 56, iconSize: 20, fontSize: 10 },
    medium: { width: 72, height: 72, iconSize: 24, fontSize: 11 },
    large: { width: 88, height: 88, iconSize: 28, fontSize: 12 },
  }[size];

  const Icon = action.icon;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        haptic.buttonPress();
        onPress();
      }}
      onLongPress={() => {
        haptic.medium();
        onLongPress?.();
      }}
      delayLongPress={500}
    >
      <Animated.View
        style={[
          styles.actionButton,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            backgroundColor: action.backgroundColor,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Icon size={sizeStyles.iconSize} color={action.color} />
        <Text
          style={[
            styles.actionLabel,
            { color: action.color, fontSize: sizeStyles.fontSize },
          ]}
        >
          {action.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// Quick actions modal
function QuickActionsModal({
  visible,
  onClose,
  actions,
  title,
  onActionPress,
}: {
  visible: boolean;
  onClose: () => void;
  actions: QuickAction[];
  title: string;
  onActionPress: (action: QuickAction) => void;
}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(SCREEN_WIDTH);
    }
  }, [visible]);

  const handleBackdropPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View
        style={[styles.modalBackdrop, { opacity: fadeAnim }]}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleBackdropPress}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleBackdropPress}
            >
              <X size={20} color={THEME.colors.text.muted} />
            </TouchableOpacity>
          </View>

          {/* Actions Grid */}
          <View style={styles.modalActionsGrid}>
            {actions.map((action) => (
              <QuickActionButton
                key={action.id}
                action={action}
                size="large"
                onPress={() => {
                  haptic.buttonPress();
                  action.onPress();
                  onActionPress(action);
                  handleBackdropPress();
                }}
              />
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// Main quick actions bar
export function QuickActions({
  onAddWater,
  onAddFood,
  onOpenFoodModal,
}: QuickActionsProps) {
  const [waterModalVisible, setWaterModalVisible] = useState(false);
  const [foodModalVisible, setFoodModalVisible] = useState(false);

  // Create water actions with callbacks
  const waterActions: QuickAction[] = [
    {
      ...waterQuickActions[0],
      onPress: () => onAddWater(100),
    },
    {
      ...waterQuickActions[1],
      onPress: () => onAddWater(250),
    },
    {
      ...waterQuickActions[2],
      onPress: () => onAddWater(500),
    },
  ];

  // Create food actions with callbacks
  const foodActions: QuickAction[] = [
    {
      ...foodQuickActions[0],
      onPress: () => onAddFood(95, "Elma"),
    },
    {
      ...foodQuickActions[1],
      onPress: () => onAddFood(5, "Kahve"),
    },
    {
      ...foodQuickActions[2],
      onPress: () => onAddFood(350, "Sandviç"),
    },
    {
      ...foodQuickActions[3],
      onPress: () => onOpenFoodModal?.(),
    },
  ];

  return (
    <>
      <View style={styles.container}>
        {/* Water Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("Su Ekle")}</Text>
          <View style={styles.actionsRow}>
            {waterActions.map((action) => (
              <QuickActionButton
                key={action.id}
                action={action}
                size="medium"
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>

        {/* Food Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("Hızlı Yemek")}</Text>
          <View style={styles.actionsRow}>
            {foodActions.map((action) => (
              <QuickActionButton
                key={action.id}
                action={action}
                size="medium"
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>

        {/* More Buttons */}
        <View style={styles.moreRow}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              haptic.light();
              setWaterModalVisible(true);
            }}
          >
            <Droplets size={18} color={THEME.colors.primary[600]} />
            <Text style={styles.moreButtonText}>{t("Daha Fazla Su")}</Text>
            <ChevronDown size={16} color={THEME.colors.primary[600]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              haptic.light();
              setFoodModalVisible(true);
            }}
          >
            <Utensils size={18} color={THEME.colors.primary[600]} />
            <Text style={styles.moreButtonText}>{t("Daha Fazla Yemek")}</Text>
            <ChevronDown size={16} color={THEME.colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Water Modal */}
      <QuickActionsModal
        visible={waterModalVisible}
        onClose={() => setWaterModalVisible(false)}
        actions={waterActions}
        title={t("Su Miktarı Seç")}
        onActionPress={() => {}}
      />

      {/* Food Modal */}
      <QuickActionsModal
        visible={foodModalVisible}
        onClose={() => setFoodModalVisible(false)}
        actions={foodActions}
        title={t("Yemek Seç")}
        onActionPress={() => {}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    padding: 16,
    marginBottom: 16,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primary[50],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionLabel: {
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
    lineHeight: 14,
  },
  moreRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.primary[50],
  },
  moreButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: THEME.colors.primary[50],
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  moreButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.primary[700],
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 34,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  modalActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
});
