'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Bot, Network, AppWindow, Smartphone, Database } from "lucide-react";
import { useLazyComponent } from '@/hooks/use-intersection-observer';

// Optimize icon imports
const ServiceIcon = ({ icon: Icon, className }: { icon: any, className: string }) => (
  <Icon className={className} />
);

const services = [
  {
    icon: BrainCircuit,
    title: "AI Development Services",
    description: "Custom artificial intelligence solutions including computer vision, natural language processing, and intelligent automation systems. Expert AI consulting and development for business transformation."
  },
  {
    icon: Bot,
    title: "Machine Learning Solutions",
    description: "End-to-end ML model development from data preprocessing to deployment. Predictive analytics, recommendation systems, and automated decision-making solutions."
  },
  {
    icon: Network,
    title: "IoT Development",
    description: "Complete Internet of Things solutions including sensor integration, device connectivity, data collection, and smart automation systems for industrial and commercial applications."
  },
  {
    icon: AppWindow,
    title: "Web Application Development",
    description: "Modern, responsive web applications using React, Next.js, and cloud technologies. E-commerce platforms, business applications, and API development services."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. User-centric design with robust functionality and seamless performance across devices."
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    description: "Scalable data pipelines, ETL processes, and analytics infrastructure. Big data solutions and business intelligence systems for data-driven decision making."
  }
];

export default function ServicesSection() {
  const { elementRef, shouldLoad } = useLazyComponent('ServicesSection');
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8, rotateX: -45 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      } 
    },
  };

  if (!shouldLoad) {
    return (
      <section ref={elementRef} id="services" className="py-24 sm:py-32 bg-muted/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-6">
            <div className="h-12 w-3/4 mx-auto bg-muted animate-pulse rounded-md" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 w-full bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={elementRef} id="services" className="py-24 sm:py-32 bg-muted/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 [perspective:1000px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Professional Technology Services</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">Comprehensive AI, ML, IoT, and software development services in Sri Lanka. We deliver cutting-edge technology solutions to transform your business and drive innovation.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="items-center">
                  <ServiceIcon icon={service.icon} className="w-10 h-10 text-primary" />
                  <CardTitle className="mt-4 font-headline">
                    <h3>{service.title}</h3>
                  </CardTitle>
                  <CardDescription className="pt-2">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
