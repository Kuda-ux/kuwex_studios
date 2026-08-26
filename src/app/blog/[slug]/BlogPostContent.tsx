"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Share2, Linkedin, Facebook, Twitter, ArrowRight, MessageCircle, Send, CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

      {/* Contextual CTA with Lead Form */}
      <BlogCTA post={post} />

      <Footer />
    </main>
  );
}

const categoryCTAs: Record<string, { title: string; desc: string; service: string }> = {
  'SEO': {
    title: 'Rank #1 on Google',
    desc: 'Get a free SEO audit for your Zimbabwe business. See exactly what\u2019s holding your website back from ranking higher.',
    service: 'seo-services',
  },
  'Web Design': {
    title: 'Need a New Website?',
    desc: 'Get a free quote for a custom, fast, SEO-ready website built for Zimbabwe\u2019s mobile-first audience.',
    service: 'web-dev',
  },
  'Google Ads': {
    title: 'Get More Customers with Google Ads',
    desc: 'Stop wasting ad spend. Get a free Google Ads consultation and let us build campaigns that convert.',
    service: 'google-ads',
  },
  'Branding': {
    title: 'Build a Brand That Lasts',
    desc: 'From logo to full brand identity \u2014 get a free consultation on how to make your business unforgettable.',
    service: 'branding',
  },
  'Digital Strategy': {
    title: 'Grow Your Business Online',
    desc: 'Get a free 30-minute digital strategy consultation. We\u2019ll identify your biggest opportunities for online growth.',
    service: 'marketing',
  },
  'Social Media': {
    title: 'Dominate Social Media',
    desc: 'Get a free social media audit and content strategy session for your Zimbabwe business.',
    service: 'social-media-marketing',
  },
};

function BlogCTA({ post }: { post: BlogPost }) {
  const cta = categoryCTAs[post.category] || {
    title: 'Grow Your Business Online',
    desc: 'Get a free consultation with KuWeX Studios. We help Zimbabwe businesses succeed online with web design, SEO, and digital marketing.',
    service: 'marketing',
  };

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: '',
          email: formData.email,
          company: '',
          service: cta.service,
          message: `Lead from blog post: "${post.title}" \u2014 interested in ${cta.title}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit.');
      }

      setStatus('success');
      setFormData({ name: '', email: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.04),transparent_50%)]" />
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="x-card-vibrant rounded-3xl p-8 md:p-10"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                We&apos;ll contact you within 24 hours. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-kuwex-cyan" />
                <span className="text-xs font-bold text-kuwex-cyan uppercase tracking-wider">Free Consultation</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                {cta.title.split(' ').slice(0, -1).join(' ')} <span className="vibrant-gradient-text">{cta.title.split(' ').slice(-1)}</span>
              </h2>
              <p className="text-gray-400 mb-6">{cta.desc}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2.5">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-xs">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <>Get Free Consultation <Send size={16} /></>
                    )}
                  </button>
                  <Link
                    href="/services"
                    className="px-6 py-3.5 border border-[#2F3336] rounded-xl text-white hover:border-kuwex-cyan/50 transition-all duration-300 text-sm font-medium text-center flex items-center justify-center gap-2"
                  >
                    View Services <ArrowRight size={14} />
                  </Link>
                </div>

                <p className="text-center text-gray-600 text-xs">
                  Free consultation · No obligations · Response within 24 hours
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
