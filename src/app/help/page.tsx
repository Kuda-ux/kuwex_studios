"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Search, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, 
  FileText, CreditCard, Settings, Users, Rocket, Shield
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { icon: Rocket, title: "Getting Started", desc: "New to KuWeX? Start here", count: 8 },
  { icon: FileText, title: "Projects & Services", desc: "Learn about our process", count: 12 },
  { icon: CreditCard, title: "Billing & Payments", desc: "Invoices and payment info", count: 6 },
  { icon: Settings, title: "Technical Support", desc: "Troubleshooting guides", count: 10 },
  { icon: Users, title: "Account Management", desc: "Manage your account", count: 5 },
  { icon: Shield, title: "Security & Privacy", desc: "Keep your data safe", count: 7 },
];

const faqs = [
  {
    question: "How do I start a project with KuWeX Studios?",
    answer: "Starting a project is easy! Simply visit our Contact page and fill out the project inquiry form. Our team will review your requirements and get back to you within 24 hours to schedule a consultation call."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 2-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes! We offer comprehensive maintenance and support packages for all our projects. This includes regular updates, security patches, performance monitoring, and priority support for any issues that arise."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, mobile money (EcoCash, OneMoney), and international payments via PayPal and Wise. We typically require a 50% deposit to begin work, with the balance due upon project completion."
  },
  {
    question: "Can I request changes during the project?",
    answer: "Absolutely! We follow an agile approach that allows for feedback and revisions throughout the project. Minor changes are typically included, while significant scope changes may require a change order."
  },
  {
    question: "Do you sign NDAs and confidentiality agreements?",
    answer: "Yes, we take confidentiality seriously. We're happy to sign NDAs before discussing your project details. All client information and project data are handled with strict confidentiality."
  },
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">We&apos;re Here to Help</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Help <span className="text-kuwex-cyan">Center</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Find answers to common questions or get in touch with our support team.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#16181C] border border-[#2F3336] rounded-full pl-14 pr-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10 text-center"
          >
            Browse by <span className="text-kuwex-cyan">Category</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 hover:border-kuwex-cyan/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-kuwex-cyan/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-kuwex-cyan/20 transition-colors">
                    <category.icon size={28} className="text-kuwex-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-kuwex-cyan transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{category.desc}</p>
                    <span className="text-xs text-gray-600">{category.count} articles</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Frequently Asked <span className="text-kuwex-cyan">Questions</span>
            </h2>
            <p className="text-xl text-gray-400">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-kuwex-cyan flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Still Need <span className="text-kuwex-cyan">Help?</span>
            </h2>
            <p className="text-xl text-gray-400">Our support team is ready to assist you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
              href="https://wa.me/263719066891"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 text-center hover:border-kuwex-cyan/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#25D366]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={32} className="text-[#25D366]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-500 text-sm">Quick response guaranteed</p>
            </motion.a>

            <motion.a
              href="mailto:projects@kuwex.co"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 text-center hover:border-kuwex-cyan/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-kuwex-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm">projects@kuwex.co</p>
            </motion.a>

            <motion.a
              href="tel:+263719066891"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 text-center hover:border-kuwex-cyan/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-kuwex-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone size={32} className="text-kuwex-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm">+263 719 066 891</p>
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
