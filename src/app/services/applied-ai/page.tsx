"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceQuoteForm from "@/components/ServiceQuoteForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Bot,
  Workflow,
  MessageSquare,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Globe,
  Cpu,
  Database,
  GitBranch,
  Gauge,
  MessageCircle,
  Sparkles,
  BarChart3,
  Mail,
  PhoneCall,
  FileText,
  Lock,
  Network,
} from "lucide-react";

const features = [
  { icon: Brain, title: "Custom AI Model Integration", desc: "We integrate GPT-4, Claude, Gemini, and open-source LLMs into your business workflows. Custom prompts, fine-tuned models, and RAG pipelines that understand your industry and data." },
  { icon: Bot, title: "AI Chatbots & Virtual Assistants", desc: "Deploy intelligent chatbots on WhatsApp, website, and mobile apps that handle customer queries 24/7, qualify leads, book appointments, and process orders — in English, Shona, and Ndebele." },
  { icon: Workflow, title: "Intelligent Process Automation", desc: "Replace manual workflows with AI-powered automation. Document processing, approval routing, data extraction, report generation, and notifications — all running autonomously." },
  { icon: BarChart3, title: "Predictive Analytics", desc: "Forecast sales, predict customer churn, optimize inventory, and identify growth opportunities with machine learning models trained on your business data." },
  { icon: MessageSquare, title: "Automated Customer Engagement", desc: "AI-driven email campaigns, WhatsApp broadcasts, SMS sequences, and social media responses. Personalized at scale, triggered by customer behavior, not guesswork." },
  { icon: ShieldCheck, title: "Secure & Compliant AI", desc: "All AI systems are built with data privacy, encryption, and compliance with Zimbabwe's Data Protection Act. Your data never trains public models — it stays yours." },
];

const solutions = [
  {
    icon: Bot,
    title: "AI Customer Support Agents",
    desc: "24/7 intelligent chatbots that resolve customer queries, process requests, and escalate to humans when needed. Deploy on WhatsApp, website, Facebook Messenger, and mobile apps.",
    examples: ["WhatsApp AI assistant", "Website chatbot", "FAQ automation", "Order tracking bot", "Appointment booking", "Multi-language support (English, Shona, Ndebele)"],
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    desc: "Automate repetitive operational tasks — document approvals, data entry, report generation, invoice processing, inventory alerts, and staff notifications. Reduce manual work by 80%.",
    examples: ["Document approval automation", "Automated reporting", "Invoice processing", "Inventory alerts", "Staff onboarding workflows", "Compliance monitoring"],
  },
  {
    icon: Mail,
    title: "AI Marketing Automation",
    desc: "Personalized email campaigns, WhatsApp broadcasts, and SMS sequences triggered by customer behavior. AI writes subject lines, optimizes send times, and segments audiences automatically.",
    examples: ["Email campaign automation", "WhatsApp broadcast sequences", "Lead nurturing flows", "Customer re-engagement", "AI-generated content", "A/B testing automation"],
  },
  {
    icon: FileText,
    title: "Document Intelligence & OCR",
    desc: "Extract data from invoices, receipts, contracts, ID documents, and forms using AI-powered OCR. Auto-populate databases, trigger workflows, and eliminate manual data entry.",
    examples: ["Invoice processing", "Receipt extraction", "Contract analysis", "ID document verification", "Form auto-fill", "Document classification"],
  },
  {
    icon: BarChart3,
    title: "AI Analytics & Business Intelligence",
    desc: "Transform raw business data into actionable insights. Predictive models for sales forecasting, customer churn detection, demand planning, and market trend analysis.",
    examples: ["Sales forecasting", "Customer churn prediction", "Demand planning", "Market trend analysis", "Revenue optimization", "Anomaly detection"],
  },
  {
    icon: PhoneCall,
    title: "AI Voice & Call Automation",
    desc: "AI-powered voice assistants for inbound and outbound calls. Automate appointment reminders, customer surveys, payment follow-ups, and support calls with natural-sounding voices.",
    examples: ["AI receptionist", "Appointment reminders", "Payment follow-up calls", "Customer satisfaction surveys", "Call transcription", "Sentiment analysis on calls"],
  },
];

const process = [
  { step: "01", title: "AI Readiness Audit", desc: "We assess your current systems, data quality, workflows, and team capabilities. You get a detailed AI readiness report with prioritized automation opportunities and ROI projections." },
  { step: "02", title: "Pilot & Proof of Value", desc: "We build a focused AI pilot — typically a chatbot or workflow automation — within 2-4 weeks. You see measurable results before committing to full-scale implementation." },
  { step: "03", title: "Scale & Integrate", desc: "We expand the pilot into production AI systems, integrating with your CRM, ERP, website, WhatsApp, and other tools. Full staff training and change management included." },
  { step: "04", title: "Optimize & Support", desc: "Continuous model improvement, performance monitoring, new automation opportunities, and 24/7 technical support. Your AI systems get smarter over time." },
];

