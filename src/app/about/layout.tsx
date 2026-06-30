import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "About KuWeX Studios | Zimbabwe's #1 Digital Marketing Agency Team",
  description: "Meet the team behind KuWeX Studios — Zimbabwe's most innovative digital marketing and web design agency. Founded by Kuda and Weston in Harare, we have helped 50+ businesses across Zimbabwe grow online.",
  keywords: [
    "about KuWeX Studios",
    "KuWeX Studios team Zimbabwe",
    "digital agency founders Zimbabwe",
    "Kuda Weston digital agency Harare",
    "who is KuWeX Studios",
    "Harare digital marketing team",
    "best digital agency Zimbabwe about",
    "KuWeX Studios story",
  ],
  openGraph: {
    title: "About KuWeX Studios | Zimbabwe's #1 Digital Marketing Agency",
    description: "Zimbabwe's leading digital agency. Founded in Harare by Kuda and Weston — web design, SEO, branding & digital marketing for 50+ businesses nationwide.",
    url: `${BASE}/about`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios — About Us" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About KuWeX Studios | Zimbabwe's Best Digital Agency",
    description: "Meet the Harare-based team behind Zimbabwe's most innovative digital marketing agency.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/about` },
};

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/about`,
    "url": `${BASE}/about`,
    "name": "About KuWeX Studios",
    "description": "KuWeX Studios is Zimbabwe's leading digital marketing agency, founded in Harare, serving businesses nationwide with web design, SEO, branding, and social media marketing.",
    "isPartOf": { "@type": "WebSite", "@id": `${BASE}/#website` },
    "about": {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      "name": "KuWeX Studios",
      "url": BASE,
      "founder": [
        { "@type": "Person", "name": "Kuda", "jobTitle": "Lead Developer & Owner", "url": `${BASE}/about` },
        { "@type": "Person", "name": "Weston", "jobTitle": "Creative Director & Co-Founder", "url": `${BASE}/about` },
      ],
      "foundingDate": "2023",
      "foundingLocation": { "@type": "Place", "name": "Harare, Zimbabwe" },
      "areaServed": [
        { "@type": "Country", "name": "Zimbabwe" },
        { "@type": "City", "name": "Harare" },
        { "@type": "City", "name": "Bulawayo" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE}/about` },
    ],
  },
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      {children}
    </>
  );
}
