"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Save,
  Loader2,
  CheckCircle2,
  Trash2,
  Plus,
  Edit,
  X,
  Mail,
  Database,
} from "lucide-react";
import { useCompanySettings, useTeamMembers } from "@/hooks/useDatabase";
import type { CompanySettings, TeamMember } from "@/lib/types";

type Tab = "company" | "team" | "system";

interface MemberForm {
  name: string;
  email: string;
  role: string;
  status: TeamMember["status"];
}

const emptyMemberForm: MemberForm = {
  name: "",
  email: "",
  role: "",
  status: "online",
};

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("company");

  // ---- Company settings ----
  const { settings, loading: settingsLoading, error: settingsError, updateSettings } =
    useCompanySettings();
  const [companyForm, setCompanyForm] = useState<Partial<CompanySettings>>({});
  const [companySaving, setCompanySaving] = useState(false);
  const [companySaved, setCompanySaved] = useState(false);

  useEffect(() => {
    if (settings) setCompanyForm(settings);
  }, [settings]);

  const submitCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanySaving(true);
    setCompanySaved(false);
    try {
      await updateSettings(companyForm);
      setCompanySaved(true);
      setTimeout(() => setCompanySaved(false), 2500);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setCompanySaving(false);
    }
  };

  // ---- Team members ----
  const {
    teamMembers,
    loading: teamLoading,
    error: teamError,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useTeamMembers();

  const [memberModal, setMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState<MemberForm>(emptyMemberForm);
  const [memberSaving, setMemberSaving] = useState(false);

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
    });
    setMemberModal(true);
  };

  const submitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemberSaving(true);
    try {
      const payload = {
        ...memberForm,
        avatar_url: "",
        hours_this_week: editingMember?.hours_this_week || 0,
        tasks_completed: editingMember?.tasks_completed || 0,
        productivity: editingMember?.productivity || 0,
      };
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
      setMemberSaving(false);
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

  const tabs: { id: Tab; label: string; icon: typeof Building2 }[] = [
    { id: "company", label: "Company", icon: Building2 },
    { id: "team", label: "Team", icon: Users },
    { id: "system", label: "System", icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500">Manage your company info and team access</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    tab === t.id
                      ? "bg-kuwex-cyan text-black"
                      : "text-gray-400 hover:text-white hover:bg-[#2F3336]"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* COMPANY TAB */}
          {tab === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Company Information</h2>

              {settingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
                </div>
              ) : settingsError ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                  {settingsError}
                </div>
              ) : (
                <form onSubmit={submitCompany} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={companyForm.company_name || ""}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, company_name: e.target.value })
                      }
                      className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={companyForm.email || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={companyForm.phone || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Address</label>
                    <input
                      type="text"
                      value={companyForm.address || ""}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Website</label>
                      <input
                        type="url"
                        value={companyForm.website || ""}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, website: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Currency</label>
                      <select
                        value={companyForm.currency || "USD"}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, currency: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="ZWL">ZWL (ZWL$)</option>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    {companySaved && (
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        Saved successfully
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={companySaving}
                      className="ml-auto flex items-center gap-2 bg-kuwex-cyan text-black px-6 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50 transition-colors"
                    >
                      {companySaving ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Save size={18} />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* TEAM TAB */}
          {tab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
                <button
                  onClick={openCreateMember}
                  className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2 rounded-xl font-semibold hover:bg-kuwex-cyan/90"
                >
                  <Plus size={18} />
                  Invite Member
                </button>
              </div>

              {teamLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
                </div>
              ) : teamError ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                  {teamError}
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto text-gray-600 mb-3" size={40} />
                  <p className="text-gray-500">No team members yet. Invite your first one.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {teamMembers.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 bg-[#0A0A0A] rounded-xl flex items-center justify-between border border-[#2F3336]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold">
                          {m.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-white">{m.name}</p>
                          {m.email && (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail size={12} />
                              {m.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-kuwex-cyan/10 text-kuwex-cyan text-sm rounded-full">
                          {m.role || "Member"}
                        </span>
                        <button
                          onClick={() => openEditMember(m)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => removeMember(m)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* SYSTEM TAB */}
          {tab === "system" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-white">System Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-[#0A0A0A] rounded-xl">
                  <span className="text-gray-400">Database</span>
                  <span className="text-white font-medium">Turso (libSQL)</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0A0A0A] rounded-xl">
                  <span className="text-gray-400">Hosting</span>
                  <span className="text-white font-medium">Vercel</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0A0A0A] rounded-xl">
                  <span className="text-gray-400">Environment</span>
                  <span className="text-white font-medium">Production</span>
                </div>
                <div className="flex justify-between p-3 bg-[#0A0A0A] rounded-xl">
                  <span className="text-gray-400">Site</span>
                  <a
                    href="https://kuwexstudios.co.zw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kuwex-cyan hover:underline"
                  >
                    kuwexstudios.co.zw
                  </a>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
                💡 All dashboard data is stored securely in your Turso database. Team members
                added here can access the same shared data.
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* MEMBER MODAL */}
      {memberModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-md"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editingMember ? "Edit Member" : "Invite Member"}
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
                  placeholder="e.g. Developer, Designer, Admin"
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
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
                  disabled={memberSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kuwex-cyan text-black font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50"
                >
                  {memberSaving && <Loader2 className="animate-spin" size={16} />}
                  {editingMember ? "Save" : "Invite"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
