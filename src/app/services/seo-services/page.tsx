"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, TrendingUp, MapPin, Link2, BarChart3, FileText, ArrowRight, CheckCircle2, Target, Globe, Zap, MessageCircle, Eye, MousePointer } from "lucide-react";

const services = [
  { icon: Search, title: "Keyword Research & Strategy", desc: "We identify the exact search terms your Zimbabwe customers use. Our data-driven keyword strategy targets high-intent, high-volume terms that drive qualified traffic." },
  { icon: FileText, title: "On-Page SEO Optimization", desc: "From meta titles to header tags, content optimization to internal linking \u2014 we optimize every element of your website for maximum Google visibility in Zimbabwe." },
  { icon: MapPin, title: "Local SEO for Zimbabwe", desc: "Dominate local search in Harare, Bulawayo, and across Zimbabwe. Google Business Profile optimization, local citations, and geo-targeted content." },
  { icon: Link2, title: "Link Building & Authority", desc: "Strategic backlink acquisition from Zimbabwe directories, industry publications, and authoritative websites. Build domain authority that competitors can\u2019t match." },
  { icon: BarChart3, title: "Technical SEO Audit", desc: "Comprehensive crawl analysis, site speed optimization, schema markup, XML sitemaps, and Core Web Vitals fixes to eliminate every barrier to ranking." },
  { icon: TrendingUp, title: "SEO Reporting & Analytics", desc: "Monthly performance reports with keyword rankings, traffic growth, conversion data, and actionable insights. Full transparency on your SEO investment." },
];

const results = [
  { metric: "300%", label: "Average Traffic Increase", desc: "Within 6 months for Zimbabwe clients" },
  { metric: "#1", label: "Google Rankings", desc: "For target keywords in Zimbabwe" },
  { metric: "5x", label: "Lead Generation", desc: "More qualified leads from organic search" },
  { metric: "200+", label: "Keywords Ranked", desc: "On page 1 of Google for our clients" },
];

const pricing = [
  { name: "SEO Starter", price: "From $299/mo", desc: "For small businesses getting started", features: ["Keyword research (20 keywords)", "On-page optimization", "Google Business Profile setup", "Monthly reporting", "Basic link building", "3-month minimum"], popular: false },
  { name: "SEO Growth", price: "From $599/mo", desc: "For businesses serious about growth", features: ["Keyword research (50+ keywords)", "Full on-page & technical SEO", "Local SEO optimization", "Content strategy & creation", "Advanced link building", "Competitor monitoring"], popular: true },
  { name: "SEO Domination", price: "From $999/mo", desc: "For market leaders and enterprises", features: ["Unlimited keyword targeting", "Complete technical overhaul", "Multi-location SEO", "Weekly content creation", "Premium link building", "Dedicated SEO manager"], popular: false },
];

export default function SEOServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">#1 SEO Agency in Zimbabwe</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            <span className="vibrant-gradient-text">SEO Services</span> That Put Zimbabwe Businesses on <span className="vibrant-gradient-text">Page 1</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            Stop losing customers to competitors who rank above you. Our proven SEO strategies have helped 100+ Zimbabwe businesses dominate Google and generate consistent, qualified leads.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Free SEO Audit <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20SEO%20services%20for%20my%20website" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 border-y border-[#2F3336]/40 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl font-black vibrant-gradient-text mb-1">{r.metric}</p>
                <p className="text-sm font-semibold text-white mb-1">{r.label}</p>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Complete <span className="vibrant-gradient-text">SEO Solutions</span> for Zimbabwe Businesses</h2>
            <p className="section-subheading mx-auto">Everything you need to rank #1 on Google.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="x-card-vibrant rounded-2xl p-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <service.icon size={24} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">How Our <span className="vibrant-gradient-text">SEO Process</span> Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: Eye, title: "SEO Audit", desc: "We analyze your website, competitors, and industry to identify every opportunity for improvement." },
              { step: "02", icon: Target, title: "Strategy", desc: "Custom SEO roadmap targeting the keywords and tactics that will deliver the fastest results for your business." },
              { step: "03", icon: Zap, title: "Execution", desc: "Our team implements on-page, technical, and off-page optimizations while creating high-quality content." },
              { step: "04", icon: TrendingUp, title: "Growth", desc: "Monthly reporting, continuous optimization, and scaling strategies to maintain and grow your rankings." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="text-6xl font-black text-kuwex-cyan/10 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">SEO <span className="vibrant-gradient-text">Pricing</span> Plans</h2>
            <p className="section-subheading mx-auto">Affordable SEO packages designed for Zimbabwe businesses of every size.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl p-8 relative ${plan.popular ? "bg-gradient-to-b from-kuwex-cyan/10 to-transparent border-2 border-kuwex-cyan/30" : "x-card-vibrant"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full text-xs font-bold text-black">Most Popular</div>}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold vibrant-gradient-text mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-kuwex-cyan flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-3 rounded-full font-semibold transition-all duration-300 ${plan.popular ? "bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]" : "border border-[#2F3336] text-white hover:border-kuwex-cyan/50"}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">SEO <span className="vibrant-gradient-text">FAQ</span></h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "How long does SEO take to show results in Zimbabwe?", a: "Most Zimbabwe businesses start seeing measurable results in 3-6 months. Local SEO often shows faster results (1-3 months), while competitive national keywords may take 6-12 months to achieve top rankings." },
              { q: "Is SEO worth it for small businesses in Zimbabwe?", a: "Absolutely. SEO delivers the highest ROI of any marketing channel. For Zimbabwe SMEs, ranking on Google means consistent free traffic and leads, unlike paid ads which stop when your budget runs out." },
              { q: "Do you guarantee #1 rankings?", a: "No ethical SEO agency can guarantee specific rankings. However, we guarantee measurable improvement in your visibility, traffic, and leads. Our track record shows 95% of clients achieve page 1 rankings within 6 months." },
              { q: "What makes KuWeX different from other SEO companies in Zimbabwe?", a: "We combine AI-powered analysis with deep Zimbabwe market expertise. Our strategies are data-driven, transparent, and focused on revenue growth \u2014 not vanity metrics." },
              { q: "Can you help with Google Business Profile optimization?", a: "Yes, local SEO including Google Business Profile setup and optimization is included in all our packages. This is critical for Zimbabwe businesses wanting to appear in Google Maps and local search results." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-[#16181C]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to <span className="vibrant-gradient-text">Dominate Google?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Get a free SEO audit and discover exactly how to outrank your competitors in Zimbabwe.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Get Free SEO Audit <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300">View All Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-lg font-semibold text-white mb-6">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Zimbabwe</Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Zimbabwe</Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding Services</Link>
            <Link href="/locations/harare" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services Harare</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
