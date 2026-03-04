export default function WhyUsSection() {
  return (
    <section className="py-24 px-6 container mx-auto text-center">
      <div className="bg-gradient-to-br from-slate-900 to-black p-12 md:p-20 rounded-[3rem] border border-emerald-500/20">
        <h2 className="text-3xl md:text-6xl font-bold mb-8 text-white">Staff Expertise, <br/><span className="text-emerald-400">Fractional Cost</span></h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
          Get enterprise-grade reliability at a fraction of the cost of a full-time Lead.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div><div className="text-3xl font-bold text-white mb-1">15+</div><div className="text-slate-500 text-sm uppercase">Years Exp</div></div>
          <div><div className="text-3xl font-bold text-white mb-1">99.99%</div><div className="text-slate-500 text-sm uppercase">Uptime Goal</div></div>
          <div><div className="text-3xl font-bold text-white mb-1">50+</div><div className="text-slate-500 text-sm uppercase">Engagements</div></div>
          <div><div className="text-3xl font-bold text-white mb-1">24/7</div><div className="text-slate-500 text-sm uppercase">Reliability</div></div>
        </div>
      </div>
    </section>
  );
}
