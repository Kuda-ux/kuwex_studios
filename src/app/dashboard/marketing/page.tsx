"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  Lightbulb,
  Loader2,
  X,
  Edit,
  Trash2,
  Hash,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";
import { useSocialPosts } from "@/hooks/useDatabase";
import { SocialPost } from "@/lib/types";

type PostStatus = "draft" | "scheduled" | "published";

const statusConfig: Record<
  PostStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  draft: { label: "Idea", color: "bg-purple-500/20 text-purple-400", icon: Lightbulb },
  scheduled: { label: "Scheduled", color: "bg-blue-500/20 text-blue-400", icon: Clock },
  published: { label: "Posted", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
};

const channelOptions = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter / X",
  "TikTok",
  "YouTube",
  "Blog",
  "Email Newsletter",
  "WhatsApp",
];

const channelColors: Record<string, string> = {
  Facebook: "bg-blue-600/20 text-blue-400",
  Instagram: "bg-pink-500/20 text-pink-400",
  LinkedIn: "bg-blue-700/20 text-blue-300",
  "Twitter / X": "bg-gray-500/20 text-gray-300",
  TikTok: "bg-fuchsia-500/20 text-fuchsia-400",
  YouTube: "bg-red-500/20 text-red-400",
  Blog: "bg-orange-500/20 text-orange-400",
  "Email Newsletter": "bg-teal-500/20 text-teal-400",
  WhatsApp: "bg-green-500/20 text-green-400",
};

interface PostForm {
  content: string;
  platforms: string[];
  scheduled_date: string;
  status: PostStatus;
  image_url: string;
}

const emptyForm: PostForm = {
  content: "",
  platforms: [],
  scheduled_date: "",
  status: "draft",
  image_url: "",
};

const ideaPrompts = [
  "Share a recent project win or case study",
  "Behind-the-scenes of your design / dev process",
  "Client testimonial or success story",
  "Industry tip or quick how-to",
  "Promote a service with a clear CTA",
  "Team highlight — introduce a member",
  "Before / after of a brand or web project",
  "Local business spotlight",
];

