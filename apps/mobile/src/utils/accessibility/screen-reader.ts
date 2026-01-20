import { Platform, AccessibilityInfo, findNodeHandle } from 'react-native';
import { useRef, useEffect, useState } from 'react';

/**
 * Screen Reader utilities for accessibility
 * Supports VoiceOver (iOS) and TalkBack (Android)
 */

/**
 * Check if screen reader is enabled
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await AccessibilityInfo.isScreenReaderEnabled();
    return enabled;
  } catch (error) {
    console.error('Error checking screen reader status:', error);
    return false;
  }
};

/**
 * Hook to get screen reader enabled state
 */
export const useScreenReaderEnabled = (): boolean => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let subscription: any;

    const checkEnabled = async () => {
      const isEnabled = await isScreenReaderEnabled();
      setEnabled(isEnabled);
    };

    checkEnabled();

    // Listen for changes
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      subscription = AccessibilityInfo.addEventListener(
        'screenReaderChanged',
        (isEnabled: boolean) => {
          setEnabled(isEnabled);
        }
      );
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return enabled;
};

/**
 * Announce message to screen reader
 * Uses AccessibilityInfo API with live region
 */
export const announceToScreenReader = (message: string): void => {
  if (Platform.OS === 'android') {
    // Android: Use AccessibilityInfo.announceForAccessibility
    AccessibilityInfo.announceForAccessibility(message);
  } else if (Platform.OS === 'ios') {
    // iOS: Use AccessibilityInfo.announceForAccessibility (iOS 13+)
    try {
      AccessibilityInfo.announceForAccessibility(message);
    } catch (error) {
      console.error('Error announcing to screen reader (iOS):', error);
    }
  }
};

/**
 * Hook to announce to screen reader
 */
export const useScreenReaderAnnouncement = () => {
  const [lastAnnouncement, setLastAnnouncement] = useState<string | null>(null);

  const announce = (message: string) => {
    setLastAnnouncement(message);
    announceToScreenReader(message);

    // Clear after announcement
    setTimeout(() => {
      setLastAnnouncement(null);
    }, 1000);
  };

  return { announce, lastAnnouncement };
};

/**
 * Set accessibility focus to a component
 * Uses AccessibilityInfo API
 */
export const setAccessibilityFocus = (componentRef: React.RefObject<any>): void => {
  if (Platform.OS === 'android') {
    // Android: Use AccessibilityInfo.setAccessibilityFocus
    try {
      const tag = findNodeHandle(componentRef.current);
      if (tag !== null) {
        // Note: This is a simplified version
        // In production, you'd use native modules or specialized libraries
        console.log('Setting accessibility focus to tag:', tag);
      }
    } catch (error) {
      console.error('Error setting accessibility focus:', error);
    }
  }
};

/**
 * Hook for managing accessibility focus
 */
export const useAccessibilityFocus = () => {
  const ref = useRef<any>(null);

  const setFocus = () => {
    if (ref.current) {
      setAccessibilityFocus(ref);
    }
  };

  return { ref, setFocus };
};

/**
 * Pause screen reader
 */
export const pauseScreenReader = (): void => {
  if (Platform.OS === 'ios') {
    try {
      AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
        if (enabled) {
          // iOS: Pause VoiceOver
          // Note: This is limited - VoiceOver can't be paused programmatically
          console.log('VoiceOver pause requested (not directly supported)');
        }
      });
    } catch (error) {
      console.error('Error pausing screen reader:', error);
    }
  }
};

/**
 * Resume screen reader
 */
export const resumeScreenReader = (): void => {
  if (Platform.OS === 'ios') {
    console.log('VoiceOver resume requested (not directly supported)');
  }
};

/**
 * Screen Reader utilities for common patterns
 */
export const ScreenReaderPresets = {
  // Success announcement
  announceSuccess: (message: string) => {
    announceToScreenReader(`Başarılı: ${message}`);
  },

  // Error announcement
  announceError: (message: string) => {
    announceToScreenReader(`Hata: ${message}`);
  },

  // Warning announcement
  announceWarning: (message: string) => {
    announceToScreenReader(`Uyarı: ${message}`);
  },

  // Info announcement
  announceInfo: (message: string) => {
    announceToScreenReader(`Bilgi: ${message}`);
  },

  // Loading announcement
  announceLoading: (isLoading: boolean) => {
    announceToScreenReader(isLoading ? 'Yükleniyor' : 'Yüklendi');
  },

  // Progress announcement
  announceProgress: (current: number, total: number, label: string = '') => {
    const percentage = Math.round((current / total) * 100);
    announceToScreenReader(`${label} ${percentage} yüzde tamamlandı`);
  },
};

/**
 * Live region types
 */
export type LiveRegionType = 'polite' | 'assertive';

/**
 * Create live region props
 */
export const createLiveRegionProps = (type: LiveRegionType = 'polite') => {
  return {
    accessibilityLiveRegion: type,
    importantForAccessibility: 'yes',
  };
};

/**
 * Screen reader helper hooks
 */

/**
 * Hook for live region announcements
 */
export const useLiveRegion = (type: LiveRegionType = 'polite') => {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const announce = (message: string) => {
    setAnnouncement(message);
    announceToScreenReader(message);
  };

  const props = createLiveRegionProps(type);

  return {
    announcement,
    announce,
    props: {
      ...props,
      accessibilityLabel: announcement,
    },
  };
};

/**
 * Turkish accessibility labels generator
 */
export const generateTurkishLabel = (
  type: 'button' | 'input' | 'switch' | 'tab' | 'link' | 'image' | 'listitem',
  content: string,
  action?: string
): string => {
  const labels: Record<string, string> = {
    button: action ? `${action} ${content}` : `${content} butonu`,
    input: `${content} giriş alanı`,
    switch: `${content} anahtarı`,
    tab: `${content} sekmesi`,
    link: `${content} bağlantısı`,
    image: `${content} görseli`,
    listitem: `${content} öğesi`,
  };

  return labels[type] || content;
};

/**
 * Generate accessibility hint in Turkish
 */
export const generateTurkishHint = (
  type: 'button' | 'input' | 'switch' | 'picker' | 'modal',
  action?: string
): string | undefined => {
  const hints: Record<string, string> = {
    button: action ? `${action} için çift tıklayın` : 'Eylemi gerçekleştirmek için çift tıklayın',
    input: 'Değiştirmek için çift tıklayın',
    switch: 'Değiştirmek için çift tıklayın',
    picker: 'Seçmek için çift tıklayın',
    modal: 'Kapatmak için iki parmakla aşağı kaydırın',
  };

  return hints[type];
};
