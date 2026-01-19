import React, { useEffect, useRef } from "react";
import { View, ViewProps, StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";

type Props = ViewProps & {
  intensity?: number;
  animate?: boolean;
  noPadding?: boolean;
};

export function GlassCard({
  intensity = 25,
  animate = true,
  noPadding = false,
  style,
  children,
  ...props
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    if (!animate) {
      opacity.setValue(1);
      translateY.setValue(0);
      return;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animate, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, transform: [{ translateY }] },
        style,
      ]}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />
      <View style={[styles.content, noPadding && { padding: 0 }]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.15)",
    backgroundColor: "rgba(255,255,255,0.6)",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16,185,129,0.06)",
  },
  content: {
    padding: 20,
  },
});
