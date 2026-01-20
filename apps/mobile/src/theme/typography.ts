/**
 * Typography scale utilities for Cal AI mobile app
 * Provides responsive font sizing with scaling support
 */

/**
 * Typography scale based on design system
 * All values in pixels (scaled points in React Native)
 */
export const TypographyScale = {
  // Display styles - largest text for hero sections
  display: {
    large: {
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: -1.5,
      fontWeight: '800' as const,
    },
    medium: {
      fontSize: 40,
      lineHeight: 48,
      letterSpacing: -1,
      fontWeight: '800' as const,
    },
    small: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: -0.5,
      fontWeight: '700' as const,
    },
  },

  // Headline styles - prominent section headings
  headline: {
    large: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: -0.5,
      fontWeight: '700' as const,
    },
    medium: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      fontWeight: '700' as const,
    },
    small: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      fontWeight: '600' as const,
    },
  },

  // Title styles - section titles
  title: {
    large: {
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
      fontWeight: '600' as const,
    },
    medium: {
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '600' as const,
    },
    small: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '500' as const,
    },
  },

  // Body styles - main content text
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
  },

  // Label styles - labels for form fields, buttons, etc.
  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '500' as const,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500' as const,
    },
    small: {
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 0.5,
      fontWeight: '500' as const,
    },
  },

  // Caption styles - secondary text, descriptions
  caption: {
    large: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 0.4,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 8,
      lineHeight: 12,
      letterSpacing: 0.5,
      fontWeight: '400' as const,
    },
  },

  // Code styles - monospace text
  code: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '400' as const,
      fontFamily: 'monospace',
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      fontWeight: '400' as const,
      fontFamily: 'monospace',
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontWeight: '400' as const,
      fontFamily: 'monospace',
    },
  },
};

/**
 * Font weight values
 */
export const FontWeight = {
  thin: '100' as const,
  extralight: '200' as const,
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

/**
 * Letter spacing values (in em units)
 */
export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 1.5,
};

/**
 * Line height ratios
 */
export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
  loose: 2,
};

/**
 * Responsive font scaling presets
 * For different device sizes and accessibility
 */
export const FontScalePresets = {
  // Default scale
  default: 1.0,
  // Small devices
  small: 0.85,
  // Large devices
  large: 1.15,
  // Extra large devices
  xlarge: 1.3,
  // Accessibility - large text
  accessibility: 1.5,
};

/**
 * Get responsive font size based on scale
 */
export const getScaledFontSize = (baseSize: number, scale: number = FontScalePresets.default): number => {
  return Math.round(baseSize * scale);
};

/**
 * Get responsive typography style
 */
export const getScaledTypography = (
  baseStyle: {
    fontSize: number;
    lineHeight: number;
    letterSpacing?: number;
    fontWeight: string;
  },
  scale: number = FontScalePresets.default
) => {
  return {
    ...baseStyle,
    fontSize: getScaledFontSize(baseStyle.fontSize, scale),
    lineHeight: getScaledFontSize(baseStyle.lineHeight, scale),
  };
};

/**
 * Typography variants for quick access
 */
export const TypographyVariants = {
  // Hero/Display
  hero: TypographyScale.display.large,
  heroSmall: TypographyScale.display.medium,

  // Page title
  h1: TypographyScale.headline.large,
  h2: TypographyScale.headline.medium,
  h3: TypographyScale.headline.small,

  // Section title
  title: TypographyScale.title.large,
  titleSmall: TypographyScale.title.medium,

  // Body text
  body: TypographyScale.body.large,
  bodySmall: TypographyScale.body.medium,

  // Labels
  label: TypographyScale.label.large,
  labelSmall: TypographyScale.label.medium,

  // Captions
  caption: TypographyScale.caption.large,
  captionSmall: TypographyScale.caption.medium,

  // Buttons
  button: TypographyScale.label.large,
  buttonSmall: TypographyScale.label.medium,
};

/**
 * Text transformation utilities
 */
export const TextTransform = {
  none: 'none' as const,
  uppercase: 'uppercase' as const,
  lowercase: 'lowercase' as const,
  capitalize: 'capitalize' as const,
};

/**
 * Text decoration utilities
 */
