// Liquid Glass Green Theme System
export const THEME = {
  colors: {
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
  },
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
    fast: 150,
    normal: 250,
    slow: 400,
    spring: {
      damping: 15,
      stiffness: 150,
    },
    springBouncy: {
      damping: 10,
      stiffness: 180,
    },
    springSmooth: {
      damping: 20,
      stiffness: 120,
    },
    // Easing presets for different animation types
    easing: {
      enter: 'easeOut',
      exit: 'easeIn',
      move: 'easeInOut',
    },
  },
  // Typography scale
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
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

export type Theme = typeof THEME;