const pricing = [
  { name: "AI Pilot Project", price: "From $3,000", desc: "For businesses testing AI for the first time", features: ["2-4 week delivery", "1 AI use case (chatbot or automation)", "WhatsApp or web deployment", "Basic integration", "Staff training", "2 months support"] },
  { name: "AI Transformation", price: "From $10,000", desc: "For SMEs ready to automate operations", features: ["3-6 AI use cases", "Multi-platform deployment", "CRM/ERP integration", "Custom AI model training", "Workflow automation", "6 months support", "Staff training & change management"], popular: true },
  { name: "Enterprise AI Systems", price: "Custom", desc: "For large corporates and government", features: ["Unlimited AI use cases", "Custom LLM fine-tuning", "Full system integration", "Predictive analytics suite", "Dedicated AI team", "12 months support", "SLA & 24/7 monitoring"] },
];

export default function AppliedAIPage() {
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
            <span className="text-sm text-gray-400">Applied AI & Business Automation Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-center"
          >
            Applied <span className="vibrant-gradient-text">AI & Business Automation</span> for Zimbabwe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-center mb-10"
          >
            Transforming corporate operations in Zimbabwe through intelligent workflows, automated customer engagement,
            and custom AI systems. We help businesses deploy AI that cuts costs, boosts revenue, and works 24/7.
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
              Get AI Readiness Audit <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/263719066891?text=Hi%20KuWeX%2C%20I%20want%20to%20explore%20AI%20automation%20for%20my%20business"
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
              <p className="text-3xl font-bold text-kuwex-cyan">80%</p>
              <p className="text-sm text-gray-500">Manual Work Reduced</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">24/7</p>
              <p className="text-sm text-gray-500">AI Operations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">3x</p>
              <p className="text-sm text-gray-500">Faster Response Times</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-kuwex-cyan">65%</p>
              <p className="text-sm text-gray-500">Cost Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Sparkles size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">AI-Powered Business Transformation</span>
            </div>
            <h2 className="section-heading mb-4">
              AI That Works for <span className="vibrant-gradient-text">Your Business</span>
            </h2>
            <p className="section-subheading mx-auto">
              We don&apos;t sell AI hype. We build AI systems that automate real work, engage real customers, and deliver real ROI for Zimbabwean businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Network size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">AI Solutions</span>
            </div>
            <h2 className="section-heading mb-4">
              AI <span className="vibrant-gradient-text">Solutions</span> We Deploy
            </h2>
            <p className="section-subheading mx-auto">
              From WhatsApp chatbots to predictive analytics — we deploy AI that transforms how your business operates.
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
              Our AI Implementation <span className="vibrant-gradient-text">Process</span>
            </h2>
            <p className="section-subheading mx-auto">A proven methodology that delivers measurable AI ROI — not just demos.</p>
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
              AI & Automation <span className="vibrant-gradient-text">Pricing</span>
            </h2>
            <p className="section-subheading mx-auto">Transparent pricing for AI transformation. Start small, scale proven results.</p>
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
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Cpu size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">AI Technology Stack</span>
            </div>
            <h2 className="section-heading mb-4">
              Powered by <span className="vibrant-gradient-text">Best-in-Class AI</span>
            </h2>
            <p className="section-subheading mx-auto">
              We work with the world&apos;s leading AI platforms — adapted for Zimbabwe&apos;s business landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "OpenAI GPT-4", category: "Language Model" },
              { name: "Claude (Anthropic)", category: "Language Model" },
              { name: "Google Gemini", category: "Language Model" },
              { name: "Llama 3 (Meta)", category: "Open-Source LLM" },
              { name: "LangChain", category: "AI Framework" },
              { name: "Pinecone", category: "Vector Database" },
              { name: "Twilio", category: "Voice & SMS" },
              { name: "WhatsApp Business API", category: "Messaging" },
              { name: "OpenAI Whisper", category: "Speech-to-Text" },
              { name: "Tesseract OCR", category: "Document OCR" },
              { name: "Hugging Face", category: "ML Models" },
              { name: "n8n / Zapier", category: "Workflow Automation" },
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

      {/* Zimbabwe AI Context */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Globe size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Zimbabwe AI Context</span>
            </div>
            <h2 className="section-heading mb-4">
              Zimbabwe&apos;s <span className="vibrant-gradient-text">AI Revolution</span> Starts Here
            </h2>
            <p className="section-subheading mx-auto">
              Zimbabwe is embracing AI. The National AI Strategy (2026–2030), Econet&apos;s Gemini AI, and Cassava&apos;s GPU cloud are transforming the economy. Is your business ready?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="x-card rounded-2xl p-6 text-center">
              <Zap size={32} className="text-kuwex-cyan mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Econet AI</h3>
              <p className="text-gray-400 text-sm">Econet launched Gemini AI in Zimbabwe, bringing AI to millions of mobile users. Businesses need AI-ready systems to engage this new AI-savvy audience.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="x-card rounded-2xl p-6 text-center">
              <Brain size={32} className="text-kuwex-cyan mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">National AI Strategy</h3>
              <p className="text-gray-400 text-sm">Zimbabwe&apos;s AI Strategy (2026–2030) aims to make AI accessible across sectors. Early adopters will gain massive competitive advantages.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="x-card rounded-2xl p-6 text-center">
              <Cpu size={32} className="text-kuwex-cyan mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Cassava GPU Cloud</h3>
              <p className="text-gray-400 text-sm">Cassava Technologies is building GPU cloud infrastructure in Africa, enabling local AI model training and deployment without relying on foreign clouds.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Put <span className="vibrant-gradient-text">AI to Work?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Get a free AI readiness audit. We&apos;ll identify your top 3 automation opportunities and show you exactly how AI can cut costs and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Get Free AI Audit <ArrowRight size={18} />
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
        serviceName="Applied AI & Business Automation"
        faqs={[
          { q: "How much does AI implementation cost in Zimbabwe?", a: "AI implementation in Zimbabwe costs from $3,000 for a pilot project (chatbot or single automation) to $10,000+ for full AI transformation with multiple use cases. At KuWeX Studios, AI pilot projects start at $3,000, AI transformation packages from $10,000, and enterprise AI systems are custom-quoted. We always start with a pilot so you see ROI before scaling." },
          { q: "What AI solutions does KuWeX Studios deploy in Zimbabwe?", a: "We deploy AI customer support agents (WhatsApp, web, Messenger chatbots), business workflow automation (document processing, approvals, reporting), AI marketing automation (email, WhatsApp, SMS sequences), document intelligence & OCR, AI analytics & predictive models (sales forecasting, churn prediction), and AI voice & call automation. All solutions integrate with your existing systems." },
          { q: "Can AI chatbots work on WhatsApp in Zimbabwe?", a: "Yes. We build AI chatbots that deploy on WhatsApp Business API, handling customer queries 24/7, qualifying leads, booking appointments, processing orders, and providing support — in English, Shona, and Ndebele. WhatsApp is Zimbabwe's most-used messaging platform, making it the #1 channel for AI customer engagement." },
          { q: "How long does it take to implement AI automation in Zimbabwe?", a: "An AI pilot project takes 2-4 weeks. Full AI transformation with 3-6 use cases takes 2-4 months. Enterprise AI systems take 4-8 months. KuWeX Studios uses a pilot-first approach — you see working AI within weeks, measure ROI, then scale what works." },
          { q: "Is AI safe for my business data in Zimbabwe?", a: "Yes. All AI systems we build are designed with data privacy and security as priorities. Your data is encrypted, never used to train public models, and complies with Zimbabwe's Data Protection Act. We can deploy AI on private infrastructure or use enterprise AI APIs with strict data usage policies." },
          { q: "How is AI transforming businesses in Zimbabwe?", a: "AI is transforming Zimbabwe through Econet's Gemini AI launch, the National AI Strategy (2026-2030), and Cassava's GPU cloud infrastructure. Businesses adopting AI for customer service, marketing automation, and data analysis are seeing 65% cost reductions, 3x faster response times, and 80% less manual work. KuWeX Studios helps businesses become AI-ready with practical, ROI-focused implementations." },
          { q: "What is an AI readiness audit?", a: "An AI readiness audit assesses your current systems, data quality, workflows, and team capabilities to identify the best AI automation opportunities. KuWeX Studios provides free AI readiness audits that include a prioritized list of automation use cases, ROI projections, and a recommended implementation roadmap. Book yours at info@kuwexstudios.co.zw or +263 719 066 891." },
        ]}
      />

      {/* Free Quote Form */}
      <section className="py-20 px-4 bg-black border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-3xl">
          <ServiceQuoteForm serviceName="Applied AI & Business Automation" serviceValue="applied-ai" />
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
            <Link href="/services/software-development" className="px-4 py-2 bg-[#16181C] border border-[#2F3336]/60 rounded-full text-sm text-gray-400 hover:text-kuwex-cyan hover:border-kuwex-cyan/30 transition-all duration-300">
              Software Development Zimbabwe
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
