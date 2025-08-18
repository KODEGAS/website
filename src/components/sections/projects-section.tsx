'use client';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Project Alpha",
    category: "AI / ML",
    image: "https://placehold.co/600x400/800080/f2f2f2",
    description: "An advanced AI-powered analytics platform that provides real-time insights for financial markets. Built with a custom neural network architecture.",
    tags: ["AI", "Python", "TensorFlow"],
    aiHint: "abstract data"
  },
  {
    title: "Project Beta",
    category: "IoT",
    image: "https://placehold.co/600x400/7df9ff/1e1b4b",
    description: "A smart home automation system connecting various IoT devices for seamless control and energy efficiency. Features a central dashboard and mobile app.",
    tags: ["IoT", "React Native", "MQTT"],
    aiHint: "smart home"
  },
  {
    title: "Project Gamma",
    category: "Web App",
    image: "https://placehold.co/600x400/1e1b4b/f2f2f2",
    description: "A large-scale e-commerce platform with a custom recommendation engine, handling thousands of transactions per minute.",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    aiHint: "modern website"
  },
  {
    title: "WeGuard",
    category: "AI / Ag-Tech",
    image: "https://placehold.co/600x400/4ade80/1e1b4b",
    description: "An AI-driven crop health guardian designed to detect plant diseases early, providing expert advice and organic solutions to protect crops.",
    longDescription: `
      <div class="text-left text-base text-muted-foreground pt-4">
        <p class="mb-4">“WeGuard” is an AI-driven crop health guardian. Think of it as a smart watchdog for your farm, designed to sniff out trouble before your plants start dropping hints—or leaves. With the tagline "Protect Your Crops with AI", it provides a robust suite of tools for modern farmers.</p>
        <h4 class="font-semibold text-lg mb-2 text-foreground">Core Services & Features:</h4>
        <ul class="list-disc list-inside mb-4 space-y-1">
          <li><strong>AI Disease Detection:</strong> Snap a photo, let the AI pinpoint what’s wrong.</li>
          <li><strong>Expert Advice:</strong> Algorithm meets agri-know-how.</li>
          <li><strong>Organic Solutions:</strong> Trust in nature, backed by tech.</li>
          <li><strong>Impact:</strong> 10+ diseases detected, 150+ farmers helped, 90% accuracy rate.</li>
          <li><strong>24/7 Expert Support:</strong> Because plant problems don’t watch the clock.</li>
        </ul>
        <h4 class="font-semibold text-lg mb-2 text-foreground">Interactive Tools:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Scan Your Crop:</strong> Upload a picture to get on-the-spot diagnosis and treatment tips.</li>
          <li><strong>Disease Database:</strong> Dive into what’s afflicting your crops and how to fix it.</li>
          <li><strong>Farmer Tips:</strong> Seasonal advice and weather alerts.</li>
          <li><strong>Live Farming Conditions:</strong> Real-time data for localized context.</li>
        </ul>
      </div>
    `,
    tags: ["AI", "Ag-Tech", "React", "Python"],
    aiHint: "healthy crops"
  },
];

export default function ProjectsSection() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="projects" className="py-24 sm:py-32 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Work</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">We take pride in our work. Here are some of our recent projects.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  variants={cardVariants}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden group h-full">
                    <div className="overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={project.aiHint}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-headline text-2xl font-semibold">{project.title}</h3>
                      <p className="text-primary mt-1">{project.category}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                    data-ai-hint={project.aiHint}
                  />
                  <DialogTitle className="font-headline text-3xl pt-4">{project.title}</DialogTitle>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                    {project.longDescription ? (
                      <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                    ) : (
                      <DialogDescription className="pt-4 text-base text-left">
                        {project.description}
                      </DialogDescription>
                    )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
