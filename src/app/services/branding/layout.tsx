import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding & Design Services Zimbabwe | Logo Design & Brand Identity",
  description: "Build a powerful brand identity. KuWeX Studios offers professional branding services in Zimbabwe — logo design, brand strategy, visual identity, packaging design, and brand guidelines for businesses in Harare.",
  keywords: [
    "branding agency Zimbabwe",
    "logo design Zimbabwe",
    "brand identity Harare",
    "graphic design Zimbabwe",
    "branding services Zimbabwe",
    "brand strategy Zimbabwe",
    "visual identity design Harare",
    "packaging design Zimbabwe",
  ],
  openGraph: {
    title: "Branding & Design Services Zimbabwe | KuWeX Studios",
    description: "Professional branding & design for Zimbabwe businesses. Logo design, brand strategy, visual identity & packaging design.",
    url: "https://kuwexstudios.co.zw/services/branding",
  },
  alternates: {
    canonical: "https://kuwexstudios.co.zw/services/branding",
  },
};

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
