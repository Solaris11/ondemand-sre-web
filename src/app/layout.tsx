import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "OnDemand SRE | Reliability Engineering",
  description: "Staff-level Site Reliability Engineering and Cloud Infrastructure consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning ekleyerek Next.js'in eklenti paranoyasını kapatıyoruz
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#050B14] text-[#E6E6EB] antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
