import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://kodegas.com'),
  title: 'KODEGAS Vision - Innovating the Future',
  description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
  keywords: ['AI', 'Machine Learning', 'IoT', 'Web Applications', 'Mobile Applications', 'KODEGAS', 'Technology Solutions'],
  authors: [{ name: 'KODEGAS' }],
  creator: 'KODEGAS',
  publisher: 'KODEGAS',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kodegas.com',
    siteName: 'KODEGAS Vision',
    title: 'KODEGAS Vision - Innovating the Future',
    description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'KODEGAS Vision - Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KODEGAS Vision - Innovating the Future',
    description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
    images: ['/og-image.svg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#cc66ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" 
          rel="stylesheet" 
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet" />
        </noscript>
        <link rel="canonical" href="https://kodegas.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KODEGAS",
              "url": "https://kodegas.com",
              "logo": "https://kodegas.com/logo.png",
              "description": "KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.",
              "foundingDate": "2020",
              "sameAs": [
                "https://linkedin.com/company/kodegas",
                "https://twitter.com/kodegas",
                "https://github.com/kodegas"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@kodegas.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
