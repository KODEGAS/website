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
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">Have a project in mind? We'd love to hear from you.</p>
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
              <h3 className="font-headline text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1"/>
                  <span>FOS, UOK, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary"/>
                  <span>contact@kodegas.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary"/>
                  <span>+94726677555</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-64 md:flex-1 rounded-lg overflow-hidden">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.203923444007!2d79.91300931530946!3d6.974513094958318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2570410795493%3A0x296763f00a5f6b7!2sFaculty%20of%20Science%2C%20University%20of%20Kelaniya!5e0!3m2!1sen!2slk!4v1755515595000!5m2!1sen!2slk"
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
