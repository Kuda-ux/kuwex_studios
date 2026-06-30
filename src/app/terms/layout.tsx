import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | KuWeX Studios Zimbabwe" },
  description: "KuWeX Studios Terms of Service — the legal agreement governing our web design, SEO, branding, and digital marketing services in Zimbabwe. Read before engaging our services.",
  keywords: [
    "KuWeX Studios terms of service",
    "digital agency terms Zimbabwe",
    "web design contract Zimbabwe",
    "KuWeX Studios legal",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service | KuWeX Studios Zimbabwe",
    description: "The legal terms governing KuWeX Studios' digital marketing and web design services in Zimbabwe.",
    url: `${BASE}/terms`,
    type: "website",
    siteName: "KuWeX Studios",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Terms of Service" }],
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | KuWeX Studios Zimbabwe",
    description: "KuWeX Studios terms of service — the legal agreement for our digital agency services.",
  },
  alternates: { canonical: `${BASE}/terms` },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
