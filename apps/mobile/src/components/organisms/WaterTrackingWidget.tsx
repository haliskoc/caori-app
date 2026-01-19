import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput, Easing } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, G, Rect } from 'react-native-svg';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { THEME } from '../../theme';
import { Droplets, Plus } from 'lucide-react-native';

interface Props {
  currentMl: number;
  goalMl: number;
  onAddWater: (amount: number) => void;
}

const waterButtons = [
  { amount: 200, label: '200ml' },
  { amount: 500, label: '500ml' },
  { amount: 1000, label: '1L' },
];

export function WaterTrackingWidget({ currentMl, goalMl, onAddWater }: Props) {
  const [customValue, setCustomValue] = useState('');
  const [rippleIndex, setRippleIndex] = useState<number | null>(null);
  const waveAnim = useRef(new Animated.Value(0)).current;
  const fillAnim = useRef(new Animated.Value(0)).current;

  const progress = Math.min(1, currentMl / goalMl);
  const remainingMl = Math.max(0, goalMl - currentMl);

  useEffect(() => {
    // Wave animation
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    // Fill animation when progress changes
    Animated.spring(fillAnim, {
      toValue: progress,
      useNativeDriver: false,
      ...THEME.animation.spring,
    }).start();
  }, [progress]);

  const handleAddWater = (amount: number, index: number) => {
    setRippleIndex(index);
    onAddWater(amount);
    setTimeout(() => setRippleIndex(null), 600);
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customValue, 10);
    if (amount > 0) {
      onAddWater(amount);
      setCustomValue('');
    }
  };

  const translateX = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  return (
    <LiquidGlassCard 
      variant="default" 
      glowColor={THEME.colors.semantic.info}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconWrapper}>
            <Droplets size={20} color={THEME.colors.semantic.info} strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.title}>{t('Su Takibi')}</Text>
            <Text style={styles.subtitle}>
              {currentMl} / {goalMl} ml
            </Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>

      {/* Water Glass Visualization */}
      <View style={styles.glassContainer}>
        <View style={styles.glass}>
          {/* Water fill */}
          <Animated.View 
            style={[
              styles.waterFill, 
              { 
                height: `${progress * 100}%`,
              }
            ]}
          >
            {/* Animated waves */}
            <Animated.View 
              style={[
                styles.wave,
                { transform: [{ translateX }] }
              ]}
            >
              <Svg width={200} height={20} viewBox="0 0 200 20">
                <Defs>
                  <LinearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10 T250,10 L250,30 L0,30 Z"
                  fill="url(#waveGradient)"
                />
              </Svg>
            </Animated.View>
          </Animated.View>

          {/* Glass shine effect */}
          <View style={styles.glassShine} />
        </View>

        {/* Stats beside glass */}
        <View style={styles.statsColumn}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentMl}</Text>
            <Text style={styles.statLabel}>{t('İçilen')} ml</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.remainingValue]}>{remainingMl}</Text>
            <Text style={styles.statLabel}>{t('Kalan')} ml</Text>
          </View>
        </View>
      </View>

      {/* Quick Add Buttons */}
      <View style={styles.buttonRow}>
        {waterButtons.map((btn, index) => (
          <TouchableOpacity
            key={btn.amount}
            style={[
              styles.waterButton,
              rippleIndex === index && styles.waterButtonActive,
            ]}
            onPress={() => handleAddWater(btn.amount, index)}
            activeOpacity={0.8}
          >
            <View style={styles.waterButtonIcon}>
              <Plus size={16} color={rippleIndex === index ? '#fff' : THEME.colors.semantic.info} />
            </View>
            <Text style={[
              styles.waterButtonText,
              rippleIndex === index && styles.waterButtonTextActive,
            ]}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Input */}
      <View style={styles.customRow}>
        <View style={styles.inputWrapper}>
          <Droplets size={18} color={THEME.colors.semantic.info} />
          <TextInput
            style={styles.input}
            placeholder={t('Özel ml...')}
            placeholderTextColor={THEME.colors.text.muted}
            keyboardType="numeric"
            value={customValue}
            onChangeText={setCustomValue}
            onSubmitEditing={handleCustomAdd}
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, !customValue && styles.addButtonDisabled]}
          onPress={handleCustomAdd}
          disabled={!customValue}
        >
          <Text style={styles.addButtonText}>{t('Ekle')}</Text>
        </TouchableOpacity>
      </View>
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
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
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.semantic.info,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.semantic.info,
  },
  glassContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  glass: {
    width: 100,
    height: 140,
    borderRadius: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  waterFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  wave: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: 250,
    height: 20,
  },
  glassShine: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    transform: [{ rotate: '15deg' }],
  },
  statsColumn: {
    flex: 1,
    gap: 12,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  remainingValue: {
    color: THEME.colors.semantic.info,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.primary[100],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  waterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    gap: 8,
  },
  waterButtonActive: {
    backgroundColor: THEME.colors.semantic.info,
    borderColor: THEME.colors.semantic.info,
  },
  waterButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  waterButtonTextActive: {
    color: '#fff',
  },
  customRow: {
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
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    paddingVertical: 14,
  },
  addButton: {
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: THEME.colors.semantic.info,
    alignItems: 'center',
    justifyContent: 'center',
    ...THEME.shadow.md,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
});
