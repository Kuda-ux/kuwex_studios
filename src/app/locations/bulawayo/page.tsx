"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MapPin, ArrowRight, CheckCircle2, MessageCircle, Code2, Search, Megaphone, Palette, BarChart3, Phone, Mail, Building2, Globe, ChevronDown, Zap, TrendingUp, Users, Shield } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Design & Development in Bulawayo",
    desc: "Custom, mobile-first websites built specifically for Bulawayo businesses. We design for Zimbabwe's internet infrastructure — fast-loading pages, EcoCash-ready payment integration, and Google-optimised structure. Every website we build for Bulawayo clients is designed to convert visitors into paying customers.",
    link: "/services/web-design",
  },
  {
    icon: Search,
    title: "SEO Services for Bulawayo Businesses",
    desc: "Appear at the top of Google when customers in Bulawayo search for your services. We use proven local SEO strategies: Google Business Profile optimisation, Bulawayo-specific keyword targeting, on-page SEO, and local citation building across Zimbabwe's top business directories.",
    link: "/services/seo-services",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing Bulawayo",
    desc: "Professional Facebook, Instagram, and LinkedIn management for Bulawayo businesses. We create content that resonates with Matabeleland audiences, run targeted paid ad campaigns, and build genuine communities around your brand. More followers, more engagement, more customers.",
    link: "/services/social-media-marketing",
  },
  {
    icon: BarChart3,
    title: "Google Ads Management Bulawayo",
    desc: "Get instant visibility on Google for searches like 'best accountant Bulawayo' or 'web design near me.' Our Google Ads campaigns are laser-targeted to Bulawayo and Matabeleland North and South, ensuring your budget reaches real, high-intent customers — not wasted clicks.",
    link: "/services/google-ads",
  },
  {
    icon: Palette,
    title: "Branding & Logo Design Bulawayo",
    desc: "Build a Bulawayo brand that commands respect and recognition. From logo design and colour palettes to complete brand identity systems and marketing materials, we help Bulawayo businesses look professional, consistent, and credible across every platform.",
    link: "/services/branding",
  },
  {
    icon: Globe,
    title: "Digital Strategy Consulting",
    desc: "Not sure where to start? We audit your current digital presence and build a prioritised roadmap for Bulawayo market growth. From website gaps and SEO opportunities to social media strategy and Google Ads budgeting — we give you a clear, affordable plan of action.",
    link: "/contact",
  },
];

const industries = [
  { name: "Manufacturing & Industry", desc: "Bulawayo is Zimbabwe's industrial capital. We help manufacturers, engineering firms, and industrial suppliers build professional online presences that attract B2B clients nationally and internationally." },
  { name: "Retail & Wholesale", desc: "From small shops along Jason Moyo Avenue to large wholesalers in Belmont Industrial, we help Bulawayo retailers reach more customers online, manage their social media, and drive foot traffic through local SEO." },
  { name: "Hospitality & Tourism", desc: "Bulawayo is the gateway to Victoria Falls, Hwange, and Matobo Hills. We help hotels, lodges, and tour operators get found by both domestic and international tourists searching online." },
  { name: "Professional Services", desc: "Lawyers, accountants, consultants, and financial advisors in Bulawayo trust us to build credibility online. A professional website and strong Google presence are non-negotiable for winning new clients in your field." },
  { name: "Healthcare & Wellness", desc: "Private clinics, dental practices, pharmacies, and wellness centres in Bulawayo benefit enormously from local SEO and a well-designed appointment booking system online." },
  { name: "Education & Training", desc: "From private schools in Suburbs and Hillside to vocational training centres in the CBD, we help Bulawayo education institutions attract more enrolments through professional websites and targeted digital marketing." },
];

