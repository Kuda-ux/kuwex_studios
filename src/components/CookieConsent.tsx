"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "kuwex_cookie_consent";
const CONSENT_VERSION = "1.0";

type ConsentChoice = "all" | "essential" | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        // Slight delay so page renders first
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
      const parsed = JSON.parse(stored);
      if (parsed.version !== CONSENT_VERSION) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function handleConsent(choice: ConsentChoice) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ choice, version: CONSENT_VERSION, date: new Date().toISOString() })
      );
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 md:p-6"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div className="max-w-5xl mx-auto bg-[#16181C] border border-[#2F3336]/70 rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-start gap-3 p-4 sm:p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 border border-kuwex-cyan/20 flex items-center justify-center mt-0.5">
                <Cookie size={18} className="text-kuwex-cyan" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base mb-1">
                  We use cookies
                </p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  KuWeX Studios uses cookies to improve your experience and show relevant ads via{" "}
                  <span className="text-white font-medium">Google AdSense</span>. By clicking{" "}
                  <span className="text-kuwex-cyan font-medium">&ldquo;Accept All&rdquo;</span>, you
                  consent to our use of cookies for analytics and personalised advertising. You can
                  manage or decline non-essential cookies below.{" "}
                  <Link href="/cookies" className="text-kuwex-cyan hover:underline">
                    Cookie Policy
                  </Link>{" "}
                  &middot;{" "}
                  <Link href="/privacy" className="text-kuwex-cyan hover:underline">
                    Privacy Policy
                  </Link>
                </p>

                {/* Expandable details */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  {expanded ? "Hide details" : "Show cookie details"}
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          {
                            name: "Essential",
                            desc: "Required for the site to function. Cannot be disabled.",
                            always: true,
                          },
                          {
                            name: "Analytics",
                            desc: "Google Analytics — helps us understand how visitors use the site.",
                            always: false,
                          },
                          {
                            name: "Advertising",
                            desc: "Google AdSense — shows personalised ads based on your interests.",
                            always: false,
                          },
                        ].map((c) => (
                          <div
                            key={c.name}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-xs font-semibold">{c.name}</span>
                              {c.always ? (
                                <span className="text-xs text-gray-500 italic">Always on</span>
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-kuwex-cyan/50 bg-kuwex-cyan/10 flex items-center justify-center">
                                  <span className="w-2 h-2 rounded-full bg-kuwex-cyan" />
                                </span>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close (essential only) */}
              <button
                onClick={() => handleConsent("essential")}
                className="flex-shrink-0 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
                aria-label="Close and accept essential cookies only"
              >
                <X size={16} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 sm:justify-end">
              <button
                onClick={() => handleConsent("essential")}
                className="order-2 sm:order-1 px-5 py-2.5 rounded-full text-sm font-medium text-gray-400 border border-[#2F3336]/70 hover:border-gray-500 hover:text-white transition-all duration-200"
              >
                Essential Only
              </button>
              <button
                onClick={() => handleConsent("all")}
                className="order-1 sm:order-2 px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] transition-all duration-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
