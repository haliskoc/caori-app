import * as Haptics from "expo-haptics";

/**
 * Haptic feedback utility for providing tactile feedback
 * Works on both iOS and Android
 */

// Notification feedback types
export const hapticNotification = {
    success: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    warning: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },
    error: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
    // Generic notification
    notify: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
};

// Impact feedback types
export const hapticImpact = {
    // Light impact for subtle feedback
    light: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    // Medium impact for default button presses
    medium: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    // Heavy impact for important actions
    heavy: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    },
    // Very light for delicate interactions
    soft: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    // Rigid for strong feedback
    rigid: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    },
};

// Selection feedback for UI element changes
export const hapticSelection = () => {
    Haptics.selectionAsync();
};

// Combined haptic feedback presets for common actions
export const hapticFeedback = {
    // Button press - default feedback
    buttonPress: () => {
        hapticImpact.light();
    },

    // Toggle switch
    toggle: () => {
        hapticImpact.light();
    },

    // Tab switch
    tabSwitch: () => {
        hapticSelection();
    },

    // Success action (e.g., form submitted)
    success: () => {
        hapticNotification.success();
    },

    // Error action (e.g., validation failed)
    error: () => {
        hapticNotification.error();
    },

    // Warning action (e.g., destructive action)
    warning: () => {
        hapticNotification.warning();
    },

    // Card swipe
    cardSwipe: () => {
        hapticImpact.medium();
    },

    // Pull to refresh
    pullRefresh: () => {
        hapticImpact.medium();
    },

    // Delete action
    delete: () => {
        hapticImpact.heavy();
    },

    // Refresh complete
    refreshComplete: () => {
        hapticNotification.success();
    },

    // Long press
    longPress: () => {
        hapticImpact.medium();
    },

    // Scroll snap
    scrollSnap: () => {
        hapticSelection();
    },

    // Modal open/close
    modalOpen: () => {
        hapticImpact.light();
    },
    modalClose: () => {
        hapticImpact.light();
    },

    // Achievement unlocked
    achievement: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Add a small delay and another impact for emphasis
        setTimeout(() => {
            hapticImpact.medium();
        }, 100);
    },

    // Checkbox toggle
    checkbox: () => {
        hapticSelection();
    },

    // Slider movement
    sliderTick: () => {
        hapticSelection();
    },

    // Notification received
    notificationReceived: () => {
        hapticImpact.medium();
    },
};

// Safely execute haptic feedback with error handling
export async function safeHaptic(
    feedback: () => void | Promise<void>
): Promise<void> {
    try {
        await feedback();
    } catch (error) {
        // Silently fail - haptics are nice to have but not critical
        console.debug("Haptic feedback not available:", error);
    }
}

// Convenience wrapper that always succeeds
export const haptic = {
    ...hapticFeedback,
    ...hapticImpact,
    safe: safeHaptic,
};
