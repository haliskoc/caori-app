/**
 * Semantic labels generator for accessibility
 * Provides Turkish language labels for common UI elements
 */

/**
 * Icon accessibility labels in Turkish
 */
export const IconLabels: Record<string, string> = {
  // Navigation
  'chevron-left': 'Geri',
  'chevron-right': 'İleri',
  'chevron-up': 'Yukarı',
  'chevron-down': 'Aşağı',
  'arrow-left': 'Geri ok',
  'arrow-right': 'İleri ok',
  'home': 'Ana sayfa',
  'menu': 'Menü',
  'close': 'Kapat',
  'back': 'Geri',

  // Actions
  'plus': 'Ekle',
  'minus': 'Çıkar',
  'edit': 'Düzenle',
  'delete': 'Sil',
  'save': 'Kaydet',
  'cancel': 'İptal',
  'confirm': 'Onayla',
  'submit': 'Gönder',
  'search': 'Ara',
  'filter': 'Filtrele',
  'sort': 'Sırala',
  'refresh': 'Yenile',
  'share': 'Paylaş',
  'copy': 'Kopyala',
  'paste': 'Yapıştır',
  'cut': 'Kes',

  // Media
  'play': 'Oynat',
  'pause': 'Duraklat',
  'stop': 'Durdur',
  'volume': 'Ses',
  'mute': 'Sessiz',
  'fullscreen': 'Tam ekran',
  'camera': 'Kamera',
  'image': 'Görsel',
  'video': 'Video',

  // Communication
  'phone': 'Telefon',
  'email': 'E-posta',
  'message': 'Mesaj',
  'chat': 'Sohbet',
  'notification': 'Bildirim',
  'bell': 'Zil',
  'alarm': 'Alarm',
  'clock': 'Saat',

  // File operations
  'folder': 'Klasör',
  'file': 'Dosya',
  'download': 'İndir',
  'upload': 'Yükle',
  'cloud': 'Bulut',
  'star': 'Yıldız',
  'heart': 'Kalp',
  'bookmark': 'Yer imi',

  // User
  'user': 'Kullanıcı',
  'profile': 'Profil',
  'settings': 'Ayarlar',
  'logout': 'Çıkış',
  'login': 'Giriş',
  'password': 'Şifre',

  // Food & Health
  'apple': 'Elma',
  'fire': 'Alev',
  'droplet': 'Su damlası',
  'moon': 'Ay',
  'sun': 'Güneş',
  'activity': 'Aktivite',
  'trending-up': 'Yükselen trend',
  'trending-down': 'Düşen trend',

  // AI / Tech
  'sparkles': 'Sihirli toz',
  'bot': 'Robot',
  'cpu': 'İşlemci',
  'database': 'Veritabanı',
  'wifi': 'Kablosuz ağ',
  'bluetooth': 'Bluetooth',
  'battery': 'Pil',

  // Accessibility
  'eye': 'Göster',
  'eye-off': 'Gizle',
  'info': 'Bilgi',
  'help': 'Yardım',
  'warning': 'Uyarı',
  'check': 'Onay',
  'x': 'Kapat',
  'hash': 'Diyez',
  'grid': 'Izgara',
  'list': 'Liste',
  'more-horizontal': 'Daha fazla yatay',
  'more-vertical': 'Daha fazla dikey',
};

/**
 * Get accessibility label for icon
 */
export const getIconLabel = (iconName: string, customLabel?: string): string => {
  return customLabel || IconLabels[iconName] || iconName;
};

/**
 * Generate accessibility label for button with icon
 */
export const generateButtonLabel = (
  icon?: string,
  text?: string,
  action?: string
): string => {
  const parts: string[] = [];

  if (icon) {
    parts.push(getIconLabel(icon));
  }

  if (text) {
    parts.push(text);
  }

  if (action) {
    parts.push(action);
  } else if (!text) {
    parts.push('butonu');
  }

  return parts.join(' ');
};

/**
 * Generate accessibility hint for button
 */
export const generateButtonHint = (
  buttonType: 'primary' | 'secondary' | 'icon' | 'toggle',
  customHint?: string
): string | undefined => {
  if (customHint) return customHint;

  const hints: Record<string, string> = {
    primary: 'Eylemi gerçekleştirmek için çift tıklayın',
    secondary: 'Eylemi gerçekleştirmek için çift tıklayın',
    icon: 'Eylemi gerçekleştirmek için çift tıklayın',
    toggle: 'Değiştirmek için çift tıklayın',
  };

  return hints[buttonType];
};

