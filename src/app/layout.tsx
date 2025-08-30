import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'KODEGAS Vision - Innovating the Future',
  description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
  keywords: [
    'KODEGAS',
    'AI development',
    'Machine Learning',
    'IoT solutions',
    'Web Applications',
    'Mobile Applications',
    'Data Engineering',
    'Software Development',
    'Technology Innovation',
    'Custom Software Solutions',
    'AI consulting',
    'ML consulting',
    'Tech startup'
  ],
  authors: [{ name: 'KODEGAS Team' }],
  creator: 'KODEGAS',
  publisher: 'KODEGAS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kodegas.com',
    siteName: 'KODEGAS Vision',
    title: 'KODEGAS Vision - Innovating the Future',
    description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
    images: [
      {
        url: 'https://kodegas.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KODEGAS - Innovating the Future with AI, ML, IoT & Beyond',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KODEGAS Vision - Innovating the Future',
    description: 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
    images: ['https://kodegas.com/og-image.jpg'],
    creator: '@kodegas',
    site: '@kodegas',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  alternates: {
    canonical: 'https://kodegas.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KODEGAS",
    "alternateName": "KODEGAS Vision",
    "url": "https://kodegas.com",
    "logo": "https://kodegas.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://twitter.com/kodegas",
      "https://linkedin.com/company/kodegas",
      "https://github.com/KODEGAS"
    ],
    "description": "KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.",
    "foundingDate": "2024",
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Internet of Things",
      "Web Application Development",
      "Mobile Application Development",
      "Data Engineering"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "KODEGAS Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Development",
            "description": "Developing intelligent systems that can learn, reason, and adapt to solve complex business challenges."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Learning",
            "description": "Building predictive models and data-driven solutions to unlock insights and automate processes."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IoT Solutions",
            "description": "Connecting physical devices to the digital world, enabling smart environments and data collection."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Applications",
            "description": "Crafting robust, scalable, and user-friendly web applications tailored to your specific needs."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Applications",
            "description": "Designing and developing intuitive mobile apps for iOS and Android to engage your users on the go."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Engineering",
            "description": "Architecting and building scalable data pipelines and infrastructure to power your analytics."
          }
        }
      ]
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KODEGAS Vision",
    "url": "https://kodegas.com",
    "description": "KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.",
    "publisher": {
      "@type": "Organization",
      "name": "KODEGAS"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kodegas.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KODEGAS" />
        
        {/* Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
