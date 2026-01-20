/**
 * Accessibility constants and standards
 * WCAG (Web Content Accessibility Guidelines) compliance values
 */

/**
 * Touch target sizes (WCAG 2.5.5)
 * Minimum size for interactive elements
 */
export const TouchTargetSizes = {
  minimum: 44, // 44x44 points minimum (WCAG AA)
  recommended: 48, // 48x48 points recommended
  comfortable: 56, // 56x56 points for better UX
};

/**
 * Color contrast ratios (WCAG 2.1)
 * Minimum contrast for text readability
 */
export const ContrastRatios = {
  // Normal text (< 18pt or < 14pt bold)
  normalText: {
    aa: 4.5, // WCAG AA minimum
    aaa: 7.0, // WCAG AAA enhanced
  },

  // Large text (≥ 18pt or ≥ 14pt bold)
  largeText: {
    aa: 3.0, // WCAG AA minimum
    aaa: 4.5, // WCAG AAA enhanced
  },

  // UI components and graphics
  graphics: {
    aa: 3.0,
    aaa: 4.5,
  },
};

/**
 * Font size scale ratios
 * For supporting different text sizes
 */
export const FontScaleRatios = {
  small: 0.85, // 85%
  normal: 1.0, // 100%
  large: 1.15, // 115%
  extraLarge: 1.3, // 130%
  huge: 1.5, // 150%
};

/**
 * Spacing scale for accessibility
 * Ensures adequate spacing for touch targets
 */
export const AccessibilitySpacing = {
  // Minimum spacing between touch targets
  touchTargetGap: 8,

  // Minimum padding for buttons
  buttonPaddingVertical: 12,
  buttonPaddingHorizontal: 16,

  // Minimum padding for inputs
  inputPaddingVertical: 12,
  inputPaddingHorizontal: 16,

  // Minimum gap between form elements
  formElementGap: 16,

  // Minimum line height
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

/**
 * Animation durations
 * For respecting reduced motion preferences
 */
export const AnimationDurations = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
};

/**
 * Screen reader breakpoints
 * For conditional behavior
 */
export const ScreenReaderBreakpoints = {
  always: 'always',
  never: 'never',
};

/**
 * Focus ring styles
 * For keyboard navigation visibility
 */
export const FocusRingStyles = {
  // Default focus ring
  default: {
    width: 2,
    color: '#000000',
    offset: 2,
    radius: 4,
  },

  // High contrast focus ring
  highContrast: {
    width: 3,
    color: '#FFFFFF',
    offset: 2,
    radius: 4,
  },

  // Primary color focus ring
  primary: {
    width: 2,
    color: '#10B981', // Emerald 500
    offset: 2,
    radius: 4,
  },
};

/**
 * Semantic roles
 * For accessibility mapping
 */
export const AccessibilityRoles = {
  none: 'none',
  button: 'button',
  link: 'link',
  search: 'search',
  image: 'image',
  imagebutton: 'imagebutton',
  keyboardkey: 'keyboardkey',
  text: 'text',
  adjustable: 'adjustable',
  header: 'header',
  summary: 'summary',
  alert: 'alert',
  checkbox: 'checkbox',
  combobox: 'combobox',
  menu: 'menu',
  menubar: 'menubar',
  menuitem: 'menuitem',
  progressbar: 'progressbar',
  radio: 'radio',
  radiogroup: 'radiogroup',
  scrollbar: 'scrollbar',
  spinbutton: 'spinbutton',
  switch: 'switch',
  tab: 'tab',
  tablist: 'tablist',
  timer: 'timer',
  list: 'list',
  listitem: 'listitem',
};

/**
 * Accessibility states
 */
export const AccessibilityStates = {
  disabled: 'disabled',
  selected: 'selected',
  checked: 'checked',
  unchecked: 'unchecked',
  busy: 'busy',
  expanded: 'expanded',
  collapsed: 'collapsed',
  hidden: 'hidden',
};

/**
 * Accessibility traits (iOS specific)
 */
export const AccessibilityTraits = {
  none: 'none',
  button: 'button',
  link: 'link',
  header: 'header',
  search: 'search',
  image: 'image',
  selected: 'selected',
  plays: 'plays',
  key: 'key',
  text: 'text',
  summary: 'summary',
  disabled: 'disabled',
  frequentUpdates: 'frequentUpdates',
  startsMedia: 'startsMedia',
  adjustable: 'adjustable',
  allowsDirectInteraction: 'allowsDirectInteraction',
  pageTurn: 'pageTurn',
};

