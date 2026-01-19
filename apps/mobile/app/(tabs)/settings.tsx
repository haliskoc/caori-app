import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/providers/AuthProvider';
import { t } from '@calai/shared';
import {
  User,
  LogOut,
  ChevronRight,
  Bell,
  Shield,
  Moon,
  Target,
  FileDown,
  Globe,
  HelpCircle,
  CreditCard,
  Scale,
  Settings,
  MessageCircle,
  Star,
} from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';
import { exportEntriesToCsv } from '../../src/utils/export';

type SettingItem = {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  onPress?: () => void;
  color: string;
  value?: string;
};

type SettingSection = {
  title: string;
  items: SettingItem[];
};

// Animated setting row
function SettingRow({
  item,
  index,
  isLast,
}: {
  item: SettingItem;
  index: number;
  isLast: boolean;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const Icon = item.icon;

  return (
    <TouchableOpacity
      onPress={item.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.settingRow,
          !isLast && styles.settingRowBorder,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.settingRowLeft}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
            <Icon size={20} color={item.color} />
          </View>
          <Text style={styles.settingLabel}>{item.label}</Text>
        </View>
        <View style={styles.settingRowRight}>
          {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
          <ChevronRight size={18} color={THEME.colors.text.muted} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user, settings, fetchSettings } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fetchSettings();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fetchSettings]);

  const handleExport = () => {
    Alert.alert(
      t('Verileri Dışa Aktar'),
      t('Tüm kayıtlarınız CSV formatında dışa aktarılacaktır.'),
      [
        { text: t('İptal'), style: 'cancel' },
        { text: t('Dışa Aktar'), onPress: exportEntriesToCsv },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(t('Çıkış Yap'), t('Hesabınızdan çıkış yapmak istediğinize emin misiniz?'), [
      { text: t('İptal'), style: 'cancel' },
      {
        text: t('Çıkış'),
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const sections: SettingSection[] = [
    {
      title: t('Hesap'),
      items: [
        {
          icon: User,
          label: t('Profil Bilgileri'),
          onPress: () => router.push('/(screens)/profile'),
          color: THEME.colors.primary[600],
        },
        {
          icon: Target,
          label: t('Hedeflerim'),
          onPress: () => router.push('/(screens)/goals'),
          color: THEME.colors.semantic.success,
        },
        {
          icon: Scale,
          label: t('Vücut Ölçümleri'),
          onPress: () => router.push('/(screens)/measurements'),
          color: '#3b82f6',
        },
        {
          icon: CreditCard,
          label: t('Premium Abonelik'),
          onPress: () => router.push('/(screens)/premium'),
          color: THEME.colors.semantic.warning,
        },
      ],
    },
    {
      title: t('Uygulama'),
      items: [
        {
          icon: Bell,
          label: t('Hatırlatıcılar'),
          onPress: () => router.push('/(screens)/reminders'),
          color: '#3b82f6',
          value: settings?.reminder?.enabled ? settings.reminder.time : t('Kapalı'),
        },
        {
          icon: Globe,
          label: t('Dil Seçimi'),
          onPress: () => router.push('/(screens)/language'),
          color: '#8b5cf6',
          value: settings?.locale?.toUpperCase() || 'TR',
        },
        {
          icon: Moon,
          label: t('Tema'),
          onPress: () => router.push('/(screens)/theme'),
          color: '#111827',
          value: settings?.flags?.darkMode ? t('Koyu') : t('Açık'),
        },
      ],
    },
    {
      title: t('Veri ve Destek'),
      items: [
        {
          icon: FileDown,
          label: t('Verileri Dışa Aktar'),
          onPress: handleExport,
          color: THEME.colors.primary[600],
        },
        {
          icon: HelpCircle,
          label: t('Yardım ve SSS'),
          onPress: () => router.push('/(screens)/faq'),
          color: '#6b7280',
        },
        {
          icon: MessageCircle,
          label: t('İletişim'),
          onPress: () => router.push('/(screens)/contact'),
          color: '#06b6d4',
        },
        {
          icon: Shield,
          label: t('Gizlilik Politikası'),
          onPress: () => router.push('/(screens)/legal/privacy'),
          color: '#6b7280',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.headerIcon}>
              <Settings size={22} color={THEME.colors.primary[600]} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{t('Ayarlar')}</Text>
              <View style={styles.emailRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.emailText}>{user?.email || 'user@example.com'}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Settings Sections */}
          {sections.map((section, sIdx) => (
            <Animated.View
              key={sIdx}
              style={[
                styles.sectionContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + sIdx * 10],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <LiquidGlassCard style={styles.sectionCard}>
                {section.items.map((item, iIdx) => (
                  <SettingRow
                    key={iIdx}
                    item={item}
                    index={iIdx}
                    isLast={iIdx === section.items.length - 1}
                  />
                ))}
              </LiquidGlassCard>
            </Animated.View>
          ))}

          {/* Rate App Button */}
          <TouchableOpacity style={styles.rateButton}>
            <Star size={20} color={THEME.colors.semantic.warning} fill={THEME.colors.semantic.warning} />
            <Text style={styles.rateButtonText}>{t('Uygulamayı Değerlendir')}</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={THEME.colors.semantic.error} />
            <Text style={styles.logoutText}>{t('Çıkış Yap')}</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.versionText}>Cal AI v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 24,
    marginBottom: 8,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    letterSpacing: -0.5,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.semantic.success,
  },
  emailText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.glass.border,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.text.primary,
  },
  settingRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.text.muted,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  rateButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.semantic.warning,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.semantic.error,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textAlign: 'center',
    marginBottom: 20,
  },
});
