export default function ServicesSection() {
  const services = [
    { title: "Fractional SRE", desc: "Staff-level engineering leadership without the full-time overhead." },
    { title: "Cloud Migration", desc: "Seamless AWS/Kubernetes transitions designed for scale." },
    { title: "Reliability Audit", desc: "Deep-dive analysis of your stack to eliminate single points of failure." }
  ];
  return (
    <section id="services" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-white">Expertise <span className="text-emerald-400">On Demand</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="p-8 rounded-xl border border-slate-800 bg-black/50 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
