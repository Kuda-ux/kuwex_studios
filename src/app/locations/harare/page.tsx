"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, MessageCircle, Globe, Code2, Search, Megaphone, Palette, BarChart3, Phone, Mail, Building2, Star } from "lucide-react";

const services = [
  { icon: Code2, title: "Web Design & Development Harare", desc: "Custom, responsive websites built for Harare businesses. From corporate sites to e-commerce platforms optimized for Zimbabwe's market.", link: "/services/web-design" },
  { icon: Search, title: "SEO Services Harare", desc: "Dominate Google search in Harare. Local SEO, keyword optimization, and link building that drives qualified traffic to your business.", link: "/services/seo-services" },
  { icon: Megaphone, title: "Social Media Marketing Harare", desc: "Professional social media management for Harare businesses. Facebook, Instagram, LinkedIn content creation and paid advertising.", link: "/services/social-media-marketing" },
  { icon: BarChart3, title: "Google Ads Management Harare", desc: "High-ROI Google Ads campaigns targeting Harare customers. Search ads, display ads, and remarketing that converts.", link: "/services/google-ads" },
  { icon: Palette, title: "Branding & Design Harare", desc: "Logo design, brand identity, and marketing collateral for Harare businesses. Build a brand that commands respect.", link: "/services/branding" },
  { icon: Globe, title: "Digital Strategy Consulting", desc: "Complete digital transformation consulting for Harare enterprises, NGOs, and government institutions.", link: "/contact" },
];

const industries = [
  "Real Estate Agencies", "Law Firms", "Medical Practices", "Restaurants & Hotels",
  "Retail & E-commerce", "Construction Companies", "Financial Services", "Educational Institutions",
  "NGOs & Non-profits", "Government Departments", "Manufacturing", "Transport & Logistics",
];

export default function HararePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <MapPin size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Harare, Zimbabwe</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            Best <span className="vibrant-gradient-text">Digital Marketing Agency</span> & Web Design in <span className="vibrant-gradient-text">Harare</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            KuWeX Studios is Harare&apos;s leading digital agency. We help businesses across the capital city build powerful websites, dominate Google search, and generate leads through strategic digital marketing. From the CBD to the suburbs — we serve all of Harare.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%27m%20a%20business%20in%20Harare%20and%20need%20digital%20marketing%20services" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-4 border-y border-[#2F3336]/40 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "100+", label: "Harare Clients", desc: "Businesses served" },
              { metric: "4.9", label: "Google Rating", desc: "From verified reviews" },
              { metric: "#1", label: "Ranked Agency", desc: "In Harare digital market" },
              { metric: "5+", label: "Years Experience", desc: "Serving Harare businesses" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl font-black vibrant-gradient-text mb-1">{r.metric}</p>
                <p className="text-sm font-semibold text-white mb-1">{r.label}</p>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in Harare */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Digital Services We Offer in <span className="vibrant-gradient-text">Harare</span></h2>
            <p className="section-subheading mx-auto">Comprehensive digital solutions tailored for Harare&apos;s business landscape.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} href={service.link}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="x-card-vibrant rounded-2xl p-6 group h-full cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                    <service.icon size={24} className="text-kuwex-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-kuwex-cyan transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Industries We Serve in <span className="vibrant-gradient-text">Harare</span></h2>
            <p className="section-subheading mx-auto">From startups to established enterprises — we understand Harare&apos;s diverse business landscape.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex items-center gap-2 bg-[#16181C]/80 border border-[#2F3336]/60 rounded-xl px-4 py-3">
                <CheckCircle2 size={16} className="text-kuwex-cyan flex-shrink-0" />
                <span className="text-sm text-gray-300">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Harare Businesses Choose Us */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Why Harare Businesses <span className="vibrant-gradient-text">Choose KuWeX</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Local Market Expertise", desc: "We understand Harare's business ecosystem, consumer behavior, and competitive landscape. Our strategies are built for the local market, not generic templates." },
              { title: "Results-Driven Approach", desc: "Every campaign is measured by leads, sales, and revenue growth — not vanity metrics. We focus on what actually grows your Harare business." },
              { title: "Affordable for All Budgets", desc: "From CBD startups to Borrowdale enterprises, our pricing works for every business size. Transparent packages with no hidden fees." },
              { title: "Fast Turnaround Times", desc: "Based in Harare, we offer face-to-face consultations and rapid response times. Your project doesn't get lost in a queue — it gets priority attention." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-heading mb-4">Contact Us in <span className="vibrant-gradient-text">Harare</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: "Phone", value: "+263 719 066 891", href: "tel:+263719066891" },
              { icon: Mail, label: "Email", value: "info@kuwexstudios.co.zw", href: "mailto:info@kuwexstudios.co.zw" },
              { icon: Building2, label: "Location", value: "Harare, Zimbabwe", href: "/contact" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="x-card-vibrant rounded-2xl p-6 text-center group block">
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <item.icon size={24} className="text-kuwex-cyan" />
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your <span className="vibrant-gradient-text">Harare Business?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Get a free digital marketing consultation and discover how we can help your Harare business dominate online.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Get Started Today <ArrowRight size={18} />
              </Link>
              <Link href="/locations/zimbabwe" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300">Nationwide Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-lg font-semibold text-white mb-6">Our Services in Harare</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Harare</Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services Harare</Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing Harare</Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Harare</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding Harare</Link>
            <Link href="/locations/bulawayo" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Services in Bulawayo</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
