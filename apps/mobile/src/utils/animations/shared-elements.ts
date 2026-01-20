import { interpolate, SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

/**
 * Shared element transition utilities
 * For hero animations and screen-to-screen transitions
 */

/**
 * Shared element transition types
 */
export type SharedElementTransition =
  | 'fade'
  | 'move'
  | 'resize'
  | 'scale'
  | 'morph'
  | 'explode'
  | 'implode';

/**
 * Hero image transition configuration
 */
export interface HeroTransitionConfig {
  duration?: number;
  easing?: (t: number) => number;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  alignment?: 'center' | 'top' | 'bottom';
}

/**
 * Create hero transition animation
 */
export const createHeroTransition = (
  progress: SharedValue<number>,
  config: HeroTransitionConfig = {}
) => {
  const {
    duration = 400,
    easing = (t: number) => t,
    resizeMode = 'cover',
    alignment = 'center',
  } = config;

  return {
    progress,
    duration,
    easing,
    resizeMode,
    alignment,
  };
};

/**
 * Shared element position interpolator
 */
export const interpolatePosition = (
  progress: SharedValue<number>,
  from: { x: number; y: number },
  to: { x: number; y: number }
) => {
  const x = interpolate(progress.value, [0, 1], [from.x, to.x]);
  const y = interpolate(progress.value, [0, 1], [from.y, to.y]);

  return { x, y };
};

/**
 * Shared element size interpolator
 */
export const interpolateSize = (
  progress: SharedValue<number>,
  from: { width: number; height: number },
  to: { width: number; height: number }
) => {
  const width = interpolate(progress.value, [0, 1], [from.width, to.width]);
  const height = interpolate(progress.value, [0, 1], [from.height, to.height]);

  return { width, height };
};

/**
 * Shared element scale interpolator
 */
export const interpolateScale = (
  progress: SharedValue<number>,
  from: number,
  to: number
) => {
  return interpolate(progress.value, [0, 1], [from, to]);
};

/**
 * Shared element opacity interpolator
 */
export const interpolateOpacity = (
  progress: SharedValue<number>,
  from: number = 0,
  to: number = 1,
  fadeOutDelay: number = 0.7,
  fadeOutDuration: number = 0.3
) => {
  // Fade in at start, fade out at end
  if (progress.value < fadeOutDelay) {
    return interpolate(progress.value, [0, fadeOutDelay], [from, to]);
  } else {
    return interpolate(
      progress.value,
      [fadeOutDelay, fadeOutDelay + fadeOutDuration],
      [to, from]
    );
  }
};

/**
 * Shared element border radius interpolator
 */
export const interpolateBorderRadius = (
  progress: SharedValue<number>,
  from: number,
  to: number
) => {
  return interpolate(progress.value, [0, 1], [from, to]);
};

/**
 * Container transform animation
 */
export const withContainerTransform = (
  progress: SharedValue<number>,
  fromRect: { x: number; y: number; width: number; height: number },
  toRect: { x: number; y: number; width: number; height: number },
  fromBorderRadius: number = 0,
  toBorderRadius: number = 0
) => {
  return {
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [fromRect.x, toRect.x]
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [fromRect.y, toRect.y]
        ),
      },
    ],
    width: interpolate(
      progress.value,
      [0, 1],
      [fromRect.width, toRect.width]
    ),
    height: interpolate(
      progress.value,
      [0, 1],
      [fromRect.height, toRect.height]
    ),
    borderRadius: interpolate(
      progress.value,
      [0, 1],
      [fromBorderRadius, toBorderRadius]
    ),
  };
};

/**
 * Text morphing animation
 */
export const withTextMorph = (
  progress: SharedValue<number>,
  fromText: string,
  toText: string
) => {
  // This is a simplified version - true text morphing is more complex
  // You would typically use a character-by-character interpolation
  const text =
    progress.value < 0.5
      ? fromText
      : toText;

  return {
    text,
    opacity: interpolateOpacity(progress, 1, 1, 0.4, 0.1),
  };
};

/**
 * Color interpolation
 */
