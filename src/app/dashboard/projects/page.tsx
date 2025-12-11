"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Pause,
  ArrowUpRight,
  FolderKanban,
  Trash2,
  Edit,
  X,
  Loader2,
} from "lucide-react";
import { useProjects } from "@/hooks/useDatabase";
import { Project } from "@/lib/supabase";

type ProjectStatus = "planning" | "in_progress" | "review" | "completed";

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  planning: { label: "Planning", color: "bg-purple-500/20 text-purple-400", icon: Calendar },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400", icon: Clock },
  review: { label: "Review", color: "bg-yellow-500/20 text-yellow-400", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  web: { label: "Web Development", color: "bg-cyan-500/20 text-cyan-400" },
  branding: { label: "Branding & Design", color: "bg-pink-500/20 text-pink-400" },
  multimedia: { label: "Multimedia", color: "bg-orange-500/20 text-orange-400" },
  marketing: { label: "Digital Marketing", color: "bg-green-500/20 text-green-400" },
  consultancy: { label: "Consultancy", color: "bg-purple-500/20 text-purple-400" },
  mobile: { label: "Mobile Apps", color: "bg-blue-500/20 text-blue-400" },
};

export default function ProjectsPage() {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    category: "web",
    value: "",
    start_date: "",
    deadline: "",
    status: "planning" as ProjectStatus,
    progress: 0,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      client: "",
      category: "web",
      value: "",
      start_date: "",
      deadline: "",
      status: "planning",
      progress: 0,
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "in_progress" || p.status === "review").length,
    completed: projects.filter((p) => p.status === "completed").length,
    totalValue: projects.reduce((sum, p) => sum + (p.value || 0), 0),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const projectData = {
        name: formData.name,
        client: formData.client,
        category: formData.category,
        value: parseFloat(formData.value) || 0,
        start_date: formData.start_date,
        deadline: formData.deadline,
        status: formData.status,
        progress: formData.progress,
        team: [],
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await createProject(projectData);
      }
      setShowNewProjectModal(false);
      setEditingProject(null);
      resetForm();
    } catch (err) {
      console.error("Error saving project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      category: project.category || "web",
      value: project.value?.toString() || "",
      start_date: project.start_date || "",
      deadline: project.deadline || "",
      status: project.status,
      progress: project.progress || 0,
    });
    setShowNewProjectModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ProjectStatus) => {
    const progress = newStatus === "completed" ? 100 : undefined;
    await updateProject(id, { status: newStatus, ...(progress !== undefined && { progress }) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-kuwex-cyan animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-500">Manage and track all your projects</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingProject(null);
            setShowNewProjectModal(true);
          }}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
              <FolderKanban className="text-kuwex-cyan" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-500">Total Projects</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="text-blue-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
          <p className="text-sm text-gray-500">Active Projects</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
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
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
          >
            <option value="all">All Categories</option>
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
          const status = project.status as ProjectStatus;
          const StatusIcon = statusConfig[status]?.icon || Clock;
          const category = project.category || "web";
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
                      <span className={`px-2.5 py-1 text-xs rounded-full ${categoryConfig[category]?.color || "bg-gray-500/20 text-gray-400"}`}>
                        {categoryConfig[category]?.label || category}
                      </span>
                      <span className={`px-2.5 py-1 text-xs rounded-full flex items-center gap-1 ${statusConfig[status]?.color || "bg-gray-500/20 text-gray-400"}`}>
                        <StatusIcon size={12} />
                        {statusConfig[status]?.label || status}
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
                    <span className="text-sm font-medium text-white">{project.progress || 0}%</span>
                  </div>
                  <div className="h-2 bg-[#2F3336] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full transition-all"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Value</p>
                    <p className="font-semibold text-white">${(project.value || 0).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Deadline</p>
                    <p className="font-semibold text-white">
                      {project.deadline ? new Date(project.deadline).toLocaleDateString() : "Not set"}
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {(project.team || []).map((member, i) => (
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
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value as ProjectStatus)}
                    className="bg-[#0A0A0A] border border-[#2F3336] rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-kuwex-cyan"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(project.id)}
                    className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={18} />
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
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="mt-4 text-kuwex-cyan hover:underline"
          >
            Create your first project
          </button>
        </div>
      )}

      {/* New/Edit Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <button
                onClick={() => {
                  setShowNewProjectModal(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Client *</label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  placeholder="Client name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="web">Web Development</option>
                    <option value="branding">Branding & Design</option>
                    <option value="multimedia">Multimedia</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consultancy">Consultancy</option>
                    <option value="mobile">Mobile Apps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Value ($)</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
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
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewProjectModal(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-3 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {editingProject ? "Update Project" : "Create Project"}
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
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-gray-400 mb-6">This action cannot be undone. All project data will be permanently deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-[#2F3336] rounded-xl text-white hover:bg-[#2F3336] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
