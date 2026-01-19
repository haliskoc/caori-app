import React, { useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import {
  ChevronLeft,
  User,
  Mail,
  Calendar,
  Ruler,
  Scale,
  Check,
} from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, updateProfile, fetchProfile, saveProfileToApi, profileLoading } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchProfile();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fetchProfile]);

  const handleSave = async () => {
    await saveProfileToApi();
    router.back();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Profil Bilgileri')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <Animated.View
            style={[
              styles.avatarSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarInner}>
                <User size={48} color={THEME.colors.primary[500]} />
              </View>
              <View style={styles.avatarBadge}>
                <Check size={14} color="#fff" />
              </View>
            </View>
            <Text style={styles.userName}>{user?.name || profile.fullName || t('Kullanıcı')}</Text>
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Full Name */}
            <LiquidGlassCard style={styles.formCard}>
              <Text style={styles.inputLabel}>{t('Ad Soyad')}</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User size={20} color={THEME.colors.primary[500]} />
                </View>
                <TextInput
                  style={styles.input}
                  value={profile.fullName}
                  placeholder={t('Adınız')}
                  placeholderTextColor={THEME.colors.text.muted}
                  onChangeText={(value) => updateProfile({ fullName: value })}
                />
              </View>
            </LiquidGlassCard>

            {/* Email (Read-only) */}
            <LiquidGlassCard style={styles.formCard} variant="subtle">
              <Text style={styles.inputLabel}>{t('E-posta')}</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Mail size={20} color={THEME.colors.text.muted} />
                </View>
                <Text style={styles.readOnlyText}>{user?.email || 'user@example.com'}</Text>
              </View>
            </LiquidGlassCard>

            {/* Height and Age Row */}
            <View style={styles.rowContainer}>
              <LiquidGlassCard style={[styles.formCard, styles.halfCard]}>
                <Text style={styles.inputLabel}>{t('Boy (cm)')}</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ruler size={20} color={THEME.colors.primary[500]} />
                  </View>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="175"
                    placeholderTextColor={THEME.colors.text.muted}
                    value={profile.heightCm}
                    onChangeText={(value) => updateProfile({ heightCm: value })}
                  />
                </View>
              </LiquidGlassCard>

              <LiquidGlassCard style={[styles.formCard, styles.halfCard]}>
                <Text style={styles.inputLabel}>{t('Yaş')}</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Calendar size={20} color={THEME.colors.primary[500]} />
                  </View>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="25"
                    placeholderTextColor={THEME.colors.text.muted}
                    value={profile.age}
                    onChangeText={(value) => updateProfile({ age: value })}
                  />
                </View>
              </LiquidGlassCard>
            </View>

            {/* Weight */}
            <LiquidGlassCard style={styles.formCard}>
              <Text style={styles.inputLabel}>{t('Kilo (kg)')}</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Scale size={20} color={THEME.colors.primary[500]} />
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor={THEME.colors.text.muted}
                  value={profile.weightKg}
                  onChangeText={(value) => updateProfile({ weightKg: value })}
                />
              </View>
            </LiquidGlassCard>
          </Animated.View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, profileLoading && styles.saveButtonLoading]}
            onPress={handleSave}
            disabled={profileLoading}
          >
            {profileLoading ? (
              <Text style={styles.saveButtonText}>{t('Kaydediliyor...')}</Text>
            ) : (
              <>
                <Check size={22} color="#fff" />
                <Text style={styles.saveButtonText}>{t('Güncelle')}</Text>
              </>
            )}
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.glass.border,
    overflow: 'hidden',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 36,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    ...THEME.shadow.lg,
  },
  avatarBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME.colors.semantic.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  formCard: {
    marginBottom: 16,
  },
  halfCard: {
    flex: 1,
    marginBottom: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  inputIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    paddingRight: 16,
  },
  readOnlyText: {
    flex: 1,
    height: 48,
    lineHeight: 48,
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    paddingVertical: 18,
    gap: 10,
    marginTop: 16,
    ...THEME.shadow.lg,
  },
  saveButtonLoading: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});
