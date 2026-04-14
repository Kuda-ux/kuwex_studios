import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Web Design", href: "/services/web-design" },
    { name: "SEO Services", href: "/services/seo-services" },
    { name: "Social Media Marketing", href: "/services/social-media-marketing" },
    { name: "Google Ads", href: "/services/google-ads" },
    { name: "Branding & Design", href: "/services/branding" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-[#2F3336]/60">
      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-kuwex-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.jpg"
                alt="KuWeX Studios - Digital Marketing Agency Zimbabwe"
                width={180}
                height={50}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Building Africa&apos;s digital future with world-class creative technology and innovation.
            </p>
            <div className="space-y-3">
              <a href="mailto:projects@kuwex.co" className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-kuwex-cyan transition-colors duration-300">
                <Mail size={14} className="text-kuwex-cyan/60" />
                projects@kuwex.co
              </a>
              <a href="tel:+263719066891" className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-kuwex-cyan transition-colors duration-300">
                <Phone size={14} className="text-kuwex-cyan/60" />
                +263 719 066 891
              </a>
              <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                <MapPin size={14} className="text-kuwex-cyan/60" />
                Harare, Zimbabwe
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-white hover:translate-x-0.5 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-white hover:translate-x-0.5 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-white hover:translate-x-0.5 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2F3336]/40 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} KuWeX Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-kuwex-cyan transition-colors duration-300">Privacy</Link>
            <Link href="/terms" className="hover:text-kuwex-cyan transition-colors duration-300">Terms</Link>
            <Link href="/cookies" className="hover:text-kuwex-cyan transition-colors duration-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
