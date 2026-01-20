import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, Check, X, Sparkles, Zap, Shield, Bot, BarChart3, Infinity, Crown, Star, Gift, Clock } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PREMIUM_FEATURES = [
  { icon: Bot, text: t('Sınırsız AI Sohbet'), color: THEME.colors.primary[500] },
  { icon: BarChart3, text: t('Detaylı Raporlar'), color: '#3b82f6' },
  { icon: Sparkles, text: t('Kişisel Diyet Planı'), color: '#8b5cf6' },
  { icon: Shield, text: t('Reklamsız Deneyim'), color: THEME.colors.semantic.success },
  { icon: Zap, text: t('Öncelikli Destek'), color: THEME.colors.semantic.warning },
  { icon: Infinity, text: t('Sınırsız Barkod Tarama'), color: '#06b6d4' },
];

// Feature comparison data
const FEATURE_COMPARISON = [
  { feature: t('AI Sohbet'), free: t('5/gün'), premium: t('Sınırsız') },
  { feature: t('Raporlar'), free: t('Temel'), premium: t('Detaylı') },
  { feature: t('Barkod Tarama'), free: t('10/gün'), premium: t('Sınırsız') },
  { feature: t('Diyet Planı'), free: <X size={14} color="#9ca3af" />, premium: <Check size={14} color={THEME.colors.semantic.success} /> },
  { feature: t('Reklamlar'), free: t('Var'), premium: t('Yok') },
  { feature: t('Destek'), free: t('Standart'), premium: t('Öncelikli') },
];

// Pricing plans
const PRICING_PLANS = [
  { id: 'monthly', name: t('Aylık'), price: '49.99', period: t('/ay'), savings: null, popular: false },
  { id: '3month', name: t('3 Aylık'), price: '129.99', period: t('/3 ay'), savings: t('%15'), popular: false },
  { id: '6month', name: t('6 Aylık'), price: '229.99', period: t('/6 ay'), savings: t('%25'), popular: false },
  { id: 'yearly', name: t('Yıllık'), price: '299.99', period: t('/yıl'), savings: t('%50'), popular: true },
];

function FeatureItem({ icon: Icon, text, color }: { icon: React.ComponentType<{ size: number; color: string }>; text: string; color: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: `${color}15` }]}><Icon size={18} color={color} /></View>
      <Text style={styles.featureText}>{text}</Text>
      <Check size={16} color={THEME.colors.semantic.success} />
    </View>
  );
}

// Feature Comparison Row Component
function ComparisonRow({ feature, free, premium, isLast }: { feature: string; free: string | React.ReactNode; premium: string | React.ReactNode; isLast: boolean }) {
  return (
    <View style={[styles.comparisonRow, !isLast && styles.comparisonRowBorder]}>
      <Text style={styles.comparisonFeature}>{feature}</Text>
      <View style={styles.comparisonValue}>
        <Text style={styles.comparisonFree}>{typeof free === 'string' ? free : '-'}</Text>
      </View>
      <View style={[styles.comparisonValue, styles.comparisonValuePremium]}>
        <Text style={styles.comparisonPremium}>{typeof premium === 'string' ? premium : '-'}</Text>
        {typeof premium !== 'string' && premium}
      </View>
    </View>
  );
}

