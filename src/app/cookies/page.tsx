"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

export default function Cookies() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <Cookie size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Cookie Information</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Cookie <span className="text-kuwex-cyan">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Last updated: December 2024
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 md:p-12"
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">KuWeX Studios uses cookies to:</p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve our website performance</li>
                <li>Provide personalized content</li>
                <li>Analyze website traffic and usage patterns</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                These cookies remember your preferences and choices to provide a more personalized experience.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">4. Managing Cookies</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. However, blocking cookies may affect your experience on our website.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Some cookies on our website are set by third-party services we use, such as analytics providers. These third parties have their own privacy policies governing the use of cookies.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have questions about our use of cookies, please contact us at:
              </p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li><strong className="text-white">Email:</strong> projects@kuwex.co</li>
                <li><strong className="text-white">Phone:</strong> +263 719 066 891</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
