"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, TrendingUp, BarChart3, Target, DollarSign, ArrowRight, CheckCircle2, MessageCircle, Eye, MousePointer, Zap, Globe, Video, RefreshCw } from "lucide-react";

const adTypes = [
  { icon: Search, title: "Google Search Ads", desc: "Appear at the top of Google when Zimbabwe customers search for your products or services. High-intent traffic that converts." },
  { icon: Globe, title: "Google Display Ads", desc: "Visual banner ads across millions of websites. Build brand awareness across Zimbabwe with targeted display campaigns." },
  { icon: Video, title: "YouTube Ads", desc: "Video advertising on Zimbabwe's most-watched platform. Skippable, non-skippable, and bumper ads that capture attention." },
  { icon: RefreshCw, title: "Remarketing Campaigns", desc: "Re-engage visitors who left your website without converting. Stay top-of-mind and bring them back to complete their purchase." },
  { icon: MousePointer, title: "Shopping Ads", desc: "Showcase your products directly in Google search results. Perfect for Zimbabwe e-commerce businesses looking to drive sales." },
  { icon: Target, title: "Performance Max", desc: "AI-powered campaigns across all Google channels. Maximum reach and conversions using Google's machine learning for Zimbabwe businesses." },
];

const results = [
  { metric: "400%", label: "Average ROAS", desc: "Return on ad spend for clients" },
  { metric: "$2M+", label: "Ad Spend Managed", desc: "Across Zimbabwe campaigns" },
  { metric: "50%", label: "Lower CPC", desc: "Vs industry average in Zimbabwe" },
  { metric: "10x", label: "Lead Growth", desc: "For Zimbabwe businesses" },
];

const pricing = [
  { name: "PPC Starter", price: "From $349/mo", desc: "For small businesses testing Google Ads", features: ["Campaign setup & management", "Up to $500 ad budget", "Keyword targeting", "Ad copy creation", "Monthly reporting", "Landing page recommendations"], popular: false },
  { name: "PPC Growth", price: "From $699/mo", desc: "For businesses scaling their ads", features: ["Multi-campaign management", "Up to $2,000 ad budget", "Advanced audience targeting", "A/B testing & optimization", "Conversion tracking setup", "Bi-weekly reporting"], popular: true },
  { name: "PPC Enterprise", price: "From $1,299/mo", desc: "For maximum ROI at scale", features: ["Full-funnel campaigns", "Unlimited ad budget", "All campaign types (Search, Display, Video)", "Custom landing pages", "Advanced analytics & attribution", "Dedicated account manager"], popular: false },
];

export default function GoogleAdsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Google Ads Certified Agency</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            <span className="vibrant-gradient-text">Google Ads</span> Management for Zimbabwe Businesses
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            Get instant visibility on Google. Our certified team manages high-ROI PPC campaigns that put your business in front of Zimbabwe customers actively searching for your products and services.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Free PPC Consultation <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20Google%20Ads%20management" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
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

      {/* Ad Types */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4"><span className="vibrant-gradient-text">Google Ads</span> Campaign Types We Manage</h2>
            <p className="section-subheading mx-auto">From search to video, we manage every Google Ads format to maximize your Zimbabwe business growth.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adTypes.map((ad, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="x-card-vibrant rounded-2xl p-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <ad.icon size={24} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ad.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{ad.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Our <span className="vibrant-gradient-text">PPC Process</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Account Audit", desc: "We analyze your existing campaigns or research your market to build a winning strategy." },
              { step: "02", title: "Campaign Setup", desc: "Keyword research, ad copy creation, landing page optimization, and conversion tracking." },
              { step: "03", title: "Optimize & Scale", desc: "Continuous bid management, A/B testing, negative keywords, and quality score improvement." },
              { step: "04", title: "Report & Grow", desc: "Transparent reporting with actionable insights. We scale what works and cut what doesn't." },
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
            <h2 className="section-heading mb-4">Google Ads <span className="vibrant-gradient-text">Pricing</span></h2>
            <p className="section-subheading mx-auto">Management fees only. Ad spend is separate and controlled by you.</p>
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

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get <span className="vibrant-gradient-text">Instant Leads?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Start generating qualified leads from Google today. Free PPC consultation for Zimbabwe businesses.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Start Advertising <ArrowRight size={18} />
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
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services Zimbabwe</Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing</Link>
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Zimbabwe</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
