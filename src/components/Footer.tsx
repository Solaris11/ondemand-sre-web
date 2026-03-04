export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-900 bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-white">OnDemand<span className="text-emerald-400">SRE</span></span>
        </div>
        <p className="text-slate-600 text-sm">© 2026 OnDemand SRE LLC. All rights reserved.</p>
        <div className="flex gap-6 text-slate-500 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
          <a href="mailto:emrah@ondemandsre.com" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
