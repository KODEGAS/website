import { siteConfig } from '@/lib/seo-config';

export const aiDevelopmentService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.siteUrl}/services/ai-development`,
  name: 'AI Development Services',
  description: 'Custom artificial intelligence solutions including machine learning models, neural networks, and AI-powered applications.',
  provider: {
    '@type': 'Organization',
    name: 'KODEGAS Vision',
    url: siteConfig.siteUrl,
  },
  serviceType: 'Artificial Intelligence Development',
  category: 'Technology Services',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: '$$',
    priceCurrency: 'USD',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Machine Learning Model Development',
          description: 'Custom ML models for prediction, classification, and data analysis.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Computer Vision Solutions',
          description: 'Image recognition, object detection, and visual AI applications.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Natural Language Processing',
          description: 'Text analysis, chatbots, and language understanding systems.',
        },
      },
    ],
  },
};

export const mlDevelopmentService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.siteUrl}/services/ml-development`,
  name: 'Machine Learning Development',
  description: 'End-to-end machine learning solutions from data preprocessing to model deployment and monitoring.',
  provider: {
    '@type': 'Organization',
    name: 'KODEGAS Vision',
    url: siteConfig.siteUrl,
  },
  serviceType: 'Machine Learning Development',
  category: 'Data Science & Analytics',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: '$$',
    priceCurrency: 'USD',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
};

export const iotDevelopmentService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.siteUrl}/services/iot-development`,
  name: 'IoT Development Services',
  description: 'Internet of Things solutions including device connectivity, data collection, and smart automation systems.',
  provider: {
    '@type': 'Organization',
    name: 'KODEGAS Vision',
    url: siteConfig.siteUrl,
  },
  serviceType: 'Internet of Things Development',
  category: 'Hardware & Software Integration',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: '$$',
    priceCurrency: 'USD',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
};

export const webDevelopmentService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.siteUrl}/services/web-development`,
  name: 'Web Application Development',
  description: 'Custom web applications, e-commerce platforms, and responsive websites using modern technologies.',
  provider: {
    '@type': 'Organization',
    name: 'KODEGAS Vision',
    url: siteConfig.siteUrl,
  },
  serviceType: 'Web Development',
  category: 'Software Development',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: '$$',
    priceCurrency: 'USD',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'React.js Development',
          description: 'Modern React applications with Next.js and TypeScript.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Development',
          description: 'Custom online stores with payment integration and inventory management.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'API Development',
          description: 'RESTful and GraphQL APIs for web and mobile applications.',
        },
      },
    ],
  },
};

export const mobileDevelopmentService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.siteUrl}/services/mobile-development`,
  name: 'Mobile Application Development',
  description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
  provider: {
    '@type': 'Organization',
    name: 'KODEGAS Vision',
    url: siteConfig.siteUrl,
  },
  serviceType: 'Mobile App Development',
  category: 'Mobile Software Development',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceRange: '$$',
    priceCurrency: 'USD',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What AI development services does KODEGAS provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KODEGAS provides comprehensive AI development services including machine learning model development, computer vision solutions, natural language processing, and custom AI-powered applications tailored to your business needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer IoT development services in Sri Lanka?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in IoT development services in Sri Lanka, including device connectivity, sensor integration, data collection systems, and smart automation solutions for various industries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you use for web development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use modern technologies including React.js, Next.js, TypeScript, Node.js, Python, and cloud platforms to build scalable, performant web applications and e-commerce solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to develop a mobile app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mobile app development timeline depends on complexity and features. Simple apps take 2-3 months, while complex applications with advanced features may take 4-6 months or more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support and maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive ongoing support and maintenance services for all our projects, including bug fixes, updates, security patches, and feature enhancements.',
      },
    },
  ],
};

export const allServiceSchemas = [
  aiDevelopmentService,
  mlDevelopmentService,
  iotDevelopmentService,
  webDevelopmentService,
  mobileDevelopmentService,
];