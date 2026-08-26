"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight,
  MessageCircle, Share2, Zap, CheckCircle2,
} from "lucide-react";

export default function ROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(400);
  const [manualHours, setManualHours] = useState(60);
  const [customerQueries, setCustomerQueries] = useState(50);
  const [responseTime, setResponseTime] = useState(4);

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

  const shareText = `My business could save $${results.totalAnnualSavings.toLocaleString()}/year with AI automation! Calculate your savings: https://kuwexstudios.co.zw/roi-calculator`;

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
            <span className="text-sm text-gray-400">Free AI ROI Calculator</span>
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
            See how much your business could save with AI automation.
            Adjust the sliders to match your business and get instant ROI projections.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
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
                    <label className="text-sm text-gray-400">Average monthly salary (USD)</label>
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
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Share2 size={16} /> Share Your Results
                </a>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-600 text-center mt-8 max-w-2xl mx-auto">
            These estimates are based on industry averages for AI automation savings (65% reduction in manual tasks, 90% reduction in query handling costs).
            Actual results vary by business. Book a free consultation for a detailed ROI analysis tailored to your business.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
