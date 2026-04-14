import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Agency & Web Design in Bulawayo | KuWeX Studios",
  description: "Professional digital marketing and web design services for businesses in Bulawayo, Zimbabwe. KuWeX Studios delivers SEO, social media marketing, Google Ads, branding, and custom websites. Contact us for a free quote.",
  keywords: [
    "digital marketing Bulawayo",
    "web design Bulawayo",
    "SEO services Bulawayo",
    "website developers Bulawayo",
    "branding agency Bulawayo",
    "social media marketing Bulawayo",
    "web development Bulawayo Zimbabwe",
  ],
  openGraph: {
    title: "Digital Marketing & Web Design Bulawayo | KuWeX Studios",
    description: "Professional digital agency serving Bulawayo businesses. Web design, SEO, branding & social media marketing.",
    url: "https://kuwexstudios.co.zw/locations/bulawayo",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/locations/bulawayo",
  },
};

export default function BulawayoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
