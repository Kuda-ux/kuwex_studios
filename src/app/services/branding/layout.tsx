import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Branding & Design Services Zimbabwe | Logo Design | KuWeX Studios" },
  description: "Build a powerful brand identity. KuWeX Studios offers professional branding services in Zimbabwe — logo design, brand strategy, visual identity, packaging design, and brand guidelines for businesses in Harare.",
  keywords: [
    "branding agency Zimbabwe",
    "logo design Zimbabwe",
    "brand identity Harare",
    "graphic design Zimbabwe",
    "branding services Zimbabwe",
    "brand strategy Zimbabwe",
    "visual identity design Harare",
    "packaging design Zimbabwe",
  ],
  openGraph: {
    title: "Branding & Design Services Zimbabwe | KuWeX Studios",
    description: "Professional branding & design for Zimbabwe businesses. Logo design, brand strategy, visual identity & packaging design.",
    url: "https://kuwexstudios.co.zw/services/branding",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/branding",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/branding`,
    "name": "Branding & Design Services Zimbabwe",
    "serviceType": "Brand Design",
    "description": "Professional branding and design for Zimbabwe businesses. Logo design, brand strategy, visual identity systems, packaging design, and brand guidelines that command respect and recognition.",
    "url": `${BASE}/services/branding`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$500 - $3000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Branding & Design", "item": `${BASE}/services/branding` },
    ],
  },
];

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