const reasons = [
  { icon: Zap, title: "Deep Understanding of Bulawayo's Market", desc: "Bulawayo is not Harare. The city has its own business culture, consumer behaviour, and competitive landscape. We understand Matabeleland's economy — manufacturing, tourism, retail, and professional services — and tailor our strategies accordingly." },
  { icon: TrendingUp, title: "Remote-First, Real Results", desc: "Our entire team works remotely across Zimbabwe, meaning Bulawayo clients get the same quality of service as our Harare clients — without travel costs or time delays. We deliver via WhatsApp, video call, and our project dashboard." },
  { icon: Shield, title: "Transparent Pricing, No Surprises", desc: "We quote in USD and stick to it. No hidden fees, no scope creep charges without discussion. Our packages start from $249 and scale to meet the needs of Bulawayo's largest businesses." },
  { icon: Users, title: "Long-Term Partnership, Not One-Off Projects", desc: "We are not interested in building a website and disappearing. We offer ongoing SEO, content, and support packages because we know that sustainable digital growth requires consistent effort over 6 to 24 months." },
];

const process = [
  { step: "01", title: "Free Discovery Call", desc: "We start with a 30-minute call or WhatsApp conversation to understand your Bulawayo business, your target customers, your current digital presence, and your goals." },
  { step: "02", title: "Proposal & Quote", desc: "Within 48 hours, we send a detailed proposal with a clear scope of work, timeline, and transparent pricing. No vague estimates — you know exactly what you are paying for." },
  { step: "03", title: "Design & Development", desc: "We get to work. You receive progress updates at every milestone via WhatsApp or email. We include you in decisions and keep revisions open until you are fully satisfied." },
  { step: "04", title: "Launch & Handover", desc: "We launch your website or campaign and walk you through everything. For ongoing clients, we send monthly performance reports showing traffic, rankings, and leads generated." },
];

const faqs = [
  { q: "Do you work with businesses based in Bulawayo even though you are based in Harare?", a: "Yes, absolutely. We work remotely with clients all across Zimbabwe. All consultations are done via WhatsApp or video call, and we deliver every project digitally. The quality of work is identical whether you are in Bulawayo, Harare, or Gweru." },
  { q: "How much does a website cost for a Bulawayo business?", a: "Our websites for Bulawayo businesses start from $800 for a professional 5-page site and go up to $3,500+ for e-commerce or custom web applications. We offer flexible payment plans, including EcoCash and bank transfer options. We will always give you a fixed quote before starting." },
  { q: "How long does it take to see results from SEO in Bulawayo?", a: "Local SEO in Bulawayo typically shows meaningful improvements within 3 to 4 months. You will begin seeing movement in Google rankings, increased website traffic, and more enquiries. Competitive industries may take 6 months. We provide monthly progress reports throughout." },
  { q: "Which industries in Bulawayo do you have the most experience with?", a: "We have worked with businesses across Bulawayo's key industries: manufacturing, professional services (law, accounting, consulting), healthcare, retail, hospitality, and education. Bulawayo's industrial heritage means we understand B2B marketing as well as consumer-facing campaigns." },
  { q: "Can you manage our Facebook and Instagram pages from Harare?", a: "Yes. We manage social media for businesses throughout Zimbabwe remotely. We create content, schedule posts, run paid campaigns, and respond to comments — all without needing to be in Bulawayo. We do request high-quality photos and videos of your business to use in content." },
  { q: "What payment methods do you accept for Bulawayo clients?", a: "We accept USD bank transfer (CABS, CBZ, Stanbic), EcoCash Business, Innbucks, and Paynow. We always provide a formal invoice before payment and a receipt afterwards." },
];

