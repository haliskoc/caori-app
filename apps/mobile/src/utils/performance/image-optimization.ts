import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Image, ImageStyle, ImageURISource } from 'react-native';

/**
 * Image optimization utilities for performance
 * Implements lazy loading, progressive loading, and caching strategies
 */

/**
 * Image quality presets
 */
export const ImageQuality = {
  thumbnail: 0.5, // 50% quality
  low: 0.7, // 70% quality
  medium: 0.85, // 85% quality
  high: 1.0, // 100% quality
  ultra: 1.0, // 100% quality (no compression)
};

/**
 * Image size presets (in pixels)
 */
export const ImageSizes = {
  thumbnail: 100,
  small: 200,
  medium: 400,
  large: 800,
  xlarge: 1200,
  original: 0, // Original size
};

/**
 * Generate optimized image URL with quality and size parameters
 * Works with most CDNs (Cloudinary, imgix, CloudImage, etc.)
 */
export const getOptimizedImageUrl = (
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'avif';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  } = {}
): string => {
  const { width, height, quality = ImageQuality.high, format = 'webp', fit = 'cover' } = options;

  // If no optimization needed, return base URL
  if (!width && !height && quality === 1.0) {
    return baseUrl;
  }

  // Parse URL and add optimization parameters
  try {
    const url = new URL(baseUrl);

    // Cloudinary-style parameters
    if (baseUrl.includes('cloudinary.com')) {
      const transformations = [];
      if (width) transformations.push(`w_${width}`);
      if (height) transformations.push(`h_${height}`);
      if (quality < 1) transformations.push(`q_${Math.round(quality * 100)}`);
      if (fit !== 'cover') transformations.push(`c_${fit}`);
      if (format !== 'jpg') transformations.push(`f_${format}`);

      if (transformations.length > 0) {
        const pathParts = url.pathname.split('/');
        const uploadIndex = pathParts.indexOf('upload');
        if (uploadIndex !== -1) {
          pathParts.splice(uploadIndex + 1, 0, transformations.join(','));
          url.pathname = pathParts.join('/');
        }
      }
    }
    // Imgix-style parameters
    else if (baseUrl.includes('imgix.net') || baseUrl.includes('images.unsplash.com')) {
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      if (quality < 1) url.searchParams.set('q', Math.round(quality * 100).toString());
      if (fit !== 'cover') url.searchParams.set('fit', fit);
      if (format !== 'jpg') url.searchParams.set('fm', format);
      url.searchParams.set('auto', 'format'); // Auto-format for WebP/AVIF
    }
    // Generic CDN parameters
    else {
      if (width) url.searchParams.set('width', width.toString());
      if (height) url.searchParams.set('height', height.toString());
      if (quality < 1) url.searchParams.set('quality', Math.round(quality * 100).toString());
      if (format !== 'jpg') url.searchParams.set('format', format);
    }

    return url.toString();
  } catch (error) {
    console.warn('Error optimizing image URL:', error);
    return baseUrl;
  }
};

/**
 * Lazy loading image component
 * Only loads image when it comes into viewport
 */
