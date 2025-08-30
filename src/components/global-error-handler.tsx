"use client"

import { useEffect } from 'react';
import { setupGlobalErrorHandling } from './error-boundary';

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Setup global error handling
    setupGlobalErrorHandling();

    // Add custom chunk loading error handler
    const originalPush = history.pushState;
    const originalReplace = history.replaceState;

    // Override history methods to catch navigation errors
    history.pushState = function(state, title, url) {
      try {
        return originalPush.apply(history, [state, title, url]);
      } catch (error) {
        console.error('Navigation error:', error);
        if (error && (error as any).name === 'ChunkLoadError') {
          window.location.reload();
        }
        throw error;
      }
    };

    history.replaceState = function(state, title, url) {
      try {
        return originalReplace.apply(history, [state, title, url]);
      } catch (error) {
        console.error('Navigation error:', error);
        if (error && (error as any).name === 'ChunkLoadError') {
          window.location.reload();
        }
        throw error;
      }
    };

    // Cleanup function
    return () => {
      history.pushState = originalPush;
      history.replaceState = originalReplace;
    };
  }, []);

  return null;
}