import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Platform, findNodeHandle } from 'react-native';

/**
 * Focus management utilities for accessibility
 * Helps manage keyboard navigation and screen reader focus
 */

/**
 * Focus trap hook - keeps focus within a component (e.g., modal)
 */
export const useFocusTrap = (enabled: boolean = true) => {
  const trapRef = useRef<any>(null);
  const previousFocusRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    // Store current focus when trap activates
    // Note: This is a simplified implementation
    // In production, use react-native-focus-trap or similar

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && trapRef.current) {
        // Restore focus to previous element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [enabled]);

  return { trapRef, previousFocusRef };
};

/**
 * Auto focus hook - automatically focus a component on mount
 */
export const useAutoFocus = (enabled: boolean = true, delay: number = 100) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const timer = setTimeout(() => {
      if (ref.current && typeof ref.current.focus === 'function') {
        ref.current.focus();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, delay]);

  return ref;
};

/**
 * Focus restore hook - restores focus on unmount
 */
export const useFocusRestore = (enabled: boolean = true) => {
  const previousFocusRef = useRef<any>(null);
  const restoreRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    // Store the currently focused element
    const currentFocus = document?.activeElement;
    previousFocusRef.current = currentFocus;

    return () => {
      // Restore focus when component unmounts
      if (restoreRef.current && typeof restoreRef.current.focus === 'function') {
        restoreRef.current.focus();
      } else if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled]);

  return { restoreRef, previousFocusRef };
};

/**
 * Focus management hook for forms
 */
export const useFocusManagement = () => {
  const refs = useRef<Record<string, any>>({});

  const registerField = useCallback((name: string, ref: any) => {
    refs.current[name] = ref;
  }, []);

  const focusField = useCallback((name: string) => {
    const field = refs.current[name];
    if (field && typeof field.focus === 'function') {
      field.focus();
    }
  }, []);

  const focusNextField = useCallback((currentFieldName: string, fieldOrder: string[]) => {
    const currentIndex = fieldOrder.indexOf(currentFieldName);
    if (currentIndex < fieldOrder.length - 1) {
      const nextFieldName = fieldOrder[currentIndex + 1];
      focusField(nextFieldName);
    }
  }, [focusField]);

  const focusPreviousField = useCallback((currentFieldName: string, fieldOrder: string[]) => {
    const currentIndex = fieldOrder.indexOf(currentFieldName);
    if (currentIndex > 0) {
      const prevFieldName = fieldOrder[currentIndex - 1];
      focusField(prevFieldName);
    }
  }, [focusField]);

  return {
    registerField,
    focusField,
    focusNextField,
    focusPreviousField,
  };
};

/**
 * Focus ring utilities
 */
export const FocusRingStyles = {
  // Default focus ring
  default: {
    borderWidth: 2,
    borderColor: '#000000',
    outlineWidth: 2,
    outlineColor: '#000000',
    outlineOffset: 2,
  },

  // High contrast focus ring
  highContrast: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    outlineWidth: 3,
    outlineColor: '#FFFFFF',
    outlineOffset: 2,
  },

  // Custom color focus ring
  custom: (color: string) => ({
    borderWidth: 2,
    borderColor: color,
    outlineWidth: 2,
    outlineColor: color,
    outlineOffset: 2,
  }),
};

/**
 * Get focus ring style based on theme
 */
export const getFocusRingStyle = (
  theme: 'light' | 'dark' = 'light',
  customColor?: string
) => {
  if (customColor) {
    return FocusRingStyles.custom(customColor);
  }

  if (theme === 'dark') {
    return FocusRingStyles.highContrast;
  }

  return FocusRingStyles.default;
};

/**
 * Keyboard navigation utilities
 */
export const KeyboardNavigation = {
  /**
   * Handle tab key press
   */
  handleTab: (
    event: KeyboardEvent,
    onTabForward: () => void,
    onTabBackward: () => void
  ) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        onTabBackward();
      } else {
        onTabForward();
      }
      event.preventDefault();
    }
  },

  /**
   * Handle enter key press
   */
  handleEnter: (
    event: KeyboardEvent,
    onEnter: () => void
  ) => {
    if (event.key === 'Enter') {
      onEnter();
      event.preventDefault();
    }
  },

  /**
   * Handle escape key press
   */
  handleEscape: (
    event: KeyboardEvent,
    onEscape: () => void
  ) => {
    if (event.key === 'Escape') {
      onEscape();
      event.preventDefault();
    }
  },

  /**
   * Handle arrow key press
   */
  handleArrow: (
    event: KeyboardEvent,
    onArrowUp: () => void,
    onArrowDown: () => void,
    onArrowLeft: () => void,
    onArrowRight: () => void
  ) => {
    switch (event.key) {
      case 'ArrowUp':
        onArrowUp();
        event.preventDefault();
        break;
      case 'ArrowDown':
        onArrowDown();
        event.preventDefault();
        break;
      case 'ArrowLeft':
        onArrowLeft();
        event.preventDefault();
        break;
      case 'ArrowRight':
        onArrowRight();
        event.preventDefault();
        break;
    }
  },
};

/**
 * Focus visible indicator
 * Shows when user is navigating with keyboard
 */
export const useFocusVisible = () => {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const ref = useRef<any>(null);

  const handleFocus = useCallback((event: any) => {
    // Check if focus came from keyboard (not mouse/touch)
    const detail = event.nativeEvent?.detail ?? 0;
    setIsFocusVisible(detail === 0);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocusVisible(false);
  }, []);

  return {
    ref,
    isFocusVisible,
    focusVisibleProps: {
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
};

/**
 * Skip links for accessibility
 * Allows keyboard users to skip navigation
 */
export const useSkipLinks = () => {
  const mainContentRef = useRef<any>(null);

  const skipToMain = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      // Announce to screen reader
      // announceToScreenReader('Ana içeriğe atlandı');
    }
  }, []);

  return {
    mainContentRef,
    skipToMain,
  };
};

/**
 * Manage focus in modal dialogs
 */
export const useModalFocus = (isOpen: boolean) => {
  const modalRef = useRef<any>(null);
  const previousFocusRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document?.activeElement;

      // Focus first focusable element in modal
      const timer = setTimeout(() => {
        if (modalRef.current) {
          // Find first focusable element (simplified)
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            (focusableElements[0] as any).focus();
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  return modalRef;
};

/**
 * React Native specific focus utilities
 */
export const ReactNativeFocus = {
  /**
   * Request focus on a React Native component
   */
  requestFocus: (ref: React.RefObject<any>) => {
    if (ref.current) {
      const tag = findNodeHandle(ref.current);
      if (tag !== null) {
        // Platform-specific focus handling
        if (Platform.OS === 'android') {
          // Android focus handling
          console.log('Requesting focus for tag:', tag);
        } else {
          // iOS focus handling
          console.log('Requesting focus for tag:', tag);
        }
      }
    }
  },

  /**
   * Check if component is focused
   */
  isFocused: (ref: React.RefObject<any>): boolean => {
    if (!ref.current) return false;
    const tag = findNodeHandle(ref.current);
    // This would need to check against currently focused element
    // Simplified implementation
    return false;
  },
};
