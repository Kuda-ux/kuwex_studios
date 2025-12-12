"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Download,
  Eye,
  Lightbulb,
  ExternalLink,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";

type TenderStatus = "identified" | "planning" | "submitted" | "won" | "lost";
type TenderPriority = "high" | "medium" | "low";

interface MatchedTender {
  id: string;
  title: string;
  organization: string;
  value: number | null;
  currency?: string;
  deadline: string;
  category: string;
  description: string;
  sourceId: string;
  sourceUrl: string;
  publishedDate?: string;
  location?: string;
  requirements?: string[];
  // Matching fields from tender agent
  matchScore: number;
  matchedServices: string[];
  matchedKeywords: string[];
  relevanceReason: string;
  priority: TenderPriority;
  // Computed fields
  daysUntilDeadline: number;
  isUrgent: boolean;
  formattedValue: string;
}

interface TrackedTender extends MatchedTender {
  status: TenderStatus;
  notes?: string;
}

interface TenderStats {
  totalFetched: number;
  validTenders: number;
  matchedForKuwex: number;
  filteredOut: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  urgentDeadlines: number;
  totalValue: number;
}

const statusConfig: Record<TenderStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  identified: { label: "New", color: "bg-blue-500/20 text-blue-400", icon: Lightbulb },
  planning: { label: "Planning", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  submitted: { label: "Submitted", color: "bg-purple-500/20 text-purple-400", icon: FileText },
  won: { label: "Won", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function TendersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TenderStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [tenders, setTenders] = useState<MatchedTender[]>([]);
  const [trackedTenders, setTrackedTenders] = useState<TrackedTender[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedTender, setSelectedTender] = useState<MatchedTender | null>(null);
  const [apiStats, setApiStats] = useState<TenderStats | null>(null);
  const [activeTab, setActiveTab] = useState<"discover" | "tracked" | "sources">("discover");

  // Fetch tenders from API
  const fetchTenders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tenders');
      const data = await response.json();
      if (data.success) {
        setTenders(data.data);
        setLastUpdated(data.lastUpdated);
        setApiStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching tenders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
    // Load tracked tenders from localStorage
    const saved = localStorage.getItem('trackedTenders');
    if (saved) {
      setTrackedTenders(JSON.parse(saved));
    }
  }, []);

  // Save tracked tenders to localStorage
  useEffect(() => {
    localStorage.setItem('trackedTenders', JSON.stringify(trackedTenders));
  }, [trackedTenders]);

  const trackTender = (tender: MatchedTender) => {
    const tracked: TrackedTender = { ...tender, status: 'identified' };
    setTrackedTenders(prev => [...prev, tracked]);
  };

  const updateTenderStatus = (id: string, status: TenderStatus) => {
    setTrackedTenders(prev => 
      prev.map(t => t.id === id ? { ...t, status } : t)
    );
  };

  const untrackTender = (id: string) => {
    setTrackedTenders(prev => prev.filter(t => t.id !== id));
  };

  const isTracked = (id: string) => trackedTenders.some(t => t.id === id);

  // Get unique categories (filter out undefined)
  const categories = Array.from(new Set(tenders.map(t => t.category).filter(Boolean))) as string[];

  const filteredTenders = (activeTab === "discover" ? tenders : activeTab === "tracked" ? trackedTenders : []).filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || (t.category || 'General') === categoryFilter;
    const matchesStatus = activeTab === "discover" || statusFilter === "all" || 
                         (t as TrackedTender).status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: tenders.length,
    tracked: trackedTenders.length,
    active: trackedTenders.filter((t) => t.status === "planning" || t.status === "submitted").length,
    won: trackedTenders.filter((t) => t.status === "won").length,
    wonValue: trackedTenders.filter((t) => t.status === "won").reduce((sum, t) => sum + (t.value || 0), 0),
    pipeline: trackedTenders.filter((t) => t.status !== "won" && t.status !== "lost").reduce((sum, t) => sum + (t.value || 0), 0),
  };

  // Get best match tender for AI suggestion
  const bestMatch = tenders.length > 0 ? tenders.reduce((best, t) => t.matchScore > best.matchScore ? t : best, tenders[0]) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Zimbabwe Tender Board</h1>
          <p className="text-gray-500">
            Discover and track tender opportunities from PRAZ, ZimTenders & more
            {lastUpdated && <span className="ml-2 text-xs">• Updated {new Date(lastUpdated).toLocaleTimeString()}</span>}
          </p>
        </div>
        <button 
          onClick={fetchTenders}
          disabled={loading}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          {loading ? "Fetching..." : "Refresh Tenders"}
        </button>
      </div>

      {/* AI Suggestion */}
      {bestMatch && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="text-purple-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">🎯 AI Recommended Tender</h3>
              <p className="text-gray-400 text-sm">
                <strong className="text-white">{bestMatch.title}</strong> from {bestMatch.organization} has a {bestMatch.matchScore}% match score. 
                {bestMatch.value && ` Estimated value: $${bestMatch.value.toLocaleString()}.`} Deadline: {new Date(bestMatch.deadline).toLocaleDateString()}.
              </p>
              <button 
                onClick={() => setSelectedTender(bestMatch)}
                className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium"
              >
                View Tender Details →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats - AI Matching Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{apiStats?.matchedForKuwex || tenders.length}</p>
          <p className="text-xs text-gray-500">Matched for KuWeX</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-red-400">{apiStats?.highPriority || tenders.filter(t => t.priority === 'high').length}</p>
          <p className="text-xs text-gray-500">High Priority</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-orange-400">{apiStats?.urgentDeadlines || tenders.filter(t => t.isUrgent).length}</p>
          <p className="text-xs text-gray-500">Urgent (≤14 days)</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-400">{apiStats?.filteredOut || 0}</p>
          <p className="text-xs text-gray-500">Filtered Out</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.tracked}</p>
          <p className="text-xs text-gray-500">Tracked</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.active}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-green-400">{stats.won}</p>
          <p className="text-xs text-gray-500">Won</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">${(apiStats?.totalValue || 0).toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Value</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2F3336] pb-2">
        <button
          onClick={() => setActiveTab("discover")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "discover" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Discover ({tenders.length})
        </button>
        <button
          onClick={() => setActiveTab("tracked")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "tracked" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          My Tracked ({trackedTenders.length})
        </button>
        <button
          onClick={() => setActiveTab("sources")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "sources" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          🔗 Live Tender Sources
        </button>
      </div>

      {/* Sources Tab Content */}
      {activeTab === "sources" && (
        <div className="space-y-6">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-yellow-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">📌 Access Real-Time Tenders</h3>
                <p className="text-gray-400 text-sm">
                  The tenders shown in the Discover tab are <strong className="text-white">sample opportunities</strong> representing typical listings. 
                  For <strong className="text-yellow-400">live, real-time tenders</strong>, visit the official portals below and register as a supplier.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Sources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">🏛️ Official Government Portals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.zimbabwetenders.com/" target="_blank" rel="noopener noreferrer" className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-kuwex-cyan/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Building2 className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-kuwex-cyan transition-colors">ZimbabweTenders</h4>
                    <p className="text-xs text-green-400">✓ Free Access</p>
                  </div>
                  <ExternalLink className="ml-auto text-gray-500 group-hover:text-kuwex-cyan" size={18} />
                </div>
                <p className="text-sm text-gray-400">Major local tender aggregator with real-time government and private tenders. Shows new notices daily with category filtering.</p>
              </a>
              
              <a href="https://egp.praz.org.zw/" target="_blank" rel="noopener noreferrer" className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-kuwex-cyan/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Building2 className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-kuwex-cyan transition-colors">PRAZ eGP System</h4>
                    <p className="text-xs text-yellow-400">🔐 Registration Required</p>
                  </div>
                  <ExternalLink className="ml-auto text-gray-500 group-hover:text-kuwex-cyan" size={18} />
                </div>
                <p className="text-sm text-gray-400">Official government e-procurement portal. Register as a supplier at <span className="text-kuwex-cyan">egp.praz.org.zw/Indexes/login</span> for full access to bid on tenders.</p>
              </a>
            </div>
          </div>

          {/* Aggregator Sources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">🌐 Tender Aggregators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://www.tendersontime.com/zimbabwe-tenders/" target="_blank" rel="noopener noreferrer" className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-kuwex-cyan/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-white group-hover:text-kuwex-cyan transition-colors">TendersOnTime</h4>
                  <ExternalLink className="ml-auto text-gray-500 group-hover:text-kuwex-cyan" size={16} />
                </div>
                <p className="text-xs text-gray-400">Global aggregator with Zimbabwe RFPs, RFQs, and procurement notices.</p>
              </a>
              
              <a href="https://www.globaltenders.com/zw/zimbabwe-web-design-tenders" target="_blank" rel="noopener noreferrer" className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-kuwex-cyan/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-white group-hover:text-kuwex-cyan transition-colors">GlobalTenders</h4>
                  <ExternalLink className="ml-auto text-gray-500 group-hover:text-kuwex-cyan" size={16} />
                </div>
                <p className="text-xs text-gray-400">Web design, intranet systems, and IT services tenders in Zimbabwe.</p>
              </a>
              
              <a href="https://www.biddetail.com/zimbabwe-tenders/social-media-tenders" target="_blank" rel="noopener noreferrer" className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-kuwex-cyan/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-white group-hover:text-kuwex-cyan transition-colors">BidDetail</h4>
                  <ExternalLink className="ml-auto text-gray-500 group-hover:text-kuwex-cyan" size={16} />
                </div>
                <p className="text-xs text-gray-400">Social media and digital marketing tender notices.</p>
              </a>
            </div>
          </div>

          {/* Search Keywords */}
          <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-3">🔍 Recommended Search Keywords</h3>
            <p className="text-sm text-gray-400 mb-4">Set alerts on the above portals for these keywords to catch relevant opportunities:</p>
            <div className="flex flex-wrap gap-2">
              {['digital marketing', 'website development', 'app developers', 'social media management', 'ICT services', 'web design', 'software development', 'multimedia', 'graphic design', 'IT consultancy'].map((keyword) => (
                <span key={keyword} className="px-3 py-1.5 bg-[#0A0A0A] border border-[#2F3336] rounded-lg text-sm text-gray-300">{keyword}</span>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-3">💡 Best Practices for KuWeX</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span><strong className="text-white">Register on PRAZ eGP</strong> — Required for all government tenders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span><strong className="text-white">Create accounts on ZimbabweTenders & TendersOnTime</strong> — For broader local + private opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span><strong className="text-white">Set daily email alerts</strong> — Get notified immediately when new relevant tenders are posted</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <span><strong className="text-white">Prepare generic bid templates</strong> — Have company profile, portfolio, and compliance docs ready</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Filters - Only show for discover/tracked tabs */}
      {activeTab !== "sources" && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search tenders, organizations..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50" 
            />
          </div>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)} 
            className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {activeTab === "tracked" && (
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value as TenderStatus | "all")} 
              className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
            >
              <option value="all">All Status</option>
              <option value="identified">New</option>
              <option value="planning">Planning</option>
              <option value="submitted">Submitted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && activeTab !== "sources" && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
          <span className="ml-3 text-gray-400">Fetching tenders from Zimbabwe tender boards...</span>
        </div>
      )}

      {/* Tenders List */}
      {!loading && activeTab !== "sources" && (
        <div className="space-y-4">
          {filteredTenders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {activeTab === "discover" ? "No tenders found matching your criteria" : "No tracked tenders yet. Start tracking from the Discover tab!"}
            </div>
          ) : (
            filteredTenders.map((tender, index) => {
              const tracked = isTracked(tender.id);
              const trackedTender = trackedTenders.find(t => t.id === tender.id);
              const status = trackedTender?.status || "identified";
              const StatusIcon = statusConfig[status].icon;
              
              return (
                <motion.div 
                  key={tender.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.03 }} 
                  className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:border-[#3F4346] transition-colors"
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Row */}
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-[#2F3336] text-gray-300 text-xs px-2.5 py-1 rounded-full">{tender.category}</span>
                          {/* Priority Badge */}
                          <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                            tender.priority === "high" ? "bg-red-500/20 text-red-400" : 
                            tender.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : 
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {tender.priority.toUpperCase()}
                          </span>
                          {/* Urgent Badge */}
                          {tender.isUrgent && (
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-2.5 py-1 rounded-full animate-pulse">
                              ⚡ {tender.daysUntilDeadline} days left
                            </span>
                          )}
                          {tracked && (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full ${statusConfig[status].color}`}>
                              <StatusIcon size={12} />
                              {statusConfig[status].label}
                            </span>
                          )}
                          <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                            tender.matchScore >= 80 ? "bg-green-500/20 text-green-400" : 
                            tender.matchScore >= 50 ? "bg-yellow-500/20 text-yellow-400" : 
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {tender.matchScore}% Match
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{tender.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{tender.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {tender.organization}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {tender.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-sm lg:text-right">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Est. Value</p>
                          <p className="font-semibold text-white">
                            {tender.value ? `$${tender.value.toLocaleString()}` : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Deadline</p>
                          <p className="font-semibold text-white">{new Date(tender.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Matched Services - Why this tender matches KuWeX */}
                    {tender.matchedServices && tender.matchedServices.length > 0 && (
                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                        <p className="text-xs text-green-400 mb-2 font-medium">✓ Matches KuWeX Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {tender.matchedServices.map((service: string, i: number) => (
                            <span key={i} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{service}</span>
                          ))}
                        </div>
                        {tender.relevanceReason && (
                          <p className="text-xs text-gray-500 mt-2 italic">{tender.relevanceReason}</p>
                        )}
                      </div>
                    )}

                    {/* Requirements */}
                    {tender.requirements && tender.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500">Requirements:</span>
                        {tender.requirements.slice(0, 3).map((req: string, i: number) => (
                          <span key={i} className="text-xs bg-[#0A0A0A] text-gray-400 px-2 py-1 rounded">{req}</span>
                        ))}
                        {tender.requirements.length > 3 && (
                          <span className="text-xs text-gray-500">+{tender.requirements.length - 3} more</span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#2F3336]">
                      <div className="flex items-center gap-2">
                        {!tracked ? (
                          <button 
                            onClick={() => trackTender(tender)}
                            className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2 rounded-lg font-medium hover:bg-kuwex-cyan/90 transition-colors"
                          >
                            <Plus size={16} />
                            Track Tender
                          </button>
                        ) : (
                          <>
                            <select
                              value={status}
                              onChange={(e) => updateTenderStatus(tender.id, e.target.value as TenderStatus)}
                              className="bg-[#0A0A0A] border border-[#2F3336] rounded-lg px-3 py-2 text-sm text-white"
                            >
                              <option value="identified">New</option>
                              <option value="planning">Planning</option>
                              <option value="submitted">Submitted</option>
                              <option value="won">Won</option>
                              <option value="lost">Lost</option>
                            </select>
                            <button 
                              onClick={() => untrackTender(tender.id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedTender(tender)}
                          className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                          <Eye size={18} />
                        </button>
                        <a 
                          href={tender.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* Tender Detail Modal */}
      {selectedTender && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTender(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#2F3336] text-gray-300 text-xs px-2.5 py-1 rounded-full">{selectedTender.category}</span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full">{selectedTender.sourceId}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedTender.title}</h2>
              </div>
              <button onClick={() => setSelectedTender(null)} className="text-gray-400 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Organization</h3>
                <p className="text-white">{selectedTender.organization}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                <p className="text-gray-300">{selectedTender.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Estimated Value</h3>
                  <p className="text-white font-semibold">{selectedTender.value ? `$${selectedTender.value.toLocaleString()}` : "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Deadline</h3>
                  <p className="text-white font-semibold">{new Date(selectedTender.deadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Location</h3>
                  <p className="text-white">{selectedTender.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Match Score</h3>
                  <p className={`font-semibold ${selectedTender.matchScore >= 85 ? "text-green-400" : selectedTender.matchScore >= 70 ? "text-yellow-400" : "text-gray-400"}`}>
                    {selectedTender.matchScore}%
                  </p>
                </div>
              </div>
              {selectedTender.requirements && selectedTender.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {selectedTender.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 size={14} className="text-kuwex-cyan" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t border-[#2F3336]">
                {!isTracked(selectedTender.id) ? (
                  <button 
                    onClick={() => { trackTender(selectedTender); setSelectedTender(null); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-kuwex-cyan text-black px-4 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
                  >
                    <Plus size={18} />
                    Track This Tender
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedTender(null)}
                    className="flex-1 bg-green-500/20 text-green-400 px-4 py-3 rounded-xl font-semibold"
                  >
                    ✓ Already Tracking
                  </button>
                )}
                <a 
                  href={selectedTender.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#2F3336] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#3F4346] transition-colors"
                >
                  <ExternalLink size={18} />
                  View Source
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
