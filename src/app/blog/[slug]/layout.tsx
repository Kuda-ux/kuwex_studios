import type { Metadata } from "next";

const postMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  "how-much-does-website-cost-zimbabwe-2026": {
    title: "How Much Does a Website Cost in Zimbabwe? (2026 Pricing Guide) | KuWeX Studios",
    description: "Complete website pricing guide for Zimbabwe businesses in 2026. From basic sites ($499) to e-commerce ($2,499+). Learn what affects cost and get a free quote from KuWeX Studios.",
    keywords: ["website design Harare price", "how much does a website cost in Zimbabwe", "web design pricing Zimbabwe 2026", "affordable website Zimbabwe"],
  },
  "seo-guide-zimbabwe-small-businesses": {
    title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google (2026) | KuWeX Studios",
    description: "Step-by-step SEO guide for Zimbabwe SMEs. Google Business Profile setup, keyword research, on-page optimization, and link building strategies for Harare businesses.",
    keywords: ["SEO guide Zimbabwe", "SEO for small businesses Zimbabwe", "local SEO Harare", "Google Business Profile Zimbabwe"],
  },
  "google-ads-zimbabwe-beginners-guide": {
    title: "Google Ads Zimbabwe: Complete Beginner's Guide (2026) | KuWeX Studios",
    description: "Learn how to set up and optimize Google Ads for your Zimbabwe business. Budgets, targeting, ad policies, keyword research, and ROI tracking explained step by step.",
    keywords: ["Google Ads Zimbabwe", "PPC advertising Zimbabwe", "Google Ads guide Harare", "Google Ads cost Zimbabwe"],
  },
  "best-social-media-platforms-zimbabwe-businesses": {
    title: "Best Social Media Platforms for Zimbabwe Businesses (2026) | KuWeX Studios",
    description: "Facebook, Instagram, LinkedIn, TikTok, or WhatsApp? Compare each platform's reach, demographics, and marketing ROI for Zimbabwe businesses.",
    keywords: ["social media marketing Zimbabwe", "best social media Zimbabwe", "Facebook marketing Zimbabwe", "WhatsApp Business Zimbabwe"],
  },
  "web-design-trends-zimbabwe-2026": {
    title: "10 Web Design Trends Zimbabwe Businesses Must Adopt in 2026 | KuWeX Studios",
    description: "From dark mode to AI personalization — the web design trends shaping Zimbabwe's digital landscape. Expert insights from KuWeX Studios creative team.",
    keywords: ["web design trends 2026", "web design Zimbabwe", "modern website design Harare", "website redesign Zimbabwe"],
  },
  "google-ads-vs-seo-zimbabwe": {
    title: "Google Ads vs SEO: Which is Better for Zimbabwe SMEs? | KuWeX Studios",
    description: "Data-driven comparison of Google Ads and SEO for Zimbabwe businesses. Costs, timelines, ROI, and when to use each strategy for maximum growth.",
    keywords: ["Google Ads vs SEO Zimbabwe", "PPC vs SEO", "digital marketing Zimbabwe", "SEO cost Zimbabwe"],
  },
  "branding-mistakes-zimbabwe-businesses": {
    title: "7 Branding Mistakes Zimbabwe Businesses Make (And How to Fix Them) | KuWeX Studios",
    description: "Common branding mistakes costing Zimbabwe businesses customers. Expert advice on logo design, brand consistency, and positioning from KuWeX Studios.",
    keywords: ["branding mistakes Zimbabwe", "branding agency Zimbabwe", "logo design Zimbabwe", "brand identity Harare"],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = postMeta[params.slug];
  if (!meta) {
    return { title: "Blog | KuWeX Studios" };
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://kuwexstudios.co.zw/blog/${params.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://kuwexstudios.co.zw/blog/${params.slug}`,
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
