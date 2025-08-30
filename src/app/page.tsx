import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';
import LazyScene from '@/components/three/lazy-scene';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <LazyScene />
      </div>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
