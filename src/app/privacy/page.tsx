"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vibrant-badge mx-auto mb-8"
          >
            <Shield size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Your Privacy Matters</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Privacy <span className="vibrant-gradient-text">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Last updated: June 2026
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
            className="x-card-vibrant rounded-3xl p-8 md:p-12"
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                KuWeX Studios (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                We may collect information about you in a variety of ways, including:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li><strong className="text-white">Personal Data:</strong> Name, email address, phone number, and other contact information you provide when filling out forms or contacting us.</li>
                <li><strong className="text-white">Business Information:</strong> Company name, job title, and project requirements shared during consultations.</li>
                <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring sources.</li>
                <li><strong className="text-white">Device Information:</strong> Browser type, operating system, and device identifiers.</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process and manage your projects</li>
                <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">5. Advertising &amp; Google AdSense</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                We use Google AdSense, a third-party advertising service provided by Google LLC, to display advertisements on our website. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website and other websites on the Internet.
              </p>
              <ul className="text-gray-400 mb-4 space-y-2 list-disc list-inside">
                <li><strong className="text-white">Personalised Ads:</strong> Google may use information about your visits to this and other websites to provide personalised advertisements about goods and services that may interest you.</li>
                <li><strong className="text-white">DoubleClick Cookie:</strong> Google&apos;s use of the DoubleClick cookie enables it and its partners to serve ads based on your browsing patterns.</li>
                <li><strong className="text-white">Third-Party Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
                <li><strong className="text-white">Data Collection:</strong> Google may collect data such as your IP address, browser type, device identifiers, pages visited, and interactions with advertisements to deliver and measure ad effectiveness.</li>
              </ul>
              <p className="text-gray-400 mb-8 leading-relaxed">
                You may opt out of personalised advertising by visiting{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-kuwex-cyan hover:underline">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies for personalised advertising by visiting{" "}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-kuwex-cyan hover:underline">www.aboutads.info/choices</a>{" "}
                or the{" "}
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-kuwex-cyan hover:underline">Network Advertising Initiative opt-out page</a>.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyse traffic, and serve advertisements. This includes cookies set by Google AdSense and Google Analytics. You can set your browser to refuse cookies, but some features of our website may not function properly without them. For full details, see our{" "}
                <a href="/cookies" className="text-kuwex-cyan hover:underline">Cookie Policy</a>.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li><strong className="text-white">Email:</strong> info@kuwexstudios.co.zw</li>
                <li><strong className="text-white">Phone:</strong> +263 719 066 891</li>
                <li><strong className="text-white">Address:</strong> Harare, Zimbabwe</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
