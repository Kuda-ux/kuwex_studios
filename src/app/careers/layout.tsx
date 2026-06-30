import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Careers at KuWeX Studios | Digital Marketing Jobs in Zimbabwe" },
  description: "Join Zimbabwe's most innovative digital marketing agency. KuWeX Studios is hiring web developers, SEO specialists, social media managers, graphic designers, and marketing strategists in Harare. Build your career in tech.",
  keywords: [
    "digital marketing jobs Zimbabwe",
    "web developer jobs Harare",
    "SEO specialist Zimbabwe",
    "graphic designer jobs Harare",
    "social media manager Zimbabwe",
    "careers KuWeX Studios",
    "digital agency jobs Zimbabwe",
    "tech jobs Zimbabwe 2026",
  ],
  openGraph: {
    title: "Careers at KuWeX Studios | Digital Marketing Jobs Zimbabwe",
    description: "Join Zimbabwe's most innovative digital agency. We are hiring web developers, SEO specialists, designers, and marketers in Harare.",
    url: `${BASE}/careers`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Careers Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at KuWeX Studios | Zimbabwe",
    description: "Join Zimbabwe's best digital agency. Open roles in web development, SEO, design, and marketing.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/careers` },
};

const careersSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}/careers`,
    "url": `${BASE}/careers`,
    "name": "Careers at KuWeX Studios",
    "description": "Open positions at KuWeX Studios — Zimbabwe's leading digital marketing and web design agency.",
    "isPartOf": { "@type": "WebSite", "@id": `${BASE}/#website` },
    "about": { "@type": "Organization", "@id": `${BASE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Careers", "item": `${BASE}/careers` },
    ],
  },
];

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }} />
      {children}
    </>
  );
}
