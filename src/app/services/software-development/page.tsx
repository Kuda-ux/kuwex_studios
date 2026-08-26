"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceQuoteForm from "@/components/ServiceQuoteForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Globe,
  Server,
  Cpu,
  Layers,
  GitBranch,
  Gauge,
  MessageCircle,
  Boxes,
  Workflow,
  Lock,
  Zap,
} from "lucide-react";

const features = [
  { icon: Code2, title: "Custom Software Engineering", desc: "Bespoke software solutions built from scratch using TypeScript, Python, Go, and modern frameworks. No off-the-shelf shortcuts — every line of code serves your business logic." },
  { icon: Boxes, title: "Scalable Architecture", desc: "Microservices, event-driven systems, and cloud-native architectures that handle millions of users. Built to scale from 100 to 1,000,000+ without rewrites." },
  { icon: Database, title: "Enterprise Database Design", desc: "PostgreSQL, MongoDB, Redis, and Turso/LibSQL architectures optimized for high-throughput, low-latency data access. Proper indexing, sharding, and replication strategies." },
  { icon: Cloud, title: "Cloud Infrastructure", desc: "AWS, Azure, Google Cloud, and Vercel deployment pipelines. Auto-scaling, load balancing, CDN distribution, and zero-downtime deployments." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "JWT authentication, OAuth 2.0, RBAC, API rate limiting, encryption at rest and in transit, security audits, and compliance with Zimbabwe's Data Protection Act." },
  { icon: GitBranch, title: "CI/CD & DevOps", desc: "Automated testing, continuous integration, and continuous deployment pipelines. Docker containerization, Kubernetes orchestration, and infrastructure as code." },
  { icon: Workflow, title: "API-First Design", desc: "RESTful APIs, GraphQL endpoints, and real-time WebSocket connections. Well-documented, versioned, and ready for mobile apps, web clients, and third-party integrations." },
  { icon: Gauge, title: "Performance Engineering", desc: "Sub-200ms API response times, query optimization, caching strategies (Redis, CDN, edge), and comprehensive performance monitoring with alerts." },
];

const solutions = [
  {
    icon: Layers,
    title: "Enterprise Resource Planning (ERP)",
    desc: "Custom ERP systems that unify accounting, inventory, HR, procurement, and reporting into one platform. Replace spreadsheets and legacy software with a single source of truth.",
    examples: ["Inventory management", "Financial reporting", "HR & payroll", "Procurement workflows", "Approval chains", "Audit trails"],
  },
  {
    icon: Server,
    title: "Customer Relationship Management (CRM)",
    desc: "Tailored CRM platforms that track every customer interaction from lead to conversion to retention. Built for Zimbabwean sales teams and customer service workflows.",
    examples: ["Lead scoring", "Sales pipelines", "Customer portals", "Communication logs", "Automated follow-ups", "Performance dashboards"],
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    desc: "Automate repetitive workflows — approvals, notifications, data entry, report generation, and document routing. Free your team from manual work and reduce errors by 95%.",
    examples: ["Document approval workflows", "Automated reporting", "Email/SMS/WhatsApp automation", "Data sync between systems", "Scheduled tasks", "Webhook integrations"],
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning Integration",
    desc: "Integrate AI capabilities into your existing systems — chatbots, predictive analytics, recommendation engines, document processing, and intelligent automation powered by LLMs.",
    examples: ["AI chatbots & virtual assistants", "Predictive analytics", "Document OCR & processing", "Sentiment analysis", "Recommendation engines", "Anomaly detection"],
  },
  {
    icon: Lock,
    title: "Fintech & Payment Systems",
    desc: "Secure payment processing, mobile money integration (EcoCash, Paynow), digital wallets, lending platforms, and financial dashboards built with bank-grade security.",
    examples: ["Payment gateways", "Mobile money integration", "Digital wallets", "Loan management systems", "Transaction monitoring", "Financial analytics"],
  },
  {
    icon: Globe,
    title: "Multi-Platform Systems",
    desc: "Web applications, mobile apps (iOS & Android), desktop clients, and API services that share a single backend. One codebase, every platform, consistent experience.",
    examples: ["Progressive Web Apps", "Native mobile apps", "Desktop applications", "API services", "Real-time sync", "Offline-first architecture"],
  },
];

