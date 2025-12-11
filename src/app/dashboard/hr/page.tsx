"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Plus,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "busy" | "offline";
  hoursThisWeek: number;
  tasksCompleted: number;
  productivity: number;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  project: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
}

const teamMembers: TeamMember[] = [
  { id: 1, name: "Kuda", role: "Founder & Lead Developer", avatar: "K", status: "online", hoursThisWeek: 42, tasksCompleted: 12, productivity: 95 },
  { id: 2, name: "Weston", role: "Co-Founder & Creative Director", avatar: "W", status: "online", hoursThisWeek: 38, tasksCompleted: 8, productivity: 88 },
];

const tasks: Task[] = [
  { id: 1, title: "Complete TechStart homepage design", assignee: "Weston", project: "TechStart Website", dueDate: "2024-12-12", status: "in_progress", priority: "high" },
  { id: 2, title: "Implement user authentication", assignee: "Kuda", project: "HealthPlus App", dueDate: "2024-12-13", status: "in_progress", priority: "high" },
  { id: 3, title: "Create brand guidelines PDF", assignee: "Weston", project: "GreenEnergy Brand", dueDate: "2024-12-15", status: "pending", priority: "medium" },
  { id: 4, title: "Setup CI/CD pipeline", assignee: "Kuda", project: "TechStart Website", dueDate: "2024-12-14", status: "completed", priority: "medium" },
  { id: 5, title: "Design social media templates", assignee: "Weston", project: "EduLearn Marketing", dueDate: "2024-12-16", status: "pending", priority: "low" },
];

const priorityColors = {
  low: "bg-gray-500/20 text-gray-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
};

const statusColors = {
  pending: "bg-gray-500/20 text-gray-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
};

export default function HRPage() {
  const [activeTab, setActiveTab] = useState<"team" | "tasks" | "time">("team");

  const totalHours = teamMembers.reduce((sum, m) => sum + m.hoursThisWeek, 0);
  const avgProductivity = Math.round(teamMembers.reduce((sum, m) => sum + m.productivity, 0) / teamMembers.length);
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">HR & Productivity</h1>
          <p className="text-gray-500">Team management and task tracking</p>
        </div>
        <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
              <Users className="text-kuwex-cyan" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
          <p className="text-sm text-gray-500">Team Members</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="text-blue-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{totalHours}h</p>
          <p className="text-sm text-gray-500">Hours This Week</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{completedTasks}/{tasks.length}</p>
          <p className="text-sm text-gray-500">Tasks Completed</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="text-purple-500" size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{avgProductivity}%</p>
          <p className="text-sm text-gray-500">Avg Productivity</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl w-fit">
        <button onClick={() => setActiveTab("team")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "team" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <Users size={16} className="inline mr-2" />Team
        </button>
        <button onClick={() => setActiveTab("tasks")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "tasks" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <CheckCircle2 size={16} className="inline mr-2" />Tasks
        </button>
        <button onClick={() => setActiveTab("time")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "time" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <Clock size={16} className="inline mr-2" />Time Tracking
        </button>
      </div>

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-xl">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#16181C] ${member.status === "online" ? "bg-green-500" : member.status === "busy" ? "bg-yellow-500" : "bg-gray-500"}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                  <p className="text-xl font-bold text-white">{member.hoursThisWeek}h</p>
                  <p className="text-xs text-gray-500">This Week</p>
                </div>
                <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                  <p className="text-xl font-bold text-white">{member.tasksCompleted}</p>
                  <p className="text-xs text-gray-500">Tasks Done</p>
                </div>
                <div className="text-center p-3 bg-[#0A0A0A] rounded-xl">
                  <p className="text-xl font-bold text-green-400">{member.productivity}%</p>
                  <p className="text-xs text-gray-500">Productivity</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-[#3F4346] transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[task.status]}`}>{task.status.replace("_", " ")}</span>
                  </div>
                  <h3 className="font-medium text-white mb-1">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.project}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Assignee</p>
                    <p className="text-white font-medium">{task.assignee}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Due Date</p>
                    <p className="text-white font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Time Tracking Tab */}
      {activeTab === "time" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Hours</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{member.name}</span>
                    <span className="text-white font-medium">{member.hoursThisWeek}h / 40h</span>
                  </div>
                  <div className="h-2 bg-[#2F3336] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-kuwex-cyan to-kuwex-blue rounded-full" style={{ width: `${(member.hoursThisWeek / 40) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time by Project</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-gray-300">TechStart Website</span>
                <span className="text-kuwex-cyan font-medium">24h</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-gray-300">HealthPlus App</span>
                <span className="text-kuwex-cyan font-medium">18h</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-gray-300">GreenEnergy Brand</span>
                <span className="text-kuwex-cyan font-medium">12h</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-gray-300">EduLearn Marketing</span>
                <span className="text-kuwex-cyan font-medium">8h</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
