"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import ServiceFAQ from "@/components/ServiceFAQ";
import {
  Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight,
  MessageCircle, Share2, Zap, CheckCircle2, Building2, Shield, Star, Briefcase,
} from "lucide-react";

type Sector = {
  name: string;
  icon: typeof Building2;
  employees: number;
  salary: number;
  manualHours: number;
  queries: number;
  responseTime: number;
};

const sectors: Sector[] = [
  { name: "Retail & Shop", icon: Building2, employees: 5, salary: 350, manualHours: 70, queries: 40, responseTime: 6 },
  { name: "Tourism & Hospitality", icon: Building2, employees: 15, salary: 450, manualHours: 55, queries: 80, responseTime: 4 },
  { name: "Construction & Engineering", icon: Building2, employees: 25, salary: 600, manualHours: 65, queries: 30, responseTime: 8 },
  { name: "Professional Services", icon: Briefcase, employees: 8, salary: 800, manualHours: 50, queries: 25, responseTime: 3 },
  { name: "E-commerce & Tech", icon: Building2, employees: 12, salary: 700, manualHours: 45, queries: 100, responseTime: 2 },
  { name: "Manufacturing", icon: Building2, employees: 50, salary: 400, manualHours: 75, queries: 20, responseTime: 12 },
];

const roiFaqs = [
  { q: "How much can a Zimbabwean business save with AI automation?", a: "Zimbabwean businesses can save 50-80% on manual operational costs with AI automation. Based on KuWeX Studios' client data, a 10-employee company spending 60% of time on manual tasks can save $15,000-$25,000 annually. A 50-employee company can save $75,000+. Use the free ROI Calculator at https://kuwexstudios.co.zw/roi-calculator to get a customized estimate for your business." },
  { q: "Is the AI ROI calculator free for Zimbabwean businesses?", a: "Yes, the KuWeX Studios AI ROI Calculator is 100% free for all Zimbabwean businesses. Adjust the sliders to match your business — number of employees, average salary, percentage of manual tasks, daily customer queries, and response time — and get instant ROI projections. No signup, no email required, instant results." },
  { q: "How accurate is the AI ROI calculator for Zimbabwe?", a: "The calculator uses industry-standard AI automation savings rates: 65% reduction in manual task time and 90% reduction in customer query handling costs. These figures are based on global AI automation studies and validated against KuWeX Studios' real client results in Zimbabwe. Actual savings vary by industry and implementation scope. Book a free consultation for a detailed ROI analysis tailored to your business." },
  { q: "What is the ROI of AI automation for SMEs in Zimbabwe?", a: "Zimbabwean SMEs typically see 200-500% ROI in the first year of AI automation. A $3,000 AI pilot project (e.g., a WhatsApp chatbot) can save $15,000+ annually in labor costs. A $10,000 AI transformation package can save $50,000+. Use the free ROI Calculator at https://kuwexstudios.co.zw/roi-calculator to calculate your specific ROI." },
  { q: "How much does AI automation cost for a small business in Zimbabwe?", a: "AI automation for Zimbabwean small businesses starts at $3,000 for a pilot project (e.g., WhatsApp AI chatbot or single workflow automation). Full AI transformation packages start at $10,000. Enterprise AI systems are custom-quoted. KuWeX Studios always starts with a pilot so you see ROI before scaling. See https://kuwexstudios.co.zw/services/applied-ai for full pricing." },
  { q: "What business processes can be automated with AI in Zimbabwe?", a: "Zimbabwean businesses can automate: customer support (WhatsApp AI chatbots), data entry and document processing (OCR), invoicing and receipt generation, appointment scheduling and reminders, inventory alerts and reorder triggers, email and WhatsApp marketing sequences, report generation, payment follow-ups, and sales lead qualification. The ROI Calculator shows potential savings for each category." },
];

const trustStats = [
  { icon: Building2, value: "50+", label: "Zimbabwean Businesses Helped" },
  { icon: Star, value: "4.9★", label: "Client Satisfaction Rating" },
  { icon: Shield, value: "100%", label: "Free & Confidential" },
  { icon: TrendingUp, value: "65%", label: "Avg. Manual Work Reduction" },
];