export const LazyImage = ({
  source,
  style,
  placeholder,
  ...props
}: {
  source: ImageURISource | string;
  style?: ImageStyle;
  placeholder?: React.ReactNode;
  [key: string]: any;
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<any>(null);

  // Parse source
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  useEffect(() => {
    // Check if element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (imageRef.current) {
            observer.unobserve(imageRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (!isInView) {
    return (
      <div ref={imageRef} style={style}>
        {placeholder || <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%' }} />}
      </div>
    );
  }

  if (hasError) {
    return (
      <div style={style} className="flex items-center justify-center bg-gray-200">
        <span style={{ fontSize: 24, color: '#999' }}>⚠️</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && placeholder}
      <Image
        ref={imageRef}
        source={imageSource}
        style={[style, !isLoaded && { display: 'none' }]}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </>
  );
};

/**
 * Progressive loading image component
 * Loads low-quality placeholder first, then high-quality image
 */
export const ProgressiveImage = ({
  source,
  thumbnailSource,
  style,
  ...props
}: {
  source: ImageURISource | string;
  thumbnailSource?: ImageURISource | string;
  style?: ImageStyle;
  [key: string]: any;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailAnimated = useRef<any>(null);
  const imageAnimated = useRef<any>(null);

  const imageSourceParsed = typeof source === 'string' ? { uri: source } : source;
  const thumbnailSourceParsed = thumbnailSource
    ? typeof thumbnailSource === 'string'
      ? { uri: thumbnailSource }
      : thumbnailSource
    : null;

  const handleThumbnailLoad = useCallback(() => {
    if (thumbnailAnimated.current) {
      // Could add fade-in animation here
    }
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ position: 'relative', ...style }}>
      {thumbnailSourceParsed && (
        <Image
          source={thumbnailSourceParsed}
          style={[style, isLoaded && { position: 'absolute' }]}
          onLoad={handleThumbnailLoad}
          blurRadius={isLoaded ? 0 : 5}
          {...props}
        />
      )}
      <Image
        source={imageSourceParsed}
        style={[style, !isLoaded && { opacity: 0 }]}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

/**
 * Responsive image component
 * Loads different image sizes based on container width
 */
export const ResponsiveImage = ({
  source,
  sizes,
  style,
  ...props
}: {
  source: string | ((width: number) => string);
  sizes?: {
    small?: number;
    medium?: number;
    large?: number;
  };
  style?: ImageStyle;
  [key: string]: any;
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const containerRef = useRef<any>(null);

  const defaultSizes = {
    small: 400,
    medium: 800,
    large: 1200,
    ...sizes,
  };

  useEffect(() => {
    // Measure container width
    if (containerRef.current) {
      containerRef.current.measure((x: number, y: number, width: number, height: number) => {
        setContainerWidth(width);
      });
    }
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      let imageUrl: string;

      if (typeof source === 'function') {
        imageUrl = source(containerWidth);
      } else {
        // Determine appropriate size
        let size = defaultSizes.small;
        if (containerWidth > 600) {
          size = defaultSizes.large;
        } else if (containerWidth > 400) {
          size = defaultSizes.medium;
        }

        imageUrl = getOptimizedImageUrl(source, {
          width: size,
          quality: ImageQuality.high,
        });
      }

      setImageUrl(imageUrl);
    }
  }, [containerWidth, source, defaultSizes]);

  return (
    <div ref={containerRef} style={style} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      {imageUrl ? <Image source={{ uri: imageUrl }} style={style} {...props} /> : null}
    </div>
  );
};

/**
 * Image cache manager
 * Manages in-memory cache for loaded images
 */
class ImageCacheManager {
  private cache: Map<string, any> = new Map();
  private timestamps: Map<string, number> = new Map();
  private maxCacheSize: number = 100; // Maximum number of cached images
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached) {
      const timestamp = this.timestamps.get(key) || 0;
      const now = Date.now();

      // Check if cache entry is still valid
      if (now - timestamp < this.cacheTimeout) {
        return cached;
      } else {
        // Remove expired entry
        this.remove(key);
      }
    }
    return null;
  }

  set(key: string, value: any): void {
    // Check cache size limit
    if (this.cache.size >= this.maxCacheSize) {
      // Remove oldest entry
      const oldestKey = Array.from(this.timestamps.entries()).sort((a, b) => a[1] - b[1])[0]?.[0];
      if (oldestKey) {
        this.remove(oldestKey);
      }
    }

    this.cache.set(key, value);
    this.timestamps.set(key, Date.now());
  }

  remove(key: string): void {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.timestamps.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  get size(): number {
    return this.cache.size;
  }
}

// Global image cache instance
export const imageCache = new ImageCacheManager();

/**
 * Hook for cached image loading
 */
export const useCachedImage = (source: string) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check cache first
    const cached = imageCache.get(source);
    if (cached) {
      setImageUri(cached);
      setIsLoading(false);
      return;
    }

    // Prefetch and cache image
    Image.prefetch(source)
      .then(() => {
        imageCache.set(source, source);
        setImageUri(source);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [source]);

  return { imageUri, isLoading, error };
};

/**
 * Image blur hash generator (simplified)
 * In production, use a real blurhash library
 */
export const generateBlurHash = (imageUrl: string): string => {
  // This is a placeholder - in production, use the blurhash library
  // or generate blur hashes on the server side
  return 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';
};

/**
 * Get image dimensions from URL
 */
export const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height });
      },
      () => {
        resolve(null);
      }
    );
  });
};

/**
 * Calculate aspect ratio from dimensions
 */
export const getAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Get optimal image size for container
 */
export const getOptimalImageSize = (
  containerWidth: number,
  containerHeight: number,
  originalWidth: number,
  originalHeight: number
): { width: number; height: number } => {
  const containerRatio = containerWidth / containerHeight;
  const imageRatio = originalWidth / originalHeight;

  let finalWidth, finalHeight;

  if (imageRatio > containerRatio) {
    // Image is wider than container
    finalWidth = containerWidth;
    finalHeight = containerWidth / imageRatio;
  } else {
    // Image is taller than container
    finalHeight = containerHeight;
    finalWidth = containerHeight * imageRatio;
  }

  return {
    width: Math.round(finalWidth),
    height: Math.round(finalHeight),
  };
};

/**
 * Preload multiple images
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          Image.prefetch(url).then(() => resolve()).catch(() => resolve());
        })
    )
  );
};

/**
 * Clear image cache
 */
export const clearImageCache = (): void => {
  Image.clearMemoryCache();
  Image.clearDiskCache();
  imageCache.clear();
};
