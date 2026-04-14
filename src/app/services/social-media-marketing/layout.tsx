import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing Zimbabwe | Facebook, Instagram & LinkedIn Management",
  description: "Grow your brand on social media. KuWeX Studios offers expert social media marketing services in Zimbabwe — content creation, community management, paid ads, and influencer marketing for businesses in Harare.",
  keywords: [
    "social media marketing Zimbabwe",
    "Facebook marketing Zimbabwe",
    "Instagram marketing Harare",
    "LinkedIn marketing Zimbabwe",
    "social media management Zimbabwe",
    "social media agency Harare",
    "digital marketing services Zimbabwe",
  ],
  openGraph: {
    title: "Social Media Marketing Zimbabwe | KuWeX Studios",
    description: "Expert social media marketing for Zimbabwe businesses. Content creation, paid ads, community management & influencer marketing.",
    url: "https://kuwexstudios.co.zw/services/social-media-marketing",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/social-media-marketing",
  },
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
