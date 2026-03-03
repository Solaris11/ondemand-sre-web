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
