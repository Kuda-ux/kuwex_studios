import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Portfolio — 11 Live Projects | KuWeX Studios Zimbabwe" },
  description:
    "Explore 11 real projects by KuWeX Studios — Zimbabwe's leading digital agency. Live websites for solar companies, lodges, colleges, NGOs, construction, health & wellness, and more. Real work, real results.",
  keywords: [
    "KuWeX Studios portfolio",
    "web design portfolio Zimbabwe",
    "website projects Zimbabwe",
    "digital agency work Harare",
    "Zimbabwe web design examples",
    "best websites Zimbabwe",
    "KuWeX projects",
    "web development Zimbabwe portfolio",
    "branding Zimbabwe",
    "SEO Zimbabwe",
    "digital marketing Zimbabwe",
  ],
  openGraph: {
    title: "11 Live Projects — KuWeX Studios Portfolio",
    description:
      "Solar companies, luxury lodges, beauty colleges, NGOs, construction firms — see how KuWeX Studios has transformed businesses across Zimbabwe with world-class digital solutions.",
    url: "https://kuwexstudios.co.zw/portfolio",
    type: "website",
    images: [
      {
        url: "https://kuwexstudios.co.zw/logo.jpg",
        width: 1200,
        height: 630,
        alt: "KuWeX Studios Portfolio — Real Work, Real Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Impact — KuWeX Studios Portfolio",
    description:
      "Real projects. Real results. See what KuWeX Studios has built for Zimbabwe businesses.",
    creator: "@kuwexstudios",
    images: ["https://kuwexstudios.co.zw/logo.jpg"],
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
