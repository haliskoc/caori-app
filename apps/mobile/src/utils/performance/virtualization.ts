import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import {
  VirtualizedList,
  VirtualizedListProps,
  FlatList,
  FlatListProps,
  ViewabilityConfig,
  ViewToken,
  ListRenderItemInfo,
} from 'react-native';

/**
 * Virtualization utilities for performance optimization
 * Helps render large lists efficiently by only rendering visible items
 */

/**
 * Default viewability configuration
 * Tracks which items are visible on screen
 */
export const DEFAULT_VIEWABILITY_CONFIG: ViewabilityConfig = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 0,
  itemVisibilityPercentThreshold: 50,
  waitForInteraction: false,
};

/**
 * Extract key for item in virtualized list
 */
export const getKeyExtractor = <T extends { id?: string; _id?: string }>(
  item: T,
  index: number
): string => {
  return item?.id || item?._id || index.toString();
};

/**
 * Optimized VirtualizedList wrapper
 * Memoizes item rendering and handles windowing
 */
export const OptimizedVirtualizedList = <T,>({
  data,
  renderItem,
  keyExtractor = getKeyExtractor,
  viewabilityConfig = DEFAULT_VIEWABILITY_CONFIG,
  getItemCount = (data: T[]) => data.length,
  getItem = (data: T[], index: number) => data[index],
  ...props
}: VirtualizedListProps<T> & {
  data: T[];
  getItemCount?: (data: T[]) => number;
  getItem?: (data: T[], index: number) => T;
}) => {
  const [viewableItems, setViewableItems] = useState<string[]>([]);

  // Memoize render item to prevent re-renders
  const memoizedRenderItem = useCallback(
    (info: ListRenderItemInfo<T>) => {
      return renderItem(info);
    },
    [renderItem]
  );

  // Handle viewable items change
  const onViewableItemsChanged = useCallback(
    ({ viewableItems: changed }: { viewableItems: ViewToken[] }) => {
      const keys = changed.map((item) => item.key);
      setViewableItems(keys);
    },
    []
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <VirtualizedList<T>
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      getItemCount={getItemCount}
      getItem={getItem}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      {...props}
    />
  );
};

/**
 * Optimized FlatList wrapper
 * Provides better defaults and performance optimizations
 */
export const OptimizedFlatList = <T,>({
  data,
  renderItem,
  keyExtractor = getKeyExtractor,
  viewabilityConfig = DEFAULT_VIEWABILITY_CONFIG,
  removeClippedSubviews = true,
  maxToRenderPerBatch = 10,
  updateCellsBatchingPeriod = 50,
  initialNumToRender = 10,
  windowSize = 21,
  ...props
}: FlatListProps<T> & { data: T[] }) => {
  const [viewableItems, setViewableItems] = useState<string[]>([]);

  // Memoize render item to prevent re-renders
  const memoizedRenderItem = useCallback(
    (info: ListRenderItemInfo<T>) => {
      return renderItem(info);
    },
    [renderItem]
  );

  // Handle viewable items change
  const onViewableItemsChanged = useCallback(
    ({ viewableItems: changed }: { viewableItems: ViewToken[] }) => {
      const keys = changed.map((item) => item.key);
      setViewableItems(keys);
    },
    []
  );

  return (
    <FlatList<T>
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      removeClippedSubviews={removeClippedSubviews}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
      initialNumToRender={initialNumToRender}
      windowSize={windowSize}
      {...props}
    />
  );
};

/**
 * Virtualized grid component
 * Renders items in a grid with virtualization
 */
