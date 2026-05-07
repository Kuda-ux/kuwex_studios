"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  UserPlus,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Loader2,
  X,
  Trash2,
  Edit,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Flame,
  AlertTriangle,
  Trophy,
  Filter,
} from "lucide-react";
import { useLeads, useClients, useInvoices } from "@/hooks/useDatabase";
import { Lead, Client, Invoice } from "@/lib/types";

type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-500/20 text-blue-400" },
  contacted: { label: "Contacted", color: "bg-yellow-500/20 text-yellow-400" },
  qualified: { label: "Qualified", color: "bg-purple-500/20 text-purple-400" },
  proposal: { label: "Proposal", color: "bg-orange-500/20 text-orange-400" },
  won: { label: "Won", color: "bg-green-500/20 text-green-400" },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400" },
};

const sourceConfig: Record<string, { label: string; color: string }> = {
  website: { label: "Website", color: "text-cyan-400" },
  whatsapp: { label: "WhatsApp", color: "text-green-400" },
  facebook: { label: "Facebook", color: "text-blue-400" },
  referral: { label: "Referral", color: "text-purple-400" },
  linkedin: { label: "LinkedIn", color: "text-blue-500" },
  other: { label: "Other", color: "text-gray-400" },
};

// Probability of closing per pipeline stage (industry-standard weighted forecast)
const stageProbability: Record<LeadStatus, number> = {
  new: 0.1,
  contacted: 0.2,
  qualified: 0.4,
  proposal: 0.6,
  won: 1.0,
  lost: 0,
};

const funnelStages: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won"];

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const daysSince = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));

