import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Animated, StyleSheet, View, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { THEME } from '../../theme';

interface Props extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  shimmer?: boolean;
}

export function GlassButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  fullWidth = false,
  loading = false,
  shimmer = false,
  style,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const shimmerPosition = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Shimmer effect
  useEffect(() => {
    if (!shimmer) return;

    Animated.loop(
      Animated.timing(shimmerPosition, {
        toValue: 2,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  const handlePressIn = (e: any) => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 12,
      stiffness: 180,
    }).start();
    onPressOut?.(e);
  };

  const sizeStyles = {
    sm: { height: 40, paddingHorizontal: 16, borderRadius: 14, fontSize: 13 },
    md: { height: 52, paddingHorizontal: 24, borderRadius: 18, fontSize: 15 },
    lg: { height: 60, paddingHorizontal: 32, borderRadius: 22, fontSize: 16 },
    xl: { height: 68, paddingHorizontal: 40, borderRadius: 26, fontSize: 17 },
  };

  const variantStyles = {
    primary: {
      backgroundColor: THEME.colors.primary[600],
      borderColor: THEME.colors.primary[500],
      textColor: '#ffffff',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderColor: THEME.colors.glass.border,
      textColor: THEME.colors.text.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: THEME.colors.primary[600],
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderColor: THEME.colors.glass.borderLight,
      textColor: THEME.colors.text.primary,
    },
    gradient: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: '#ffffff',
    },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  const shimmerTranslateX = shimmerPosition.interpolate({
    inputRange: [-1, 2],
    outputRange: ['-100%', '200%'],
  });

  return (
    <Animated.View
      style={[
        { transform: [{ scale }], opacity },
        fullWidth && { width: '100%' },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          {
            height: currentSize.height,
            paddingHorizontal: currentSize.paddingHorizontal,
            borderRadius: currentSize.borderRadius,
            backgroundColor: currentVariant.backgroundColor,
            borderColor: currentVariant.borderColor,
          },
          variant === 'primary' && THEME.shadow.md,
          variant === 'gradient' && THEME.shadow.glow,
          (disabled || loading) && styles.disabled,
          style,
        ]}
        {...props}
      >
        {/* Gradient background for gradient variant */}
        {variant === 'gradient' && (
          <View style={[StyleSheet.absoluteFill, { borderRadius: currentSize.borderRadius, overflow: 'hidden' }]}>
            <Svg width="100%" height="100%">
              <Defs>
                <LinearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={THEME.colors.primary[400]} stopOpacity="1" />
                  <Stop offset="100%" stopColor={THEME.colors.primary[600]} stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#buttonGradient)" />
            </Svg>
          </View>
        )}

        {/* Glass blur effect */}
        {(variant === 'glass' || variant === 'secondary') && (
          <BlurView
            intensity={variant === 'glass' ? 30 : 20}
            tint="light"
            style={[StyleSheet.absoluteFill, { borderRadius: currentSize.borderRadius }]}
          />
        )}

        {/* Top shine */}
        <View 
          style={[
            styles.shine, 
            { 
              borderTopLeftRadius: currentSize.borderRadius, 
              borderTopRightRadius: currentSize.borderRadius 
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
                borderRadius: currentSize.borderRadius,
              }
            ]}
          />
        )}

        <View style={styles.content}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          {loading ? (
            <Animated.View style={styles.loader} />
          ) : (
            children
          )}
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: [{ skewX: '-20deg' }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 1,
  },
  iconLeft: {
    marginRight: 2,
  },
  iconRight: {
    marginLeft: 2,
  },
  loader: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
  },
  disabled: {
    opacity: 0.5,
  },
});
