import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kuwexstudios.co.zw";

const faqs = [
  {
    q: "What is an AI readiness quiz for Zimbabwean businesses?",
    a: "The KuWeX Studios AI Readiness Quiz is a free 10-question assessment tool designed specifically for Zimbabwean SMEs and corporates. It evaluates your business across 10 categories — digital infrastructure, data management, customer communication, marketing, operations, AI awareness, automation, analytics, team readiness, and budget — then provides a score from 0 to 30 with personalized recommendations. The quiz takes 3-5 minutes and results are instant. Try it at https://kuwexstudios.co.zw/ai-readiness-quiz.",
  },
  {
    q: "How do I know if my Zimbabwean business is ready for AI?",
    a: "Your business is AI-ready if you have: a functional website or digital presence, a CRM or database for customer data, digital communication channels (WhatsApp Business, email), some form of digital marketing, team members open to learning new tools, and a budget for digital transformation. The KuWeX Studios AI Readiness Quiz scores these exact factors and tells you exactly where you stand. 70%+ score means you can deploy AI within weeks. Take the free quiz at https://kuwexstudios.co.zw/ai-readiness-quiz.",
  },
  {
    q: "Is the AI readiness quiz free for Zimbabwean SMEs?",
    a: "Yes, the KuWeX Studios AI Readiness Quiz is 100% free for all Zimbabwean businesses. You get instant results without signing up. You can optionally enter your email to receive a detailed PDF report with personalized AI adoption recommendations, ROI projections, and a step-by-step roadmap. No credit card, no commitment, no spam.",
  },
  {
    q: "How long does the AI readiness quiz take?",
    a: "The quiz takes 3-5 minutes to complete. There are 10 multiple-choice questions, each with 4 options. Results are calculated instantly and include a score breakdown by category, your AI readiness level, and recommended next steps. You can retake the quiz at any time.",
  },
  {
    q: "What score do I need to be considered AI-ready in Zimbabwe?",
    a: "The quiz scores from 0 to 30. A score of 23+ (75%) means you are an 'AI-Ready Leader' and can deploy enterprise AI within weeks. A score of 15+ (50%) means you are 'AI-Ready' and can implement AI chatbots and automation within months. A score of 8+ (25%) means you are an 'AI Beginner' — you can start with practical pilots. Below 8 means you should build digital foundations first (website, CRM, digital marketing) before AI adoption.",
  },
  {
    q: "Can small businesses in Zimbabwe benefit from AI automation?",
    a: "Absolutely. Zimbabwean SMEs that adopt AI report 65% reduction in manual work, 3x faster customer response times, and significant cost savings. Even a simple WhatsApp AI chatbot can handle 80% of customer queries automatically — 24/7, in English, Shona, and Ndebele. The KuWeX Studios AI Readiness Quiz will show you exactly which AI tools make sense for your business size and budget.",
  },
];

export const metadata: Metadata = {
  title: "AI Readiness Quiz for Zimbabwean Businesses | Free Assessment | KuWeX Studios",
  description:
    "Free AI Readiness Quiz for Zimbabwean SMEs and corporates. Answer 10 questions and get your AI Readiness Score instantly. See how your business compares and get personalized AI adoption recommendations. Takes 3 minutes, results are instant, no signup required.",
  keywords: [
    "AI readiness quiz Zimbabwe",
    "AI assessment tool Zimbabwe",
    "AI readiness test Zimbabwe",
    "free AI quiz Zimbabwe",
    "AI adoption Zimbabwe SME",
    "business AI readiness Zimbabwe",
    "AI readiness score Zimbabwe",
    "AI readiness check Zimbabwe",
    "how ready is my business for AI Zimbabwe",
    "AI automation assessment Zimbabwe",
    "AI quiz for SMEs Zimbabwe",
    "digital readiness quiz Zimbabwe",
    "AI maturity assessment Zimbabwe",
    "AI preparedness Zimbabwe",
    "Zimbabwe AI adoption tool",
    "AI readiness Harare",
    "AI readiness Bulawayo",
    "AI quiz for African businesses",
    "AI readiness for small business Zimbabwe",
    "KuWeX Studios AI quiz",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-readiness-quiz`,
  },
  openGraph: {
    title: "Free AI Readiness Quiz for Zimbabwean Businesses | KuWeX Studios",
    description:
      "Is your business ready for AI? Take this free 10-question quiz and get your AI Readiness Score instantly. Built for Zimbabwean SMEs. 3 minutes, instant results, no signup.",
    url: `${SITE_URL}/ai-readiness-quiz`,
    siteName: "KuWeX Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Readiness Quiz for Zimbabwean Businesses",
    description:
      "Is your business ready for AI? Take this free 10-question quiz and get your AI Readiness Score instantly. Built for Zimbabwean SMEs.",
  },
};

export default function AIReadinessQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/ai-readiness-quiz#webapp`,
        name: "AI Readiness Quiz for Zimbabwean Businesses",
        url: `${SITE_URL}/ai-readiness-quiz`,
        description:
          "Free AI readiness assessment tool for Zimbabwean SMEs and corporates. 10 questions, instant results, personalized recommendations.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free - no signup required",
        },
        provider: {
          "@type": "Organization",
          name: "KuWeX Studios",
          url: SITE_URL,
        },
        audience: {
          "@type": "Audience",
          audienceType: "Zimbabwean SMEs, entrepreneurs, and corporates",
        },
        featureList: [
          "10-question interactive quiz",
          "Instant AI readiness score (0-30)",
          "Score breakdown across 10 business categories",
          "Personalized AI adoption recommendations",
          "Email report option",
          "Shareable results for WhatsApp and social media",
          "Free, no signup required",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "AI Readiness Quiz", item: `${SITE_URL}/ai-readiness-quiz` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
