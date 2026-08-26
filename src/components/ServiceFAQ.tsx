"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export type FAQItem = { q: string; a: string };

export default function ServiceFAQ({ serviceName, faqs }: { serviceName: string; faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 border-t border-[#2F3336]/40">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/20 mb-4">
            <HelpCircle size={16} className="text-kuwex-cyan" />
            <span className="text-sm font-medium text-kuwex-cyan">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {serviceName} <span className="vibrant-gradient-text">FAQs</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about our {serviceName.toLowerCase()} services in Zimbabwe.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.2) }}
              className="x-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-white font-medium text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
