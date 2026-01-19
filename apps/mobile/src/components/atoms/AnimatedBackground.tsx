import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse, LinearGradient, Rect } from 'react-native-svg';
import { THEME } from '../../theme';

const { width, height } = Dimensions.get('window');

interface Props {
  variant?: 'default' | 'subtle' | 'intense';
}

export function AnimatedBackground({ variant = 'default' }: Props) {
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;
  const floatY1 = useRef(new Animated.Value(0)).current;
  const floatY2 = useRef(new Animated.Value(0)).current;
  const floatX1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulse = (value: Animated.Value, delay: number, duration: number = 4000) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const createFloat = (value: Animated.Value, toValue: number, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: -toValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    };

    Animated.parallel([
      createPulse(pulse1, 0),
      createPulse(pulse2, 1500),
      createPulse(pulse3, 3000),
      createFloat(floatY1, 20, 6000),
      createFloat(floatY2, 15, 8000),
      createFloat(floatX1, 10, 7000),
    ]).start();
  }, []);

  const opacity1 = pulse1.interpolate({
    inputRange: [0, 1],
    outputRange: variant === 'intense' ? [0.4, 0.7] : [0.25, 0.5],
  });

  const opacity2 = pulse2.interpolate({
    inputRange: [0, 1],
    outputRange: variant === 'intense' ? [0.3, 0.6] : [0.2, 0.45],
  });

  const opacity3 = pulse3.interpolate({
    inputRange: [0, 1],
    outputRange: variant === 'intense' ? [0.25, 0.5] : [0.15, 0.35],
  });

  const scale1 = pulse1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  const scale2 = pulse2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const scale3 = pulse3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.1],
  });

  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={THEME.colors.background.primary} stopOpacity="1" />
            <Stop offset="50%" stopColor={THEME.colors.background.secondary} stopOpacity="1" />
            <Stop offset="100%" stopColor={THEME.colors.primary[50]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#baseGradient)" />
      </Svg>
      
      {/* Animated floating orbs with liquid glass effect */}
      <Animated.View 
        style={[
          styles.orb, 
          styles.orb1, 
          { 
            opacity: opacity1,
            transform: [
              { scale: scale1 },
              { translateY: floatY1 },
              { translateX: floatX1 },
            ],
          }
        ]} 
      >
        <View style={styles.orbInner} />
        <View style={styles.orbShine} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.orb, 
          styles.orb2, 
          { 
            opacity: opacity2,
            transform: [
              { scale: scale2 },
              { translateY: floatY2 },
            ],
          }
        ]} 
      >
        <View style={styles.orbInner} />
        <View style={styles.orbShine} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.orb, 
          styles.orb3, 
          { 
            opacity: opacity3,
            transform: [{ scale: scale3 }],
          }
        ]} 
      >
        <View style={styles.orbInner} />
        <View style={styles.orbShine} />
      </Animated.View>

      {/* Additional small floating particles */}
      <Animated.View 
        style={[
          styles.particle, 
          styles.particle1,
          { transform: [{ translateY: floatY1 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.particle, 
          styles.particle2,
          { transform: [{ translateY: floatY2 }] }
        ]} 
      />
      <Animated.View 
        style={[
          styles.particle, 
          styles.particle3,
          { transform: [{ translateX: floatX1 }] }
        ]} 
      />

      {/* SVG gradient overlay for more liquid effect */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="glow1" cx="15%" cy="15%" rx="45%" ry="45%">
            <Stop offset="0%" stopColor={THEME.colors.primary[400]} stopOpacity="0.35" />
            <Stop offset="50%" stopColor={THEME.colors.primary[300]} stopOpacity="0.15" />
            <Stop offset="100%" stopColor={THEME.colors.primary[200]} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="glow2" cx="85%" cy="55%" rx="40%" ry="40%">
            <Stop offset="0%" stopColor={THEME.colors.primary[300]} stopOpacity="0.25" />
            <Stop offset="60%" stopColor={THEME.colors.primary[200]} stopOpacity="0.1" />
            <Stop offset="100%" stopColor={THEME.colors.primary[100]} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="glow3" cx="30%" cy="85%" rx="35%" ry="35%">
            <Stop offset="0%" stopColor={THEME.colors.primary[400]} stopOpacity="0.2" />
            <Stop offset="100%" stopColor={THEME.colors.primary[300]} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse cx={width * 0.15} cy={height * 0.12} rx={220} ry={220} fill="url(#glow1)" />
        <Ellipse cx={width * 0.9} cy={height * 0.5} rx={200} ry={200} fill="url(#glow2)" />
        <Ellipse cx={width * 0.25} cy={height * 0.85} rx={180} ry={180} fill="url(#glow3)" />
      </Svg>

      {/* Subtle noise texture overlay */}
      <View style={styles.noiseOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.colors.background.primary,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    overflow: 'hidden',
  },
  orbInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  orbShine: {
    position: 'absolute',
    top: '5%',
    left: '10%',
    width: '35%',
    height: '25%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  orb1: {
    width: 320,
    height: 320,
    top: -80,
    left: -80,
    backgroundColor: THEME.colors.primary[200],
  },
  orb2: {
    width: 280,
    height: 280,
    top: height * 0.38,
    right: -100,
    backgroundColor: THEME.colors.primary[100],
  },
  orb3: {
    width: 220,
    height: 220,
    bottom: 80,
    left: -70,
    backgroundColor: THEME.colors.primary[300],
  },
  particle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: THEME.colors.primary[300],
    opacity: 0.3,
  },
  particle1: {
    width: 12,
    height: 12,
    top: height * 0.25,
    right: width * 0.2,
  },
  particle2: {
    width: 8,
    height: 8,
    top: height * 0.6,
    left: width * 0.15,
  },
  particle3: {
    width: 10,
    height: 10,
    bottom: height * 0.3,
    right: width * 0.3,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
});
