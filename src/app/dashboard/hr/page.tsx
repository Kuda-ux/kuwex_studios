"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp,
  Loader2,
  X,
  Edit,
  Trash2,
  ListChecks,
  Mail,
} from "lucide-react";
import { useTeamMembers, useTasks, useProjects } from "@/hooks/useDatabase";
import { TeamMember, Task } from "@/lib/types";

type Tab = "team" | "tasks";

const taskStatusConfig: Record<
  Task["status"],
  { label: string; color: string }
> = {
  pending: { label: "Pending", color: "bg-gray-500/20 text-gray-400" },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400" },
  completed: { label: "Completed", color: "bg-green-500/20 text-green-400" },
};

const priorityConfig: Record<
  Task["priority"],
  { label: string; color: string }
> = {
  low: { label: "Low", color: "bg-gray-500/20 text-gray-400" },
  medium: { label: "Medium", color: "bg-yellow-500/20 text-yellow-400" },
  high: { label: "High", color: "bg-red-500/20 text-red-400" },
};

const memberStatusColors: Record<TeamMember["status"], string> = {
  online: "bg-green-500",
  busy: "bg-yellow-500",
  offline: "bg-gray-500",
};

interface MemberForm {
  name: string;
  email: string;
  role: string;
  status: TeamMember["status"];
  hours_this_week: number;
  tasks_completed: number;
  productivity: number;
}

const emptyMemberForm: MemberForm = {
  name: "",
  email: "",
  role: "",
  status: "online",
  hours_this_week: 0,
  tasks_completed: 0,
  productivity: 0,
};

interface TaskForm {
  title: string;
  description: string;
  assignee_id: string;
  project_id: string;
  status: Task["status"];
  priority: Task["priority"];
  due_date: string;
}

const emptyTaskForm: TaskForm = {
  title: "",
  description: "",
  assignee_id: "",
  project_id: "",
  status: "pending",
  priority: "medium",
  due_date: "",
};

