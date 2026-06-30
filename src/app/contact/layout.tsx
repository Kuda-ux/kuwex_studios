import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Contact KuWeX Studios | Free Digital Marketing Quote — Zimbabwe" },
  description: "Contact KuWeX Studios for a free digital marketing consultation. Call or WhatsApp +263 719 066 891, email projects@kuwex.co. Based in Harare, serving businesses across Zimbabwe. Free quote within 48 hours.",
  keywords: [
    "contact KuWeX Studios",
    "digital marketing quote Zimbabwe",
    "web design quote Harare",
    "KuWeX Studios contact",
    "digital agency contact Zimbabwe",
    "free digital marketing consultation Zimbabwe",
    "WhatsApp KuWeX Studios",
    "get website quote Zimbabwe",
  ],
  openGraph: {
    title: "Contact KuWeX Studios | Free Digital Marketing Quote Zimbabwe",
    description: "Get a free digital marketing quote from Zimbabwe's leading agency. WhatsApp +263 719 066 891 or email projects@kuwex.co. Response within 48 hours.",
    url: `${BASE}/contact`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "Contact KuWeX Studios Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact KuWeX Studios | Free Quote Zimbabwe",
    description: "Get a free digital marketing consultation from Zimbabwe's leading agency.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/contact` },
};

const contactSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE}/contact`,
    "url": `${BASE}/contact`,
    "name": "Contact KuWeX Studios",
    "description": "Contact Zimbabwe's leading digital marketing agency for a free consultation and quote.",
    "isPartOf": { "@type": "WebSite", "@id": `${BASE}/#website` },
    "mainEntity": {
      "@type": "LocalBusiness",
      "@id": `${BASE}/#localbusiness`,
      "name": "KuWeX Studios",
      "telephone": "+263719066891",
      "email": "projects@kuwex.co",
      "url": BASE,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Harare",
        "addressRegion": "Harare Province",
        "addressCountry": "ZW",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE}/contact` },
    ],
  },
];

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      {children}
    </>
  );
}
