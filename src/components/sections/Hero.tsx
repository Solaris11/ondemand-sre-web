"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FADE_UP } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="section min-h-screen flex items-center pt-24 md:pt-32">
      <div className="container grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Copy */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-start"
        >
          <motion.span variants={FADE_UP} className="text-xs font-semibold tracking-wider uppercase muted mb-4">
            Staff-level SRE as a Service
          </motion.span>
          
          <motion.h1 variants={FADE_UP} className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-primary mb-6 leading-tight">
            Uptime is not a metric.<br />It’s an architecture.
          </motion.h1>
          
          <motion.p variants={FADE_UP} className="text-lg md:text-xl muted max-w-2xl mb-10 leading-relaxed">
            On-demand reliability leadership for production systems at scale. SLOs, observability, resilience, and incident readiness—delivered like a true Staff engineer.
          </motion.p>
          
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
            <Link href="#contact" className="w-full sm:w-auto text-center rounded-xl bg-gradient-to-r from-accent-start to-accent-end text-white px-8 py-3.5 font-medium hover:opacity-90 transition-opacity">
              Book a Call
            </Link>
            <Link href="#services" className="w-full sm:w-auto text-center rounded-xl bg-white/5 border border-white/10 text-primary px-8 py-3.5 font-medium hover:bg-white/10 transition-colors">
              See Engagements
            </Link>
          </motion.div>
          
          <motion.p variants={FADE_UP} className="text-sm muted">
            Multi-region • SLO-driven • Incident-tested
          </motion.p>
        </motion.div>

        {/* Right: Abstract Infra Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="surface relative overflow-hidden aspect-square md:aspect-[4/3] flex flex-col justify-end p-6 group"
        >
          {/* Subtle Gradient Mesh & Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Glowing node abstraction */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-start/20 rounded-full blur-3xl group-hover:bg-accent-end/30 transition-colors duration-700" />

          {/* Chips */}
          <div className="relative z-10 flex flex-wrap gap-3">
            <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-primary backdrop-blur-md">
              SLOs & Error Budgets
            </div>
            <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-primary backdrop-blur-md">
              DR / GameDays
            </div>
            <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-primary backdrop-blur-md">
              Observability & Alerting
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
