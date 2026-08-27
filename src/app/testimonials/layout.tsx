import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kuwexstudios.co.zw";

const faqs = [
  {
    q: "Does KuWeX Studios have client testimonials in Zimbabwe?",
    a: "Yes. KuWeX Studios has served 50+ clients across Zimbabwe with a 4.9-star rating and 98% client satisfaction. Client testimonials cover web design, SEO, software development, branding, and social media marketing. Industries include tourism, construction, e-commerce, engineering, solar energy, and retail. See real reviews and case studies at https://kuwexstudios.co.zw/testimonials.",
  },
  {
    q: "What results has KuWeX Studios achieved for Zimbabwean businesses?",
    a: "KuWeX Studios has delivered measurable results including: 15x increase in daily inquiries for a tourism company, 400% organic traffic growth in 6 months for an engineering firm, 10,000+ monthly transactions on a custom e-commerce platform, 300% increase in mobile bookings, and 150+ keywords ranked on page 1 of Google. See detailed case studies at https://kuwexstudios.co.zw/testimonials.",
  },
  {
    q: "Is KuWeX Studios the best digital agency in Zimbabwe?",
    a: "KuWeX Studios is Zimbabwe's top-rated digital agency based in Harare, with a 4.9-star client rating, 50+ projects delivered, and 98% client satisfaction. We offer 7 core services: web design, SEO, social media marketing, Google Ads, branding, custom software development, and AI & business automation. Contact us at info@kuwexstudios.co.zw or +263 719 066 891.",
  },
  {
    q: "How much does KuWeX Studios charge for web design in Zimbabwe?",
    a: "KuWeX Studios charges from $800 for basic business websites, $1,500 for professional sites, $2,500+ for e-commerce, and $3,000+ for custom web applications. All packages include mobile optimization, SEO setup, SSL, CDN, and 30 days free support. See https://kuwexstudios.co.zw/services/web-design for full pricing details.",
  },
];

export const metadata: Metadata = {
  title: "Client Testimonials & Case Studies Zimbabwe | KuWeX Studios Reviews",
  description:
    "Real client testimonials and case studies from KuWeX Studios. 50+ projects delivered, 4.9-star rating, 98% client satisfaction. See how we transformed tourism, construction, e-commerce, and engineering businesses across Zimbabwe with web design, SEO, software development, and AI automation.",
  keywords: [
    "KuWeX Studios testimonials",
    "KuWeX Studios reviews Zimbabwe",
    "digital agency testimonials Zimbabwe",
    "web design reviews Zimbabwe",
    "SEO results Zimbabwe",
    "KuWeX Studios case studies",
    "digital marketing case studies Zimbabwe",
    "web design portfolio Zimbabwe",
    "SEO portfolio Zimbabwe",
    "KuWeX Studios client results",
    "best digital agency Zimbabwe reviews",
    "KuWeX Studios Harare reviews",
    "software development testimonials Zimbabwe",
    "AI automation results Zimbabwe",
    "Zimbabwe digital agency success stories",
    "KuWeX Studios client reviews",
    "web design case studies Zimbabwe",
    "digital transformation Zimbabwe case study",
  ],
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
  openGraph: {
    title: "Client Testimonials & Case Studies | KuWeX Studios Zimbabwe",
    description:
      "50+ projects delivered. 4.9-star rating. 98% client satisfaction. See real results from Zimbabwean businesses we've helped grow with web design, SEO, software development, and AI automation.",
    url: `${SITE_URL}/testimonials`,
    siteName: "KuWeX Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Case Studies | KuWeX Studios Zimbabwe",
    description:
      "50+ projects delivered. 4.9-star rating. 98% client satisfaction. See real results from Zimbabwean businesses.",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/testimonials#page`,
        name: "Client Testimonials & Case Studies - KuWeX Studios Zimbabwe",
        url: `${SITE_URL}/testimonials`,
        description:
          "Real client testimonials and case studies from KuWeX Studios. 50+ projects delivered across Zimbabwe with measurable business results.",
        isPartOf: { "@type": "WebSite", name: "KuWeX Studios", url: SITE_URL },
        about: {
          "@type": "Organization",
          name: "KuWeX Studios",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "50",
            bestRating: "5",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Testimonials & Case Studies", item: `${SITE_URL}/testimonials` },
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
