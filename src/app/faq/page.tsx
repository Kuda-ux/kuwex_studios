"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    category: "Services & Pricing",
    questions: [
      {
        q: "How much does a website cost in Zimbabwe?",
        a: "Website costs in Zimbabwe range from $500 for a basic business website to $5,000+ for complex e-commerce or custom web applications. At KuWeX Studios, we offer transparent pricing: Basic websites start at $800, professional business sites at $1,500, and e-commerce from $2,500. All packages include mobile optimization, SEO setup, and 30 days support."
      },
      {
        q: "What digital marketing services do you offer?",
        a: "We offer comprehensive digital marketing services including: SEO (Search Engine Optimization), Google Ads management, social media marketing (Facebook, Instagram, LinkedIn), content marketing, email marketing, branding & graphic design, and web analytics. All services are tailored for the Zimbabwe market."
      },
      {
        q: "Do you work with NGOs and government organizations?",
        a: "Yes! We have extensive experience working with NGOs, government departments, and international organizations in Zimbabwe. We understand compliance requirements, donor reporting needs, and budget constraints. We offer special pricing for registered NGOs and can work with procurement processes."
      },
      {
        q: "How long does it take to build a website?",
        a: "Timeline depends on complexity: Basic websites (5-7 pages) take 2-3 weeks. Professional business sites (10-15 pages) take 3-4 weeks. E-commerce sites take 4-6 weeks. Custom web applications take 6-12 weeks. We provide detailed timelines during consultation."
      },
      {
        q: "Do you offer website maintenance and support?",
        a: "Yes. All websites include 30 days of free post-launch support. After that, we offer monthly maintenance packages starting at $50/month including: content updates, security monitoring, backups, performance optimization, and technical support."
      }
    ]
  },
  {
    category: "SEO & Digital Marketing",
    questions: [
      {
        q: "How long does SEO take to show results in Zimbabwe?",
        a: "SEO typically shows initial results in 3-6 months for Zimbabwe-focused keywords. You'll see improvements in Google rankings, organic traffic, and inquiries. Competitive keywords may take 6-12 months. We provide monthly reports showing progress in rankings, traffic, and conversions."
      },
      {
        q: "Can you guarantee first page Google rankings?",
        a: "While we can't ethically guarantee specific rankings (Google's algorithm changes constantly), we CAN guarantee: proper SEO implementation, quality content creation, technical optimization, and measurable traffic growth. 90% of our clients reach page 1 for their target keywords within 6 months."
      },
      {
        q: "How much should I budget for Google Ads in Zimbabwe?",
        a: "Minimum recommended budget is $300-500/month for Google Ads in Zimbabwe. This allows for meaningful testing and optimization. Most of our clients see positive ROI at $500-1,000/month. We manage campaigns, write ads, optimize for conversions, and provide detailed reporting."
      },
      {
        q: "Do you manage social media accounts?",
        a: "Yes. Our social media management includes: content calendar creation, daily posting, graphic design, community management, paid advertising, and monthly analytics. Packages start at $250/month for 2 platforms (Facebook + Instagram or LinkedIn)."
      }
    ]
  },
  {
    category: "Technical & Process",
    questions: [
      {
        q: "What technology do you use to build websites?",
        a: "We use modern, cutting-edge technology: Next.js 14 (React framework), TypeScript, Tailwind CSS, and deploy on global CDN networks (Vercel/Netlify). This ensures your website is fast, secure, mobile-optimized, and ranks well on Google. Unlike WordPress sites, our sites load in under 2 seconds globally."
      },
      {
        q: "Will I be able to update my website myself?",
        a: "Yes. We provide: easy-to-use content management system (CMS), training videos, written documentation, and live training session. For clients who prefer hands-off, we offer content update services at $30/hour or monthly retainers."
      },
      {
        q: "Do you provide hosting?",
        a: "Yes. We offer premium hosting on global infrastructure (not shared Zimbabwe hosting). Benefits: 99.9% uptime, automatic backups, SSL certificates, CDN (fast loading worldwide), DDoS protection. Hosting starts at $20/month."
      },
      {
        q: "Can you redesign my existing website?",
        a: "Absolutely. We specialize in website redesigns and migrations. We'll: audit your current site, preserve SEO rankings, improve design and user experience, migrate content, set up proper redirects, and ensure zero downtime. Redesigns start at $1,200."
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes. We offer flexible payment options: 50% deposit + 50% on completion (standard), or 3-month payment plans for projects over $2,000. We accept: bank transfer, EcoCash, USD cash, and international payments via PayPal/Wise."
      }
    ]
  },
  {
    category: "Results & ROI",
    questions: [
      {
        q: "What results can I expect from digital marketing?",
        a: "Results vary by industry and budget, but typical outcomes include: 200-400% increase in website traffic, 50-150% increase in qualified leads, improved Google rankings (page 1 for target keywords), higher social media engagement, and measurable ROI. We provide monthly reports with clear metrics."
      },
      {
        q: "How do you measure success?",
        a: "We track: website traffic (Google Analytics), keyword rankings (SEMrush), conversion rates (form submissions, calls, WhatsApp), social media engagement, ad performance (CTR, CPC, ROAS), and ultimately - revenue generated. Every client gets a custom dashboard showing real-time performance."
      },
      {
        q: "Do you work with small businesses or only large companies?",
        a: "We work with businesses of all sizes! From solo entrepreneurs to large corporations and NGOs. We have packages designed for startups ($800-2,000), growing SMEs ($2,000-5,000), and enterprise clients ($5,000+). Every business deserves professional digital presence."
      }
    ]
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.flatMap(category => 
    category.questions.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  )
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="vibrant-badge mx-auto mb-6">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full" />
              <span className="text-sm text-gray-400">Got Questions?</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Frequently Asked <span className="vibrant-gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about our web design, SEO, and digital marketing services in Zimbabwe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-kuwex-cyan to-kuwex-blue rounded-full" />
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const faqId = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === faqId;
                  
                  return (
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: qIndex * 0.05 }}
                      className="x-card-vibrant rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faqId)}
                        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors duration-300"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">{faq.q}</h3>
                        <ChevronDown
                          size={24}
                          className={`flex-shrink-0 text-kuwex-cyan transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-400 leading-relaxed border-t border-[#2F3336]/30 pt-4">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Still have questions?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              We're here to help. Get in touch and we'll respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/263719066891"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#2F3336] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
              >
                <Mail size={20} />
                Email Us
              </Link>
              <a
                href="tel:+263719066891"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
