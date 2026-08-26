import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Professional Web Design & Development Zimbabwe | KuWeX Studios" },
  description: "Zimbabwe's #1 web design company. We build fast, responsive, SEO-optimized websites for businesses in Harare and across Zimbabwe. Custom web development, e-commerce, and web applications. Get a free quote today.",
  keywords: [
    "web design Zimbabwe",
    "website developers Zimbabwe",
    "web development Harare",
    "affordable website design Zimbabwe",
    "best company to build business website Zimbabwe",
    "website design Harare price",
    "responsive web design Zimbabwe",
    "e-commerce website Zimbabwe",
    "custom website development Harare",
  ],
  openGraph: {
    title: "Professional Web Design & Development in Zimbabwe | KuWeX Studios",
    description: "Zimbabwe's leading web design company. Custom, fast, SEO-ready websites for businesses across Harare and Zimbabwe. From $499.",
    url: "https://kuwexstudios.co.zw/services/web-design",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/web-design",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/web-design`,
    "name": "Web Design & Development Zimbabwe",
    "serviceType": "Web Design",
    "description": "Custom, mobile-first websites for Zimbabwe businesses. Fast, SEO-optimised, and built to convert visitors into customers. From business websites to e-commerce and custom web applications.",
    "url": `${BASE}/services/web-design`,
    "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
    "areaServed": { "@type": "Country", "name": "Zimbabwe" },
    "offers": { "@type": "Offer", "priceRange": "$800 - $5000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": "Web Design & Development", "item": `${BASE}/services/web-design` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a website cost in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Website costs in Zimbabwe range from $800 for a basic business website to $5,000+ for complex e-commerce or custom web applications. At KuWeX Studios, basic websites start at $800, professional business sites at $1,500, e-commerce from $2,500, and custom web applications from $3,000. All packages include mobile optimization, SEO setup, SSL, CDN, and 30 days support." }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Basic websites (5-7 pages) take 2-3 weeks. Professional business sites (10-15 pages) take 3-4 weeks. E-commerce sites take 4-6 weeks. Custom web applications take 6-12 weeks. KuWeX Studios provides detailed timelines during consultation." }
      },
      {
        "@type": "Question",
        "name": "What technology does KuWeX Studios use to build websites?",
        "acceptedAnswer": { "@type": "Answer", "text": "We use Next.js 14 (React framework), TypeScript, Tailwind CSS, and deploy on global CDN networks (Vercel). This ensures your website is fast, secure, mobile-optimized, and ranks well on Google. Unlike WordPress sites, our sites load in under 2 seconds globally." }
      },
      {
        "@type": "Question",
        "name": "Do you offer website maintenance and support in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. All websites include 30 days of free post-launch support. After that, we offer monthly maintenance packages starting at $50/month including content updates, security monitoring, backups, performance optimization, and technical support." }
      },
      {
        "@type": "Question",
        "name": "Can you redesign my existing website?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We specialize in website redesigns and migrations. We audit your current site, preserve SEO rankings, improve design and user experience, migrate content, set up proper redirects, and ensure zero downtime. Redesigns start at $1,200." }
      },
      {
        "@type": "Question",
        "name": "Do you build e-commerce websites in Zimbabwe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. We build e-commerce websites with product catalogs, shopping carts, checkout systems, and payment integration including EcoCash, Paynow, and international gateways. E-commerce sites start at $2,500 and take 4-6 weeks to build." }
      },
    ],
  },
];

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
