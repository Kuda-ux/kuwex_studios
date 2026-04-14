"use client";

import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Zap,
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Star,
  Globe,
  Code2,
  Palette,
  Gauge,
  MessageCircle,
} from "lucide-react";

const features = [
  { icon: Monitor, title: "Responsive Design", desc: "Websites that look stunning on every device — desktop, tablet, and mobile. Zimbabwe's mobile-first audience demands it." },
  { icon: Zap, title: "Lightning-Fast Performance", desc: "Sub-2-second load times optimized for Zimbabwe's internet infrastructure. Speed converts visitors into customers." },
  { icon: Search, title: "SEO-Ready Architecture", desc: "Every website we build is structured for Google dominance — clean code, proper headings, schema markup, and fast indexing." },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "SSL certificates, regular backups, and enterprise-grade hosting. Your business website stays online 24/7." },
  { icon: Code2, title: "Custom Development", desc: "No cookie-cutter templates. We build custom solutions with React, Next.js, and modern frameworks tailored to your business." },
  { icon: Palette, title: "Brand-Aligned Design", desc: "Every pixel reflects your brand identity. We design websites that build trust and convert visitors in Zimbabwe and beyond." },
];

const process = [
  { step: "01", title: "Discovery & Strategy", desc: "We analyze your business, competitors, and target audience in Zimbabwe to create a winning web strategy." },
  { step: "02", title: "UI/UX Design", desc: "Wire-framing and prototyping a conversion-optimized design that resonates with your Zimbabwean and African audience." },
  { step: "03", title: "Development & Testing", desc: "Custom coding with modern frameworks, thorough testing across devices, and performance optimization." },
  { step: "04", title: "Launch & Growth", desc: "We deploy your site, set up analytics, submit to Google, and provide ongoing support to fuel your growth." },
];

const pricing = [
  { name: "Starter Website", price: "From $499", desc: "Perfect for small businesses and startups in Zimbabwe", features: ["5-page responsive website", "Mobile-optimized design", "Basic SEO setup", "Contact form integration", "SSL certificate", "3 months support"] },
  { name: "Business Website", price: "From $999", desc: "Ideal for growing SMEs and established businesses", features: ["10+ page custom website", "Advanced UI/UX design", "Full SEO optimization", "CMS integration", "WhatsApp & social integration", "6 months support"], popular: true },
  { name: "Enterprise Solution", price: "Custom", desc: "For corporates, NGOs, and government institutions", features: ["Unlimited pages", "Custom web application", "E-commerce capability", "API integrations", "Dedicated project manager", "12 months support"] },
];

export default function WebDesignPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">#1 Web Design Company in Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center"
          >
            Professional <span className="vibrant-gradient-text">Web Design</span> &{" "}
            <span className="vibrant-gradient-text">Development</span> in Zimbabwe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10"
          >
            We build high-performance, conversion-focused websites for businesses across Harare and Zimbabwe. 
            From stunning landing pages to complex web applications — your digital presence starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
            >
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20a%20website%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-4 border-y border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">150+</p>
              <p className="text-sm text-gray-500">Websites Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">4.9</p>
              <p className="text-sm text-gray-500">Client Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">98%</p>
              <p className="text-sm text-gray-500">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">48hr</p>
              <p className="text-sm text-gray-500">Average Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Globe size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Why KuWeX Studios</span>
            </div>
            <h2 className="section-heading mb-4">
              Why Zimbabwe&apos;s Top Businesses Choose <span className="vibrant-gradient-text">Our Web Design</span>
            </h2>
            <p className="section-subheading mx-auto">
              We don&apos;t just build websites — we engineer digital experiences that drive revenue for businesses across Zimbabwe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <feature.icon size={24} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Our Web Design <span className="vibrant-gradient-text">Process</span>
            </h2>
            <p className="section-subheading mx-auto">From concept to launch — a proven 4-step process that delivers results.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
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
            <h2 className="section-heading mb-4">
              Website Design <span className="vibrant-gradient-text">Pricing</span> in Zimbabwe
            </h2>
            <p className="section-subheading mx-auto">Transparent, affordable pricing for every business size. No hidden fees.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-kuwex-cyan/10 to-transparent border-2 border-kuwex-cyan/30"
                    : "x-card-vibrant"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full text-xs font-bold text-black">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold vibrant-gradient-text mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-kuwex-cyan flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                      : "border border-[#2F3336] text-white hover:border-kuwex-cyan/50"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Web Design <span className="vibrant-gradient-text">FAQ</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "How much does a website cost in Zimbabwe?", a: "Our websites start from $499 for a basic 5-page site, $999+ for business websites, and custom pricing for enterprise solutions. We offer the best value for professional web design in Harare and across Zimbabwe." },
              { q: "How long does it take to build a website?", a: "A standard business website takes 2-4 weeks. Complex web applications can take 6-12 weeks. We provide a detailed timeline during our free consultation." },
              { q: "Do you provide website hosting?", a: "Yes, we offer reliable hosting solutions optimized for Zimbabwe's internet infrastructure. Our hosting includes SSL, daily backups, and 99.9% uptime guarantee." },
              { q: "Can you redesign my existing website?", a: "Absolutely. We specialize in website redesigns that improve both aesthetics and performance. Many Zimbabwe businesses have seen 200%+ improvement in leads after our redesigns." },
              { q: "Do you build e-commerce websites?", a: "Yes, we build custom e-commerce solutions for Zimbabwe businesses. From simple online stores to complex marketplaces with EcoCash and mobile money integration." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#16181C]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your <span className="vibrant-gradient-text">Dream Website?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join 150+ Zimbabwe businesses who trust KuWeX Studios for world-class web design. Get your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-lg font-semibold text-white mb-6">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              SEO Services Zimbabwe
            </Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Branding & Design
            </Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Google Ads Zimbabwe
            </Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Social Media Marketing
            </Link>
            <Link href="/locations/harare" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Web Design Harare
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
