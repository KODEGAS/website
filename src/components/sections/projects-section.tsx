'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

type Project = {
  id: string;
  title: string;
  category?: string;
  image?: string;
  description?: string;
  url?: string;
  github?: string;
  tech?: string[];
  longDescription?: {
    intro?: string;
    features?: string[];
    tools?: string[];
  };
  achievements?: string[];
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data || []);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 sm:py-32 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">AI & Software Development Portfolio</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {projects.length === 0 ? (
          <div className="text-center text-muted-foreground">No projects available.</div>
        ) : (
          <div className="relative">
            {/* Horizontal scrollable container */}
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {projects.map((project, index) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      variants={cardVariants}
                      className="cursor-pointer flex-shrink-0 w-[350px] sm:w-[400px] snap-start"
                    >
                      <Card className="overflow-hidden group h-full hover:shadow-xl transition-shadow duration-300">
                        <div className="overflow-hidden">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={`${project.title} - ${project.category || 'Project'} developed by KODEGAS`}
                              width={600}
                              height={400}
                              className="w-full h-[250px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              priority={index === 0}
                              sizes="400px"
                            />
                          ) : (
                            <div className="w-full h-[250px] bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground">No image</span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-headline text-2xl font-semibold line-clamp-1">{project.title}</h3>
                          {project.category && <p className="text-primary mt-1 text-sm line-clamp-1">{project.category}</p>}
                          {project.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{project.description}</p>}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90dvh] overflow-y-auto">
                  <DialogHeader>
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={`${project.title} - Detailed view`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    )}
                    <DialogTitle className="font-headline text-3xl pt-4">{project.title}</DialogTitle>
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      </div>
                    )}
                    <DialogDescription asChild>
                      <div className="text-left text-base text-muted-foreground pt-4 space-y-4">
                        {project.longDescription?.intro && <p>{project.longDescription.intro}</p>}
                        
                        {project.longDescription?.features && project.longDescription.features.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-foreground">Core Services & Features:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {project.longDescription.features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                          </div>
                        )}
                        
                        {project.longDescription?.tools && project.longDescription.tools.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-foreground">Interactive Tools:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {project.longDescription.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                            </ul>
                          </div>
                        )}

                        {project.achievements && project.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-foreground">Achievements:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {project.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="pt-4 flex gap-2">
                    {project.url && (
                      <Button asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">Visit Site</a>
                      </Button>
                    )}
                    {project.github && (
                      <Button variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          </div>
        )}
      </div>
    </section>
  );
}
