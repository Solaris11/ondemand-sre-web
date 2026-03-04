export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">Battle-Tested Experience</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex gap-6 p-8 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-emerald-400 font-bold text-xl">01</div>
          <div>
            <h3 className="text-xl font-bold text-white">Disney Streaming</h3>
            <p className="text-slate-400 mt-2">Scaling infrastructure for millions of concurrent viewers globally.</p>
          </div>
        </div>
        <div className="flex gap-6 p-8 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-emerald-400 font-bold text-xl">02</div>
          <div>
            <h3 className="text-xl font-bold text-white">Enterprise AWS Architect</h3>
            <p className="text-slate-400 mt-2">Building multi-region, self-healing systems for mission-critical apps.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
