"use client";

import { useEffect } from 'react';

interface ResourceUsage {
  url: string;
  preloaded: boolean;
  used: boolean;
  loadTime?: number;
  size?: number;
}

export function ResourceTracker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const preloadedResources = new Map<string, ResourceUsage>();
    const resourceUsageStats: ResourceUsage[] = [];

    // Track all preloaded resources from DOM
    const trackPreloadedResources = () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach((link) => {
        const href = (link as HTMLLinkElement).href;
        if (href) {
          preloadedResources.set(href, {
            url: href,
            preloaded: true,
            used: false,
          });
        }
      });
    };

    // Monitor resource loading to see which preloaded resources are actually used
    const monitorResourceUsage = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;
            const url = resourceEntry.name;
            
            // Check if this was a preloaded resource
            if (preloadedResources.has(url)) {
              const resource = preloadedResources.get(url)!;
              resource.used = true;
              resource.loadTime = resourceEntry.duration;
              resource.size = resourceEntry.transferSize || resourceEntry.encodedBodySize;
              
              if (process.env.NODE_ENV === 'development') {
                console.log(`Preloaded resource used: ${url} (${Math.round(resourceEntry.duration)}ms)`);
              }
            }
            
            // Track all resources for analysis
            resourceUsageStats.push({
              url,
              preloaded: preloadedResources.has(url),
              used: true,
              loadTime: resourceEntry.duration,
              size: resourceEntry.transferSize || resourceEntry.encodedBodySize,
            });
          }
        });

        observer.observe({ entryTypes: ['resource'] });
        return () => observer.disconnect();
      } catch (error) {
        console.warn('Resource tracking observer failed:', error);
      }
    };

    // Check for unused preloaded resources after page load
    const checkUnusedPreloads = () => {
      setTimeout(() => {
        const unusedPreloads: string[] = [];
        
        preloadedResources.forEach((resource, url) => {
          if (!resource.used) {
            unusedPreloads.push(url);
          }
        });

        if (unusedPreloads.length > 0) {
          console.warn('Unused preloaded resources detected:', unusedPreloads);
          
          // Report to analytics in production
          if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'unused_preload', {
              event_category: 'Performance',
              custom_map: {
                unused_count: unusedPreloads.length,
                unused_resources: unusedPreloads.slice(0, 3).join(', '), // Limit to first 3
              }
            });
          }
        }

        // Log performance summary in development
        if (process.env.NODE_ENV === 'development') {
          console.group('Resource Usage Summary');
          console.log('Total preloaded resources:', preloadedResources.size);
          console.log('Used preloaded resources:', Array.from(preloadedResources.values()).filter(r => r.used).length);
          console.log('Unused preloaded resources:', unusedPreloads.length);
          if (unusedPreloads.length > 0) {
            console.log('Unused resources:', unusedPreloads);
          }
          console.groupEnd();
        }
      }, 5000); // Check after 5 seconds to allow for all resources to load
    };

    // Initialize tracking
    trackPreloadedResources();
    const cleanup = monitorResourceUsage();
    
    // Check for unused preloads after initial load
    if (document.readyState === 'complete') {
      checkUnusedPreloads();
    } else {
      window.addEventListener('load', checkUnusedPreloads);
    }

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('load', checkUnusedPreloads);
    };
  }, []);

  return null;
}

// Font loading optimization hook
export function useFontOptimization() {
  useEffect(() => {
    // Check if fonts are loaded efficiently
    if ('fonts' in document) {
      const fontLoadingPromises: Promise<FontFace>[] = [];
      
      // Load critical fonts first
      const criticalFonts = [
        'Sora 400',
        'Sora 700', // Most commonly used weights
      ];
      
      criticalFonts.forEach(font => {
        if ((document as any).fonts.check(`1em ${font}`)) {
          console.log(`Font already loaded: ${font}`);
        } else {
          const fontLoadPromise = (document as any).fonts.load(`1em ${font}`);
          fontLoadingPromises.push(fontLoadPromise);
        }
      });
      
      if (fontLoadingPromises.length > 0) {
        Promise.all(fontLoadingPromises)
          .then(() => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Critical fonts loaded successfully');
            }
          })
          .catch(error => {
            console.warn('Font loading failed:', error);
          });
      }
    }
  }, []);
}

// Image preload optimization
export function useImagePreloadOptimization() {
  useEffect(() => {
    // Track image loading performance
    const trackImageLoading = () => {
      const images = document.querySelectorAll('img[loading="eager"], img:not([loading])');
      
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          const startTime = performance.now();
          
          const handleLoad = () => {
            const loadTime = performance.now() - startTime;
            if (loadTime > 1000 && process.env.NODE_ENV === 'development') {
              console.warn(`Slow image load (${Math.round(loadTime)}ms):`, img.src);
            }
          };
          
          const handleError = () => {
            console.error('Failed to load image:', img.src);
          };
          
          if (img.complete) {
            handleLoad();
          } else {
            img.addEventListener('load', handleLoad, { once: true });
            img.addEventListener('error', handleError, { once: true });
          }
        }
      });
    };
    
    // Track images after DOM is ready
    if (document.readyState === 'complete') {
      trackImageLoading();
    } else {
      window.addEventListener('load', trackImageLoading);
    }
    
    return () => {
      window.removeEventListener('load', trackImageLoading);
    };
  }, []);
}