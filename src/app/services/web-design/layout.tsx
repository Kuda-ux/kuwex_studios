import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Professional Web Design & Development Zimbabwe | Custom Websites from $499",
  description: "Zimbabwe's #1 web design company. We build fast, responsive, SEO-optimized websites for businesses in Harare and across Zimbabwe. Custom web development, e-commerce, and web applications. Get a free quote today.",
  keywords: [
    "web design Zimbabwe",
    "website developers Zimbabwe",
    "web development Harare",
    "affordable website design Zimbabwe",
    "best company to build business website Zimbabwe",
    "website design Harare price",
    "responsive web design Zimbabwe",
    "e-commerce website Zimbabwe",
    "custom website development Harare",
  ],
  openGraph: {
    title: "Professional Web Design & Development in Zimbabwe | KuWeX Studios",
    description: "Zimbabwe's leading web design company. Custom, fast, SEO-ready websites for businesses across Harare and Zimbabwe. From $499.",
    url: "https://kuwexstudios.co.zw/services/web-design",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/web-design",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/web-design`,
    "name": "Web Design & Development Zimbabwe",
    "serviceType": "Web Design",
    "description": "Custom, mobile-first websites for Zimbabwe businesses. Fast, SEO-optimised, and built to convert visitors into customers. From business websites to e-commerce and custom web applications.",
    "url": `${BASE}/services/web-design`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$800 - $5000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Web Design & Development", "item": `${BASE}/services/web-design` },
    ],
  },
];

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
