import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: "Custom Software Development Zimbabwe | Enterprise Software Solutions",
  description:
    "Scalable, secure custom software development for large corporates in Zimbabwe. We build ERPs, CRMs, fintech platforms, AI integrations, and enterprise systems that handle millions of transactions. From $5,000.",
  keywords: [
    "software development Zimbabwe",
    "custom software development Harare",
    "enterprise software Zimbabwe",
    "ERP development Zimbabwe",
    "CRM development Zimbabwe",
    "fintech software Zimbabwe",
    "AI integration Zimbabwe",
    "software company Zimbabwe",
    "software developers Zimbabwe",
    "business process automation Zimbabwe",
    "enterprise software Africa",
    "custom software Africa",
    "scalable software systems Zimbabwe",
    "cloud software Zimbabwe",
    "API development Zimbabwe",
    "microservices Zimbabwe",
    "DevOps Zimbabwe",
    "software engineering Zimbabwe",
    "mobile app development Zimbabwe",
    "digital transformation Zimbabwe",
  ],
  alternates: {
    canonical: `${BASE}/services/software-development`,
  },
  openGraph: {
    title: "Custom Software Development Zimbabwe | KuWeX Studios",
    description:
      "Scalable, secure enterprise software for Zimbabwe's largest corporates. ERPs, CRMs, fintech platforms, AI integrations. From $5,000.",
    url: `${BASE}/services/software-development`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Zimbabwe | KuWeX Studios",
    description:
      "Scalable, secure enterprise software for Zimbabwe's largest corporates. ERPs, CRMs, fintech platforms, AI integrations.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/software-development`,
    "name": "Custom Software Development Zimbabwe",
    "serviceType": "Software Development",
    "description": "Scalable, secure custom software development for large corporates in Zimbabwe. We build ERPs, CRMs, fintech platforms, AI integrations, and enterprise systems that handle millions of transactions.",
    "url": `${BASE}/services/software-development`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$5000 - $50000+", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Custom Software Development", "item": `${BASE}/services/software-development` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does custom software development cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Custom software development in Zimbabwe costs from $5,000 for an MVP to $50,000+ for large-scale enterprise systems. At KuWeX Studios, MVP development starts at $5,000, enterprise software (custom ERP/CRM/BPM) starts at $15,000, and large-scale systems with microservices and AI integration are custom-quoted. Pricing depends on complexity, integrations, and scale requirements." }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build custom software in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "An MVP takes 4-8 weeks. Full enterprise software typically takes 3-6 months. Large-scale systems with microservices architecture take 6-12 months. KuWeX Studios uses an agile methodology — you see working software within weeks, not months, and we iterate based on real user feedback." }
      },
      {
        "@type": "Question",
        "name": "What types of enterprise software does KuWeX Studios build?",
        "acceptedAnswer": { "@type": "Answer", "text": "We build custom ERPs (Enterprise Resource Planning), CRMs (Customer Relationship Management), business process automation systems, fintech and payment platforms, AI and machine learning integrations, multi-platform systems (web + mobile + API), inventory management systems, HR and payroll systems, procurement workflows, and government-grade secure platforms." }
      },
      {
        "@type": "Question",
        "name": "Do you build software that can scale to millions of users?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. We design software with cloud-native architecture, microservices, auto-scaling, and load balancing from day one. Our systems handle millions of transactions with sub-200ms API response times. We use AWS, Docker, Kubernetes, and proven scaling patterns trusted by companies like Netflix and Stripe." }
      },
      {
        "@type": "Question",
        "name": "Can you integrate AI into our existing software systems?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. KuWeX Studios integrates AI capabilities into existing systems including AI chatbots and virtual assistants, predictive analytics, document OCR and processing, sentiment analysis, recommendation engines, and anomaly detection. We work with OpenAI, Anthropic, and open-source LLMs to build AI features that deliver real business value." }
      },
      {
        "@type": "Question",
        "name": "Do you work with large corporates and government in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. KuWeX Studios builds enterprise software for large corporates, government departments, and NGOs in Zimbabwe. We understand compliance requirements, procurement processes, data protection regulations (Zimbabwe Data Protection Act), and enterprise security standards. We offer dedicated development teams, SLAs, and source code ownership for large-scale projects." }
      },
    ],
  },
];

export default function SoftwareDevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
