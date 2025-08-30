"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About Us', title: 'Learn about KODEGAS Vision AI and software development company' },
  { href: '#services', label: 'Services', title: 'AI, ML, IoT, web and mobile development services' },
  { href: '#projects', label: 'Portfolio', title: 'View our AI and software development projects' },
  { href: '#contact', label: 'Contact', title: 'Contact KODEGAS Vision for your next project' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent",
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center" aria-label="KODEGAS Vision - AI and Software Development Company Home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-medium text-foreground/80 hover:text-foreground transition-colors"
              title={link.title}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <a href="#contact" aria-label="Get a quote for AI and software development services">Get a Quote</a>
          </Button>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center gap-6 py-8" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                title={link.title}
              >
                {link.label}
              </Link>
            ))}
            <Button size="lg" onClick={() => setIsMenuOpen(false)} asChild>
              <a href="#contact" aria-label="Get a quote for AI and software development services">Get a Quote</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
