'use client';
import { Button } from "@/components/ui/button";
import Scene from "@/components/three/scene";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-dvh overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Scene />
      </div>
      <motion.div 
        className="relative z-10 text-center text-primary-foreground p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter drop-shadow-md">
          KODEGAS
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 drop-shadow-sm">
          Innovating the Future with AI, ML, IoT & Beyond.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#projects">Our Work</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="h-8 w-8 text-primary-foreground/50" />
      </motion.div>
    </section>
  );
}
