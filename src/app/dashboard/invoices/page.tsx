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
  Download,
  Eye,
  Send,
  Loader2,
  X,
  Trash2,
} from "lucide-react";
import { useInvoices, useClients } from "@/hooks/useDatabase";
import { Invoice } from "@/lib/supabase";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "partial";

const statusConfig: Record<InvoiceStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400", icon: Receipt },
  sent: { label: "Sent", color: "bg-blue-500/20 text-blue-400", icon: Send },
  paid: { label: "Paid", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: AlertCircle },
  partial: { label: "Partial", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
};

export default function InvoicesPage() {
  const { invoices, loading, createInvoice, updateInvoice, deleteInvoice, recordPayment, generateInvoiceNumber } = useInvoices();
  const { clients } = useClients();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    client_name: "",
    project_name: "",
    amount: "",
    due_date: "",
  });

  const resetForm = () => {
    setFormData({ client_name: "", project_name: "", amount: "", due_date: "" });
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) || inv.project_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0),
    paid: invoices.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0),
    outstanding: invoices.reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
    overdue: invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const invoiceNumber = await generateInvoiceNumber();
      await createInvoice({
        invoice_number: invoiceNumber,
        client_id: "",
        client_name: formData.client_name,
        project_name: formData.project_name,
        amount: parseFloat(formData.amount) || 0,
        paid_amount: 0,
        status: "draft",
        due_date: formData.due_date,
        items: [],
      });
      setShowNewInvoiceModal(false);
      resetForm();
    } catch (err) {
      console.error("Error creating invoice:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecordPayment = async () => {
    if (!showPaymentModal || !paymentAmount) return;
    setIsSubmitting(true);
    try {
      await recordPayment(showPaymentModal, parseFloat(paymentAmount));
      setShowPaymentModal(null);
      setPaymentAmount("");
    } catch (err) {
      console.error("Error recording payment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: InvoiceStatus) => {
    await updateInvoice(id, { status: newStatus });
  };

  const handleDelete = async (id: string) => {
    await deleteInvoice(id);
    setShowDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-kuwex-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-gray-500">Track payments and manage invoices</p>
        </div>
        <button onClick={() => setShowNewInvoiceModal(true)} className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
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
              {filteredInvoices.map((invoice: Invoice, index: number) => {
                const status = (invoice.status || "draft") as InvoiceStatus;
                const StatusIcon = statusConfig[status].icon;
                return (
                  <motion.tr key={invoice.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-[#2F3336] hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-kuwex-cyan">{invoice.invoice_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{invoice.client_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{invoice.project_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">${(invoice.amount || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">${(invoice.paid_amount || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(invoice.id, e.target.value as InvoiceStatus)}
                        className={`text-xs rounded-full px-2.5 py-1 border-0 cursor-pointer ${statusConfig[status].color}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {status !== "paid" && (
                          <button onClick={() => setShowPaymentModal(invoice.id)} className="p-1.5 hover:bg-green-500/20 rounded-lg transition-colors text-green-400 hover:text-green-300" title="Record Payment">
                            <DollarSign size={16} />
                          </button>
                        )}
                        <button onClick={() => setShowDeleteConfirm(invoice.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400" title="Delete">
                          <Trash2 size={16} />
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

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">New Invoice</h2>
              <button onClick={() => { setShowNewInvoiceModal(false); resetForm(); }} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Client Name</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#2F3336] rounded-xl px-4 py-2.5 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, project_name: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#2F3336] rounded-xl px-4 py-2.5 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#2F3336] rounded-xl px-4 py-2.5 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#2F3336] rounded-xl px-4 py-2.5 text-white"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setShowNewInvoiceModal(false); resetForm(); }} className="flex-1 px-4 py-2.5 border border-[#2F3336] rounded-xl text-gray-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50">
                  {isSubmitting ? "Creating..." : "Create Invoice"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Record Payment</h2>
              <button onClick={() => { setShowPaymentModal(null); setPaymentAmount(""); }} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Payment Amount ($)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentAmount(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#2F3336] rounded-xl px-4 py-2.5 text-white"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowPaymentModal(null); setPaymentAmount(""); }} className="flex-1 px-4 py-2.5 border border-[#2F3336] rounded-xl text-gray-400 hover:text-white">
                  Cancel
                </button>
                <button onClick={handleRecordPayment} disabled={isSubmitting || !paymentAmount} className="flex-1 bg-green-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-green-600 disabled:opacity-50">
                  {isSubmitting ? "Recording..." : "Record Payment"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold text-white mb-4">Delete Invoice?</h2>
            <p className="text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-[#2F3336] rounded-xl text-gray-400 hover:text-white">
                Cancel
              </button>
              <button onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)} className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-red-600">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
