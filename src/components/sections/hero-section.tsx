'use client';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-dvh flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <motion.div 
        className="relative z-10 text-center text-white p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter drop-shadow-lg">
          KODEGAS
        </h1>
        <h2 className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
          Leading AI Development, Machine Learning & IoT Solutions Company in Sri Lanka
        </h2>
        <p className="mt-2 max-w-3xl mx-auto text-base md:text-lg text-white/80 drop-shadow-md">
          Expert software development services including artificial intelligence, machine learning models, IoT systems, web applications, and mobile app development. Transform your business with cutting-edge technology solutions.
        </p>
        <div className="mt-8 flex flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#projects" aria-label="View our AI and software development projects">Our Work</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#contact" aria-label="Contact KODEGAS for AI and software development services">Get Started</a>
          </Button>
        </div>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="h-8 w-8 text-white/50" />
      </motion.div>
    </section>
  );
}
