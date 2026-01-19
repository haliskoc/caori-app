import React, { useEffect, useRef } from 'react';
import { View, ViewProps, StyleSheet, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Defs, RadialGradient, Stop, Rect, LinearGradient } from 'react-native-svg';
import { THEME } from '../../theme';

type GlassVariant = 'default' | 'elevated' | 'subtle' | 'dark' | 'premium';

interface Props extends ViewProps {
  variant?: GlassVariant;
  intensity?: number;
  animate?: boolean;
  noPadding?: boolean;
  glowColor?: string;
  borderRadius?: number;
  shimmer?: boolean;
  pulsate?: boolean;
}

export function LiquidGlassCard({
  variant = 'default',
  intensity = 40,
  animate = true,
  noPadding = false,
  glowColor = THEME.colors.primary[500],
  borderRadius = THEME.radius.xl,
  shimmer = false,
  pulsate = false,
  style,
  children,
  ...props
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const shimmerPosition = useRef(new Animated.Value(-1)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animate) {
      opacity.setValue(1);
      translateY.setValue(0);
      scale.setValue(1);
      return;
    }

    Animated.parallel([
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 120,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 120,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 120,
      }),
    ]).start();
  }, [animate]);

  // Shimmer effect
  useEffect(() => {
    if (!shimmer) return;

    Animated.loop(
      Animated.timing(shimmerPosition, {
        toValue: 2,
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  // Pulsate effect
  useEffect(() => {
    if (!pulsate) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.02,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulsate]);

  const variantStyles = {
    default: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: THEME.colors.glass.border,
      blur: intensity,
      glowOpacity: 0.15,
    },
    elevated: {
      background: 'rgba(255, 255, 255, 0.88)',
      border: THEME.colors.primary[200],
      blur: intensity + 20,
      glowOpacity: 0.2,
    },
    subtle: {
      background: 'rgba(255, 255, 255, 0.5)',
      border: 'rgba(255, 255, 255, 0.3)',
      blur: Math.max(intensity - 10, 10),
      glowOpacity: 0.1,
    },
    dark: {
      background: 'rgba(6, 78, 59, 0.85)',
      border: THEME.colors.primary[700],
      blur: intensity,
      glowOpacity: 0.25,
    },
    premium: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: THEME.colors.primary[300],
      blur: intensity + 30,
      glowOpacity: 0.3,
    },
  };

  const currentVariant = variantStyles[variant];
  const isDark = variant === 'dark';

  const shimmerTranslateX = shimmerPosition.interpolate({
    inputRange: [-1, 2],
    outputRange: ['-100%', '200%'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            { translateY }, 
            { scale: pulsate ? Animated.multiply(scale, pulseScale) : scale }
          ],
          borderRadius,
          borderColor: currentVariant.border,
          backgroundColor: currentVariant.background,
        },
        variant === 'elevated' && THEME.shadow.lg,
        variant === 'default' && THEME.shadow.md,
        variant === 'subtle' && THEME.shadow.sm,
        variant === 'premium' && THEME.shadow.glow,
        style,
      ]}
      {...props}
    >
      <BlurView
        intensity={currentVariant.blur}
        tint={isDark ? 'dark' : 'light'}
        style={[StyleSheet.absoluteFill, { borderRadius }]}
      />
      
      {/* Gradient Overlay - Enhanced liquid effect */}
      <View style={[StyleSheet.absoluteFill, { borderRadius, overflow: 'hidden' }]}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="glassGlow" cx="50%" cy="0%" rx="80%" ry="80%">
              <Stop offset="0%" stopColor={glowColor} stopOpacity={String(currentVariant.glowOpacity)} />
              <Stop offset="50%" stopColor={glowColor} stopOpacity={String(currentVariant.glowOpacity * 0.3)} />
              <Stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </RadialGradient>
            <LinearGradient id="topShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#glassGlow)" />
          <Rect x="0" y="0" width="100%" height="40%" fill="url(#topShine)" />
        </Svg>
      </View>

      {/* Top shine effect - more prominent */}
      <View 
        style={[
          styles.shine, 
          { 
            borderTopLeftRadius: borderRadius, 
            borderTopRightRadius: borderRadius,
            opacity: isDark ? 0.1 : 0.25,
          }
        ]} 
      />

      {/* Inner glow border */}
      <View 
        style={[
          styles.innerGlow,
          { 
            borderRadius: borderRadius - 1,
            borderColor: isDark 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.5)',
          }
        ]} 
      />

      {/* Shimmer effect */}
      {shimmer && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslateX as any }],
              borderRadius,
            }
          ]}
        />
      )}
      
      <View style={[styles.content, noPadding && { padding: 0 }]}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1.5,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  innerGlow: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },
  content: {
    padding: THEME.spacing.lg,
    zIndex: 1,
  },
});
