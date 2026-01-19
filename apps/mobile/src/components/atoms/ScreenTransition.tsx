import React, { useRef, useEffect, ReactNode } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type TransitionType = 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'scaleUp';

interface Props {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

export function ScreenTransition({
  children,
  type = 'fade',
  duration = 300,
  delay = 0,
  onComplete,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Set initial values based on transition type
    switch (type) {
      case 'slideUp':
        translateY.setValue(50);
        break;
      case 'slideDown':
        translateY.setValue(-50);
        break;
      case 'slideLeft':
        translateX.setValue(50);
        break;
      case 'slideRight':
        translateX.setValue(-50);
        break;
      case 'scale':
        scale.setValue(0.95);
        break;
      case 'scaleUp':
        scale.setValue(0.9);
        break;
    }

    const animations = [
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ];

    if (type === 'slideUp' || type === 'slideDown') {
      animations.push(
        Animated.spring(translateY, {
          toValue: 0,
          delay,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        })
      );
    }

    if (type === 'slideLeft' || type === 'slideRight') {
      animations.push(
        Animated.spring(translateX, {
          toValue: 0,
          delay,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        })
      );
    }

    if (type === 'scale' || type === 'scaleUp') {
      animations.push(
        Animated.spring(scale, {
          toValue: 1,
          delay,
          useNativeDriver: true,
          damping: 15,
          stiffness: 120,
        })
      );
    }

    Animated.parallel(animations).start(() => {
      onComplete?.();
    });
  }, [type, duration, delay]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            { translateY },
            { translateX },
            { scale },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Stagger animation for list items
interface StaggerProps {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  animationType?: TransitionType;
}

export function StaggeredList({
  children,
  staggerDelay = 50,
  initialDelay = 0,
  animationType = 'slideUp',
}: StaggerProps) {
  return (
    <View style={styles.container}>
      {React.Children.map(children, (child, index) => (
        <ScreenTransition
          key={index}
          type={animationType}
          delay={initialDelay + index * staggerDelay}
        >
          {child}
        </ScreenTransition>
      ))}
    </View>
  );
}

// Page transition wrapper with blur effect
export function PageTransition({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 130,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
