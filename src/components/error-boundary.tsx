"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorReport {
  timestamp: number;
  errorType: 'React' | 'ResourceLoading' | 'Performance' | 'ChunkLoading';
  message: string;
  stackTrace?: string;
  userAgent: string;
  url: string;
  buildId?: string;
  componentStack?: string;
  errorBoundary?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Report error to analytics
    this.reportError(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    const errorReport: ErrorReport = {
      timestamp: Date.now(),
      errorType: 'React',
      message: error.message,
      stackTrace: error.stack,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
    };

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: true,
          custom_map: {
            error_type: 'React',
            component_stack: errorInfo.componentStack,
            timestamp: errorReport.timestamp,
          }
        });
      }

      // Send to custom error tracking endpoint
      fetch('/api/error-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      }).catch(reportError => {
        console.warn('Failed to report error:', reportError);
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Report');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Error Stack:', error.stack);
      console.groupEnd();
    }
  };

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retrying... Attempt ${this.retryCount}/${this.maxRetries}`);
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    }
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Something went wrong
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We're sorry for the inconvenience. An unexpected error occurred while loading this page.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-red-600 dark:text-red-400">
                    {this.state.error.message}
                  </pre>
                  {this.state.error.stack && (
                    <pre className="mt-2 whitespace-pre-wrap text-gray-600 dark:text-gray-400 text-xs overflow-auto max-h-40">
                      {this.state.error.stack}
                    </pre>
                  )}
                </details>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {this.retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Try Again ({this.maxRetries - this.retryCount} attempts left)
                </button>
              )}
              
              <button
                onClick={this.handleReload}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Reload Page
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier use
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Async error handler for handling chunk loading errors
export function handleChunkError(error: any): void {
  const errorReport: Partial<ErrorReport> = {
    timestamp: Date.now(),
    errorType: 'ChunkLoading',
    message: error?.message || 'Chunk loading failed',
    stackTrace: error?.stack,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
  };

  console.error('Chunk loading error:', error);

  // Report to analytics
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: 'Chunk loading failed',
        fatal: false,
        custom_map: {
          error_type: 'ChunkLoading',
          timestamp: errorReport.timestamp,
        }
      });
    }
  }

  // Attempt to reload the page for chunk errors
  if (typeof window !== 'undefined' && error?.name === 'ChunkLoadError') {
    console.log('Reloading due to chunk error...');
    window.location.reload();
  }
}

// Global error handler setup
export function setupGlobalErrorHandling(): void {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    const errorReport: Partial<ErrorReport> = {
      timestamp: Date.now(),
      errorType: 'Performance',
      message: `Unhandled promise rejection: ${event.reason}`,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Report to analytics
    if (process.env.NODE_ENV === 'production' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: 'Unhandled promise rejection',
        fatal: false,
        custom_map: {
          error_type: 'Performance',
          timestamp: errorReport.timestamp,
        }
      });
    }
  });

  // Handle general JavaScript errors
  window.addEventListener('error', (event) => {
    // Check if it's a chunk loading error
    if (event.filename && event.filename.includes('/_next/static/chunks/')) {
      handleChunkError(event.error);
      return;
    }

    console.error('Global error:', event.error);
    
    const errorReport: Partial<ErrorReport> = {
      timestamp: Date.now(),
      errorType: 'React',
      message: event.message,
      stackTrace: event.error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Report to analytics
    if (process.env.NODE_ENV === 'production' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: event.message,
        fatal: true,
        custom_map: {
          error_type: 'React',
          timestamp: errorReport.timestamp,
        }
      });
    }
  });
}