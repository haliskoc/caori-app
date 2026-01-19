import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, HelpCircle, ChevronDown } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem { id: string; q: string; a: string; category: string; }

function FAQCard({ item, isExpanded, onToggle }: { item: FAQItem; isExpanded: boolean; onToggle: () => void }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateAnim, { toValue: isExpanded ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [isExpanded]);
  const rotation = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <LiquidGlassCard style={styles.faqCard}>
      <TouchableOpacity style={styles.faqHeader} onPress={onToggle} activeOpacity={0.7}>
        <Text style={styles.faqQuestion}>{item.q}</Text>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <ChevronDown size={20} color={THEME.colors.text.muted} />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{item.a}</Text>
          <View style={styles.categoryBadge}><Text style={styles.categoryText}>{item.category}</Text></View>
        </View>
      )}
    </LiquidGlassCard>
  );
}

export default function FaqScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    { id: '1', q: t("Cal AI nedir?"), a: t("Cal AI; kalori, su, aktivite ve makro takibini kolaylaştıran, AI destekli bir sağlık takip platformudur."), category: t("Genel") },
    { id: '2', q: t("Kalori hesaplamaları neye göre yapılıyor?"), a: t("Girdiğin besin değerleri ve aktivite süresi/yoğunluğu üzerinden tahmini kalori hesaplanır."), category: t("Beslenme") },
    { id: '3', q: t("Barkod taraması nasıl çalışır?"), a: t("Ekle sayfasından barkod simgesine tıklayarak kamerayı açabilirsiniz. Ürün barkodunu taradığınızda besin değerleri otomatik olarak çekilir."), category: t("Özellikler") },
    { id: '4', q: t("AI Asistan kimlere açık?"), a: t("AI Asistan premium kullanıcılar için sınırsız, ücretsiz kullanıcılar için günlük limitli olarak açıktır."), category: t("Premium") },
    { id: '5', q: t("Verilerim güvende mi?"), a: t("Veriler güvenli şekilde saklanır, paylaşım yalnızca senin izin verdiğin rapor linkleri ile yapılır."), category: t("Güvenlik") },
    { id: '6', q: t("Premium üyeliğin avantajları neler?"), a: t("Sınırsız AI sohbet, detaylı raporlar, kişisel diyet planı, reklamsız deneyim ve öncelikli destek."), category: t("Premium") },
    { id: '7', q: t("Hesabımı nasıl kapatırım?"), a: t("İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım."), category: t("Hesap") },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleToggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Yardım ve SSS")}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}><HelpCircle size={20} color={THEME.colors.primary[600]} /></View>
              <Text style={styles.infoText}>{t("Sıkça sorulan sorulara buradan ulaşabilirsiniz.")}</Text>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {faqs.map((item) => (
              <FAQCard key={item.id} item={item} isExpanded={expandedId === item.id} onToggle={() => handleToggle(item.id)} />
            ))}
          </Animated.View>

          <TouchableOpacity style={styles.contactButton} onPress={() => router.push('/(screens)/contact')}>
            <Text style={styles.contactButtonText}>{t("Sorunuz mu var? İletişime geçin")}</Text>
          </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.primary[100], alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1, fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 18 },
  faqCard: { marginBottom: 12 },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '700', color: THEME.colors.text.primary, marginRight: 12 },
  faqAnswer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: THEME.colors.glass.border },
  faqAnswerText: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 20 },
  categoryBadge: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: THEME.colors.primary[100], paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  categoryText: { fontSize: 11, fontWeight: '700', color: THEME.colors.primary[700] },
  contactButton: { alignItems: 'center', padding: 16, marginTop: 8 },
  contactButtonText: { fontSize: 14, fontWeight: '700', color: THEME.colors.primary[600], textDecorationLine: 'underline' },
});
