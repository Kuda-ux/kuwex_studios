"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, TrendingUp, Users, BarChart3, Megaphone, ArrowRight, CheckCircle2, MessageCircle, Heart, Share2, Eye, PenTool, Target } from "lucide-react";

const platforms = [
  { icon: Facebook, name: "Facebook Marketing", desc: "Page management, content creation, Facebook Ads, community building, and Messenger marketing. Reach Zimbabwe's 2M+ Facebook users.", color: "text-[#1877F2]" },
  { icon: Instagram, name: "Instagram Marketing", desc: "Visual storytelling, Reels, Stories, influencer partnerships, and Instagram Shopping. Build your brand's visual presence in Zimbabwe.", color: "text-[#E4405F]" },
  { icon: Linkedin, name: "LinkedIn Marketing", desc: "B2B lead generation, thought leadership content, company page management, and LinkedIn Ads for Zimbabwe's professional market.", color: "text-[#0A66C2]" },
  { icon: Twitter, name: "X (Twitter) Marketing", desc: "Real-time engagement, trending conversations, customer service, and brand voice development for the Zimbabwe market.", color: "text-white" },
];

const services = [
  { icon: PenTool, title: "Content Creation & Strategy", desc: "Professional content calendars, copywriting, graphic design, and video production tailored for Zimbabwe audiences." },
  { icon: Megaphone, title: "Paid Social Advertising", desc: "High-ROI Facebook, Instagram, and LinkedIn ad campaigns targeting Zimbabwe demographics with precision." },
  { icon: Users, title: "Community Management", desc: "24/7 audience engagement, comment moderation, and customer service that builds loyalty and trust." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Monthly performance dashboards with engagement metrics, audience growth, and conversion tracking." },
  { icon: Heart, title: "Influencer Marketing", desc: "Strategic partnerships with Zimbabwe influencers and content creators to amplify your brand reach." },
  { icon: Target, title: "Social Media Audits", desc: "Comprehensive analysis of your current social presence with actionable improvement recommendations." },
];

const pricing = [
  { name: "Social Starter", price: "From $249/mo", desc: "For businesses getting started on social", features: ["2 platforms managed", "12 posts/month", "Basic graphic design", "Monthly reporting", "Community monitoring", "Content calendar"], popular: false },
  { name: "Social Growth", price: "From $499/mo", desc: "For businesses ready to scale", features: ["4 platforms managed", "20+ posts/month", "Professional design & video", "Paid ad management ($200 budget)", "Weekly reporting", "Influencer outreach"], popular: true },
  { name: "Social Domination", price: "From $899/mo", desc: "For brands that want to lead", features: ["All platforms managed", "30+ posts/month", "Premium content & Reels", "Advanced ad campaigns", "Real-time monitoring", "Dedicated social manager"], popular: false },
];

export default function SocialMediaMarketingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Social Media Experts</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            <span className="vibrant-gradient-text">Social Media Marketing</span> That Grows Zimbabwe Businesses
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            Turn followers into customers. Our data-driven social media strategies help Zimbabwe businesses build engaged communities, generate leads, and drive real revenue from Facebook, Instagram, LinkedIn, and X.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Get Social Strategy <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20social%20media%20marketing%20help" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
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
              { metric: "500K+", label: "Audience Reached", desc: "Monthly across platforms" },
              { metric: "10x", label: "Engagement Growth", desc: "Average client improvement" },
              { metric: "80+", label: "Brands Managed", desc: "In Zimbabwe and beyond" },
              { metric: "3M+", label: "Content Views", desc: "Generated for our clients" },
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

      {/* Platforms */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Platforms We <span className="vibrant-gradient-text">Master</span></h2>
            <p className="section-subheading mx-auto">We manage your brand across every platform that matters in Zimbabwe.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="x-card-vibrant rounded-2xl p-6 group flex gap-4">
                <div className="w-14 h-14 bg-[#16181C] border border-[#2F3336]/60 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] transition-all duration-300">
                  <platform.icon size={28} className={platform.color} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{platform.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Social Media <span className="vibrant-gradient-text">Services</span></h2>
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

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Social Media <span className="vibrant-gradient-text">Pricing</span></h2>
            <p className="section-subheading mx-auto">Affordable social media management for Zimbabwe businesses.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to <span className="vibrant-gradient-text">Go Viral?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Let us build a social media presence that drives real business results in Zimbabwe.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Start Growing <ArrowRight size={18} />
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
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Zimbabwe</Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Branding Services</Link>
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Web Design Zimbabwe</Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services</Link>
            <Link href="/locations/harare" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Marketing Agency Harare</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
