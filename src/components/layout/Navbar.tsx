"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Stack", href: "#stack" },
    { name: "Trust", href: "#trust" },
    { name: "Engagement", href: "#engagement" },
    { name: "Founder", href: "#founder" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight text-primary">
          OnDemand<span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-start to-accent-end">SRE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link 
            href="#contact" 
            className="rounded-xl bg-gradient-to-r from-accent-start to-accent-end text-white px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 px-4 py-6 space-y-4 absolute w-full">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="block text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#contact" 
            className="block text-center rounded-xl bg-gradient-to-r from-accent-start to-accent-end text-white px-5 py-3 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
