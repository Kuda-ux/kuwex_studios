import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Our Work & Impact | KuWeX Studios Zimbabwe",
  description:
    "Explore real projects by KuWeX Studios — Zimbabwe's top digital agency. See live websites we've built for tourism, hospitality, construction, engineering, and tech businesses. Real work, real results.",
  keywords: [
    "KuWeX Studios portfolio",
    "web design portfolio Zimbabwe",
    "website projects Zimbabwe",
    "digital agency work Harare",
    "Zimbabwe web design examples",
    "best websites Zimbabwe",
    "KuWeX projects",
    "web development Zimbabwe portfolio",
  ],
  openGraph: {
    title: "Our Work & Impact — KuWeX Studios Portfolio",
    description:
      "See the real websites and digital brands KuWeX Studios has built for businesses across Zimbabwe. Tourism, hospitality, construction, engineering, tech — real projects, live results.",
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
