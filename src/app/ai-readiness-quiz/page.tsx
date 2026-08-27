"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ServiceFAQ from "@/components/ServiceFAQ";
import {
  Brain, ArrowRight, ArrowLeft, CheckCircle2,
  Sparkles, TrendingUp, Zap, MessageCircle, Share2, RotateCcw,
  Building2, Users, Shield, Clock, Star,
} from "lucide-react";

type Question = {
  id: number;
  category: string;
  question: string;
  options: { text: string; score: number }[];
};

const questions: Question[] = [
  {
    id: 1,
    category: "Digital Presence",
    question: "Does your business have a website that customers can find on Google?",
    options: [
      { text: "No website — customers find us through WhatsApp or Facebook only", score: 0 },
      { text: "We have a basic Facebook page but no website", score: 1 },
      { text: "Yes, we have a modern website that's mobile-friendly and appears on Google", score: 2 },
      { text: "Yes — high-performance website with online booking, payments, and analytics", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Customer Data",
    question: "How do you store and manage customer information?",
    options: [
      { text: "Paper notebooks, receipt books, or my phone contacts", score: 0 },
      { text: "Excel spreadsheets or a basic database on one computer", score: 1 },
      { text: "Cloud-based system (Google Sheets, Zoho, or basic CRM) accessible from anywhere", score: 2 },
      { text: "Integrated CRM with automated data capture, customer history, and analytics", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Customer Communication",
    question: "How do customers mainly contact and interact with your business?",
    options: [
      { text: "Phone calls and walk-in visits only", score: 0 },
      { text: "Phone calls and WhatsApp — we reply manually when we can", score: 1 },
      { text: "WhatsApp Business + Facebook + website contact form, replies within hours", score: 2 },
      { text: "Omnichannel: WhatsApp Business API, website chat, social media, with automated instant responses", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Digital Marketing",
    question: "How do you attract new customers online?",
    options: [
      { text: "Word of mouth only — no online marketing at all", score: 0 },
      { text: "We post on Facebook sometimes when we remember", score: 1 },
      { text: "Regular social media posts + we've tried Google Ads or SEO", score: 2 },
      { text: "Data-driven marketing: SEO, paid ads, WhatsApp broadcasts, email automation, and analytics dashboards", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Daily Operations",
    question: "How much of your daily work involves manual, repetitive tasks?",
    options: [
      { text: "Almost everything is done manually — data entry, receipts, invoices, reports (80%+)", score: 0 },
      { text: "Mostly manual, but we use some tools like Excel or a POS system (50-80%)", score: 1 },
      { text: "Mix of manual and digital — some tasks are automated like invoicing (20-50% manual)", score: 2 },
      { text: "Highly automated — most repetitive tasks are systematized with software (<20% manual)", score: 3 },
    ],
  },
  {
    id: 6,
    category: "AI Awareness",
    question: "Have you or your team used AI tools like ChatGPT, Gemini, or Claude?",
    options: [
      { text: "No — we haven't tried any AI tools", score: 0 },
      { text: "I've heard of ChatGPT but haven't really used it for business", score: 1 },
      { text: "Yes, some of us use AI tools for writing posts, emails, or research", score: 2 },
      { text: "AI is part of our daily workflow — we use it for customer service, content, data analysis, and more", score: 3 },
    ],
  },
  {
    id: 7,
    category: "Process Automation",
    question: "Do you have any tasks that run automatically without human intervention?",
    options: [
      { text: "No — everything requires someone to do it manually", score: 0 },
      { text: "Just basic things like email autoresponders or calendar reminders", score: 1 },
      { text: "Several automated processes: invoicing, WhatsApp replies, report generation, stock alerts", score: 2 },
      { text: "Comprehensive automation across sales, operations, finance, marketing, and customer support", score: 3 },
    ],
  },
  {
    id: 8,
    category: "Business Intelligence",
    question: "How do you track and measure your business performance?",
    options: [
      { text: "Gut feeling — I know when business is good or bad", score: 0 },
      { text: "Basic spreadsheets and bank statements reviewed monthly", score: 1 },
      { text: "Weekly dashboards showing sales, expenses, and key metrics", score: 2 },
      { text: "Real-time dashboards with predictive analytics, trend forecasting, and automated alerts", score: 3 },
    ],
  },
  {
    id: 9,
    category: "Team Readiness",
    question: "How would your team respond if you introduced AI tools to help with their work?",
    options: [
      { text: "Resistance — they prefer the way things have always been done", score: 0 },
      { text: "Mixed feelings — some would be excited, others worried about their jobs", score: 1 },
      { text: "Generally open — they're willing to learn if it makes their work easier", score: 2 },
      { text: "Excited and proactive — they already suggest new tools and ways to work smarter", score: 3 },
    ],
  },
  {
    id: 10,
    category: "Investment Readiness",
    question: "Do you have a budget or plan for digital transformation in 2026?",
    options: [
      { text: "No — we don't have budget allocated for digital or AI projects", score: 0 },
      { text: "We're thinking about it but haven't set a specific budget yet", score: 1 },
      { text: "Yes, we have a budget and are currently exploring our options", score: 2 },
      { text: "Clear strategy with allocated budget, timeline, and executive buy-in", score: 3 },
    ],
  },
];

const maxScore = questions.length * 3;

function getScoreLevel(score: number) {
  const pct = (score / maxScore) * 100;
  if (pct >= 75)
    return {
      level: "AI-Ready Leader",
      color: "text-green-400",
      bg: "from-green-500/20 to-emerald-500/10",
      desc: "Your business is primed for AI transformation. You have the digital foundation, team readiness, and data infrastructure to deploy AI rapidly. KuWeX Studios can help you scale to enterprise-level AI automation within weeks — WhatsApp AI chatbots, predictive analytics, and full workflow automation.",
      recommendations: [
        "Deploy an AI-powered WhatsApp Business chatbot to handle 80% of customer queries automatically",
        "Implement predictive analytics for sales forecasting and inventory management",
        "Automate document processing with AI OCR for invoices, receipts, and contracts",
        "Set up AI-driven marketing automation across email, WhatsApp, and SMS",
      ],
    };
  if (pct >= 50)
    return {
      level: "AI-Ready",
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-blue-500/10",
      desc: "Your business has a solid foundation for AI adoption. With the right strategy and implementation partner, you can deploy AI chatbots, workflow automation, and predictive analytics within 2-4 months. KuWeX Studios can accelerate your journey with a pilot project starting at $3,000.",
      recommendations: [
        "Start with a WhatsApp AI chatbot pilot — handle customer queries 24/7 in English, Shona, and Ndebele",
        "Automate your most time-consuming manual task (invoicing, report generation, or data entry)",
        "Set up automated WhatsApp broadcasts for marketing and customer follow-ups",
        "Upgrade your CRM with AI-powered lead scoring and customer insights",
      ],
    };
  if (pct >= 25)
    return {
      level: "AI Beginner",
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-orange-500/10",
      desc: "You're at the start of your AI journey — and that's okay. The good news: you can leapfrog competitors by starting now. Zimbabwe's AI economy is just beginning, and early adopters will have a massive advantage. KuWeX Studios specializes in helping Zimbabwean SMEs go from zero to AI-powered with practical, ROI-focused pilots.",
      recommendations: [
        "Get a professional website if you don't have one — this is your digital storefront",
        "Set up WhatsApp Business with automated greetings and FAQ responses",
        "Start using a cloud-based CRM to organize customer data",
        "Try free AI tools like ChatGPT or Gemini for content creation and customer communication",
        "Book a free digital transformation consultation with KuWeX Studios",
      ],
    };
  return {
    level: "Build Digital Foundation First",
    color: "text-red-400",
    bg: "from-red-500/20 to-orange-500/10",
    desc: "Your business needs to build digital foundations before AI adoption. Don't worry — this is common for Zimbabwean SMEs. KuWeX Studios can help you establish your website, CRM, and digital marketing step by step, then layer AI automation on top once you're ready. Start with a free consultation today.",
    recommendations: [
      "Get a professional, mobile-friendly website (starts at $800 with KuWeX Studios)",
      "Set up WhatsApp Business for customer communication",
      "Create a Facebook page and start posting regularly",
      "Move customer data from paper to a simple digital system",
      "Claim your free Google Business Profile so customers can find you on Google Maps",
      "Book a free digital transformation consultation with KuWeX Studios",
    ],
  };
}

const quizFaqs = [
  { q: "What is an AI readiness quiz for Zimbabwean businesses?", a: "The KuWeX Studios AI Readiness Quiz is a free 10-question assessment tool designed specifically for Zimbabwean SMEs and corporates. It evaluates your business across 10 categories — digital presence, customer data, communication, marketing, operations, AI awareness, automation, business intelligence, team readiness, and investment — then provides a score from 0 to 30 with personalized recommendations. The quiz takes 3-5 minutes and results are instant." },
  { q: "How do I know if my Zimbabwean business is ready for AI?", a: "Your business is AI-ready if you have: a functional website or digital presence, a CRM or database for customer data, digital communication channels (WhatsApp Business, email), some form of digital marketing, team members open to learning new tools, and a budget for digital transformation. The KuWeX Studios AI Readiness Quiz scores these exact factors and tells you exactly where you stand. 70%+ score means you can deploy AI within weeks." },
  { q: "Is the AI readiness quiz free for Zimbabwean SMEs?", a: "Yes, the KuWeX Studios AI Readiness Quiz is 100% free for all Zimbabwean businesses. You get instant results without signing up. You can optionally enter your email to receive a detailed PDF report with personalized AI adoption recommendations, ROI projections, and a step-by-step roadmap. No credit card, no commitment, no spam." },
  { q: "How long does the AI readiness quiz take?", a: "The quiz takes 3-5 minutes to complete. There are 10 multiple-choice questions, each with 4 options. Results are calculated instantly and include a score breakdown by category, your AI readiness level, recommended next steps, and a shareable score for WhatsApp." },
  { q: "What score do I need to be considered AI-ready in Zimbabwe?", a: "A score of 23+ (75%) means you are an 'AI-Ready Leader' and can deploy enterprise AI within weeks. A score of 15+ (50%) means you are 'AI-Ready' and can implement AI chatbots and automation within months. A score of 8+ (25%) means you are an 'AI Beginner' — you can start with practical pilots. Below 8 means you should build digital foundations first (website, CRM, digital marketing) before AI adoption." },
  { q: "Can small businesses in Zimbabwe benefit from AI automation?", a: "Absolutely. Zimbabwean SMEs that adopt AI report 65% reduction in manual work, 3x faster customer response times, and significant cost savings. Even a simple WhatsApp AI chatbot can handle 80% of customer queries automatically — 24/7, in English, Shona, and Ndebele. The KuWeX Studios AI Readiness Quiz will show you exactly which AI tools make sense for your business size and budget." },
];

const trustStats = [
  { icon: Building2, value: "50+", label: "Zimbabwean Businesses Helped" },
  { icon: Star, value: "4.9★", label: "Client Satisfaction Rating" },
  { icon: Clock, value: "3 min", label: "Average Quiz Time" },
  { icon: Shield, value: "100%", label: "Free & Confidential" },
];

export default function AIReadinessQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...answers, questions[currentQ].options[optionIndex].score];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResults(false);
    setEmailSubmitted(false);
    setEmail("");
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const scoreLevel = getScoreLevel(totalScore);
  const scorePct = Math.round((totalScore / maxScore) * 100);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  const shareText = `I just took the AI Readiness Quiz from KuWeX Studios and scored ${totalScore}/${maxScore} — ${scoreLevel.level}! Is your Zimbabwean business AI-ready? Take the free quiz: https://kuwexstudios.co.zw/ai-readiness-quiz`;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <Brain size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Free AI Readiness Assessment for Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Is Your Business <span className="vibrant-gradient-text">AI-Ready?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Answer 10 quick questions about your Zimbabwean business and get your AI Readiness Score instantly.
            See how you compare, what steps to take next, and where AI can save you time and money.
          </motion.p>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon size={20} className="text-kuwex-cyan mx-auto mb-2" />
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quiz / Results */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="x-card-vibrant rounded-3xl p-8 md:p-12"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      Question {currentQ + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-kuwex-cyan font-bold">
                      {Math.round(((currentQ) / questions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="h-2 bg-[#16181C] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentQ / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-kuwex-cyan/10 border border-kuwex-cyan/20 rounded-full mb-4">
                  <Sparkles size={14} className="text-kuwex-cyan" />
                  <span className="text-xs text-kuwex-cyan font-medium">{questions[currentQ].category}</span>
                </div>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                  {questions[currentQ].question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQ].options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                        selectedOption === i
                          ? "bg-kuwex-cyan/10 border-kuwex-cyan/50 text-white"
                          : "bg-[#16181C] border-[#2F3336]/60 text-gray-400 hover:border-kuwex-cyan/30 hover:text-white"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedOption === i ? "border-kuwex-cyan bg-kuwex-cyan/20" : "border-[#2F3336]"
                      }`}>
                        {selectedOption === i && <CheckCircle2 size={14} className="text-kuwex-cyan" />}
                      </div>
                      <span className="text-sm md:text-base">{option.text}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Back button */}
                {currentQ > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQ(currentQ - 1);
                      setAnswers(answers.slice(0, -1));
                      setSelectedOption(null);
                    }}
                    className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-kuwex-cyan transition-colors"
                  >
                    <ArrowLeft size={16} /> Previous Question
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="x-card-vibrant rounded-3xl p-8 md:p-12"
              >
                {/* Score Circle */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className={`relative w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br ${scoreLevel.bg} border-2 border-kuwex-cyan/30 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className={`text-5xl font-black ${scoreLevel.color}`}>{totalScore}</div>
                      <div className="text-sm text-gray-500">out of {maxScore}</div>
                    </div>
                  </motion.div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${scoreLevel.bg} border border-kuwex-cyan/30 rounded-full mb-4`}>
                    <Sparkles size={16} className={scoreLevel.color} />
                    <span className={`font-bold ${scoreLevel.color}`}>{scoreLevel.level}</span>
                  </div>

                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                    {scoreLevel.desc}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4">Your Score Breakdown</h3>
                  <div className="space-y-3">
                    {questions.map((q, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-32 flex-shrink-0 truncate">{q.category}</span>
                        <div className="flex-1 h-2 bg-[#16181C] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              answers[i] === 3 ? "bg-green-400" : answers[i] === 2 ? "bg-cyan-400" : answers[i] === 1 ? "bg-yellow-400" : "bg-red-400"
                            }`}
                            style={{ width: `${(answers[i] / 3) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{answers[i]}/3</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-kuwex-cyan" /> Recommended Next Steps
                  </h3>
                  <div className="space-y-2">
                    {scoreLevel.recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-[#0A0A0A] border border-[#2F3336]/40 rounded-xl"
                      >
                        <CheckCircle2 size={16} className="text-kuwex-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Email Capture */}
                {!emailSubmitted ? (
                  <div className="bg-[#0A0A0A] border border-[#2F3336]/60 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">Get Your Detailed AI Readiness Report</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Enter your email to receive a detailed PDF report with personalized recommendations,
                      ROI projections for your business, and a step-by-step AI adoption roadmap for Zimbabwe.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-3 bg-[#16181C] border border-[#2F3336] rounded-xl text-white text-sm focus:outline-none focus:border-kuwex-cyan/50"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        Get Report <ArrowRight size={16} />
                      </button>
                    </form>
                    <p className="text-xs text-gray-600 mt-3">We&apos;ll send your report within 24 hours. No spam, ever. Your data stays confidential.</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6 text-center"
                  >
                    <CheckCircle2 size={32} className="text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Report on the way!</h3>
                    <p className="text-gray-400 text-sm">Check your inbox within 24 hours for your detailed AI Readiness Report.</p>
                  </motion.div>
                )}

                {/* Share + CTA */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Share2 size={16} /> Share on WhatsApp
                  </a>
                  <button
                    onClick={handleRestart}
                    className="flex-1 px-6 py-3 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <RotateCcw size={16} /> Retake Quiz
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/services/applied-ai"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Zap size={16} /> Explore AI Solutions <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/roi-calculator"
                    className="flex-1 px-6 py-4 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <TrendingUp size={16} className="text-kuwex-cyan" /> Calculate Your ROI
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 px-6 py-4 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <MessageCircle size={16} className="text-[#25D366]" /> Talk to Us
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Why This Matters for Zimbabwe */}
      <section className="py-20 px-4 bg-[#0A0A0A] border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <TrendingUp size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">Zimbabwe AI Economy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why AI Matters for <span className="vibrant-gradient-text">Zimbabwean SMEs</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Zimbabwe&apos;s economy is shifting. With the National AI Strategy 2026-2030, Econet&apos;s Gemini AI partnership,
              and Cassava&apos;s GPU cloud, AI is becoming accessible to businesses of all sizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "65%", label: "Reduction in manual work with AI automation", source: "KuWeX Studios client data, Zimbabwe" },
              { stat: "3x", label: "Faster customer response times with AI chatbots", source: "WhatsApp Business API deployments" },
              { stat: "$15K+", label: "Average annual savings for 10-person SMEs", source: "KuWeX Studios ROI analysis, 2025" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6 text-center"
              >
                <p className="text-4xl font-black vibrant-gradient-text mb-2">{item.stat}</p>
                <p className="text-sm text-gray-300 mb-3">{item.label}</p>
                <p className="text-xs text-gray-600">{item.source}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-[#16181C] border border-[#2F3336]/40 rounded-2xl">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-bold">Zimbabwe AI Context:</span> The Zimbabwean government launched the
              National AI Strategy 2026-2030 to position the country as an AI hub in Southern Africa. Econet has partnered
              with Google to bring Gemini AI to Zimbabwean mobile users. Cassava Technologies is building GPU cloud
              infrastructure in Africa. This means AI tools are becoming more accessible and affordable for Zimbabwean
              SMEs than ever before. Businesses that adopt AI now will have a significant competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section — AEO optimized visible content for AI answer engines */}
      <ServiceFAQ
        serviceName="AI Readiness Quiz"
        faqs={quizFaqs}
      />

      <Footer />
    </main>
  );
}
