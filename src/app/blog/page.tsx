"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredPost = {
  title: "The Future of Digital Innovation in Africa",
  excerpt: "Exploring how African businesses are leveraging technology to compete on the global stage and drive unprecedented growth across the continent.",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
  author: "Kuda",
  date: "December 10, 2024",
  readTime: "8 min read",
  category: "Innovation"
};

const blogPosts = [
  {
    title: "10 Web Design Trends to Watch in 2025",
    excerpt: "Stay ahead of the curve with these emerging design trends that will shape the digital landscape.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    author: "Weston",
    date: "December 8, 2024",
    readTime: "5 min read",
    category: "Design"
  },
  {
    title: "Building Scalable Mobile Apps with React Native",
    excerpt: "A comprehensive guide to creating performant cross-platform mobile applications.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "December 5, 2024",
    readTime: "10 min read",
    category: "Development"
  },
  {
    title: "Digital Marketing Strategies for African Startups",
    excerpt: "Proven tactics to grow your startup's online presence and reach your target audience effectively.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    author: "Weston",
    date: "December 1, 2024",
    readTime: "7 min read",
    category: "Marketing"
  },
  {
    title: "The Importance of Brand Identity in the Digital Age",
    excerpt: "Why a strong brand identity is crucial for standing out in today's crowded digital marketplace.",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=400&fit=crop",
    author: "Weston",
    date: "November 28, 2024",
    readTime: "6 min read",
    category: "Branding"
  },
  {
    title: "Optimizing Website Performance for African Markets",
    excerpt: "Technical strategies to ensure your website loads fast even on slower connections.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    author: "Kuda",
    date: "November 25, 2024",
    readTime: "8 min read",
    category: "Development"
  },
  {
    title: "Creating Engaging Video Content for Social Media",
    excerpt: "Tips and tricks for producing video content that captures attention and drives engagement.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
    author: "Weston",
    date: "November 20, 2024",
    readTime: "5 min read",
    category: "Multimedia"
  },
];

const categories = ["All", "Innovation", "Design", "Development", "Marketing", "Branding", "Multimedia"];

export default function Blog() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Insights & Updates</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-kuwex-cyan">Blog</span>
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0 
                    ? "bg-kuwex-cyan text-black" 
                    : "bg-[#16181C] border border-[#2F3336] text-gray-400 hover:border-kuwex-cyan/50 hover:text-white"
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
            className="bg-[#16181C] border border-[#2F3336] rounded-3xl overflow-hidden hover:border-kuwex-cyan/50 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-kuwex-cyan text-black text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-kuwex-cyan text-sm font-medium mb-4">{featuredPost.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kuwex-cyan transition-colors">
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
                  href="#"
                  className="inline-flex items-center gap-2 text-kuwex-cyan hover:text-white transition-colors font-semibold w-fit"
                >
                  Read Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                className="bg-[#16181C] border border-[#2F3336] rounded-3xl overflow-hidden hover:border-kuwex-cyan/50 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-4 bg-[#0A0A0A] border-t border-[#2F3336] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto text-center relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Stay <span className="text-kuwex-cyan">Updated</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Subscribe to our newsletter for the latest insights and updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#16181C] border border-[#2F3336] rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 transition-all"
              />
              <button 
                type="submit"
                className="bg-kuwex-cyan text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all whitespace-nowrap"
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
