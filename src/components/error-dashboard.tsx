"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface DashboardData {
  errors: ErrorReport[];
  analytics: ErrorAnalytics;
  timestamp: number;
}

export function ErrorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedError, setSelectedError] = useState<ErrorReport | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const params = new URLSearchParams();
        if (filter !== 'all') params.append('type', filter);
        params.append('limit', '100');

        const response = await fetch(`/api/error-tracking?${params}`);
        const result = await response.json();
        
        setData(result);
      } catch (error) {
        console.error('Failed to fetch error data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchErrorData();
    const interval = setInterval(fetchErrorData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [filter]);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'React': return 'destructive';
      case 'ChunkLoading': return 'secondary';
      case 'Performance': return 'outline';
      case 'ResourceLoading': return 'default';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading error analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-red-500">Failed to load error data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Error Analytics Dashboard</h1>
        <Button onClick={fetchErrorData} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.errorCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analytics.errorRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.errors.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">{formatTimestamp(data.timestamp)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="errors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="errors">Recent Errors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          {/* Filter Controls */}
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'React' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('React')}
            >
              React
            </Button>
            <Button
              variant={filter === 'ChunkLoading' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('ChunkLoading')}
            >
              Chunk Loading
            </Button>
            <Button
              variant={filter === 'Performance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('Performance')}
            >
              Performance
            </Button>
          </div>

          {/* Error List */}
          <div className="space-y-2">
            {data.errors.map((error, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:bg-muted/50 ${
                  selectedError === error ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedError(selectedError === error ? null : error)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={getErrorTypeColor(error.errorType)}>
                        {error.errorType}
                      </Badge>
                      <span className="font-medium truncate max-w-md">
                        {error.message}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTimestamp(error.timestamp)}
                    </div>
                  </div>
                  
                  {selectedError === error && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div><strong>URL:</strong> {error.url}</div>
                      <div><strong>User Agent:</strong> {error.userAgent}</div>
                      {error.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto">
                            {error.componentStack}
                          </pre>
                        </div>
                      )}
                      {error.stackTrace && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-40">
                            {error.stackTrace}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {data.errors.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">No errors found</div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Errors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Errors</CardTitle>
                <CardDescription>Most frequent error messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.analytics.topErrors.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-muted">
                    <span className="truncate flex-1 mr-2">{error.message}</span>
                    <Badge variant="secondary">{error.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Browser Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Browser Distribution</CardTitle>
                <CardDescription>Errors by browser type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(data.analytics.browserStats).map(([browser, count]) => (
                  <div key={browser} className="flex items-center justify-between p-2 rounded bg-muted">
                    <span>{browser}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* URL Stats */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Error Distribution by Page</CardTitle>
                <CardDescription>Pages with the most errors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(data.analytics.urlStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 10)
                  .map(([url, count]) => (
                  <div key={url} className="flex items-center justify-between p-2 rounded bg-muted">
                    <span className="truncate flex-1 mr-2">{url}</span>
                    <Badge variant="destructive">{count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Trends</CardTitle>
              <CardDescription>Error patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-8">
                Error trend charts would be implemented here with a charting library
                <br />
                (e.g., Chart.js, Recharts, or D3.js)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hook for easy integration into other components
export function useErrorReporting() {
  const reportError = async (error: Partial<ErrorReport>) => {
    try {
      await fetch('/api/error-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          ...error,
        }),
      });
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  };

  return { reportError };
}