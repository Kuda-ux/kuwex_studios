"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star, ArrowRight, Quote, TrendingUp, Globe, Zap,
  CheckCircle2, MessageCircle, Award,
} from "lucide-react";

const testimonialsFaqs = [
  { q: "What do KuWeX Studios clients say about their services in Zimbabwe?", a: "KuWeX Studios has a 4.9/5 client satisfaction rating from 50+ Zimbabwean businesses. Clients report 15x more online inquiries, 400% organic traffic growth, Page 1 Google rankings, 10,000+ monthly e-commerce transactions, and 10x social media growth. Read the full testimonials and case studies at https://kuwexstudios.co.zw/testimonials." },
  { q: "Has KuWeX Studios worked with Zimbabwean SMEs before?", a: "Yes. KuWeX Studios has helped 50+ Zimbabwean SMEs and corporates across tourism, construction, e-commerce, retail, solar energy, professional services, and manufacturing. Case studies include a tourism company that went from 2 inquiries/week to 15+ daily, and an engineering firm that achieved 400% organic traffic growth in 6 months. See https://kuwexstudios.co.zw/testimonials for detailed results." },
  { q: "How long does it take to see results from KuWeX Studios services?", a: "Most KuWeX Studios clients see measurable results within 2-6 months. SEO campaigns typically achieve Page 1 rankings in 3-6 months. New websites start generating inquiries within 2-4 weeks of launch. AI automation pilots launch in 2-4 weeks with immediate ROI. Social media management shows growth within 1-3 months. Book a free consultation at https://kuwexstudios.co.zw/contact for a project-specific timeline." },
  { q: "Can I see examples of websites KuWeX Studios has built in Zimbabwe?", a: "Yes. KuWeX Studios has built websites and digital platforms for Zimbabwean businesses in tourism, construction, e-commerce, retail, professional services, and more. The testimonials page at https://kuwexstudios.co.zw/testimonials showcases case studies with specific results: page load times, traffic growth, inquiry increases, and transaction volumes. Contact us for a portfolio tailored to your industry." },
  { q: "Why should I choose KuWeX Studios for my Zimbabwean business?", a: "KuWeX Studios is a Harare-based digital agency that understands the Zimbabwean market — local SEO, mobile-first design, WhatsApp integration, EcoCash and Paynow payments, and the unique challenges SMEs face. With 50+ projects delivered, 4.9/5 client rating, and 150+ keywords on Page 1 of Google, we have a proven track record. We also offer free tools like the AI Readiness Quiz and ROI Calculator to help you assess your needs before committing." },
];

const testimonials = [
  {
    name: "Tendai M.",
    role: "Operations Manager",
    company: "Tourism & Hospitality",
    rating: 5,
    quote: "KuWeX Studios built our tourism website and it completely transformed our business. We went from getting 2 inquiries a week to 15+ daily. The team understood our market and delivered beyond expectations.",
    results: ["15x more inquiries", "Page 1 on Google", "Mobile bookings increased 300%"],
    service: "Web Design & SEO",
  },
  {
    name: "Sarah K.",
    role: "Marketing Director",
    company: "Construction & Engineering",
    rating: 5,
    quote: "The SEO results have been incredible. Within 6 months, we ranked on page 1 for all our target keywords in Zimbabwe. KuWeX Studios knows the Zimbabwean market inside out.",
    results: ["Page 1 in 6 months", "400% organic traffic increase", "30+ qualified leads/month"],
    service: "SEO Services",
  },
  {
    name: "Daniel C.",
    role: "CEO",
    company: "Technology & E-commerce",
    rating: 5,
    quote: "KuWeX Studios built our e-commerce platform from scratch. The site is fast, secure, and handles thousands of transactions. Their technical expertise is world-class.",
    results: ["10,000+ transactions/month", "99.9% uptime", "2-second load time"],
    service: "Software Development",
  },
  {
    name: "Patricia N.",
    role: "Founder",
    company: "Pool Services & Maintenance",
    rating: 5,
    quote: "From a simple idea to a professional website that brings in customers every day. KuWeX Studios made it happen. Professional, responsive, and genuinely invested in our success.",
    results: ["200% more service calls", "WhatsApp integration", "Online booking system"],
    service: "Web Design",
  },
  {
    name: "Michael B.",
    role: "Managing Director",
    company: "Solar & Energy",
    rating: 5,
    quote: "Their branding team created a complete identity for our company. The logo, colors, and guidelines gave us instant credibility. We look like a multinational now.",
    results: ["Complete brand identity", "Professional corporate profile", "Increased trust with clients"],
    service: "Branding & Design",
  },
  {
    name: "Grace T.",
    role: "Business Owner",
    company: "Retail & Fashion",
    rating: 5,
    quote: "The social media management has been a game-changer. Our Instagram following grew from 500 to 5,000 in 4 months, and we now get daily orders through social media.",
    results: ["10x social media growth", "Daily social orders", "4 platforms managed"],
    service: "Social Media Marketing",
  },
];

