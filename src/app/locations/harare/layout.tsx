import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Best Digital Marketing Agency & Web Design in Harare | KuWeX Studios" },
  description: "KuWeX Studios is Harare's top-rated digital marketing agency and web design company. We offer SEO, social media marketing, Google Ads, branding, and custom website development for businesses in Harare, Zimbabwe. Free consultation available.",
  keywords: [
    "digital marketing agency Harare",
    "web design Harare",
    "SEO services Harare",
    "best digital agency Harare",
    "website design Harare price",
    "web development Harare",
    "social media marketing Harare",
    "branding agency Harare",
    "Google Ads Harare",
  ],
  openGraph: {
    title: "Best Digital Marketing Agency & Web Design in Harare | KuWeX Studios",
    description: "Harare's leading digital agency. Web design, SEO, branding, social media & Google Ads for businesses in Harare.",
    url: "https://kuwexstudios.co.zw/locations/harare",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/harare",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/locations/harare`,
    "name": "KuWeX Studios — Harare",
    "description": "Harare's top-rated digital marketing agency and web design company. SEO, social media, Google Ads, branding, and custom web development for businesses in Harare, Zimbabwe.",
    "url": `${BASE}/locations/harare`,
    "telephone": "+263719066891",
    "email": "projects@kuwex.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Harare",
      "addressRegion": "Harare Province",
      "addressCountry": "ZW",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "-17.8292", "longitude": "31.0522" },
    "areaServed": { "@type": "City", "name": "Harare" },
    "priceRange": "$$",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00",
    }],
    "parentOrganization": { "@type": "Organization", "@id": `${BASE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE}/locations` },
      { "@type": "ListItem", "position": 3, "name": "Harare", "item": `${BASE}/locations/harare` },
    ],
  },
];

export default function HarareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
