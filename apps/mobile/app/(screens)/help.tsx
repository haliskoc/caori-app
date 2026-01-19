import React, { useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Linking, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { ChevronLeft, HelpCircle, Mail, MessageCircle, FileText, Users, Sparkles, CreditCard, ChevronRight } from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";

interface HelpTopic { title: string; description: string; icon: React.ReactNode; }

const HELP_TOPICS: HelpTopic[] = [
  { title: "Hesap & Profil", description: "Profil bilgilerini güncelle, hedeflerini düzenle ve kişisel ayarlarını yönet.", icon: <Users size={20} color={THEME.colors.primary[600]} /> },
  { title: "Takip & Kayıt", description: "Öğün, su ve aktivite girişlerini hızlıca ekle; geçmiş kayıtlarını incele.", icon: <FileText size={20} color={THEME.colors.primary[600]} /> },
  { title: "AI Sağlık Koçu", description: "AI Plus kullanıcıları günlük 25 mesajla beslenme ve antrenman desteği alır.", icon: <Sparkles size={20} color={THEME.colors.primary[600]} /> },
  { title: "Abonelik & Ödeme", description: "Paket bilgilerini görüntüle, yükseltme ve destek taleplerin için iletişime geç.", icon: <CreditCard size={20} color={THEME.colors.primary[600]} /> },
];

function TopicCard({ topic, index }: { topic: HelpTopic; index: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
      <Animated.View style={[styles.topicCard, { opacity: opacityAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
        <View style={styles.topicIconBg}>{topic.icon}</View>
        <View style={styles.topicContent}>
          <Text style={styles.topicTitle}>{t(topic.title)}</Text>
          <Text style={styles.topicDescription}>{t(topic.description)}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function HelpScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconFloat, { toValue: -8, duration: 1500, useNativeDriver: true }),
        Animated.timing(iconFloat, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><ChevronLeft size={24} color={THEME.colors.text.primary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Yardım Merkezi')}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Animated.View style={[styles.heroIconBg, { transform: [{ translateY: iconFloat }] }]}>
              <HelpCircle size={32} color={THEME.colors.primary[600]} />
            </Animated.View>
            <Text style={styles.heroTitle}>{t('Yardım Merkezi')}</Text>
            <Text style={styles.heroSubtitle}>{t("Calmet'i daha verimli kullanman için hızlı rehber ve destek kaynakları.")}</Text>
          </Animated.View>

          <View style={styles.topicsContainer}>
            {HELP_TOPICS.map((topic, idx) => (
              <TopicCard key={topic.title} topic={topic} index={idx} />
            ))}
          </View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.sectionLabel}>{t('Hızlı Bağlantılar')}</Text>
            <LiquidGlassCard style={styles.quickLinksCard}>
              <TouchableOpacity style={styles.quickLink} onPress={() => router.push("/(screens)/faq")}>
                <View style={styles.quickLinkLeft}>
                  <View style={styles.quickLinkIcon}><MessageCircle size={18} color={THEME.colors.primary[600]} /></View>
                  <Text style={styles.quickLinkText}>{t('Sıkça Sorulan Sorular')}</Text>
                </View>
                <ChevronRight size={18} color={THEME.colors.text.muted} />
              </TouchableOpacity>
              
              <View style={styles.quickLinkDivider} />
              
              <TouchableOpacity style={styles.quickLink} onPress={() => router.push("/(screens)/contact")}>
                <View style={styles.quickLinkLeft}>
                  <View style={styles.quickLinkIcon}><Mail size={18} color={THEME.colors.primary[600]} /></View>
                  <Text style={styles.quickLinkText}>{t('İletişim')}</Text>
                </View>
                <ChevronRight size={18} color={THEME.colors.text.muted} />
              </TouchableOpacity>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity style={styles.emailButton} onPress={() => Linking.openURL("mailto:haliskoc200@gmail.com")} activeOpacity={0.9}>
              <Mail size={20} color="#fff" />
              <Text style={styles.emailButtonText}>{t('E-posta Gönder')}</Text>
            </TouchableOpacity>
            <Text style={styles.emailNote}>{t('Destek için: haliskoc200@gmail.com')}</Text>
          </Animated.View>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  heroSection: { alignItems: 'center', marginBottom: 32 },
  heroIconBg: { width: 72, height: 72, borderRadius: 22, backgroundColor: THEME.colors.primary[50], borderWidth: 2, borderColor: THEME.colors.primary[100], alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 24, fontWeight: '900', color: THEME.colors.text.primary, marginBottom: 8 },
  heroSubtitle: { fontSize: 14, fontWeight: '600', color: THEME.colors.text.secondary, textAlign: 'center', lineHeight: 22 },
  topicsContainer: { gap: 12, marginBottom: 32 },
  topicCard: { backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'flex-start', gap: 14, borderWidth: 1, borderColor: THEME.colors.glass.border },
  topicIconBg: { width: 44, height: 44, borderRadius: 14, backgroundColor: THEME.colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  topicContent: { flex: 1 },
  topicTitle: { fontSize: 15, fontWeight: '800', color: THEME.colors.text.primary, marginBottom: 4 },
  topicDescription: { fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 19 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginLeft: 4 },
  quickLinksCard: { marginBottom: 24, padding: 0, overflow: 'hidden' },
  quickLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  quickLinkLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  quickLinkIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: THEME.colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  quickLinkText: { fontSize: 14, fontWeight: '700', color: THEME.colors.text.primary },
  quickLinkDivider: { height: 1, backgroundColor: THEME.colors.glass.border, marginHorizontal: 16 },
  emailButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: THEME.colors.primary[600], paddingVertical: 16, borderRadius: 16, shadowColor: THEME.colors.primary[600], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8 },
  emailButtonText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  emailNote: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted, textAlign: 'center', marginTop: 12 },
});