/**
 * State labels for Turkish accessibility
 */
export const StateLabels = {
  checked: 'Seçili',
  unchecked: 'Seçili değil',
  expanded: 'Genişletilmiş',
  collapsed: 'Daraltılmış',
  enabled: 'Etkin',
  disabled: 'Etkin değil',
  loading: 'Yükleniyor',
  loaded: 'Yüklendi',
  empty: 'Boş',
  error: 'Hata',
  success: 'Başarılı',
  warning: 'Uyarı',
  info: 'Bilgi',
};

/**
 * Get state label
 */
export const getStateLabel = (state: keyof typeof StateLabels): string => {
  return StateLabels[state] || state;
};

/**
 * Role labels for Turkish accessibility
 */
export const RoleLabels = {
  button: 'butonu',
  link: 'bağlantısı',
  header: 'başlık',
  navigation: 'navigasyon',
  list: 'liste',
  listitem: 'liste öğesi',
  image: 'görseli',
  text: 'metin',
  search: 'arama',
  checkbox: 'onay kutusu',
  radiobutton: 'radyo butonu',
  switch: 'anahtar',
  tab: 'sekme',
  combobox: 'açılır liste',
  slider: 'kaydırıcı',
  spinner: 'döndürücü',
  progressbar: 'ilerleme çubuğu',
  alert: 'uyarı',
  dialog: 'iletişim kutusu',
  alertdialog: 'uyarı iletişim kutusu',
  modal: 'modal',
  menu: 'menü',
  menubar: 'menü çubuğu',
  menuitem: 'menü öğesi',
  scrollbar: 'kaydırma çubuğu',
  separator: 'ayırıcı',
  status: 'durum',
};

/**
 * Get role label
 */
export const getRoleLabel = (role: keyof typeof RoleLabels): string => {
  return RoleLabels[role] || role;
};

/**
 * Generate full accessibility description for an element
 */
export const generateAccessibilityDescription = (options: {
  role?: string;
  label?: string;
  hint?: string;
  state?: string;
  value?: string | number;
}): string => {
  const parts: string[] = [];

  if (options.state) {
    parts.push(getStateLabel(options.state as keyof typeof StateLabels));
  }

  if (options.role) {
    parts.push(getRoleLabel(options.role as keyof typeof RoleLabels));
  }

  if (options.label) {
    parts.push(options.label);
  }

  if (options.value !== undefined) {
    parts.push(`değeri: ${options.value}`);
  }

  if (options.hint) {
    parts.push(`(${options.hint})`);
  }

  return parts.join(', ');
};

/**
 * Content description templates for complex UI
 */
export const ContentTemplates = {
  // Food items
  foodItem: (name: string, calories: number) =>
    `${name}, ${calories} kalori`,

  // Water entries
  waterEntry: (amount: number) =>
    `${amount} mililitre su`,

  // Progress
  progress: (current: number, total: number, label: string) =>
    `${label}: ${current} ${total}'dan ${Math.round((current / total) * 100)} yüzde`,

  // Date
  date: (date: Date) =>
    new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date),

  // Time
  time: (date: Date) =>
    new Intl.DateTimeFormat('tr-TR', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date),

  // DateTime
  datetime: (date: Date) =>
    new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date),

  // Number formatting
  number: (num: number, decimals: number = 0) =>
    new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num),

  // Currency
  currency: (amount: number) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount),

  // Percentage
  percentage: (value: number) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value / 100),
};

/**
 * Helper to generate food item description
 */
export const getFoodItemDescription = (
  name: string,
  calories: number,
  protein?: number,
  carbs?: number,
  fat?: number
): string => {
  let description = ContentTemplates.foodItem(name, calories);

  const macros: string[] = [];
  if (protein) macros.push(`${protein} gram protein`);
  if (carbs) macros.push(`${carbs} gram karbonhidrat`);
  if (fat) macros.push(`${fat} gram yağ`);

  if (macros.length > 0) {
    description += `. İçerik: ${macros.join(', ')}`;
  }

  return description;
};
