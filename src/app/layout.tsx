import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

const SITE_URL = 'https://kuwexstudios.co.zw';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KuWeX Studios | #1 Digital Marketing Agency & Web Design Company in Zimbabwe",
    template: "%s | KuWeX Studios Zimbabwe"
  },
  description: "Zimbabwe's leading digital marketing agency & web design company. We deliver SEO services, branding, social media marketing, and custom website development for businesses in Harare and across Zimbabwe. Get a free quote today.",
  keywords: [
    "digital marketing agency Zimbabwe",
    "web design Zimbabwe",
    "SEO services Zimbabwe",
    "best digital agency Harare",
    "website developers Zimbabwe",
    "branding agency Zimbabwe",
    "social media marketing Zimbabwe",
    "Google Ads Zimbabwe",
    "affordable website design Zimbabwe",
    "web development Harare",
    "SEO company Zimbabwe",
    "digital marketing services Harare",
    "KuWeX Studios",
    "website design Harare",
    "app development Zimbabwe",
  ],
  authors: [{ name: "KuWeX Studios" }],
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
    locale: 'en_ZW',
    url: SITE_URL,
    siteName: 'KuWeX Studios',
    title: 'KuWeX Studios | #1 Digital Marketing Agency & Web Design in Zimbabwe',
    description: 'Zimbabwe\'s leading digital agency. Web design, SEO, branding, social media marketing & Google Ads. Trusted by businesses across Harare and Zimbabwe.',
    images: [
      {
        url: `${SITE_URL}/logo.jpg`,
        width: 1200,
        height: 630,
        alt: 'KuWeX Studios - #1 Digital Marketing Agency in Zimbabwe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KuWeX Studios | #1 Digital Agency Zimbabwe',
    description: 'Zimbabwe\'s top-rated digital marketing agency. Web design, SEO, branding & social media marketing for businesses in Harare and beyond.',
    creator: '@kuwexstudios',
    images: [`${SITE_URL}/logo.jpg`],
  },
  verification: {
    google: 'googlecb9e0a28b7d8003e',
  },
  icons: {
    icon: [
      { url: '/logo.jpg', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [{ url: '/logo.jpg' }],
    shortcut: '/logo.jpg',
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    'geo.region': 'ZW-HA',
    'geo.placename': 'Harare',
    'geo.position': '-17.8292;31.0522',
    'ICBM': '-17.8292, 31.0522',
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kuwexstudios.co.zw/#localbusiness",
    "name": "KuWeX Studios",
    "alternateName": "KuWeX Studios Zimbabwe",
    "description": "Zimbabwe's leading digital marketing agency and web design company. We deliver SEO, branding, social media marketing, Google Ads, and custom web development for businesses in Harare and across Zimbabwe.",
    "url": "https://kuwexstudios.co.zw",
    "logo": "https://kuwexstudios.co.zw/logo.jpg",
    "image": "https://kuwexstudios.co.zw/logo.jpg",
    "telephone": "+263719066891",
    "email": "info@kuwexstudios.co.zw",
    "priceRange": "$$",
    "currenciesAccepted": "USD, ZWL",
    "paymentAccepted": "Cash, Bank Transfer, EcoCash, Mobile Money",
    "areaServed": [
      { "@type": "Country", "name": "Zimbabwe" },
      { "@type": "City", "name": "Harare" },
      { "@type": "City", "name": "Bulawayo" },
      { "@type": "City", "name": "Gweru" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Harare",
      "addressLocality": "Harare",
      "addressRegion": "Harare Province",
      "postalCode": "00263",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-17.8292",
      "longitude": "31.0522"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/kuwexstudios",
      "https://twitter.com/kuwexstudios",
      "https://instagram.com/kuwexstudios",
      "https://linkedin.com/company/kuwexstudios"
    ],
    "founder": [
      { "@type": "Person", "name": "Kuda", "jobTitle": "Lead Developer & Owner" },
      { "@type": "Person", "name": "Weston", "jobTitle": "Creative Director & Co-Founder" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & Development Zimbabwe", "url": "https://kuwexstudios.co.zw/services/web-design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services Zimbabwe", "url": "https://kuwexstudios.co.zw/services/seo-services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing Zimbabwe", "url": "https://kuwexstudios.co.zw/services/social-media-marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management Zimbabwe", "url": "https://kuwexstudios.co.zw/services/google-ads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Design Zimbabwe", "url": "https://kuwexstudios.co.zw/services/branding" } }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kuwexstudios.co.zw/#website",
    "name": "KuWeX Studios",
    "url": "https://kuwexstudios.co.zw",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kuwexstudios.co.zw/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kuwexstudios.co.zw/#organization",
    "name": "KuWeX Studios",
    "url": "https://kuwexstudios.co.zw",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kuwexstudios.co.zw/logo.jpg",
      "width": 512,
      "height": 512
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+263719066891",
        "contactType": "sales",
        "areaServed": "ZW",
        "availableLanguage": ["en", "sn"]
      },
      {
        "@type": "ContactPoint",
        "email": "info@kuwexstudios.co.zw",
        "contactType": "customer service",
        "areaServed": "ZW",
        "availableLanguage": ["en", "sn"]
      }
    ]
  }
];

import { ThemeProvider } from "./providers";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F6PCVXPBT1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F6PCVXPBT1');
            `,
          }}
        />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#00E5FF" />
        {/* RSS Feed for news aggregators, Google News, Opera Mini */}
        <link rel="alternate" type="application/rss+xml" title="KuWeX Studios Blog" href="https://kuwexstudios.co.zw/rss.xml" />
      </head>
      <body className={cn("min-h-screen antialiased")} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WhatsAppButton />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
