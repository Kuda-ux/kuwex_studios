"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-[#2F3336]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Text Based Design */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">KuWe</span>
                <span className="bg-gradient-to-br from-kuwex-cyan to-gray-400 bg-clip-text text-transparent">X</span>
              </span>
              <span className="text-[10px] font-medium tracking-[0.25em] text-gray-400 mt-0.5">STUDIOS</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-black border-b border-[#2F3336] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-lg text-white hover:text-kuwex-cyan transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
