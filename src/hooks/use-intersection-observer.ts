"use client"

import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, don't observe
    if (triggerOnce && hasTriggered) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && triggerOnce) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isIntersecting: isIntersecting || hasTriggered,
    hasTriggered,
  };
}

// Hook for lazy loading components
export function useLazyComponent(componentName: string) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      // Add a small delay to prevent loading during rapid scrolling
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, shouldLoad]);

  return {
    elementRef,
    shouldLoad,
    isIntersecting,
  };
}

// Hook for preloading next sections
export function usePreloadNext(preloadComponents: (() => Promise<any>)[] = []) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '200px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting && preloadComponents.length > 0) {
      // Preload next components when current section is visible
      preloadComponents.forEach((componentLoader) => {
        try {
          componentLoader().catch((error) => {
            console.warn('Failed to preload component:', error);
          });
        } catch (error) {
          console.warn('Failed to execute component loader:', error);
        }
      });
    }
  }, [isIntersecting, preloadComponents]);

  return { elementRef };
}

// Utility function to create component preloader functions
export function createComponentPreloader(componentPath: string) {
  return () => {
    // Use a switch statement or mapping for known component paths
    switch (componentPath) {
      case 'about-section':
        return import('@/components/sections/about-section');
      case 'contact-section':
        return import('@/components/sections/contact-section');
      case 'projects-section':
        return import('@/components/sections/projects-section');
      case 'services-section':
        return import('@/components/sections/services-section');
      case 'hero-section':
        return import('@/components/sections/hero-section');
      case 'scene':
        return import('@/components/three/scene');
      case 'about-scene':
        return import('@/components/three/about-scene');
      default:
        console.warn(`Unknown component path: ${componentPath}`);
        return Promise.resolve(null);
    }
  };
}