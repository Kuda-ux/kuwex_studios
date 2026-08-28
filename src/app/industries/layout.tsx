import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Industry-Specific Digital Solutions Zimbabwe | KuWeX Studios" },
  description: "Custom digital marketing, web design, and AI solutions for 12+ industries in Zimbabwe. Tourism, real estate, mining, agriculture, healthcare, retail, construction, education, finance, legal, transport, and NGOs. Industry-specific strategies that work.",
  keywords: [
    "industry-specific digital marketing Zimbabwe",
    "digital marketing by industry Zimbabwe",
    "web design for industries Zimbabwe",
    "tourism digital marketing Zimbabwe",
    "real estate marketing Zimbabwe",
    "mining company website Zimbabwe",
    "agriculture digital marketing Zimbabwe",
    "healthcare marketing Zimbabwe",
    "e-commerce website Zimbabwe",
    "construction website Zimbabwe",
    "education website Zimbabwe",
    "financial services website Zimbabwe",
    "legal services website Zimbabwe",
    "manufacturing website Zimbabwe",
    "NGO website Zimbabwe",
    "transport website Zimbabwe",
    "restaurant website Zimbabwe",
  ],
  openGraph: {
    title: "Industry-Specific Digital Solutions in Zimbabwe | KuWeX Studios",
    description: "Custom digital marketing and web design for 12+ Zimbabwean industries. Tourism, real estate, mining, agriculture, healthcare, retail, and more.",
    url: `${BASE}/industries`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Industry Solutions Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific Digital Solutions Zimbabwe | KuWeX Studios",
    description: "Custom digital marketing for 12+ Zimbabwean industries. Tourism, real estate, mining, agriculture, and more.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/industries` },
};

const industriesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KuWeX Studios Industry Solutions Zimbabwe",
    "description": "Industry-specific digital marketing and web design solutions for Zimbabwean businesses",
    "url": `${BASE}/industries`,
    "itemListElement": [
      { "@type": "ListItem", position: 1, url: `${BASE}/industries/tourism-hospitality`, name: "Tourism & Hospitality Digital Marketing Zimbabwe" },
      { "@type": "ListItem", position: 2, url: `${BASE}/industries/real-estate`, name: "Real Estate Website Design Zimbabwe" },
      { "@type": "ListItem", position: 3, url: `${BASE}/industries/mining`, name: "Mining Company Website Zimbabwe" },
      { "@type": "ListItem", position: 4, url: `${BASE}/industries/agriculture`, name: "Agriculture Website Design Zimbabwe" },
      { "@type": "ListItem", position: 5, url: `${BASE}/industries/healthcare`, name: "Healthcare Website Design Zimbabwe" },
      { "@type": "ListItem", position: 6, url: `${BASE}/industries/retail-ecommerce`, name: "E-commerce & Retail Website Zimbabwe" },
      { "@type": "ListItem", position: 7, url: `${BASE}/industries/construction-engineering`, name: "Construction & Engineering Website Zimbabwe" },
      { "@type": "ListItem", position: 8, url: `${BASE}/industries/education`, name: "Education & Training Website Zimbabwe" },
      { "@type": "ListItem", position: 9, url: `${BASE}/industries/financial-services`, name: "Financial Services Website Zimbabwe" },
      { "@type": "ListItem", position: 10, url: `${BASE}/industries/legal-services`, name: "Legal Services Website Zimbabwe" },
      { "@type": "ListItem", position: 11, url: `${BASE}/industries/manufacturing`, name: "Manufacturing Website Zimbabwe" },
      { "@type": "ListItem", position: 12, url: `${BASE}/industries/ngos-nonprofits`, name: "NGO & Non-profit Website Zimbabwe" },
      { "@type": "ListItem", position: 13, url: `${BASE}/industries/transport-logistics`, name: "Transport & Logistics Website Zimbabwe" },
      { "@type": "ListItem", position: 14, url: `${BASE}/industries/food-restaurant`, name: "Food & Restaurant Website Zimbabwe" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries` },
    ],
  },
];

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesSchema) }} />
      {children}
    </>
  );
}