export const TextDecoration = {
  none: 'none' as const,
  underline: 'underline' as const,
  'line-through': 'line-through' as const,
};

/**
 * Get typography style by variant name
 */
export const getTypographyStyle = (variant: keyof typeof TypographyVariants) => {
  return TypographyVariants[variant];
};

/**
 * Typography for specific contexts
 */
export const ContextTypography = {
  // Cards
  cardTitle: TypographyScale.title.medium,
  cardBody: TypographyScale.body.medium,
  cardCaption: TypographyScale.caption.large,

  // Lists
  listItemTitle: TypographyScale.title.small,
  listItemBody: TypographyScale.body.medium,
  listItemMeta: TypographyScale.caption.large,

  // Navigation
  navLabel: TypographyScale.label.medium,
  navActive: TypographyScale.label.large,

  // Forms
  inputLabel: TypographyScale.label.medium,
  inputPlaceholder: TypographyScale.body.medium,
  inputError: TypographyScale.caption.large,
  inputHelper: TypographyScale.caption.medium,

  // Buttons
  buttonText: TypographyScale.label.large,
  buttonSmallText: TypographyScale.label.medium,

  // Tables
  tableHeader: TypographyScale.label.medium,
  tableCell: TypographyScale.body.medium,

  // Hero/Marketing
  heroTitle: TypographyScale.display.large,
  heroSubtitle: TypographyScale.headline.medium,
  heroBody: TypographyScale.body.large,

  // Empty states
  emptyTitle: TypographyScale.title.large,
  emptyBody: TypographyScale.body.medium,

  // Toast notifications
  toastTitle: TypographyScale.label.large,
  toastBody: TypographyScale.caption.large,

  // Chart labels
  chartTitle: TypographyScale.label.large,
  chartLabel: TypographyScale.caption.medium,
  chartValue: TypographyScale.title.medium,
};

/**
 * Arabic/Persian text support (RTL languages)
 */
export const RTLTypography = {
  // Adjust line height for Arabic script
  arabicLineHeight: 1.6,
  // Adjust font size for Arabic script readability
  arabicScale: 1.1,
};

/**
 * Get text style with RTL support
 */
export const getRTLTextStyle = (baseStyle: any, isRTL: boolean = false) => {
  if (!isRTL) return baseStyle;

  return {
    ...baseStyle,
    writingDirection: 'rtl' as const,
    textAlign: 'right' as const,
  };
};

/**
 * Typography preset combinations
 */
export const TypographyPresets = {
  // Page headers
  pageHeader: {
    title: TypographyScale.headline.large,
    subtitle: TypographyScale.body.large,
  },

  // Cards
  card: {
    title: TypographyScale.title.medium,
    description: TypographyScale.body.medium,
    metadata: TypographyScale.caption.large,
  },

  // List items
  listItem: {
    title: TypographyScale.title.small,
    subtitle: TypographyScale.body.medium,
    trailing: TypographyScale.label.medium,
  },

  // Form fields
  formField: {
    label: TypographyScale.label.medium,
    input: TypographyScale.body.large,
    helper: TypographyScale.caption.medium,
    error: TypographyScale.caption.large,
  },

  // Buttons
  button: {
    text: TypographyScale.label.large,
    small: TypographyScale.label.medium,
  },

  // Navigation
  navigation: {
    label: TypographyScale.label.medium,
    active: TypographyScale.label.large,
  },

  // Empty states
  emptyState: {
    title: TypographyScale.headline.medium,
    description: TypographyScale.body.medium,
    action: TypographyScale.label.large,
  },

  // Toast/notifications
  toast: {
    title: TypographyScale.label.large,
    message: TypographyScale.caption.large,
  },

  // Charts
  chart: {
    title: TypographyScale.title.medium,
    label: TypographyScale.caption.medium,
    value: TypographyScale.headline.small,
  },

  // Tables
  table: {
    header: TypographyScale.label.medium,
    cell: TypographyScale.body.medium,
  },
};

/**
 * Export all typography utilities
 */
export default {
  TypographyScale,
  FontWeight,
  LetterSpacing,
  LineHeight,
  FontScalePresets,
  TypographyVariants,
  ContextTypography,
  TypographyPresets,
  getScaledFontSize,
  getScaledTypography,
  getTypographyStyle,
  getRTLTextStyle,
};
