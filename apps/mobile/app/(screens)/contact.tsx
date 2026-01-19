import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Animated, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { ChevronLeft, MessageCircle, Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';

interface ContactMethod { icon: React.ComponentType<{ size: number; color: string }>; label: string; value: string; color: string; onPress?: () => void; }

const CONTACT_METHODS: ContactMethod[] = [
  { icon: Mail, label: 'E-posta', value: 'destek@calai.app', color: THEME.colors.primary[600], onPress: () => Linking.openURL('mailto:destek@calai.app') },
  { icon: Phone, label: 'Telefon', value: '+90 850 123 45 67', color: THEME.colors.semantic.success, onPress: () => Linking.openURL('tel:+908501234567') },
  { icon: MapPin, label: 'Adres', value: 'İstanbul, Türkiye', color: THEME.colors.semantic.warning },
];

function ContactMethodCard({ method }: { method: ContactMethod }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const Icon = method.icon;
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={method.onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9} disabled={!method.onPress}>
      <Animated.View style={[styles.methodCard, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.methodIcon, { backgroundColor: `${method.color}15` }]}><Icon size={22} color={method.color} /></View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodLabel}>{t(method.label)}</Text>
          <Text style={styles.methodValue}>{method.value}</Text>
        </View>
        {method.onPress && <ExternalLink size={18} color={THEME.colors.text.muted} />}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert(t('Hata'), t('Lütfen tüm alanları doldurun.'));
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    const url = `mailto:destek@calai.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("İletişim")}</Text>
          <View style={styles.headerSpacer} />
        </BlurView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard variant="subtle" style={styles.infoCard}>
              <View style={styles.infoIcon}><MessageCircle size={20} color={THEME.colors.primary[600]} /></View>
              <Text style={styles.infoText}>{t("Sorularınız veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.")}</Text>
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <LiquidGlassCard style={styles.methodsCard}>
              {CONTACT_METHODS.map((method, idx) => (
                <View key={method.label}>
                  <ContactMethodCard method={method} />
                  {idx < CONTACT_METHODS.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </LiquidGlassCard>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.sectionTitle}>{t("Mesaj Gönder")}</Text>
            <LiquidGlassCard style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("Konu")}</Text>
                <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder={t("Mesajınızın konusu")} placeholderTextColor={THEME.colors.text.muted} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t("Mesaj")}</Text>
                <TextInput style={[styles.input, styles.textArea]} value={message} onChangeText={setMessage} placeholder={t("Mesajınızı buraya yazın...")} placeholderTextColor={THEME.colors.text.muted} multiline numberOfLines={5} textAlignVertical="top" />
              </View>
              <TouchableOpacity style={[styles.sendButton, sending && styles.sendButtonLoading]} onPress={handleSend} disabled={sending}>
                {sending ? <Text style={styles.sendButtonText}>{t('Gönderiliyor...')}</Text> : (
                  <><Send size={20} color="#fff" /><Text style={styles.sendButtonText}>{t('Gönder')}</Text></>
                )}
              </TouchableOpacity>
            </LiquidGlassCard>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.primary[100], alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1, fontSize: 13, fontWeight: '600', color: THEME.colors.text.secondary, lineHeight: 18 },
  methodsCard: { marginBottom: 24, padding: 0, overflow: 'hidden' },
  methodCard: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  methodIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 12, fontWeight: '600', color: THEME.colors.text.muted },
  methodValue: { fontSize: 15, fontWeight: '700', color: THEME.colors.text.primary, marginTop: 2 },
  divider: { height: 1, backgroundColor: THEME.colors.glass.border, marginHorizontal: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: THEME.colors.text.secondary, marginBottom: 12 },
  formCard: { marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: THEME.colors.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 12, borderWidth: 1, borderColor: THEME.colors.glass.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600', color: THEME.colors.text.primary },
  textArea: { minHeight: 120, paddingTop: 14 },
  sendButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: THEME.colors.primary[600], borderRadius: 14, paddingVertical: 16, gap: 10, marginTop: 8 },
  sendButtonLoading: { opacity: 0.7 },
  sendButtonText: { fontSize: 15, fontWeight: '800', color: '#fff' },
});
