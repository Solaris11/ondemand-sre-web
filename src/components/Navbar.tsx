"use client";
import { useState, useEffect } from "react";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-brand-bg/80 backdrop-blur-md border-b" : "bg-transparent"}`}>
      <div className="container mx-auto h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="status-dot" />
          <span className="font-bold text-xl text-white">OnDemand<span className="text-gradient">SRE</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          <a href="#about" className="hover:text-emerald-400">About</a>
          <a href="#services" className="hover:text-emerald-400">Services</a>
          <a href="#contact" className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-md font-bold">Book a Call</a>
        </div>
      </div>
    </nav>
  );
}
