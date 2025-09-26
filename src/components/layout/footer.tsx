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
            <p className="max-w-xs">Leading AI, ML, IoT, and software development company in Sri Lanka. Expert technology solutions for digital transformation.</p>
            <div className="text-sm space-y-1">
              <p className="font-medium">KODEGAS</p>
              <p>University of Kelaniya, Kelaniya 11600</p>
              <p>Western Province, Sri Lanka</p>
              <p>Phone: +94 72 667 7555 | +94 71 721 8184</p>
              <p>Email: kavindusachinthe@outlook.com</p>
            </div>
          </div>
          <div className="grid gap-4">
            <h4 className="font-headline font-semibold text-foreground">Services</h4>
            <Link href="#services" className="hover:text-foreground">AI Development</Link>
            <Link href="#services" className="hover:text-foreground">Machine Learning</Link>
            <Link href="#services" className="hover:text-foreground">IoT Solutions</Link>
            <Link href="#services" className="hover:text-foreground">Web Development</Link>
            <Link href="#services" className="hover:text-foreground">Mobile Apps</Link>
          </div>
          <div className="grid gap-4">
            <h4 className="font-headline font-semibold text-foreground">Company</h4>
            <Link href="#about" className="hover:text-foreground">About Us</Link>
            <Link href="#projects" className="hover:text-foreground">Portfolio</Link>
            <Link href="#contact" className="hover:text-foreground">Contact</Link>
            <Link href="#contact" className="hover:text-foreground">Get Quote</Link>
            <div className="flex gap-4 mt-4">
              <Link href="https://twitter.com/kodegas" aria-label="Follow KODEGAS on Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 hover:text-foreground" />
              </Link>
              <Link href="https://linkedin.com/company/kodegas" aria-label="Connect with KODEGAS on LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 hover:text-foreground" />
              </Link>
              <Link href="https://github.com/kodegas" aria-label="View KODEGAS projects on GitHub" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm space-y-2">
          <p>© {new Date().getFullYear()} KODEGAS. All rights reserved.</p>
          <p className="text-xs">AI Development | ML Solutions | IoT Systems | Web & Mobile Apps | Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
