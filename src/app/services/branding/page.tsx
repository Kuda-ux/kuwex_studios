"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, PenTool, Eye, Layers, BookOpen, Package, ArrowRight, CheckCircle2, MessageCircle, Star, Sparkles, FileText, Image } from "lucide-react";

const services = [
  { icon: PenTool, title: "Logo Design", desc: "Distinctive, memorable logos that capture your brand essence. We design logos that stand out in Zimbabwe's competitive market and scale across all media." },
  { icon: Palette, title: "Brand Identity Systems", desc: "Complete visual identity including color palettes, typography, iconography, and design guidelines. Consistent branding across every touchpoint." },
  { icon: BookOpen, title: "Brand Strategy", desc: "Deep market research, competitor analysis, and positioning strategy tailored for Zimbabwe's business landscape. Define your unique brand voice and message." },
  { icon: Layers, title: "Brand Guidelines", desc: "Comprehensive brand books that ensure consistency. Logo usage rules, color codes, typography specs, and application examples for your team." },
  { icon: Package, title: "Packaging Design", desc: "Eye-catching product packaging that sells off the shelf. From food products to cosmetics, we design packaging that resonates with Zimbabwean consumers." },
  { icon: Image, title: "Marketing Collateral", desc: "Business cards, letterheads, brochures, banners, and social media templates. Everything your brand needs to look professional." },
];

const process = [
  { step: "01", title: "Brand Discovery", desc: "We deep-dive into your business, audience, competitors, and aspirations to understand what makes your brand unique in Zimbabwe." },
  { step: "02", title: "Concept Development", desc: "Our designers create multiple brand concepts with mood boards, color explorations, and typography pairings for your review." },
  { step: "03", title: "Design Refinement", desc: "We refine your chosen direction through collaborative feedback rounds until every detail is perfect." },
  { step: "04", title: "Brand Launch", desc: "Final deliverables, brand guidelines, and all file formats. We help you launch your new brand identity across all channels." },
];

const pricing = [
  { name: "Logo Package", price: "From $249", desc: "For startups needing a strong logo", features: ["3 logo concepts", "Unlimited revisions", "All file formats (AI, PNG, SVG, PDF)", "Color & B/W versions", "Social media profile kit", "Copyright ownership"], popular: false },
  { name: "Brand Identity", price: "From $799", desc: "Complete brand identity system", features: ["Logo design (5 concepts)", "Color palette & typography", "Brand guidelines document", "Business card & letterhead", "Social media templates", "Marketing collateral pack"], popular: true },
  { name: "Brand Strategy + Identity", price: "From $1,499", desc: "Full strategic branding", features: ["Brand strategy & positioning", "Market & competitor research", "Complete visual identity", "Comprehensive brand book", "Packaging design", "Brand launch support"], popular: false },
];

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Award-Winning Creative Team</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            <span className="vibrant-gradient-text">Branding</span> & Design Services for Zimbabwe Businesses
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            Your brand is your most valuable asset. We create powerful, memorable brand identities that command respect, build trust, and drive growth for businesses across Harare and Zimbabwe.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Start Your Brand <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20branding%20services" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
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
              { metric: "200+", label: "Brands Created", desc: "For Zimbabwe businesses" },
              { metric: "100%", label: "Ownership Transfer", desc: "You own everything we create" },
              { metric: "4.9", label: "Client Rating", desc: "On design quality" },
              { metric: "48hr", label: "First Concepts", desc: "Fast turnaround guaranteed" },
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

      {/* Services */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Our <span className="vibrant-gradient-text">Branding Services</span></h2>
            <p className="section-subheading mx-auto">Everything your Zimbabwe business needs to build a world-class brand identity.</p>
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
            <h2 className="section-heading mb-4">Our Branding <span className="vibrant-gradient-text">Process</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
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
            <h2 className="section-heading mb-4">Branding <span className="vibrant-gradient-text">Pricing</span> in Zimbabwe</h2>
            <p className="section-subheading mx-auto">Professional branding that fits every budget. No hidden fees.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build a <span className="vibrant-gradient-text">Powerful Brand?</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Let us create a brand identity that makes your Zimbabwe business unforgettable.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Start Branding <ArrowRight size={18} />
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
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Social Media Marketing</Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">SEO Services</Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Google Ads Zimbabwe</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
