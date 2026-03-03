import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main className="pt-32 px-6 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Enterprise SRE, <br/><span className="text-gradient">On Demand</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Staff-level Site Reliability Engineering expertise. Led by Emrah Bayram.
        </p>
        <a href="mailto:emrah@ondemandsre.com" className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-md font-bold glow-emerald inline-block">
          Start the Conversation
        </a>
      </main>
    </div>
  );
}
