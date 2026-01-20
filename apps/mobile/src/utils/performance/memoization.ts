import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Memoization utilities for performance optimization
 * Helps prevent unnecessary re-renders
 */

/**
 * Deep comparison function
 */
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};

/**
 * Shallow comparison function
 */
export const shallowEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a == null || b == null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || a[key] !== b[key]) return false;
  }

  return true;
};

/**
 * Memoized callback hook with deep comparison
 */
export const useDeepMemoCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: any[] = []
): T => {
  return useMemo(() => callback, deps); // Note: Deep comparison would need custom logic
};

/**
 * Memoized callback with dependency tracking
 */
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: any[] = []
): T => {
  return useCallback(callback, deps);
};

/**
 * Memoized value with deep comparison
 */
export const useDeepMemoValue = <T>(value: T, deps: any[] = []): T => {
  const ref = useRef(value);

  // Only update if deeply different
  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};

/**
 * Memoized value with shallow comparison
 */
export const useShallowMemoValue = <T>(value: T, deps: any[] = []): T => {
  const ref = useRef(value);

  // Only update if shallowly different
  if (!shallowEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};

/**
 * Memoized component wrapper
 * Auto-memoizes based on props
 */
export const memoWithProps = <P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual: (prevProps: P, nextProps: P) => boolean = shallowEqual
) => {
  return React.memo(Component, propsAreEqual);
};

/**
 * Custom memo comparison for specific prop changes
 */
export const createMemoComparator = <P extends object>(
  propNames: (keyof P)[]
): ((prevProps: P, nextProps: P) => boolean) => {
  return (prevProps, nextProps) => {
    for (const prop of propNames) {
      if (prevProps[prop] !== nextProps[prop]) {
        return false;
      }
    }
    return true;
  };
};

/**
 * Debounced value hook
 */
export const useDebouncedValue = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Throttled value hook
 */
export const useThrottledValue = <T>(value: T, delay: number = 300): T => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
      lastRan.current = Date.now();
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
};

/**
 * Cached async operation
 */
export const useCachedAsync = <T>(
  key: string,
  asyncFn: () => Promise<T>,
  cacheTime: number = 60000 // 1 minute default
): { data: T | null; isLoading: boolean; error: Error | null; refetch: () => void } => {
  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cached = cache.current.get(key);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
      cache.current.set(key, { data: result, timestamp: Date.now() });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, asyncFn, cacheTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    cache.current.delete(key);
    fetchData();
  }, [key, fetchData]);

  return { data, isLoading, error, refetch };
};

/**
 * Performance monitor hook
 */
export const usePerformanceMonitor = () => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef<number>(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const renderTime = now - lastRenderTime.current;
    lastRenderTime.current = now;

    if (__DEV__) {
      console.log(`[Performance] Render #${renderCount.current} took ${renderTime}ms`);
    }
  });

  const getRenderCount = () => renderCount.current;
  const getLastRenderTime = () => lastRenderTime.current;

  return { getRenderCount, getLastRenderTime };
};

/**
 * Memory usage monitor (simplified)
 */
export const useMemoryMonitor = (interval: number = 5000) => {
  const [memoryUsage, setMemoryUsage] = React.useState<{
    used: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const checkMemory = () => {
      if (global.performance?.memory) {
        const memory = global.performance.memory;
        setMemoryUsage({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
        });
      }
    };

    checkMemory();
    const timer = setInterval(checkMemory, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return memoryUsage;
};

/**
 * Component render profiler
 */
export const useRenderProfiler = (componentName: string) => {
  const renderTimes = useRef<number[]>([]);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      renderTimes.current.push(renderTime);

      if (__DEV__) {
        if (renderTime > 16) { // More than one frame (60fps = 16.67ms)
          console.warn(
            `[Performance] ${componentName} slow render: ${renderTime.toFixed(2)}ms`
          );
        }
      }
    };
  });

  const getAverageRenderTime = () => {
    const times = renderTimes.current;
    if (times.length === 0) return 0;
    return times.reduce((a, b) => a + b, 0) / times.length;
  };

  const getSlowRenderCount = () => {
    return renderTimes.current.filter((t) => t > 16).length;
  };

  return {
    getAverageRenderTime,
    getSlowRenderCount,
    renderCount: renderTimes.current.length,
  };
};

/**
 * State selector memoization
 * For Zustand or Redux
 */
export const useMemoizedSelector = <T, U>(
  selector: (state: T) => U,
  equalityFn: (a: U, b: U) => boolean = shallowEqual
) => {
  // This would be used with useSelector or useStore
  // Simplified version
  const memoizedSelector = useCallback(selector, []);
  return memoizedSelector;
};
