import React, { useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Check, Sparkles, Zap, Shield, Bot, BarChart3, Infinity, Crown, Star } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';

const PREMIUM_FEATURES = [
  { icon: Bot, text: t('Sınırsız AI Sohbet'), color: THEME.colors.primary[500] },
  { icon: BarChart3, text: t('Detaylı Raporlar'), color: '#3b82f6' },
  { icon: Sparkles, text: t('Kişisel Diyet Planı'), color: '#8b5cf6' },
  { icon: Shield, text: t('Reklamsız Deneyim'), color: THEME.colors.semantic.success },
  { icon: Zap, text: t('Öncelikli Destek'), color: THEME.colors.semantic.warning },
  { icon: Infinity, text: t('Sınırsız Barkod Tarama'), color: '#06b6d4' },
];

function FeatureItem({ icon: Icon, text, color }: { icon: React.ComponentType<{ size: number; color: string }>; text: string; color: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: `${color}15` }]}><Icon size={18} color={color} /></View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

export default function PremiumScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const crownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.sequence([
      Animated.timing(crownAnim, { toValue: -8, duration: 1500, useNativeDriver: true }),
      Animated.timing(crownAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Premium')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Animated.View style={[styles.crownContainer, { transform: [{ translateY: crownAnim }] }]}>
              <Crown size={60} color={THEME.colors.semantic.warning} fill={THEME.colors.semantic.warning} />
            </Animated.View>
            <Text style={styles.heroTitle}>Cal AI Premium</Text>
            <Text style={styles.heroSubtitle}>{t('Sağlıklı yaşam yolculuğunuzda tüm özelliklerin kilidini açın')}</Text>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>{t('Premium Özellikler')}</Text>
              {PREMIUM_FEATURES.map((feature, idx) => (<FeatureItem key={idx} icon={feature.icon} text={feature.text} color={feature.color} />))}
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.plansTitle}>{t('Plan Seçin')}</Text>
            <View style={styles.plansRow}>
              <LiquidGlassCard style={styles.planCard}>
                <Text style={styles.planName}>{t('Aylık')}</Text>
                <View style={styles.priceRow}><Text style={styles.planPrice}>₺49.99</Text><Text style={styles.planPeriod}>{t('/ay')}</Text></View>
              </LiquidGlassCard>
              <LiquidGlassCard variant="elevated" style={[styles.planCard, styles.planCardPopular]}>
                <View style={styles.popularBadge}><Star size={12} color="#fff" fill="#fff" /><Text style={styles.popularText}>{t('En Popüler')}</Text></View>
                <Text style={styles.planName}>{t('Yıllık')}</Text>
                <View style={styles.priceRow}><Text style={styles.planPrice}>₺299.99</Text><Text style={styles.planPeriod}>{t('/yıl')}</Text></View>
                <View style={styles.savingsBadge}><Text style={styles.savingsText}>{t('%50 Tasarruf')}</Text></View>
              </LiquidGlassCard>
            </View>
          </Animated.View>

          <TouchableOpacity style={styles.subscribeButton}>
            <Crown size={22} color="#fff" />
            <Text style={styles.subscribeText}>{t("Premium'a Geç")}</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>{t('Abonelik otomatik olarak yenilenir. İstediğiniz zaman iptal edebilirsiniz.')}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background.primary },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border, overflow: 'hidden' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: THEME.colors.text.primary },
  headerSpacer: { width: 40 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  heroSection: { alignItems: 'center', paddingVertical: 32 },
  crownContainer: { marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: '900', color: THEME.colors.text.primary, marginBottom: 8 },
  heroSubtitle: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.secondary, textAlign: 'center', lineHeight: 20 },
  featuresCard: { marginBottom: 24 },
  featuresTitle: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  featureIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureText: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.primary },
  plansTitle: { fontSize: 16, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 12 },
  plansRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  planCard: { flex: 1, alignItems: 'center', position: 'relative' },
  planCardPopular: { borderColor: THEME.colors.semantic.warning, borderWidth: 2 },
  popularBadge: { position: 'absolute', top: -12, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: THEME.colors.semantic.warning, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  popularText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  planName: { fontSize: 14, fontWeight: '700', color: THEME.colors.text.secondary, marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  planPrice: { fontSize: 24, fontWeight: '900', color: THEME.colors.text.primary },
  planPeriod: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, marginLeft: 2 },
  savingsBadge: { marginTop: 8, backgroundColor: THEME.colors.semantic.success + '15', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  savingsText: { fontSize: 11, fontWeight: '700', color: THEME.colors.semantic.success },
  subscribeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.semantic.warning, borderRadius: 16, paddingVertical: 18, gap: 10, marginBottom: 16, ...THEME.shadow.lg },
  subscribeText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  termsText: { fontSize: 12, fontWeight: '500', color: THEME.colors.text.muted, textAlign: 'center', lineHeight: 18 },
});
