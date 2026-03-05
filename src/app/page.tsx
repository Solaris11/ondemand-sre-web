"use client";

import type { Variants } from "framer-motion";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Globe,
  Mail,
  Menu,
  ShieldAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import CalendlyModal from "../components/CalendlyModal";

/* ---------------------------------------------
   MOTION SYSTEM (lean)
--------------------------------------------- */
const ARCHITECT_ENTRY: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: "easeOut" },
  },
};

const STAGGER: Variants = {
  visible: { transition: { staggerChildren: 0.045 } },
};

/* ---------------------------------------------
   DESIGN TOKENS
--------------------------------------------- */
const PANEL =
  "bg-[#0F0F13]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl";

const PANEL_HOVER =
  "hover:border-indigo-500/35 hover:-translate-y-[1px] transition-all duration-200";

const MICRO_PANEL =
  "bg-[#0B0B0F]/40 border border-white/[0.06] rounded-xl";

const PRIMARY_BTN =
  "bg-indigo-700 text-white rounded-xl font-black hover:translate-y-px transition-all shadow-[0_0_40px_rgba(79,70,229,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40";

const SECONDARY_BTN =
  "rounded-xl font-black border border-white/10 text-white/70 hover:border-indigo-500 hover:text-indigo-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30";

const GHOST_BTN =
  "rounded-xl font-black border border-white/10 text-white/55 hover:text-white hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25";

/* ---------------------------------------------
   Calendly
--------------------------------------------- */
const CALENDLY_URL =
  "https://calendly.com/emrah-ondemandsre/30-min-reliability-assessment";

/* ---------------------------------------------
   Sections (nav + scrollspy)
--------------------------------------------- */
type SectionKey =
  | "services"
  | "trust"
  | "stack"
  | "labs"
  | "engagement"
  | "founder";

const NAV_ITEMS: { key: SectionKey; label: string }[] = [
  { key: "services", label: "Services" },
  { key: "trust", label: "Trust" },
  { key: "stack", label: "Stack" },
  { key: "labs", label: "Labs" },
  { key: "engagement", label: "Engagement" },
  { key: "founder", label: "Founder" },
];

