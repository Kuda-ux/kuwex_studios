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
} from "lucide-react";

// Mock data - in production this would come from your database/API
const kpiData = {
  totalRevenue: { value: 45750, change: 12.5, target: 100000 },
  monthlyRevenue: { value: 8200, change: 8.3, target: 8333 },
  activeProjects: { value: 7, change: 2 },
  pendingQuotations: { value: 4, change: -1 },
  newLeads: { value: 12, change: 33 },
  clientRetention: { value: 87, change: 5 },
  websiteTraffic: { value: 2450, change: 18 },
  activeTenders: { value: 3, change: 1 },
};

const recentProjects = [
  { id: 1, name: "TechStart Website Redesign", client: "TechStart Inc", status: "in_progress", progress: 75, value: 2500 },
  { id: 2, name: "GreenEnergy Brand Identity", client: "GreenEnergy Ltd", status: "in_progress", progress: 45, value: 1800 },
  { id: 3, name: "HealthPlus Mobile App", client: "HealthPlus", status: "review", progress: 90, value: 5000 },
  { id: 4, name: "EduLearn Marketing Campaign", client: "EduLearn", status: "in_progress", progress: 30, value: 1200 },
];

const aiAlerts = [
  { id: 1, type: "warning", message: "Your revenue this month is 2% below target — consider promoting Web Development services.", action: "View Marketing" },
  { id: 2, type: "action", message: "3 quotations pending follow-up for more than 5 days.", action: "View Quotations" },
  { id: 3, type: "opportunity", message: "2 clients inactive for 30+ days. Send reactivation message?", action: "View Clients" },
  { id: 4, type: "success", message: "Project 'TechStart Website' is ahead of schedule by 3 days!", action: "View Project" },
];

const revenueByService = [
  { name: "Web Development", value: 18500, percentage: 40 },
  { name: "Branding & Design", value: 11000, percentage: 24 },
  { name: "Digital Marketing", value: 9200, percentage: 20 },
  { name: "Mobile Apps", value: 4600, percentage: 10 },
  { name: "Consultancy", value: 2450, percentage: 6 },
];

const upcomingDeadlines = [
  { id: 1, project: "TechStart Website", task: "Final Review", date: "Dec 15", daysLeft: 4 },
  { id: 2, project: "GreenEnergy Brand", task: "Logo Delivery", date: "Dec 18", daysLeft: 7 },
  { id: 3, project: "HealthPlus App", task: "Beta Launch", date: "Dec 20", daysLeft: 9 },
];

const recentLeads = [
  { id: 1, name: "John Moyo", company: "Sunrise Holdings", source: "Website", value: 3000, date: "2 hours ago" },
  { id: 2, name: "Sarah Ndlovu", company: "Fresh Farms", source: "WhatsApp", value: 1500, date: "5 hours ago" },
  { id: 3, name: "Mike Chikwanha", company: "BuildRight Construction", source: "Referral", value: 4500, date: "1 day ago" },
];

export default function Dashboard() {
  const progressToTarget = (kpiData.totalRevenue.value / kpiData.totalRevenue.target) * 100;

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
            <p className="text-gray-400 text-sm mb-1">Progress to $100,000 Annual Target</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${kpiData.totalRevenue.value.toLocaleString()}</span>
              <span className="text-gray-500">/ $100,000</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Remaining</p>
              <p className="text-xl font-semibold text-kuwex-cyan">${(100000 - kpiData.totalRevenue.value).toLocaleString()}</p>
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
                  strokeDasharray={`${progressToTarget * 2.51} 251`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0085FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{progressToTarget.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Revenue"
          value={`$${kpiData.monthlyRevenue.value.toLocaleString()}`}
          change={kpiData.monthlyRevenue.change}
          icon={DollarSign}
          color="cyan"
        />
        <KPICard
          title="Active Projects"
          value={kpiData.activeProjects.value}
          change={kpiData.activeProjects.change}
          icon={FolderKanban}
          color="blue"
        />
        <KPICard
          title="Pending Quotations"
          value={kpiData.pendingQuotations.value}
          change={kpiData.pendingQuotations.change}
          icon={FileText}
          color="yellow"
        />
        <KPICard
          title="New Leads"
          value={kpiData.newLeads.value}
          change={kpiData.newLeads.change}
          icon={Users}
          color="green"
        />
        <KPICard
          title="Client Retention"
          value={`${kpiData.clientRetention.value}%`}
          change={kpiData.clientRetention.change}
          icon={Target}
          color="purple"
        />
        <KPICard
          title="Website Traffic"
          value={kpiData.websiteTraffic.value.toLocaleString()}
          change={kpiData.websiteTraffic.change}
          icon={Globe}
          color="pink"
        />
        <KPICard
          title="Active Tenders"
          value={kpiData.activeTenders.value}
          change={kpiData.activeTenders.change}
          icon={Briefcase}
          color="orange"
        />
        <KPICard
          title="YTD Revenue"
          value={`$${kpiData.totalRevenue.value.toLocaleString()}`}
          change={kpiData.totalRevenue.change}
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
            {recentProjects.map((project) => (
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
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{project.progress}%</span>
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
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 flex items-center justify-center text-kuwex-cyan font-semibold">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{lead.name}</p>
                  <p className="text-sm text-gray-500 truncate">{lead.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-kuwex-cyan">${lead.value.toLocaleString()}</p>
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
