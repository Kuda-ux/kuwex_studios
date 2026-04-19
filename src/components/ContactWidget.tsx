"use client";

import { Mail, MessageCircle, X, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const pulseTimer = setTimeout(() => setShowPulse(true), 3000);
    return () => clearTimeout(pulseTimer);
  }, []);

  if (!mounted) return null;

  const emailSubject = encodeURIComponent("Enquiry from kuwexstudios.co.zw");
  const emailBody = encodeURIComponent(
    "Hi KuWeX Studios,\n\nI'm interested in your digital services. Please get in touch to discuss:\n\n[Describe your project]\n\nBest regards,"
  );
  const whatsappText = encodeURIComponent(
    "Hi KuWeX Studios, I'm interested in your digital services and would like to enquire."
  );

  const contactOptions = [
    {
      icon: Mail,
      label: "Email Us",
      sublabel: "info@kuwexstudios.co.zw",
      href: `mailto:info@kuwexstudios.co.zw?subject=${emailSubject}&body=${emailBody}`,
      color: "#00E5FF",
      bg: "from-cyan-500/20 to-blue-500/20",
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      sublabel: "+263 719 066 891",
      href: `https://wa.me/263719066891?text=${whatsappText}`,
      color: "#25D366",
      bg: "from-green-500/20 to-emerald-500/20",
      external: true,
    },
    {
      icon: Phone,
      label: "Call Us",
      sublabel: "+263 719 066 891",
      href: "tel:+263719066891",
      color: "#0085FF",
      bg: "from-blue-500/20 to-indigo-500/20",
      external: false,
    },
    {
      icon: Send,
      label: "Quick Quote",
      sublabel: "Get pricing in minutes",
      href: "/contact",
      color: "#A855F7",
      bg: "from-purple-500/20 to-violet-500/20",
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-black/95 backdrop-blur-xl border border-[#2F3336]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-4 w-[300px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2F3336]/60">
              <div>
                <h3 className="font-bold text-white text-sm">Let&apos;s Talk</h3>
                <p className="text-gray-400 text-xs">We reply within minutes</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-xs font-medium">Online</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {contactOptions.map((opt, i) => (
                <motion.a
                  key={i}
                  href={opt.href}
                  target={opt.external ? "_blank" : undefined}
                  rel={opt.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${opt.bg} border border-white/5 hover:border-white/10 transition-all group`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${opt.color}20` }}
                  >
                    <opt.icon size={18} style={{ color: opt.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{opt.label}</div>
                    <div className="text-gray-400 text-xs truncate">{opt.sublabel}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-[#2F3336]/60 text-center">
              <p className="text-gray-500 text-[10px]">
                Average response time: <span className="text-kuwex-cyan">~10 min</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 180 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center shadow-[0_8px_24px_rgba(0,229,255,0.35)] hover:shadow-[0_8px_32px_rgba(0,229,255,0.55)] transition-shadow"
        aria-label="Contact KuWeX Studios"
      >
        {/* Pulse ring */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-kuwex-cyan/40 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-kuwex-cyan/20 animate-ping" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-black" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Mail size={22} className="text-black" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-black flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