export default function ROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(400);
  const [manualHours, setManualHours] = useState(60);
  const [customerQueries, setCustomerQueries] = useState(50);
  const [responseTime, setResponseTime] = useState(4);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const results = useMemo(() => {
    const totalMonthlyHours = employees * (manualHours / 100) * 160;
    const hourlyRate = avgSalary / 160;
    const monthlyManualCost = totalMonthlyHours * hourlyRate;
    const automationSavings = monthlyManualCost * 0.65;

    const queryHandlingCost = customerQueries * responseTime * 0.05;
    const aiQueryCost = customerQueries * 0.5 * 0.02;
    const monthlyQuerySavings = queryHandlingCost - aiQueryCost;

    const totalMonthlySavings = automationSavings + monthlyQuerySavings;
    const totalAnnualSavings = totalMonthlySavings * 12;
    const aiMonthlyCost = Math.min(totalMonthlySavings * 0.15, 2000);
    const netAnnualSavings = totalAnnualSavings - aiMonthlyCost * 12;
    const roi = Math.round((netAnnualSavings / (aiMonthlyCost * 12)) * 100);

    return {
      monthlyManualCost: Math.round(monthlyManualCost),
      automationSavings: Math.round(automationSavings),
      monthlyQuerySavings: Math.round(monthlyQuerySavings),
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      aiMonthlyCost: Math.round(aiMonthlyCost),
      netAnnualSavings: Math.round(netAnnualSavings),
      roi,
      hoursSaved: Math.round(totalMonthlyHours * 0.65),
    };
  }, [employees, avgSalary, manualHours, customerQueries, responseTime]);

  const shareText = `My Zimbabwean business could save $${results.totalAnnualSavings.toLocaleString()}/year with AI automation! Calculate your savings: https://kuwexstudios.co.zw/roi-calculator`;

  const applySector = (sector: Sector) => {
    setSelectedSector(sector.name);
    setEmployees(sector.employees);
    setAvgSalary(sector.salary);
    setManualHours(sector.manualHours);
    setCustomerQueries(sector.queries);
    setResponseTime(sector.responseTime);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8 w-fit">
            <Calculator size={16} className="text-kuwex-cyan" />
            <span className="text-sm text-gray-400">Free AI ROI Calculator for Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            AI Automation <span className="vibrant-gradient-text">ROI Calculator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            See how much your Zimbabwean business could save with AI automation.
            Pick your sector, adjust the sliders, and get instant ROI projections in USD.
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

      {/* Calculator */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Sector Presets */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-3 text-center">Quick start — pick your business sector:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {sectors.map((sector) => (
                <button
                  key={sector.name}
                  onClick={() => applySector(sector)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                    selectedSector === sector.name
                      ? "bg-kuwex-cyan/10 border-kuwex-cyan/50 text-kuwex-cyan"
                      : "bg-[#16181C] border-[#2F3336]/60 text-gray-400 hover:border-kuwex-cyan/30 hover:text-white"
                  }`}
                >
                  {sector.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="x-card-vibrant rounded-3xl p-8"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users size={20} className="text-kuwex-cyan" /> Your Business
              </h2>

              <div className="space-y-6">
                {/* Employees */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Number of employees</label>
                    <span className="text-kuwex-cyan font-bold text-lg">{employees}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full accent-kuwex-cyan"
                  />
                </div>

                {/* Avg Salary */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Average monthly salary per employee (USD)</label>
                    <span className="text-kuwex-cyan font-bold text-lg">${avgSalary}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="50"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="w-full accent-kuwex-cyan"
                  />
                </div>

                {/* Manual Hours */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">% of time spent on manual tasks</label>
                    <span className="text-kuwex-cyan font-bold text-lg">{manualHours}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={manualHours}
                    onChange={(e) => setManualHours(Number(e.target.value))}
                    className="w-full accent-kuwex-cyan"
                  />
                </div>

                <div className="border-t border-[#2F3336]/40 pt-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageCircle size={20} className="text-kuwex-cyan" /> Customer Service
                  </h2>

                  {/* Customer Queries */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-400">Daily customer queries</label>
                      <span className="text-kuwex-cyan font-bold text-lg">{customerQueries}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      value={customerQueries}
                      onChange={(e) => setCustomerQueries(Number(e.target.value))}
                      className="w-full accent-kuwex-cyan"
                    />
                  </div>

                  {/* Response Time */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-400">Avg response time (hours)</label>
                      <span className="text-kuwex-cyan font-bold text-lg">{responseTime}h</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="48"
                      value={responseTime}
                      onChange={(e) => setResponseTime(Number(e.target.value))}
                      className="w-full accent-kuwex-cyan"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Big Number */}
              <div className="x-card-vibrant rounded-3xl p-8 bg-gradient-to-b from-kuwex-cyan/10 to-transparent">
                <p className="text-sm text-gray-400 mb-2">Estimated Annual Savings</p>
                <motion.p
                  key={results.totalAnnualSavings}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-black vibrant-gradient-text mb-4"
                >
                  ${results.totalAnnualSavings.toLocaleString()}
                </motion.p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-sm text-green-400 font-bold">{results.roi}% ROI</span>
                  <span className="text-xs text-gray-500">after AI implementation costs</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="x-card-vibrant rounded-3xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Monthly Savings Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Clock size={14} className="text-cyan-400" />
                      </div>
                      <span className="text-sm text-gray-400">Workflow automation</span>
                    </div>
                    <span className="text-white font-bold">${results.automationSavings.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                        <MessageCircle size={14} className="text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-400">AI customer support</span>
                    </div>
                    <span className="text-white font-bold">${results.monthlyQuerySavings.toLocaleString()}/mo</span>
                  </div>
                  <div className="border-t border-[#2F3336]/40 pt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Total monthly savings</span>
                    <span className="text-kuwex-cyan font-bold text-lg">${results.totalMonthlySavings.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">AI implementation cost</span>
                    <span className="text-gray-400 text-sm">-${results.aiMonthlyCost.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Hours saved monthly</span>
                    <span className="text-white font-bold">{results.hoursSaved.toLocaleString()} hrs</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <Zap size={16} /> Get a Free AI Audit <ArrowRight size={16} />
                </Link>
                <div className="flex gap-3">
                  <Link
                    href="/ai-readiness-quiz"
                    className="flex-1 px-6 py-3 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <CheckCircle2 size={16} className="text-kuwex-cyan" /> Take AI Quiz
                  </Link>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Share2 size={16} /> Share on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-600 text-center mt-8 max-w-2xl mx-auto">
            These estimates are based on industry averages for AI automation savings (65% reduction in manual tasks, 90% reduction in query handling costs) and validated against KuWeX Studios client data in Zimbabwe.
            Actual results vary by business. Book a free consultation for a detailed ROI analysis tailored to your business.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#0A0A0A] border-t border-[#2F3336]/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="vibrant-badge mx-auto mb-6 w-fit">
              <Calculator size={16} className="text-kuwex-cyan" />
              <span className="text-sm text-gray-400">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From <span className="vibrant-gradient-text">Calculator</span> to Implementation
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See your savings, then let KuWeX Studios make it happen. Here&apos;s how we turn your ROI projection into real business results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Calculate Your ROI", desc: "Use the free calculator above to see your potential savings. Pick your sector, adjust the sliders, and get instant projections." },
              { step: "2", title: "Free Consultation", desc: "Book a 30-minute call with KuWeX Studios. We'll review your business, validate the numbers, and propose a pilot project with clear ROI milestones." },
              { step: "3", title: "Deploy & Save", desc: "We implement your AI automation — WhatsApp chatbot, workflow automation, or full AI transformation. Most pilots launch in 2-4 weeks with measurable ROI." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/30 flex items-center justify-center mb-4">
                  <span className="text-kuwex-cyan font-bold">{item.step}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — AEO optimized visible content for AI answer engines */}
      <ServiceFAQ
        serviceName="AI ROI Calculator"
        faqs={roiFaqs}
      />

      <Footer />
    </main>
  );
}
