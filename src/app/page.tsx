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
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16181C] rounded-xl p-4 flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 border border-kuwex-cyan/30 flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg bg-kuwex-cyan/40" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-kuwex-cyan text-black text-xs font-bold px-3 py-1 rounded-full w-fit">✓ Brand with KuWeX</div>
        </div>
      </div>
    )
  },
  {
    title: "Web & Mobile App Development",
    desc: "We build fast, secure, and beautiful digital products using modern frameworks and top-tier UX standards.",
    visual: (
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16181C] rounded-xl p-4 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e] border border-[#3a3a5a] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-kuwex-cyan" />
          </div>
          <div className="absolute -top-2 -right-2 bg-kuwex-blue text-white text-[10px] px-2 py-1 rounded-md">Global</div>
        </div>
      </div>
    )
  },
  {
    title: "Digital Marketing",
    desc: "We help businesses grow using data-driven, AI-powered marketing strategies built for conversions and visibility.",
    visual: (
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16181C] rounded-xl p-4">
        <div className="text-xs text-gray-500 mb-2">Target Cost / Action</div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-600 text-xs">USD</span>
          <span className="bg-[#2a2a4a] text-white text-sm px-3 py-1 rounded border border-[#3a3a5a]">1.00</span>
        </div>
        <svg className="w-full h-20" viewBox="0 0 200 60">
          <path d="M0,50 Q50,45 100,30 T200,10" fill="none" stroke="#00E5FF" strokeWidth="2" opacity="0.6" />
          <path d="M0,55 Q50,50 100,35 T200,15" fill="none" stroke="#0085FF" strokeWidth="2" opacity="0.4" />
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
  "url": "https://kuwexstudios.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kuwexstudios.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Digital Agency Services",
  "provider": {
    "@type": "Organization",
    "name": "KuWeX Studios"
  },
  "areaServed": {
    "@type": "Continent",
    "name": "Africa"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Branding"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Marketing"
        }
      }
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
      <section className="pt-28 pb-20 px-4 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                <span className="sr-only">KuWeX Studios: </span>
                Building Africa&apos;s<br />
                <span className="text-kuwex-cyan">Digital Future.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                Create powerful digital experiences. Attract the right customers. Watch your business grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-black px-8 py-4 rounded-full font-bold text-center hover:bg-gray-100 transition-all"
                >
                  Get Started
                </Link>
                <Link
                  href="/contact"
                  className="border border-[#536471] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-white/5 transition-all"
                >
                  Talk To An Expert
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

      {/* Why KuWeX Section - X Style Cards */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Why <span className="text-kuwex-cyan">KuWeX</span> Studios?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden hover:border-kuwex-cyan/50 transition-all"
              >
                {/* Visual Area */}
                {service.visual}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>

                  {/* Arrow Button */}
                  <div className="flex justify-end">
                    <Link
                      href="/services"
                      className="w-10 h-10 rounded-full bg-[#2F3336] group-hover:bg-kuwex-cyan group-hover:text-black flex items-center justify-center transition-all"
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

      {/* What We Deliver - X Style */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What we <span className="text-kuwex-cyan">deliver</span>
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
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-80">
                  <Image
                    src={item.image}
                    src={item.image}
                    alt={`${item.title} - KuWeX Studios Digital Services`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient Overlay with cyan tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-kuwex-cyan/10" />
                </div>

                {/* Stat Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-kuwex-cyan/30">
                  <div className="text-2xl font-bold text-kuwex-cyan">{item.stat}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-kuwex-cyan/20 backdrop-blur-sm group-hover:bg-kuwex-cyan group-hover:text-black flex items-center justify-center transition-all border border-kuwex-cyan/30">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-32 bg-black border-t border-[#2F3336] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to build something<br /><span className="text-kuwex-cyan">extraordinary?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let <span className="text-kuwex-cyan">KuWeX</span> Studios help you innovate, grow, and lead the digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-kuwex-cyan text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all"
              >
                Start Your Project Today
              </Link>
              <Link
                href="/services"
                className="inline-block border border-kuwex-cyan/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-kuwex-cyan/10 transition-all"
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
