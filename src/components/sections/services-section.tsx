'use client';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Bot, Network, AppWindow, Smartphone, Database } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "Artificial Intelligence",
    description: "Developing intelligent systems that can learn, reason, and adapt to solve complex business challenges."
  },
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "Machine Learning",
    description: "Building predictive models and data-driven solutions to unlock insights and automate processes."
  },
  {
    icon: <Network className="w-10 h-10 text-primary" />,
    title: "Internet of Things (IoT)",
    description: "Connecting physical devices to the digital world, enabling smart environments and data collection."
  },
  {
    icon: <AppWindow className="w-10 h-10 text-primary" />,
    title: "Web Applications",
    description: "Crafting robust, scalable, and user-friendly web applications tailored to your specific needs."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Applications",
    description: "Designing and developing intuitive mobile apps for iOS and Android to engage your users on the go."
  },
  {
    icon: <Database className="w-10 h-10 text-primary" />,
    title: "Data Engineering",
    description: "Architecting and building scalable data pipelines and infrastructure to power your analytics."
  }
];

export default function ServicesSection() {
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

  return (
    <section id="services" className="py-24 sm:py-32 bg-muted/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 [perspective:1000px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Expertise</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">We provide a wide range of services to turn your ideas into reality. Here's what we excel at.</p>
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
                  {service.icon}
                  <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
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
