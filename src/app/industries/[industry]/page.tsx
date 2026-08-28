"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plane, Home, Mountain, Wheat, HeartPulse, ShoppingCart,
  HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake,
  Truck, UtensilsCrossed, ArrowRight, CheckCircle2, AlertTriangle,
  Lightbulb, TrendingUp, Star, MessageCircle, Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { industries } from "@/lib/industries";

const iconMap: Record<string, LucideIcon> = {
  Plane, Home, Mountain, Wheat, HeartPulse, ShoppingCart,
  HardHat, GraduationCap, Landmark, Scale, Factory, HeartHandshake,
  Truck, UtensilsCrossed,
};

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const data = industries.find((i) => i.slug === params.industry);
  if (!data) return null;

  const Icon = iconMap[data.icon] || TrendingUp;
  const otherIndustries = industries.filter((i) => i.slug !== data.slug).slice(0, 4);

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
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-kuwex-cyan transition-colors">Home</Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-kuwex-cyan transition-colors">Industries</Link>
              <span>/</span>
              <span className="text-gray-400">{data.shortName}</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-kuwex-cyan/10 border border-kuwex-cyan/20 flex items-center justify-center">
                <Icon size={28} className="text-kuwex-cyan" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/20">
                  <span className="text-xs font-medium text-kuwex-cyan">{data.tagline}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
              >
                Get a Free Consultation
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/263719066891"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="py-8 px-4 border-y border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold vibrant-gradient-text mb-1">
                  {result.metric}
                </div>
                <div className="text-xs md:text-sm text-gray-500">{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kuwex-red/10 border border-kuwex-red/20 mb-4">
              <AlertTriangle size={16} className="text-kuwex-red" />
              <span className="text-sm font-medium text-kuwex-red">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Challenges Facing {data.name} in Zimbabwe
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We understand the unique obstacles your industry faces in the Zimbabwean market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="x-card rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-kuwex-red/10 border border-kuwex-red/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={20} className="text-kuwex-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/20 mb-4">
              <Lightbulb size={16} className="text-kuwex-cyan" />
              <span className="text-sm font-medium text-kuwex-cyan">The Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How KuWeX Studios Helps {data.shortName} Businesses
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Industry-specific digital solutions designed for the Zimbabwean market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="x-card rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 border border-kuwex-cyan/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} className="text-kuwex-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{solution.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Services for {data.name}
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {data.services.map((service) => (
              <Link
                key={service}
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl x-card hover:border-kuwex-cyan/40 transition-all"
              >
                <span className="text-white font-medium">{service}</span>
                <ArrowRight size={16} className="text-kuwex-cyan" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="x-card rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Trusted by 50+ Zimbabwean Businesses
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              From startups to established enterprises, we've helped businesses across Zimbabwe
              build powerful digital presences. Our clients see real results — more traffic,
              more leads, more revenue.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>50+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>4.9★ Client Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>98% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-kuwex-cyan" />
                <span>150+ Keywords on Page 1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFAQ serviceName={data.name} faqs={data.faqs} />

      {/* CTA */}
      <section className="py-20 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your <span className="vibrant-gradient-text">{data.shortName}</span> Business?
            </h2>
            <p className="text-gray-400 mb-8">
              Get a free consultation today. We'll analyze your current digital presence and
              create a custom strategy for your {data.shortName.toLowerCase()} business in Zimbabwe.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
              >
                Get a Free Quote
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+263719066891"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-300 border border-[#2F3336] hover:border-kuwex-cyan/40 transition-colors"
              >
                <Phone size={18} className="text-kuwex-cyan" />
                +263 719 066 891
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Other Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherIndustries.map((ind) => {
              const OtherIcon = iconMap[ind.icon] || TrendingUp;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl x-card hover:border-kuwex-cyan/40 transition-all"
                >
                  <OtherIcon size={24} className="text-gray-500 group-hover:text-kuwex-cyan transition-colors" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors text-center">
                    {ind.shortName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
