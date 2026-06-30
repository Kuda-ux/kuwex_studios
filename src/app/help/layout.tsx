import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Help Center | KuWeX Studios Zimbabwe — Support & Documentation",
  description: "Find answers, guides, and support resources for KuWeX Studios' digital marketing services. Learn how to get started, manage your project, and make the most of your investment.",
  keywords: [
    "KuWeX Studios help",
    "digital marketing support Zimbabwe",
    "website support Zimbabwe",
    "KuWeX Studios documentation",
    "digital agency help center Zimbabwe",
    "web design support Harare",
  ],
  openGraph: {
    title: "Help Center | KuWeX Studios Zimbabwe",
    description: "Support resources and guides for KuWeX Studios' digital marketing and web design services in Zimbabwe.",
    url: `${BASE}/help`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Help Center" }],
  },
  alternates: { canonical: `${BASE}/help` },
};

const helpSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/help`,
  "url": `${BASE}/help`,
  "name": "Help Center — KuWeX Studios",
  "description": "Support resources and guides for KuWeX Studios digital marketing and web design services in Zimbabwe.",
  "isPartOf": { "@type": "WebSite", "@id": `${BASE}/#website` },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(helpSchema) }} />
      {children}
    </>
  );
}
