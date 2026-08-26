import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Google Ads Management Zimbabwe | PPC Advertising Agency | KuWeX Studios" },
  description: "Maximize your ROI with Google Ads. KuWeX Studios manages high-performing PPC campaigns for Zimbabwe businesses — Google Search Ads, Display Ads, YouTube Ads, and remarketing. Get leads today.",
  keywords: [
    "Google Ads Zimbabwe",
    "PPC advertising Zimbabwe",
    "Google Ads management Harare",
    "pay per click Zimbabwe",
    "Google advertising agency Zimbabwe",
    "search engine marketing Zimbabwe",
    "digital advertising Harare",
  ],
  openGraph: {
    title: "Google Ads Management Zimbabwe | KuWeX Studios",
    description: "High-ROI Google Ads campaigns for Zimbabwe businesses. Search, Display, YouTube & Remarketing ads managed by certified experts.",
    url: "https://kuwexstudios.co.zw/services/google-ads",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/google-ads",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/google-ads`,
    "name": "Google Ads Management Zimbabwe",
    "serviceType": "Pay-Per-Click Advertising",
    "description": "High-ROI Google Ads campaigns for Zimbabwe businesses. Search Ads, Display Ads, YouTube Ads, and Remarketing managed by certified experts. Laser-targeted to Zimbabwe markets.",
    "url": `${BASE}/services/google-ads`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$300 - $2000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Google Ads", "item": `${BASE}/services/google-ads` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should I budget for Google Ads in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Minimum recommended budget is $300-500/month for Google Ads in Zimbabwe. This allows for meaningful testing and optimization. Most of our clients see positive ROI at $500-1,000/month. KuWeX Studios management fee starts at $200/month, which includes keyword research, ad copywriting, landing page optimization, conversion tracking, and monthly reporting." }
      },
      {
        "@type": "Question",
        "name": "How long does it take for Google Ads to work in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Google Ads can start generating leads within 24-48 hours of campaign launch. However, meaningful optimization and ROI typically takes 2-3 months of data collection, A/B testing, and bid optimization. KuWeX Studios provides monthly performance reports showing CTR, CPC, ROAS, and conversions." }
      },
      {
        "@type": "Question",
        "name": "Google Ads vs SEO: which is better for Zimbabwe businesses?",
        "acceptedAnswer": { "@type": "Answer", "text": "Google Ads provides immediate traffic and leads (within 24 hours) but requires ongoing ad spend. SEO takes 3-6 months to show results but provides free organic traffic long-term. For most Zimbabwe businesses, we recommend starting with Google Ads for immediate results while building SEO in parallel for long-term growth. KuWeX Studios offers both services." }
      },
      {
        "@type": "Question",
        "name": "What types of Google Ads do you manage?",
        "acceptedAnswer": { "@type": "Answer", "text": "KuWeX Studios manages Google Search Ads (text ads on search results), Google Display Ads (banner ads on millions of websites), YouTube Ads (video ads), Google Shopping Ads (e-commerce product listings), Remarketing campaigns (re-engage past visitors), and Performance Max campaigns. We recommend the best mix based on your business goals and budget." }
      },
    ],
  },
];

export default function GoogleAdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