export default function BulawayoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            Best <span className="vibrant-gradient-text">Digital Marketing Agency</span> & Web Design for <span className="vibrant-gradient-text">Bulawayo</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10">
            KuWeX Studios helps Bulawayo businesses get found on Google, build professional websites, and grow through targeted digital marketing. Whether you are in the Bulawayo CBD, Suburbs, Hillside, or Belmont — we deliver results that matter to your bottom line.
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

      {/* Stats */}
      <section className="py-12 px-4 border-y border-[#2F3336]/40 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "3–4 mo", label: "Average time to rank on Google" },
              { value: "$249+", label: "Packages starting from" },
              { value: "48 hrs", label: "Proposal turnaround" },
              { value: "100%", label: "Remote service, nationwide" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-2xl md:text-3xl font-bold vibrant-gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Digital Services for <span className="vibrant-gradient-text">Bulawayo Businesses</span></h2>
            <p className="section-subheading mx-auto">Full-service digital marketing and web design solutions tailored to Bulawayo&apos;s business community and Matabeleland&apos;s unique market.</p>
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
            <h2 className="section-heading mb-4">Industries We Serve in <span className="vibrant-gradient-text">Bulawayo</span></h2>
            <p className="section-subheading mx-auto">Bulawayo is Zimbabwe&apos;s industrial and commercial heartland. We understand its industries, its people, and its unique business dynamics.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-6">
                <div className="w-2 h-2 rounded-full bg-kuwex-cyan mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KuWeX */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Why Bulawayo Businesses <span className="vibrant-gradient-text">Choose KuWeX Studios</span></h2>
            <p className="section-subheading mx-auto">We are not a generic agency. We understand Zimbabwe&apos;s market, Bulawayo&apos;s industries, and the real challenges businesses face in getting online.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-7">
                <div className="w-10 h-10 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">How We Work With <span className="vibrant-gradient-text">Bulawayo Clients</span></h2>
            <p className="section-subheading mx-auto">A clear, simple process with no surprises — from first contact to launch and beyond.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black vibrant-gradient-text mb-4">{step.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">Frequently Asked Questions — <span className="vibrant-gradient-text">Bulawayo</span></h2>
            <p className="section-subheading mx-auto">Common questions from Bulawayo business owners about digital marketing and web design.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-[#16181C]/80 border border-[#2F3336]/60 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left gap-4">
                  <span className="font-semibold text-white text-sm md:text-base">{faq.q}</span>
                  <ChevronDown size={18} className={`text-kuwex-cyan shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-16 px-4 bg-[#0A0A0A] border-y border-[#2F3336]/40">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Phone size={20} className="text-kuwex-cyan" />
              <p className="text-gray-400 text-sm">Call or WhatsApp</p>
              <a href="tel:+263719066891" className="text-white font-semibold hover:text-kuwex-cyan transition-colors">+263 719 066 891</a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail size={20} className="text-kuwex-cyan" />
              <p className="text-gray-400 text-sm">Email Us</p>
              <a href="mailto:projects@kuwex.co" className="text-white font-semibold hover:text-kuwex-cyan transition-colors">projects@kuwex.co</a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Building2 size={20} className="text-kuwex-cyan" />
              <p className="text-gray-400 text-sm">Serving</p>
              <span className="text-white font-semibold">Bulawayo & All of Zimbabwe</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your <span className="vibrant-gradient-text">Bulawayo Business</span> Online?</h2>
            <p className="text-gray-400 text-lg mb-3 max-w-2xl mx-auto">Tell us about your business and we will send you a free, no-obligation digital marketing proposal within 48 hours.</p>
            <p className="text-gray-500 text-sm mb-10">Serving Bulawayo CBD, Suburbs, Hillside, Belmont, Famona, Waterford, Luveve, Nkulumane, and all of Matabeleland.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
                Get Your Free Proposal <ArrowRight size={18} />
              </Link>
              <a href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%27m%20a%20business%20in%20Bulawayo%20and%20need%20digital%20marketing%20services" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2">
                <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Now
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8">
              <Link href="/locations/harare" className="text-sm text-gray-500 hover:text-kuwex-cyan transition-colors">→ Harare Services</Link>
              <Link href="/locations/zimbabwe" className="text-sm text-gray-500 hover:text-kuwex-cyan transition-colors">→ Nationwide Services</Link>
              <Link href="/services" className="text-sm text-gray-500 hover:text-kuwex-cyan transition-colors">→ All Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
