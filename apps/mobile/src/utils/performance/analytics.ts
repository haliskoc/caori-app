import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Performance } from 'react-native';

/**
 * Performance analytics utilities
 * Tracks FPS, render times, memory usage, and other performance metrics
 */

/**
 * FPS monitor interface
 */
interface FPSMetrics {
  current: number;
  average: number;
  min: number;
  max: number;
  samples: number[];
}

/**
 * Render time metrics
 */
interface RenderMetrics {
  lastRenderTime: number;
  averageRenderTime: number;
  maxRenderTime: number;
  renderCount: number;
  slowRenders: number;
}

/**
 * Memory metrics
 */
interface MemoryMetrics {
  used: number;
  total: number;
  percentage: number;
  timestamp: number;
}

/**
 * Performance data log
 */
interface PerformanceLog {
  timestamp: number;
  type: 'fps' | 'render' | 'memory' | 'interaction';
  data: any;
}

/**
 * FPS Monitor Hook
 * Monitors frame rate and detects performance issues
 */
export const useFPSMonitor = ({
  enabled = __DEV__,
  threshold = 50, // Alert when FPS drops below this
  sampleInterval = 1000, // Sample every 1 second
  onLowFPS,
}: {
  enabled?: boolean;
  threshold?: number;
  sampleInterval?: number;
  onLowFPS?: (fps: number) => void;
} = {}) => {
  const [metrics, setMetrics] = useState<FPSMetrics>({
    current: 60,
    average: 60,
    min: 60,
    max: 60,
    samples: [],
  });

  const frameTimes = useRef<number[]>([]);
  const lastFrameTime = useRef<number>(Date.now());
  const frameCount = useRef<number>(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;

    const measureFrame = () => {
      const now = Date.now();
      const frameTime = now - lastFrameTime.current;
      lastFrameTime.current = now;

      frameTimes.current.push(frameTime);
      frameCount.current += 1;

      animationFrameId = requestAnimationFrame(measureFrame);
    };

    animationFrameId = requestAnimationFrame(measureFrame);

    // Calculate FPS every sample interval
    intervalRef.current = setInterval(() => {
      if (frameTimes.current.length === 0) return;

      const totalFrameTime = frameTimes.current.reduce((a, b) => a + b, 0);
      const avgFrameTime = totalFrameTime / frameTimes.current.length;
      const currentFPS = Math.round(1000 / avgFrameTime);

      setMetrics((prev) => {
        const newSamples = [...prev.samples, currentFPS].slice(-100); // Keep last 100 samples
        const newAverage = Math.round(newSamples.reduce((a, b) => a + b, 0) / newSamples.length);

        return {
          current: currentFPS,
          average: newAverage,
          min: Math.min(prev.min, currentFPS),
          max: Math.max(prev.max, currentFPS),
          samples: newSamples,
        };
      });

      // Alert on low FPS
      if (currentFPS < threshold) {
        onLowFPS?.(currentFPS);
        if (__DEV__) {
          console.warn(`[Performance] Low FPS detected: ${currentFPS} (threshold: ${threshold})`);
        }
      }

      frameTimes.current = [];
    }, sampleInterval);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, threshold, sampleInterval, onLowFPS]);

  const getFPSGrade = useCallback((fps: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (fps >= 55) return 'excellent';
    if (fps >= 45) return 'good';
    if (fps >= 30) return 'fair';
    return 'poor';
  }, []);

  const reset = useCallback(() => {
    setMetrics({
      current: 60,
      average: 60,
      min: 60,
      max: 60,
      samples: [],
    });
    frameTimes.current = [];
    frameCount.current = 0;
  }, []);

  return {
    metrics,
    getFPSGrade,
    reset,
  };
};

/**
 * Render time tracker hook
 * Measures component render performance
 */
