import React, { useRef, ReactNode } from 'react';
import { 
  Pressable, 
  PressableProps, 
  Animated, 
  StyleSheet, 
  ViewStyle,
  View,
  Vibration,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { THEME } from '../../theme';

interface Props extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'scale' | 'bounce' | 'glow' | 'lift';
  haptic?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy';
  glassEffect?: boolean;
  disabled?: boolean;
}

export function AnimatedPressable({
  children,
  style,
  variant = 'scale',
  haptic = true,
  hapticType = 'light',
  glassEffect = false,
  disabled = false,
  onPressIn,
  onPressOut,
  onPress,
  ...props
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const triggerHaptic = () => {
    if (!haptic) return;
    
    // Use Vibration API as fallback (works on all platforms)
    const durations: Record<string, number> = {
      light: 10,
      medium: 25,
      heavy: 50,
    };
    Vibration.vibrate(durations[hapticType] || 10);
  };

  const handlePressIn = (e: any) => {
    triggerHaptic();

    const animations: Animated.CompositeAnimation[] = [];

    switch (variant) {
      case 'scale':
        animations.push(
          Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
            damping: 15,
            stiffness: 200,
          })
        );
        break;
      case 'bounce':
        animations.push(
          Animated.spring(scale, {
            toValue: 0.92,
            useNativeDriver: true,
            damping: 8,
            stiffness: 300,
          })
        );
        break;
      case 'lift':
        animations.push(
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1.02,
              useNativeDriver: true,
              damping: 15,
              stiffness: 200,
            }),
            Animated.spring(translateY, {
              toValue: -4,
              useNativeDriver: true,
              damping: 15,
              stiffness: 200,
            }),
          ])
        );
        break;
      case 'glow':
        animations.push(
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 0.98,
              useNativeDriver: true,
              damping: 15,
              stiffness: 200,
            }),
            Animated.timing(glowOpacity, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ])
        );
        break;
    }

    Animated.parallel(animations).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    const animations: Animated.CompositeAnimation[] = [];

    switch (variant) {
      case 'scale':
      case 'bounce':
        animations.push(
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            damping: 12,
            stiffness: 180,
          })
        );
        break;
      case 'lift':
        animations.push(
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              damping: 12,
              stiffness: 180,
            }),
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              damping: 12,
              stiffness: 180,
            }),
          ])
        );
        break;
      case 'glow':
        animations.push(
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              damping: 12,
              stiffness: 180,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ])
        );
        break;
    }

    Animated.parallel(animations).start();
    onPressOut?.(e);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...props}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }, { translateY }],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {/* Glow effect */}
        {variant === 'glow' && (
          <Animated.View
            style={[
              styles.glow,
              { opacity: glowOpacity },
            ]}
          />
        )}

        {/* Glass effect background */}
        {glassEffect && (
          <View style={styles.glassContainer}>
            <BlurView
              intensity={20}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          </View>
        )}

        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.colors.primary[400],
    borderRadius: 16,
    opacity: 0.2,
    transform: [{ scale: 1.05 }],
  },
  glassContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
