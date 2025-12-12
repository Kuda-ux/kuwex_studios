"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Calendar,
  Facebook,
  Linkedin,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Sparkles,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit3,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useSocialPosts } from "@/hooks/useDatabase";
import { SocialPost } from "@/lib/supabase";

// Platform configuration
const platformIcons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  linkedin: Linkedin,
};

const platformColors: Record<string, string> = {
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
};

const platformNames: Record<string, string> = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

// Facebook stats interface
interface FacebookStats {
  followers: number;
  likes: number;
  name: string;
  id: string;
}

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  likes: number;
  comments: number;
  shares: number;
}

interface SocialStatsData {
  facebook: {
    configured: boolean;
    stats: FacebookStats | null;
    error?: string;
    recentPosts: FacebookPost[];
    engagement: {
      totalLikes: number;
      totalComments: number;
      totalShares: number;
    };
  };
  linkedin: {
    configured: boolean;
    stats: null;
    error?: string;
  };
}

export default function MarketingPage() {
  const { posts, loading, error, refresh, createPost, updatePost, deletePost, publishPost } = useSocialPosts();
  const [activeTab, setActiveTab] = useState<"calendar" | "analytics" | "ai">("calendar");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [posting, setPosting] = useState(false);
  const [postResult, setPostResult] = useState<{ success: boolean; message: string; results?: Array<{ platform: string; success: boolean; error?: string }> } | null>(null);
  
  // Form state
  const [newPost, setNewPost] = useState({
    content: "",
    platforms: ["facebook", "linkedin"] as string[],
    scheduled_date: "",
    status: "draft" as "draft" | "scheduled" | "published",
    image_url: "",
  });

  // AI Caption state
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);

  // Platform config status
  const [platformConfig, setPlatformConfig] = useState<Record<string, { configured: boolean }>>({});
  
  // Real social stats from Facebook
  const [socialStats, setSocialStats] = useState<SocialStatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Check platform configuration and fetch real stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check config
        const configRes = await fetch('/api/social/post');
        const configData = await configRes.json();
        if (configData.platforms) {
          setPlatformConfig(configData.platforms);
        }
        
        // Fetch real stats from Facebook
        const statsRes = await fetch('/api/social/stats');
        const statsData = await statsRes.json();
        setSocialStats(statsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  // Create/Save post to database
  const handleSavePost = async (publishNow: boolean = false) => {
    if (!newPost.content.trim()) {
      alert("Please enter post content");
      return;
    }
    if (newPost.platforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    try {
      const postData = {
        content: newPost.content,
        platforms: newPost.platforms,
        scheduled_date: newPost.scheduled_date || new Date().toISOString(),
        status: publishNow ? "published" as const : newPost.status,
        image_url: newPost.image_url || null,
      };

      const savedPost = await createPost(postData);

      // If publishing now, also post to social media
      if (publishNow) {
        await handlePublishToSocial(savedPost);
      }

      setShowCreateModal(false);
      resetForm();
      refresh();
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Failed to save post. Please try again.");
    }
  };

  // Update existing post
  const handleUpdatePost = async () => {
    if (!editingPost) return;
    
    try {
      await updatePost(editingPost.id, {
        content: editingPost.content,
        platforms: editingPost.platforms,
        scheduled_date: editingPost.scheduled_date,
        status: editingPost.status,
        image_url: editingPost.image_url,
      });
      setShowEditModal(false);
      setEditingPost(null);
      refresh();
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  // Publish to social media platforms
  const handlePublishToSocial = async (post: SocialPost) => {
    setPosting(true);
    setPostResult(null);

    try {
      const response = await fetch('/api/social/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: post.content,
          platforms: post.platforms,
          imageUrl: post.image_url,
        }),
      });

      const result = await response.json();
      setPostResult(result);

      // Update post status in database if successful
      if (result.success) {
        await publishPost(post.id);
        refresh();
      }
    } catch (err) {
      setPostResult({
        success: false,
        message: err instanceof Error ? err.message : "Failed to post to social media"
      });
    } finally {
      setPosting(false);
    }
  };

  // Delete post
  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await deletePost(id);
      refresh();
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  // Generate AI captions
  const handleGenerateCaptions = async () => {
    if (!aiPrompt.trim()) {
      alert("Please describe your post");
      return;
    }

    setGeneratingCaption(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Generate 3 engaging social media captions for KuWeX Studios (a creative digital agency in Zimbabwe) about: ${aiPrompt}. 
            
            Make them:
            - Professional but friendly
            - Include relevant emojis
            - Include a call to action
            - Suitable for Facebook and LinkedIn
            
            Format: Return only the 3 captions, numbered 1-3, each on its own line.`
          }]
        }),
      });

      const data = await response.json();
      if (data.message) {
        // Parse the captions from the response
        const captions = data.message
          .split(/\d+\.\s+/)
          .filter((c: string) => c.trim())
          .map((c: string) => c.trim());
        setGeneratedCaptions(captions);
      }
    } catch (err) {
      console.error("Failed to generate captions:", err);
      alert("Failed to generate captions. Please try again.");
    } finally {
      setGeneratingCaption(false);
    }
  };

  // Use generated caption
  const useCaption = (caption: string) => {
    setNewPost(prev => ({ ...prev, content: caption }));
    setShowCreateModal(true);
  };

  // Reset form
  const resetForm = () => {
    setNewPost({
      content: "",
      platforms: ["facebook", "linkedin"],
      scheduled_date: "",
      status: "draft",
      image_url: "",
    });
    setPostResult(null);
  };

  // Open edit modal
  const openEditModal = (post: SocialPost) => {
    setEditingPost({ ...post });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing & Social Media</h1>
          <p className="text-gray-500">Create and publish posts to Facebook & LinkedIn</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 bg-[#2F3336] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#3F4346] transition-colors"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={() => { resetForm(); setShowCreateModal(true); }}
            className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
          >
            <Plus size={20} />
            Create Post
          </button>
        </div>
      </div>

      {/* Platform Connection Status */}
      <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Connected Platforms</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(platformConfig).map(([platform, config]) => (
            <div 
              key={platform}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                config.configured ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {platformIcons[platform] && (() => {
                const Icon = platformIcons[platform];
                return <Icon size={16} className={config.configured ? 'text-green-400' : 'text-red-400'} />;
              })()}
              <span className={`text-sm ${config.configured ? 'text-green-400' : 'text-red-400'}`}>
                {platformNames[platform] || platform}
              </span>
              {config.configured ? (
                <CheckCircle2 size={14} className="text-green-400" />
              ) : (
                <AlertCircle size={14} className="text-red-400" />
              )}
            </div>
          ))}
          {Object.keys(platformConfig).length === 0 && (
            <p className="text-gray-500 text-sm">Loading platform status...</p>
          )}
        </div>
      </div>

      {/* Social Stats - Real Data from Facebook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Facebook Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Facebook size={20} className="text-white" />
            </div>
            {statsLoading ? (
              <Loader2 size={16} className="animate-spin text-gray-400" />
            ) : socialStats?.facebook?.configured ? (
              <CheckCircle2 size={16} className="text-green-400" />
            ) : (
              <AlertCircle size={16} className="text-red-400" />
            )}
          </div>
          {statsLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-32"></div>
            </div>
          ) : socialStats?.facebook?.stats ? (
            <>
              <p className="text-2xl font-bold text-white">{socialStats.facebook.stats.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Facebook Followers</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Heart size={12} />
                  <span>{socialStats.facebook.stats.likes.toLocaleString()} page likes</span>
                </div>
                <a 
                  href={`https://facebook.com/${socialStats.facebook.stats.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-kuwex-cyan hover:underline"
                >
                  View Page →
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-500">Not Connected</p>
              <p className="text-sm text-gray-600">{socialStats?.facebook?.error || 'Configure Facebook API'}</p>
            </>
          )}
        </motion.div>

        {/* LinkedIn Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
              <Linkedin size={20} className="text-white" />
            </div>
            {socialStats?.linkedin?.configured ? (
              <CheckCircle2 size={16} className="text-green-400" />
            ) : (
              <AlertCircle size={16} className="text-yellow-400" />
            )}
          </div>
          <p className="text-xl font-bold text-gray-500">Coming Soon</p>
          <p className="text-sm text-gray-600">LinkedIn integration pending</p>
          <div className="mt-3">
            <a 
              href="https://linkedin.com/company/kuwex-studios"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-kuwex-cyan hover:underline"
            >
              View Page →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab("calendar")} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "calendar" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}
        >
          <Calendar size={16} className="inline mr-2" />Posts ({posts?.length || 0})
        </button>
        <button 
          onClick={() => setActiveTab("analytics")} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "analytics" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}
        >
          <TrendingUp size={16} className="inline mr-2" />Analytics
        </button>
        <button 
          onClick={() => setActiveTab("ai")} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "ai" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}
        >
          <Sparkles size={16} className="inline mr-2" />AI Tools
        </button>
      </div>

      {/* Content Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Your Posts</h2>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.05 }} 
                className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-5"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {post.platforms.map((p) => {
                        const Icon = platformIcons[p];
                        if (!Icon) return null;
                        return (
                          <div key={p} className={`w-6 h-6 rounded ${platformColors[p]} flex items-center justify-center`}>
                            <Icon size={14} className="text-white" />
                          </div>
                        );
                      })}
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        post.status === "published" ? "bg-green-500/20 text-green-400" : 
                        post.status === "scheduled" ? "bg-blue-500/20 text-blue-400" : 
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 whitespace-pre-wrap">{post.content}</p>
                    {post.image_url && (
                      <div className="mb-3">
                        <img src={post.image_url} alt="Post image" className="max-h-32 rounded-lg" />
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(post.scheduled_date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.status !== "published" && (
                      <button 
                        onClick={() => handlePublishToSocial(post)}
                        disabled={posting}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-sm text-white transition-colors disabled:opacity-50"
                      >
                        <Send size={14} />
                        Publish
                      </button>
                    )}
                    <button 
                      onClick={() => openEditModal(post)}
                      className="p-2 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-[#16181C] border border-[#2F3336] rounded-2xl">
              <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 mb-4">No posts yet. Create your first post!</p>
              <button 
                onClick={() => { resetForm(); setShowCreateModal(true); }}
                className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
              >
                <Plus size={18} />
                Create Post
              </button>
            </div>
          )}
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
                  <span className="text-gray-400">Total Reactions</span>
                </div>
                <span className="text-xl font-bold text-white">--</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="text-blue-500" size={20} />
                  </div>
                  <span className="text-gray-400">Comments</span>
                </div>
                <span className="text-xl font-bold text-white">--</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Share2 className="text-green-500" size={20} />
                  </div>
                  <span className="text-gray-400">Shares</span>
                </div>
                <span className="text-xl font-bold text-white">--</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Users className="text-purple-500" size={20} />
                  </div>
                  <span className="text-gray-400">Posts Published</span>
                </div>
                <span className="text-xl font-bold text-white">{posts?.filter(p => p.status === 'published').length || 0}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">* Connect platform APIs for real-time analytics</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Published Posts</h3>
            <div className="space-y-4">
              {posts?.filter(p => p.status === 'published').slice(0, 3).map(post => (
                <div key={post.id} className="p-4 bg-[#0A0A0A] rounded-xl">
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {post.platforms.map(p => {
                      const Icon = platformIcons[p];
                      if (!Icon) return null;
                      return <Icon key={p} size={12} />;
                    })}
                    <span>• {new Date(post.scheduled_date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {(!posts || posts.filter(p => p.status === 'published').length === 0) && (
                <p className="text-gray-500 text-sm text-center py-4">No published posts yet</p>
              )}
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
            <textarea 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 h-24 resize-none mb-4" 
              placeholder="Describe your post (e.g., 'New website launch for a restaurant client')" 
            />
            <button 
              onClick={handleGenerateCaptions}
              disabled={generatingCaption}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generatingCaption ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Captions
                </>
              )}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-kuwex-cyan/10 flex items-center justify-center">
                <Calendar className="text-kuwex-cyan" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">Generated Captions</h3>
            </div>
            {generatedCaptions.length > 0 ? (
              <ul className="space-y-3">
                {generatedCaptions.map((caption, index) => (
                  <li key={index} className="p-3 bg-[#0A0A0A] rounded-xl">
                    <p className="text-sm text-gray-300 mb-2">{caption}</p>
                    <button 
                      onClick={() => useCaption(caption)}
                      className="text-xs text-kuwex-cyan hover:underline"
                    >
                      Use this caption →
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="mx-auto text-gray-600 mb-3" size={32} />
                <p className="text-gray-500 text-sm">Generated captions will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1D21] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#2F3336]">
              <h2 className="text-xl font-bold text-white">Create New Post</h2>
              <p className="text-gray-500 text-sm">Compose and publish to your social media pages</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Select Platforms</label>
                <div className="flex gap-3">
                  {Object.entries(platformIcons).map(([platform, Icon]) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                        newPost.platforms.includes(platform)
                          ? `${platformColors[platform]} border-transparent text-white`
                          : 'border-[#2F3336] text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Icon size={18} />
                      {platformNames[platform]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Post Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What would you like to share?"
                  rows={5}
                  className="w-full bg-[#2F3336] text-white px-4 py-3 rounded-xl border border-[#3F4346] focus:border-kuwex-cyan focus:outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{newPost.content.length} characters</p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Image URL (optional)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newPost.image_url}
                    onChange={(e) => setNewPost(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-[#2F3336] text-white px-4 py-3 rounded-xl border border-[#3F4346] focus:border-kuwex-cyan focus:outline-none"
                  />
                  <button className="p-3 bg-[#2F3336] rounded-xl border border-[#3F4346] text-gray-400">
                    <ImageIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Schedule (optional)</label>
                <input
                  type="datetime-local"
                  value={newPost.scheduled_date}
                  onChange={(e) => setNewPost(prev => ({ ...prev, scheduled_date: e.target.value, status: e.target.value ? 'scheduled' : 'draft' }))}
                  className="w-full bg-[#2F3336] text-white px-4 py-3 rounded-xl border border-[#3F4346] focus:border-kuwex-cyan focus:outline-none"
                />
              </div>

              {/* Post Result */}
              {postResult && (
                <div className={`p-4 rounded-xl ${postResult.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {postResult.success ? (
                      <CheckCircle2 className="text-green-400" size={18} />
                    ) : (
                      <XCircle className="text-red-400" size={18} />
                    )}
                    <span className={postResult.success ? 'text-green-400' : 'text-red-400'}>
                      {postResult.message}
                    </span>
                  </div>
                  {postResult.results && (
                    <div className="space-y-1 mt-2">
                      {postResult.results.map((r, i) => (
                        <div key={i} className="text-xs flex items-center gap-2">
                          {r.success ? (
                            <CheckCircle2 className="text-green-400" size={12} />
                          ) : (
                            <XCircle className="text-red-400" size={12} />
                          )}
                          <span className="text-gray-400">{platformNames[r.platform] || r.platform}:</span>
                          <span className={r.success ? 'text-green-400' : 'text-red-400'}>
                            {r.success ? 'Posted' : r.error}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#2F3336]">
                <button 
                  onClick={() => { setShowCreateModal(false); resetForm(); }}
                  className="flex-1 bg-[#2F3336] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#3F4346] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSavePost(false)}
                  className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Save Draft
                </button>
                <button 
                  onClick={() => handleSavePost(true)}
                  disabled={posting}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {posting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  Publish Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1D21] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#2F3336]">
              <h2 className="text-xl font-bold text-white">Edit Post</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Post Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={5}
                  className="w-full bg-[#2F3336] text-white px-4 py-3 rounded-xl border border-[#3F4346] focus:border-kuwex-cyan focus:outline-none resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, status: e.target.value as 'draft' | 'scheduled' | 'published' } : null)}
                  className="w-full bg-[#2F3336] text-white px-4 py-3 rounded-xl border border-[#3F4346] focus:border-kuwex-cyan focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#2F3336]">
                <button 
                  onClick={() => { setShowEditModal(false); setEditingPost(null); }}
                  className="flex-1 bg-[#2F3336] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#3F4346] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdatePost}
                  className="flex-1 bg-kuwex-cyan text-black px-4 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
