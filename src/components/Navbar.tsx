"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-2xl border-b border-[#2F3336]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-black/20 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] sm:h-[80px] gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative flex-shrink-0 max-w-[120px] sm:max-w-[160px] md:max-w-none">
            <Image
              src="/logo.jpg"
              alt="KuWeX Studios - Digital Marketing Agency Zimbabwe"
              width={200}
              height={56}
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain group-hover:brightness-125 transition-all duration-300"
              priority
            />
            <div className="absolute -inset-2 bg-kuwex-cyan/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-full px-1.5 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-[14px] font-semibold text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.08] group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-kuwex-cyan to-kuwex-blue group-hover:w-5 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
            >
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 sm:p-2.5 rounded-xl text-white hover:bg-white/5 border border-[#2F3336]/30 hover:border-[#2F3336]/60 transition-all duration-300 bg-black/40 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-[#2F3336]/60 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-3.5 px-4 text-lg font-medium text-white hover:text-kuwex-cyan hover:bg-white/5 rounded-xl transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <ArrowRight size={16} className="text-gray-600" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-6 py-3.5 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
