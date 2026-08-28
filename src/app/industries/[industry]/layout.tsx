import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/lib/industries";

const BASE = "https://kuwexstudios.co.zw";

export async function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { industry: string };
}): Promise<Metadata> {
  const data = industries.find((i) => i.slug === params.industry);
  if (!data) return {};

  const url = `${BASE}/industries/${data.slug}`;

  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    keywords: data.keywords,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      type: "website",
      images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: data.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      creator: "@kuwexstudios",
      site: "@kuwexstudios",
      images: [`${BASE}/logo.jpg`],
    },
    alternates: { canonical: url },
  };
}

export default function IndustryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { industry: string };
}) {
  const data = industries.find((i) => i.slug === params.industry);
  if (!data) notFound();

  const url = `${BASE}/industries/${data.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": url,
      "name": data.metaTitle,
      "serviceType": data.name,
      "description": data.metaDescription,
      url,
      "provider": { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "KuWeX Studios" },
      "areaServed": { "@type": "Country", "name": "Zimbabwe" },
      "offers": { "@type": "Offer", "priceRange": "$1,500 - $10,000", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries` },
        { "@type": "ListItem", position: 3, name: data.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
