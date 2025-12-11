"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  FolderKanban,
  FileText,
  Users,
  Target,
  Globe,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Lightbulb,
  Clock,
  CheckCircle2,
  XCircle,
  LucideIcon,
  Loader2,
} from "lucide-react";
import { useProjects, useInvoices, useLeads, useClients, useQuotations, useTenders } from "@/hooks/useDatabase";
import { Project, Lead, Invoice, Quotation, Client, Tender } from "@/lib/supabase";

export default function Dashboard() {
  const { projects, loading: projectsLoading } = useProjects();
  const { invoices, loading: invoicesLoading } = useInvoices();
  const { leads, loading: leadsLoading } = useLeads();
  const { clients, loading: clientsLoading } = useClients();
  const { quotations, loading: quotationsLoading } = useQuotations();
  const { tenders, loading: tendersLoading } = useTenders();

  const loading = projectsLoading || invoicesLoading || leadsLoading || clientsLoading || quotationsLoading || tendersLoading;

  // Calculate KPIs from real database data
  const totalRevenue = invoices.reduce((sum: number, inv: Invoice) => sum + (inv.paid_amount || 0), 0);
  const totalInvoiced = invoices.reduce((sum: number, inv: Invoice) => sum + (inv.amount || 0), 0);
  const activeProjects = projects.filter((p: Project) => p.status === "in_progress").length;
  const completedProjects = projects.filter((p: Project) => p.status === "completed").length;
  const newLeadsCount = leads.filter((l: Lead) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l: Lead) => l.status === "qualified" || l.status === "proposal").length;
  const totalClients = clients.length;
  const activeClients = clients.filter((c: Client) => c.status === "active").length;
  const pendingQuotations = quotations.filter((q: Quotation) => q.status === "sent" || q.status === "draft").length;
  const activeTenders = tenders.filter((t: Tender) => t.status === "identified" || t.status === "submitted" || t.status === "planning").length;

  // Calculate revenue by project category
  const revenueByCategory: Record<string, number> = {};
  projects.forEach((p: Project) => {
    const category = p.category || "Other";
    revenueByCategory[category] = (revenueByCategory[category] || 0) + (p.value || 0);
  });
  
  const totalProjectValue = Object.values(revenueByCategory).reduce((a, b) => a + b, 0);
  const revenueByService = Object.entries(revenueByCategory)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalProjectValue > 0 ? Math.round((value / totalProjectValue) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Get recent projects (last 4 active)
  const recentProjects = projects
    .filter((p: Project) => p.status !== "completed")
    .slice(0, 4);

  // Get recent leads (last 3)
  const recentLeads = leads.slice(0, 3);

  // Calculate upcoming deadlines from projects
  const upcomingDeadlines = projects
    .filter((p: Project) => p.deadline && new Date(p.deadline) > new Date())
    .sort((a: Project, b: Project) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 3)
    .map((p: Project) => {
      const deadline = new Date(p.deadline!);
      const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return {
        id: p.id,
        project: p.name,
        task: "Project Deadline",
        date: deadline.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        daysLeft,
      };
    });

  // Generate dynamic AI alerts based on real data
  const aiAlerts = [];
  
  const overdueInvoices = invoices.filter((inv: Invoice) => inv.status === "overdue").length;
  if (overdueInvoices > 0) {
    aiAlerts.push({ id: 1, type: "warning", message: `${overdueInvoices} invoice(s) are overdue. Follow up to collect payment.`, action: "View Invoices" });
  }
  
  if (pendingQuotations > 0) {
    aiAlerts.push({ id: 2, type: "action", message: `${pendingQuotations} quotation(s) pending client response.`, action: "View Quotations" });
  }
  
  const inactiveClients = clients.filter((c: Client) => c.status === "inactive").length;
  if (inactiveClients > 0) {
    aiAlerts.push({ id: 3, type: "opportunity", message: `${inactiveClients} client(s) inactive. Consider sending a reactivation message.`, action: "View Clients" });
  }
  
  if (completedProjects > 0) {
    aiAlerts.push({ id: 4, type: "success", message: `${completedProjects} project(s) completed successfully!`, action: "View Projects" });
  }
  
  if (newLeadsCount > 0) {
    aiAlerts.push({ id: 5, type: "opportunity", message: `${newLeadsCount} new lead(s) waiting to be contacted.`, action: "View Leads" });
  }

  // Annual target (can be made configurable later)
  const annualTarget = 100000;
  const progressToTarget = (totalRevenue / annualTarget) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-kuwex-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Kuda. Here&apos;s your business overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-kuwex-cyan/50">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Revenue Target Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Progress to ${annualTarget.toLocaleString()} Annual Target</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</span>
              <span className="text-gray-500">/ ${annualTarget.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Remaining</p>
              <p className="text-xl font-semibold text-kuwex-cyan">${(annualTarget - totalRevenue).toLocaleString()}</p>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#2F3336" strokeWidth="8" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.min(progressToTarget, 100) * 2.51} 251`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0085FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.min(progressToTarget, 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={0}
          icon={DollarSign}
          color="cyan"
        />
        <KPICard
          title="Active Projects"
          value={activeProjects}
          change={0}
          icon={FolderKanban}
          color="blue"
        />
        <KPICard
          title="Pending Quotations"
          value={pendingQuotations}
          change={0}
          icon={FileText}
          color="yellow"
        />
        <KPICard
          title="New Leads"
          value={newLeadsCount}
          change={0}
          icon={Users}
          color="green"
        />
        <KPICard
          title="Total Clients"
          value={totalClients}
          change={0}
          icon={Target}
          color="purple"
        />
        <KPICard
          title="Active Clients"
          value={activeClients}
          change={0}
          icon={Globe}
          color="pink"
        />
        <KPICard
          title="Active Tenders"
          value={activeTenders}
          change={0}
          icon={Briefcase}
          color="orange"
        />
        <KPICard
          title="Total Invoiced"
          value={`$${totalInvoiced.toLocaleString()}`}
          change={0}
          icon={TrendingUp}
          color="cyan"
        />
      </div>

      {/* AI Smart Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-kuwex-cyan" size={20} />
          <h2 className="text-lg font-semibold text-white">AI Smart Alerts</h2>
        </div>
        <div className="space-y-3">
          {aiAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                alert.type === "warning"
                  ? "bg-yellow-500/10 border border-yellow-500/20"
                  : alert.type === "action"
                  ? "bg-orange-500/10 border border-orange-500/20"
                  : alert.type === "opportunity"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "bg-green-500/10 border border-green-500/20"
              }`}
            >
              {alert.type === "warning" && <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />}
              {alert.type === "action" && <Clock className="text-orange-500 flex-shrink-0" size={20} />}
              {alert.type === "opportunity" && <Lightbulb className="text-blue-500 flex-shrink-0" size={20} />}
              {alert.type === "success" && <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />}
              <div className="flex-1">
                <p className="text-sm text-gray-300">{alert.message}</p>
              </div>
              <button className="text-xs text-kuwex-cyan hover:underline whitespace-nowrap">{alert.action}</button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Revenue by Service</h2>
          <div className="space-y-4">
            {revenueByService.map((service, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{service.name}</span>
                  <span className="text-sm font-medium text-white">${service.value.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-[#2F3336] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  deadline.daysLeft <= 3 ? "bg-red-500/20 text-red-500" :
                  deadline.daysLeft <= 7 ? "bg-yellow-500/20 text-yellow-500" :
                  "bg-green-500/20 text-green-500"
                }`}>
                  <Clock size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{deadline.task}</p>
                  <p className="text-xs text-gray-500">{deadline.project}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{deadline.date}</p>
                  <p className="text-xs text-gray-500">{deadline.daysLeft} days</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Projects and Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Active Projects</h2>
            <button className="text-sm text-kuwex-cyan hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project: Project) => (
              <div key={project.id} className="p-4 bg-[#1a1a1a] rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                    project.status === "review" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {project.status === "in_progress" ? "In Progress" : project.status === "review" ? "Review" : "Complete"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-2 bg-[#2F3336] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{project.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
            <button className="text-sm text-kuwex-cyan hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead: Lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 flex items-center justify-center text-kuwex-cyan font-semibold">
                  {lead.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{lead.name}</p>
                  <p className="text-sm text-gray-500 truncate">{lead.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-kuwex-cyan">${(lead.value || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{lead.source}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// KPI Card Component
function KPICard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    cyan: "bg-kuwex-cyan/10 text-kuwex-cyan",
    blue: "bg-blue-500/10 text-blue-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    green: "bg-green-500/10 text-green-500",
    purple: "bg-purple-500/10 text-purple-500",
    pink: "bg-pink-500/10 text-pink-500",
    orange: "bg-orange-500/10 text-orange-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-[#3F4346] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );
}
