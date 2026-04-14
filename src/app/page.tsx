"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Youtube, Linkedin, Twitter, Globe, ShoppingBag, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Platform icons for the 3D display - social media & web platforms
const platformIcons = [
  { icon: Instagram, name: "Instagram", color: "#E4405F", gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]" },
  { icon: Facebook, name: "Facebook", color: "#1877F2" },
  { icon: Youtube, name: "YouTube", color: "#FF0000" },
  { icon: Twitter, name: "X", color: "#ffffff" },
  { icon: Linkedin, name: "LinkedIn", color: "#0A66C2" },
  { icon: Globe, name: "Website", color: "#00E5FF" },
  { icon: ShoppingBag, name: "E-commerce", color: "#FF9900" },
  { icon: Smartphone, name: "Mobile", color: "#34D399" },
];

// X Business Style - Service Cards Data
const services = [
  {
    title: "Digital Branding & Creative Design",
    desc: "We craft bold, memorable, and timeless brand identities that command attention in a competitive market.",
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
    title: "Digital Marketing",
    desc: "We help businesses grow using data-driven, AI-powered marketing strategies built for conversions and visibility.",
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
  "email": "projects@kuwex.co",
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
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Design Zimbabwe", "url": "https://kuwexstudios.co.zw/services/branding" } }
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

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
            </motion.div>

            {/* Right Content - 3D Futuristic Computer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-kuwex-cyan/20 to-kuwex-blue/20 blur-3xl rounded-full" />

                {/* 3D Monitor Frame */}
                <div className="relative">
                  {/* Monitor */}
                  <div className="relative bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] rounded-3xl p-3 shadow-2xl border border-[#4a4a4a]">
                    {/* Screen */}
                    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] rounded-2xl p-6 sm:p-8 aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Screen Glare */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent" />

                      {/* Orbiting Platform Icons Inside Screen */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Outer orbit ring */}
                        <div className="absolute w-[85%] h-[85%] rounded-full border border-kuwex-cyan/10" />

                        {/* Rotating container for orbiting icons */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute w-[85%] h-[85%]"
                        >
                          {/* Platform icons positioned in a circle */}
                          {platformIcons.map((platform, i) => {
                            const angle = (i * 360) / platformIcons.length;
                            const radius = 42; // percentage from center
                            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                            return (
                              <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  rotate: -360 // Counter-rotate to keep icons upright
                                }}
                                transition={{
                                  opacity: { delay: 0.6 + i * 0.1, duration: 0.3 },
                                  scale: { delay: 0.6 + i * 0.1, duration: 0.3 },
                                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                                }}
                                className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 cursor-pointer group"
                                style={{
                                  left: `calc(50% + ${x}% - 20px)`,
                                  top: `calc(50% + ${y}% - 20px)`,
                                  background: platform.gradient
                                    ? `linear-gradient(135deg, ${platform.color}20, ${platform.color}40)`
                                    : `${platform.color}20`,
                                  border: `1px solid ${platform.color}50`,
                                }}
                              >
                                <platform.icon
                                  size={20}
                                  style={{ color: platform.color }}
                                  className="sm:w-6 sm:h-6"
                                />
                                {/* Tooltip */}
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  {platform.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>

                        {/* Inner glow ring */}
                        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-kuwex-cyan/5 to-kuwex-blue/5 animate-pulse" />
                      </div>

                      {/* KuWeX Logo on Screen - Center */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center z-10 relative"
                      >
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
                          <span className="text-white">KuWe</span>
                          <span className="text-kuwex-cyan">X</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 tracking-[0.3em]">STUDIOS</div>
                        <div className="mt-2 text-[10px] sm:text-xs text-gray-500">Grow on every platform</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Monitor Stand */}
                  <div className="flex justify-center">
                    <div className="w-20 h-8 bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] rounded-b-xl border-x border-b border-[#4a4a4a]" />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-40 h-3 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-full shadow-lg" />
                  </div>
                </div>
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
                      href="/services"
                      className="w-10 h-10 rounded-full bg-[#2F3336]/80 group-hover:bg-gradient-to-r group-hover:from-kuwex-cyan group-hover:to-kuwex-blue group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
