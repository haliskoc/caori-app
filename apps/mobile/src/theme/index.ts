// Liquid Glass Green Theme System with Dark Mode Support

// Light Theme Colors
const lightColors = {
  // Primary Green Palette - Liquid Glass
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  // Glass Effects - Enhanced for liquid glass
  glass: {
    background: 'rgba(255, 255, 255, 0.75)',
    backgroundDark: 'rgba(0, 0, 0, 0.3)',
    border: 'rgba(16, 185, 129, 0.2)',
    borderLight: 'rgba(255, 255, 255, 0.4)',
    borderStrong: 'rgba(16, 185, 129, 0.35)',
    overlay: 'rgba(16, 185, 129, 0.08)',
    shadow: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    shimmer: 'rgba(255, 255, 255, 0.5)',
    frost: 'rgba(255, 255, 255, 0.9)',
  },
  // Background
  background: {
    primary: '#f0fdf4',
    secondary: '#ecfdf5',
    tertiary: '#d1fae5',
    card: 'rgba(255, 255, 255, 0.8)',
    gradient: ['#f0fdf4', '#ecfdf5', '#d1fae5'],
  },
  // Text
  text: {
    primary: '#022c22',
    secondary: '#065f46',
    muted: '#6b7280',
    light: '#9ca3af',
    white: '#ffffff',
    inverse: '#ffffff',
  },
  // Semantic
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  // Macros
  macro: {
    protein: '#10b981',
    carbs: '#f59e0b',
    fat: '#ef4444',
    water: '#3b82f6',
  },
};

// Dark Theme Colors
const darkColors = {
  // Primary Green Palette - Liquid Glass (inverted for dark)
  primary: {
    50: '#022c22',
    100: '#064e3b',
    200: '#065f46',
    300: '#047857',
    400: '#059669',
    500: '#10b981',
    600: '#34d399',
    700: '#6ee7b7',
    800: '#a7f3d0',
    900: '#d1fae5',
    950: '#ecfdf5',
  },
  // Glass Effects - Dark mode
  glass: {
    background: 'rgba(15, 23, 42, 0.85)',
    backgroundDark: 'rgba(0, 0, 0, 0.5)',
    border: 'rgba(16, 185, 129, 0.25)',
    borderLight: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(16, 185, 129, 0.4)',
    overlay: 'rgba(16, 185, 129, 0.12)',
    shadow: '#10b981',
    glow: 'rgba(16, 185, 129, 0.5)',
    shimmer: 'rgba(255, 255, 255, 0.1)',
    frost: 'rgba(30, 41, 59, 0.95)',
  },
  // Background - Dark
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    card: 'rgba(30, 41, 59, 0.8)',
    gradient: ['#0f172a', '#1e293b', '#334155'],
  },
  // Text - Dark
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    muted: '#94a3b8',
    light: '#64748b',
    white: '#ffffff',
    inverse: '#0f172a',
  },
  // Semantic (same for both)
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  // Macros (same for both)
  macro: {
    protein: '#10b981',
    carbs: '#f59e0b',
    fat: '#ef4444',
    water: '#3b82f6',
  },
};

// Base theme structure (without colors)
const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    full: 9999,
  },
  shadow: {
    sm: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 4,
    },
    lg: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 32,
      elevation: 12,
    },
    glow: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 24,
      elevation: 10,
    },
    glowStrong: {
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 32,
      elevation: 15,
    },
  },
  animation: {
    // Duration presets (ms)
    duration: {
      instant: 100,
      fast: 150,
      normal: 250,
      slow: 350,
      slower: 500,
    },
    // Spring physics configurations for react-native-reanimated
    spring: {
      // Smooth, natural spring for general use
      smooth: {
        damping: 15,
        stiffness: 150,
        mass: 1,
      },
      // Bouncy spring for playful interactions
      bouncy: {
        damping: 8,
        stiffness: 400,
        mass: 0.5,
      },
      // Stiff spring for precise, quick movements
      stiff: {
        damping: 25,
        stiffness: 300,
        mass: 1,
      },
      // Gentle spring for subtle animations
      gentle: {
        damping: 20,
        stiffness: 100,
        mass: 0.8,
      },
    },
    // Scale presets for press/touch feedback
    scale: {
      small: 0.98,    // Subtle press
      medium: 0.95,   // Normal press
      large: 0.90,    // Strong press
    },
    // Stagger delays for list/grid animations
    stagger: {
      fast: 50,       // Quick succession
      normal: 100,    // Normal timing
      slow: 150,      // Dramatic effect
    },
    // Easing functions for timing animations
    easing: {
      // Quadratic
      easeInQuad: 'easeIn',
      easeOutQuad: 'easeOut',
      easeInOutQuad: 'easeInOut',
      // Cubic
      easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
      easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
      easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
      // Quartic
      easeInQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
      easeOutQuart: 'cubic-bezier(0.19, 1, 0.22, 1)',
      easeInOutQuart: 'cubic-bezier(0.86, 0, 0.07, 1)',
      // Specialized
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      anticipate: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  // Accessibility settings
  accessibility: {
    // Minimum touch target size (WCAG AA)
    minimumTouchTarget: 44,
    // Animation for reduced motion preference
    reducedMotion: 'linear',
    // Scale factor for larger touch targets
    touchTargetScale: 1.2,
    // Animation duration scale for accessibility
    animationScale: 1,
  },
  typography: {
    xs: { fontSize: 10, lineHeight: 14 },
    sm: { fontSize: 12, lineHeight: 16 },
    base: { fontSize: 14, lineHeight: 20 },
    md: { fontSize: 16, lineHeight: 24 },
    lg: { fontSize: 18, lineHeight: 28 },
    xl: { fontSize: 20, lineHeight: 28 },
    '2xl': { fontSize: 24, lineHeight: 32 },
    '3xl': { fontSize: 30, lineHeight: 36 },
    '4xl': { fontSize: 36, lineHeight: 40 },
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// Light Theme (default export for backwards compatibility)
export const THEME = {
  ...baseTheme,
  colors: lightColors,
} as const;

// Dark Theme
export const DARK_THEME = {
  ...baseTheme,
  colors: darkColors,
} as const;

// Theme getter function for dynamic theming
export function getTheme(isDark: boolean) {
  return isDark ? DARK_THEME : THEME;
}

// Type exports
export type Theme = typeof THEME;
export type ThemeColors = typeof lightColors;
