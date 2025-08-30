import { NextRequest, NextResponse } from 'next/server';

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
  sessionId?: string;
  userId?: string;
}

interface ErrorAnalytics {
  errorCount: number;
  errorRate: number;
  topErrors: Array<{
    message: string;
    count: number;
    lastSeen: number;
  }>;
  browserStats: Record<string, number>;
  urlStats: Record<string, number>;
}

// In-memory storage for demo - replace with real database in production
const errorStorage = new Map<string, ErrorReport>();
const errorCounters = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json();
    
    // Validate required fields
    if (!errorReport.message || !errorReport.timestamp || !errorReport.errorType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate unique error ID
    const errorId = `${errorReport.timestamp}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Add session tracking
    const sessionId = request.headers.get('x-session-id') || 'unknown';
    errorReport.sessionId = sessionId;
    
    // Store the error
    errorStorage.set(errorId, errorReport);
    
    // Update counters
    const errorKey = `${errorReport.errorType}:${errorReport.message.substring(0, 100)}`;
    errorCounters.set(errorKey, (errorCounters.get(errorKey) || 0) + 1);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Report Received');
      console.log('Error Type:', errorReport.errorType);
      console.log('Message:', errorReport.message);
      console.log('URL:', errorReport.url);
      console.log('User Agent:', errorReport.userAgent);
      if (errorReport.stackTrace) {
        console.log('Stack Trace:', errorReport.stackTrace);
      }
      console.groupEnd();
    }
    
    // In production, you would:
    // 1. Send to error tracking service (Sentry, Bugsnag, etc.)
    // 2. Store in database
    // 3. Send alerts for critical errors
    // 4. Update metrics dashboards
    
    // Example: Send to external service
    if (process.env.NODE_ENV === 'production') {
      // await sendToErrorTrackingService(errorReport);
      // await updateErrorMetrics(errorReport);
      // await checkForCriticalErrors(errorReport);
    }
    
    return NextResponse.json(
      { 
        success: true, 
        errorId,
        message: 'Error report received successfully'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Failed to process error report:', error);
    
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Get recent errors
    const recentErrors = Array.from(errorStorage.values())
      .filter(error => type ? error.errorType === type : true)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
    
    // Calculate analytics
    const analytics: ErrorAnalytics = {
      errorCount: errorStorage.size,
      errorRate: calculateErrorRate(),
      topErrors: getTopErrors(),
      browserStats: getBrowserStats(),
      urlStats: getUrlStats(),
    };
    
    return NextResponse.json({
      errors: recentErrors,
      analytics,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('Failed to fetch error analytics:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch error analytics' },
      { status: 500 }
    );
  }
}

// Helper functions
function calculateErrorRate(): number {
  // Simple error rate calculation
  // In production, this would be based on actual traffic metrics
  const totalErrors = errorStorage.size;
  const timeWindow = 24 * 60 * 60 * 1000; // 24 hours
  const now = Date.now();
  
  const recentErrors = Array.from(errorStorage.values())
    .filter(error => now - error.timestamp < timeWindow);
    
  return (recentErrors.length / Math.max(totalErrors, 1)) * 100;
}

function getTopErrors(): Array<{ message: string; count: number; lastSeen: number }> {
  const errorCounts = new Map<string, { count: number; lastSeen: number }>();
  
  Array.from(errorStorage.values()).forEach(error => {
    const key = error.message.substring(0, 100);
    const existing = errorCounts.get(key) || { count: 0, lastSeen: 0 };
    
    errorCounts.set(key, {
      count: existing.count + 1,
      lastSeen: Math.max(existing.lastSeen, error.timestamp)
    });
  });
  
  return Array.from(errorCounts.entries())
    .map(([message, stats]) => ({ message, ...stats }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getBrowserStats(): Record<string, number> {
  const browserCounts: Record<string, number> = {};
  
  Array.from(errorStorage.values()).forEach(error => {
    const userAgent = error.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  });
  
  return browserCounts;
}

function getUrlStats(): Record<string, number> {
  const urlCounts: Record<string, number> = {};
  
  Array.from(errorStorage.values()).forEach(error => {
    try {
      const url = new URL(error.url);
      const path = url.pathname;
      urlCounts[path] = (urlCounts[path] || 0) + 1;
    } catch {
      urlCounts['Unknown'] = (urlCounts['Unknown'] || 0) + 1;
    }
  });
  
  return urlCounts;
}

// Cleanup old errors (run periodically)
setInterval(() => {
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  const now = Date.now();
  
  for (const [id, error] of errorStorage.entries()) {
    if (now - error.timestamp > maxAge) {
      errorStorage.delete(id);
    }
  }
}, 60 * 60 * 1000); // Run every hour