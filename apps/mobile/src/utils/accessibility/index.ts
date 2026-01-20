/**
 * Accessibility utilities for Cal AI mobile app
 * WCAG AA compliant accessibility support
 */

// Screen reader utilities
export * from './screen-reader';
export {
  isScreenReaderEnabled,
  useScreenReaderEnabled,
  announceToScreenReader,
  useScreenReaderAnnouncement,
  setAccessibilityFocus,
  useAccessibilityFocus,
  pauseScreenReader,
  resumeScreenReader,
  ScreenReaderPresets,
  createLiveRegionProps,
  useLiveRegion,
  generateTurkishLabel,
  generateTurkishHint,
} from './screen-reader';

// Focus management
export * from './focus-management';
export {
  useFocusTrap,
  useAutoFocus,
  useFocusRestore,
  useFocusManagement,
  FocusRingStyles,
  getFocusRingStyle,
  KeyboardNavigation,
  useFocusVisible,
  useSkipLinks,
  useModalFocus,
  ReactNativeFocus,
} from './focus-management';

// Semantic labels
export * from './semantic-labels';
export {
  IconLabels,
  getIconLabel,
  generateButtonLabel,
  generateButtonHint,
  StateLabels,
  getStateLabel,
  RoleLabels,
  getRoleLabel,
  generateAccessibilityDescription,
  ContentTemplates,
  getFoodItemDescription,
} from './semantic-labels';

// Accessibility constants
export * from './accessibility-constants';
export {
  TouchTargetSizes,
  ContrastRatios,
  FontScaleRatios,
  AccessibilitySpacing,
  AnimationDurations,
  ScreenReaderBreakpoints,
  FocusRingStyles,
  AccessibilityRoles,
  AccessibilityStates,
  AccessibilityTraits,
  AccessibilityFlags,
  LiveRegion,
  ImportanceForAccessibility,
  TurkishTerminology,
  WCAGLevels,
  AccessibilityTesting,
  AccessibilityDocs,
} from './accessibility-constants';
