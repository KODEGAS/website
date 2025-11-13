"use client";

import { motion } from "framer-motion";
import { Shield, Award, Zap, Users, Code2, Lock, TrendingUp, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: Shield,
    title: "OWASP Security Standards",
    description: "We follow OWASP Top 10 security guidelines and implement industry-leading security practices in every project. Your data and users are protected with enterprise-grade security measures.",
    badge: "Security First",
    color: "text-red-500"
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Successfully delivered 25+ projects across AI, IoT, and web development with 100% client satisfaction. Our portfolio speaks for itself with real-world solutions that drive business growth.",
    badge: "150+ Projects",
    color: "text-yellow-500"
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description: "We use cutting-edge technologies like React, Next.js, TypeScript, TensorFlow, and cloud-native architectures. Your project is built with future-proof, scalable solutions.",
    badge: "Future-Ready",
    color: "text-blue-500"
  },
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description: "Agile development methodology ensures rapid iterations and on-time delivery. We understand deadlines matter and consistently deliver projects 20% faster than industry average.",
    badge: "Fast Turnaround",
    color: "text-purple-500"
  },
  {
    icon: Lock,
    title: "Data Privacy & Compliance",
    description: "GDPR compliant, SOC 2 certified processes, and strict NDA enforcement. Your intellectual property and sensitive data are protected with bank-level encryption and access controls.",
    badge: "GDPR Compliant",
    color: "text-green-500"
  },
  {
    icon: Users,
    title: "Dedicated Support Team",
    description: "24/7 support availability, dedicated project manager, and transparent communication. You're never left in the dark with weekly progress updates and direct access to our team.",
    badge: "24/7 Support",
    color: "text-indigo-500"
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Built to grow with your business from startup to enterprise. Our architectures handle 10,000+ concurrent users and scale seamlessly as your needs evolve.",
    badge: "Enterprise Scale",
    color: "text-orange-500"
  },
  {
    icon: HeartHandshake,
    title: "Transparent Pricing",
    description: "No hidden costs, clear project milestones, and flexible payment terms. You get detailed breakdowns and only pay for what you need with our competitive Sri Lankan rates.",
    badge: "Fair Pricing",
    color: "text-pink-500"
  }
];

export default function WhyUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Why Choose KODEGAS
          </Badge>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Your Competitive Advantage
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            We don't just build software—we deliver secure, scalable, and future-proof solutions that set you apart from competitors. Here's why leading businesses trust KODEGAS.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-muted group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${reason.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {reason.badge}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-headline text-xl font-semibold mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-12 border-t border-border"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5+ Years</div>
              <div className="text-sm text-muted-foreground">Industry Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-lg mb-6 text-muted-foreground">
            Ready to work with a team that prioritizes security, quality, and your success?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Your Project Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
