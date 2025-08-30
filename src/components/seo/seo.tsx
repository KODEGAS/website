import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export default function SEO({
  title = 'KODEGAS Vision - Innovating the Future',
  description = 'KODEGAS specializes in AI, Machine Learning, IoT, Web Applications, and Mobile Applications. We build the future, today.',
  canonical = 'https://kodegas.com',
  ogImage = 'https://kodegas.com/og-image.jpg',
  ogType = 'website',
  noindex = false,
  children,
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="KODEGAS Vision" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@kodegas" />
      <meta name="twitter:site" content="@kodegas" />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Additional custom tags */}
      {children}
    </Head>
  );
}