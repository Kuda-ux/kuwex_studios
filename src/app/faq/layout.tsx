import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "FAQ — Digital Marketing & Web Design Questions Zimbabwe | KuWeX Studios" },
  description: "Answers to the most common questions about web design, SEO, Google Ads, social media marketing, and digital marketing pricing for Zimbabwe businesses. Honest answers from KuWeX Studios.",
  keywords: [
    "digital marketing FAQ Zimbabwe",
    "web design FAQ Zimbabwe",
    "SEO questions Zimbabwe",
    "how much does a website cost Zimbabwe",
    "digital marketing prices Zimbabwe",
    "Google Ads budget Zimbabwe",
    "website maintenance Zimbabwe",
    "digital agency FAQ Harare",
  ],
  openGraph: {
    title: "FAQ — Digital Marketing & Web Design Questions Zimbabwe | KuWeX Studios",
    description: "Honest answers about web design costs, SEO timelines, Google Ads budgets, and social media marketing for Zimbabwe businesses.",
    url: `${BASE}/faq`,
    type: "website",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios FAQ Zimbabwe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing FAQ Zimbabwe | KuWeX Studios",
    description: "Honest answers about web design, SEO, Google Ads, and digital marketing pricing for Zimbabwe businesses.",
    creator: "@kuwexstudios",
    site: "@kuwexstudios",
    images: [`${BASE}/logo.jpg`],
  },
  alternates: { canonical: `${BASE}/faq` },
};

const faqSchema = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/faq`,
    "url": `${BASE}/faq`,
    "name": "Digital Marketing FAQ Zimbabwe — KuWeX Studios",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a website cost in Zimbabwe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Website costs in Zimbabwe range from $800 for a basic business website to $5,000+ for complex e-commerce or custom web applications. At KuWeX Studios, basic websites start at $800, professional business sites at $1,500, and e-commerce from $2,500. All packages include mobile optimization, SEO setup, and 30 days of support.",
        },
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website in Zimbabwe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic websites (5-7 pages) take 2-3 weeks. Professional business sites (10-15 pages) take 3-4 weeks. E-commerce sites take 4-6 weeks. Custom web applications take 6-12 weeks. KuWeX Studios provides detailed timelines at the start of every project.",
        },
      },
      {
        "@type": "Question",
        "name": "How long does SEO take to show results in Zimbabwe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO typically shows initial results in 3-6 months for Zimbabwe-focused keywords. You will see improvements in Google rankings, organic traffic, and enquiries. Competitive keywords may take 6-12 months. KuWeX Studios provides monthly reports showing progress in rankings, traffic, and conversions.",
        },
      },
      {
        "@type": "Question",
        "name": "How much should I budget for Google Ads in Zimbabwe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum recommended budget for Google Ads in Zimbabwe is $300-500 per month. This allows for meaningful testing and optimisation. Most KuWeX Studios clients see positive ROI at $500-1,000 per month. We manage campaigns, write ads, optimise for conversions, and provide detailed reporting.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you work with businesses outside of Harare?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. KuWeX Studios works with businesses across all of Zimbabwe, including Bulawayo, Gweru, Mutare, Victoria Falls, and smaller towns. All project work is delivered remotely via WhatsApp, email, and video call. There are no travel fees and no geographical limitations on the quality of service.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you offer payment plans for website development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. KuWeX Studios offers flexible payment options including 50% deposit and 50% on completion (standard), or 3-month payment plans for projects over $2,000. We accept bank transfer (CABS, CBZ, Stanbic), EcoCash, Innbucks, USD cash, and international payments via PayPal or Wise.",
        },
      },
      {
        "@type": "Question",
        "name": "What technology do you use to build websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KuWeX Studios uses modern, cutting-edge technology including Next.js 14 (React framework), TypeScript, Tailwind CSS, and deploys on global CDN infrastructure (Vercel). This ensures your website is fast, secure, mobile-optimised, and ranks well on Google. Unlike WordPress sites, our sites load in under 2 seconds globally.",
        },
      },
      {
        "@type": "Question",
        "name": "Can you redesign my existing website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. KuWeX Studios specialises in website redesigns and migrations. We audit your current site, preserve your SEO rankings, improve design and user experience, migrate all content, set up proper redirects, and ensure zero downtime during the transition. Website redesigns start at $1,200.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${BASE}/faq` },
    ],
  },
];

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