/* ---------------------------------------------
   Hero Visual (no infinite animation by default)
--------------------------------------------- */
const TelemetryPanel = () => {
  const reduceMotion = useReducedMotion();

  const bars = useMemo(() => [45, 75, 50, 90, 65, 85, 40, 70, 55, 80, 45, 60], []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45 }}
      className="relative hidden lg:block translate-x-[6%] scale-95 origin-right brightness-[1.06]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-indigo-500/[0.02] blur-[120px] rounded-full" />

      <div className={`relative p-4 shadow-2xl ${PANEL}`}>
        <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            <span className="text-[9px] font-mono text-indigo-400 font-black tracking-widest uppercase">
              us-east-1 • prod
            </span>
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">
            v2.4.7_STABLE
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end h-14 gap-[2px]">
            {bars.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-indigo-500/10 to-indigo-500/30 rounded-sm"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 ${MICRO_PANEL}`}>
              <div className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">
                SLO_HEALTH
              </div>
              <div className="text-[12px] font-mono font-black text-white/90">
                99.982%
              </div>
            </div>

            <div className={`p-3 ${MICRO_PANEL}`}>
              <div className="text-[8px] text-slate-500 font-black mb-1 uppercase tracking-widest">
                LATENCY
              </div>
              <div className="text-[12px] font-mono font-black text-indigo-300/80">
                142ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

type StackDetail = {
  title: string;
  desc: string;
  bullets: string[];
  seo?: string;
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);

  // Mobile nav
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);
  const openMobile = () => setMobileOpen(true);

  // Scrollspy
  const [activeSection, setActiveSection] = useState<SectionKey>("services");

  // Calendly modal state
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  // Stack detail panel state
  const [stackOpen, setStackOpen] = useState<StackDetail | null>(null);
  const stackDetailRef = useRef<HTMLDivElement | null>(null);

  // Scroll state (rAF-throttled)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 40);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // ESC closes panels/modals/mobile
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isCalendlyOpen) closeCalendly();
      if (stackOpen) setStackOpen(null);
      if (mobileOpen) closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCalendlyOpen, stackOpen, mobileOpen]);

  // Scrollspy with IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.key);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target?.id as SectionKey | undefined;
        if (top) setActiveSection(top);
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close stack detail on outside click
  useEffect(() => {
    if (!stackOpen) return;

    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (stackDetailRef.current && stackDetailRef.current.contains(target)) return;

      const stackGrid = document.getElementById("stack-grid");
      if (stackGrid && stackGrid.contains(target)) return;

      setStackOpen(null);
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [stackOpen]);

  // Smooth scroll helper (with offset)
  const scrollToId = (id: SectionKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const stackItems = useMemo<StackDetail[]>(
    () => [
      {
        title: "AWS",
        desc: "High-availability AWS architecture with cost-aware reliability guardrails.",
        bullets: ["Multi-region patterns", "IAM/KMS hardening", "Production runbooks"],
        seo: "AWS reliability engineering",
      },
      {
        title: "GCP",
        desc: "Cloud foundations, networking, and scalable workloads with clear reliability constraints.",
        bullets: ["Org/IAM strategy", "Load balancing patterns", "Service ownership boundaries"],
        seo: "GCP architecture",
      },
      {
        title: "OCI",
        desc: "Pragmatic multi-cloud support where Oracle Cloud is part of the production footprint.",
        bullets: ["Connectivity patterns", "Operational readiness", "Migration guardrails"],
        seo: "OCI cloud architecture",
      },
      {
        title: "Terraform",
        desc: "Infrastructure as code that stays correct under pressure—reviewable, repeatable, and safe to change.",
        bullets: ["Module discipline", "State hygiene", "Policy guardrails"],
        seo: "Terraform best practices",
      },
      {
        title: "Kubernetes",
        desc: "Cluster operations and workload reliability: scaling, rollout safety, and practical SRE controls.",
        bullets: ["HPA / rollout strategy", "Resource safety", "Operational playbooks"],
        seo: "Kubernetes SRE",
      },
      {
        title: "Aurora / MySQL",
        desc: "Operational excellence for relational systems: HA, backup/restore, performance, and upgrade safety.",
        bullets: ["Upgrade planning (5.7→8.0)", "Failover + replicas", "Query + index tuning"],
        seo: "Aurora MySQL reliability",
      },
      {
        title: "DynamoDB",
        desc: "Predictable latency at global scale, with correctness-first patterns and cost control.",
        bullets: ["Global Tables DR", "Hot partition mitigation", "RCU/WCU tuning"],
        seo: "DynamoDB global tables",
      },
      {
        title: "Couchbase",
        desc: "Low-latency data access patterns and operational strategy for distributed NoSQL platforms.",
        bullets: ["Topology planning", "Replication strategy", "Operational runbooks"],
        seo: "Couchbase operations",
      },
      {
        title: "Kafka",
        desc: "Streaming pipelines that don’t melt: capacity planning, consumer safety, and incident-ready ops.",
        bullets: ["Lag + backpressure control", "Partition strategy", "Operational alerts"],
        seo: "Kafka reliability",
      },
      {
        title: "Datadog",
        desc: "Signal-first observability: dashboards and alert tuning that reduce noise and speed up diagnosis.",
        bullets: ["Golden signals", "Alert hygiene", "Service ownership views"],
        seo: "Datadog observability",
      },
      {
        title: "Splunk / Observability",
        desc: "Log + trace + metrics alignment for production incident response and audit-grade visibility.",
        bullets: ["Event taxonomy", "Search performance", "Incident timeline support"],
        seo: "Splunk observability",
      },
      {
        title: "Global Accelerator",
        desc: "Traffic engineering and failover strategy for real regional outage scenarios.",
        bullets: ["Traffic dials", "Health checks", "Rollback paths"],
        seo: "multi-region failover",
      },
      {
        title: "Zero-Trust IAM",
        desc: "Security-first identity and access patterns that scale with the org without slowing teams down.",
        bullets: ["Least privilege", "SSO/MFA posture", "Auditable access paths"],
        seo: "zero trust IAM",
      },
      {
        title: "Google Front End",
        desc: "Edge security + global delivery primitives: protect, accelerate, and serve at scale.",
        bullets: ["Cloud Armor (WAF/DDoS)", "Global Load Balancing", "Media CDN delivery"],
        seo: "Cloud Armor load balancer Media CDN",
      },
      {
        title: "PostgreSQL",
        desc: "Reliability patterns for Postgres: backups, replication, performance, and safe change workflows.",
        bullets: ["HA + replication", "Backup/restore drills", "Performance tuning"],
        seo: "PostgreSQL reliability",
      },
      {
        title: "Grafana / Prometheus",
        desc: "SLO dashboards and alerting discipline with a metrics-first approach.",
        bullets: ["Prometheus metrics model", "Grafana dashboards", "Alertmanager routing"],
        seo: "Prometheus Grafana dashboards",
      },
    ],
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="min-h-screen bg-[#0B0B0F] text-[#E6E6EB] font-sans antialiased selection:bg-indigo-500/10 scroll-smooth"
        suppressHydrationWarning
      >
        {/* Skip link (a11y) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed top-3 left-3 z-[100] px-4 py-2 rounded-xl bg-indigo-700 text-white font-black text-xs"
        >
          Skip to content
        </a>

        {/* SEO JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "OnDemand SRE LLC",
              founder: "Emrah Bayram",
              areaServed: "United States",
              serviceType: "Site Reliability Engineering & Cloud Infrastructure Consulting",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Santa Clarita",
                addressRegion: "CA",
                addressCountry: "US",
              },
              email: "emrah@ondemandsre.com",
            }),
          }}
        />

        {/* Calendly Modal */}
        <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendly} url={CALENDLY_URL} />

        {/* BACKGROUND MATRIX */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)] blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.02)_0%,transparent_70%)] blur-[110px]" />
        </div>

        {/* NAVBAR */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled
              ? "bg-[#0B0B0F]/92 border-b border-white/[0.05] backdrop-blur-xl py-3"
              : "bg-transparent border-b border-transparent py-5"
            }`}
          aria-label="Primary"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToId("services")}
              className="flex items-center gap-3 opacity-90 transition-opacity hover:opacity-100"
              aria-label="Go to Services (top)"
            >
              <svg width="20" height="20" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                <rect x="2" y="16" width="6" height="12" rx="0" className="fill-indigo-600 opacity-40" />
                <rect x="13" y="8" width="6" height="20" rx="0" className="fill-indigo-600 opacity-80" />
                <rect x="24" y="2" width="6" height="26" rx="0" className="fill-purple-700 opacity-90" />
              </svg>
              <span className="font-bold text-lg tracking-tighter text-white">
                OnDemand <span className="text-indigo-500/80">SRE</span>
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-10 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => scrollToId(item.key)}
                    className={`relative hover:text-indigo-200 transition-colors ${active ? "text-white" : ""
                      }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full transition-all ${active ? "bg-indigo-500/70 opacity-100" : "opacity-0"
                        }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={mobileOpen ? closeMobile : openMobile}
                className={`md:hidden inline-flex items-center justify-center w-10 h-10 ${MICRO_PANEL} text-white/80 hover:text-white`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <button
                type="button"
                onClick={openCalendly}
                className={`hidden sm:inline-flex px-5 py-2 text-[9px] uppercase tracking-[0.2em] ${PRIMARY_BTN}`}
              >
                Book Call
              </button>
            </div>
          </div>

          {/* Mobile nav overlay */}
          {mobileOpen && (
            <div className="md:hidden">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={closeMobile}
                aria-hidden="true"
              />
              <div className={`fixed top-[72px] left-0 right-0 z-50 mx-4 p-4 ${PANEL}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] font-black uppercase tracking-[0.35em] text-indigo-300/80">
                    Navigation
                  </div>
                  <button
                    type="button"
                    onClick={closeMobile}
                    className={`px-3 py-2 ${GHOST_BTN} text-[10px] uppercase tracking-[0.25em]`}
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        scrollToId(item.key);
                        closeMobile();
                      }}
                      className={`px-4 py-3 text-left ${MICRO_PANEL} ${activeSection === item.key
                          ? "border-indigo-500/35 text-white"
                          : "text-white/70"
                        }`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.25em]">
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={openCalendly}
                    className={`flex-1 px-4 py-3 text-sm ${PRIMARY_BTN}`}
                  >
                    Book Call <ChevronRight className="inline-block ml-1" size={16} />
                  </button>
                  <a
                    href="mailto:emrah@ondemandsre.com"
                    className={`flex-1 px-4 py-3 text-sm text-center ${SECONDARY_BTN}`}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        <main id="main" className="relative z-10">
          {/* HERO */}
          <section className="pt-44 sm:pt-56 lg:pt-64 pb-28 sm:pb-40 px-6 sm:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div initial="hidden" animate="visible" variants={STAGGER}>
                <m.span
                  variants={ARCHITECT_ENTRY}
                  className="px-3 py-1 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] text-indigo-300/80 text-[9px] font-black tracking-[0.5em] uppercase mb-10 inline-block"
                >
                  Staff-level Reliability
                </m.span>

                <m.h1
                  variants={ARCHITECT_ENTRY}
                  className="text-5xl sm:text-6xl md:text-[92px] font-bold tracking-tighter leading-[0.88] mb-10 text-white max-w-[14ch]"
                >
                  Uptime is not a metric. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300/85 to-purple-300/85 italic">
                    It’s an architecture.
                  </span>
                </m.h1>

                <m.p
                  variants={ARCHITECT_ENTRY}
                  className="text-lg sm:text-xl md:text-2xl text-slate-400 leading-relaxed mb-12 max-w-[52ch] font-medium opacity-90"
                >
                  On-demand reliability leadership for production systems at scale. SLOs, observability,
                  and incident readiness—delivered with Staff-level authority.
                </m.p>

                <m.div variants={ARCHITECT_ENTRY} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                  <button
                    type="button"
                    onClick={openCalendly}
                    className={`px-10 py-5 text-lg sm:text-xl ${PRIMARY_BTN}`}
                  >
                    Book Call →
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToId("labs")}
                    className={`px-10 py-5 text-lg sm:text-xl ${SECONDARY_BTN}`}
                  >
                    See Demo Pack
                  </button>

                  <a
                    href="mailto:emrah@ondemandsre.com"
                    className={`px-10 py-5 text-lg sm:text-xl ${GHOST_BTN} text-center`}
                  >
                    Direct Email
                  </a>
                </m.div>

                <m.div
                  variants={ARCHITECT_ENTRY}
                  className="text-[11px] uppercase tracking-[0.3em] text-slate-600 font-bold"
                >
                  Fast, executive-ready outputs. No fluff. Built for production.
                </m.div>
              </m.div>

              <TelemetryPanel />
            </div>
          </section>

          {/* SERVICES */}
          <section
            id="services"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={STAGGER}
            >
              <div className="mb-16 sm:mb-20">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                  Services
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm italic">
                  Staff-Level Reliability Engagements.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Strategic Reliability Audit",
                    dur: "2–4 Weeks",
                    items: [
                      "Production risk mapping",
                      "Architecture review",
                      "SLO health evaluation",
                      "Failure scenario exposure",
                      "Blueprint summary",
                    ],
                    outcome: "Executive-ready summary delivered.",
                  },
                  {
                    title: "Architecture Deep Dive",
                    dur: "Project-Based",
                    items: [
                      "Multi-region strategy",
                      "Infrastructure redesign",
                      "Infra-as-code hardening",
                      "Cost-performance alignment",
                      "Reliability guardrails",
                    ],
                    outcome: "Blueprint + roadmap with clear next steps.",
                  },
                  {
                    title: "Ongoing Reliability Partner",
                    dur: "6+ Months",
                    items: [
                      "Fractional Staff SRE",
                      "Incident advisory",
                      "Engineering roadmap",
                      "Reliability culture",
                      "SLO governance",
                    ],
                    outcome: "Staff-level execution & oversight.",
                  },
                ].map((s, i) => (
                  <m.div
                    key={i}
                    variants={ARCHITECT_ENTRY}
                    className={`p-10 shadow-inner ${PANEL} ${PANEL_HOVER}`}
                  >
                    <div className="text-indigo-300/80 font-black text-[9px] uppercase tracking-[0.4em] mb-4">
                      {s.dur}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-8">{s.title}</h3>

                    <ul className="space-y-4 mb-10">
                      {s.items.map((item) => (
                        <li key={item} className="text-slate-400 text-sm flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={openCalendly}
                      className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 ${MICRO_PANEL} hover:border-indigo-500/35 hover:text-white`}
                      aria-label={`Enquire about ${s.title}`}
                    >
                      Enquire <ChevronRight size={14} />
                    </button>

                    <div className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                      {s.outcome}
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </section>

          {/* TRUST */}
          <section
            id="trust"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={STAGGER}
              className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
              <div>
                <h2 className="text-5xl font-black tracking-tighter text-white mb-8">
                  Enterprise Experience.
                </h2>

                <div className="space-y-10">
                  {[
                    { val: "250M+", label: "Global user concurrency supported" },
                    { val: "50+", label: "Production-grade architectures built" },
                    { val: "99.99%", label: "Uptime stability targets managed" },
                    { val: "Scale", label: "Multi-region, high-availability design" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-baseline gap-6 border-l border-white/5 pl-8">
                      <span className="text-6xl font-black text-indigo-300/85 tracking-tighter">
                        {item.val}
                      </span>
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-14 text-[11px] uppercase tracking-[0.3em] text-slate-500 font-bold">
                  Formerly contributing to global-scale platforms serving 250M+ users.
                </div>
              </div>

              <div className="hidden lg:flex justify-center opacity-[0.08] select-none" aria-hidden="true">
                <Globe size={340} />
              </div>
            </m.div>
          </section>

          {/* STACK */}
          <section
            id="stack"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                Architecture Stack.
              </h2>
              <p className="text-slate-600 text-sm font-bold uppercase tracking-[0.25em]">
                Cloud • Data • Observability • Delivery
              </p>
            </div>

            <div id="stack-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {stackItems.map((item) => {
                const isOpen = stackOpen?.title === item.title;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStackOpen(isOpen ? null : item)}
                    className={`p-8 text-center text-[10px] font-black uppercase tracking-[0.3em] transition-all ${PANEL} ${isOpen
                        ? "border-indigo-500/35 text-white"
                        : "text-slate-500 hover:text-white hover:border-indigo-500/25"
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30`}
                    aria-expanded={isOpen}
                    aria-controls="stack-detail"
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {stackOpen && (
              <m.div
                id="stack-detail"
                ref={stackDetailRef}
                initial="hidden"
                animate="visible"
                variants={reduceMotion ? undefined : ARCHITECT_ENTRY}
                className={`mt-10 p-10 max-w-5xl mx-auto shadow-inner ${PANEL}`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="max-w-3xl">
                    <div className="text-indigo-300/80 text-[9px] font-black uppercase tracking-[0.45em] mb-4">
                      Stack Detail
                    </div>

                    <div className="text-[9px] text-slate-600 uppercase tracking-[0.4em] mb-6 font-bold">
                      Applied in real production systems.
                    </div>

                    <div className="text-white font-black text-2xl tracking-tighter mb-3">
                      {stackOpen.title}
                    </div>

                    <div className="text-slate-400 text-sm leading-relaxed font-medium opacity-90 mb-8">
                      {stackOpen.desc}
                    </div>

                    <ul className="space-y-3">
                      {stackOpen.bullets.map((b) => (
                        <li key={b} className="text-slate-400 text-sm flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {stackOpen.seo && (
                      <div className="mt-8 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                        {stackOpen.seo}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStackOpen(null)}
                    className={`inline-flex items-center gap-2 px-3 py-2 ${MICRO_PANEL} text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30`}
                    aria-label="Close stack detail"
                  >
                    <X size={14} /> Close
                  </button>
                </div>
              </m.div>
            )}
          </section>

          {/* LABS / DEMO */}
          <section
            id="labs"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={STAGGER}
            >
              <div className="mb-16 sm:mb-20">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                  Labs & Demos.
                </h2>
                <p className="text-slate-600 text-sm font-bold uppercase tracking-[0.25em]">
                  SRE demo • observability demo • incident response simulation • multi-region failover
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <GitBranch size={18} className="text-indigo-300/80" />,
                    tag: "RUNBOOK + METRICS",
                    title: "Multi-Region Failover Drill",
                    desc:
                      "Traffic shifting, health checks, rollback paths, and failure-mode rehearsals—built like production.",
                    bullets: ["Regional outage simulation", "Traffic dial + recovery plan", "Blast radius controls"],
                  },
                  {
                    icon: <Activity size={18} className="text-indigo-300/80" />,
                    tag: "SLO + ALERTING",
                    title: "Observability Stack",
                    desc:
                      "Golden signals, SLO dashboards, and alert tuning. Designed to reduce noise and increase signal.",
                    bullets: ["Prometheus/Grafana dashboards", "SLO + error budget framing", "Alert fatigue reduction"],
                  },
                  {
                    icon: <ShieldAlert size={18} className="text-indigo-300/80" />,
                    tag: "RCA + POSTMORTEM",
                    title: "Incident GameDay (SEV)",
                    desc:
                      "Realistic incident response simulation: triage, comms, timeline, and action items that stick.",
                    bullets: ["On-call workflow & roles", "Timeline + comms template", "Corrective actions & prevention"],
                  },
                ].map((d, i) => (
                  <m.div
                    key={i}
                    variants={ARCHITECT_ENTRY}
                    className={`p-10 shadow-inner ${PANEL} ${PANEL_HOVER}`}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 flex items-center justify-center ${MICRO_PANEL}`}>
                          {d.icon}
                        </div>
                        <div className="text-indigo-300/80 font-black text-[9px] uppercase tracking-[0.4em]">
                          {d.tag}
                        </div>
                      </div>

                      <div className="px-3 py-1 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] text-[8px] font-black uppercase tracking-[0.35em] text-indigo-300/80">
                        Available On Request
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-5">{d.title}</h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium opacity-90">
                      {d.desc}
                    </p>

                    <ul className="space-y-4 mb-10">
                      {d.bullets.map((b) => (
                        <li key={b} className="text-slate-400 text-sm flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={openCalendly}
                      className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 ${MICRO_PANEL} hover:border-indigo-500/35 hover:text-white`}
                      aria-label={`Request demo pack: ${d.title}`}
                    >
                      Request Demo Pack <ChevronRight size={14} />
                    </button>

                    <div className="mt-6 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      Artifacts available on request
                    </div>
                  </m.div>
                ))}
              </div>

              {/* NEW RELIABILITY LAB ARCHITECTURE SECTION */}
              <section className="mt-28 max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Reliability Lab Architecture
                </h2>

                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                  This lab simulates real-world reliability scenarios including regional
                  outages, traffic failover, observability and incident response workflows.
                </p>

                <div className="mt-12">
                  <Image
                    src="/reliability-lab-architecture.png"
                    alt="OnDemand SRE Reliability Lab Architecture"
                    width={1200}
                    height={700}
                    className="mx-auto rounded-xl shadow-lg"
                  />
                </div>

                <div className="mt-12 text-left max-w-xl mx-auto">
                  <h3 className="text-lg font-medium mb-3">Lab Stack</h3>

                  <ul className="space-y-2 text-gray-400">
                    <li>• Kubernetes (k3d clusters)</li>
                    <li>• Prometheus + Grafana</li>
                    <li>• Alertmanager</li>
                    <li>• k6 Load Testing</li>
                    <li>• Chaos failure simulation</li>
                    <li>• Multi-region traffic routing</li>
                  </ul>
                </div>
              </section>

              <m.div
                variants={ARCHITECT_ENTRY}
                className={`mt-14 sm:mt-16 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-inner ${PANEL} ${PANEL_HOVER}`}
              >
                <div className="max-w-2xl">
                  <div className="text-indigo-300/80 text-[9px] font-black uppercase tracking-[0.45em] mb-4">
                    What you get
                  </div>
                  <div className="text-white font-black text-2xl tracking-tighter mb-3">
                    Demo Pack: diagrams, runbooks, and dashboard snapshots.
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed font-medium opacity-90">
                    A concise, production-minded package you can review fast—focused on failure modes,
                    observability patterns, and incident readiness.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCalendly}
                  className={`px-10 py-5 text-lg sm:text-xl ${PRIMARY_BTN}`}
                >
                  Book Call →
                </button>
              </m.div>
            </m.div>
          </section>

          {/* ENGAGEMENT */}
          <section
            id="engagement"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={STAGGER}
            >
              <div className="text-center mb-16 sm:mb-24">
                <h2 className="text-5xl font-black tracking-tighter text-white mb-6 italic">
                  Engagement Model.
                </h2>
              </div>

              <div className="grid md:grid-cols-4 gap-10 md:gap-8">
                {[
                  { step: "01", title: "Intro Call", desc: "30 Minutes" },
                  { step: "02", title: "System Assessment", desc: "Technical Audit" },
                  { step: "03", title: "Architecture Proposal", desc: "Strategic Blueprint" },
                  { step: "04", title: "Execution & Oversight", desc: "Direct Implementation" },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="text-indigo-300/85 font-mono text-sm font-bold tracking-widest">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-14 sm:mt-24 flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={openCalendly}
                  className={`inline-flex items-center gap-4 px-10 py-5 text-lg sm:text-xl ${PRIMARY_BTN}`}
                >
                  <Mail aria-hidden="true" /> Book via Calendly
                </button>

                <a
                  href="mailto:emrah@ondemandsre.com"
                  className="text-white/55 hover:text-white/80 transition-colors text-sm"
                >
                  Or email: emrah@ondemandsre.com
                </a>
              </div>
            </m.div>
          </section>

          {/* FOUNDER */}
          <section
            id="founder"
            className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.04]"
          >
            <div className="grid lg:grid-cols-12 gap-14 lg:gap-24 items-center">

              <div className={`lg:col-span-4 aspect-[4/5] relative overflow-hidden group shadow-inner p-0 ${PANEL}`}>
                <Image
                  src="/founder.jpg"
                  alt="Emrah Bayram - Founder & Staff SRE"
                  fill
                  className="object-cover opacity-90 grayscale-[15%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  priority
                />
                <div
                  className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "12px 12px",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/50 to-transparent z-20 pointer-events-none" aria-hidden="true" />

                <div className="absolute bottom-10 left-10 z-30">
                  <div className="text-white font-black text-3xl tracking-tighter opacity-90">
                    Emrah Bayram
                  </div>
                  <div className="text-indigo-300/85 font-black text-[10px] uppercase tracking-[0.4em] mt-2">
                    Founder • Staff SRE
                  </div>
                  <div className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                    Infrastructure decisions at scale.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                <h2 className="text-5xl font-black tracking-tighter text-white leading-none">
                  Quiet Authority.
                </h2>

                <div className="text-[11px] uppercase tracking-[0.3em] text-indigo-300/80 font-bold -mt-6">
                  Staff-Level Production Systems Architect
                </div>

                <div className="space-y-10 text-slate-400 text-lg leading-relaxed max-w-3xl font-bold italic opacity-80">
                  <p>
                    Designing and scaling mission-critical platforms at global scale. Direct technical pipeline
                    to high-availability architecture and sustainable engineering culture.
                  </p>

                  <div className="grid md:grid-cols-2 gap-10 pt-2 not-italic uppercase tracking-[0.2em] text-[10px]">
                    <ul className="space-y-5">
                      {["20+ Years Infrastructure", "Enterprise Global Scale", "Multi-Region Architecture"].map((l) => (
                        <li key={l} className="flex items-center gap-4 text-slate-400">
                          <CheckCircle2 size={12} className="text-indigo-500/40" />
                          {l}
                        </li>
                      ))}
                    </ul>

                    <ul className="space-y-5">
                      {["AWS / GCP / OCI", "Kafka / DynamoDB / Couchbase", "Reliability Culture"].map((l) => (
                        <li key={l} className="flex items-center gap-4 text-slate-400">
                          <CheckCircle2 size={12} className="text-indigo-500/40" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={openCalendly}
                      className="inline-flex items-center gap-2 text-indigo-300/85 hover:text-indigo-200 transition-colors font-black not-italic focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 rounded-xl px-2 py-1 -ml-2"
                    >
                      Book a call <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 py-20 border-t border-white/[0.04] text-center px-6 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="text-white font-black text-xl tracking-tighter opacity-90">
              OnDemand SRE LLC
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-12 text-slate-700 text-[9px] font-black uppercase tracking-[0.5em]">
              <span>Santa Clarita, CA</span>
              <span>© 2026</span>
              <a href="mailto:emrah@ondemandsre.com" className="hover:text-white/60 transition-colors">
                emrah@ondemandsre.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
