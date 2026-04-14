import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Web Design & Development Zimbabwe | Custom Websites from $499",
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

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
