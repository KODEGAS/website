"use client"

import { useEffect } from 'react';

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

// Enhanced error boundary for performance monitoring
interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

interface ErrorReport {
  timestamp: number;
  errorType: 'React' | 'ResourceLoading' | 'Performance' | 'ChunkLoading';
  message: string;
  stackTrace?: string;
  userAgent: string;
  url: string;
  buildId?: string;
  errorInfo?: ErrorInfo;
}

export function WebVitals() {
  useEffect(() => {
    // Dynamic import of web-vitals library only when needed
    const loadWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        // Function to send metrics to analytics
        const sendToAnalytics = (metric: WebVitalMetric) => {
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 Performance Metric - ${metric.name}:`, {
              value: metric.value,
              delta: metric.delta,
              id: metric.id,
              rating: getRating(metric.name, metric.value)
            });
          }
          
          // Send to Google Analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', metric.name, {
              event_category: 'Web Vitals',
              event_label: metric.id,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              custom_map: {
                metric_id: metric.id,
                metric_value: metric.value,
                metric_delta: metric.delta,
                metric_rating: getRating(metric.name, metric.value)
              }
            });
          }
          
          // Send to custom analytics endpoint if needed
          if (process.env.NODE_ENV === 'production') {
            fetch('/api/analytics/web-vitals', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: metric.name,
                value: metric.value,
                delta: metric.delta,
                id: metric.id,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                rating: getRating(metric.name, metric.value)
              }),
            }).catch(error => {
              console.warn('Failed to send web vitals:', error);
            });
          }
        };

        // Collect all Core Web Vitals
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
        
      } catch (error) {
        console.warn('Failed to load web-vitals:', error);
      }
    };

    loadWebVitals();
  }, []);

  return null; // This component doesn't render anything
}

// Helper function to get performance rating
function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FID: [100, 300],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[metricName] || [0, 0];
  
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

// Performance observer for additional metrics with proper error handling
export function PerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported in this browser');
      return;
    }

    const cleanupFunctions: (() => void)[] = [];

    // Check which entry types are supported
    const getSupportedEntryTypes = (): string[] => {
      const allEntryTypes = ['navigation', 'resource', 'measure', 'mark', 'paint', 'longtask', 'largest-contentful-paint'];
      const supported: string[] = [];
      
      for (const entryType of allEntryTypes) {
        try {
          // Test if the entry type is supported by creating a temporary observer
          const testObserver = new PerformanceObserver(() => {});
          testObserver.observe({ entryTypes: [entryType] });
          testObserver.disconnect();
          supported.push(entryType);
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`PerformanceObserver: ${entryType} not supported`);
          }
        }
      }
      
      return supported;
    };

    // Observe navigation timing
    const observeNavigation = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            load: navigation.loadEventEnd - navigation.loadEventStart,
          };

          if (process.env.NODE_ENV === 'development') {
            console.log('📊 Navigation Timing:', metrics);
          }
        }
      } catch (error) {
        console.warn('Error observing navigation timing:', error);
      }
    };

    // Observe resource loading with error handling
    const observeResources = (supportedTypes: string[]) => {
      if (!supportedTypes.includes('resource')) {
        console.log('Resource timing not supported');
        return;
      }

      try {
        const observer = new PerformanceObserver((list) => {
          try {
            for (const entry of list.getEntries()) {
              const resourceEntry = entry as PerformanceResourceTiming;
              
              // Log slow resources
              if (resourceEntry.duration > 1000) {
                console.warn(`🐌 Slow resource (${Math.round(resourceEntry.duration)}ms):`, resourceEntry.name);
              }
              
              // Track Three.js bundle loading
              if (resourceEntry.name.includes('three') || resourceEntry.name.includes('Three')) {
                console.log(`🎨 Three.js resource loaded (${Math.round(resourceEntry.duration)}ms):`, resourceEntry.name);
              }
            }
          } catch (error) {
            console.warn('Error processing resource entries:', error);
          }
        });

        observer.observe({ entryTypes: ['resource'] });
        cleanupFunctions.push(() => observer.disconnect());
        
      } catch (error) {
        console.warn('Error setting up resource observer:', error);
      }
    };

    // Observe long tasks with proper error handling
    const observeLongTasks = (supportedTypes: string[]) => {
      if (!supportedTypes.includes('longtask')) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Long task observer not supported - using fallback performance monitoring');
        }
        return;
      }

      try {
        const observer = new PerformanceObserver((list) => {
          try {
            for (const entry of list.getEntries()) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(`🔥 Long task detected (${Math.round(entry.duration)}ms):`, {
                  duration: entry.duration,
                  startTime: entry.startTime,
                  name: entry.name
                });
              }
              
              // Send to analytics in production
              if (process.env.NODE_ENV === 'production' && entry.duration > 50) {
                // Report long tasks to your analytics service
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'long_task', {
                    event_category: 'Performance',
                    value: Math.round(entry.duration),
                    custom_map: {
                      task_duration: entry.duration,
                      task_start: entry.startTime
                    }
                  });
                }
              }
            }
          } catch (error) {
            console.warn('Error processing long task entries:', error);
          }
        });

        observer.observe({ entryTypes: ['longtask'] });
        cleanupFunctions.push(() => observer.disconnect());
        
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Long task observer setup failed:', error);
        }
      }
    };

    // Initialize observers with supported entry types
    try {
      const supportedEntryTypes = getSupportedEntryTypes();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Supported PerformanceObserver entry types:', supportedEntryTypes);
      }
      
      if (supportedEntryTypes.length === 0) {
        console.warn('No PerformanceObserver entry types supported');
        return;
      }

      observeNavigation();
      observeResources(supportedEntryTypes);
      observeLongTasks(supportedEntryTypes);
      
    } catch (error) {
      console.warn('Error initializing performance observers:', error);
    }

    return () => {
      cleanupFunctions.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Error during performance observer cleanup:', error);
        }
      });
    };
  }, []);

  return null;
}