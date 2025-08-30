"use client"

import { useEffect } from 'react';

interface ChunkLoadError extends Error {
  name: 'ChunkLoadError';
  request?: string;
}

interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  exponentialBackoff: boolean;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  exponentialBackoff: true,
};

export function ChunkLoadingHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const retryAttempts = new Map<string, number>();
    const originalImport = window.__webpack_require__ || window.require;

    // Enhanced chunk loading with retry mechanism
    const createRetryableImport = (originalImport: any) => {
      return function retryableImport(...args: any[]) {
        const chunkId = args[0];
        const maxRetries = defaultRetryConfig.maxRetries;
        
        const attemptLoad = (attempt: number = 0): Promise<any> => {
          return originalImport.apply(this, args).catch((error: Error) => {
            const isChunkError = error.name === 'ChunkLoadError' || 
                                error.message.includes('Loading chunk') ||
                                error.message.includes('Loading CSS chunk');
            
            if (isChunkError && attempt < maxRetries) {
              const delay = defaultRetryConfig.exponentialBackoff 
                ? defaultRetryConfig.retryDelay * Math.pow(2, attempt)
                : defaultRetryConfig.retryDelay;
              
              console.warn(`Chunk loading failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}):`, error);
              
              retryAttempts.set(chunkId, attempt + 1);
              
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(attemptLoad(attempt + 1));
                }, delay);
              });
            }
            
            // If all retries failed or it's not a chunk error, handle appropriately
            if (isChunkError) {
              console.error(`Chunk loading failed after ${maxRetries} attempts. Reloading page...`);
              
              // Report the error
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'chunk_load_failure', {
                  event_category: 'Performance',
                  custom_map: {
                    chunk_id: chunkId,
                    attempts: maxRetries,
                    error_message: error.message,
                  }
                });
              }
              
              // Force reload as last resort
              window.location.reload();
            }
            
            throw error;
          });
        };
        
        return attemptLoad();
      };
    };

    // Override webpack require if available
    if (window.__webpack_require__) {
      const originalWebpackRequire = window.__webpack_require__;
      window.__webpack_require__ = createRetryableImport(originalWebpackRequire);
    }

    // Handle dynamic imports
    const originalDynamicImport = window.__webpack_require__?.e;
    if (originalDynamicImport) {
      window.__webpack_require__.e = function(chunkId: string) {
        return originalDynamicImport.call(this, chunkId).catch((error: Error) => {
          console.error('Dynamic import failed:', error);
          
          // Track and retry dynamic imports
          const currentRetries = retryAttempts.get(chunkId) || 0;
          
          if (currentRetries < defaultRetryConfig.maxRetries) {
            const delay = defaultRetryConfig.exponentialBackoff 
              ? defaultRetryConfig.retryDelay * Math.pow(2, currentRetries)
              : defaultRetryConfig.retryDelay;
            
            retryAttempts.set(chunkId, currentRetries + 1);
            
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                originalDynamicImport.call(this, chunkId)
                  .then(resolve)
                  .catch((retryError: Error) => {
                    if (retryAttempts.get(chunkId)! >= defaultRetryConfig.maxRetries) {
                      console.error('Dynamic import failed after all retries. Reloading page...');
                      window.location.reload();
                    }
                    reject(retryError);
                  });
              }, delay);
            });
          }
          
          throw error;
        });
      };
    }

    // Global error handler for uncaught chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      if (event.filename && event.filename.includes('/_next/static/chunks/')) {
        console.error('Chunk loading error detected:', event);
        
        // Extract chunk ID from filename if possible
        const chunkMatch = event.filename.match(/chunks\/([^.]+)/);
        const chunkId = chunkMatch ? chunkMatch[1] : 'unknown';
        
        // Report to analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chunk_error', {
            event_category: 'Performance',
            custom_map: {
              chunk_id: chunkId,
              filename: event.filename,
              message: event.message,
            }
          });
        }
        
        // Prevent default handling and reload
        event.preventDefault();
        console.log('Reloading due to chunk error...');
        window.location.reload();
      }
    };

    // Navigation error handler
    const handleNavigationError = (event: Event) => {
      const error = (event as any).reason;
      if (error && (error.name === 'ChunkLoadError' || error.message?.includes('Loading chunk'))) {
        console.error('Navigation chunk error:', error);
        window.location.reload();
      }
    };

    // Add event listeners
    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleNavigationError);

    // Preload critical chunks to reduce loading errors
    const preloadCriticalChunks = () => {
      // This would preload the most important chunks
      // Implementation depends on your specific chunk strategy
      const criticalChunks = ['framework', 'main', 'pages/_app'];
      
      criticalChunks.forEach(chunkName => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'script';
        // Note: Actual chunk URLs would be determined by Next.js build
        // This is a placeholder for the concept
        if (process.env.NODE_ENV === 'development') {
          console.log(`Would preload chunk: ${chunkName}`);
        }
      });
    };

    // Monitor chunk loading performance
    const monitorChunkPerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const resource = entry as PerformanceResourceTiming;
              
              if (resource.name.includes('/_next/static/chunks/')) {
                const duration = resource.duration;
                
                if (duration > 3000) { // Slow chunk loading
                  console.warn(`Slow chunk load detected (${Math.round(duration)}ms):`, resource.name);
                  
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'slow_chunk', {
                      event_category: 'Performance',
                      value: Math.round(duration),
                      custom_map: {
                        chunk_url: resource.name,
                        duration: duration,
                      }
                    });
                  }
                }
              }
            }
          });

          observer.observe({ entryTypes: ['resource'] });
          
          return () => observer.disconnect();
        } catch (error) {
          console.warn('Chunk performance monitoring failed:', error);
        }
      }
    };

    preloadCriticalChunks();
    const cleanupPerformanceMonitor = monitorChunkPerformance();

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleNavigationError);
      if (cleanupPerformanceMonitor) cleanupPerformanceMonitor();
    };
  }, []);

  return null;
}

// Utility function to retry a dynamic import
export async function retryDynamicImport<T>(
  importFn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, retryDelay, exponentialBackoff } = { ...defaultRetryConfig, ...config };
  
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await importFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = exponentialBackoff 
        ? retryDelay * Math.pow(2, attempt)
        : retryDelay;
      
      console.warn(`Dynamic import failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}):`, error);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Enhanced dynamic import with retry
export function createRetryableImport<T>(importFn: () => Promise<T>) {
  return () => retryDynamicImport(importFn);
}