import type { Metadata } from "next";

const BASE = "https://kuwexstudios.co.zw";

export const metadata: Metadata = {
  title: { absolute: "Cookie Policy | KuWeX Studios Zimbabwe" },
  description: "KuWeX Studios Cookie Policy — how we use cookies on our website to improve user experience and measure performance. Manage your cookie preferences here.",
  keywords: [
    "KuWeX Studios cookie policy",
    "cookie consent Zimbabwe",
    "website cookies digital agency",
    "KuWeX Studios cookies",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cookie Policy | KuWeX Studios Zimbabwe",
    description: "How KuWeX Studios uses cookies to improve your experience on kuwexstudios.co.zw.",
    url: `${BASE}/cookies`,
    type: "website",
    siteName: "KuWeX Studios",
    images: [{ url: `${BASE}/logo.jpg`, width: 1200, height: 630, alt: "KuWeX Studios Cookie Policy" }],
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | KuWeX Studios Zimbabwe",
    description: "KuWeX Studios cookie policy — how we use cookies on our website.",
  },
  alternates: { canonical: `${BASE}/cookies` },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
