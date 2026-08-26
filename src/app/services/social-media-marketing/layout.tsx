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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does social media marketing cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Social media marketing in Zimbabwe costs from $250/month for 2 platforms (Facebook + Instagram or LinkedIn) to $450+/month for 4+ platforms. KuWeX Studios packages include content calendar creation, daily posting, graphic design, community management, and monthly analytics. Paid advertising management starts at $150/month plus ad spend." }
      },
      {
        "@type": "Question",
        "name": "Which social media platforms work best for Zimbabwe businesses?",
        "acceptedAnswer": { "@type": "Answer", "text": "Facebook is the most popular platform in Zimbabwe with 2M+ users, making it essential for most businesses. Instagram is ideal for visual brands (fashion, food, hospitality). LinkedIn works well for B2B and professional services. WhatsApp Business is critical for direct customer communication in Zimbabwe. TikTok is growing rapidly among younger demographics. KuWeX Studios recommends the best platforms based on your target audience and industry." }
      },
      {
        "@type": "Question",
        "name": "Do you manage paid social media advertising in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. KuWeX Studios manages Facebook Ads, Instagram Ads, and LinkedIn Ads for Zimbabwe businesses. We handle targeting, ad creative, A/B testing, budget optimization, and conversion tracking. Paid ad management starts at $150/month plus ad spend. Most clients see positive ROI with $200-500/month in ad spend." }
      },
      {
        "@type": "Question",
        "name": "How often will you post on my social media accounts?",
        "acceptedAnswer": { "@type": "Answer", "text": "KuWeX Studios posts daily on each platform (5-7 posts per week per platform). We create a monthly content calendar for approval before posting. Content includes graphics, images, videos, polls, and industry news tailored to your brand voice and audience." }
      },
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