export default function MarketingPage() {
  const { posts, loading, error, createPost, updatePost, deletePost } = useSocialPosts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PostStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SocialPost | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.content.toLowerCase().includes(q) ||
          (p.platforms || []).some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [posts, search, statusFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return {
      total: posts.length,
      ideas: posts.filter((p) => p.status === "draft").length,
      scheduled: posts.filter((p) => p.status === "scheduled").length,
      thisMonth: posts.filter(
        (p) => p.status === "published" && new Date(p.scheduled_date).getTime() >= startOfMonth
      ).length,
    };
  }, [posts]);

  const upcoming = useMemo(() => {
    const now = Date.now();
    return posts
      .filter((p) => p.status === "scheduled" && new Date(p.scheduled_date).getTime() >= now)
      .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
      .slice(0, 3);
  }, [posts]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openCreateWithPrompt = (prompt: string) => {
    setEditing(null);
    setForm({ ...emptyForm, content: prompt });
    setShowForm(true);
  };

  const openEdit = (p: SocialPost) => {
    setEditing(p);
    setForm({
      content: p.content,
      platforms: p.platforms || [],
      scheduled_date: p.scheduled_date || "",
      status: p.status,
      image_url: p.image_url || "",
    });
    setShowForm(true);
  };

  const togglePlatform = (channel: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(channel)
        ? prev.platforms.filter((c) => c !== channel)
        : [...prev.platforms, channel],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.platforms.length === 0) {
      alert("Please select at least one channel.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        content: form.content,
        platforms: form.platforms,
        scheduled_date: form.scheduled_date || new Date().toISOString().split("T")[0],
        status: form.status,
        image_url: form.image_url || null,
      };
      if (editing) {
        await updatePost(editing.id, payload);
      } else {
        await createPost(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleMarkPosted = async (p: SocialPost) => {
    try {
      await updatePost(p.id, { status: "published" });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const handleDelete = async (p: SocialPost) => {
    if (!confirm("Delete this content idea?")) return;
    try {
      await deletePost(p.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Planner</h1>
          <p className="text-gray-500">Plan campaigns, content ideas and posting schedule</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
        >
          <Plus size={20} />
          New Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Content", value: stats.total, icon: Megaphone, color: "kuwex-cyan" },
          { label: "Ideas", value: stats.ideas, icon: Lightbulb, color: "purple-500" },
          { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "blue-500" },
          { label: "Posted This Month", value: stats.thisMonth, icon: TrendingUp, color: "green-500" },
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

      {/* Smart prompts + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-kuwex-cyan" />
            <h3 className="font-semibold text-white">Quick Content Ideas</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Click to start drafting from a prompt.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ideaPrompts.map((p) => (
              <button
                key={p}
                onClick={() => openCreateWithPrompt(p)}
                className="text-left text-sm px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2F3336] text-gray-300 hover:text-white hover:border-kuwex-cyan/40 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-kuwex-cyan" />
            <h3 className="font-semibold text-white">Upcoming</h3>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-500">Nothing scheduled yet.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((p) => (
                <li key={p.id} className="text-sm">
                  <p className="text-white truncate font-medium">{p.content}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(p.scheduled_date).toLocaleDateString()} ·{" "}
                    {(p.platforms || []).join(", ") || "No channel"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search content or channel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "draft", "scheduled", "published"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-kuwex-cyan text-black"
                  : "bg-[#16181C] border border-[#2F3336] text-gray-400 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
          <p className="font-medium">Failed to load content</p>
          <p className="text-sm text-red-400/70 mt-1">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
          <Megaphone className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">
            {posts.length === 0 ? "No content yet" : "No content matches your filters"}
          </h3>
          <p className="text-gray-500 mb-4">
            {posts.length === 0
              ? "Plan your first piece of content to start building your marketing strategy."
              : "Try adjusting your search or filters."}
          </p>
          {posts.length === 0 && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
            >
              <Plus size={20} />
              Add Content
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p, i) => {
            const cfg = statusConfig[p.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5 hover:border-[#3F4346] transition-colors flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${cfg.color}`}>
                    <Icon size={12} />
                    {cfg.label}
                  </span>
                  <div className="flex gap-1">
                    {p.status !== "published" && (
                      <button
                        onClick={() => handleMarkPosted(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                        title="Mark as posted"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-white text-sm whitespace-pre-wrap mb-3 line-clamp-4 flex-1">
                  {p.content || <span className="text-gray-600 italic">No content yet</span>}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(p.platforms || []).map((c) => (
                    <span
                      key={c}
                      className={`text-xs px-2 py-0.5 rounded-full ${channelColors[c] || "bg-gray-500/20 text-gray-400"}`}
                    >
                      <Hash size={10} className="inline mr-0.5" />
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-[#2F3336]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {p.scheduled_date ? new Date(p.scheduled_date).toLocaleDateString() : "Not scheduled"}
                  </span>
                  {p.image_url && (
                    <span className="flex items-center gap-1 text-kuwex-cyan">
                      <ImageIcon size={12} />
                      Has image
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-2xl my-8"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit Content" : "New Content"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Content / Caption *</label>
                <textarea
                  required
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your post copy, blog idea, or campaign message..."
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {form.content.length} characters
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Channels *</label>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map((c) => {
                    const active = form.platforms.includes(c);
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => togglePlatform(c)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          active
                            ? "bg-kuwex-cyan text-black font-medium"
                            : "bg-[#0A0A0A] border border-[#2F3336] text-gray-400 hover:text-white"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    value={form.scheduled_date}
                    onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as PostStatus })}
                    className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                  >
                    <option value="draft">Idea</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Posted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Image URL (optional)</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2F3336] text-gray-300 hover:text-white hover:border-[#3F4346] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kuwex-cyan text-black font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50 transition-colors"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editing ? "Save Changes" : "Create Content"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
