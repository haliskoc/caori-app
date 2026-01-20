import { withTiming, WithTimingConfig } from 'react-native-reanimated';

/**
 * Timing animation configurations
 */

// Instant - no animation
export const instantConfig: WithTimingConfig = {
  duration: 100,
};

// Fast - quick transitions
export const fastConfig: WithTimingConfig = {
  duration: 200,
};

// Normal - standard timing
export const normalConfig: WithTimingConfig = {
  duration: 300,
};

// Slow - deliberate animations
export const slowConfig: WithTimingConfig = {
  duration: 500,
};

// Slower - emphasis animations
export const slowerConfig: WithTimingConfig = {
  duration: 800,
};

/**
 * Timing animation helpers
 */

export const withFadeIn = (toValue: number = 1, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withFadeOut = (toValue: number = 0, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withSlideUp = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withSlideDown = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withSlideLeft = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withSlideRight = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

export const withScale = (
  toValue: number,
  duration: number = 200,
  easing?: (t: number) => number
) => {
  return withTiming(toValue, { duration, easing });
};

export const withRotate = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, { duration });
};

/**
 * Easing functions
 */
export const Easing = {
  // Linear
  linear: (t: number) => t,

  // Quad
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  // Quart
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,

  // Quint
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t * t,
  easeInOutQuint: (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t * t,

  // Sine
  easeInSine: (t: number) => -Math.cos(t * (Math.PI / 2)) + 1,
  easeOutSine: (t: number) => Math.sin(t * (Math.PI / 2)),
  easeInOutSine: (t: number) => -Math.cos(Math.PI * t) / 2 + 0.5,

  // Expo
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeOutExpo: (t: number) => (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * t - 10);
    return 0.5 * (-Math.pow(2, -10 * t) + 2);
  },

  // Circ
  easeInCirc: (t: number) => -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t: number) => Math.sqrt(1 - --t * t),
  easeInOutCirc: (t: number) =>
    t < 0.5
      ? -(Math.sqrt(1 - 2 * t * t) - 1) / 2
      : (Math.sqrt(1 - 2 * (t - 1) * (t - 1)) + 1) / 2,

  // Back
  easeInBack: (t: number) => {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  easeOutBack: (t: number) => {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
  },
  easeInOutBack: (t: number) => {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
  },

  // Elastic
  easeInElastic: (t: number) => {
    if (t === 0 || t === 1) return t;
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
  },
  easeOutElastic: (t: number) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
  },
  easeInOutElastic: (t: number) => {
    if (t === 0 || t === 1) return t;
    t = t * 2;
    if (t < 1) {
      return -0.5 * Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
    }
    return 0.5 * Math.pow(2, -10 * t + 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)) + 1;
  },

  // Bounce
  easeInBounce: (t: number) => 1 - Easing.easeOutBounce(1 - t),
  easeOutBounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  easeInOutBounce: (t: number) =>
    t < 0.5 ? Easing.easeInBounce(t * 2) * 0.5 : Easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5,
};

/**
 * Preset timing configurations
 */
export const TimingPresets = {
  // Fade
  fadeIn: { duration: 300, easing: Easing.easeOutQuad },
  fadeOut: { duration: 200, easing: Easing.easeInQuad },

  // Slide
  slideUp: { duration: 300, easing: Easing.easeOutCubic },
  slideDown: { duration: 300, easing: Easing.easeInCubic },
  slideLeft: { duration: 250, easing: Easing.easeInOutQuad },
  slideRight: { duration: 250, easing: Easing.easeInOutQuad },

  // Scale
  scaleUp: { duration: 200, easing: Easing.easeOutBack },
  scaleDown: { duration: 200, easing: Easing.easeInBack },

  // Rotate
  rotate: { duration: 400, easing: Easing.easeInOutCubic },

  // Bounce effects
  bounceIn: { duration: 600, easing: Easing.easeOutBounce },
  bounceOut: { duration: 600, easing: Easing.easeInBounce },

  // Elastic effects
  elasticIn: { duration: 800, easing: Easing.easeOutElastic },
  elasticOut: { duration: 800, easing: Easing.easeInElastic },
};

/**
 * Helper to create custom timing config
 */
export const createTimingConfig = (
  duration: number = 300,
  easing?: (t: number) => number
): WithTimingConfig => ({
  duration,
  easing,
});
