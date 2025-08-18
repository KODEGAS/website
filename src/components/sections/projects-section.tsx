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
    title: "Project Delta",
    category: "Mobile App",
    image: "https://placehold.co/600x400/3c0764/f2f2f2",
    description: "A cross-platform social networking app for creative professionals to showcase their portfolios and connect with peers.",
    tags: ["Flutter", "Firebase", "Dart"],
    aiHint: "mobile app"
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
                  <DialogDescription className="pt-4 text-base">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
