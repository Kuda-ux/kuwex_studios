"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Youtube, Linkedin, Globe, ShoppingBag, Smartphone, Calendar, Clock, User, Brain, Calculator, Star, Plane, Home as HomeIcon, Mountain, Wheat, HeartPulse, ShoppingCart, HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake, Truck, UtensilsCrossed, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { industries } from "@/lib/industries";

// Custom X (formerly Twitter) logo SVG
const XLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const homeIconMap: Record<string, LucideIcon> = {
  Plane, Home: HomeIcon, Mountain, Wheat, HeartPulse, ShoppingCart,
  HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake,
  Truck, UtensilsCrossed,
};

// Platform icons — enhanced with gradient glows and brand colors
const platformIcons = [
  { icon: Instagram, name: "Instagram", color: "#E4405F", glow: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #E4405F, #FCAF45)" },
  { icon: Facebook, name: "Facebook", color: "#1877F2", glow: "#1877F2", gradient: "linear-gradient(135deg, #1877F2, #42A5F5)" },
  { icon: Youtube, name: "YouTube", color: "#FF0000", glow: "#FF0000", gradient: "linear-gradient(135deg, #FF0000, #FF5252)" },
  { icon: XLogo, name: "X", color: "#ffffff", glow: "#ffffff", gradient: "linear-gradient(135deg, #ffffff, #a0a0a0)" },
  { icon: Linkedin, name: "LinkedIn", color: "#0A66C2", glow: "#0A66C2", gradient: "linear-gradient(135deg, #0A66C2, #42A5F5)" },
  { icon: Globe, name: "Website", color: "#00E5FF", glow: "#00E5FF", gradient: "linear-gradient(135deg, #00E5FF, #0085FF)" },
  { icon: ShoppingBag, name: "E-commerce", color: "#FF9900", glow: "#FF9900", gradient: "linear-gradient(135deg, #FF9900, #FFC107)" },
  { icon: Smartphone, name: "Mobile", color: "#34D399", glow: "#34D399", gradient: "linear-gradient(135deg, #34D399, #10B981)" },
];

// X Business Style - Service Cards Data
const services = [
  {
    title: "Digital Branding & Creative Design",
    desc: "We craft bold, memorable, and timeless brand identities that command attention in a competitive market.",
    href: "/services/branding",
    visual: (
      <div className="relative h-52 bg-gradient-to-br from-[#0a1628] via-[#16181C] to-[#0a0a0a] rounded-xl p-5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 flex items-center justify-center backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kuwex-cyan/50 to-kuwex-blue/50 shadow-[0_0_30px_rgba(0,229,255,0.3)]" />
          </div>
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-kuwex-cyan/20 border border-kuwex-cyan/40 animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-kuwex-blue/20 border border-kuwex-blue/40 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black text-xs font-bold px-4 py-1.5 rounded-full w-fit shadow-[0_0_20px_rgba(0,229,255,0.3)]">Brand with KuWeX</div>
        </div>
      </div>
    )
  },
  {
    title: "Web & Mobile App Development",
    desc: "We build fast, secure, and beautiful digital products using modern frameworks and top-tier UX standards.",
    href: "/services/web-design",
    visual: (
      <div className="relative h-52 bg-gradient-to-br from-[#0a1628] via-[#16181C] to-[#0a0a0a] rounded-xl p-5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,133,255,0.08),transparent_60%)]" />
        <div className="relative">
          <div className="w-28 h-28 rounded-full border border-[#2F3336] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-kuwex-cyan/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue shadow-[0_0_20px_rgba(0,229,255,0.5)]" />
            </div>
          </div>
          <div className="absolute -top-1 right-0 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.3)]">Global</div>
          <div className="absolute bottom-0 -left-3 bg-[#16181C] border border-[#2F3336] text-[10px] text-gray-400 px-2 py-1 rounded-lg">Next.js</div>
        </div>
      </div>
    )
  },
  {
    title: "Custom Software Development",
    desc: "Scalable, secure enterprise software systems built for large corporates. ERPs, CRMs, fintech platforms, and AI-powered solutions.",
    href: "/services/software-development",
    visual: (
      <div className="relative h-52 bg-gradient-to-br from-[#0a1628] via-[#16181C] to-[#0a0a0a] rounded-xl p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="text-xs text-gray-500 mb-2 relative z-10">System Architecture</div>
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <div className="flex-1 h-1.5 bg-[#16181C] rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-kuwex-blue rounded-full" />
            <div className="flex-1 h-1.5 bg-[#16181C] rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-gradient-to-r from-kuwex-blue to-kuwex-cyan rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
            <div className="flex-1 h-1.5 bg-[#16181C] rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-gradient-to-r from-gray-600 to-kuwex-cyan rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between relative z-10">
          <span className="text-xs text-gray-600">Uptime</span>
          <span className="text-kuwex-cyan text-sm font-bold">99.9%</span>
        </div>
      </div>
    )
  },
  {
    title: "Digital Marketing",
    desc: "We help businesses grow using data-driven, AI-powered marketing strategies built for conversions and visibility.",
    href: "/services/seo-services",
    visual: (
      <div className="relative h-52 bg-gradient-to-br from-[#0a1628] via-[#16181C] to-[#0a0a0a] rounded-xl p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,229,255,0.06),transparent_60%)]" />
        <div className="text-xs text-gray-500 mb-2 relative z-10">Growth Analytics</div>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <span className="text-gray-600 text-xs">ROI</span>
          <span className="bg-kuwex-cyan/10 text-kuwex-cyan text-sm font-bold px-3 py-1 rounded-lg border border-kuwex-cyan/20">+340%</span>
        </div>
        <svg className="w-full h-24 relative z-10" viewBox="0 0 200 70">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0085FF" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,60 Q30,55 60,45 T120,25 T200,5" fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M0,60 Q30,55 60,45 T120,25 T200,5 L200,70 L0,70 Z" fill="url(#areaGradient)" />
        </svg>
      </div>
    )
  },
  {
    title: "Applied AI & Business Automation",
    desc: "Transform operations with AI chatbots, workflow automation, predictive analytics, and automated customer engagement. Built for Zimbabwe's AI economy.",
    href: "/services/applied-ai",
    visual: (
      <div className="relative h-52 bg-gradient-to-br from-[#0a1628] via-[#16181C] to-[#0a0a0a] rounded-xl p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_60%)]" />
        <div className="text-xs text-gray-500 mb-2 relative z-10">AI Engine</div>
        <div className="relative z-10 flex flex-col items-center justify-center h-32">
          <div className="w-16 h-16 rounded-full border-2 border-kuwex-cyan/30 flex items-center justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 border border-kuwex-cyan/40 flex items-center justify-center">
              <div className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-kuwex-cyan rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-kuwex-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 bg-kuwex-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between relative z-10">
          <span className="text-xs text-gray-600">Automation</span>
          <span className="text-kuwex-cyan text-sm font-bold">24/7</span>
        </div>
      </div>
    )
  }
];

// What We Deliver - Key Benefits
const deliverables = [
  {
    title: "Global Standards",
    desc: "World-class designs and development practices that compete on the international stage.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    stat: "100%",
    statLabel: "Quality Assured"
  },
  {
    title: "African Innovation",
    desc: "Solutions built with deep understanding of African markets and user behaviors.",
    image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&h=400&fit=crop",
    stat: "24/7",
    statLabel: "Support"
  },
  {
    title: "Future-Ready Tech",
    desc: "Cutting-edge technologies that scale with your business and stand the test of time.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    stat: "∞",
    statLabel: "Possibilities"
  }
];

// Recent Blog Posts — direct homepage links for crawl discovery
const recentBlogPosts = [
  {
    slug: "google-ads-zimbabwe-beginners-guide",
    title: "Google Ads Zimbabwe: Complete Beginner's Guide (2026)",
    excerpt: "Learn how to set up and optimize Google Ads for your Zimbabwe business. Budgets, targeting, and ROI tracking explained step by step.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "Mar 25, 2026",
    category: "Google Ads",
  },
  {
    slug: "how-much-does-website-cost-zimbabwe-2026",
    title: "How Much Does a Website Cost in Zimbabwe? (2026 Pricing Guide)",
    excerpt: "Complete website pricing guide for Zimbabwe businesses in 2026. From basic sites to e-commerce — learn what affects cost.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "Apr 8, 2026",
    category: "Web Design",
  },
  {
    slug: "seo-guide-zimbabwe-small-businesses",
    title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google",
    excerpt: "Step-by-step SEO guide for Zimbabwe SMEs. Google Business Profile setup, keyword research, and on-page optimization.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "Apr 2, 2026",
    category: "SEO",
  },
  {
    slug: "hustle-to-brand-zimbabwean-startups-trust-online",
    title: "From Hustle to Brand: Build Trust Online",
    excerpt: "Zimbabwe startups: hustle alone won't build a business. Trust does. Learn the framework to transform your hustle into a brand.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    author: "Weston",
    date: "Apr 10, 2026",
    category: "Branding",
  },
  {
    slug: "new-zimbabwean-customer-checks-google-first",
    title: "Zimbabwean Customers Check Google First",
    excerpt: "93% of online experiences start with Google. Is your Zimbabwe business showing up? Learn why Google visibility is your #1 revenue driver.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "Apr 8, 2026",
    category: "Digital Strategy",
  },
  {
    slug: "web-design-trends-zimbabwe-2026",
    title: "10 Web Design Trends Zimbabwe Businesses Must Adopt in 2026",
    excerpt: "From dark mode to AI personalization — the web design trends shaping Zimbabwe's digital landscape.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    author: "Weston",
    date: "Mar 10, 2026",
    category: "Web Design",
  },
  {
    slug: "zimbabwe-future-belongs-visible-businesses-online-growth",
    title: "Zimbabwe's Future Belongs to Visible Businesses",
    excerpt: "The businesses that will dominate Zimbabwe's next decade are the ones investing in online visibility today. Here's why and how to start.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "Mar 10, 2026",
    category: "Digital Strategy",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KuWeX Studios",
  "url": "https://kuwexstudios.co.zw",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kuwexstudios.co.zw/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "KuWeX Studios - Digital Marketing Agency Zimbabwe",
  "description": "Zimbabwe's #1 digital marketing agency and web design company. SEO, social media marketing, Google Ads, branding, and custom web development for businesses in Harare and across Zimbabwe.",
  "url": "https://kuwexstudios.co.zw",
  "telephone": "+263719066891",
  "email": "info@kuwexstudios.co.zw",
  "priceRange": "$$",
  "provider": {
    "@type": "Organization",
    "name": "KuWeX Studios"
  },
  "areaServed": [
    { "@type": "Country", "name": "Zimbabwe" },
    { "@type": "City", "name": "Harare" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & Development Zimbabwe", "url": "https://kuwexstudios.co.zw/services/web-design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services Zimbabwe", "url": "https://kuwexstudios.co.zw/services/seo-services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing Zimbabwe", "url": "https://kuwexstudios.co.zw/services/social-media-marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management Zimbabwe", "url": "https://kuwexstudios.co.zw/services/google-ads" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Design Zimbabwe", "url": "https://kuwexstudios.co.zw/services/branding" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development Zimbabwe", "url": "https://kuwexstudios.co.zw/services/software-development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Applied AI & Business Automation Zimbabwe", "url": "https://kuwexstudios.co.zw/services/applied-ai" } }
    ]
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />

      {/* Hero Section — Digital Command Center */}
      <section className="pt-28 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'grid-pan 20s linear infinite',
          }}
        />
        {/* Radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(0,229,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(0,133,255,0.06),transparent_50%)]" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-kuwex-cyan/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-kuwex-blue/[0.04] rounded-full blur-[120px]" />
        {/* Vertical data stream particles */}
        <div className="absolute left-[8%] top-0 bottom-0 w-px overflow-hidden hidden lg:block">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-kuwex-cyan/40 to-transparent" style={{ animation: 'data-stream 4s linear infinite' }} />
        </div>
        <div className="absolute right-[12%] top-0 bottom-0 w-px overflow-hidden hidden lg:block">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-kuwex-blue/40 to-transparent" style={{ animation: 'data-stream 6s linear infinite 1s' }} />
        </div>
        <div className="absolute left-[20%] top-0 bottom-0 w-px overflow-hidden hidden lg:block">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-kuwex-cyan/30 to-transparent" style={{ animation: 'data-stream 5s linear infinite 2s' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="vibrant-badge mb-8"
              >
                <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">#1 Digital Marketing Agency in Zimbabwe</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
                <span className="sr-only">KuWeX Studios - Best Digital Marketing Agency & Web Design Company in Zimbabwe</span>
                Building Africa&apos;s<br />
                <span className="vibrant-gradient-text">Digital Future.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                Zimbabwe&apos;s leading digital marketing agency and web design company. We build stunning websites, dominate Google rankings, and drive real growth for businesses across Harare and Zimbabwe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-8 py-4 rounded-full font-bold text-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
                >
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/services"
                  className="border border-[#2F3336] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8 mt-12 pt-8 border-t border-[#2F3336]/40"
              >
                <div>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-xs text-gray-500 tracking-wide uppercase">Projects Delivered</div>
                </div>
                <div className="w-px h-10 bg-[#2F3336]/40" />
                <div>
                  <div className="text-2xl font-bold text-white">14</div>
                  <div className="text-xs text-gray-500 tracking-wide uppercase">Industries Served</div>
                </div>
                <div className="w-px h-10 bg-[#2F3336]/40" />
                <div>
                  <div className="text-2xl font-bold text-kuwex-cyan">99.9%</div>
                  <div className="text-xs text-gray-500 tracking-wide uppercase">Uptime</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content — Holographic Command Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex justify-center items-center relative"
            >
              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">

                {/* Pulse rings emanating from center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-40 h-40 rounded-full border border-kuwex-cyan/20" style={{ animation: 'pulse-ring 3s ease-out infinite' }} />
                  <div className="absolute w-40 h-40 rounded-full border border-kuwex-cyan/20" style={{ animation: 'pulse-ring 3s ease-out infinite 1s' }} />
                  <div className="absolute w-40 h-40 rounded-full border border-kuwex-cyan/20" style={{ animation: 'pulse-ring 3s ease-out infinite 2s' }} />
                </div>

                {/* Decorative orbit rings */}
                <div className="absolute w-[92%] h-[92%] rounded-full border border-kuwex-cyan/[0.06]" />
                <div className="absolute w-[72%] h-[72%] rounded-full border border-kuwex-cyan/[0.08]" />
                <div className="absolute w-[52%] h-[52%] rounded-full border border-kuwex-blue/[0.1]" />

                {/* Orbit Ring 1 — Outer (8 social icons, 25s rotation) */}
                <div
                  className="absolute w-[92%] h-[92%]"
                  style={{ animation: 'orbit-rotate 25s linear infinite' }}
                >
                  {platformIcons.map((platform, i) => {
                    const angle = (i * 360) / platformIcons.length;
                    const radius = 46;
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                    return (
                      <div
                        key={`outer-${platform.name}`}
                        className="absolute group cursor-pointer"
                        style={{
                          left: `calc(50% + ${x}% - 28px)`,
                          top: `calc(50% + ${y}% - 28px)`,
                          animation: 'orbit-rotate-reverse 25s linear infinite',
                        }}
                      >
                        {/* Glow halo */}
                        <div
                          className="absolute inset-0 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: platform.gradient }}
                        />
                        {/* Icon container */}
                        <div
                          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                          style={{
                            background: `${platform.color}15`,
                            border: `1px solid ${platform.color}50`,
                            backdropFilter: 'blur(12px)',
                            boxShadow: `0 0 20px ${platform.glow}30, inset 0 0 10px ${platform.glow}10`,
                          }}
                        >
                          <platform.icon size={22} style={{ color: platform.color, filter: `drop-shadow(0 0 4px ${platform.glow}80)` }} />
                          {/* Tooltip */}
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-[#16181C]/90 px-2 py-1 rounded-md border border-[#2F3336]/60">
                            {platform.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Orbit Ring 2 — Middle (6 service icons, 18s reverse) */}
                <div
                  className="absolute w-[72%] h-[72%]"
                  style={{ animation: 'orbit-rotate-reverse 18s linear infinite' }}
                >
                  {[
                    { icon: Globe, name: 'SEO', color: '#00E5FF', glow: '#00E5FF' },
                    { icon: ShoppingBag, name: 'E-commerce', color: '#FF9900', glow: '#FF9900' },
                    { icon: Smartphone, name: 'Mobile Apps', color: '#34D399', glow: '#34D399' },
                    { icon: Brain, name: 'AI Solutions', color: '#A855F7', glow: '#A855F7' },
                    { icon: Star, name: 'Branding', color: '#FCAF45', glow: '#FCAF45' },
                    { icon: TrendingUp, name: 'Analytics', color: '#0085FF', glow: '#0085FF' },
                  ].map((item, i) => {
                    const angle = (i * 360) / 6;
                    const radius = 46;
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                    return (
                      <div
                        key={`mid-${item.name}`}
                        className="absolute group cursor-pointer"
                        style={{
                          left: `calc(50% + ${x}% - 22px)`,
                          top: `calc(50% + ${y}% - 22px)`,
                          animation: 'orbit-rotate 18s linear infinite',
                        }}
                      >
                        {/* Glow halo */}
                        <div
                          className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                          style={{ background: `linear-gradient(135deg, ${item.color}, ${item.glow})` }}
                        />
                        {/* Icon container */}
                        <div
                          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                          style={{
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}40`,
                            backdropFilter: 'blur(12px)',
                            boxShadow: `0 0 15px ${item.glow}25, inset 0 0 8px ${item.glow}10`,
                          }}
                        >
                          <item.icon size={18} style={{ color: item.color, filter: `drop-shadow(0 0 3px ${item.glow}80)` }} />
                          {/* Tooltip */}
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-[#16181C]/90 px-2 py-1 rounded-md border border-[#2F3336]/60">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Orbit Ring 3 — Inner (4 small dots, 12s) */}
                <div
                  className="absolute w-[52%] h-[52%]"
                  style={{ animation: 'orbit-rotate 12s linear infinite' }}
                >
                  {[0, 1, 2, 3].map((i) => {
                    const angle = (i * 360) / 4 + 45;
                    const radius = 46;
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                    return (
                      <div
                        key={`inner-dot-${i}`}
                        className="absolute w-2 h-2 rounded-full bg-kuwex-cyan"
                        style={{
                          left: `calc(50% + ${x}% - 4px)`,
                          top: `calc(50% + ${y}% - 4px)`,
                          boxShadow: '0 0 10px rgba(0,229,255,0.6)',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Central Holographic Core */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  {/* Breathing glow orb */}
                  <div
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#0a1628] via-[#0f0f0f] to-[#16181C] border border-kuwex-cyan/30 flex items-center justify-center"
                    style={{ animation: 'core-breathe 4s ease-in-out infinite' }}
                  >
                    {/* Inner rotating gradient ring */}
                    <div
                      className="absolute inset-2 rounded-full border border-kuwex-cyan/10"
                      style={{ animation: 'orbit-rotate 8s linear infinite' }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-kuwex-cyan shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kuwex-blue shadow-[0_0_6px_rgba(0,133,255,0.6)]" />
                    </div>

                    {/* KuWeX Logo */}
                    <div className="relative z-10 flex items-center justify-center">
                      <Image
                        src="/logo.jpg"
                        alt="KuWeX Studios"
                        width={80}
                        height={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Tagline below core */}
                  <div className="mt-4 text-[10px] sm:text-xs text-gray-500 tracking-wider uppercase">
                    Digital Growth Engine
                  </div>
                </div>

                {/* Floating service tags — positioned around the orbit */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-[8%] right-[2%] hidden md:block"
                  style={{ animation: 'float-tag 5s ease-in-out infinite' }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-[#16181C]/80 border border-kuwex-cyan/20 backdrop-blur-sm text-[10px] text-gray-300 font-medium">
                    SEO Ranking
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="absolute bottom-[12%] left-[0%] hidden md:block"
                  style={{ animation: 'float-tag 6s ease-in-out infinite 1s' }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-[#16181C]/80 border border-kuwex-blue/20 backdrop-blur-sm text-[10px] text-gray-300 font-medium">
                    Web Design
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute top-[40%] left-[-4%] hidden md:block"
                  style={{ animation: 'float-tag 7s ease-in-out infinite 2s' }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-[#16181C]/80 border border-[#A855F7]/20 backdrop-blur-sm text-[10px] text-gray-300 font-medium">
                    AI Automation
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="absolute bottom-[40%] right-[-2%] hidden md:block"
                  style={{ animation: 'float-tag 5.5s ease-in-out infinite 0.5s' }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-[#16181C]/80 border border-[#FCAF45]/20 backdrop-blur-sm text-[10px] text-gray-300 font-medium">
                    Branding
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why KuWeX Section */}
      <section className="py-28 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.04),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="vibrant-badge mb-6">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full" />
              <span className="text-sm text-gray-400">Our Services</span>
            </div>
            <h2 className="section-heading">
              Why <span className="vibrant-gradient-text">KuWeX</span> Studios?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group x-card-vibrant overflow-hidden"
              >
                {service.visual}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-kuwex-cyan transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <div className="flex justify-end">
                    <Link
                      href={service.href}
                      aria-label={`Learn more about ${service.title}`}
                      className="w-10 h-10 rounded-full bg-[#2F3336]/80 group-hover:bg-gradient-to-r group-hover:from-kuwex-cyan group-hover:to-kuwex-blue group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Zimbabwe</Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services Zimbabwe</Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing</Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Zimbabwe</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding & Design</Link>
            <Link href="/services/software-development" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Software Development Zimbabwe</Link>
            <Link href="/services/applied-ai" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">AI & Business Automation Zimbabwe</Link>
          </div>
        </div>
      </section>

      {/* Free Tools & Resources */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Free Tools & Resources</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Try Our <span className="vibrant-gradient-text">Free Business Tools</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See how AI can transform your business — get instant insights with our free interactive tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="x-card-vibrant rounded-2xl p-8 text-center group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                <Brain size={28} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Readiness Quiz</h3>
              <p className="text-gray-400 text-sm mb-6">Answer 10 questions and get your AI Readiness Score instantly. See how your business compares.</p>
              <Link href="/ai-readiness-quiz" className="inline-flex items-center gap-2 text-kuwex-cyan font-semibold text-sm hover:gap-3 transition-all">
                Take the Quiz <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="x-card-vibrant rounded-2xl p-8 text-center group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                <Calculator size={28} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI ROI Calculator</h3>
              <p className="text-gray-400 text-sm mb-6">Calculate how much your business could save with AI automation. Get instant ROI projections.</p>
              <Link href="/roi-calculator" className="inline-flex items-center gap-2 text-kuwex-cyan font-semibold text-sm hover:gap-3 transition-all">
                Calculate Savings <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="x-card-vibrant rounded-2xl p-8 text-center group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                <Star size={28} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Client Results</h3>
              <p className="text-gray-400 text-sm mb-6">See real results from Zimbabwean businesses we&apos;ve helped grow. Case studies and testimonials.</p>
              <Link href="/testimonials" className="inline-flex items-center gap-2 text-kuwex-cyan font-semibold text-sm hover:gap-3 transition-all">
                View Results <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-28 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="vibrant-badge mb-6">
              <span className="w-2 h-2 bg-kuwex-blue rounded-full" />
              <span className="text-sm text-gray-400">Our Promise</span>
            </div>
            <h2 className="section-heading mb-4">
              What we <span className="vibrant-gradient-text">deliver</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Excellence in every project. Innovation in every solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-kuwex-cyan/20 transition-all duration-500"
              >
                <div className="relative h-80">
                  <Image
                    src={item.image}
                    alt={`${item.title} - KuWeX Studios Digital Services`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:via-black/50 transition-all duration-500" />
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2 border border-kuwex-cyan/20 group-hover:border-kuwex-cyan/40 transition-all duration-300">
                  <div className="text-2xl font-bold text-kuwex-cyan neon-text">{item.stat}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-kuwex-cyan transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-kuwex-cyan/10 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-kuwex-cyan group-hover:to-kuwex-blue group-hover:text-black flex items-center justify-center transition-all duration-300 border border-kuwex-cyan/20 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="vibrant-badge mx-auto mb-6">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full" />
              <span className="text-sm text-gray-400">Industry-Specific Solutions</span>
            </div>
            <h2 className="section-heading mb-4">
              Digital marketing for <span className="vibrant-gradient-text">every industry</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We build industry-specific websites, SEO strategies, and digital marketing campaigns tailored to the Zimbabwean market.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {industries.map((industry, i) => {
              const Icon = homeIconMap[industry.icon] || TrendingUp;
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#16181C]/60 border border-[#2F3336]/40 hover:border-kuwex-cyan/30 hover:bg-[#16181C] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-kuwex-cyan/5 border border-kuwex-cyan/10 flex items-center justify-center group-hover:bg-kuwex-cyan/10 group-hover:border-kuwex-cyan/20 transition-all">
                      <Icon size={22} className="text-gray-500 group-hover:text-kuwex-cyan transition-colors" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 group-hover:text-white text-center font-medium transition-colors">
                      {industry.shortName}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 border border-[#2F3336] text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
            >
              View All Industries <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-28 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(0,229,255,0.04),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="vibrant-badge mb-6">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full" />
              <span className="text-sm text-gray-400">Latest Insights</span>
            </div>
            <h2 className="section-heading mb-4">
              From our <span className="vibrant-gradient-text">blog</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Expert insights on digital marketing, web design, and technology for Zimbabwe businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {recentBlogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="x-card-vibrant rounded-2xl overflow-hidden group block h-full">
                  <div className="relative h-44">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[#2F3336] text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
            >
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-kuwex-cyan/30 to-transparent" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="vibrant-badge mx-auto mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Available for new projects</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Ready to build something<br /><span className="vibrant-gradient-text">extraordinary?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let KuWeX Studios help you innovate, grow, and lead the digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
              >
                Start Your Project Today
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-[#2F3336] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
            <p className="text-xs text-gray-600 mt-8">
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              {" · "}
              <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
