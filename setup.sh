#!/bin/bash

echo "🚀 OnDemand SRE: Altyapı kurulumu ve dosya üretimi başlıyor..."

# Klasör yapısını oluştur (SRE Usulü Idempotent yapı)
mkdir -p src/app src/components src/hooks

# 1. Tailwind Config
cat << 'EOF' > tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#0c1222",
        "brand-card": "#131b2e",
        "brand-border": "rgba(51, 65, 85, 0.3)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# 2. Globals CSS
cat << 'EOF' > src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { border-color: rgba(51, 65, 85, 0.3); }
  body { background-color: #0c1222; color: #e8eaed; }
}

@layer components {
  .glow-emerald { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
  .text-gradient { background: linear-gradient(135deg, #34d399, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
  .panel-border { border: 1px solid rgba(51, 65, 85, 0.3); background: rgba(22, 33, 62, 0.6); backdrop-filter: blur(12px); }
}
EOF

# 3. useInView Hook
cat << 'EOF' > src/hooks/useInView.ts
"use client";
import { useEffect, useRef, useState } from "react";
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}
EOF

# 4. Navbar Component
cat << 'EOF' > src/components/Navbar.tsx
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
EOF

# 5. Page.tsx (Main)
cat << 'EOF' > src/app/page.tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main className="pt-32 px-6 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Enterprise SRE, <br/><span className="text-gradient">On Demand</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Staff-level Site Reliability Engineering expertise. Led by Emrah Bayram.
        </p>
        <a href="mailto:emrah@ondemandsre.com" className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-md font-bold glow-emerald inline-block">
          Start the Conversation
        </a>
      </main>
    </div>
  );
}
EOF

# 6. Layout.tsx
cat << 'EOF' > src/app/layout.tsx
import "./globals.css";
export const metadata = { title: "OnDemand SRE", description: "Expert SRE Consulting" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
EOF

echo "✅ [SUCCESS] Tüm dosyalar hatasız oluşturuldu!"