/**
 * Accessibility flags (Android specific)
 */
export const AccessibilityFlags = {
  default: 0x00000000,
  focusable: 0x00000001,
  checkable: 0x00000002,
  checked: 0x00000004,
  clickable: 0x00000008,
  enabled: 0x00000010,
  disabled: 0x00000020,
  selectable: 0x00000040,
  selected: 0x00000080,
  isTextField: 0x00000100,
  isFocusable: 0x00000200,
};

/**
 * Live region announcements
 */
export const LiveRegion = {
  polite: 'polite', // Non-intrusive announcements
  assertive: 'assertive', // Important announcements
  off: 'none', // No announcements
};

/**
 * Importance for accessibility
 */
export const ImportanceForAccessibility = {
  auto: 'auto', // System determines
  yes: 'yes', // Element is accessible
  no: 'no', // Element is not accessible
  'no-hide-descendants': 'no-hide-descendants', // Element and children not accessible
};

/**
 * Turkish accessibility terminology
 */
export const TurkishTerminology = {
  // Actions
  actions: {
    tap: 'Çift tıkla',
    longPress: 'Uzun bas',
    swipe: 'Kaydır',
    pinch: 'İki parmakla yakınlaştır',
    zoom: 'Yakınlaştır',
    scroll: 'Kaydır',
    drag: 'Sürükle',
    drop: 'Bırak',
    rotate: 'Döndür',
  },

  // States
  states: {
    enabled: 'Etkin',
    disabled: 'Etkin değil',
    loading: 'Yükleniyor',
    error: 'Hata',
    success: 'Başarılı',
    empty: 'Boş',
    selected: 'Seçili',
    unselected: 'Seçili değil',
  },

  // Navigation
  navigation: {
    back: 'Geri',
    forward: 'İleri',
    up: 'Yukarı',
    down: 'Aşağı',
    next: 'Sonraki',
    previous: 'Önceki',
    home: 'Ana sayfa',
    menu: 'Menü',
    close: 'Kapat',
    done: 'Bitti',
    cancel: 'İptal',
  },

  // Common phrases
  phrases: {
    requiredField: 'Zorunlu alan',
    optionalField: 'İsteğe bağlı alan',
    noData: 'Veri yok',
    loading: 'Yükleniyor...',
    noResults: 'Sonuç bulunamadı',
    retry: 'Tekrar dene',
    confirm: 'Onayla',
    confirmDelete: 'Silmek istediğinizden emin misiniz?',
    confirmAction: 'Bu eylemi onaylıyor musunuz?',
  },
};

/**
 * WCAG 2.1 compliance levels
 */
export const WCAGLevels = {
  A: 'A - Minimum accessibility',
  AA: 'AA - Standard accessibility',
  AAA: 'AAA - Enhanced accessibility',
};

/**
 * Accessibility testing helpers
 */
export const AccessibilityTesting = {
  // Visual indicators for testing
  showFocusIndicators: true,
  showTouchTargets: true,
  showContrastRatios: true,

  // Common issues to check
  commonIssues: [
    'Insufficient color contrast',
    'Missing accessibility labels',
    'Touch targets too small',
    'Missing focus indicators',
    'No reduced motion support',
    'No screen reader announcements',
    'Keyboard navigation issues',
  ],

  // Testing tools
  tools: [
    'TalkBack (Android)',
    'VoiceOver (iOS)',
    'Accessibility Scanner (Android)',
    'Accessibility Inspector (iOS/macOS)',
  ],
};

/**
 * Accessibility documentation templates
 */
export const AccessibilityDocs = {
  // Component accessibility documentation
  component: (name: string, description: {
    role?: string;
    label?: string;
    hint?: string;
    state?: string;
    actions?: string[];
  }) => `
# ${name}

## Erişilebilirlik
- **Rol:** ${description.role || 'button'}
- **Etiket:** ${description.label || name}
- **İpucu:** ${description.hint || 'Çift tıklayın'}
- **Durum:** ${description.state || 'etkin'}

## Eylemler
${description.actions?.map(a => `- ${a}`).join('\n') || '- Çift tıkla'}
`,

  // Screen-specific documentation
  screen: (name: string, elements: Array<{
    type: string;
    label: string;
    description: string;
  }>) => `
# ${name} Ekranı

## Erişilebilirlik Öğeleri

${elements.map(e => `
### ${e.type}
- **Etiket:** ${e.label}
- **Açıklama:** ${e.description}
`).join('\n')}
`,
};
