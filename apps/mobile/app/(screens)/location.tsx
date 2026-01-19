import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Globe, MapPin, Check } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';
import { getCurrentCountry } from '../../src/lib/location';
import { t } from '@calai/shared';

const COUNTRIES = [
  { code: 'TR', name: 'Türkiye' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Deutschland' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italia' },
  { code: 'ES', name: 'España' },
  { code: 'NL', name: 'Nederland' },
];

export default function LocationScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useStore();
  const [loading, setLoading] = useState(false);

  const handleAutoDetect = async () => {
    if (settings.autoDetectCountry) {
      updateSettings({ autoDetectCountry: false });
      return;
    }

    setLoading(true);
    const countryCode = await getCurrentCountry();
    setLoading(false);

    if (countryCode) {
      updateSettings({ 
        country: countryCode, 
        autoDetectCountry: true 
      });
    } else {
      updateSettings({ autoDetectCountry: true });
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('Konum Ayarları')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <LiquidGlassCard style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MapPin size={20} color={THEME.colors.primary[600]} />
                <View>
                  <Text style={styles.rowTitle}>{t('Otomatik Algıla')}</Text>
                  <Text style={styles.rowSubTitle}>{t('Cihaz konumuna göre ülke seç')}</Text>
                </View>
              </View>
              {loading ? (
                <ActivityIndicator size="small" color={THEME.colors.primary[600]} />
              ) : (
                <Switch 
                  value={settings.autoDetectCountry} 
                  onValueChange={handleAutoDetect}
                  trackColor={{ false: '#d1d5db', true: THEME.colors.primary[500] }}
                />
              )}
            </View>
          </LiquidGlassCard>

          <Text style={styles.sectionTitle}>{t('Ülke Seçimi')}</Text>
          <LiquidGlassCard style={styles.card}>
            {COUNTRIES.map((country, index) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryRow,
                  index !== COUNTRIES.length - 1 && styles.border
                ]}
                onPress={() => updateSettings({ country: country.code, autoDetectCountry: false })}
              >
                <View style={styles.rowLeft}>
                  <Globe size={18} color={THEME.colors.text.muted} />
                  <Text style={styles.countryName}>{country.name}</Text>
                </View>
                {settings.country === country.code && (
                  <Check size={20} color={THEME.colors.primary[600]} />
                )}
              </TouchableOpacity>
            ))}
          </LiquidGlassCard>
          
          <Text style={styles.infoText}>
            {t('Seçilen ülke, barkod tarama ve ürün arama sonuçlarında önceliklendirilecektir.')}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background.primary },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: THEME.colors.text.primary },
  content: { padding: 20 },
  card: { padding: 0, overflow: 'hidden', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowTitle: { fontSize: 16, fontWeight: '700', color: THEME.colors.text.primary },
  rowSubTitle: { fontSize: 12, color: THEME.colors.text.muted, marginTop: 2 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  border: { borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border },
  countryName: { fontSize: 15, fontWeight: '600', color: THEME.colors.text.primary },
  infoText: {
    fontSize: 13,
    color: THEME.colors.text.muted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
