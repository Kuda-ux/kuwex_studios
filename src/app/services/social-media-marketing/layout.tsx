import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Social Media Marketing Zimbabwe | Facebook & Instagram | KuWeX Studios" },
  description: "Grow your brand on social media. KuWeX Studios offers expert social media marketing services in Zimbabwe — content creation, community management, paid ads, and influencer marketing for businesses in Harare.",
  keywords: [
    "social media marketing Zimbabwe",
    "Facebook marketing Zimbabwe",
    "Instagram marketing Harare",
    "LinkedIn marketing Zimbabwe",
    "social media management Zimbabwe",
    "social media agency Harare",
    "digital marketing services Zimbabwe",
  ],
  openGraph: {
    title: "Social Media Marketing Zimbabwe | KuWeX Studios",
    description: "Expert social media marketing for Zimbabwe businesses. Content creation, paid ads, community management & influencer marketing.",
    url: "https://kuwexstudios.co.zw/services/social-media-marketing",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/social-media-marketing",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/social-media-marketing`,
    "name": "Social Media Marketing Zimbabwe",
    "serviceType": "Social Media Marketing",
    "description": "Expert social media marketing for Zimbabwe businesses. Facebook, Instagram, and LinkedIn management, content creation, community management, paid advertising, and analytics reporting.",
    "url": `${BASE}/services/social-media-marketing`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$250 - $1500", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Social Media Marketing", "item": `${BASE}/services/social-media-marketing` },
    ],
  },
];

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
