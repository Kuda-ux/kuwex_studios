"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, MessageCircle, Code2, Search, Megaphone, Palette, BarChart3, Phone, Mail, Building2 } from "lucide-react";

const services = [
  { icon: Code2, title: "Web Design & Development", desc: "Custom, mobile-first websites for Bulawayo businesses. Fast, secure, and built to convert visitors into customers.", link: "/services/web-design" },
  { icon: Search, title: "SEO Services", desc: "Rank higher on Google for Bulawayo-specific searches. Local SEO that drives foot traffic and online leads.", link: "/services/seo-services" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Engage Bulawayo's growing social media audience with professional content creation and targeted advertising.", link: "/services/social-media-marketing" },
  { icon: BarChart3, title: "Google Ads", desc: "Targeted PPC campaigns reaching customers actively searching for your services in Bulawayo and Matabeleland.", link: "/services/google-ads" },
  { icon: Palette, title: "Branding & Design", desc: "Professional brand identity, logo design, and marketing materials for Bulawayo businesses of all sizes.", link: "/services/branding" },
];

export default function BulawayoPage() {
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
            <span className="text-sm text-gray-400">Bulawayo, Zimbabwe</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center">
            <span className="vibrant-gradient-text">Digital Marketing</span> & Web Design for <span className="vibrant-gradient-text">Bulawayo</span> Businesses
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            KuWeX Studios brings world-class digital marketing and web design to Bulawayo. Whether you&apos;re a startup in the city centre or an established business in the suburbs, we help you grow your online presence and generate more customers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%27m%20a%20business%20in%20Bulawayo%20and%20need%20your%20services" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Services in <span className="vibrant-gradient-text">Bulawayo</span></h2>
            <p className="section-subheading mx-auto">Full-service digital solutions for Bulawayo&apos;s growing business community.</p>
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

      {/* Why Bulawayo */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Why Bulawayo Businesses <span className="vibrant-gradient-text">Trust KuWeX</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "We Understand Bulawayo", desc: "Zimbabwe's second city has unique business dynamics. We tailor our strategies to Bulawayo's market, audience, and competitive landscape." },
              { title: "Remote-First Service", desc: "Work with Zimbabwe's top digital agency without geographical limits. Video consultations, real-time project dashboards, and instant communication." },
              { title: "Affordable Packages", desc: "Premium quality at prices that work for Bulawayo businesses. Our packages start from just $249 with flexible payment options." },
              { title: "Proven Track Record", desc: "We've helped businesses across Zimbabwe grow their online presence. Our strategies deliver measurable results — more traffic, leads, and revenue." },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Grow Your <span className="vibrant-gradient-text">Bulawayo Business</span> Online</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Join Bulawayo businesses that trust KuWeX Studios for their digital growth.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Start Today <ArrowRight size={18} />
              </Link>
              <Link href="/locations/harare" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Harare Office</Link>
              <Link href="/locations/zimbabwe" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">Nationwide Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
