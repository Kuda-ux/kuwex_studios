"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Eye,
  ArrowRight,
  Loader2,
  X,
  Edit,
  Trash2,
  Trash,
} from "lucide-react";
import { useQuotations, useClients } from "@/hooks/useDatabase";
import type { Quotation, QuotationItem } from "@/lib/types";

type QuoteStatus = Quotation["status"];

const statusConfig: Record<
  QuoteStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-500/20 text-blue-400", icon: Send },
  accepted: { label: "Accepted", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400", icon: XCircle },
  expired: { label: "Expired", color: "bg-orange-500/20 text-orange-400", icon: Clock },
};

interface ItemRow {
  description: string;
  quantity: number;
  unit_price: number;
}

interface QuoteForm {
  quote_number: string;
  client_id: string;
  client_name: string;
  project_name: string;
  status: QuoteStatus;
  valid_until: string;
  items: ItemRow[];
}

const emptyForm: QuoteForm = {
  quote_number: "",
  client_id: "",
  client_name: "",
  project_name: "",
  status: "draft",
  valid_until: "",
  items: [{ description: "", quantity: 1, unit_price: 0 }],
};

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function QuotationsPage() {
  const {
    quotations,
    loading,
    error,
    createQuotation,
    updateQuotation,
    deleteQuotation,
    convertToInvoice,
    generateQuoteNumber,
  } = useQuotations();
  const { clients } = useClients();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [form, setForm] = useState<QuoteForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return quotations.filter((q) => {
      if (statusFilter !== "all" && q.status !== statusFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          q.quote_number.toLowerCase().includes(s) ||
          q.client_name?.toLowerCase().includes(s) ||
          q.project_name?.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [quotations, search, statusFilter]);

  const stats = useMemo(() => {
    const total = quotations.length;
    const pending = quotations.filter((q) => q.status === "sent").length;
    const accepted = quotations.filter((q) => q.status === "accepted").length;
    const totalValue = quotations.reduce((s, q) => s + (q.amount || 0), 0);
    const acceptedValue = quotations
      .filter((q) => q.status === "accepted")
      .reduce((s, q) => s + (q.amount || 0), 0);
    return { total, pending, accepted, totalValue, acceptedValue };
  }, [quotations]);

  const totalAmount = (items: ItemRow[]) =>
    items.reduce((s, it) => s + it.quantity * it.unit_price, 0);

  const openCreate = async () => {
    const num = await generateQuoteNumber();
    setEditing(null);
    setForm({ ...emptyForm, quote_number: num });
    setShowForm(true);
  };

  const openEdit = (q: Quotation) => {
    setEditing(q);
    setForm({
      quote_number: q.quote_number,
      client_id: q.client_id || "",
      client_name: q.client_name || "",
      project_name: q.project_name || "",
      status: q.status,
      valid_until: q.valid_until || "",
      items:
        q.items && q.items.length
          ? q.items.map((it) => ({
              description: it.description,
              quantity: it.quantity,
              unit_price: it.unit_price,
            }))
          : [{ description: "", quantity: 1, unit_price: 0 }],
    });
    setShowForm(true);
  };

  const onClientChange = (clientId: string) => {
    const c = clients.find((x) => x.id === clientId);
    setForm((p) => ({
      ...p,
      client_id: clientId,
      client_name: c?.name || "",
    }));
  };

  const updateItem = (i: number, patch: Partial<ItemRow>) => {
    setForm((p) => ({
      ...p,
      items: p.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)),
    }));
  };

  const addItem = () =>
    setForm((p) => ({ ...p, items: [...p.items, { description: "", quantity: 1, unit_price: 0 }] }));

  const removeItem = (i: number) =>
    setForm((p) => ({
      ...p,
      items: p.items.length > 1 ? p.items.filter((_, idx) => idx !== i) : p.items,
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const items: QuotationItem[] = form.items.map((it) => ({
        description: it.description,
        quantity: it.quantity,
        unit_price: it.unit_price,
        total: it.quantity * it.unit_price,
      }));
      const amount = items.reduce((s, it) => s + it.total, 0);
      const payload = {
        quote_number: form.quote_number,
        client_id: form.client_id,
        client_name: form.client_name,
        project_name: form.project_name,
        amount,
        status: form.status,
        valid_until: form.valid_until,
        items,
      };
      if (editing) {
        await updateQuotation(editing.id, payload);
      } else {
        await createQuotation(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (q: Quotation) => {
    if (!confirm(`Delete quotation ${q.quote_number}?`)) return;
    try {
      await deleteQuotation(q.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const convert = async (q: Quotation) => {
    if (!confirm(`Convert quotation ${q.quote_number} to invoice?`)) return;
    try {
      await convertToInvoice(q.id);
      alert("Invoice created. Check Invoices page.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to convert");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quotations</h1>
          <p className="text-gray-500">Create and manage client quotes</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          <p className="text-xs text-gray-500">Sent (Pending)</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-green-400">{stats.accepted}</p>
          <p className="text-xs text-gray-500">Accepted</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{fmtMoney(stats.totalValue)}</p>
          <p className="text-xs text-gray-500">Total Value</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">{fmtMoney(stats.acceptedValue)}</p>
          <p className="text-xs text-gray-500">Won Value</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by number, client or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | "all")}
          className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
          <FileText className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">
            {quotations.length === 0 ? "No quotations yet" : "No matches"}
          </h3>
          <p className="text-gray-500 mb-4">
            {quotations.length === 0
              ? "Create your first quotation to start tracking proposals."
              : "Try a different filter."}
          </p>
          {quotations.length === 0 && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90"
            >
              <Plus size={20} />
              New Quotation
            </button>
          )}
        </div>
      ) : (
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
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, i) => {
                  const cfg = statusConfig[q.status];
                  const Icon = cfg.icon;
                  return (
                    <motion.tr
                      key={q.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-[#2F3336] hover:bg-[#1a1a1a]"
                    >
                      <td className="px-6 py-4 font-mono text-sm text-kuwex-cyan">{q.quote_number}</td>
                      <td className="px-6 py-4 text-white font-medium">{q.client_name || "—"}</td>
                      <td className="px-6 py-4 text-gray-400">{q.project_name || "—"}</td>
                      <td className="px-6 py-4 text-white font-semibold">{fmtMoney(q.amount || 0)}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {q.valid_until ? new Date(q.valid_until).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${cfg.color}`}>
                          <Icon size={12} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(q)}
                            className="p-1.5 hover:bg-[#2F3336] rounded-lg text-gray-400 hover:text-white"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          {q.status === "accepted" && (
                            <button
                              onClick={() => convert(q)}
                              className="p-1.5 hover:bg-[#2F3336] rounded-lg text-gray-400 hover:text-green-400"
                              title="Convert to Invoice"
                            >
                              <ArrowRight size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => remove(q)}
                            className="p-1.5 hover:bg-[#2F3336] rounded-lg text-gray-400 hover:text-red-400"
                            title="Delete"
                          >
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
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-2xl my-8"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editing ? `Edit ${editing.quote_number}` : "New Quotation"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Quote Number</label>
                  <input
                    type="text"
                    value={form.quote_number}
                    onChange={(e) => setForm({ ...form, quote_number: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as QuoteStatus })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Client</label>
                  <select
                    value={form.client_id}
                    onChange={(e) => onClientChange(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="">— Select client (or type below) —</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {!form.client_id && (
                    <input
                      type="text"
                      value={form.client_name}
                      onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                      placeholder="Or type client name"
                      className="mt-2 w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={form.project_name}
                    onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Valid Until</label>
                <input
                  type="date"
                  value={form.valid_until}
                  onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
                  className="w-full md:w-64 bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-400">Line Items</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-xs text-kuwex-cyan hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Add item
                  </button>
                </div>
                <div className="space-y-2">
                  {form.items.map((it, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Description"
                        value={it.description}
                        onChange={(e) => updateItem(i, { description: e.target.value })}
                        className="col-span-6 bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-kuwex-cyan/50"
                      />
                      <input
                        type="number"
                        min={1}
                        placeholder="Qty"
                        value={it.quantity}
                        onChange={(e) => updateItem(i, { quantity: parseFloat(e.target.value) || 0 })}
                        className="col-span-2 bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-kuwex-cyan/50"
                      />
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="Unit price"
                        value={it.unit_price}
                        onChange={(e) =>
                          updateItem(i, { unit_price: parseFloat(e.target.value) || 0 })
                        }
                        className="col-span-3 bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-kuwex-cyan/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        disabled={form.items.length === 1}
                        className="col-span-1 flex items-center justify-center text-gray-400 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-right text-sm text-gray-400 mt-2">
                  Total:{" "}
                  <span className="text-white font-semibold">{fmtMoney(totalAmount(form.items))}</span>
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2F3336] text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kuwex-cyan text-black font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editing ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
