/**
 * Spacing and layout system for Cal AI mobile app
 * Provides consistent spacing scales and layout utilities
 */

/**
 * Base spacing unit (4px grid system)
 */
export const BASE_SPACING = 4;

/**
 * Spacing scale based on 4px grid
 * All values are multiples of BASE_SPACING
 */
export const SpacingScale = {
  // Micro spacing - fine adjustments
  micro: 2,        // 2px - Half base unit
  '2xs': 4,        // 4px - 1x base unit

  // Extra small spacing
  xs: 8,           // 8px - 2x base unit

  // Small spacing
  sm: 12,          // 12px - 3x base unit

  // Medium spacing - default gap
  md: 16,          // 16px - 4x base unit

  // Large spacing
  lg: 24,          // 24px - 6x base unit

  // Extra large spacing
  xl: 32,          // 32px - 8x base unit
  '2xl': 48,       // 48px - 12x base unit

  // Extra extra large spacing
  '3xl': 64,       // 64px - 16x base unit
  '4xl': 96,       // 96px - 24x base unit
  '5xl': 128,      // 128px - 32x base unit
};

/**
 * Responsive spacing for different screen sizes
 */
export const ResponsiveSpacing = {
  // Small screens (< 375px)
  small: {
    padding: SpacingScale.md,
    margin: SpacingScale.md,
    gap: SpacingScale.sm,
  },
  // Medium screens (375px - 768px)
  medium: {
    padding: SpacingScale.lg,
    margin: SpacingScale.lg,
    gap: SpacingScale.md,
  },
  // Large screens (> 768px)
  large: {
    padding: SpacingScale.xl,
    margin: SpacingScale.xl,
    gap: SpacingScale.lg,
  },
};

/**
 * Container widths
 */
export const ContainerWidth = {
  xs: 320,        // Extra small devices
  sm: 375,        // Small phones
  md: 414,        // Medium phones (iPhone Max)
  lg: 768,        // Tablets
  xl: 1024,       // Large tablets
  '2xl': 1280,    // Small laptops
  '3xl': 1536,    // Desktops
  full: '100%' as const,
};

/**
 * Container max widths with breakpoints
 */
export const Breakpoints = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Get spacing value by key
 */
export const getSpacing = (key: keyof typeof SpacingScale): number => {
  return SpacingScale[key];
};

/**
 * Get responsive spacing based on screen width
 */
export const getResponsiveSpacing = (width: number) => {
  if (width < Breakpoints.sm) return ResponsiveSpacing.small;
  if (width < Breakpoints.lg) return ResponsiveSpacing.medium;
  return ResponsiveSpacing.large;
};

/**
 * Safe area insets for notched devices
 */
export const SafeAreaInsets = {
  // iPhone X+ notch dimensions
  iPhoneX: {
    vertical: 44,    // Top safe area
    horizontal: 0,   // Side safe areas
    bottom: 34,      // Home indicator area
  },
  // Generic safe areas
  default: {
    vertical: 20,
    horizontal: 0,
    bottom: 0,
  },
};

/**
 * Grid system
 */
export const GridSystem = {
  // Number of columns in grid
  columns: {
    small: 2,       // Small screens
    medium: 2,      // Medium screens
    large: 3,       // Large screens (tablets)
    xlarge: 4,      // Extra large screens
  },
  // Grid gap
  gap: {
    small: SpacingScale.sm,
    medium: SpacingScale.md,
    large: SpacingScale.lg,
  },
  // Column padding
  padding: {
    small: SpacingScale.md,
    medium: SpacingScale.lg,
    large: SpacingScale.xl,
  },
};

/**
 * Calculate column width
 */
export const getColumnWidth = (
  containerWidth: number,
  columns: number,
  gap: number = SpacingScale.md
): number => {
  const totalGap = gap * (columns - 1);
  return (containerWidth - totalGap) / columns;
};

/**
 * Z-index scale for layering
 */
export const ZIndex = {
  // Base layer
  base: 0,
  // Raised elements
  raised: 10,
  // Dropdowns, popovers
  dropdown: 100,
  // Sticky headers
  sticky: 200,
  // Fixed headers
  fixed: 300,
  // Modal backdrop
  modalBackdrop: 400,
  // Modal content
  modal: 500,
  // Toast/notifications
  toast: 600,
  // Tooltip
  tooltip: 700,
  // Maximum z-index
  max: 9999,
};

/**
 * Border radius scale
 */
export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

/**
 * Layout utilities for common patterns
 */
export const LayoutPresets = {
  // Card layout
  card: {
    padding: SpacingScale.lg,
    margin: SpacingScale.md,
    borderRadius: BorderRadius.lg,
  },

  // Section layout
  section: {
    paddingVertical: SpacingScale['2xl'],
    paddingHorizontal: SpacingScale.lg,
  },

  // List item layout
  listItem: {
    paddingVertical: SpacingScale.md,
    paddingHorizontal: SpacingScale.lg,
    gap: SpacingScale.sm,
  },

  // Button layout
  button: {
    paddingVertical: SpacingScale.md,
    paddingHorizontal: SpacingScale.xl,
    gap: SpacingScale.sm,
    minHeight: 44, // WCAG touch target
  },

  // Input layout
  input: {
    paddingVertical: SpacingScale.md,
    paddingHorizontal: SpacingScale.md,
    gap: SpacingScale.xs,
    minHeight: 44, // WCAG touch target
  },

  // Modal layout
  modal: {
    padding: SpacingScale.xl,
    borderRadius: BorderRadius.xl,
    margin: SpacingScale.lg,
  },

  // Navigation bar layout
  navBar: {
    paddingVertical: SpacingScale.sm,
    paddingHorizontal: SpacingScale.lg,
    minHeight: 56,
  },

  // Tab bar layout
  tabBar: {
    paddingVertical: SpacingScale.sm,
    paddingHorizontal: SpacingScale.lg,
    minHeight: 64,
  },

  // Header layout
  header: {
    paddingVertical: SpacingScale.md,
    paddingHorizontal: SpacingScale.lg,
    minHeight: 64,
  },

  // Footer layout
  footer: {
    paddingVertical: SpacingScale.xl,
    paddingHorizontal: SpacingScale.lg,
  },
};

