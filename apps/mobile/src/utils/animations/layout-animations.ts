import { withDelay, withSequence, withTiming } from 'react-native-reanimated';

/**
 * Layout animation utilities
 * For animating lists, grids, and staggered content
 */

/**
 * Stagger animation - animate items one after another
 * @param index The index of the item in the list
 * @param baseDelay The base delay before starting the stagger
 * @param staggerDelay The delay between each item
 * @returns Animation configuration
 */
export const createStaggerConfig = (
  index: number,
  baseDelay: number = 0,
  staggerDelay: number = 50
) => {
  const delay = baseDelay + index * staggerDelay;
  return { delay };
};

/**
 * Create staggered entry animation for list items
 */
export const withStaggeredFadeIn = (
  index: number,
  baseDelay: number = 0,
  staggerDelay: number = 50,
  duration: number = 300
) => {
  return withDelay(
    baseDelay + index * staggerDelay,
    withTiming(1, { duration })
  );
};

/**
 * Create staggered slide up animation
 */
export const withStaggeredSlideUp = (
  index: number,
  baseDelay: number = 0,
  staggerDelay: number = 50,
  duration: number = 300,
  fromValue: number = 20
) => {
  return withDelay(
    baseDelay + index * staggerDelay,
    withTiming(0, {
      duration,
      // Custom easing
    })
  );
};

/**
 * Create staggered scale animation
 */
export const withStaggeredScale = (
  index: number,
  baseDelay: number = 0,
  staggerDelay: number = 50,
  duration: number = 250
) => {
  return withDelay(
    baseDelay + index * staggerDelay,
    withTiming(1, { duration })
  );
};

/**
 * Sequence animations - run animations one after another
 */
export const createSequenceAnimation = (
  animations: Array<() => any>
) => {
  return withSequence(...animations.map(anim => anim()));
};

/**
 * Parallel animations - run multiple animations at once
 */
export const createParallelAnimation = (
  animations: Array<any>
) => {
  // Reanimated handles this naturally by using multiple Animated.Value's
  return animations;
};

/**
 * Delay helper
 */
export const withDelay = (
  delay: number,
  animation: any
) => {
  return withDelay(delay, animation);
};

/**
 * Stagger presets for common use cases
 */
export const StaggerPresets = {
  // Fast stagger for list items
  fast: {
    baseDelay: 0,
    staggerDelay: 30,
    duration: 200,
  },

  // Normal stagger for cards
  normal: {
    baseDelay: 50,
    staggerDelay: 50,
    duration: 300,
  },

  // Slow stagger for emphasis
  slow: {
    baseDelay: 100,
    staggerDelay: 100,
    duration: 400,
  },

  // Cascade effect
  cascade: {
    baseDelay: 0,
    staggerDelay: 75,
    duration: 350,
  },

  // Wave effect
  wave: {
    baseDelay: 0,
    staggerDelay: 100,
    duration: 300,
  },
};

/**
 * Layout change animation (when items are added/removed)
 */
export const withLayoutChange = (
  toValue: number,
  duration: number = 300
) => {
  return withTiming(toValue, { duration });
};

/**
 * Enter animation for new items
 */
export const withEnterAnimation = (
  type: 'fade' | 'slide' | 'scale' = 'fade',
  duration: number = 300
) => {
  switch (type) {
    case 'fade':
      return withTiming(1, { duration });
    case 'slide':
      return withTiming(0, { duration });
    case 'scale':
      return withTiming(1, { duration });
    default:
      return withTiming(1, { duration });
  }
};

/**
 * Exit animation for removing items
 */
export const withExitAnimation = (
  type: 'fade' | 'slide' | 'scale' = 'fade',
  duration: number = 200
) => {
  switch (type) {
    case 'fade':
      return withTiming(0, { duration });
    case 'slide':
      return withTiming(-50, { duration });
    case 'scale':
      return withTiming(0.8, { duration });
    default:
      return withTiming(0, { duration });
  }
};

/**
 * Animated list item animation helper
 * Creates both enter and exit animations for list items
 */
export const createListItemAnimation = (index: number, isEntering: boolean) => {
  if (isEntering) {
    return {
      opacity: withStaggeredFadeIn(index),
      transform: [{
        translateY: withStaggeredSlideUp(index)
      }]
    };
  } else {
    return {
      opacity: withExitAnimation('fade'),
      transform: [{
        translateY: withExitAnimation('slide')
      }]
    };
  }
};

/**
 * Grid stagger animation
 * Animates items in a grid with a wave effect
 */
export const createGridStagger = (
  index: number,
  columns: number,
  baseDelay: number = 0,
  staggerDelay: number = 50
) => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const delay = baseDelay + (row + col) * staggerDelay;

  return withDelay(delay, withTiming(1, { duration: 300 }));
};

/**
 * Masonry layout animation
 */
export const createMasonryAnimation = (
  index: number,
  column: number,
  baseDelay: number = 0,
  staggerDelay: number = 30
) => {
  const delay = baseDelay + column * staggerDelay + index * 10;

  return withDelay(delay, withTiming(1, { duration: 350 }));
};

/**
 * Accordion expand/collapse animation
 */
export const withAccordionAnimation = (
  isExpanded: boolean,
  height: number,
  duration: number = 300
) => {
  return withTiming(isExpanded ? height : 0, { duration });
};

/**
 * Reorder animation for drag-to-reorder
 */
export const withReorderAnimation = (
  fromIndex: number,
  toIndex: number,
  position: { x: number; y: number }
) => {
  // This would be used with a gesture handler
  // Return the animated position
  return position;
};

/**
 * Skeleton loading animation
 * Shimmer effect that moves across the component
 */
export const createSkeletonAnimation = (
  duration: number = 1500
) => {
  return {
    // Animate a gradient or shimmer across the view
    // This would typically be a translateX animation
  };
};

/**
 * Progress animation for loaders
 */
export const withProgressAnimation = (
  fromValue: number,
  toValue: number,
  duration: number = 1000
) => {
  return withTiming(toValue, { duration });
};

/**
 * Countdown animation
 */
export const withCountdownAnimation = (
  from: number,
  to: number,
  duration: number = 1000,
  onUpdate?: (value: number) => void
) => {
  // This would need a more complex setup with animated value and listeners
  return withTiming(to, { duration });
};
