import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

/**
 * Gesture animation utilities
 * Uses react-native-gesture-handler for touch interactions
 */

/**
 * Pan gesture configuration
 */
export const createPanGesture = (
  onUpdate: (translation: { x: number; y: number }) => void,
  onEnd?: (translation: { x: number; y: number }) => void
) => {
  'worklet';
  return Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      onUpdate({ x: event.translationX, y: event.translationY });
    })
    .onEnd((event) => {
      'worklet';
      onEnd?.({ x: event.translationX, y: event.translationY });
    });
};

/**
 * Pinch to zoom gesture
 */
export const createPinchGesture = (
  onScale: (scale: number) => void,
  onEnd?: (scale: number) => void
) => {
  'worklet';
  return Gesture.Pinch()
    .onUpdate((event) => {
      'worklet';
      onScale(event.scale);
    })
    .onEnd((event) => {
      'worklet';
      onEnd?.(event.scale);
    });
};

/**
 * Rotation gesture
 */
export const createRotationGesture = (
  onRotate: (rotation: number) => void,
  onEnd?: (rotation: number) => void
) => {
  'worklet';
  return Gesture.Rotation()
    .onUpdate((event) => {
      'worklet';
      onRotate(event.rotation);
    })
    .onEnd((event) => {
      'worklet';
      onEnd?.(event.rotation);
    });
};

/**
 * Swipe gesture (horizontal)
 */
export const createSwipeGesture = (
  direction: 'left' | 'right',
  onSwipe: () => void,
  threshold: number = 100
) => {
  'worklet';
  return Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onEnd((event) => {
      'worklet';
      if (direction === 'right' && event.translationX > threshold) {
        runOnJS(onSwipe)();
      } else if (direction === 'left' && event.translationX < -threshold) {
        runOnJS(onSwipe)();
      }
    });
};

/**
 * Long press gesture
 */
export const createLongPressGesture = (
  onLongPress: () => void,
  duration: number = 500
) => {
  'worklet';
  return Gesture.LongPress()
    .minDuration(duration)
    .onEnd(() => {
      'worklet';
      runOnJS(onLongPress)();
    });
};

/**
 * Tap gesture
 */
export const createTapGesture = (
  onTap: () => void,
  numberOfTaps: number = 1
) => {
  'worklet';
  return Gesture.Tap()
    .numberOfTaps(numberOfTaps)
    .onEnd(() => {
      'worklet';
      runOnJS(onTap)();
    });
};

/**
 * Double tap gesture
 */
export const createDoubleTapGesture = (onDoubleTap: () => void) => {
  'worklet';
  return createTapGesture(onDoubleTap, 2);
};

/**
 * Compose multiple gestures
 */
export const createComposedGesture = (
  pan?: Gesture.PanGesture,
  pinch?: Gesture.PinchGesture,
  rotation?: Gesture.RotationGesture,
  tap?: Gesture.TapGesture
) => {
  'worklet';
  const gestures: Gesture[] = [];

  if (pan) gestures.push(pan);
  if (pinch) gestures.push(pinch);
  if (rotation) gestures.push(rotation);
  if (tap) gestures.push(tap);

  return Gesture.Race(...gestures);
};

/**
 * Swipe to delete gesture
 */
export const createSwipeToDeleteGesture = (
  onSwipe: () => void,
  threshold: number = -150
) => {
  'worklet';
  return Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onEnd((event) => {
      'worklet';
      if (event.translationX < threshold) {
        runOnJS(onSwipe)();
      }
    });
};

/**
 * Pull to refresh gesture
 */
export const createPullToRefreshGesture = (
  onRefresh: () => void,
  threshold: number = 80
) => {
  'worklet';
  return Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onUpdate((event) => {
      'worklet';
      // Trigger UI update for pull progress
      if (event.translationY > 0) {
        return event.translationY;
      }
      return 0;
    })
    .onEnd((event) => {
      'worklet';
      if (event.translationY > threshold) {
        runOnJS(onRefresh)();
      }
    });
};

/**
 * Draggable card gesture
 */
export const createDragGesture = (
  onDrag: (translation: { x: number; y: number }) => void,
  onDragEnd?: (translation: { x: number; y: number }) => void
) => {
  'worklet';
  return Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      onDrag({ x: event.translationX, y: event.translationY });
    })
    .onEnd((event) => {
      'worklet';
      onDragEnd?.({ x: event.translationX, y: event.translationY });
    });
};

/**
 * Gesture detector configuration presets
 */
export const GesturePresets = {
  // Pan with active offset
  pan: {
    activeOffsetX: [-10, 10],
    activeOffsetY: [-10, 10],
  },

  // Pinch with scale range
  pinch: {
    minScale: 0.5,
    maxScale: 3,
  },

  // Rotation with limits
  rotation: {
    minRotation: -Math.PI,
    maxRotation: Math.PI,
  },

  // Swipe thresholds
  swipe: {
    horizontal: 100,
    vertical: 100,
  },

  // Long press duration
  longPress: {
    short: 300,
    normal: 500,
    long: 800,
  },
};

/**
 * Gesture handler with haptic feedback wrapper
 */
export const createGestureWithHaptic = (
  gesture: Gesture,
  hapticTrigger: 'onStart' | 'onUpdate' | 'onEnd' = 'onEnd',
  hapticFn: () => void = () => {}
) => {
  'worklet';
  return gesture;
};