export default function HRPage() {
  const {
    teamMembers,
    loading: teamLoading,
    error: teamError,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useTeamMembers();
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();
  const { projects } = useProjects();

  const [tab, setTab] = useState<Tab>("team");
  const [search, setSearch] = useState("");

  const [memberModal, setMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState<MemberForm>(emptyMemberForm);

  const [taskModal, setTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<TaskForm>(emptyTaskForm);

  const [saving, setSaving] = useState(false);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "completed").length;
    const totalHours = teamMembers.reduce((s, m) => s + (m.hours_this_week || 0), 0);
    const avgProductivity = teamMembers.length
      ? Math.round(teamMembers.reduce((s, m) => s + (m.productivity || 0), 0) / teamMembers.length)
      : 0;
    return {
      members: teamMembers.length,
      hours: totalHours,
      completed,
      total: tasks.length,
      productivity: avgProductivity,
    };
  }, [teamMembers, tasks]);

  const filteredMembers = useMemo(() => {
    if (!search) return teamMembers;
    const q = search.toLowerCase();
    return teamMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }, [teamMembers, search]);

  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    const q = search.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
    );
  }, [tasks, search]);

  const memberById = (id: string) => teamMembers.find((m) => m.id === id);
  const projectById = (id: string) => projects.find((p) => p.id === id);

  // ---- Member handlers ----
  const openCreateMember = () => {
    setEditingMember(null);
    setMemberForm(emptyMemberForm);
    setMemberModal(true);
  };

  const openEditMember = (m: TeamMember) => {
    setEditingMember(m);
    setMemberForm({
      name: m.name,
      email: m.email,
      role: m.role,
      status: m.status,
      hours_this_week: m.hours_this_week || 0,
      tasks_completed: m.tasks_completed || 0,
      productivity: m.productivity || 0,
    });
    setMemberModal(true);
  };

  const submitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...memberForm, avatar_url: "" };
      if (editingMember) {
        await updateTeamMember(editingMember.id, payload);
      } else {
        await createTeamMember(payload);
      }
      setMemberModal(false);
      setEditingMember(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (m: TeamMember) => {
    if (!confirm(`Remove team member "${m.name}"?`)) return;
    try {
      await deleteTeamMember(m.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  // ---- Task handlers ----
  const openCreateTask = () => {
    setEditingTask(null);
    setTaskForm(emptyTaskForm);
    setTaskModal(true);
  };

  const openEditTask = (t: Task) => {
    setEditingTask(t);
    setTaskForm({
      title: t.title,
      description: t.description || "",
      assignee_id: t.assignee_id || "",
      project_id: t.project_id || "",
      status: t.status,
      priority: t.priority,
      due_date: t.due_date || "",
    });
    setTaskModal(true);
  };

  const submitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskForm);
      } else {
        await createTask(taskForm);
      }
      setTaskModal(false);
      setEditingTask(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const removeTask = async (t: Task) => {
    if (!confirm(`Delete task "${t.title}"?`)) return;
    try {
      await deleteTask(t.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">HR & Team</h1>
          <p className="text-gray-500">Manage team members and assign tasks</p>
        </div>
        <button
          onClick={tab === "team" ? openCreateMember : openCreateTask}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          {tab === "team" ? "Add Member" : "Add Task"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Team Members", value: stats.members, icon: Users, color: "kuwex-cyan" },
          { label: "Hours This Week", value: `${stats.hours}h`, icon: Clock, color: "blue-500" },
          {
            label: "Tasks Completed",
            value: `${stats.completed}/${stats.total}`,
            icon: CheckCircle2,
            color: "green-500",
          },
          { label: "Avg Productivity", value: `${stats.productivity}%`, icon: TrendingUp, color: "purple-500" },
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

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl w-fit">
          <button
            onClick={() => setTab("team")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "team" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Team
          </button>
          <button
            onClick={() => setTab("tasks")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "tasks" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <ListChecks size={16} className="inline mr-2" />
            Tasks
          </button>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder={tab === "team" ? "Search members..." : "Search tasks..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
          />
        </div>
      </div>

      {/* TEAM TAB */}
      {tab === "team" && (
        <>
          {teamLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
            </div>
          ) : teamError ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
              {teamError}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
              <Users className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-white mb-2">
                {teamMembers.length === 0 ? "No team members yet" : "No members match your search"}
              </h3>
              <p className="text-gray-500 mb-4">
                {teamMembers.length === 0
                  ? "Add your first team member to start tracking productivity."
                  : "Try a different search."}
              </p>
              {teamMembers.length === 0 && (
                <button
                  onClick={openCreateMember}
                  className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90"
                >
                  <Plus size={20} />
                  Add Member
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMembers.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-xl">
                          {m.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#16181C] ${memberStatusColors[m.status]}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                        <p className="text-sm text-gray-500">{m.role}</p>
                        {m.email && (
                          <a
                            href={`mailto:${m.email}`}
                            className="text-xs text-kuwex-cyan hover:underline flex items-center gap-1 mt-1"
                          >
                            <Mail size={11} />
                            {m.email}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditMember(m)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => removeMember(m)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                      <p className="text-xl font-bold text-white">{m.hours_this_week || 0}h</p>
                      <p className="text-xs text-gray-500">This Week</p>
                    </div>
                    <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                      <p className="text-xl font-bold text-white">{m.tasks_completed || 0}</p>
                      <p className="text-xs text-gray-500">Tasks Done</p>
                    </div>
                    <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                      <p className="text-xl font-bold text-green-400">{m.productivity || 0}%</p>
                      <p className="text-xs text-gray-500">Productivity</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* TASKS TAB */}
      {tab === "tasks" && (
        <>
          {tasksLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
            </div>
          ) : tasksError ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
              {tasksError}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
              <ListChecks className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-white mb-2">
                {tasks.length === 0 ? "No tasks yet" : "No tasks match your search"}
              </h3>
              <p className="text-gray-500 mb-4">
                {tasks.length === 0
                  ? "Add your first task to start tracking work."
                  : "Try a different search."}
              </p>
              {tasks.length === 0 && (
                <button
                  onClick={openCreateTask}
                  className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90"
                >
                  <Plus size={20} />
                  Add Task
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((t, i) => {
                const assignee = memberById(t.assignee_id);
                const project = projectById(t.project_id);
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-[#3F4346] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleComplete(t.id)}
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          t.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : "border-gray-500 hover:border-kuwex-cyan"
                        }`}
                      >
                        {t.status === "completed" && <CheckCircle2 size={14} className="text-white" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${priorityConfig[t.priority].color}`}>
                            {priorityConfig[t.priority].label}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${taskStatusConfig[t.status].color}`}>
                            {taskStatusConfig[t.status].label}
                          </span>
                        </div>
                        <h3
                          className={`font-medium ${
                            t.status === "completed"
                              ? "line-through text-gray-500"
                              : "text-white"
                          }`}
                        >
                          {t.title}
                        </h3>
                        {t.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2">
                          {assignee && <span>👤 {assignee.name}</span>}
                          {project && <span>📁 {project.name}</span>}
                          {t.due_date && (
                            <span>📅 {new Date(t.due_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditTask(t)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => removeTask(t)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"
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
        </>
      )}

      {/* MEMBER MODAL */}
      {memberModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-lg my-8"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editingMember ? "Edit Member" : "New Team Member"}
              </h2>
              <button onClick={() => setMemberModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitMember} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Role</label>
                  <input
                    type="text"
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    placeholder="e.g. Developer, Designer"
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <select
                  value={memberForm.status}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, status: e.target.value as TeamMember["status"] })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                >
                  <option value="online">Online</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Hours / week</label>
                  <input
                    type="number"
                    min={0}
                    value={memberForm.hours_this_week}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, hours_this_week: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tasks done</label>
                  <input
                    type="number"
                    min={0}
                    value={memberForm.tasks_completed}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, tasks_completed: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Productivity %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={memberForm.productivity}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, productivity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setMemberModal(false)}
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
                  {editingMember ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* TASK MODAL */}
      {taskModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-lg my-8"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <button onClick={() => setTaskModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Assignee</label>
                  <select
                    value={taskForm.assignee_id}
                    onChange={(e) => setTaskForm({ ...taskForm, assignee_id: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project</label>
                  <select
                    value={taskForm.project_id}
                    onChange={(e) => setTaskForm({ ...taskForm, project_id: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="">No project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, priority: e.target.value as Task["priority"] })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={taskForm.status}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, status: e.target.value as Task["status"] })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.due_date}
                    onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTaskModal(false)}
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
                  {editingTask ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
