export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 container mx-auto border-t border-slate-800/50">
      <div className="grid md:grid-cols-2 gap-16 items-center text-left">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Led by a <span className="text-emerald-400">Staff-Level</span> Perspective</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            With over 15 years of experience in high-scale environments like Disney and AWS-native architectures, 
            I provide the strategic oversight your infrastructure needs.
          </p>
        </div>
        <div className="p-10 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-2">Emrah Gokce Bayram</h3>
          <p className="text-emerald-400 font-mono text-sm mb-6 tracking-widest uppercase">Lead Site Reliability Engineer</p>
          <div className="space-y-4 text-slate-400 text-sm">
            <p>• Kubernetes & Platform Engineering</p>
            <p>• Multi-Region AWS Cloud Architecture</p>
            <p>• Observability & Incident Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}
