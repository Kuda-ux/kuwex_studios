import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | KuWeX Studios Zimbabwe" },
  description: "Read KuWeX Studios' Privacy Policy. We are committed to protecting your personal data and complying with Zimbabwe's Data Protection Act. Learn how we collect, use, and safeguard your information.",
  keywords: [
    "KuWeX Studios privacy policy",
    "data protection Zimbabwe",
    "privacy policy digital agency Zimbabwe",
    "KuWeX Studios data privacy",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | KuWeX Studios Zimbabwe",
    description: "KuWeX Studios is committed to protecting your personal data under Zimbabwe's Data Protection Act.",
    url: `${BASE}/privacy`,
    type: "website",
    siteName: "KuWeX Studios",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Privacy Policy" }],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | KuWeX Studios Zimbabwe",
    description: "KuWeX Studios privacy policy — how we protect your data.",
  },
  alternates: { canonical: `${BASE}/privacy` },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