export const VirtualizedGrid = <T,>({
  data,
  renderItem,
  keyExtractor = getKeyExtractor,
  numColumns = 2,
  columnWrapperStyle,
  itemHeight,
  gap = 8,
  ...props
}: {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  numColumns?: number;
  columnWrapperStyle?: any;
  itemHeight?: number;
  gap?: number;
}) => {
  // Group items into rows
  const groupedData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < data.length; i += numColumns) {
      rows.push(data.slice(i, i + numColumns));
    }
    return rows;
  }, [data, numColumns]);

  // Get item from row
  const getItem = (rows: T[][], index: number) => rows[index];

  // Render each row
  const renderRow = useCallback(
    ({ item: row, index }: ListRenderItemInfo<T[]>) => {
      return (
        <div
          style={{
            flexDirection: 'row',
            marginBottom: gap,
            ...columnWrapperStyle,
          }}
        >
          {row.map((item, colIndex) => {
            const itemIndex = index * numColumns + colIndex;
            return (
              <div
                key={keyExtractor(item, itemIndex)}
                style={{
                  flex: 1,
                  marginRight: colIndex < numColumns - 1 ? gap : 0,
                  height: itemHeight,
                }}
              >
                {renderItem({ item, index: itemIndex, separators: null as any })}
              </div>
            );
          })}
        </div>
      );
    },
    [numColumns, gap, columnWrapperStyle, itemHeight, keyExtractor, renderItem]
  );

  return (
    <FlatList
      data={groupedData}
      renderItem={renderRow}
      keyExtractor={(item, index) => `row-${index}`}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={5}
      windowSize={10}
      {...props}
    />
  );
};

/**
 * Hook for virtualized list pagination
 * Handles infinite scrolling with pagination
 */
export const useVirtualizedPagination = <T,>({
  data,
  pageSize = 20,
  onLoadMore,
  threshold = 5,
}: {
  data: T[];
  pageSize?: number;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Check if there's more data to load
    if (data.length < currentPage * pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data.length, currentPage, pageSize]);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      await onLoadMore();
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, onLoadMore]);

  const handleEndReached = useCallback(() => {
    if (data.length > threshold) {
      handleLoadMore();
    }
  }, [data.length, threshold, handleLoadMore]);

  return {
    isLoading,
    hasMore,
    handleEndReached,
    handleLoadMore,
  };
};

/**
 * Viewability callback pair type
 */
interface ViewabilityConfigCallbackPair {
  viewabilityConfig: ViewabilityConfig;
  onViewableItemsChanged?: (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void;
}

/**
 * Create custom viewability config
 */
export const createViewabilityConfig = (
  minimumViewTime: number = 300,
  itemVisibilityPercentThreshold: number = 50
): ViewabilityConfig => ({
  minimumViewTime,
  viewAreaCoveragePercentThreshold: 0,
  itemVisibilityPercentThreshold,
  waitForInteraction: false,
});

/**
 * Performance presets for virtualized lists
 */
export const VirtualizationPresets = {
  // For short lists with small items
  smallItems: {
    initialNumToRender: 20,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    windowSize: 21,
  },

  // For medium lists with medium items
  mediumItems: {
    initialNumToRender: 10,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    windowSize: 21,
  },

  // For long lists with large items
  largeItems: {
    initialNumToRender: 5,
    maxToRenderPerBatch: 5,
    updateCellsBatchingPeriod: 100,
    windowSize: 10,
  },

  // For very large items (like cards)
  veryLargeItems: {
    initialNumToRender: 3,
    maxToRenderPerBatch: 3,
    updateCellsBatchingPeriod: 100,
    windowSize: 5,
  },
};

/**
 * Get optimal preset based on item height
 */
export const getVirtualizationPreset = (itemHeight: number) => {
  if (itemHeight < 60) return VirtualizationPresets.smallItems;
  if (itemHeight < 120) return VirtualizationPresets.mediumItems;
  if (itemHeight < 250) return VirtualizationPresets.largeItems;
  return VirtualizationPresets.veryLargeItems;
};

/**
 * Memoized list data hook
 * Prevents unnecessary re-renders of list data
 */
export const useMemoizedListData = <T,>(data: T[], deps: any[] = []) => {
  return useMemo(() => data, [data, ...deps]);
};

/**
 * Track visible items in list
 */
export const useVisibleItemsTracker = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setVisibleItems(new Set(viewableItems.map((item) => item.key)));
    },
    []
  );

  const isItemVisible = useCallback(
    (key: string) => visibleItems.has(key),
    [visibleItems]
  );

  return {
    visibleItems,
    handleViewableItemsChanged,
    isItemVisible,
  };
};
