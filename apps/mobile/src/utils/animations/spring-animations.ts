import { withSpring, WithSpringConfig } from 'react-native-reanimated';

/**
 * Spring animation configurations for different feels
 * Using react-native-reanimated 3+
 */

// Bouncy spring for buttons and cards
export const bouncySpringConfig: WithSpringConfig = {
  damping: 8,
  stiffness: 400,
  mass: 0.5,
};

// Smooth spring for transitions
export const smoothSpringConfig: WithSpringConfig = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

// Stiff spring for precise movements
export const stiffSpringConfig: WithSpringConfig = {
  damping: 25,
  stiffness: 300,
  mass: 1,
};

// Gentle spring for subtle animations
export const gentleSpringConfig: WithSpringConfig = {
  damping: 20,
  stiffness: 100,
  mass: 0.8,
};

// Soft spring for delicate interactions
export const softSpringConfig: WithSpringConfig = {
  damping: 12,
  stiffness: 80,
  mass: 0.6,
};

/**
 * Spring animation helpers
 */

export const withSpringBouncy = (toValue: number) => {
  return withSpring(toValue, bouncySpringConfig);
};

export const withSpringSmooth = (toValue: number) => {
  return withSpring(toValue, smoothSpringConfig);
};

export const withSpringStiff = (toValue: number) => {
  return withSpring(toValue, stiffSpringConfig);
};

export const withSpringGentle = (toValue: number) => {
  return withSpring(toValue, gentleSpringConfig);
};

export const withSpringSoft = (toValue: number) => {
  return withSpring(toValue, softSpringConfig);
};

/**
 * Preset spring configurations for common use cases
 */
export const SpringPresets = {
  // Button press
  buttonPress: { damping: 10, stiffness: 300, mass: 0.5 },

  // Card expand/collapse
  cardExpand: { damping: 20, stiffness: 150, mass: 1 },

  // Modal appearance
  modalAppear: { damping: 15, stiffness: 200, mass: 0.8 },

  // Tab switch
  tabSwitch: { damping: 18, stiffness: 250, mass: 0.7 },

  // Scale transform
  scaleUp: { damping: 8, stiffness: 350, mass: 0.5 },
  scaleDown: { damping: 8, stiffness: 350, mass: 0.5 },

  // Slide animations
  slideIn: { damping: 25, stiffness: 200, mass: 1 },
  slideOut: { damping: 25, stiffness: 200, mass: 1 },

  // Rotation
  rotate: { damping: 12, stiffness: 180, mass: 0.6 },

  // Progress fill
  progress: { damping: 20, stiffness: 120, mass: 1 },
};

/**
 * Helper to create custom spring config
 */
export const createSpringConfig = (
  damping: number = 15,
  stiffness: number = 150,
  mass: number = 1
): WithSpringConfig => ({
  damping,
  stiffness,
  mass,
});
