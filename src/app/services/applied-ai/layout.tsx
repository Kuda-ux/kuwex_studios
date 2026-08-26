import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Applied AI & Business Automation Zimbabwe | AI Solutions for Corporates",
  description:
    "Transform your business with AI in Zimbabwe. We deploy AI chatbots, workflow automation, predictive analytics, document intelligence, and customer engagement systems. From $3,000. Free AI readiness audit.",
  keywords: [
    "AI Zimbabwe",
    "AI automation Zimbabwe",
    "business automation Zimbabwe",
    "AI chatbot Zimbabwe",
    "WhatsApp AI bot Zimbabwe",
    "AI integration Zimbabwe",
    "artificial intelligence Zimbabwe",
    "AI solutions Africa",
    "business process automation Zimbabwe",
    "AI customer engagement Zimbabwe",
    "AI readiness audit Zimbabwe",
    "machine learning Zimbabwe",
    "AI transformation Zimbabwe",
    "chatbot development Zimbabwe",
    "workflow automation Zimbabwe",
    "AI marketing automation Zimbabwe",
    "predictive analytics Zimbabwe",
    "document OCR Zimbabwe",
    "AI voice assistant Zimbabwe",
    "Econet AI Zimbabwe",
  ],
  alternates: {
    canonical: `${BASE}/services/applied-ai`,
  },
  openGraph: {
    title: "Applied AI & Business Automation Zimbabwe | KuWeX Studios",
    description:
      "Transform corporate operations with AI chatbots, workflow automation, predictive analytics, and customer engagement systems. From $3,000. Free AI readiness audit.",
    url: `${BASE}/services/applied-ai`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied AI & Business Automation Zimbabwe | KuWeX Studios",
    description:
      "AI chatbots, workflow automation, predictive analytics, and customer engagement for Zimbabwean businesses. From $3,000.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/applied-ai`,
    "name": "Applied AI & Business Automation Zimbabwe",
    "serviceType": "AI & Business Automation",
    "description": "Transforming corporate operations in Zimbabwe through intelligent workflows, automated customer engagement, and custom AI systems. AI chatbots, workflow automation, predictive analytics, document intelligence, and AI marketing automation.",
    "url": `${BASE}/services/applied-ai`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$3000 - $50000+", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Applied AI & Business Automation", "item": `${BASE}/services/applied-ai` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does AI implementation cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "AI implementation in Zimbabwe costs from $3,000 for a pilot project (chatbot or single automation) to $10,000+ for full AI transformation with multiple use cases. At KuWeX Studios, AI pilot projects start at $3,000, AI transformation packages from $10,000, and enterprise AI systems are custom-quoted. We always start with a pilot so you see ROI before scaling." }
      },
      {
        "@type": "Question",
        "name": "What AI solutions does KuWeX Studios deploy in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "We deploy AI customer support agents (WhatsApp, web, Messenger chatbots), business workflow automation (document processing, approvals, reporting), AI marketing automation (email, WhatsApp, SMS sequences), document intelligence & OCR, AI analytics & predictive models (sales forecasting, churn prediction), and AI voice & call automation. All solutions integrate with your existing systems." }
      },
      {
        "@type": "Question",
        "name": "Can AI chatbots work on WhatsApp in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. We build AI chatbots that deploy on WhatsApp Business API, handling customer queries 24/7, qualifying leads, booking appointments, processing orders, and providing support — in English, Shona, and Ndebele. WhatsApp is Zimbabwe's most-used messaging platform, making it the #1 channel for AI customer engagement." }
      },
      {
        "@type": "Question",
        "name": "How long does it take to implement AI automation in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "An AI pilot project takes 2-4 weeks. Full AI transformation with 3-6 use cases takes 2-4 months. Enterprise AI systems take 4-8 months. KuWeX Studios uses a pilot-first approach — you see working AI within weeks, measure ROI, then scale what works." }
      },
      {
        "@type": "Question",
        "name": "Is AI safe for my business data in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. All AI systems we build are designed with data privacy and security as priorities. Your data is encrypted, never used to train public models, and complies with Zimbabwe's Data Protection Act. We can deploy AI on private infrastructure or use enterprise AI APIs with strict data usage policies." }
      },
      {
        "@type": "Question",
        "name": "How is AI transforming businesses in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "AI is transforming Zimbabwe through Econet's Gemini AI launch, the National AI Strategy (2026-2030), and Cassava's GPU cloud infrastructure. Businesses adopting AI for customer service, marketing automation, and data analysis are seeing 65% cost reductions, 3x faster response times, and 80% less manual work. KuWeX Studios helps businesses become AI-ready with practical, ROI-focused implementations." }
      },
      {
        "@type": "Question",
        "name": "What is an AI readiness audit?",
        "acceptedAnswer": { "@type": "Answer", "text": "An AI readiness audit assesses your current systems, data quality, workflows, and team capabilities to identify the best AI automation opportunities. KuWeX Studios provides free AI readiness audits that include a prioritized list of automation use cases, ROI projections, and a recommended implementation roadmap. Book yours at info@kuwexstudios.co.zw or +263 719 066 891." }
      },
    ],
  },
];

export default function AppliedAILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
