import { Logo } from "@/components/logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs">Innovating the Future with AI, ML, IoT & Beyond.</p>
          </div>
          <div className="grid gap-4">
            <h4 className="font-headline font-semibold text-foreground">Quick Links</h4>
            <Link href="#about" className="hover:text-foreground">About</Link>
            <Link href="#services" className="hover:text-foreground">Services</Link>
            <Link href="#projects" className="hover:text-foreground">Projects</Link>
            <Link href="#contact" className="hover:text-foreground">Contact</Link>
          </div>
          <div className="grid gap-4">
            <h4 className="font-headline font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" aria-label="Visit our Twitter page">
                <Twitter className="h-6 w-6 hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Visit our LinkedIn page">
                <Linkedin className="h-6 w-6 hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Visit our GitHub page">
                <Github className="h-6 w-6 hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm">
          © {new Date().getFullYear()} KODEGAS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
