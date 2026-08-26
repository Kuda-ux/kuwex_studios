"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain, ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertCircle,
  Sparkles, TrendingUp, Zap, MessageCircle, Share2, RotateCcw,
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
    category: "Digital Infrastructure",
    question: "How would you describe your current website?",
    options: [
      { text: "We don't have a website", score: 0 },
      { text: "Basic website, rarely updated, not mobile-friendly", score: 1 },
      { text: "Modern website, mobile-friendly, regularly updated", score: 2 },
      { text: "High-performance website with CMS, analytics, and lead capture", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Data Management",
    question: "How does your business manage customer data?",
    options: [
      { text: "Paper files or Excel spreadsheets", score: 0 },
      { text: "Basic CRM or database, manually updated", score: 1 },
      { text: "Cloud-based CRM with some automation", score: 2 },
      { text: "Integrated CRM with automated data capture and analytics", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Customer Communication",
    question: "How do customers primarily contact your business?",
    options: [
      { text: "Phone calls and walk-ins only", score: 0 },
      { text: "Phone, email, and some social media", score: 1 },
      { text: "WhatsApp Business + website forms + social media", score: 2 },
      { text: "Omnichannel: WhatsApp, web chat, social, automated responses", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Marketing",
    question: "How do you handle marketing and lead generation?",
    options: [
      { text: "Word of mouth only, no digital marketing", score: 0 },
      { text: "Occasional social media posts, no strategy", score: 1 },
      { text: "Regular social media + some Google Ads or SEO", score: 2 },
      { text: "Data-driven marketing with SEO, paid ads, email automation, and analytics", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Operations",
    question: "How much of your daily operations involve manual, repetitive tasks?",
    options: [
      { text: "Almost everything is manual (80%+)", score: 0 },
      { text: "Mostly manual with some digital tools (50-80%)", score: 1 },
      { text: "Mix of manual and automated processes (20-50% manual)", score: 2 },
      { text: "Highly automated — most repetitive tasks are systematized (<20% manual)", score: 3 },
    ],
  },
  {
    id: 6,
    category: "AI Awareness",
    question: "Has your team used AI tools like ChatGPT, Claude, or Gemini for work?",
    options: [
      { text: "No, we haven't explored AI at all", score: 0 },
      { text: "A few team members have tried it personally", score: 1 },
      { text: "Some teams use AI tools occasionally for specific tasks", score: 2 },
      { text: "AI is integrated into our daily workflows across teams", score: 3 },
    ],
  },
  {
    id: 7,
    category: "Automation",
    question: "Do you have any automated workflows in your business?",
    options: [
      { text: "No automation at all", score: 0 },
      { text: "Basic email autoresponders or calendar booking", score: 1 },
      { text: "Several automated workflows (invoicing, notifications, reports)", score: 2 },
      { text: "Comprehensive automation across sales, ops, finance, and marketing", score: 3 },
    ],
  },
  {
    id: 8,
    category: "Analytics",
    question: "How do you measure business performance?",
    options: [
      { text: "Gut feeling and basic financial statements", score: 0 },
      { text: "Basic spreadsheets and monthly reviews", score: 1 },
      { text: "Dashboards with KPIs updated weekly", score: 2 },
      { text: "Real-time dashboards with predictive analytics and alerts", score: 3 },
    ],
  },
  {
    id: 9,
    category: "Team Readiness",
    question: "How would your team react to adopting new AI tools?",
    options: [
      { text: "Resistance — they prefer traditional methods", score: 0 },
      { text: "Mixed — some excited, some hesitant", score: 1 },
      { text: "Generally open and willing to learn", score: 2 },
      { text: "Eager and proactive — they actively suggest new tools", score: 3 },
    ],
  },
  {
    id: 10,
    category: "Budget & Strategy",
    question: "Do you have a budget or plan for digital transformation in 2026?",
    options: [
      { text: "No budget or plan for digital transformation", score: 0 },
      { text: "Thinking about it but no concrete budget", score: 1 },
      { text: "Have a budget and are exploring options", score: 2 },
      { text: "Clear strategy with allocated budget and timeline", score: 3 },
    ],
  },
];

const maxScore = questions.length * 3;

function getScoreLevel(score: number) {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return { level: "AI-Ready Leader", color: "text-green-400", bg: "from-green-500/20 to-emerald-500/10", desc: "Your business is primed for AI transformation. You have the digital foundation, team readiness, and data infrastructure to deploy AI rapidly. KuWeX Studios can help you scale to enterprise-level AI automation within weeks." };
  if (pct >= 50) return { level: "AI-Ready", color: "text-cyan-400", bg: "from-cyan-500/20 to-blue-500/10", desc: "Your business has a solid foundation for AI adoption. With the right strategy and implementation partner, you can deploy AI chatbots, workflow automation, and predictive analytics within months. KuWeX Studios can accelerate your journey." };
  if (pct >= 25) return { level: "AI Beginner", color: "text-yellow-400", bg: "from-yellow-500/20 to-orange-500/10", desc: "You're at the start of your AI journey. The good news: you can leapfrog competitors by starting now. KuWeX Studios specializes in helping Zimbabwean businesses go from zero to AI-powered with practical, ROI-focused pilots." };
  return { level: "Needs Digital Foundation", color: "text-red-400", bg: "from-red-500/20 to-orange-500/10", desc: "Your business needs to build digital foundations before AI adoption. KuWeX Studios can help you establish your website, CRM, and digital marketing — then layer AI automation on top. Start with a free consultation." };
}

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

  const shareText = `I just took the AI Readiness Quiz from KuWeX Studios and scored ${totalScore}/${maxScore} — ${scoreLevel.level}! Is your business AI-ready? Take the quiz: https://kuwexstudios.co.zw/ai-readiness-quiz`;

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
            <span className="text-sm text-gray-400">Free AI Readiness Assessment</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            AI Readiness <span className="vibrant-gradient-text">Quiz</span> for Zimbabwe Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Answer 10 quick questions and get your AI Readiness Score instantly.
            See how your business compares and what steps to take next.
          </motion.p>
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

                {/* Email Capture */}
                {!emailSubmitted ? (
                  <div className="bg-[#0A0A0A] border border-[#2F3336]/60 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">Get Your Detailed AI Readiness Report</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Enter your email to receive a detailed report with personalized recommendations, ROI projections, and next steps for your business.
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
                    <p className="text-xs text-gray-600 mt-3">We&apos;ll send your report within 24 hours. No spam, ever.</p>
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
                    <Share2 size={16} /> Share Results
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

      <Footer />
    </main>
  );
}
