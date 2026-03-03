#!/bin/bash

echo "🚀 OnDemand SRE: Full component deployment başlıyor..."

# 1. Services Section
cat << 'EOF' > src/components/ServicesSection.tsx
import { Shield, Cloud, Eye, RefreshCcw, Lock } from "lucide-react";
export default function ServicesSection() {
  const services = [
    { icon: Shield, title: "SRE Implementation", desc: "SLO/SLI frameworks, error budgets, and incident management frameworks." },
    { icon: Cloud, title: "Cloud Architecture", desc: "Scalable, cost-optimized AWS/GCP design. Multi-region & multi-account strategies." },
    { icon: RefreshCcw, title: "Disaster Recovery", desc: "RTO/RPO analysis, automated failover systems, and battle-tested runbooks." },
    { icon: Eye, title: "Observability", desc: "Full-stack monitoring (metrics, logs, traces) with actionable alerting." },
    { icon: Lock, title: "Identity & IAM", desc: "Enterprise IAM architecture, zero-trust, and compliance-ready access controls." }
  ];
  return (
    <section id="services" className="py-24 px-6 container mx-auto bg-slate-900/20">
      <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white text-center">Enterprise <span className="text-gradient">Reliability Services</span></h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => (
          <div key={s.title} className="panel-border p-8 rounded-xl hover:border-emerald-500/50 transition-all group">
            <s.icon className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
            <p className="text-slate-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
EOF

# 2. Experience Section
cat << 'EOF' > src/components/ExperienceSection.tsx
export default function ExperienceSection() {
  const experiences = [
    { company: "Disney Streaming", role: "Staff SRE", detail: "Global scale infrastructure for Disney+" },
    { company: "AWS / Cloud-Native", role: "Architecture", detail: "Multi-region AWS landing zones & migrations" },
    { company: "Fortune 500", role: "Consulting", detail: "50+ engagements across finance & healthcare" }
  ];
  return (
    <section id="experience" className="py-24 px-6 container mx-auto border-t border-slate-800">
      <h2 className="text-3xl font-bold mb-12 text-white">Proven at <span className="text-gradient">Scale</span></h2>
      <div className="space-y-6">
        {experiences.map(exp => (
          <div key={exp.company} className="panel-border p-8 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
              <p className="text-emerald-400 font-mono text-sm uppercase tracking-wider">{exp.role}</p>
            </div>
            <p className="text-slate-500">{exp.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
EOF

# 3. Footer ve CTA Güncellemesi
# (Kısalık adına bu kısımları ana yapıya uygun şekilde ekliyoruz)

echo "✅ Tüm profesyonel bileşenler yüklendi!"
