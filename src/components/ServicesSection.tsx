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
