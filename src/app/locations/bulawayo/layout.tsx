import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Best Digital Marketing Agency & Web Design in Bulawayo | KuWeX Studios" },
  description: "KuWeX Studios is Bulawayo's go-to digital marketing agency. We deliver SEO, web design, social media marketing, Google Ads, and branding for businesses across Bulawayo and Matabeleland. Get a free quote today.",
  keywords: [
    "digital marketing Bulawayo",
    "web design Bulawayo",
    "SEO services Bulawayo",
    "website developers Bulawayo",
    "branding agency Bulawayo",
    "social media marketing Bulawayo",
    "web development Bulawayo Zimbabwe",
  ],
  openGraph: {
    title: "Digital Marketing & Web Design Bulawayo | KuWeX Studios",
    description: "Professional digital agency serving Bulawayo businesses. Web design, SEO, branding & social media marketing.",
    url: "https://kuwexstudios.co.zw/locations/bulawayo",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/bulawayo",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/locations/bulawayo`,
    "name": "KuWeX Studios — Serving Bulawayo",
    "description": "Professional digital marketing and web design services for businesses in Bulawayo, Zimbabwe. Web design, SEO, social media, Google Ads, and branding for Matabeleland businesses.",
    "url": `${BASE}/locations/bulawayo`,
    "telephone": "+263719066891",
    "email": "projects@kuwex.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bulawayo",
      "addressRegion": "Bulawayo Province",
      "addressCountry": "ZW",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "-20.1500", "longitude": "28.5833" },
    "areaServed": [
      { "@type": "City", "name": "Bulawayo" },
      { "@type": "AdministrativeArea", "name": "Matabeleland North" },
      { "@type": "AdministrativeArea", "name": "Matabeleland South" },
    ],
    "priceRange": "$$",
    "parentOrganization": { "@type": "Organization", "@id": `${BASE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE}/locations` },
      { "@type": "ListItem", "position": 3, "name": "Bulawayo", "item": `${BASE}/locations/bulawayo` },
    ],
  },
];

export default function BulawayoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
