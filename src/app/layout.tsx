import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ondemandsre.com"),

  alternates: {
    canonical: "/",
  },

  title: "OnDemand SRE | Staff-Level Cloud Infrastructure & Reliability Consulting",

  description:
    "Fractional Staff SRE and DevOps consulting. We design multi-region AWS/GCP architectures, optimize CI/CD pipelines, and implement FinOps strategies for global scale.",

  keywords: [
    "Site Reliability Engineering consulting",
    "Fractional Staff SRE",
    "DevOps consulting",
    "AWS Kubernetes architecture",
    "FinOps cost optimization",
    "CI/CD pipeline hardening",
    "Infrastructure as Code audits",
    "High-availability system design",
  ],

  authors: [{ name: "Emrah Bayram" }],
  creator: "OnDemand SRE LLC",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ondemandsre.com",
    title: "OnDemand SRE | Infrastructure Decisions at Scale",
    description:
      "Direct technical pipeline to high-availability architecture and sustainable engineering culture.",
    siteName: "OnDemand SRE",
    images: [
      {
        url: "https://www.ondemandsre.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "OnDemand SRE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OnDemand SRE | Staff-Level Reliability Consulting",
    description:
      "Fractional Staff SRE helping teams build high-availability production systems.",
    images: ["https://www.ondemandsre.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