/**
 * Aspect ratio presets
 */
export const AspectRatio = {
  square: 1,
  video: 16 / 9,
  photo: 4 / 3,
  portrait: 3 / 4,
  golden: 1.618,
};

/**
 * Max content widths for readability
 */
export const MaxContentWidth = {
  // Optimal reading width
  readable: 680,
  // Narrow content
  narrow: 480,
  // Wide content
  wide: 960,
};

/**
 * Screen size utilities
 */
export const ScreenSize = {
  // Check if screen is small (phone)
  isSmall: (width: number) => width < Breakpoints.md,
  // Check if screen is medium (tablet)
  isMedium: (width: number) => width >= Breakpoints.md && width < Breakpoints.lg,
  // Check if screen is large (desktop)
  isLarge: (width: number) => width >= Breakpoints.lg,

  // Get screen size category
  getSize: (width: number) => {
    if (width < Breakpoints.sm) return 'xs';
    if (width < Breakpoints.md) return 'sm';
    if (width < Breakpoints.lg) return 'md';
    if (width < Breakpoints.xl) return 'lg';
    if (width < Breakpoints['2xl']) return 'xl';
    return '2xl';
  },
};

/**
 * Get grid columns for screen size
 */
export const getGridColumns = (width: number): number => {
  const size = ScreenSize.getSize(width);
  if (size === 'xs' || size === 'sm') return GridSystem.columns.small;
  if (size === 'md') return GridSystem.columns.medium;
  if (size === 'lg') return GridSystem.columns.large;
  return GridSystem.columns.xlarge;
};

/**
 * Get grid gap for screen size
 */
export const getGridGap = (width: number): number => {
  const size = ScreenSize.getSize(width);
  if (size === 'xs' || size === 'sm') return GridSystem.gap.small;
  if (size === 'md') return GridSystem.gap.medium;
  return GridSystem.gap.large;
};

/**
 * Horizontal/vertical spacing utilities
 */
export const SpacingUtils = {
  // Apply consistent padding
  padding: {
    none: 0,
    xs: SpacingScale.xs,
    sm: SpacingScale.sm,
    md: SpacingScale.md,
    lg: SpacingScale.lg,
    xl: SpacingScale.xl,
    '2xl': SpacingScale['2xl'],
  },

  // Apply consistent margin
  margin: {
    none: 0,
    xs: SpacingScale.xs,
    sm: SpacingScale.sm,
    md: SpacingScale.md,
    lg: SpacingScale.lg,
    xl: SpacingScale.xl,
    '2xl': SpacingScale['2xl'],
  },

  // Apply consistent gap (flex/grid)
  gap: {
    none: 0,
    xs: SpacingScale.xs,
    sm: SpacingScale.sm,
    md: SpacingScale.md,
    lg: SpacingScale.lg,
    xl: SpacingScale.xl,
  },
};

/**
 * Position utilities
 */
export const PositionUtils = {
  // Absolute positioning helpers
  absolute: {
    'top-left': { position: 'absolute', top: 0, left: 0 },
    'top-right': { position: 'absolute', top: 0, right: 0 },
    'bottom-left': { position: 'absolute', bottom: 0, left: 0 },
    'bottom-right': { position: 'absolute', bottom: 0, right: 0 },
    center: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: '-50%' }, { translateY: '-50%' }] },
  },
};

/**
 * Flexbox utilities
 */
export const FlexUtils = {
  // Flex direction
  direction: {
    row: 'row' as const,
    column: 'column' as const,
    'row-reverse': 'row-reverse' as const,
    'column-reverse': 'column-reverse' as const,
  },

  // Justify content
  justify: {
    start: 'flex-start' as const,
    end: 'flex-end' as const,
    center: 'center' as const,
    between: 'space-between' as const,
    around: 'space-around' as const,
    evenly: 'space-evenly' as const,
  },

  // Align items
  align: {
    start: 'flex-start' as const,
    end: 'flex-end' as const,
    center: 'center' as const,
    stretch: 'stretch' as const,
    baseline: 'baseline' as const,
  },

  // Flex wrap
  wrap: {
    nowrap: 'nowrap' as const,
    wrap: 'wrap' as const,
    reverse: 'wrap-reverse' as const,
  },
};

/**
 * Export all layout utilities
 */
export default {
  BASE_SPACING,
  SpacingScale,
  ResponsiveSpacing,
  ContainerWidth,
  Breakpoints,
  SafeAreaInsets,
  GridSystem,
  ZIndex,
  BorderRadius,
  LayoutPresets,
  AspectRatio,
  MaxContentWidth,
  ScreenSize,
  getSpacing,
  getResponsiveSpacing,
  getColumnWidth,
  getGridColumns,
  getGridGap,
  SpacingUtils,
  PositionUtils,
  FlexUtils,
};
