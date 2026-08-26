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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does logo design cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Logo design in Zimbabwe costs from $300 for a basic logo to $1,500+ for a complete brand identity package. At KuWeX Studios, logo design starts at $300, a full brand identity package (logo + colors + typography) starts at $800, and a complete brand package (strategy + identity + guidelines + collateral) starts at $1,500." }
      },
      {
        "@type": "Question",
        "name": "What is included in a brand identity package?",
        "acceptedAnswer": { "@type": "Answer", "text": "KuWeX Studios brand identity packages include: primary and secondary logo designs, color palette selection, typography recommendations, iconography, brand guidelines document, and social media visual templates. The complete brand package also includes brand strategy, positioning, messaging guidelines, and marketing collateral (business cards, letterheads)." }
      },
      {
        "@type": "Question",
        "name": "How long does branding take?",
        "acceptedAnswer": { "@type": "Answer", "text": "Logo design takes 1-2 weeks. A full brand identity package takes 2-3 weeks. A complete brand package with strategy and guidelines takes 3-5 weeks. KuWeX Studios involves clients at every stage with review and revision rounds to ensure the final brand perfectly represents your business." }
      },
      {
        "@type": "Question",
        "name": "Do you offer brand strategy consulting in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. KuWeX Studios offers brand strategy consulting including brand positioning, target audience definition, brand voice and messaging, competitive analysis, and brand architecture. This is included in our complete brand package or available as standalone consulting from $500." }
      },
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
