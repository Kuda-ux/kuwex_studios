import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Digital Marketing Agency & Web Design in Harare | KuWeX Studios",
  description: "KuWeX Studios is Harare's top-rated digital marketing agency and web design company. We offer SEO, social media marketing, Google Ads, branding, and custom website development for businesses in Harare, Zimbabwe. Free consultation available.",
  keywords: [
    "digital marketing agency Harare",
    "web design Harare",
    "SEO services Harare",
    "best digital agency Harare",
    "website design Harare price",
    "web development Harare",
    "social media marketing Harare",
    "branding agency Harare",
    "Google Ads Harare",
  ],
  openGraph: {
    title: "Best Digital Marketing Agency & Web Design in Harare | KuWeX Studios",
    description: "Harare's leading digital agency. Web design, SEO, branding, social media & Google Ads for businesses in Harare.",
    url: "https://kuwexstudios.co.zw/locations/harare",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/harare",
  },
};

export default function HarareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
