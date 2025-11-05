"use client";

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      // Consider resetting the form here
    } else if (state?.errors) {
      const errorValues = Object.values(state.errors).flat();
      if(errorValues.length > 0) {
        toast({
          title: "Error",
          description: errorValues[0],
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-muted/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Contact KODEGAS</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">Ready to transform your business with AI, ML, or custom software solutions? Get in touch with our expert development team in Sri Lanka for a free consultation.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
            className="flex flex-col gap-8 order-2 md:order-1"
          >
             <div>
              <h3 className="font-headline text-2xl font-semibold mb-4">Business Contact Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1"/>
                  <div>
                    <p className="font-medium">KODEGAS</p>
                    <p>71 Sri Wickrama Mawatha,</p>
                    <p> Wattala 11300, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary"/>
                  <a href="mailto:kavindusachinthe@outlook.com" className="hover:text-primary transition-colors">
                    contact@kodegas.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary"/>
                  <a href="tel:+94726677555" className="hover:text-primary transition-colors">
                    +94 72 667 7555 | +94 70 389 2138
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Business Hours:</p>
                <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM (Sri Lanka Time)</p>
                <p className="text-sm">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-sm">Sunday: Closed</p>
              </div>
            </div>
            
            <div className="w-full h-64 md:flex-1 rounded-lg overflow-hidden">
               <iframe
                src="https://maps.app.goo.gl/HME9vEznnpaPPb1c6?g_st=ipc"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
            className="order-1 md:order-2"
          >
            <form action={formAction} className="space-y-4">
              <Input name="name" placeholder="Your Name" required />
              <Input name="email" type="email" placeholder="Your Email" required />
              <Input name="subject" placeholder="Subject" required />
              <Textarea name="message" placeholder="Your Message" rows={5} required />
              <SubmitButton />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
