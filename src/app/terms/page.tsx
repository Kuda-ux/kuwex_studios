"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <FileText size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Legal Agreement</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Terms of <span className="text-kuwex-cyan">Service</span>
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
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                By accessing or using the services provided by KuWeX Studios (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                KuWeX Studios provides digital services including but not limited to web development, mobile app development, branding and design, digital marketing, multimedia production, and technology consultancy. The specific scope, deliverables, and timeline for each project will be outlined in a separate project agreement or proposal.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">3. Project Agreements</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Each project undertaken by KuWeX Studios will be governed by a separate project agreement that includes:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>Detailed scope of work and deliverables</li>
                <li>Project timeline and milestones</li>
                <li>Pricing and payment terms</li>
                <li>Revision and feedback processes</li>
                <li>Intellectual property rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Unless otherwise specified in the project agreement:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>A 50% deposit is required before work commences</li>
                <li>The remaining balance is due upon project completion</li>
                <li>Payments are non-refundable once work has begun</li>
                <li>Late payments may incur additional fees</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement. KuWeX Studios retains the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing. Any pre-existing intellectual property, third-party assets, or proprietary tools used remain the property of their respective owners.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">6. Client Responsibilities</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Clients agree to:
              </p>
              <ul className="text-gray-400 mb-8 space-y-2 list-disc list-inside">
                <li>Provide accurate and complete information necessary for the project</li>
                <li>Respond to requests for feedback and approvals in a timely manner</li>
                <li>Ensure they have the rights to any content provided for use in the project</li>
                <li>Make payments according to the agreed schedule</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">7. Revisions and Changes</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The number of revisions included in a project will be specified in the project agreement. Additional revisions or changes to the project scope may incur additional charges. Significant changes to the project scope may require a new project agreement.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">8. Confidentiality</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the project. This obligation survives the termination of the business relationship.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                KuWeX Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific project in question.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Either party may terminate a project agreement with written notice. In the event of termination, the client shall pay for all work completed up to the termination date. Any deposits paid are non-refundable.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Zimbabwe. Any disputes arising from these terms shall be resolved through negotiation, mediation, or the courts of Zimbabwe.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <ul className="text-gray-400 mt-4 space-y-2">
                <li><strong className="text-white">Email:</strong> projects@kuwex.co</li>
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