export default function CRMPage() {
  const { leads, loading: leadsLoading, createLead, updateLead, deleteLead, convertToClient } = useLeads();
  const { clients, loading: clientsLoading, createClient, updateClient, deleteClient } = useClients();
  const { invoices } = useInvoices();
  
  const [activeTab, setActiveTab] = useState<"leads" | "clients">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: "lead" | "client"; id: string } | null>(null);

  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "website",
    value: "",
    notes: "",
    service: "",
  });

  // Client form state
  const [clientForm, setClientForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const resetLeadForm = () => {
    setLeadForm({ name: "", company: "", email: "", phone: "", source: "website", value: "", notes: "", service: "" });
  };

  const resetClientForm = () => {
    setClientForm({ name: "", company: "", email: "", phone: "" });
  };

  const loading = leadsLoading || clientsLoading;

  // ---------- Real-time business analytics ----------
  const analytics = useMemo(() => {
    const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).getTime();

    // Leads created in periods
    const leadsThisMonth = leads.filter((l) => new Date(l.created_at).getTime() >= thisMonthStart).length;
    const leadsLastMonth = leads.filter((l) => {
      const t = new Date(l.created_at).getTime();
      return t >= lastMonthStart && t < thisMonthStart;
    }).length;
    const monthGrowth = leadsLastMonth > 0
      ? Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100)
      : leadsThisMonth > 0 ? 100 : 0;

    // Pipeline value (open leads only)
    const openLeads = leads.filter((l) => l.status !== "won" && l.status !== "lost");
    const pipelineValue = openLeads.reduce((s, l) => s + (l.value || 0), 0);
    const weightedPipeline = openLeads.reduce(
      (s, l) => s + (l.value || 0) * (stageProbability[l.status as LeadStatus] || 0),
      0
    );

    // Conversion rate (won out of finalized leads)
    const wonLeads = leads.filter((l) => l.status === "won");
    const lostLeads = leads.filter((l) => l.status === "lost");
    const closed = wonLeads.length + lostLeads.length;
    const conversionRate = closed > 0 ? Math.round((wonLeads.length / closed) * 100) : 0;

    // Average deal size (won leads)
    const wonValue = wonLeads.reduce((s, l) => s + (l.value || 0), 0);
    const avgDealSize = wonLeads.length > 0 ? wonValue / wonLeads.length : 0;

    // Average time to close (won leads, created_at -> updated_at)
    const avgTimeToClose = wonLeads.length > 0
      ? Math.round(
          wonLeads.reduce((s, l) => {
            const created = new Date(l.created_at).getTime();
            const closedAt = new Date(l.updated_at).getTime();
            return s + Math.max(0, (closedAt - created) / (1000 * 60 * 60 * 24));
          }, 0) / wonLeads.length
        )
      : 0;

    // Lead funnel — counts and value per stage
    const funnel = funnelStages.map((stage) => {
      const stageLeads = leads.filter((l) => l.status === stage);
      return {
        stage,
        label: statusConfig[stage].label,
        count: stageLeads.length,
        value: stageLeads.reduce((s, l) => s + (l.value || 0), 0),
      };
    });
    const maxFunnelCount = Math.max(1, ...funnel.map((f) => f.count));

    // Lead sources breakdown with per-source conversion
    const sourceMap = new Map<string, { total: number; won: number; value: number }>();
    leads.forEach((l) => {
      const src = l.source || "other";
      const cur = sourceMap.get(src) || { total: 0, won: 0, value: 0 };
      cur.total += 1;
      if (l.status === "won") cur.won += 1;
      cur.value += l.value || 0;
      sourceMap.set(src, cur);
    });
    const sources = Array.from(sourceMap.entries())
      .map(([src, v]) => ({
        source: src,
        ...v,
        conversionRate: v.total > 0 ? Math.round((v.won / v.total) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total);

    // Top clients by REAL revenue (paid invoices)
    const clientRevenue = clients.map((c) => {
      const revenue = invoices
        .filter((inv: Invoice) => inv.client_id === c.id)
        .reduce((s: number, inv: Invoice) => s + (inv.paid_amount || 0), 0);
      const outstanding = invoices
        .filter((inv: Invoice) => inv.client_id === c.id && inv.status !== "paid")
        .reduce((s: number, inv: Invoice) => s + ((inv.amount || 0) - (inv.paid_amount || 0)), 0);
      return { client: c, revenue, outstanding };
    });
    const totalRevenue = clientRevenue.reduce((s, x) => s + x.revenue, 0);
    const totalOutstanding = clientRevenue.reduce((s, x) => s + x.outstanding, 0);
    const topClients = [...clientRevenue].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    // Smart alerts
    const staleLeads = openLeads.filter((l) => daysSince(l.updated_at) >= 14);
    const hotLeads = leads.filter((l) => l.status === "qualified" || l.status === "proposal");
    const inactiveClients = clients.filter((c) => {
      const recent = invoices.find((inv: Invoice) => inv.client_id === c.id);
      if (!recent) return c.status === "inactive" || daysSince(c.created_at) > 60;
      return daysSince(recent.created_at) > 60;
    });

    return {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === "new").length,
      totalClients: clients.length,
      activeClients: clients.filter((c) => c.status === "active").length,
      leadsThisMonth,
      leadsLastMonth,
      monthGrowth,
      pipelineValue,
      weightedPipeline,
      conversionRate,
      avgDealSize,
      avgTimeToClose,
      wonValue,
      wonCount: wonLeads.length,
      lostCount: lostLeads.length,
      funnel,
      maxFunnelCount,
      sources,
      topClients,
      totalRevenue,
      totalOutstanding,
      staleLeads,
      hotLeads,
      inactiveClients,
    };
  }, [leads, clients, invoices]);

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    return (
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const leadData = {
        name: leadForm.name,
        company: leadForm.company,
        email: leadForm.email,
        phone: leadForm.phone,
        source: leadForm.source,
        value: parseFloat(leadForm.value) || 0,
        notes: leadForm.notes,
        service: leadForm.service,
        status: "new" as const,
      };
      if (editingLead) {
        await updateLead(editingLead.id, leadData);
      } else {
        await createLead(leadData);
      }
      setShowNewLeadModal(false);
      setEditingLead(null);
      resetLeadForm();
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const clientData = {
        name: clientForm.name,
        company: clientForm.company,
        email: clientForm.email,
        phone: clientForm.phone,
        total_spent: 0,
        projects_count: 0,
        status: "active" as const,
        joined_date: new Date().toISOString().split("T")[0],
      };
      if (editingClient) {
        await updateClient(editingClient.id, clientData);
      } else {
        await createClient(clientData);
      }
      setShowNewClientModal(false);
      setEditingClient(null);
      resetClientForm();
    } catch (err) {
      console.error("Error saving client:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      if (showDeleteConfirm.type === "lead") {
        await deleteLead(showDeleteConfirm.id);
      } else {
        await deleteClient(showDeleteConfirm.id);
      }
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleConvertToClient = async (leadId: string) => {
    try {
      await convertToClient(leadId);
    } catch (err) {
      console.error("Error converting lead:", err);
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setLeadForm({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      value: lead.value?.toString() || "",
      notes: lead.notes || "",
      service: lead.service || "",
    });
    setShowNewLeadModal(true);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLead(leadId, { status: newStatus });
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
          <h1 className="text-2xl font-bold text-white">Clients & CRM</h1>
          <p className="text-gray-500">Manage leads and client relationships</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { resetLeadForm(); setEditingLead(null); setShowNewLeadModal(true); }}
            className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
          >
            <UserPlus size={20} />
            Add Lead
          </button>
          <button
            onClick={() => { resetClientForm(); setEditingClient(null); setShowNewClientModal(true); }}
            className="flex items-center gap-2 border border-kuwex-cyan text-kuwex-cyan px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/10 transition-colors"
          >
            <Users size={20} />
            Add Client
          </button>
        </div>
      </div>

      {/* KPI Row — Business Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <DollarSign size={12} /> Pipeline Value
          </div>
          <p className="text-xl font-bold text-white">{fmtMoney(analytics.pipelineValue)}</p>
          <p className="text-[10px] text-gray-500 mt-1">{analytics.totalLeads - analytics.wonCount - analytics.lostCount} open leads</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Target size={12} /> Weighted Forecast
          </div>
          <p className="text-xl font-bold text-kuwex-cyan">{fmtMoney(analytics.weightedPipeline)}</p>
          <p className="text-[10px] text-gray-500 mt-1">probability-adjusted</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Trophy size={12} /> Conversion Rate
          </div>
          <p className="text-xl font-bold text-green-400">{analytics.conversionRate}%</p>
          <p className="text-[10px] text-gray-500 mt-1">{analytics.wonCount} won / {analytics.lostCount} lost</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <DollarSign size={12} /> Avg Deal Size
          </div>
          <p className="text-xl font-bold text-white">{fmtMoney(analytics.avgDealSize)}</p>
          <p className="text-[10px] text-gray-500 mt-1">{fmtMoney(analytics.wonValue)} total won</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <UserPlus size={12} /> Leads This Month
          </div>
          <p className="text-xl font-bold text-white">{analytics.leadsThisMonth}</p>
          <p className={`text-[10px] mt-1 flex items-center gap-1 ${analytics.monthGrowth >= 0 ? "text-green-400" : "text-red-400"}`}>
            {analytics.monthGrowth >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {analytics.monthGrowth >= 0 ? "+" : ""}{analytics.monthGrowth}% vs last
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Clock size={12} /> Avg Time to Close
          </div>
          <p className="text-xl font-bold text-white">{analytics.avgTimeToClose}<span className="text-sm text-gray-500"> days</span></p>
          <p className="text-[10px] text-gray-500 mt-1">based on won deals</p>
        </motion.div>
      </div>

      {/* Smart Alerts */}
      {(analytics.staleLeads.length > 0 || analytics.hotLeads.length > 0 || analytics.inactiveClients.length > 0 || analytics.totalOutstanding > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {analytics.hotLeads.length > 0 && (
            <button
              onClick={() => setActiveTab("leads")}
              className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-left hover:bg-orange-500/15 transition-colors"
            >
              <Flame className="text-orange-400 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-orange-400">{analytics.hotLeads.length} hot lead{analytics.hotLeads.length === 1 ? "" : "s"}</p>
                <p className="text-xs text-gray-400 mt-0.5">Qualified or in proposal stage — close them.</p>
              </div>
            </button>
          )}
          {analytics.staleLeads.length > 0 && (
            <button
              onClick={() => setActiveTab("leads")}
              className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-left hover:bg-yellow-500/15 transition-colors"
            >
              <AlertTriangle className="text-yellow-400 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-yellow-400">{analytics.staleLeads.length} stale lead{analytics.staleLeads.length === 1 ? "" : "s"}</p>
                <p className="text-xs text-gray-400 mt-0.5">No update in 14+ days. Follow up now.</p>
              </div>
            </button>
          )}
          {analytics.totalOutstanding > 0 && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <DollarSign className="text-red-400 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-red-400">{fmtMoney(analytics.totalOutstanding)} outstanding</p>
                <p className="text-xs text-gray-400 mt-0.5">Unpaid invoice balance across clients.</p>
              </div>
            </div>
          )}
          {analytics.inactiveClients.length > 0 && (
            <button
              onClick={() => setActiveTab("clients")}
              className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-left hover:bg-purple-500/15 transition-colors"
            >
              <Users className="text-purple-400 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-purple-400">{analytics.inactiveClients.length} inactive client{analytics.inactiveClients.length === 1 ? "" : "s"}</p>
                <p className="text-xs text-gray-400 mt-0.5">No invoices in 60+ days — re-engage.</p>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Pipeline Funnel */}
      <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-kuwex-cyan" />
            <h2 className="font-semibold text-white">Sales Pipeline</h2>
          </div>
          <p className="text-xs text-gray-500">Click a stage to filter</p>
        </div>
        <div className="space-y-2">
          {analytics.funnel.map((f) => {
            const widthPct = (f.count / analytics.maxFunnelCount) * 100;
            const cfg = statusConfig[f.stage];
            return (
              <button
                key={f.stage}
                onClick={() => { setActiveTab("leads"); setStatusFilter(f.stage); }}
                className="w-full text-left group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium group-hover:text-white">{cfg.label}</span>
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>{f.count} lead{f.count === 1 ? "" : "s"}</span>
                    <span className="text-kuwex-cyan font-medium">{fmtMoney(f.value)}</span>
                  </div>
                </div>
                <div className="h-7 bg-[#0A0A0A] rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${cfg.color.replace("/20", "/40")} transition-all duration-500`}
                    style={{ width: `${Math.max(widthPct, f.count > 0 ? 4 : 0)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lead Sources + Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-kuwex-cyan" />
            <h2 className="font-semibold text-white">Lead Sources</h2>
          </div>
          {analytics.sources.length === 0 ? (
            <p className="text-sm text-gray-500">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {analytics.sources.map((s) => {
                const totalLeads = analytics.totalLeads || 1;
                const sharePct = Math.round((s.total / totalLeads) * 100);
                const cfg = sourceConfig[s.source] || sourceConfig.other;
                return (
                  <div key={s.source}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className={`font-medium ${cfg.color}`}>{cfg.label}</span>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{s.total} lead{s.total === 1 ? "" : "s"}</span>
                        <span className="text-green-400">{s.conversionRate}% won</span>
                        <span className="text-kuwex-cyan font-medium">{fmtMoney(s.value)}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue transition-all duration-500"
                        style={{ width: `${sharePct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-kuwex-cyan" />
              <h2 className="font-semibold text-white">Top Clients by Revenue</h2>
            </div>
            <p className="text-xs text-gray-500">{fmtMoney(analytics.totalRevenue)} total</p>
          </div>
          {analytics.topClients.length === 0 || analytics.totalRevenue === 0 ? (
            <p className="text-sm text-gray-500">
              No paid invoices yet. Once invoices are paid, top clients will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {analytics.topClients.filter((tc) => tc.revenue > 0).map((tc, i) => {
                const widthPct = analytics.topClients[0].revenue > 0
                  ? (tc.revenue / analytics.topClients[0].revenue) * 100
                  : 0;
                return (
                  <div key={tc.client.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-white truncate">
                        <span className="text-gray-500 mr-2">#{i + 1}</span>
                        {tc.client.company || tc.client.name}
                      </span>
                      <span className="text-kuwex-cyan font-semibold text-xs">{fmtMoney(tc.revenue)}</span>
                    </div>
                    <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue transition-all duration-500"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    {tc.outstanding > 0 && (
                      <p className="text-[10px] text-orange-400 mt-1">
                        {fmtMoney(tc.outstanding)} outstanding
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "leads" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "clients" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Clients ({clients.length})
          </button>
        </div>
        {activeTab === "leads" && statusFilter !== "all" && (
          <button
            onClick={() => setStatusFilter("all")}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-kuwex-cyan/10 border border-kuwex-cyan/30 text-kuwex-cyan hover:bg-kuwex-cyan/20"
          >
            Filter: {statusConfig[statusFilter].label}
            <X size={12} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
        />
      </div>

      {/* Leads Tab */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-500">No leads found</p>
              <button onClick={() => setShowNewLeadModal(true)} className="mt-4 text-kuwex-cyan hover:underline">
                Add your first lead
              </button>
            </div>
          ) : (
            filteredLeads.map((lead, index) => {
              const status = lead.status as LeadStatus;
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:border-[#3F4346] transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 flex items-center justify-center text-kuwex-cyan font-bold text-lg">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{lead.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${statusConfig[status]?.color || "bg-gray-500/20 text-gray-400"}`}>
                            {statusConfig[status]?.label || status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">{lead.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Globe size={16} />
                        <span className={sourceConfig[lead.source]?.color || "text-gray-400"}>{sourceConfig[lead.source]?.label || lead.source}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <DollarSign size={16} />
                        <span className="text-white font-medium">${(lead.value || 0).toLocaleString()}</span>
                      </div>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="bg-[#0A0A0A] border border-[#2F3336] rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {lead.status === "qualified" || lead.status === "proposal" ? (
                        <button
                          onClick={() => handleConvertToClient(lead.id)}
                          className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-green-400"
                          title="Convert to Client"
                        >
                          <UserCheck size={18} />
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-kuwex-cyan"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm({ type: "lead", id: lead.id })}
                        className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {lead.notes && (
                    <p className="mt-4 text-sm text-gray-500 bg-[#0A0A0A] rounded-lg p-3">{lead.notes}</p>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <div className="space-y-4">
          {filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-500">No clients found</p>
              <button onClick={() => setShowNewClientModal(true)} className="mt-4 text-kuwex-cyan hover:underline">
                Add your first client
              </button>
            </div>
          ) : (
            filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:border-[#3F4346] transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{client.company}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          client.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {client.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">{client.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-gray-500 text-xs mb-1">Total Spent</p>
                      <p className="font-semibold text-kuwex-cyan">${(client.total_spent || 0).toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs mb-1">Projects</p>
                      <p className="font-semibold text-white">{client.projects_count || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs mb-1">Joined</p>
                      <p className="font-semibold text-white">{client.joined_date ? new Date(client.joined_date).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-kuwex-cyan">
                      <Phone size={18} />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm({ type: "client", id: client.id })}
                      className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingLead ? "Edit Lead" : "Add New Lead"}</h2>
              <button onClick={() => { setShowNewLeadModal(false); setEditingLead(null); resetLeadForm(); }} className="p-2 hover:bg-[#2F3336] rounded-lg text-gray-400">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name *</label>
                  <input type="text" required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company *</label>
                  <input type="text" required value={leadForm.company} onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input type="email" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="+263 77 123 4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Source</label>
                  <select value={leadForm.source} onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="facebook">Facebook</option>
                    <option value="referral">Referral</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Estimated Value ($)</label>
                  <input type="number" value={leadForm.value} onChange={(e) => setLeadForm({ ...leadForm, value: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Service Interest</label>
                <input type="text" value={leadForm.service} onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="e.g., Website Development" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Notes</label>
                <textarea value={leadForm.notes} onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 h-24 resize-none" placeholder="Add notes about this lead..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setShowNewLeadModal(false); setEditingLead(null); resetLeadForm(); }} className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {editingLead ? "Update Lead" : "Add Lead"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Client</h2>
              <button onClick={() => { setShowNewClientModal(false); resetClientForm(); }} className="p-2 hover:bg-[#2F3336] rounded-lg text-gray-400">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Contact Name *</label>
                  <input type="text" required value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company *</label>
                  <input type="text" required value={clientForm.company} onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input type="email" required value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="+263 77 123 4567" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setShowNewClientModal(false); resetClientForm(); }} className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  Add Client
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-bold text-white mb-2">Delete {showDeleteConfirm.type === "lead" ? "Lead" : "Client"}?</h3>
            <p className="text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
