import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Google Ads Management Zimbabwe | PPC Advertising Agency Harare",
  description: "Maximize your ROI with Google Ads. KuWeX Studios manages high-performing PPC campaigns for Zimbabwe businesses — Google Search Ads, Display Ads, YouTube Ads, and remarketing. Get leads today.",
  keywords: [
    "Google Ads Zimbabwe",
    "PPC advertising Zimbabwe",
    "Google Ads management Harare",
    "pay per click Zimbabwe",
    "Google advertising agency Zimbabwe",
    "search engine marketing Zimbabwe",
    "digital advertising Harare",
  ],
  openGraph: {
    title: "Google Ads Management Zimbabwe | KuWeX Studios",
    description: "High-ROI Google Ads campaigns for Zimbabwe businesses. Search, Display, YouTube & Remarketing ads managed by certified experts.",
    url: "https://kuwexstudios.co.zw/services/google-ads",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/google-ads",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/google-ads`,
    "name": "Google Ads Management Zimbabwe",
    "serviceType": "Pay-Per-Click Advertising",
    "description": "High-ROI Google Ads campaigns for Zimbabwe businesses. Search Ads, Display Ads, YouTube Ads, and Remarketing managed by certified experts. Laser-targeted to Zimbabwe markets.",
    "url": `${BASE}/services/google-ads`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$300 - $2000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Google Ads", "item": `${BASE}/services/google-ads` },
    ],
  },
];

export default function GoogleAdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