export const interpolateColor = (
  progress: SharedValue<number>,
  fromColor: string,
  toColor: string
) => {
  // Note: React Native Reanimated doesn't support color interpolation directly
  // You would need to use a library like react-native-reanimated-color
  // or implement custom color interpolation

  // Simplified version - returns fromColor or toColor based on progress
  return progress.value < 0.5 ? fromColor : toColor;
};

/**
 * Create shared element animated style
 */
export const useSharedElementStyle = (
  progress: SharedValue<number>,
  from: {
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius?: number;
    opacity?: number;
  },
  to: {
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius?: number;
    opacity?: number;
  }
) => {
  return useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [from.x, to.x]
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [from.y, to.y]
          ),
        },
      ],
      width: interpolate(
        progress.value,
        [0, 1],
        [from.width, to.width]
      ),
      height: interpolate(
        progress.value,
        [0, 1],
        [from.height, to.height]
      ),
      borderRadius: interpolate(
        progress.value,
        [0, 1],
        [from.borderRadius ?? 0, to.borderRadius ?? 0]
      ),
      opacity: interpolate(
        progress.value,
        [0, 1],
        [from.opacity ?? 1, to.opacity ?? 1]
      ),
    };
  });
};

/**
 * Screen transition configuration
 */
export interface ScreenTransitionConfig {
  duration?: number;
  easing?: (t: number) => number;
  enterDirection?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  exitDirection?: 'left' | 'right' | 'top' | 'bottom' | 'center';
}

/**
 * Create screen transition animation
 */
export const createScreenTransition = (
  config: ScreenTransitionConfig = {}
) => {
  const {
    duration = 350,
    easing = (t: number) => t,
    enterDirection = 'right',
    exitDirection = 'left',
  } = config;

  const enterAnimations = {
    left: { x: -100, y: 0, opacity: 0 },
    right: { x: 100, y: 0, opacity: 0 },
    top: { x: 0, y: -100, opacity: 0 },
    bottom: { x: 0, y: 100, opacity: 0 },
    center: { x: 0, y: 0, opacity: 0 },
  };

  const exitAnimations = {
    left: { x: -50, y: 0, opacity: 1 },
    right: { x: 50, y: 0, opacity: 1 },
    top: { x: 0, y: -50, opacity: 1 },
    bottom: { x: 0, y: 50, opacity: 1 },
    center: { x: 0, y: 0, opacity: 1 },
  };

  return {
    duration,
    easing,
    enter: enterAnimations[enterDirection],
    exit: exitAnimations[exitDirection],
  };
};

/**
 * Transition presets
 */
export const TransitionPresets = {
  // Modal presentation
  modalPresent: {
    duration: 350,
    enterDirection: 'bottom' as const,
    exitDirection: 'bottom' as const,
  },

  // Push navigation
  pushEnter: {
    duration: 300,
    enterDirection: 'right' as const,
    exitDirection: 'left' as const,
  },

  // Pop navigation
  popExit: {
    duration: 250,
    enterDirection: 'left' as const,
    exitDirection: 'right' as const,
  },

  // Fade transition
  fade: {
    duration: 200,
    enterDirection: 'center' as const,
    exitDirection: 'center' as const,
  },

  // Hero image transition
  hero: {
    duration: 400,
    easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // easeInOutQuad
    enterDirection: 'center' as const,
    exitDirection: 'center' as const,
  },
};

/**
 * Explode animation (elements spread out)
 */
export const withExplodeAnimation = (
  progress: SharedValue<number>,
  center: { x: number; y: number },
  elements: Array<{ id: string; from: { x: number; y: number }; to: { x: number; y: number } }>
) => {
  return elements.map((element) => {
    const x = interpolate(
      progress.value,
      [0, 1],
      [element.from.x, element.to.x]
    );
    const y = interpolate(
      progress.value,
      [0, 1],
      [element.from.y, element.to.y]
    );

    return {
      id: element.id,
      x,
      y,
    };
  });
};

/**
 * Implode animation (elements come together)
 */
export const withImplodeAnimation = (
  progress: SharedValue<number>,
  center: { x: number; y: number },
  elements: Array<{ id: string; from: { x: number; y: number }; to: { x: number; y: number } }>
) => {
  // Reverse of explode
  return withExplodeAnimation(progress, center, elements.map(el => ({
    ...el,
    from: el.to,
    to: el.from,
  })));
};