export const useRenderTracker = ({
  enabled = __DEV__,
  slowThreshold = 16, // 60 FPS = 16.67ms per frame
  logSlowRenders = true,
}: {
  enabled?: boolean;
  slowThreshold?: number;
  logSlowRenders?: boolean;
} = {}) => {
  const renderCount = useRef(0);
  const renderTimes = useRef<number[]>([]);
  const [metrics, setMetrics] = useState<RenderMetrics>({
    lastRenderTime: 0,
    averageRenderTime: 0,
    maxRenderTime: 0,
    renderCount: 0,
    slowRenders: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      renderTimes.current.push(renderTime);
      renderCount.current += 1;

      const totalTime = renderTimes.current.reduce((a, b) => a + b, 0);
      const avgTime = totalTime / renderTimes.current.length;
      const maxTime = Math.max(...renderTimes.current);
      const slowRenderCount = renderTimes.current.filter((t) => t > slowThreshold).length;

      setMetrics({
        lastRenderTime: renderTime,
        averageRenderTime: avgTime,
        maxRenderTime: maxTime,
        renderCount: renderCount.current,
        slowRenders: slowRenderCount,
      });

      if (renderTime > slowThreshold && logSlowRenders) {
        if (__DEV__) {
          console.warn(
            `[Performance] Slow render detected: ${renderTime.toFixed(2)}ms (threshold: ${slowThreshold}ms)`
          );
        }
      }
    };
  });

  const getRenderGrade = useCallback((time: number): 'fast' | 'normal' | 'slow' => {
    if (time < 10) return 'fast';
    if (time < 16) return 'normal';
    return 'slow';
  }, []);

  const reset = useCallback(() => {
    renderTimes.current = [];
    renderCount.current = 0;
    setMetrics({
      lastRenderTime: 0,
      averageRenderTime: 0,
      maxRenderTime: 0,
      renderCount: 0,
      slowRenders: 0,
    });
  }, []);

  return {
    metrics,
    getRenderGrade,
    reset,
  };
};

/**
 * Memory monitor hook
 * Tracks JavaScript heap memory usage
 */
export const useMemoryMonitor = ({
  enabled = __DEV__,
  interval = 5000, // Check every 5 seconds
  threshold = 0.9, // Alert when memory usage exceeds 90%
}: {
  enabled?: boolean;
  interval?: number;
  threshold?: number;
} = {}) => {
  const [metrics, setMetrics] = useState<MemoryMetrics | null>(null);
  const [isHighUsage, setIsHighUsage] = useState(false);

  useEffect(() => {
    if (!enabled || typeof Performance === 'undefined') return;

    const checkMemory = () => {
      if (Performance && Performance.observe) {
        const memoryInfo = (Performance as any).getEntriesByType('memory');

        if (memoryInfo && memoryInfo.length > 0) {
          const memory = memoryInfo[0];
          const metrics: MemoryMetrics = {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            percentage: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
            timestamp: Date.now(),
          };

          setMetrics(metrics);
          setIsHighUsage(metrics.percentage > threshold);

          if (metrics.percentage > threshold && __DEV__) {
            console.warn(
              `[Performance] High memory usage: ${(metrics.percentage * 100).toFixed(1)}% (threshold: ${threshold * 100}%)`
            );
          }
        }
      }
    };

    checkMemory();
    const timer = setInterval(checkMemory, interval);

    return () => clearInterval(timer);
  }, [enabled, interval, threshold]);

  return {
    metrics,
    isHighUsage,
    formatBytes: (bytes: number) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      if (bytes === 0) return '0 Bytes';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },
  };
};

/**
 * Interaction tracker hook
 * Measures response time for user interactions
 */
export const useInteractionTracker = ({ enabled = __DEV__ } = {}) => {
  const [interactions, setInteractions] = useState<
    Array<{ name: string; duration: number; timestamp: number }>
  >([]);

  const trackInteraction = useCallback(
    (name: string, fn: () => void | Promise<void>) => {
      if (!enabled) {
        return fn();
      }

      return async () => {
        const startTime = performance.now();
        try {
          await fn();
        } finally {
          const duration = performance.now() - startTime;
          setInteractions((prev) => [
            ...prev,
            { name, duration, timestamp: Date.now() },
          ]);

          if (__DEV__ && duration > 100) {
            console.warn(
              `[Performance] Slow interaction: ${name} took ${duration.toFixed(2)}ms`
            );
          }
        }
      };
    },
    [enabled]
  );

  const getAverageInteractionTime = useCallback(
    (name?: string) => {
      const filtered = name
        ? interactions.filter((i) => i.name === name)
        : interactions;
      if (filtered.length === 0) return 0;
      return filtered.reduce((sum, i) => sum + i.duration, 0) / filtered.length;
    },
    [interactions]
  );

  const clear = useCallback(() => {
    setInteractions([]);
  }, []);

  return {
    interactions,
    trackInteraction,
    getAverageInteractionTime,
    clear,
  };
};

