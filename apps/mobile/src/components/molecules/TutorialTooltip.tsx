import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { BlurView } from "expo-blur";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react-native";
import { THEME } from "../../theme";
import { haptic } from "../../utils/haptics";
import { t } from "@calai/shared";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetRef: React.RefObject<View>;
  position?: "top" | "bottom" | "left" | "right" | "center";
  actionLabel?: string;
  onAction?: () => void;
  skipable?: boolean;
}

export interface TutorialTooltipProps {
  visible: boolean;
  steps: TutorialStep[];
  currentStepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
}

export function TutorialTooltip({
  visible,
  steps,
  currentStepIndex,
  onNext,
  onPrevious,
  onClose,
  onSkip,
  onComplete,
}: TutorialTooltipProps) {
  const [targetLayout, setTargetLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  useEffect(() => {
    if (visible && currentStep?.targetRef.current) {
      // Measure target position
      currentStep.targetRef.current.measureInWindow((x, y, width, height) => {
        setTargetLayout({ x, y, width, height });
      });

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      setTargetLayout(null);
    }
  }, [visible, currentStep]);

  const handleNext = () => {
    haptic.light();
    if (isLastStep) {
      onComplete?.();
      onClose();
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    haptic.light();
    onPrevious();
  };

  const handleClose = () => {
    haptic.medium();
    onClose();
  };

  const handleSkip = () => {
    haptic.medium();
    onSkip?.();
    onClose();
  };

  if (!visible || !currentStep || !targetLayout) {
    return null;
  }

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const position = currentStep.position || "bottom";
    const tooltipWidth = SCREEN_WIDTH - 48;
    const tooltipHeight = 200;

    switch (position) {
      case "top":
        return {
          top: targetLayout.y - tooltipHeight - 20,
          left: (SCREEN_WIDTH - tooltipWidth) / 2,
        };
      case "bottom":
        return {
          top: targetLayout.y + targetLayout.height + 20,
          left: (SCREEN_WIDTH - tooltipWidth) / 2,
        };
      case "left":
        return {
          top: targetLayout.y,
          left: 20,
        };
      case "right":
        return {
          top: targetLayout.y,
          right: 20,
        };
      case "center":
      default:
        return {
          top: (SCREEN_HEIGHT - tooltipHeight) / 2,
          left: (SCREEN_WIDTH - tooltipWidth) / 2,
        };
    }
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={currentStep.skipable !== false ? handleClose : undefined}
      >
        {/* Highlighted Area */}
        <View
          style={[
            styles.highlight,
            {
              left: targetLayout.x - 8,
              top: targetLayout.y - 8,
              width: targetLayout.width + 16,
              height: targetLayout.height + 16,
              borderRadius: 16,
            },
          ]}
        />

        {/* Tooltip */}
        <Animated.View
          style={[
            styles.tooltip,
            tooltipPosition,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          <BlurView intensity={90} tint="light" style={styles.tooltipContent}>
            {/* Header */}
            <View style={styles.tooltipHeader}>
              <View style={styles.tooltipIcon}>
                <Sparkles size={20} color={THEME.colors.primary[600]} />
              </View>
              <View style={styles.pagination}>
                {steps.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentStepIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
              {currentStep.skipable !== false && (
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <X size={18} color={THEME.colors.text.muted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Content */}
            <View style={styles.tooltipBody}>
              <Text style={styles.tooltipTitle}>{currentStep.title}</Text>
              <Text style={styles.tooltipDescription}>{currentStep.description}</Text>
            </View>

            {/* Footer */}
            <View style={styles.tooltipFooter}>
              {!isFirstStep && (
                <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
                  <ChevronLeft size={18} color={THEME.colors.primary[600]} />
                  <Text style={styles.navButtonText}>{t("Geri")}</Text>
                </TouchableOpacity>
              )}

              {isFirstStep && onSkip && (
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                  <Text style={styles.skipButtonText}>{t("Atla")}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>
                  {isLastStep ? t("Bitir") : currentStep.actionLabel || t("İleri")}
                </Text>
                {!isLastStep && <ChevronRight size={18} color="#fff" />}
              </TouchableOpacity>
            </View>
          </BlurView>

          {/* Arrow */}
          {currentStep.position === "bottom" && (
            <View style={[styles.arrow, { top: -8, left: "50%", marginLeft: -8 }]} />
          )}
          {currentStep.position === "top" && (
            <View style={[styles.arrow, { bottom: -8, left: "50%", marginLeft: -8, transform: [{ rotate: "180deg" }] }]} />
          )}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

// Tutorial Provider
interface TutorialContextType {
  startTutorial: (tutorialId: string, steps: TutorialStep[]) => void;
  endTutorial: () => void;
  isTutorialActive: boolean;
  currentTutorialId: string | null;
}

const TutorialContext = React.createContext<TutorialContextType | undefined>(undefined);

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [activeTutorial, setActiveTutorial] = useState<{
    id: string;
    steps: TutorialStep[];
    currentIndex: number;
  } | null>(null);

  const startTutorial = (id: string, steps: TutorialStep[]) => {
    setActiveTutorial({ id, steps, currentIndex: 0 });
    haptic.success();
  };

  const endTutorial = () => {
    setActiveTutorial(null);
  };

  const handleNext = () => {
    if (activeTutorial) {
      const nextIndex = activeTutorial.currentIndex + 1;
      if (nextIndex < activeTutorial.steps.length) {
        setActiveTutorial({ ...activeTutorial, currentIndex: nextIndex });
      } else {
        endTutorial();
      }
    }
  };

  const handlePrevious = () => {
    if (activeTutorial && activeTutorial.currentIndex > 0) {
      setActiveTutorial({ ...activeTutorial, currentIndex: activeTutorial.currentIndex - 1 });
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        startTutorial,
        endTutorial,
        isTutorialActive: activeTutorial !== null,
        currentTutorialId: activeTutorial?.id || null,
      }}
    >
      {children}
      {activeTutorial && (
        <TutorialTooltip
          visible={activeTutorial !== null}
          steps={activeTutorial.steps}
          currentStepIndex={activeTutorial.currentIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={endTutorial}
        />
      )}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = React.useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within TutorialProvider");
  }
  return context;
}

// Hook to create a target ref for tutorial
export function useTutorialTarget() {
  return useRef<View>(null);
}

// Preset tutorials
export const PRESET_TUTORIALS = {
  HOME_SCREEN: "home_screen_tutorial",
  PROFILE_SCREEN: "profile_screen_tutorial",
  ADD_ENTRY: "add_entry_tutorial",
  WATER_TRACKING: "water_tracking_tutorial",
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  highlight: {
    position: "absolute",
    borderWidth: 3,
    borderColor: THEME.colors.primary[500],
    backgroundColor: "transparent",
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  tooltip: {
    position: "absolute",
    width: SCREEN_WIDTH - 48,
    maxWidth: 400,
  },
  tooltipContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    overflow: "hidden",
  },
  tooltipHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.primary[50],
  },
  tooltipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary[100],
  },
  paginationDotActive: {
    backgroundColor: THEME.colors.primary[500],
    width: 24,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipBody: {
    padding: 20,
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.colors.text.primary,
    marginBottom: 8,
  },
  tooltipDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: THEME.colors.text.secondary,
    lineHeight: 22,
  },
  tooltipFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.primary[50],
    gap: 12,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[50],
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.primary[700],
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.text.muted,
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[600],
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(255, 255, 255, 0.95)",
  },
});
