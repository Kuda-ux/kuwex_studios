"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredPost = {
  slug: "how-much-does-website-cost-zimbabwe-2026",
  title: "How Much Does a Website Cost in Zimbabwe? (2026 Complete Guide)",
  excerpt: "A detailed pricing breakdown for website design in Zimbabwe — from simple business sites to full e-commerce platforms. Learn what affects cost and how to budget for your next web project.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  author: "Kuda",
  date: "April 8, 2026",
  readTime: "12 min read",
  category: "Web Design"
};

const blogPosts = [
  {
    slug: "seo-guide-zimbabwe-small-businesses",
    title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google in 2026",
    excerpt: "A step-by-step local SEO guide for SMEs in Harare and beyond. Learn keyword research, on-page optimization, and Google Business Profile setup.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "April 2, 2026",
    readTime: "15 min read",
    category: "SEO"
  },
  {
    slug: "google-ads-zimbabwe-beginners-guide",
    title: "Google Ads Zimbabwe: The Complete Beginner's Guide for 2026",
    excerpt: "How to set up, manage, and optimize Google Ads campaigns for Zimbabwe businesses. Budgets, targeting, ad policies, and ROI tracking explained.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "March 25, 2026",
    readTime: "14 min read",
    category: "Google Ads"
  },
  {
    slug: "best-social-media-platforms-zimbabwe-businesses",
    title: "Best Social Media Platforms for Zimbabwe Businesses in 2026",
    excerpt: "Facebook, Instagram, LinkedIn, TikTok, or WhatsApp? We compare each platform's reach, demographics, and ROI for the Zimbabwe market.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    author: "Weston",
    date: "March 18, 2026",
    readTime: "10 min read",
    category: "Social Media"
  },
  {
    slug: "web-design-trends-zimbabwe-2026",
    title: "10 Web Design Trends Zimbabwe Businesses Must Adopt in 2026",
    excerpt: "From AI-powered design to dark mode UIs — the design trends shaping Zimbabwe's digital landscape this year and how to implement them.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    author: "Weston",
    date: "March 10, 2026",
    readTime: "8 min read",
    category: "Web Design"
  },
  {
    slug: "google-ads-vs-seo-zimbabwe",
    title: "Google Ads vs SEO: Which is Better for Zimbabwe SMEs?",
    excerpt: "A data-driven comparison of paid search vs organic SEO for Zimbabwean businesses. When to use each, expected costs, timelines, and real ROI.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "March 3, 2026",
    readTime: "11 min read",
    category: "SEO"
  },
  {
    slug: "branding-mistakes-zimbabwe-businesses",
    title: "7 Branding Mistakes Zimbabwe Businesses Make (And How to Fix Them)",
    excerpt: "Common branding pitfalls that cost Zimbabwean businesses customers and credibility. Expert advice on logo design, brand consistency, and positioning.",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=400&fit=crop",
    author: "Weston",
    date: "February 24, 2026",
    readTime: "9 min read",
    category: "Branding"
  },
];

const categories = ["All", "Web Design", "SEO", "Google Ads", "Social Media", "Branding"];

export default function Blog() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vibrant-badge mx-auto mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Insights & Updates</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Our <span className="vibrant-gradient-text">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Insights, tutorials, and updates from the KuWeX team. Stay informed about the latest in digital innovation.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, i) => (
              <button
                key={i}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === 0 
                    ? "bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]" 
                    : "bg-[#16181C]/80 backdrop-blur-sm border border-[#2F3336]/60 text-gray-400 hover:border-kuwex-cyan/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="x-card-vibrant rounded-3xl overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-kuwex-cyan text-sm font-medium mb-4">{featuredPost.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kuwex-cyan transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="group/link inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 text-kuwex-cyan hover:from-kuwex-cyan hover:to-kuwex-blue hover:text-black px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] w-fit"
                >
                  Read Article <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="x-card-vibrant rounded-3xl overflow-hidden group block h-full">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-4 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-kuwex-cyan/30 to-transparent" />
        
        <div className="container mx-auto text-center relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="vibrant-badge mx-auto mb-8">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Newsletter</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              Stay <span className="vibrant-gradient-text">Updated</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Subscribe to our newsletter for the latest insights and updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#16181C]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all duration-300"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