/**
 * Performance logger
 * Centralized logging for performance metrics
 */
class PerformanceLogger {
  private logs: PerformanceLog[] = [];
  private maxLogs = 1000;
  private listeners: Set<(log: PerformanceLog) => void> = new Set();

  log(type: PerformanceLog['type'], data: any) {
    const log: PerformanceLog = {
      timestamp: Date.now(),
      type,
      data,
    };

    this.logs.push(log);

    // Keep only the last N logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Notify listeners
    this.listeners.forEach((listener) => listener(log));

    // Console log in development
    if (__DEV__) {
      console.log(`[Performance] ${type}:`, data);
    }
  }

  getLogs(type?: PerformanceLog['type']): PerformanceLog[] {
    return type
      ? this.logs.filter((log) => log.type === type)
      : this.logs;
  }

  clear() {
    this.logs = [];
  }

  subscribe(listener: (log: PerformanceLog) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Global performance logger instance
export const performanceLogger = new PerformanceLogger();

/**
 * Use performance logger hook
 */
export const usePerformanceLogger = () => {
  const logFPS = useCallback(
    (fps: number) => {
      performanceLogger.log('fps', { fps });
    },
    []
  );

  const logRender = useCallback(
    (renderTime: number, componentName: string) => {
      performanceLogger.log('render', { renderTime, componentName });
    },
    []
  );

  const logMemory = useCallback(
    (memory: MemoryMetrics) => {
      performanceLogger.log('memory', memory);
    },
    []
  );

  const logInteraction = useCallback(
    (name: string, duration: number) => {
      performanceLogger.log('interaction', { name, duration });
    },
    []
  );

  const exportLogs = useCallback(() => {
    return performanceLogger.export();
  }, []);

  const clearLogs = useCallback(() => {
    performanceLogger.clear();
  }, []);

  return {
    logFPS,
    logRender,
    logMemory,
    logInteraction,
    exportLogs,
    clearLogs,
  };
};

/**
 * Performance report generator
 */
export const generatePerformanceReport = () => {
  const logs = performanceLogger.getLogs();

  const fpsLogs = logs.filter((log) => log.type === 'fps');
  const renderLogs = logs.filter((log) => log.type === 'render');
  const memoryLogs = logs.filter((log) => log.type === 'memory');
  const interactionLogs = logs.filter((log) => log.type === 'interaction');

  const avgFPS =
    fpsLogs.length > 0
      ? fpsLogs.reduce((sum, log) => sum + log.data.fps, 0) / fpsLogs.length
      : 0;

  const avgRenderTime =
    renderLogs.length > 0
      ? renderLogs.reduce((sum, log) => sum + log.data.renderTime, 0) / renderLogs.length
      : 0;

  const slowRenders = renderLogs.filter((log) => log.data.renderTime > 16).length;

  const avgMemory =
    memoryLogs.length > 0
      ? memoryLogs.reduce((sum, log) => sum + log.data.percentage, 0) / memoryLogs.length
      : 0;

  const slowInteractions = interactionLogs.filter((log) => log.data.duration > 100).length;

  return {
    summary: {
      totalLogs: logs.length,
      avgFPS: Math.round(avgFPS),
      avgRenderTime: avgRenderTime.toFixed(2),
      slowRenders,
      avgMemoryUsage: `${(avgMemory * 100).toFixed(1)}%`,
      slowInteractions,
    },
    fpsLogs,
    renderLogs,
    memoryLogs,
    interactionLogs,
  };
};

/**
 * Performance monitoring presets
 */
export const PerformancePresets = {
  // Strict monitoring for development
  development: {
    enabled: true,
    fpsThreshold: 55,
    slowRenderThreshold: 16,
    slowInteractionThreshold: 100,
    memoryThreshold: 0.9,
  },

  // Balanced monitoring for testing
  testing: {
    enabled: true,
    fpsThreshold: 45,
    slowRenderThreshold: 33, // 30 FPS
    slowInteractionThreshold: 200,
    memoryThreshold: 0.95,
  },

  // Minimal monitoring for production
  production: {
    enabled: false,
    fpsThreshold: 30,
    slowRenderThreshold: 50,
    slowInteractionThreshold: 500,
    memoryThreshold: 0.98,
  },
};
