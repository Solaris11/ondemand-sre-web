export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 text-center container mx-auto">
      <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white leading-tight">
        Enterprise SRE, <br/>
        <span className="text-emerald-400">On Demand</span>
      </h1>
      <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12">
        Staff-level Site Reliability Engineering expertise. Led by Emrah Bayram.
      </p>
      <div className="flex justify-center">
        <a href="#contact" className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          Start the Conversation
        </a>
      </div>
    </section>
  );
}