const process = [
  { step: "01", title: "Architecture & Planning", desc: "We conduct a thorough requirements analysis, design system architecture, plan data models, and define the technology stack. You get a complete technical blueprint before a single line of code is written." },
  { step: "02", title: "MVP Development", desc: "We build a functional Minimum Viable Product within 4-8 weeks. You see real software working early — not slideshows. Iterate based on real user feedback, not assumptions." },
  { step: "03", title: "Scale & Integrate", desc: "We expand the MVP into a full production system — integrating with your existing tools, adding features, optimizing performance, and hardening security for enterprise workloads." },
  { step: "04", title: "Deploy & Maintain", desc: "We deploy to cloud infrastructure with CI/CD pipelines, monitoring, and alerts. Ongoing maintenance, feature development, and 24/7 support ensure your system never goes down." },
];

const pricing = [
  { name: "MVP Development", price: "From $5,000", desc: "For startups and SMEs needing a functional product fast", features: ["4-8 week delivery", "Core feature set", "1 platform (web or mobile)", "Basic cloud deployment", "API documentation", "3 months support"] },
  { name: "Enterprise Software", price: "From $15,000", desc: "For corporates needing custom internal systems", features: ["Custom ERP/CRM/BPM", "Multi-platform (web + mobile)", "Third-party integrations", "User roles & permissions", "Advanced security", "6 months support", "CI/CD pipeline"], popular: true },
  { name: "Large-Scale Systems", price: "Custom", desc: "For large corporates and government institutions", features: ["Microservices architecture", "Multi-region deployment", "AI/ML integration", "24/7 monitoring & SLA", "Dedicated development team", "12 months support", "Source code ownership"] },
];

