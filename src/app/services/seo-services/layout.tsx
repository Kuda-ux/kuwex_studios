import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "SEO Services Zimbabwe | Rank #1 on Google | KuWeX Studios" },
  description: "Get found on Google. KuWeX Studios offers professional SEO services in Zimbabwe — keyword research, on-page optimization, local SEO, link building, and technical SEO for businesses in Harare and across Zimbabwe.",
  keywords: [
    "SEO services Zimbabwe",
    "SEO company Zimbabwe",
    "SEO agency Harare",
    "search engine optimization Zimbabwe",
    "local SEO Zimbabwe",
    "Google ranking Zimbabwe",
    "SEO company for small businesses Zimbabwe",
    "best SEO services Harare",
  ],
  openGraph: {
    title: "SEO Services Zimbabwe — Rank #1 on Google | KuWeX Studios",
    description: "Professional SEO services for businesses in Harare and Zimbabwe. Keyword research, on-page SEO, local SEO, and link building.",
    url: "https://kuwexstudios.co.zw/services/seo-services",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/seo-services",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/seo-services`,
    "name": "SEO Services Zimbabwe",
    "serviceType": "Search Engine Optimisation",
    "description": "Professional SEO services for Zimbabwe businesses. Keyword research, on-page optimisation, local SEO, technical SEO, and link building. Rank higher on Google and get more organic leads.",
    "url": `${BASE}/services/seo-services`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$249 - $1500", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "SEO Services", "item": `${BASE}/services/seo-services` },
    ],
  },
];

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
