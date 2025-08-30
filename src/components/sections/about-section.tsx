'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLazyComponent } from '@/hooks/use-intersection-observer';
import AboutScenePlaceholder from '@/components/three/about-scene-placeholder';

// Dynamic import for AboutScene to reduce initial bundle size
const AboutScene = dynamic(() => import('@/components/three/about-scene'), {
  loading: () => <AboutScenePlaceholder />,
  ssr: false, // Disable SSR for Three.js components
});

export default function AboutSection() {
  const { elementRef, shouldLoad } = useLazyComponent('AboutScene');
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={elementRef} id="about" className="py-24 sm:py-32 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={variants} className="h-[400px] md:h-[500px] w-full">
            {shouldLoad ? <AboutScene /> : <AboutScenePlaceholder />}
          </motion.div>
          <motion.div 
            variants={variants}
            className="space-y-6"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Leading AI & Software Development Company in Sri Lanka
            </h2>
            <p className="text-lg text-muted-foreground">
              KODEGAS Vision is a premier technology company specializing in artificial intelligence, machine learning, IoT solutions, and custom software development. Based in Sri Lanka, we serve clients globally with innovative technology solutions that drive business transformation and digital growth.
            </p>
            <p className="text-lg text-muted-foreground">
              Our expert team of AI engineers, software developers, and technology consultants combines deep technical expertise with industry knowledge to deliver scalable, high-performance solutions. From AI-powered applications to enterprise software systems, we turn complex challenges into competitive advantages.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-2xl text-primary">50+</h3>
                <p className="text-sm text-muted-foreground">Successful Projects</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-2xl text-primary">5+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
