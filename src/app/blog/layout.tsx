import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Blog — Digital Marketing & Web Design Insights for Zimbabwe | KuWeX Studios",
  description: "Expert articles on digital marketing, SEO, web design, social media marketing, Google Ads, and technology for Zimbabwe businesses. Practical guides and industry insights updated weekly by the KuWeX Studios team.",
  keywords: [
    "digital marketing blog Zimbabwe",
    "SEO tips Zimbabwe",
    "web design blog Zimbabwe",
    "Zimbabwe tech news",
    "digital marketing insights Harare",
    "Google Ads guide Zimbabwe",
    "social media marketing tips Zimbabwe",
    "website design articles Zimbabwe",
    "KuWeX Studios blog",
    "digital transformation Zimbabwe",
  ],
  openGraph: {
    title: "Digital Marketing & Web Design Blog for Zimbabwe | KuWeX Studios",
    description: "Expert insights on SEO, web design, social media marketing, Google Ads, and digital transformation for Zimbabwe businesses. Updated weekly.",
    url: `${BASE}/blog`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Blog — Digital Marketing Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Blog Zimbabwe | KuWeX Studios",
    description: "Weekly insights on SEO, web design, social media, and digital growth for Zimbabwe businesses.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: {
    canonical: `${BASE}/blog`,
    types: { "application/rss+xml": `${BASE}/rss.xml` },
  },
};

const blogSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE}/blog`,
    "url": `${BASE}/blog`,
    "name": "KuWeX Studios Blog — Digital Marketing Zimbabwe",
    "description": "Expert articles on digital marketing, SEO, web design, social media, and technology for Zimbabwe businesses.",
    "inLanguage": "en-ZW",
    "isPartOf": { "@type": "WebSite", "@id": `${BASE}/#website` },
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      "name": "KuWeX Studios",
      "url": BASE,
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.jpg` },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
    ],
  },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {children}
    </>
  );
}
