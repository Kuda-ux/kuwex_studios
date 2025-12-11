"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Briefcase,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  Lightbulb,
} from "lucide-react";

type TenderStatus = "identified" | "planning" | "submitted" | "won" | "lost";

interface Tender {
  id: number;
  title: string;
  organization: string;
  value: number;
  deadline: string;
  status: TenderStatus;
  matchScore: number;
  category: string;
}

const tenders: Tender[] = [
  { id: 1, title: "Government Website Modernization", organization: "Ministry of ICT", value: 25000, deadline: "2024-12-20", status: "planning", matchScore: 92, category: "Web Development" },
  { id: 2, title: "Corporate Branding Project", organization: "ZimTrade", value: 8000, deadline: "2024-12-25", status: "submitted", matchScore: 88, category: "Branding" },
  { id: 3, title: "Digital Marketing Campaign", organization: "Tourism Authority", value: 12000, deadline: "2025-01-15", status: "identified", matchScore: 95, category: "Marketing" },
  { id: 4, title: "Mobile App Development", organization: "Health Ministry", value: 35000, deadline: "2024-12-18", status: "submitted", matchScore: 78, category: "Mobile Apps" },
  { id: 5, title: "Annual Report Design", organization: "Reserve Bank", value: 5000, deadline: "2024-11-30", status: "won", matchScore: 90, category: "Branding" },
  { id: 6, title: "E-commerce Platform", organization: "SME Association", value: 18000, deadline: "2024-12-10", status: "lost", matchScore: 72, category: "Web Development" },
];

const statusConfig: Record<TenderStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  identified: { label: "Identified", color: "bg-blue-500/20 text-blue-400", icon: Lightbulb },
  planning: { label: "Planning", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  submitted: { label: "Submitted", color: "bg-purple-500/20 text-purple-400", icon: FileText },
  won: { label: "Won", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function TendersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TenderStatus | "all">("all");

  const filteredTenders = tenders.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tenders.length,
    active: tenders.filter((t) => t.status === "planning" || t.status === "submitted").length,
    won: tenders.filter((t) => t.status === "won").length,
    wonValue: tenders.filter((t) => t.status === "won").reduce((sum, t) => sum + t.value, 0),
    pipeline: tenders.filter((t) => t.status !== "won" && t.status !== "lost").reduce((sum, t) => sum + t.value, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tender Management</h1>
          <p className="text-gray-500">Track and manage tender opportunities</p>
        </div>
        <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Plus size={20} />
          Add Tender
        </button>
      </div>

      {/* AI Suggestion */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="text-purple-400" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">AI Tender Match</h3>
            <p className="text-gray-400 text-sm">Based on your portfolio, the "Digital Marketing Campaign" tender from Tourism Authority has a 95% match score. Your past work in tourism marketing makes you a strong candidate.</p>
            <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium">View Tender Details →</button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Tenders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.active}</p>
          <p className="text-xs text-gray-500">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-green-400">{stats.won}</p>
          <p className="text-xs text-gray-500">Won</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">${stats.wonValue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Won Value</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-purple-400">${stats.pipeline.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Pipeline Value</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input type="text" placeholder="Search tenders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as TenderStatus | "all")} className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
          <option value="all">All Status</option>
          <option value="identified">Identified</option>
          <option value="planning">Planning</option>
          <option value="submitted">Submitted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Tenders List */}
      <div className="space-y-4">
        {filteredTenders.map((tender, index) => {
          const StatusIcon = statusConfig[tender.status].icon;
          return (
            <motion.div key={tender.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:border-[#3F4346] transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-[#2F3336] text-gray-300 text-xs px-2.5 py-1 rounded-full">{tender.category}</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full ${statusConfig[tender.status].color}`}>
                      <StatusIcon size={12} />
                      {statusConfig[tender.status].label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{tender.title}</h3>
                  <p className="text-gray-500 text-sm">{tender.organization}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Value</p>
                    <p className="font-semibold text-white">${tender.value.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Deadline</p>
                    <p className="font-semibold text-white">{new Date(tender.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Match Score</p>
                    <p className={`font-semibold ${tender.matchScore >= 85 ? "text-green-400" : tender.matchScore >= 70 ? "text-yellow-400" : "text-red-400"}`}>{tender.matchScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Download size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
