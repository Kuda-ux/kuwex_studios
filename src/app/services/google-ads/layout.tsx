import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Ads Management Zimbabwe | PPC Advertising Agency Harare",
  description: "Maximize your ROI with Google Ads. KuWeX Studios manages high-performing PPC campaigns for Zimbabwe businesses — Google Search Ads, Display Ads, YouTube Ads, and remarketing. Get leads today.",
  keywords: [
    "Google Ads Zimbabwe",
    "PPC advertising Zimbabwe",
    "Google Ads management Harare",
    "pay per click Zimbabwe",
    "Google advertising agency Zimbabwe",
    "search engine marketing Zimbabwe",
    "digital advertising Harare",
  ],
  openGraph: {
    title: "Google Ads Management Zimbabwe | KuWeX Studios",
    description: "High-ROI Google Ads campaigns for Zimbabwe businesses. Search, Display, YouTube & Remarketing ads managed by certified experts.",
    url: "https://kuwexstudios.co.zw/services/google-ads",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/google-ads",
  },
};

export default function GoogleAdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
