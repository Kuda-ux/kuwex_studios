import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Digital Marketing Services Zimbabwe | Web Design, SEO, Google Ads & Branding" },
  description: "Complete digital marketing services for Zimbabwe businesses — custom web design, SEO, social media marketing, Google Ads, and branding from KuWeX Studios. Affordable packages starting from $249. Based in Harare, serving all of Zimbabwe.",
  keywords: [
    "digital marketing services Zimbabwe",
    "web design services Zimbabwe",
    "SEO services Zimbabwe",
    "Google Ads management Zimbabwe",
    "social media marketing Zimbabwe",
    "branding services Zimbabwe",
    "digital agency services Harare",
    "affordable digital marketing Zimbabwe",
    "full-service digital agency Zimbabwe",
    "website development services Zimbabwe",
  ],
  openGraph: {
    title: "Digital Marketing Services in Zimbabwe | KuWeX Studios",
    description: "Web design, SEO, social media marketing, Google Ads, and branding for Zimbabwe businesses. Packages from $249. Free consultation available.",
    url: `${BASE}/services`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Services Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services Zimbabwe | KuWeX Studios",
    description: "Full-service digital agency in Zimbabwe. Web design, SEO, social media, Google Ads & branding.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/services` },
};

const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KuWeX Studios Digital Services Zimbabwe",
    "description": "Full-service digital marketing and web design services for Zimbabwe businesses",
    "url": `${BASE}/services`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": `${BASE}/services/web-design`, "name": "Web Design & Development Zimbabwe" },
      { "@type": "ListItem", "position": 2, "url": `${BASE}/services/seo-services`, "name": "SEO Services Zimbabwe" },
      { "@type": "ListItem", "position": 3, "url": `${BASE}/services/social-media-marketing`, "name": "Social Media Marketing Zimbabwe" },
      { "@type": "ListItem", "position": 4, "url": `${BASE}/services/google-ads`, "name": "Google Ads Management Zimbabwe" },
      { "@type": "ListItem", "position": 5, "url": `${BASE}/services/branding`, "name": "Branding & Design Zimbabwe" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
    ],
  },
];

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      {children}
    </>
  );
}
