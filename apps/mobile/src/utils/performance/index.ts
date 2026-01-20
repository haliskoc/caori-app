/**
 * Performance optimization utilities for Cal AI mobile app
 * Helps maintain 60 FPS and optimal performance
 */

// Memoization utilities
export * from './memoization';
export {
  deepEqual,
  shallowEqual,
  useDeepMemoCallback,
  useMemoizedCallback,
  useDeepMemoValue,
  useShallowMemoValue,
  memoWithProps,
  createMemoComparator,
  useDebouncedValue,
  useThrottledValue,
  useCachedAsync,
  usePerformanceMonitor,
  useMemoryMonitor,
  useRenderProfiler,
  useMemoizedSelector,
} from './memoization';

// Virtualization utilities
export * from './virtualization';
export {
  OptimizedVirtualizedList,
  OptimizedFlatList,
  VirtualizedGrid,
  useVirtualizedPagination,
  createViewabilityConfig,
  VirtualizationPresets,
  getVirtualizationPreset,
  useMemoizedListData,
  useVisibleItemsTracker,
} from './virtualization';

// Image optimization utilities
export * from './image-optimization';
export {
  ImageQuality,
  ImageSizes,
  getOptimizedImageUrl,
  LazyImage,
  ProgressiveImage,
  ResponsiveImage,
  imageCache,
  useCachedImage,
  generateBlurHash,
  getImageDimensions,
  getAspectRatio,
  getOptimalImageSize,
  preloadImages,
  clearImageCache,
} from './image-optimization';

// Analytics utilities
export * from './analytics';
export {
  useFPSMonitor,
  useRenderTracker,
  useMemoryMonitor,
  useInteractionTracker,
  performanceLogger,
  usePerformanceLogger,
  generatePerformanceReport,
  PerformancePresets,
} from './analytics';
