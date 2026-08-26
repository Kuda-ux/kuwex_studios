import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "SEO Services Zimbabwe | Rank #1 on Google | KuWeX Studios" },
  description: "Get found on Google. KuWeX Studios offers professional SEO services in Zimbabwe — keyword research, on-page optimization, local SEO, link building, and technical SEO for businesses in Harare and across Zimbabwe.",
  keywords: [
    "SEO services Zimbabwe",
    "SEO company Zimbabwe",
    "SEO agency Harare",
    "search engine optimization Zimbabwe",
    "local SEO Zimbabwe",
    "Google ranking Zimbabwe",
    "SEO company for small businesses Zimbabwe",
    "best SEO services Harare",
  ],
  openGraph: {
    title: "SEO Services Zimbabwe — Rank #1 on Google | KuWeX Studios",
    description: "Professional SEO services for businesses in Harare and Zimbabwe. Keyword research, on-page SEO, local SEO, and link building.",
    url: "https://kuwexstudios.co.zw/services/seo-services",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/seo-services",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/seo-services`,
    "name": "SEO Services Zimbabwe",
    "serviceType": "Search Engine Optimisation",
    "description": "Professional SEO services for Zimbabwe businesses. Keyword research, on-page optimisation, local SEO, technical SEO, and link building. Rank higher on Google and get more organic leads.",
    "url": `${BASE}/services/seo-services`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$249 - $1500", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "SEO Services", "item": `${BASE}/services/seo-services` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does SEO take to show results in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "SEO typically shows initial results in 3-6 months for Zimbabwe-focused keywords. You will see improvements in Google rankings, organic traffic, and inquiries. Competitive keywords may take 6-12 months. KuWeX Studios provides monthly reports showing progress in rankings, traffic, and conversions. 90% of our clients reach page 1 for their target keywords within 6 months." }
      },
      {
        "@type": "Question",
        "name": "How much do SEO services cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "SEO services in Zimbabwe cost from $300 for a one-time audit to $400+/month for ongoing SEO. KuWeX Studios offers SEO audits from $300, monthly SEO retainers from $400/month, and local SEO setup from $250. Pricing depends on competition, number of keywords, and scope of work." }
      },
      {
        "@type": "Question",
        "name": "Can you guarantee first page Google rankings?",
        "acceptedAnswer": { "@type": "Answer", "text": "While we cannot ethically guarantee specific rankings since Google's algorithm changes constantly, we guarantee proper SEO implementation, quality content creation, technical optimization, and measurable traffic growth. 90% of our clients reach page 1 for their target keywords within 6 months." }
      },
      {
        "@type": "Question",
        "name": "What is local SEO and why does it matter for Zimbabwe businesses?",
        "acceptedAnswer": { "@type": "Answer", "text": "Local SEO optimizes your online presence to attract customers searching for businesses in your area. For Zimbabwe businesses, this means appearing in Google Maps results, Google Business Profile listings, and local search queries like 'web design Harare' or 'digital marketing Zimbabwe'. KuWeX Studios optimizes Google Business Profiles, builds local citations, and creates geo-targeted content for Harare, Bulawayo, and across Zimbabwe." }
      },
      {
        "@type": "Question",
        "name": "What is Answer Engine Optimization (AEO)?",
        "acceptedAnswer": { "@type": "Answer", "text": "Answer Engine Optimization (AEO) is the practice of optimizing digital content so AI systems like ChatGPT, Claude, Perplexity, and Google AI Overviews can find, understand, and cite your business when users ask questions. AEO includes FAQ schemas, llms.txt files, structured data, and question-optimized content. KuWeX Studios implements AEO as part of comprehensive SEO strategies." }
      },
    ],
  },
];

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
