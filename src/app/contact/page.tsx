"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Building2, Users, Briefcase, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const clientTypes = [
  { icon: Rocket, label: "Startups" },
  { icon: Building2, label: "SMEs" },
  { icon: Briefcase, label: "Enterprises" },
  { icon: Users, label: "Governments" }
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Let&apos;s Connect</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Talk to <span className="text-kuwex-cyan">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We are ready to work with startups, SMEs, enterprises, and governments. Let&apos;s build something extraordinary together.
          </motion.p>

          {/* Client Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {clientTypes.map((type, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-5 py-3">
                <type.icon size={18} className="text-kuwex-cyan" />
                <span className="text-sm font-medium text-gray-300">{type.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
          {/* Contact Info */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-6"
          >
            {/* Contact Details Card */}
            <div className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-white">Contact <span className="text-kuwex-cyan">Information</span></h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-kuwex-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-kuwex-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a href="tel:+263719066891" className="text-lg font-medium text-white hover:text-kuwex-cyan transition-colors">+263 719 066 891</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-kuwex-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-kuwex-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a href="mailto:projects@kuwex.co" className="text-lg font-medium text-white hover:text-kuwex-cyan transition-colors">projects@kuwex.co</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-kuwex-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-kuwex-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-lg font-medium text-white">Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/263719066891" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] rounded-3xl p-6 transition-all group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <MessageCircle size={28} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">Quick response guaranteed</p>
              </div>
              <div className="ml-auto">
                <Send size={24} className="text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Map Placeholder */}
            <div className="relative h-64 bg-[#16181C] border border-[#2F3336] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop"
                alt="Map location"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg">Harare, Zimbabwe</p>
                <p className="text-gray-400 text-sm">Africa&apos;s Digital Innovation Hub</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold mb-2 text-white">Send us a <span className="text-kuwex-cyan">message</span></h3>
            <p className="text-gray-500 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Company / Organization</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Service Interested In</label>
                <select 
                  className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="branding">Digital Branding & Creative Design</option>
                  <option value="web-dev">Web & Mobile App Development</option>
                  <option value="multimedia">Multimedia Production</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="consultancy">Innovation Research & Consultancy</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Project Details</label>
                <textarea 
                  rows={5}
                  className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-kuwex-cyan text-black font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black border-t border-[#2F3336] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Prefer a <span className="text-kuwex-cyan">quick call?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Schedule a free consultation with our team to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+263719066891"
                className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a 
                href="https://wa.me/263719066891"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
