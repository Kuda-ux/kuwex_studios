"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Receipt,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  Send,
} from "lucide-react";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "partial";

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  paid: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

const invoices: Invoice[] = [
  { id: "INV-001", client: "TechStart Inc", project: "Website Redesign", amount: 2500, paid: 2500, date: "2024-12-01", dueDate: "2024-12-15", status: "paid" },
  { id: "INV-002", client: "GreenEnergy Ltd", project: "Brand Identity", amount: 1800, paid: 900, date: "2024-12-05", dueDate: "2024-12-20", status: "partial" },
  { id: "INV-003", client: "HealthPlus", project: "Mobile App - Phase 1", amount: 2500, paid: 0, date: "2024-12-08", dueDate: "2024-12-22", status: "sent" },
  { id: "INV-004", client: "SafeBank", project: "Security Audit", amount: 3000, paid: 3000, date: "2024-11-15", dueDate: "2024-11-30", status: "paid" },
  { id: "INV-005", client: "EduLearn", project: "Marketing Campaign", amount: 1200, paid: 0, date: "2024-11-20", dueDate: "2024-12-05", status: "overdue" },
];

const statusConfig: Record<InvoiceStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400", icon: Receipt },
  sent: { label: "Sent", color: "bg-blue-500/20 text-blue-400", icon: Send },
  paid: { label: "Paid", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: AlertCircle },
  partial: { label: "Partial", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
};

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.client.toLowerCase().includes(searchQuery.toLowerCase()) || inv.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.reduce((sum, inv) => sum + inv.paid, 0),
    outstanding: invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
    overdue: invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-gray-500">Track payments and manage invoices</p>
        </div>
        <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Plus size={20} />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
              <DollarSign className="text-kuwex-cyan" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">${stats.total.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Invoiced</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-400">${stats.paid.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Paid</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="text-yellow-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-400">${stats.outstanding.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Outstanding</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="text-red-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-400">${stats.overdue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Overdue</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input type="text" placeholder="Search invoices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | "all")} className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices List */}
      <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F3336]">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Invoice #</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Paid</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Due Date</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const StatusIcon = statusConfig[invoice.status].icon;
                return (
                  <motion.tr key={invoice.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-[#2F3336] hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-kuwex-cyan">{invoice.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{invoice.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{invoice.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">${invoice.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">${invoice.paid.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${statusConfig[invoice.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[invoice.status].label}
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
    </div>
  );
}
