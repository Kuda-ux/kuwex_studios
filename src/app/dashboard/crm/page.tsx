"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  UserPlus,
  DollarSign,
  Mail,
  Phone,
  MessageCircle,
  MoreVertical,
  Calendar,
  Globe,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  X,
  Trash2,
  Edit,
  UserCheck,
} from "lucide-react";
import { useLeads, useClients } from "@/hooks/useDatabase";
import { Lead, Client } from "@/lib/supabase";

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

export default function CRMPage() {
  const { leads, loading: leadsLoading, createLead, updateLead, deleteLead, convertToClient } = useLeads();
  const { clients, loading: clientsLoading, createClient, updateClient, deleteClient } = useClients();
  
  const [activeTab, setActiveTab] = useState<"leads" | "clients">("leads");
  const [searchQuery, setSearchQuery] = useState("");
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

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status === "active").length,
    totalRevenue: clients.reduce((sum, c) => sum + (c.total_spent || 0), 0),
    avgRating: clients.length > 0 ? "5.0" : "0",
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
          <p className="text-xs text-gray-500">Total Leads</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.newLeads}</p>
          <p className="text-xs text-gray-500">New Leads</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.totalClients}</p>
          <p className="text-xs text-gray-500">Total Clients</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeClients}</p>
          <p className="text-xs text-gray-500">Active Clients</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">${stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating} ⭐</p>
          <p className="text-xs text-gray-500">Avg Rating</p>
        </motion.div>
      </div>

      {/* Tabs */}
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
