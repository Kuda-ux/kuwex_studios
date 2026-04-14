import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "#1 Digital Marketing Agency in Zimbabwe | Web Design & SEO | KuWeX Studios",
  description: "KuWeX Studios is Zimbabwe's leading digital marketing agency and web design company. We serve businesses nationwide with SEO services, social media marketing, Google Ads, branding, and custom web development. From startups to enterprises — we deliver results.",
  keywords: [
    "digital marketing agency Zimbabwe",
    "web design Zimbabwe",
    "SEO services Zimbabwe",
    "best digital agency Zimbabwe",
    "website developers Zimbabwe",
    "branding agency Zimbabwe",
    "affordable website design for SMEs in Zimbabwe",
    "digital marketing services for NGOs Zimbabwe",
    "SEO company for small businesses Zimbabwe",
  ],
  openGraph: {
    title: "#1 Digital Marketing Agency in Zimbabwe | KuWeX Studios",
    description: "Zimbabwe's top-rated digital agency. Web design, SEO, branding, social media & Google Ads for businesses nationwide.",
    url: "https://kuwexstudios.co.zw/locations/zimbabwe",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/zimbabwe",
  },
};

export default function ZimbabweLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
