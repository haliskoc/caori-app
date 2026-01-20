/**
 * Animation utilities for Cal AI mobile app
 * Built with react-native-reanimated 3+
 */

// Spring animations
export * from './spring-animations';
export {
  bouncySpringConfig,
  smoothSpringConfig,
  stiffSpringConfig,
  gentleSpringConfig,
  softSpringConfig,
} from './spring-animations';
export {
  withSpringBouncy,
  withSpringSmooth,
  withSpringStiff,
  withSpringGentle,
  withSpringSoft,
} from './spring-animations';
export { SpringPresets } from './spring-animations';

// Timing animations
export * from './timing-animations';
export {
  instantConfig,
  fastConfig,
  normalConfig,
  slowConfig,
  slowerConfig,
} from './timing-animations';
export {
  withFadeIn,
  withFadeOut,
  withSlideUp,
  withSlideDown,
  withSlideLeft,
  withSlideRight,
  withScale,
  withRotate,
} from './timing-animations';
export { Easing, TimingPresets } from './timing-animations';

// Gesture animations
export * from './gesture-animations';
export {
  createPanGesture,
  createPinchGesture,
  createRotationGesture,
  createSwipeGesture,
  createLongPressGesture,
  createTapGesture,
  createDoubleTapGesture,
  createComposedGesture,
  createSwipeToDeleteGesture,
  createPullToRefreshGesture,
  createDragGesture,
} from './gesture-animations';
export { GesturePresets } from './gesture-animations';

// Layout animations
export * from './layout-animations';
export {
  createStaggerConfig,
  withStaggeredFadeIn,
  withStaggeredSlideUp,
  withStaggeredScale,
  createSequenceAnimation,
  createParallelAnimation,
} from './layout-animations';
export { StaggerPresets } from './layout-animations';

// Shared element transitions
export * from './shared-elements';
export {
  type SharedElementTransition,
  createHeroTransition,
  interpolatePosition,
  interpolateSize,
  interpolateScale,
  interpolateOpacity,
  interpolateBorderRadius,
  withContainerTransform,
  withTextMorph,
  useSharedElementStyle,
  createScreenTransition,
  TransitionPresets,
} from './shared-elements';
