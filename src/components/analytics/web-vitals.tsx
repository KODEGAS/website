"use client"

import { useEffect } from 'react';

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
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

// Performance observer for additional metrics
export function PerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Observe navigation timing
    const observeNavigation = () => {
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
    };

    // Observe resource loading
    const observeResources = () => {
      const observer = new window.PerformanceObserver((list) => {
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
      });

      observer.observe({ entryTypes: ['resource'] });
      
      return () => observer.disconnect();
    };

    // Observe long tasks
    const observeLongTasks = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new window.PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.warn(`🔥 Long task detected (${Math.round(entry.duration)}ms):`, entry);
            }
          });

          observer.observe({ entryTypes: ['longtask'] });
          
          return () => observer.disconnect();
        } catch (error) {
          // Long task API not supported
        }
      }
    };

    observeNavigation();
    const cleanupResources = observeResources();
    const cleanupLongTasks = observeLongTasks();

    return () => {
      if (cleanupResources) cleanupResources();
      if (cleanupLongTasks) cleanupLongTasks();
    };
  }, []);

  return null;
}