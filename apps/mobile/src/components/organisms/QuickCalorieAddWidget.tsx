import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { GlassButton } from '../atoms/GlassButton';
import { THEME } from '../../theme';
import { Plus, Zap } from 'lucide-react-native';

interface Props {
  onAddCalories: (amount: number, type?: 'food' | 'drink') => void;
}

const quickAmounts = [100, 200, 300, 500];

export function QuickCalorieAddWidget({ onAddCalories }: Props) {
  const [customValue, setCustomValue] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleQuickAdd = (amount: number) => {
    setSelectedAmount(amount);
    
    // Pulse animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        ...THEME.animation.spring,
      }),
    ]).start();

    onAddCalories(amount, 'food');
    
    setTimeout(() => setSelectedAmount(null), 500);
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customValue, 10);
    if (amount > 0) {
      onAddCalories(amount, 'food');
      setCustomValue('');
    }
  };

  return (
    <LiquidGlassCard variant="subtle">
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconWrapper}>
            <Zap size={18} color={THEME.colors.primary[600]} strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.title}>{t('Hızlı Ekle')}</Text>
            <Text style={styles.subtitle}>{t('Kalori hızlıca ekle')}</Text>
          </View>
        </View>
      </View>

      {/* Quick Amount Buttons */}
      <Animated.View style={[styles.quickButtons, { transform: [{ scale: scaleAnim }] }]}>
        {quickAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.quickButton,
              selectedAmount === amount && styles.quickButtonActive,
            ]}
            onPress={() => handleQuickAdd(amount)}
            activeOpacity={0.8}
          >
            <Plus size={14} color={selectedAmount === amount ? '#fff' : THEME.colors.primary[600]} />
            <Text style={[
              styles.quickButtonText,
              selectedAmount === amount && styles.quickButtonTextActive,
            ]}>
              {amount}
            </Text>
            <Text style={[
              styles.quickButtonUnit,
              selectedAmount === amount && styles.quickButtonUnitActive,
            ]}>
              kcal
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Custom Input */}
      <View style={styles.customSection}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={t('Özel miktar...')}
            placeholderTextColor={THEME.colors.text.muted}
            keyboardType="numeric"
            value={customValue}
            onChangeText={setCustomValue}
            onSubmitEditing={handleCustomAdd}
          />
          <Text style={styles.inputUnit}>kcal</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addButton,
            !customValue && styles.addButtonDisabled,
          ]}
          onPress={handleCustomAdd}
          disabled={!customValue}
        >
          <Plus size={20} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    gap: 4,
  },
  quickButtonActive: {
    backgroundColor: THEME.colors.primary[600],
    borderColor: THEME.colors.primary[600],
  },
  quickButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  quickButtonTextActive: {
    color: '#fff',
  },
  quickButtonUnit: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.text.muted,
  },
  quickButtonUnitActive: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  customSection: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    paddingVertical: 14,
  },
  inputUnit: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.text.muted,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    ...THEME.shadow.md,
  },
  addButtonDisabled: {
    backgroundColor: THEME.colors.text.muted,
    opacity: 0.5,
  },
});
