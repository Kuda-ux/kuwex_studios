"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Pause,
  ArrowUpRight,
  FolderKanban,
} from "lucide-react";

type ProjectStatus = "planning" | "in_progress" | "review" | "completed" | "on_hold";
type ServiceType = "web" | "branding" | "multimedia" | "marketing" | "consultancy" | "mobile";

interface Project {
  id: number;
  name: string;
  client: string;
  service: ServiceType;
  status: ProjectStatus;
  progress: number;
  value: number;
  startDate: string;
  deadline: string;
  team: string[];
  profit: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "TechStart Website Redesign",
    client: "TechStart Inc",
    service: "web",
    status: "in_progress",
    progress: 75,
    value: 2500,
    startDate: "2024-11-01",
    deadline: "2024-12-15",
    team: ["Kuda", "Weston"],
    profit: 1800,
  },
  {
    id: 2,
    name: "GreenEnergy Brand Identity",
    client: "GreenEnergy Ltd",
    service: "branding",
    status: "in_progress",
    progress: 45,
    value: 1800,
    startDate: "2024-11-15",
    deadline: "2024-12-20",
    team: ["Weston"],
    profit: 1400,
  },
  {
    id: 3,
    name: "HealthPlus Mobile App",
    client: "HealthPlus",
    service: "mobile",
    status: "review",
    progress: 90,
    value: 5000,
    startDate: "2024-09-01",
    deadline: "2024-12-10",
    team: ["Kuda"],
    profit: 3500,
  },
  {
    id: 4,
    name: "EduLearn Marketing Campaign",
    client: "EduLearn",
    service: "marketing",
    status: "in_progress",
    progress: 30,
    value: 1200,
    startDate: "2024-12-01",
    deadline: "2025-01-15",
    team: ["Weston"],
    profit: 900,
  },
  {
    id: 5,
    name: "SafeBank Security Audit",
    client: "SafeBank",
    service: "consultancy",
    status: "completed",
    progress: 100,
    value: 3000,
    startDate: "2024-10-01",
    deadline: "2024-11-30",
    team: ["Kuda", "Weston"],
    profit: 2400,
  },
  {
    id: 6,
    name: "FoodieApp Promo Video",
    client: "FoodieApp",
    service: "multimedia",
    status: "on_hold",
    progress: 20,
    value: 800,
    startDate: "2024-11-20",
    deadline: "2024-12-30",
    team: ["Weston"],
    profit: 600,
  },
];

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  planning: { label: "Planning", color: "bg-purple-500/20 text-purple-400", icon: Calendar },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400", icon: Clock },
  review: { label: "Review", color: "bg-yellow-500/20 text-yellow-400", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
  on_hold: { label: "On Hold", color: "bg-gray-500/20 text-gray-400", icon: Pause },
};

const serviceConfig: Record<ServiceType, { label: string; color: string }> = {
  web: { label: "Web Development", color: "bg-cyan-500/20 text-cyan-400" },
  branding: { label: "Branding & Design", color: "bg-pink-500/20 text-pink-400" },
  multimedia: { label: "Multimedia", color: "bg-orange-500/20 text-orange-400" },
  marketing: { label: "Digital Marketing", color: "bg-green-500/20 text-green-400" },
  consultancy: { label: "Consultancy", color: "bg-purple-500/20 text-purple-400" },
  mobile: { label: "Mobile Apps", color: "bg-blue-500/20 text-blue-400" },
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesService = serviceFilter === "all" || project.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "in_progress" || p.status === "review").length,
    completed: projects.filter((p) => p.status === "completed").length,
    totalValue: projects.reduce((sum, p) => sum + p.value, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-500">Manage and track all your projects</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
              <FolderKanban className="text-kuwex-cyan" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-500">Total Projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="text-blue-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
          <p className="text-sm text-gray-500">Active Projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <DollarSign className="text-yellow-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Value</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "all")}
            className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value as ServiceType | "all")}
            className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
          >
            <option value="all">All Services</option>
            <option value="web">Web Development</option>
            <option value="branding">Branding & Design</option>
            <option value="multimedia">Multimedia</option>
            <option value="marketing">Digital Marketing</option>
            <option value="consultancy">Consultancy</option>
            <option value="mobile">Mobile Apps</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => {
          const StatusIcon = statusConfig[project.status].icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:border-[#3F4346] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 text-xs rounded-full ${serviceConfig[project.service].color}`}>
                        {serviceConfig[project.service].label}
                      </span>
                      <span className={`px-2.5 py-1 text-xs rounded-full flex items-center gap-1 ${statusConfig[project.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[project.status].label}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                  <p className="text-gray-500 text-sm">{project.client}</p>
                </div>

                {/* Progress */}
                <div className="lg:w-48">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-white">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#2F3336] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Value</p>
                    <p className="font-semibold text-white">${project.value.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Profit</p>
                    <p className="font-semibold text-green-400">${project.profit.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Deadline</p>
                    <p className="font-semibold text-white">{new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 border-2 border-[#16181C] flex items-center justify-center text-xs font-medium text-kuwex-cyan"
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <ArrowUpRight size={20} />
                  </button>
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-500">No projects found matching your criteria</p>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Create New Project</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Client</label>
                <input
                  type="text"
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  placeholder="Client name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Type</label>
                  <select className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
                    <option value="web">Web Development</option>
                    <option value="branding">Branding & Design</option>
                    <option value="multimedia">Multimedia</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consultancy">Consultancy</option>
                    <option value="mobile">Mobile Apps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Value ($)</label>
                  <input
                    type="number"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                  <input
                    type="date"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
