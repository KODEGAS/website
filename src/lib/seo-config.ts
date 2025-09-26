import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  siteName: string;
  twitterHandle: string;
  locale: string;
  type: string;
  images: {
    default: string;
    width: number;
    height: number;
  };
}

export const siteConfig: SEOConfig = {
  title: 'KODEGAS - AI, ML, IoT & Software Development Company',
  description: 'KODEGAS specializes in Artificial Intelligence, Machine Learning, IoT solutions, Web Applications, and Mobile App development. Expert tech solutions in Sri Lanka.',
  keywords: [
    'AI development',
    'machine learning services',
    'IoT solutions',
    'web application development',
    'mobile app development',
    'software development Sri Lanka',
    'AI consulting',
    'ML consulting',
    'tech company Kelaniya',
    'artificial intelligence Sri Lanka',
    'custom software solutions',
    'digital transformation'
  ],
  author: 'KODEGAS',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kodegas.com',
  siteName: 'KODEGAS',
  twitterHandle: '@kodegas',
  locale: 'en_US',
  type: 'website',
  images: {
    default: '/images/og-default.jpg',
    width: 1200,
    height: 630,
  },
};

export const generatePageMetadata = ({
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}): Metadata => {
  const pageTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageKeywords = [...siteConfig.keywords, ...keywords];
  const pageImage = image || siteConfig.images.default;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: canonical || siteConfig.siteUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.siteName,
      images: [
        {
          url: pageImage,
          width: siteConfig.images.width,
          height: siteConfig.images.height,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      creator: siteConfig.twitterHandle,
      images: [pageImage],
    },
    alternates: {
      canonical: canonical || siteConfig.siteUrl,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
};

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.siteUrl}/#organization`,
  name: 'KODEGAS',
  alternateName: 'KODEGAS',
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/images/logo.png`,
  description: 'Leading technology company specializing in AI, ML, IoT, and software development solutions.',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kelaniya',
    addressCountry: 'LK',
    addressRegion: 'Western Province',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+94-XX-XXXXXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Sinhala'],
  },
  sameAs: [
    'https://www.linkedin.com/company/kodegas',
    'https://twitter.com/kodegas',
    'https://github.com/kodegas',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Internet of Things',
    'Web Development',
    'Mobile Application Development',
    'Software Consulting',
  ],
};

export const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.siteUrl}/#localbusiness`,
  name: 'KODEGAS',
  description: 'Professional software development and AI consulting services in Sri Lanka.',
  url: siteConfig.siteUrl,
  telephone: '+94-XX-XXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Kelaniya',
    addressRegion: 'Western Province',
    postalCode: '11600',
    addressCountry: 'LK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.9553,
    longitude: 79.9200,
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '25',
  },
  serviceArea: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
};