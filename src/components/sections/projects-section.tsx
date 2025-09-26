'use client';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const projects = [
  {
    title: "WeGuard",
    category: "AI / Ag-Tech",
    image: "https://res.cloudinary.com/du5tkpcut/image/upload/v1755515595/Screenshot_2025-08-18_at_4.42.50_PM_ek5hl8.png",
    description: "An AI-driven crop health guardian designed to detect plant diseases early, providing expert advice and organic solutions to protect crops.",
    longDescription: {
      intro: "“WeGuard” is an AI-driven crop health guardian. Think of it as a smart watchdog for your farm, designed to sniff out trouble before your plants start dropping hints—or leaves. With the tagline \"Protect Your Crops with AI\", it provides a robust suite of tools for modern farmers.",
      features: [
        "AI Disease Detection: Snap a photo, let the AI pinpoint what’s wrong.",
        "Expert Advice: Algorithm meets agri-know-how.",
        "Organic Solutions: Trust in nature, backed by tech.",
        "Impact: 10+ diseases detected, 150+ farmers helped, 90% accuracy rate.",
        "24/7 Expert Support: Because plant problems don’t watch the clock."
      ],
      tools: [
        "Scan Your Crop: Upload a picture to get on-the-spot diagnosis and treatment tips.",
        "Disease Database: Dive into what’s afflicting your crops and how to fix it.",
        "Farmer Tips: Seasonal advice and weather alerts.",
        "Live Farming Conditions: Real-time data for localized context."
      ]
    },
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
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">AI & Software Development Portfolio</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">Explore our flagship AI-powered projects and custom software solutions. See how we've helped businesses transform with innovative technology.</p>
        </motion.div>

        <div className="grid justify-center gap-8">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  variants={cardVariants}
                  className="cursor-pointer max-w-lg"
                >
                  <Card className="overflow-hidden group h-full">
                    <div className="overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} - AI-powered ${project.category} application developed by KODEGAS`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-headline text-2xl font-semibold">{project.title}</h3>
                      <p className="text-primary mt-1">{project.category}</p>
                      <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                  <Image
                    src={project.image}
                    alt={`${project.title} - Detailed view of AI-powered agricultural technology solution by KODEGAS`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, 600px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <DialogTitle className="font-headline text-3xl pt-4">{project.title}</DialogTitle>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                    <DialogDescription asChild>
                       <div className="text-left text-base text-muted-foreground pt-4 space-y-4">
                        <p>{project.longDescription.intro}</p>
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-foreground">Core Services & Features:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {project.longDescription.features.map((feature, i) => <li key={i}>{feature}</li>)}
                          </ul>
                        </div>
                        <div>
                           <h4 className="font-semibold text-lg mb-2 text-foreground">Interactive Tools:</h4>
                           <ul className="list-disc list-inside space-y-1">
                            {project.longDescription.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                          </ul>
                        </div>
                      </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-4">
                  <Button asChild>
                    <a href="https://weguard.kodegas.com" target="_blank" rel="noopener noreferrer">Visit Site</a>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