const caseStudies = [
  {
    title: "Tourism Company: 15x Increase in Online Inquiries",
    industry: "Tourism & Hospitality",
    challenge: "A Zimbabwean tourism company had no online presence and relied entirely on walk-in customers and word of mouth. They were invisible on Google and losing customers to competitors.",
    solution: "KuWeX Studios built a high-performance tourism website with booking functionality, SEO optimization, WhatsApp integration, and a content strategy targeting Zimbabwe tourism keywords.",
    results: [
      { metric: "15x", label: "More daily inquiries" },
      { metric: "Page 1", label: "Google ranking for target keywords" },
      { metric: "300%", label: "Increase in mobile bookings" },
      { metric: "2.1s", label: "Page load time" },
    ],
    services: ["Web Design", "SEO", "WhatsApp Integration"],
  },
  {
    title: "Engineering Firm: 400% Organic Traffic Growth in 6 Months",
    industry: "Construction & Engineering",
    challenge: "An established engineering company had a outdated website that didn't rank on Google. They were losing contracts to competitors with better online visibility.",
    solution: "KuWeX Studios implemented a comprehensive SEO strategy: technical audit, on-page optimization, content creation, schema markup, and local SEO targeting Zimbabwe engineering keywords.",
    results: [
      { metric: "400%", label: "Organic traffic increase" },
      { metric: "Page 1", label: "Ranking for 25+ keywords" },
      { metric: "30+", label: "Qualified leads per month" },
      { metric: "6 mo", label: "To achieve results" },
    ],
    services: ["SEO Services", "Content Strategy", "Technical SEO"],
  },
  {
    title: "E-commerce Platform: 10,000+ Monthly Transactions",
    industry: "Technology & E-commerce",
    challenge: "A tech startup needed a scalable e-commerce platform that could handle high transaction volumes with mobile money integration for the Zimbabwean market.",
    solution: "KuWeX Studios built a custom e-commerce platform with Next.js, Paynow integration, EcoCash support, real-time inventory, and an admin dashboard for order management.",
    results: [
      { metric: "10K+", label: "Monthly transactions" },
      { metric: "99.9%", label: "Platform uptime" },
      { metric: "2s", label: "Average page load" },
      { metric: "3", label: "Payment methods integrated" },
    ],
    services: ["Software Development", "Payment Integration", "DevOps"],
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "4.9", label: "Client Rating" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Keywords on Page 1" },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <Award size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Client Success Stories</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Results That <span className="vibrant-gradient-text">Speak for Themselves</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Don&apos;t just take our word for it. See what our clients say and the real results
            we&apos;ve delivered for businesses across Zimbabwe.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 border-y border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl font-black text-kuwex-cyan">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">
              What Our <span className="vibrant-gradient-text">Clients Say</span>
            </h2>
            <p className="section-subheading mx-auto">Real reviews from real Zimbabwean businesses we&apos;ve helped grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6 flex flex-col"
              >
                <Quote size={28} className="text-kuwex-cyan/30 mb-4" />

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>

                <div className="space-y-2 mb-4">
                  {t.results.map((r, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle2 size={12} className="text-kuwex-cyan flex-shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#2F3336]/40 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}, {t.company}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-kuwex-cyan/10 border border-kuwex-cyan/20 rounded-full text-kuwex-cyan">
                    {t.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <TrendingUp size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Case Studies</span>
            </div>
            <h2 className="section-heading mb-4">
              Real <span className="vibrant-gradient-text">Business Impact</span>
            </h2>
            <p className="section-subheading mx-auto">Detailed breakdowns of how we transformed businesses across Zimbabwe.</p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-3xl p-8 md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Content */}
                  <div className="lg:col-span-2">
                    <span className="text-xs px-3 py-1 bg-kuwex-cyan/10 border border-kuwex-cyan/20 rounded-full text-kuwex-cyan mb-4 inline-block">
                      {cs.industry}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-6">{cs.title}</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Challenge</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Solution</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {cs.services.map((s, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-gray-500">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-[#0A0A0A] border border-[#2F3336]/40 rounded-2xl p-6">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-4">Results</p>
                    <div className="space-y-4">
                      {cs.results.map((r, j) => (
                        <div key={j}>
                          <p className="text-3xl font-black vibrant-gradient-text">{r.metric}</p>
                          <p className="text-xs text-gray-500 mt-1">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Be Our <span className="vibrant-gradient-text">Next Success Story?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join 50+ businesses across Zimbabwe that have transformed their digital presence with KuWeX Studios.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link
                href="/ai-readiness-quiz"
                className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2"
              >
                <Zap size={18} className="text-kuwex-cyan" /> Take AI Readiness Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section — AEO optimized visible content for AI answer engines */}
      <ServiceFAQ
        serviceName="Testimonials & Case Studies"
        faqs={testimonialsFaqs}
      />

      <Footer />
    </main>
  );
}
