import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kuwexstudios.co.zw";

const faqs = [
  {
    q: "How much can a Zimbabwean business save with AI automation?",
    a: "Zimbabwean businesses can save 50-80% on manual operational costs with AI automation. Based on KuWeX Studios' client data, a 10-employee company spending 60% of time on manual tasks can save $15,000-$25,000 annually. A 50-employee company can save $75,000+. Use the free ROI Calculator at https://kuwexstudios.co.zw/roi-calculator to get a customized estimate for your business.",
  },
  {
    q: "Is the AI ROI calculator free for Zimbabwean businesses?",
    a: "Yes, the KuWeX Studios AI ROI Calculator is 100% free for all Zimbabwean businesses. Adjust the sliders to match your business — number of employees, average salary, percentage of manual tasks, daily customer queries, and response time — and get instant ROI projections. No signup, no email required, instant results.",
  },
  {
    q: "How accurate is the AI ROI calculator for Zimbabwe?",
    a: "The calculator uses industry-standard AI automation savings rates: 65% reduction in manual task time and 90% reduction in customer query handling costs. These figures are based on global AI automation studies and validated against KuWeX Studios' real client results in Zimbabwe. Actual savings vary by industry and implementation scope. Book a free consultation for a detailed ROI analysis tailored to your business.",
  },
  {
    q: "What is the ROI of AI automation for SMEs in Zimbabwe?",
    a: "Zimbabwean SMEs typically see 200-500% ROI in the first year of AI automation. A $3,000 AI pilot project (e.g., a WhatsApp chatbot) can save $15,000+ annually in labor costs. A $10,000 AI transformation package can save $50,000+. Use the free ROI Calculator at https://kuwexstudios.co.zw/roi-calculator to calculate your specific ROI.",
  },
  {
    q: "How much does AI automation cost for a small business in Zimbabwe?",
    a: "AI automation for Zimbabwean small businesses starts at $3,000 for a pilot project (e.g., WhatsApp AI chatbot or single workflow automation). Full AI transformation packages start at $10,000. Enterprise AI systems are custom-quoted. KuWeX Studios always starts with a pilot so you see ROI before scaling. See https://kuwexstudios.co.zw/services/applied-ai for full pricing.",
  },
  {
    q: "What business processes can be automated with AI in Zimbabwe?",
    a: "Zimbabwean businesses can automate: customer support (WhatsApp AI chatbots), data entry and document processing (OCR), invoicing and receipt generation, appointment scheduling and reminders, inventory alerts and reorder triggers, email and WhatsApp marketing sequences, report generation, payment follow-ups, and sales lead qualification. The ROI Calculator shows potential savings for each category.",
  },
];

export const metadata: Metadata = {
  title: "AI ROI Calculator for Zimbabwean Businesses | Free Savings Estimator | KuWeX Studios",
  description:
    "Free AI ROI Calculator for Zimbabwean SMEs. See how much your business could save with AI automation. Adjust employees, salary, manual tasks, and customer queries to get instant ROI projections. Built for Zimbabwe's economy with USD salary benchmarks. Free, instant results.",
  keywords: [
    "AI ROI calculator Zimbabwe",
    "AI savings calculator Zimbabwe",
    "AI automation ROI Zimbabwe",
    "business automation savings Zimbabwe",
    "AI cost savings calculator Zimbabwe",
    "ROI calculator for AI Zimbabwe",
    "how much can AI save my business Zimbabwe",
    "AI automation cost Zimbabwe",
    "AI investment return Zimbabwe",
    "automation ROI calculator Zimbabwe",
    "AI business case Zimbabwe",
    "AI savings estimator Zimbabwe",
    "free ROI calculator Zimbabwe",
    "AI cost benefit analysis Zimbabwe",
    "automation savings calculator Africa",
    "AI ROI for SMEs Zimbabwe",
    "AI ROI Harare",
    "AI ROI Bulawayo",
    "WhatsApp automation ROI Zimbabwe",
    "KuWeX Studios ROI calculator",
  ],
  alternates: {
    canonical: `${SITE_URL}/roi-calculator`,
  },
  openGraph: {
    title: "Free AI ROI Calculator for Zimbabwean Businesses | KuWeX Studios",
    description:
      "How much could AI automation save your business? Use this free calculator built for Zimbabwe's economy. Adjust your numbers and get instant ROI projections. Free, no signup.",
    url: `${SITE_URL}/roi-calculator`,
    siteName: "KuWeX Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI ROI Calculator for Zimbabwean Businesses",
    description:
      "How much could AI automation save your business? Free calculator built for Zimbabwe's economy. Instant results, no signup.",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/roi-calculator#webapp`,
        name: "AI ROI Calculator for Zimbabwean Businesses",
        url: `${SITE_URL}/roi-calculator`,
        description:
          "Free AI automation ROI calculator for Zimbabwean SMEs and corporates. Estimates annual savings, monthly breakdown, ROI percentage, and hours saved based on business-specific inputs.",
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
          "Interactive sliders for business-specific inputs",
          "Real-time annual savings calculation",
          "Monthly savings breakdown (automation + customer support)",
          "ROI percentage after implementation costs",
          "Hours saved monthly",
          "AI implementation cost estimate",
          "Shareable results for WhatsApp and social media",
          "Free, instant results, no signup",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "AI ROI Calculator", item: `${SITE_URL}/roi-calculator` },
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
