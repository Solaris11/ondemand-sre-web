import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ondemandsre.com"),
  alternates: { canonical: "/" },

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "OnDemand SRE LLC",
    url: "https://www.ondemandsre.com",
    image: "https://www.ondemandsre.com/og-image.png",
    description:
      "Staff-level Site Reliability Engineering & Cloud Infrastructure consulting. Multi-region architecture, observability, incident readiness, and reliability guardrails.",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Site Reliability Engineering Consulting",
      "Cloud Infrastructure Consulting",
      "DevOps Consulting",
      "Observability & Incident Response",
    ],
    founder: {
      "@type": "Person",
      name: "Emrah Bayram",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Clarita",
      addressRegion: "CA",
      addressCountry: "US",
    },
    email: "emrah@ondemandsre.com",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
