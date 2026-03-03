import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css"; // <--- EN KRİTİK SATIR BURASI!

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk", 
  display: "swap" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap" 
});

export const metadata: Metadata = {
  title: "OnDemand SRE LLC — Enterprise Site Reliability Engineering",
  description: "Staff-level SRE expertise on demand. Led by Emrah Bayram.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} bg-brand-bg text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
