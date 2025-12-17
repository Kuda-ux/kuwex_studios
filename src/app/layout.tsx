import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL('https://kuwexstudios.com'),
  title: {
    default: "KuWeX Studios | Digital Innovation Agency Zimbabwe",
    template: "%s | KuWeX Studios"
  },
  description: "Premier digital agency in Zimbabwe offering Web Development, Branding, and Digital Marketing. We build world-class apps and viral marketing campaigns for African businesses.",
  keywords: ["Web Development Zimbabwe", "Digital Marketing Agency Harare", "App Development Africa", "Branding Agency Zimbabwe", "SEO Services Harare", "Kuwex Studios", "Software Development"],
  authors: [{ name: "KuWeX Studios Team" }],
  creator: "KuWeX Studios",
  publisher: "KuWeX Studios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kuwexstudios.com',
    siteName: 'KuWeX Studios',
    title: 'KuWeX Studios | Building Africa\'s Digital Future',
    description: 'Premier digital agency in Zimbabwe offering Web Development, Branding, and Digital Marketing.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KuWeX Studios Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KuWeX Studios | Digital Innovation',
    description: 'Building Africa\'s Digital Future with world-class web & mobile solutions.',
    creator: '@kuwexstudios',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID',
  },
  alternates: {
    canonical: 'https://kuwexstudios.com',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KuWeX Studios",
  "url": "https://kuwexstudios.com",
  "logo": "https://kuwexstudios.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+263-77-123-4567",
    "contactType": "customer service",
    "areaServed": ["ZW", "AF"],
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://facebook.com/kuwexstudios",
    "https://twitter.com/kuwexstudios",
    "https://instagram.com/kuwexstudios",
    "https://linkedin.com/company/kuwexstudios"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Harare CBD",
    "addressLocality": "Harare",
    "addressRegion": "Harare",
    "postalCode": "00263",
    "addressCountry": "ZW"
  }
};

import { ThemeProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased")} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {/* Google Analytics Placeholder */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
