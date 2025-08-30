import { Metadata } from 'next';
import StructuredData from '@/components/seo/structured-data';
import { allServiceSchemas, faqSchema } from '@/lib/service-schemas';
import { generatePageMetadata } from '@/lib/seo-config';
import HomeClient from '@/components/home-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Professional AI, ML & Software Development Services',
  description: 'Transform your business with cutting-edge AI, machine learning, IoT, and software development solutions. Expert team in Sri Lanka delivering innovative technology solutions.',
  keywords: [
    'AI development company',
    'machine learning services Sri Lanka',
    'IoT solutions provider',
    'custom software development',
    'web application development',
    'mobile app development Sri Lanka',
    'technology consulting',
    'digital transformation'
  ],
});

export default function Home() {
  return (
    <>
      <StructuredData data={[...allServiceSchemas, faqSchema]} />
      <HomeClient />
    </>
  );
}
