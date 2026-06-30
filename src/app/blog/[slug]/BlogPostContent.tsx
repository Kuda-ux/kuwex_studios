"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Share2, Linkedin, Facebook, Twitter, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPostsMeta } from "@/lib/blog-meta";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
  relatedSlugs: string[];
}

// Parse inline markdown within a single line of text:
//   **bold**   ->  <strong>
//   *italic*   ->  <em>
//   [text](url) -> <a>
//   `code`     -> <code>
function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*\n]+?\*\*)|(\[[^\]]+\]\([^)]+\))|(`[^`\n]+?`)|(\*[^*\n\s][^*\n]*?\*)/g;
  let lastIdx = 0;
  let key = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const token = match[0];
    if (match.index > lastIdx) nodes.push(text.slice(lastIdx, match.index));
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`b${key++}`} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("[")) {
      const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (m) {
        const external = m[2].startsWith("http");
        nodes.push(
          <a
            key={`l${key++}`}
            href={m[2]}
            className="text-kuwex-cyan hover:underline font-medium"
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {m[1]}
          </a>
        );
      }
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={`c${key++}`} className="bg-[#16181C] px-1.5 py-0.5 rounded text-kuwex-cyan text-[0.9em] font-mono">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`i${key++}`} className="italic text-gray-300">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = match.index + token.length;
  }
  if (lastIdx < text.length) nodes.push(text.slice(lastIdx));
  return nodes.length ? nodes : [text];
}

function renderContent(content: string[]) {
  return content.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-white">
          {parseInline(block.substring(3))}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-white">
          {parseInline(block.substring(4))}
        </h3>
      );
    }
    if (block.startsWith("- ")) {
      return (
        <li key={i} className="mb-2 text-gray-300 leading-relaxed">
          {parseInline(block.substring(2))}
        </li>
      );
    }
    return (
      <p key={i} className="mb-4 text-gray-300 leading-relaxed">
        {parseInline(block)}
      </p>
    );
  });
}

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: Props) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.04),transparent_50%)]" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-kuwex-cyan transition-colors mb-8 text-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 text-kuwex-cyan text-xs font-bold px-3 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2"><User size={16} className="text-kuwex-cyan" /> <span><strong className="text-white">{post.author}</strong> · {post.authorRole}</span></span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative aspect-[2/1] rounded-2xl overflow-hidden">
            <Image src={blogPostsMeta[post.slug]?.image ?? post.image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose-custom">
            {renderContent(post.content)}
          </motion.div>

          {/* Share */}
          <div className="border-t border-[#2F3336]/40 mt-16 pt-8">
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2"><Share2 size={16} /> Share this article</p>
            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — https://kuwexstudios.co.zw/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="w-10 h-10 bg-[#16181C] border border-[#2F3336]/60 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/40 transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://kuwexstudios.co.zw/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="w-10 h-10 bg-[#16181C] border border-[#2F3336]/60 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-kuwex-cyan/30 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=https://kuwexstudios.co.zw/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="w-10 h-10 bg-[#16181C] border border-[#2F3336]/60 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-kuwex-cyan/30 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://kuwexstudios.co.zw/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="w-10 h-10 bg-[#16181C] border border-[#2F3336]/60 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-kuwex-cyan/30 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>

            {/* WhatsApp Channel CTA */}
            <a href="https://whatsapp.com/channel/0029VbCdvLa7DAX7JE0qWH2X" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-between gap-4 p-4 sm:p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl hover:border-green-400/40 transition-all group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={22} className="text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-white">Follow Us on WhatsApp</p>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">Get every new article + Zimbabwe tech news first</p>
                </div>
              </div>
              <span className="text-green-400 font-semibold text-sm group-hover:translate-x-1 transition-transform flex-shrink-0 hidden sm:inline-flex items-center gap-1">
                Join <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-4 bg-[#0A0A0A] border-t border-[#2F3336]/40">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <Link key={i} href={`/blog/${rp.slug}`} className="x-card-vibrant rounded-2xl overflow-hidden group block">
                  <div className="relative h-40">
                    <Image src={blogPostsMeta[rp.slug]?.image ?? rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 backdrop-blur-xl text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white group-hover:text-kuwex-cyan transition-colors line-clamp-2 mb-2">{rp.title}</h3>
                    <span className="text-xs text-gray-500">{rp.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.04),transparent_50%)]" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help With Your <span className="vibrant-gradient-text">Digital Strategy?</span></h2>
          <p className="text-gray-400 mb-8">KuWeX Studios helps Zimbabwe businesses grow online with expert web design, SEO, and digital marketing.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="px-8 py-4 border border-[#2F3336] rounded-full text-white hover:border-kuwex-cyan/50 transition-all duration-300">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
