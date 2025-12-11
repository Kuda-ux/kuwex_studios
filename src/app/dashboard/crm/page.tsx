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
  Star,
  MoreVertical,
  TrendingUp,
  Calendar,
  Globe,
  ArrowUpRight,
} from "lucide-react";

type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
type LeadSource = "website" | "whatsapp" | "facebook" | "referral" | "linkedin" | "other";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  value: number;
  date: string;
  notes: string;
}

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalSpent: number;
  projects: number;
  rating: number;
  lastContact: string;
  status: "active" | "inactive";
}

const leads: Lead[] = [
  { id: 1, name: "John Moyo", company: "Sunrise Holdings", email: "john@sunrise.co.zw", phone: "+263 77 123 4567", source: "website", status: "new", value: 3000, date: "2024-12-10", notes: "Interested in website redesign" },
  { id: 2, name: "Sarah Ndlovu", company: "Fresh Farms", email: "sarah@freshfarms.co.zw", phone: "+263 71 234 5678", source: "whatsapp", status: "contacted", value: 1500, date: "2024-12-09", notes: "Needs branding package" },
  { id: 3, name: "Mike Chikwanha", company: "BuildRight Construction", email: "mike@buildright.co.zw", phone: "+263 78 345 6789", source: "referral", status: "qualified", value: 4500, date: "2024-12-08", notes: "Large project - website + marketing" },
  { id: 4, name: "Grace Mutasa", company: "EcoTech Solutions", email: "grace@ecotech.co.zw", phone: "+263 77 456 7890", source: "linkedin", status: "proposal", value: 2800, date: "2024-12-07", notes: "Mobile app development" },
  { id: 5, name: "Peter Nyathi", company: "Urban Styles", email: "peter@urbanstyles.co.zw", phone: "+263 71 567 8901", source: "facebook", status: "new", value: 1200, date: "2024-12-10", notes: "Social media management" },
];

const clients: Client[] = [
  { id: 1, name: "TechStart Inc", company: "TechStart Inc", email: "info@techstart.co.zw", phone: "+263 77 111 2222", totalSpent: 8500, projects: 3, rating: 5, lastContact: "2024-12-08", status: "active" },
  { id: 2, name: "GreenEnergy Ltd", company: "GreenEnergy Ltd", email: "contact@greenenergy.co.zw", phone: "+263 71 222 3333", totalSpent: 5200, projects: 2, rating: 4, lastContact: "2024-12-05", status: "active" },
  { id: 3, name: "HealthPlus", company: "HealthPlus", email: "admin@healthplus.co.zw", phone: "+263 78 333 4444", totalSpent: 12000, projects: 4, rating: 5, lastContact: "2024-12-10", status: "active" },
  { id: 4, name: "EduLearn", company: "EduLearn", email: "hello@edulearn.co.zw", phone: "+263 77 444 5555", totalSpent: 3800, projects: 2, rating: 4, lastContact: "2024-11-15", status: "inactive" },
  { id: 5, name: "SafeBank", company: "SafeBank", email: "projects@safebank.co.zw", phone: "+263 71 555 6666", totalSpent: 15000, projects: 5, rating: 5, lastContact: "2024-12-01", status: "active" },
];

const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-500/20 text-blue-400" },
  contacted: { label: "Contacted", color: "bg-yellow-500/20 text-yellow-400" },
  qualified: { label: "Qualified", color: "bg-purple-500/20 text-purple-400" },
  proposal: { label: "Proposal", color: "bg-orange-500/20 text-orange-400" },
  won: { label: "Won", color: "bg-green-500/20 text-green-400" },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400" },
};

const sourceConfig: Record<LeadSource, { label: string; color: string }> = {
  website: { label: "Website", color: "text-cyan-400" },
  whatsapp: { label: "WhatsApp", color: "text-green-400" },
  facebook: { label: "Facebook", color: "text-blue-400" },
  referral: { label: "Referral", color: "text-purple-400" },
  linkedin: { label: "LinkedIn", color: "text-blue-500" },
  other: { label: "Other", color: "text-gray-400" },
};

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "clients">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status === "active").length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
    avgRating: (clients.reduce((sum, c) => sum + c.rating, 0) / clients.length).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients & CRM</h1>
          <p className="text-gray-500">Manage leads and client relationships</p>
        </div>
        <button
          onClick={() => setShowNewLeadModal(true)}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <UserPlus size={20} />
          Add Lead
        </button>
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
          {leads.map((lead, index) => (
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
                      <span className={`px-2 py-0.5 text-xs rounded-full ${statusConfig[lead.status].color}`}>
                        {statusConfig[lead.status].label}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{lead.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Globe size={16} />
                    <span className={sourceConfig[lead.source].color}>{sourceConfig[lead.source].label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign size={16} />
                    <span className="text-white font-medium">${lead.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{new Date(lead.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-green-400">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-kuwex-cyan">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              {lead.notes && (
                <p className="mt-4 text-sm text-gray-500 bg-[#0A0A0A] rounded-lg p-3">{lead.notes}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <div className="space-y-4">
          {clients.map((client, index) => (
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
                    <p className="font-semibold text-kuwex-cyan">${client.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Projects</p>
                    <p className="font-semibold text-white">{client.projects}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Rating</p>
                    <p className="font-semibold text-yellow-400">
                      {Array.from({ length: client.rating }).map((_, i) => "⭐").join("")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Last Contact</p>
                    <p className="font-semibold text-white">{new Date(client.lastContact).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-green-400">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-kuwex-cyan">
                    <ArrowUpRight size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Add New Lead</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company</label>
                  <input type="text" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="+263 77 123 4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Source</label>
                  <select className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
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
                  <input type="number" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Notes</label>
                <textarea className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 h-24 resize-none" placeholder="Add notes about this lead..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewLeadModal(false)} className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
                  Add Lead
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
