"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Plus,
  Search,
  Calendar,
  DollarSign,
  Building2,
  Trophy,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  X,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useTenders } from "@/hooks/useDatabase";
import { Tender } from "@/lib/types";

type TenderStatus = "identified" | "planning" | "submitted" | "won" | "lost";

const statusConfig: Record<
  TenderStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  identified: { label: "Identified", color: "bg-blue-500/20 text-blue-400", icon: AlertCircle },
  planning: { label: "Planning", color: "bg-purple-500/20 text-purple-400", icon: Clock },
  submitted: { label: "Submitted", color: "bg-yellow-500/20 text-yellow-400", icon: Briefcase },
  won: { label: "Won", color: "bg-green-500/20 text-green-400", icon: Trophy },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400", icon: X },
};

interface TenderForm {
  title: string;
  organization: string;
  value: number;
  deadline: string;
  status: TenderStatus;
  category: string;
  description: string;
  requirements: string;
}

const emptyForm: TenderForm = {
  title: "",
  organization: "",
  value: 0,
  deadline: "",
  status: "identified",
  category: "",
  description: "",
  requirements: "",
};

export default function TendersPage() {
  const { tenders, loading, error, createTender, updateTender, deleteTender } = useTenders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TenderStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Tender | null>(null);
  const [form, setForm] = useState<TenderForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return tenders.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.organization?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [tenders, search, statusFilter]);

  const stats = useMemo(() => {
    const totalValue = tenders.reduce((s, t) => s + (t.value || 0), 0);
    const wonValue = tenders.filter((t) => t.status === "won").reduce((s, t) => s + (t.value || 0), 0);
    const winRate = tenders.length
      ? Math.round(
          (tenders.filter((t) => t.status === "won").length /
            Math.max(1, tenders.filter((t) => ["won", "lost"].includes(t.status)).length)) *
            100
        )
      : 0;
    return {
      total: tenders.length,
      pipeline: tenders.filter((t) => ["identified", "planning", "submitted"].includes(t.status)).length,
      totalValue,
      wonValue,
      winRate,
    };
  }, [tenders]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (t: Tender) => {
    setEditing(t);
    setForm({
      title: t.title,
      organization: t.organization || "",
      value: t.value || 0,
      deadline: t.deadline || "",
      status: t.status,
      category: t.category || "",
      description: t.description || "",
      requirements: t.requirements || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateTender(editing.id, form);
      } else {
        await createTender({ ...form, match_score: 0 });
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

  const handleDelete = async (t: Tender) => {
    if (!confirm(`Delete tender "${t.title}"?`)) return;
    try {
      await deleteTender(t.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const fmtMoney = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenders & Bigger Projects</h1>
          <p className="text-gray-500">Track tender opportunities and large project bids</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          New Tender
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Tenders", value: stats.total, icon: Briefcase, color: "kuwex-cyan" },
          { label: "Active Pipeline", value: stats.pipeline, icon: TrendingUp, color: "blue-500" },
          { label: "Pipeline Value", value: fmtMoney(stats.totalValue), icon: DollarSign, color: "purple-500" },
          { label: "Win Rate", value: `${stats.winRate}%`, icon: Trophy, color: "green-500" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center mb-3`}>
                <Icon className={`text-${s.color}`} size={20} />
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search tenders, organizations, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {(["all", "identified", "planning", "submitted", "won", "lost"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-kuwex-cyan text-black"
                  : "bg-[#16181C] border border-[#2F3336] text-gray-400 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
          <p className="font-medium">Failed to load tenders</p>
          <p className="text-sm text-red-400/70 mt-1">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
          <Briefcase className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">
            {tenders.length === 0 ? "No tenders yet" : "No tenders match your filters"}
          </h3>
          <p className="text-gray-500 mb-4">
            {tenders.length === 0
              ? "Add your first tender or bigger project to start tracking opportunities."
              : "Try adjusting your search or filters."}
          </p>
          {tenders.length === 0 && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
            >
              <Plus size={20} />
              Add First Tender
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t, i) => {
            const cfg = statusConfig[t.status];
            const Icon = cfg.icon;
            const daysUntilDeadline = t.deadline
              ? Math.ceil((new Date(t.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              : null;
            const urgent =
              daysUntilDeadline !== null &&
              daysUntilDeadline >= 0 &&
              daysUntilDeadline <= 7 &&
              !["won", "lost"].includes(t.status);

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-[#3F4346] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${cfg.color}`}>
                        <Icon size={12} />
                        {cfg.label}
                      </span>
                      {t.category && (
                        <span className="px-2.5 py-1 text-xs rounded-full bg-[#2F3336] text-gray-300">
                          {t.category}
                        </span>
                      )}
                      {urgent && (
                        <span className="px-2.5 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                          {daysUntilDeadline === 0 ? "Due today" : `${daysUntilDeadline}d left`}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{t.title}</h3>
                    {t.organization && (
                      <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
                        <Building2 size={14} />
                        {t.organization}
                      </p>
                    )}
                    {t.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{t.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {t.value > 0 && (
                        <span className="flex items-center gap-1.5 text-green-400 font-medium">
                          <DollarSign size={14} />
                          {fmtMoney(t.value)}
                        </span>
                      )}
                      {t.deadline && (
                        <span className="flex items-center gap-1.5 text-gray-400">
                          <Calendar size={14} />
                          {new Date(t.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="p-2 rounded-lg bg-[#0A0A0A] border border-[#2F3336] text-gray-400 hover:text-white hover:border-kuwex-cyan/50 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(t)}
                      className="p-2 rounded-lg bg-[#0A0A0A] border border-[#2F3336] text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                {editing ? "Edit Tender" : "New Tender"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Government Website Redesign Tender"
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Organization</label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="Issuing organization"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Web Development, Branding"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Value (USD)</label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as TenderStatus })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    {(Object.keys(statusConfig) as TenderStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {statusConfig[s].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the tender / project scope"
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Key requirements, submission notes, contacts..."
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2F3336] text-gray-300 hover:text-white hover:border-[#3F4346] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kuwex-cyan text-black font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50 transition-colors"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editing ? "Save Changes" : "Create Tender"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
