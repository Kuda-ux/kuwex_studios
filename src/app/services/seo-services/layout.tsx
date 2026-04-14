import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services Zimbabwe | Rank #1 on Google | KuWeX Studios",
  description: "Get found on Google. KuWeX Studios offers professional SEO services in Zimbabwe — keyword research, on-page optimization, local SEO, link building, and technical SEO for businesses in Harare and across Zimbabwe.",
  keywords: [
    "SEO services Zimbabwe",
    "SEO company Zimbabwe",
    "SEO agency Harare",
    "search engine optimization Zimbabwe",
    "local SEO Zimbabwe",
    "Google ranking Zimbabwe",
    "SEO company for small businesses Zimbabwe",
    "best SEO services Harare",
  ],
  openGraph: {
    title: "SEO Services Zimbabwe — Rank #1 on Google | KuWeX Studios",
    description: "Professional SEO services for businesses in Harare and Zimbabwe. Keyword research, on-page SEO, local SEO, and link building.",
    url: "https://kuwexstudios.co.zw/services/seo-services",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/seo-services",
  },
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
