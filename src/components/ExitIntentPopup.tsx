"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, CheckCircle, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", service: "" });
  const mobileTriggered = useRef(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem("exitPopupShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    // Mobile: trigger on fast scroll up (back to top)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollUp = lastScrollY - currentY;
      if (scrollUp > 300 && currentY > 600 && !mobileTriggered.current && !hasShown) {
        mobileTriggered.current = true;
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
      lastScrollY = currentY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: "",
          email: formData.email,
          company: "",
          service: formData.service,
          message: "Lead from exit-intent popup — requested free website audit / consultation",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setStatus("success");
      setTimeout(() => setIsOpen(false), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-kuwex-cyan/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.15)]"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            {/* Gradient header */}
            <div className="bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 p-8 pb-6 text-center border-b border-kuwex-cyan/10">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-kuwex-cyan to-kuwex-blue rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                <Gift size={28} className="text-black" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles size={16} className="text-kuwex-cyan" />
                <span className="text-xs font-bold text-kuwex-cyan uppercase tracking-wider">Free Offer</span>
                <Sparkles size={16} className="text-kuwex-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Get a <span className="vibrant-gradient-text">Free Website Audit</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Before you go — get a free 30-minute consultation and website audit worth $200. No strings attached.
              </p>
            </div>

            {/* Form / Success / Error */}
            <div className="p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">You&apos;re In!</h3>
                  <p className="text-gray-400 text-sm">
                    We&apos;ll contact you within 24 hours to schedule your free audit. Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2.5">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-xs">{errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                    />
                  </div>

                  <div>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all appearance-none"
                    >
                      <option value="">What do you need help with?</option>
                      <option value="web-dev">Website Design & Development</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="branding">Branding & Creative Design</option>
                      <option value="seo-services">SEO Services</option>
                      <option value="social-media-marketing">Social Media Marketing</option>
                      <option value="google-ads">Google Ads</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My Free Audit <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-600 text-xs">
                    No spam. We&apos;ll only contact you about your audit.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
