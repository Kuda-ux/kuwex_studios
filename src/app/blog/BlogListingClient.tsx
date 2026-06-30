"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
};

const featuredPost: PostCard = {
  slug: "ai-rewards-digitally-prepared-businesses-zimbabwe",
  title: "AI Will Reward Businesses That Are Already Digitally Prepared — Is Yours Ready?",
  excerpt: "AI is quietly changing how customers find, compare, and choose businesses in Zimbabwe. It doesn't knock on doors or run ads. It scans your digital presence and decides whether to recommend you. Here's exactly what it's looking for — and how to make sure you're in the conversation.",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
  author: "Kuda",
  date: "May 30, 2026",
  readTime: "12 min read",
  category: "AI & Future",
};

const categories = [
  "All", "AI & Digital Transformation", "Digital Strategy", "SEO",
  "Web Design", "Branding", "Cybersecurity", "Google Ads",
];

export default function BlogListingClient({ allPosts }: { allPosts: PostCard[] }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vibrant-badge mx-auto mb-8">
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Insights & Updates</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="vibrant-gradient-text">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and updates from the KuWeX team. Stay informed about the latest in digital innovation.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="x-card-vibrant rounded-3xl overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px]">
                <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.3)]">Featured</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-kuwex-cyan text-sm font-medium mb-4">{featuredPost.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kuwex-cyan transition-colors duration-300">{featuredPost.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-2"><User size={16} />{featuredPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} />{featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock size={16} />{featuredPost.readTime}</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="group/link inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 text-kuwex-cyan hover:from-kuwex-cyan hover:to-kuwex-blue hover:text-black px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] w-fit">
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
            {allPosts.map((post, i) => (
              <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                <Link href={`/blog/${post.slug}`} className="x-card-vibrant rounded-3xl overflow-hidden group block h-full">
                  <div className="relative h-48">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
              <input type="email" placeholder="Enter your email" className="flex-1 bg-[#16181C]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all duration-300" />
              <button type="submit" className="bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02]">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
