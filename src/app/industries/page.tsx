"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plane, Home, Mountain, Wheat, HeartPulse, ShoppingCart,
  HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake,
  Truck, UtensilsCrossed, ArrowRight, CheckCircle2, TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { industries } from "@/lib/industries";

const iconMap: Record<string, LucideIcon> = {
  Plane, Home, Mountain, Wheat, HeartPulse, ShoppingCart,
  HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake,
  Truck, UtensilsCrossed,
};

const whyIndustrySpecific = [
  { title: "Industry-Specific Keywords", desc: "We target the exact search terms your customers use — \"lodges in Victoria Falls\", \"property for sale Harare\", \"mining companies Zimbabwe\"." },
  { title: "Sector-Relevant Solutions", desc: "Tourism needs booking systems. Real estate needs listing CMS. Mining needs investor portals. We build what your industry actually needs." },
  { title: "Competitor Analysis", desc: "We analyze what's working for your competitors in your specific industry and build a strategy to outrank them." },
  { title: "Local Market Understanding", desc: "We know Zimbabwean business practices — EcoCash, WhatsApp, Paynow, local regulations, and customer behavior patterns." },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-kuwex-cyan/5 via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/20 mb-6">
              <TrendingUp size={16} className="text-kuwex-cyan" />
              <span className="text-sm font-medium text-kuwex-cyan">Industry-Specific Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital Marketing for{" "}
              <span className="vibrant-gradient-text">Every Zimbabwean Industry</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              We don't believe in one-size-fits-all. Every industry in Zimbabwe has unique challenges,
              customer behaviors, and search patterns. We build <span className="text-white font-semibold">industry-specific</span> websites,
              SEO strategies, and digital marketing campaigns that get results.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>12+ Industries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>50+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>4.9★ Client Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>Zimbabwe-Focused</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const Icon = iconMap[industry.icon] || TrendingUp;
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group block h-full x-card rounded-2xl p-6 hover:border-kuwex-cyan/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-kuwex-cyan/10 border border-kuwex-cyan/20 flex items-center justify-center group-hover:bg-kuwex-cyan/20 transition-colors">
                        <Icon size={24} className="text-kuwex-cyan" />
                      </div>
                      <ArrowRight size={20} className="text-gray-600 group-hover:text-kuwex-cyan group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-kuwex-cyan transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {industry.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {industry.services.slice(0, 3).map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry-Specific */}
      <section className="py-20 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why <span className="vibrant-gradient-text">Industry-Specific</span> Digital Marketing?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Generic digital marketing agencies give you the same strategy as every other business.
              We customize everything to your industry's unique needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyIndustrySpecific.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="x-card rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See Your <span className="vibrant-gradient-text">Industry?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              We work with businesses across all sectors in Zimbabwe. Contact us for a free consultation
              and we'll create a custom digital strategy for your industry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
              >
                Get a Free Consultation
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-300 border border-[#2F3336] hover:border-kuwex-cyan/40 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
