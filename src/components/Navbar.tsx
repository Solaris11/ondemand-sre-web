import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter text-white">
          OnDemand<span className="text-emerald-400">SRE</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
          <Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
        </div>
        <Link href="/contact" className="bg-emerald-500 text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
          Book a Call
        </Link>
      </div>
    </nav>
  );
}
