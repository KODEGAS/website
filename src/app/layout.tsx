import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { generatePageMetadata, jsonLdWebsite, jsonLdOrganization, jsonLdLocalBusiness } from '@/lib/seo-config';
import StructuredData from '@/components/seo/structured-data';
import { WebVitals, PerformanceObserver } from '@/components/analytics/web-vitals';
import { ErrorBoundary } from '@/components/error-boundary';
import GlobalErrorHandler from '@/components/global-error-handler';
import { ResourceTracker } from '@/components/resource-tracker';
import { ChunkLoadingHandler } from '@/components/chunk-loader';

export const metadata: Metadata = generatePageMetadata({
  title: 'AI, ML, IoT & Software Development Company - KODEGAS Vision',
  description: 'Leading technology company in Sri Lanka specializing in AI development, machine learning, IoT solutions, web applications, and mobile app development. Expert software consulting services.',
  keywords: ['AI development Sri Lanka', 'machine learning consulting', 'IoT solutions', 'software development company'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inline critical CSS for above-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
            body { margin: 0; padding: 0; background-color: hsl(240 10% 3.9%); color: hsl(0 0% 98%); font-family: inherit; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            .min-h-dvh { min-height: 100dvh; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1; }
            .fixed { position: fixed; }
            .top-0 { top: 0; }
            .left-0 { left: 0; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .-z-10 { z-index: -10; }
            .text-center { text-align: center; }
            .font-bold { font-weight: 700; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
            .from-purple-400 { --tw-gradient-from: rgb(196 181 253); --tw-gradient-to: rgb(196 181 253 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-cyan-400 { --tw-gradient-to: rgb(34 211 238); }
            .bg-clip-text { background-clip: text; -webkit-background-clip: text; }
            .text-transparent { color: transparent; }
            /* Font display optimization */
            @font-face { font-display: swap; }
          `
        }} />
        
        {/* Font optimization with preload and font-display swap */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Only preload the most critical font weight used above-fold */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/sora/v11/xMQOuFFYT2XOZY8dA6A.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        
        {/* Remove unused preloads - favicon.ico is already linked above */}
        {/* Only prefetch resources that are likely to be used */}
        <link rel="prefetch" href="https://res.cloudinary.com/du5tkpcut/image/upload/v1755515595/Screenshot_2025-08-18_at_4.42.50_PM_ek5hl8.png" as="image" />
        <StructuredData data={[jsonLdWebsite, jsonLdOrganization, jsonLdLocalBusiness]} />
      </head>
      <body className={cn('font-body antialiased')}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
        <WebVitals />
        <PerformanceObserver />
        <ResourceTracker />
        <ChunkLoadingHandler />
        <GlobalErrorHandler />
      </body>
    </html>
  );
}
