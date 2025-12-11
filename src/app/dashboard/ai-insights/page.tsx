"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  RefreshCw,
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

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  "How can I improve lead conversion?",
  "What tenders should I focus on?",
  "How do I reduce overdue invoices?",
  "Analyze my revenue trends",
  "Marketing strategy recommendations",
  "Client retention tips",
];

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "insights">("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-kuwex-cyan" size={28} />
            AI Business Assistant
          </h1>
          <p className="text-gray-500">Get intelligent insights and recommendations for your business</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2F3336] pb-2">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "chat" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          <MessageSquare size={18} />
          AI Chat
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "insights" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          <BarChart3 size={18} />
          Dashboard Insights
        </button>
      </div>

      {activeTab === "chat" ? (
        <>
          {/* AI Chat Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2 bg-[#16181C] border border-[#2F3336] rounded-2xl flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center">
                    <Bot size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">KuWeX AI Assistant</h3>
                    <p className="text-xs text-green-400">● Online</p>
                  </div>
                </div>
                <button 
                  onClick={clearChat}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
                >
                  <RefreshCw size={16} />
                  Clear Chat
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 flex items-center justify-center mb-4">
                      <Bot size={32} className="text-kuwex-cyan" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">How can I help you today?</h3>
                    <p className="text-gray-500 text-sm max-w-md mb-6">
                      Ask me about revenue analysis, lead management, project insights, tender strategies, or any business question.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                      {quickPrompts.slice(0, 4).map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(prompt)}
                          className="px-3 py-2 bg-[#0A0A0A] border border-[#2F3336] rounded-lg text-sm text-gray-400 hover:text-white hover:border-kuwex-cyan/50 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-black" />
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user' 
                          ? 'bg-kuwex-cyan text-black' 
                          : 'bg-[#0A0A0A] text-gray-300'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <div className="prose prose-invert prose-sm max-w-none">
                            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-[#2F3336] flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-black" />
                    </div>
                    <div className="bg-[#0A0A0A] rounded-2xl px-4 py-3">
                      <Loader2 className="animate-spin text-kuwex-cyan" size={20} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-[#2F3336]">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about revenue, leads, projects, tenders..."
                    className="flex-1 bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-kuwex-cyan text-black px-4 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-kuwex-cyan" />
                  Quick Prompts
                </h3>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      className="w-full text-left px-3 py-2 bg-[#0A0A0A] border border-[#2F3336] rounded-lg text-sm text-gray-400 hover:text-white hover:border-kuwex-cyan/50 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">💡 Pro Tip</h3>
                <p className="text-sm text-gray-400">
                  Ask specific questions for better insights. For example: "What's my best performing service this month?" or "Which clients should I follow up with?"
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
