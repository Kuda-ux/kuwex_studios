"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  MoreVertical,
  Download,
  Eye,
  ArrowRight,
} from "lucide-react";

type QuotationStatus = "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired";

interface Quotation {
  id: string;
  client: string;
  project: string;
  amount: number;
  date: string;
  validUntil: string;
  status: QuotationStatus;
  items: number;
}

const quotations: Quotation[] = [
  { id: "QUO-001", client: "TechStart Inc", project: "Website Redesign", amount: 2500, date: "2024-12-10", validUntil: "2024-12-25", status: "sent", items: 5 },
  { id: "QUO-002", client: "GreenEnergy Ltd", project: "Brand Identity Package", amount: 1800, date: "2024-12-08", validUntil: "2024-12-23", status: "viewed", items: 4 },
  { id: "QUO-003", client: "HealthPlus", project: "Mobile App Development", amount: 5000, date: "2024-12-05", validUntil: "2024-12-20", status: "accepted", items: 8 },
  { id: "QUO-004", client: "EduLearn", project: "Marketing Campaign", amount: 1200, date: "2024-12-01", validUntil: "2024-12-16", status: "draft", items: 3 },
  { id: "QUO-005", client: "SafeBank", project: "Security Audit", amount: 3000, date: "2024-11-25", validUntil: "2024-12-10", status: "expired", items: 6 },
  { id: "QUO-006", client: "Urban Styles", project: "Social Media Package", amount: 800, date: "2024-12-09", validUntil: "2024-12-24", status: "rejected", items: 2 },
];

const statusConfig: Record<QuotationStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-500/20 text-blue-400", icon: Send },
  viewed: { label: "Viewed", color: "bg-purple-500/20 text-purple-400", icon: Eye },
  accepted: { label: "Accepted", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400", icon: XCircle },
  expired: { label: "Expired", color: "bg-orange-500/20 text-orange-400", icon: Clock },
};

export default function QuotationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | "all">("all");
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch = q.client.toLowerCase().includes(searchQuery.toLowerCase()) || q.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: quotations.length,
    pending: quotations.filter((q) => q.status === "sent" || q.status === "viewed").length,
    accepted: quotations.filter((q) => q.status === "accepted").length,
    totalValue: quotations.reduce((sum, q) => sum + q.amount, 0),
    acceptedValue: quotations.filter((q) => q.status === "accepted").reduce((sum, q) => sum + q.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quotations</h1>
          <p className="text-gray-500">Create and manage client quotations</p>
        </div>
        <button onClick={() => setShowNewQuoteModal(true)} className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Plus size={20} />
          New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Quotes</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-green-400">{stats.accepted}</p>
          <p className="text-xs text-gray-500">Accepted</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Value</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">${stats.acceptedValue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Won Value</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input type="text" placeholder="Search quotations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as QuotationStatus | "all")} className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="viewed">Viewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Quotations List */}
      <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F3336]">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Quote #</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Valid Until</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quote, index) => {
                const StatusIcon = statusConfig[quote.status].icon;
                return (
                  <motion.tr key={quote.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-[#2F3336] hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-kuwex-cyan">{quote.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{quote.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{quote.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">${quote.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{new Date(quote.validUntil).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${statusConfig[quote.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[quote.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Download size={16} />
                        </button>
                        {quote.status === "accepted" && (
                          <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-green-400" title="Convert to Invoice">
                            <ArrowRight size={16} />
                          </button>
                        )}
                        <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Quote Modal */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-white mb-6">Create New Quotation</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Client</label>
                <select className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
                  <option>Select client...</option>
                  <option>TechStart Inc</option>
                  <option>GreenEnergy Ltd</option>
                  <option>HealthPlus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                <input type="text" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Enter project name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount ($)</label>
                  <input type="number" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Valid Until</label>
                  <input type="date" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewQuoteModal(false)} className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">Create Quote</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
