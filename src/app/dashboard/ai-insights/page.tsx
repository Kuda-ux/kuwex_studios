"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Target,
  DollarSign,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Insight {
  id: number;
  type: "opportunity" | "warning" | "success" | "action";
  title: string;
  description: string;
  impact: string;
  action: string;
}

const insights: Insight[] = [
  { id: 1, type: "opportunity", title: "High-Value Lead Detected", description: "BuildRight Construction has shown strong interest in your services. Their estimated project value is $4,500.", impact: "Potential $4,500 revenue", action: "Contact Lead" },
  { id: 2, type: "warning", title: "Revenue Below Target", description: "Your monthly revenue is 2% below the target. Consider promoting Web Development services which have the highest margin.", impact: "-$167 from target", action: "View Marketing" },
  { id: 3, type: "success", title: "Project Ahead of Schedule", description: "TechStart Website project is 3 days ahead of schedule. Great job maintaining productivity!", impact: "Early delivery bonus possible", action: "View Project" },
  { id: 4, type: "action", title: "Follow-up Required", description: "3 quotations have been pending for more than 5 days without response. Follow up to increase conversion.", impact: "$5,500 at risk", action: "View Quotations" },
  { id: 5, type: "opportunity", title: "Upsell Opportunity", description: "HealthPlus has been a loyal client. Consider offering them a maintenance package for their mobile app.", impact: "Potential $200/month recurring", action: "Create Proposal" },
  { id: 6, type: "warning", title: "Inactive Clients", description: "2 clients haven't been contacted in over 30 days. Send a check-in message to maintain relationships.", impact: "Client retention risk", action: "View Clients" },
];

const predictions = [
  { label: "Projected Monthly Revenue", value: "$9,200", change: 12, trend: "up" },
  { label: "Expected New Leads", value: "8-12", change: 25, trend: "up" },
  { label: "Project Completion Rate", value: "94%", change: 3, trend: "up" },
  { label: "Client Satisfaction", value: "4.8/5", change: 0.2, trend: "up" },
];

const recommendations = [
  { title: "Focus on Web Development", description: "Web development projects have the highest profit margin (72%). Consider allocating more marketing budget here.", priority: "high" },
  { title: "Automate Invoice Reminders", description: "Set up automatic payment reminders to reduce overdue invoices by an estimated 40%.", priority: "medium" },
  { title: "Expand LinkedIn Presence", description: "Your LinkedIn engagement is 15% higher than other platforms. Post more frequently there.", priority: "medium" },
  { title: "Bundle Services", description: "Clients who purchase bundled services have 60% higher lifetime value. Create package deals.", priority: "low" },
];

const typeConfig = {
  opportunity: { color: "bg-blue-500/20 text-blue-400 border-blue-500/20", icon: Lightbulb },
  warning: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20", icon: AlertCircle },
  success: { color: "bg-green-500/20 text-green-400 border-green-500/20", icon: CheckCircle2 },
  action: { color: "bg-orange-500/20 text-orange-400 border-orange-500/20", icon: Clock },
};

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-kuwex-cyan" size={28} />
            AI Insights
          </h1>
          <p className="text-gray-500">Smart recommendations powered by AI analysis</p>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {predictions.map((pred, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${pred.trend === "up" ? "text-green-400" : "text-red-400"} flex items-center gap-1`}>
                {pred.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                +{pred.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{pred.value}</p>
            <p className="text-sm text-gray-500">{pred.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Smart Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-kuwex-cyan" size={20} />
          Smart Alerts & Insights
        </h2>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div key={insight.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className={`p-4 rounded-xl border ${config.color}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{insight.description}</p>
                    <p className="text-xs text-gray-500">Impact: {insight.impact}</p>
                  </div>
                  <button className="flex-shrink-0 text-sm text-kuwex-cyan hover:underline flex items-center gap-1">
                    {insight.action}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="text-kuwex-cyan" size={20} />
            Growth Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-[#0A0A0A] rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{rec.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${rec.priority === "high" ? "bg-red-500/20 text-red-400" : rec.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{rec.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="text-kuwex-cyan" size={20} />
            Performance Analysis
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Revenue vs Target</span>
                <span className="text-white font-medium">98%</span>
              </div>
              <div className="h-3 bg-[#2F3336] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full" style={{ width: "98%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Project Delivery</span>
                <span className="text-white font-medium">105%</span>
              </div>
              <div className="h-3 bg-[#2F3336] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Lead Conversion</span>
                <span className="text-white font-medium">72%</span>
              </div>
              <div className="h-3 bg-[#2F3336] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Client Retention</span>
                <span className="text-white font-medium">87%</span>
              </div>
              <div className="h-3 bg-[#2F3336] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: "87%" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
