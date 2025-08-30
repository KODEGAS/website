'use client';
import { motion } from 'framer-motion';
import LazyAboutScene from '@/components/three/lazy-about-scene';

export default function AboutSection() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-background/80 backdrop-blur-sm">
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
            <LazyAboutScene />
          </motion.div>
          <motion.div 
            variants={variants}
            className="space-y-6"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Crafting Tomorrow's Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              At KODEGAS, we are driven by a singular mission: to harness the power of cutting-edge technology to solve complex problems and create new opportunities. We are a team of passionate innovators, engineers, and designers dedicated to pushing the boundaries of what's possible.
            </p>
            <p className="text-lg text-muted-foreground">
              Our vision is to build a future where intelligent systems, seamless connectivity, and intuitive applications empower businesses and individuals alike. We believe in a collaborative approach, working closely with our clients to turn their ambitious ideas into reality.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
