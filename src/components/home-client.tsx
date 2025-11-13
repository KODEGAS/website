"use client"
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import ProjectsSection from '@/components/sections/projects-section';
import WhyUsSection from '@/components/sections/why-us-section';
import ContactSection from '@/components/sections/contact-section';
import ScenePlaceholder from '@/components/three/scene-placeholder';

// Dynamic import for Three.js Scene to reduce initial bundle size
const Scene = dynamic(() => import('@/components/three/scene'), {
  loading: () => <ScenePlaceholder />,
  ssr: false, // Disable SSR for Three.js components
});

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Scene />
      </div>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}