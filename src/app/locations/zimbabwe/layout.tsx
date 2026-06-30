import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "#1 Digital Marketing Agency in Zimbabwe | Web Design & SEO | KuWeX Studios",
  description: "KuWeX Studios is Zimbabwe's leading digital marketing agency and web design company. We serve businesses nationwide with SEO services, social media marketing, Google Ads, branding, and custom web development. From startups to enterprises — we deliver results.",
  keywords: [
    "digital marketing agency Zimbabwe",
    "web design Zimbabwe",
    "SEO services Zimbabwe",
    "best digital agency Zimbabwe",
    "website developers Zimbabwe",
    "branding agency Zimbabwe",
    "affordable website design for SMEs in Zimbabwe",
    "digital marketing services for NGOs Zimbabwe",
    "SEO company for small businesses Zimbabwe",
  ],
  openGraph: {
    title: "#1 Digital Marketing Agency in Zimbabwe | KuWeX Studios",
    description: "Zimbabwe's top-rated digital agency. Web design, SEO, branding, social media & Google Ads for businesses nationwide.",
    url: "https://kuwexstudios.co.zw/locations/zimbabwe",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/zimbabwe",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/locations/zimbabwe`,
    "name": "KuWeX Studios — Zimbabwe Nationwide",
    "description": "Zimbabwe's #1 digital marketing agency and web design company. Serving businesses nationwide — Harare, Bulawayo, Gweru, Mutare, Victoria Falls, and beyond.",
    "url": `${BASE}/locations/zimbabwe`,
    "telephone": "+263719066891",
    "email": "projects@kuwex.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Harare",
      "addressRegion": "Harare Province",
      "addressCountry": "ZW",
    },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "priceRange": "$$",
    "parentOrganization": { "@type": "Organization", "@id": `${BASE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE}/locations` },
      { "@type": "ListItem", "position": 3, "name": "Zimbabwe", "item": `${BASE}/locations/zimbabwe` },
    ],
  },
];

export default function ZimbabweLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