// Trial Banner Component
function TrialBanner({ onActivate }: { onActivate: () => void }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity style={styles.trialBanner} onPress={onActivate}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Gift size={24} color={THEME.colors.semantic.warning} fill={THEME.colors.semantic.warning} />
      </Animated.View>
      <View style={styles.trialContent}>
        <Text style={styles.trialTitle}>{t('7 Gün Ücretsiz Deneyin')}</Text>
        <Text style={styles.trialSubtitle}>{t('Tüm Premium özelliklere erişin, kredi kartı gerekmez')}</Text>
      </View>
      <View style={styles.trialArrow}>
        <ChevronLeft size={20} color={THEME.colors.semantic.warning} style={{ transform: [{ rotate: '180deg' }] }} />
      </View>
    </TouchableOpacity>
  );
}

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
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

  const handleSubscribe = () => {
    // TODO: Implement payment flow
    console.log('Subscribe to plan:', selectedPlan);
  };

  const handleActivateTrial = () => {
    // TODO: Implement trial activation
    console.log('Activate trial');
  };

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
          {/* Hero Section */}
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Animated.View style={[styles.crownContainer, { transform: [{ translateY: crownAnim }] }]}>
              <Crown size={60} color={THEME.colors.semantic.warning} fill={THEME.colors.semantic.warning} />
            </Animated.View>
            <Text style={styles.heroTitle}>Cal AI Premium</Text>
            <Text style={styles.heroSubtitle}>{t('Sağlıklı yaşam yolculuğunuzda tüm özelliklerin kilidini açın')}</Text>
          </Animated.View>

          {/* Trial Banner */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TrialBanner onActivate={handleActivateTrial} />
          </Animated.View>

          {/* Premium Features */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>{t('Premium Özellikler')}</Text>
              {PREMIUM_FEATURES.map((feature, idx) => (<FeatureItem key={idx} icon={feature.icon} text={feature.text} color={feature.color} />))}
            </LiquidGlassCard>
          </Animated.View>

          {/* Feature Comparison */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>{t('Ücretsiz vs Premium')}</Text>
              <View style={styles.comparisonHeader}>
                <Text style={styles.comparisonHeaderText}>{t('Özellik')}</Text>
                <View style={styles.comparisonHeaderCol}>
                  <Text style={styles.comparisonHeaderText}>{t('Ücretsiz')}</Text>
                </View>
                <View style={[styles.comparisonHeaderCol, styles.comparisonHeaderPremium]}>
                  <Text style={styles.comparisonHeaderTextPremium}>{t('Premium')}</Text>
                </View>
              </View>
              {FEATURE_COMPARISON.map((item, idx) => (
                <ComparisonRow
                  key={idx}
                  feature={item.feature}
                  free={item.free}
                  premium={item.premium}
                  isLast={idx === FEATURE_COMPARISON.length - 1}
                />
              ))}
            </LiquidGlassCard>
          </Animated.View>

          {/* Pricing Plans */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.plansTitle}>{t('Plan Seçin')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plansScroll}>
              {PRICING_PLANS.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => setSelectedPlan(plan.id)}
                  activeOpacity={0.9}
                >
                  <LiquidGlassCard
                    variant={plan.popular ? 'elevated' : undefined}
                    style={[
                      styles.planCard,
                      selectedPlan === plan.id && styles.planCardSelected,
                      plan.popular && styles.planCardPopular,
                    ]}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Star size={12} color="#fff" fill="#fff" />
                        <Text style={styles.popularText}>{t('En Popüler')}</Text>
                      </View>
                    )}
                    <Text style={styles.planName}>{plan.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.planPrice}>₺{plan.price}</Text>
                      <Text style={styles.planPeriod}>{plan.period}</Text>
                    </View>
                    {plan.savings && (
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsText}>{t('{savings} Tasarruf', { savings: plan.savings })}</Text>
                      </View>
                    )}
                    {selectedPlan === plan.id && (
                      <View style={styles.selectedCheck}>
                        <Check size={16} color="#fff" />
                      </View>
                    )}
                  </LiquidGlassCard>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Subscribe Button */}
          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
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
  heroSection: { alignItems: 'center', paddingVertical: 24 },
  crownContainer: { marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: '900', color: THEME.colors.text.primary, marginBottom: 6 },
  heroSubtitle: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, textAlign: 'center', lineHeight: 18, paddingHorizontal: 20 },
  // Trial Banner
  trialBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.colors.semantic.warning + '15', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 2, borderColor: THEME.colors.semantic.warning + '30' },
  trialContent: { flex: 1, marginLeft: 12 },
  trialTitle: { fontSize: 14, fontWeight: '700', color: THEME.colors.semantic.warning, marginBottom: 2 },
  trialSubtitle: { fontSize: 11, fontWeight: '500', color: THEME.colors.text.secondary, lineHeight: 16 },
  trialArrow: { marginLeft: 8 },
  // Features
  featuresCard: { marginBottom: 20 },
  featuresTitle: { fontSize: 15, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 14 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  featureIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1, fontSize: 13, fontWeight: '600', color: THEME.colors.text.primary },
  // Comparison Table
  comparisonCard: { marginBottom: 20 },
  comparisonTitle: { fontSize: 15, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 14 },
  comparisonHeader: { flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border, marginBottom: 8 },
  comparisonHeaderText: { fontSize: 11, fontWeight: '700', color: THEME.colors.text.secondary, textTransform: 'uppercase', letterSpacing: 0.5, flex: 1.5 },
  comparisonHeaderCol: { flex: 1, alignItems: 'center' },
  comparisonHeaderPremium: { backgroundColor: THEME.colors.semantic.warning + '10', borderRadius: 8, paddingVertical: 4 },
  comparisonHeaderTextPremium: { fontSize: 11, fontWeight: '800', color: THEME.colors.semantic.warning },
  comparisonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  comparisonRowBorder: { borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border, borderColor: THEME.colors.glass.border },
  comparisonFeature: { flex: 1.5, fontSize: 12, fontWeight: '600', color: THEME.colors.text.primary },
  comparisonValue: { flex: 1, alignItems: 'center' },
  comparisonValuePremium: { backgroundColor: THEME.colors.semantic.success + '08', borderRadius: 6, paddingVertical: 4 },
  comparisonFree: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted },
  comparisonPremium: { fontSize: 11, fontWeight: '700', color: THEME.colors.semantic.success },
  // Plans
  plansTitle: { fontSize: 15, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 12, marginLeft: 4 },
  plansScroll: { gap: 12, paddingHorizontal: 4, marginBottom: 20 },
  planCard: { width: (SCREEN_WIDTH - 68) / 2, alignItems: 'center', padding: 16, position: 'relative', minHeight: 120, justifyContent: 'center' },
  planCardSelected: { borderColor: THEME.colors.primary[500], borderWidth: 2, backgroundColor: THEME.colors.primary[50] + '30' },
  planCardPopular: { borderColor: THEME.colors.semantic.warning, borderWidth: 2 },
  popularBadge: { position: 'absolute', top: -10, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: THEME.colors.semantic.warning, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  popularText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  planName: { fontSize: 13, fontWeight: '700', color: THEME.colors.text.secondary, marginBottom: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  planPrice: { fontSize: 20, fontWeight: '900', color: THEME.colors.text.primary },
  planPeriod: { fontSize: 11, fontWeight: '600', color: THEME.colors.text.muted, marginLeft: 2 },
  savingsBadge: { marginTop: 6, backgroundColor: THEME.colors.semantic.success + '15', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  savingsText: { fontSize: 10, fontWeight: '700', color: THEME.colors.semantic.success },
  selectedCheck: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: THEME.colors.primary[500], alignItems: 'center', justifyContent: 'center' },
  // Subscribe
  subscribeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.semantic.warning, borderRadius: 16, paddingVertical: 16, gap: 10, marginBottom: 14, ...THEME.shadow.lg },
  subscribeText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  termsText: { fontSize: 11, fontWeight: '500', color: THEME.colors.text.muted, textAlign: 'center', lineHeight: 16, paddingHorizontal: 20 },
});
