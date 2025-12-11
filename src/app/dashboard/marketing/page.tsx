"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Sparkles,
  Clock,
} from "lucide-react";

interface ScheduledPost {
  id: number;
  content: string;
  platform: string[];
  scheduledDate: string;
  status: "scheduled" | "published" | "draft";
  image?: string;
}

const scheduledPosts: ScheduledPost[] = [
  { id: 1, content: "🚀 Excited to announce our latest project launch! Check out the amazing website we built for TechStart Inc.", platform: ["instagram", "facebook", "linkedin"], scheduledDate: "2024-12-12 10:00", status: "scheduled" },
  { id: 2, content: "Looking for a stunning brand identity? Our design team creates memorable brands that stand out. DM us!", platform: ["instagram", "facebook"], scheduledDate: "2024-12-13 14:00", status: "scheduled" },
  { id: 3, content: "5 Web Design Trends to Watch in 2025 - New blog post is live! Link in bio 🔗", platform: ["instagram", "twitter", "linkedin"], scheduledDate: "2024-12-14 09:00", status: "draft" },
  { id: 4, content: "Behind the scenes of our latest branding project 🎨 #DesignProcess #Branding", platform: ["instagram"], scheduledDate: "2024-12-11 16:00", status: "published" },
];

const socialStats = {
  instagram: { followers: 2450, growth: 12, engagement: 4.2 },
  facebook: { followers: 1820, growth: 8, engagement: 2.8 },
  linkedin: { followers: 890, growth: 15, engagement: 5.1 },
  twitter: { followers: 650, growth: 5, engagement: 1.9 },
};

const platformIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
};

const platformColors: Record<string, string> = {
  instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
  twitter: "bg-sky-500",
};

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "analytics" | "ai">("calendar");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing & Social Media</h1>
          <p className="text-gray-500">Manage content and track performance</p>
        </div>
        <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Plus size={20} />
          Create Post
        </button>
      </div>

      {/* Social Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(socialStats).map(([platform, stats], index) => {
          const Icon = platformIcons[platform];
          return (
            <motion.div key={platform} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${platformColors[platform]} flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">+{stats.growth}%</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 capitalize">{platform} Followers</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Heart size={12} />
                <span>{stats.engagement}% engagement</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl w-fit">
        <button onClick={() => setActiveTab("calendar")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "calendar" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <Calendar size={16} className="inline mr-2" />Content Calendar
        </button>
        <button onClick={() => setActiveTab("analytics")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "analytics" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <TrendingUp size={16} className="inline mr-2" />Analytics
        </button>
        <button onClick={() => setActiveTab("ai")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "ai" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
          <Sparkles size={16} className="inline mr-2" />AI Tools
        </button>
      </div>

      {/* Content Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Scheduled Posts</h2>
          {scheduledPosts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {post.platform.map((p) => {
                      const Icon = platformIcons[p];
                      return (
                        <div key={p} className={`w-6 h-6 rounded ${platformColors[p]} flex items-center justify-center`}>
                          <Icon size={14} className="text-white" />
                        </div>
                      );
                    })}
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${post.status === "published" ? "bg-green-500/20 text-green-400" : post.status === "scheduled" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(post.scheduledDate).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Eye size={18} />
                  </button>
                  <button className="px-3 py-1.5 bg-[#2F3336] hover:bg-[#3F4346] rounded-lg text-sm text-white transition-colors">Edit</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Engagement Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Heart className="text-red-500" size={20} />
                  </div>
                  <span className="text-gray-400">Total Likes</span>
                </div>
                <span className="text-xl font-bold text-white">12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="text-blue-500" size={20} />
                  </div>
                  <span className="text-gray-400">Comments</span>
                </div>
                <span className="text-xl font-bold text-white">1,890</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Share2 className="text-green-500" size={20} />
                  </div>
                  <span className="text-gray-400">Shares</span>
                </div>
                <span className="text-xl font-bold text-white">856</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Users className="text-purple-500" size={20} />
                  </div>
                  <span className="text-gray-400">New Followers</span>
                </div>
                <span className="text-xl font-bold text-white">+234</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Posts</h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#0A0A0A] rounded-xl">
                <p className="text-sm text-gray-300 mb-2">🚀 Excited to announce our latest project...</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Heart size={12} /> 450</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} /> 32</span>
                  <span className="flex items-center gap-1"><Share2 size={12} /> 28</span>
                </div>
              </div>
              <div className="p-4 bg-[#0A0A0A] rounded-xl">
                <p className="text-sm text-gray-300 mb-2">Behind the scenes of our branding process 🎨</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Heart size={12} /> 380</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} /> 28</span>
                  <span className="flex items-center gap-1"><Share2 size={12} /> 15</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Tools Tab */}
      {activeTab === "ai" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Sparkles className="text-purple-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Caption Generator</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Generate engaging captions for your social media posts using AI.</p>
            <textarea className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 h-24 resize-none mb-4" placeholder="Describe your post or paste your content..." />
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">Generate Captions</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
                <Calendar className="text-kuwex-cyan" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">Content Ideas</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">AI-suggested content ideas for this month:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-kuwex-cyan">•</span>
                <span className="text-sm text-gray-300">Share a client success story with before/after visuals</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-kuwex-cyan">•</span>
                <span className="text-sm text-gray-300">Create a carousel post about web design trends</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-xl">
                <span className="text-kuwex-cyan">•</span>
                <span className="text-sm text-gray-300">Post a team introduction video</span>
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}