export default function SoftwareDevelopmentPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Enterprise Software Development Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center"
          >
            Custom <span className="vibrant-gradient-text">Software Development</span> for Large Corporates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10"
          >
            Scalable, secure, and mission-critical software systems built for Zimbabwe&apos;s largest enterprises.
            From custom ERPs and CRMs to AI-powered platforms and fintech solutions — we engineer software that handles millions of transactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
            >
              Request Consultation <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20need%20custom%20software%20development"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={18} className="text-[#25D366]" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-4 border-y border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">1M+</p>
              <p className="text-sm text-gray-500">Transactions Handled</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">99.9%</p>
              <p className="text-sm text-gray-500">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">200ms</p>
              <p className="text-sm text-gray-500">Avg API Response</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">24/7</p>
              <p className="text-sm text-gray-500">Monitoring & Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Cpu size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Enterprise-Grade Engineering</span>
            </div>
            <h2 className="section-heading mb-4">
              Built for <span className="vibrant-gradient-text">Scale</span>, Engineered for <span className="vibrant-gradient-text">Performance</span>
            </h2>
            <p className="section-subheading mx-auto">
              We don&apos;t build websites. We build software systems that power entire organisations — secure, scalable, and ready for millions of users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <feature.icon size={24} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions We Build */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Boxes size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">What We Build</span>
            </div>
            <h2 className="section-heading mb-4">
              Enterprise Software <span className="vibrant-gradient-text">Solutions</span>
            </h2>
            <p className="section-subheading mx-auto">
              From custom ERPs to AI-powered platforms — we build the software that runs your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <solution.icon size={24} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{solution.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.examples.map((ex, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-gray-500">
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Our Software Development <span className="vibrant-gradient-text">Process</span>
            </h2>
            <p className="section-subheading mx-auto">A proven methodology that delivers enterprise software on time and on budget.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-black text-kuwex-cyan/10 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Software Development <span className="vibrant-gradient-text">Pricing</span>
            </h2>
            <p className="section-subheading mx-auto">Transparent pricing for enterprise-grade software. Custom quotes available for complex requirements.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-kuwex-cyan/10 to-transparent border-2 border-kuwex-cyan/30"
                    : "x-card-vibrant"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full text-xs font-bold text-black">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold vibrant-gradient-text mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-kuwex-cyan flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                      : "border border-[#2F3336] text-white hover:border-kuwex-cyan/50"
                  }`}
                >
                  Request Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Zap size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Technology Stack</span>
            </div>
            <h2 className="section-heading mb-4">
              Built with <span className="vibrant-gradient-text">Modern Technology</span>
            </h2>
            <p className="section-subheading mx-auto">
              We use the same tools trusted by Google, Netflix, and Stripe — adapted for Zimbabwe and Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "TypeScript", category: "Language" },
              { name: "Next.js 14", category: "Framework" },
              { name: "React 18", category: "UI Library" },
              { name: "Node.js", category: "Runtime" },
              { name: "Python", category: "Language" },
              { name: "PostgreSQL", category: "Database" },
              { name: "MongoDB", category: "Database" },
              { name: "Redis", category: "Caching" },
              { name: "AWS", category: "Cloud" },
              { name: "Docker", category: "Containerization" },
              { name: "Kubernetes", category: "Orchestration" },
              { name: "GitHub Actions", category: "CI/CD" },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="x-card rounded-xl p-4 text-center"
              >
                <p className="text-white font-bold text-sm">{tech.name}</p>
                <p className="text-gray-500 text-xs mt-1">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something <span className="vibrant-gradient-text">That Scales?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Whether you need a custom ERP, a fintech platform, or an AI-powered system — we have the engineering expertise to build it right.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Get a Free Consultation <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section — AEO optimized visible content for AI answer engines */}
      <ServiceFAQ
        serviceName="Custom Software Development"
        faqs={[
          { q: "How much does custom software development cost in Zimbabwe?", a: "Custom software development in Zimbabwe costs from $5,000 for an MVP to $50,000+ for large-scale enterprise systems. At KuWeX Studios, MVP development starts at $5,000, enterprise software (custom ERP/CRM/BPM) starts at $15,000, and large-scale systems with microservices and AI integration are custom-quoted. Pricing depends on complexity, integrations, and scale requirements." },
          { q: "How long does it take to build custom software in Zimbabwe?", a: "An MVP takes 4-8 weeks. Full enterprise software typically takes 3-6 months. Large-scale systems with microservices architecture take 6-12 months. KuWeX Studios uses an agile methodology — you see working software within weeks, not months, and we iterate based on real user feedback." },
          { q: "What types of enterprise software does KuWeX Studios build?", a: "We build custom ERPs (Enterprise Resource Planning), CRMs (Customer Relationship Management), business process automation systems, fintech and payment platforms, AI and machine learning integrations, multi-platform systems (web + mobile + API), inventory management systems, HR and payroll systems, procurement workflows, and government-grade secure platforms." },
          { q: "Do you build software that can scale to millions of users?", a: "Yes. We design software with cloud-native architecture, microservices, auto-scaling, and load balancing from day one. Our systems handle millions of transactions with sub-200ms API response times. We use AWS, Docker, Kubernetes, and proven scaling patterns trusted by companies like Netflix and Stripe." },
          { q: "Can you integrate AI into our existing software systems?", a: "Yes. KuWeX Studios integrates AI capabilities into existing systems including AI chatbots and virtual assistants, predictive analytics, document OCR and processing, sentiment analysis, recommendation engines, and anomaly detection. We work with OpenAI, Anthropic, and open-source LLMs to build AI features that deliver real business value." },
          { q: "Do you work with large corporates and government in Zimbabwe?", a: "Yes. KuWeX Studios builds enterprise software for large corporates, government departments, and NGOs in Zimbabwe. We understand compliance requirements, procurement processes, data protection regulations (Zimbabwe Data Protection Act), and enterprise security standards. We offer dedicated development teams, SLAs, and source code ownership for large-scale projects." },
        ]}
      />

      {/* Free Quote Form */}
      <section className="py-20 px-4 bg-black border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-3xl">
          <ServiceQuoteForm serviceName="Custom Software Development" serviceValue="software-development" />
        </div>
      </section>

      {/* Internal Links for SEO */}
      <section className="py-16 px-4 border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-lg font-semibold text-white mb-6">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/web-design" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Web Design Zimbabwe
            </Link>
            <Link href="/services/seo-services" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              SEO Services Zimbabwe
            </Link>
            <Link href="/services/google-ads" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Google Ads Zimbabwe
            </Link>
            <Link href="/services/branding" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Branding Services
            </Link>
            <Link href="/services/social-media-marketing" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Social Media Marketing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
