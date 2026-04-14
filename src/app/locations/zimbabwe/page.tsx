"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, MessageCircle, Globe, Code2, Search, Megaphone, Palette, BarChart3, Zap, Shield, Users, TrendingUp, Building2, Cpu } from "lucide-react";

const services = [
  { icon: Code2, title: "Web Design & Development", desc: "Custom websites for Zimbabwe businesses — from SMEs in Gweru to corporates in Harare. Mobile-first, fast, and SEO-ready.", link: "/services/web-design", keyword: "web design Zimbabwe" },
  { icon: Search, title: "SEO Services", desc: "Rank #1 on Google for Zimbabwe-specific searches. Local and national SEO strategies that deliver consistent organic traffic.", link: "/services/seo-services", keyword: "SEO services Zimbabwe" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Reach Zimbabwe's 3M+ social media users with targeted content, paid advertising, and community management.", link: "/services/social-media-marketing", keyword: "social media marketing Zimbabwe" },
  { icon: BarChart3, title: "Google Ads Management", desc: "Instant visibility for Zimbabwe businesses. Search, Display, and YouTube ads managed by certified experts.", link: "/services/google-ads", keyword: "Google Ads Zimbabwe" },
  { icon: Palette, title: "Branding & Creative Design", desc: "Build a powerful brand identity that resonates with Zimbabwean audiences. Logo design to complete visual systems.", link: "/services/branding", keyword: "branding agency Zimbabwe" },
  { icon: Cpu, title: "AI-Powered Solutions", desc: "Leverage artificial intelligence for automated marketing, chatbots, data analysis, and business intelligence. The future of Zimbabwe business.", link: "/contact", keyword: "AI solutions Zimbabwe" },
];

const cities = [
  { name: "Harare", link: "/locations/harare", desc: "Zimbabwe's capital and economic hub" },
  { name: "Bulawayo", link: "/locations/bulawayo", desc: "Zimbabwe's second largest city" },
  { name: "Gweru", link: null, desc: "Central Zimbabwe business center" },
  { name: "Mutare", link: null, desc: "Eastern Highlands gateway city" },
  { name: "Masvingo", link: null, desc: "Southern Zimbabwe historic city" },
  { name: "Chinhoyi", link: null, desc: "Mashonaland West provincial capital" },
  { name: "Victoria Falls", link: null, desc: "Tourism and hospitality hub" },
  { name: "Kwekwe", link: null, desc: "Midlands mining and industrial city" },
];

const advantages = [
  { icon: Zap, title: "AI-Powered Marketing", desc: "We use artificial intelligence to analyze markets, predict trends, and optimize campaigns — giving Zimbabwe businesses an unfair advantage over competitors still using outdated methods." },
  { icon: TrendingUp, title: "Data-Driven Results", desc: "Every decision backed by data. We track, measure, and optimize every campaign for maximum ROI. No guesswork — just results for your Zimbabwe business." },
  { icon: Shield, title: "Zimbabwe Market Experts", desc: "Deep understanding of Zimbabwe's business ecosystem, consumer behavior, payment methods (EcoCash, bank transfer), and digital adoption patterns." },
  { icon: Users, title: "Dedicated Support", desc: "Local team, local time zone, local understanding. WhatsApp, phone, and email support with rapid response times." },
];

export default function ZimbabwePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-kuwex-cyan/[0.03] rounded-full blur-[180px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <Globe size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Serving All of Zimbabwe</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            Zimbabwe&apos;s <span className="vibrant-gradient-text">#1 Digital Marketing Agency</span> & Web Design Company
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            KuWeX Studios is the leading digital marketing agency in Zimbabwe. We help businesses across every province build powerful websites, dominate Google, and generate leads through strategic digital marketing. From Harare to Victoria Falls — we deliver results nationwide.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Free Consultation <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20digital%20marketing%20services%20in%20Zimbabwe" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-[#2F3336]/40 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "200+", label: "Zimbabwe Clients", desc: "Businesses nationwide" },
              { metric: "#1", label: "Digital Agency", desc: "In Zimbabwe market" },
              { metric: "8+", label: "Cities Served", desc: "Across all provinces" },
              { metric: "4.9/5", label: "Client Rating", desc: "Verified reviews" },
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

      {/* Services Nationwide */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Digital Services Across <span className="vibrant-gradient-text">Zimbabwe</span></h2>
            <p className="section-subheading mx-auto">Comprehensive digital solutions for every business in Zimbabwe — from startups to enterprises, SMEs to NGOs.</p>
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

      {/* Cities We Serve */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Cities We Serve in <span className="vibrant-gradient-text">Zimbabwe</span></h2>
            <p className="section-subheading mx-auto">Digital marketing and web design services available in all major Zimbabwe cities.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city, i) => {
              const Inner = (
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-5 hover:border-kuwex-cyan/30 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={16} className="text-kuwex-cyan" />
                    <h3 className="text-base font-bold text-white group-hover:text-kuwex-cyan transition-colors">{city.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{city.desc}</p>
                </motion.div>
              );
              return city.link ? <Link key={i} href={city.link}>{Inner}</Link> : <div key={i}>{Inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">How KuWeX Outperforms Every <span className="vibrant-gradient-text">Digital Agency in Zimbabwe</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-kuwex-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Segments */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Who We Work With in <span className="vibrant-gradient-text">Zimbabwe</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SMEs & Startups", desc: "Affordable digital solutions to help Zimbabwe's small and medium enterprises compete online. Website design from $499, SEO from $299/month." },
              { title: "Corporates & Enterprises", desc: "Enterprise-grade web applications, digital transformation, and multi-channel marketing strategies for Zimbabwe's largest companies." },
              { title: "NGOs & Non-Profits", desc: "Specialized digital marketing services for NGOs operating in Zimbabwe. Donor engagement, impact reporting, and online visibility." },
              { title: "Government Institutions", desc: "Secure, accessible, and compliant web solutions for Zimbabwe government departments and parastatals." },
              { title: "E-commerce Businesses", desc: "Online stores with EcoCash integration, inventory management, and digital marketing that drives Zimbabwe online sales." },
              { title: "Professional Services", desc: "Law firms, medical practices, accounting firms, and consultancies in Zimbabwe. Build authority and attract clients online." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dominate <span className="vibrant-gradient-text">Zimbabwe&apos;s Digital Space?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Get a free digital marketing consultation. Discover how KuWeX Studios can help your Zimbabwe business grow online.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300">View All Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-lg font-semibold text-white mb-6">Explore Our Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Zimbabwe</Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services Zimbabwe</Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing Zimbabwe</Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Zimbabwe</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding Zimbabwe</Link>
            <Link href="/locations/harare" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Digital Agency Harare</Link>
            <Link href="/locations/bulawayo" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Digital Agency Bulawayo</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
