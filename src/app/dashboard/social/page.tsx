"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Copy, Check, ExternalLink, Facebook, Linkedin, Twitter, Search, Calendar, ArrowUpRight } from "lucide-react";
import { blogPostsMeta } from "@/lib/blog-meta";

const SITE = "https://kuwexstudios.co.zw";
const CHANNEL = "https://whatsapp.com/channel/0029VbCdvLa7DAX7JE0qWH2X";

type Platform = "whatsapp" | "facebook" | "linkedin" | "twitter";

const posts = Object.entries(blogPostsMeta)
  .map(([slug, m]) => ({ slug, ...m, title: m.title.replace(/\s*\|\s*KuWeX Studios.*$/, "") }))
  .sort((a, b) => b.date.localeCompare(a.date));

type Post = (typeof posts)[number];

function hashtags(keys: string[], max = 5) {
  return keys.slice(0, max).map(k => "#" + k.replace(/[^a-zA-Z0-9 ]/g, "").split(/\s+/).map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join("")).join(" ");
}

function buildMessage(p: Post, platform: Platform): string {
  const url = `${SITE}/blog/${p.slug}`;
  const tags = hashtags(p.keywords);
  if (platform === "whatsapp") return `*${p.title}*\n\n${p.shareSummary}\n\nRead the full article →\n${url}\n\nFollow our WhatsApp Channel:\n${CHANNEL}\n\n${tags}`;
  if (platform === "facebook") return `${p.title}\n\n${p.shareSummary}\n\nRead more 👇\n${url}\n\n${tags}`;
  if (platform === "linkedin") return `${p.title}\n\n${p.shareSummary}\n\nKey takeaway: ${p.description}\n\nFull article: ${url}\n\n${tags}`;
  return `${p.shareSummary.slice(0, 180)}\n\n${url}\n${hashtags(p.keywords, 2)}`;
}

function buildShareUrl(p: Post, platform: Platform, text: string): string {
  const url = `${SITE}/blog/${p.slug}`;
  const enc = encodeURIComponent(text);
  if (platform === "whatsapp") return `https://wa.me/?text=${enc}`;
  if (platform === "facebook") return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${enc}`;
  if (platform === "linkedin") return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  return `https://twitter.com/intent/tweet?text=${enc}`;
}

const PLATFORMS: { id: Platform; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "text-green-400 border-green-400/40 bg-green-500/10" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-400 border-blue-400/40 bg-blue-500/10" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-sky-400 border-sky-400/40 bg-sky-500/10" },
  { id: "twitter", label: "X / Twitter", icon: Twitter, color: "text-white border-white/30 bg-white/5" },
];

export default function SocialSharePage() {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string>(posts[0]?.slug ?? "");
  const [platform, setPlatform] = useState<Platform>("whatsapp");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.shareSummary.toLowerCase().includes(q) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    );
  }, [query]);

  const selected = posts.find(p => p.slug === selectedSlug) || posts[0];
  const message = selected ? buildMessage(selected, platform) : "";
  const shareUrl = selected ? buildShareUrl(selected, platform, message) : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 flex items-center justify-center">
            <MessageCircle className="text-green-400" size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Blog Share Hub</h1>
            <p className="text-sm text-gray-500">Auto-generated WhatsApp, Facebook, LinkedIn & X posts for every article.</p>
          </div>
        </div>
        <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-400/40 px-4 py-2 rounded-xl transition-all">
          <MessageCircle size={16} className="text-green-400" />
          <span className="text-sm text-white font-semibold">Open KuWeX WhatsApp Channel</span>
          <ExternalLink size={13} className="text-green-400" />
        </a>
      </div>

      <div className="grid lg:grid-cols-[360px,1fr] gap-5">
        <aside className="space-y-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search posts..." className="w-full bg-[#111111] border border-[#2F3336]/60 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30" />
          </div>
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filtered.map(p => (
              <button key={p.slug} onClick={() => setSelectedSlug(p.slug)} className={`w-full text-left flex gap-3 p-3 rounded-xl border transition-all ${p.slug === selectedSlug ? "bg-kuwex-cyan/10 border-kuwex-cyan/40" : "bg-[#111111] border-[#2F3336]/60 hover:border-[#3F4347]"}`}>
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#0A0A0A]">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white line-clamp-2 leading-tight">{p.title}</p>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
                    <Calendar size={10} /> {p.date}
                    {p.category && <><span className="text-gray-700">·</span><span>{p.category}</span></>}
                  </p>
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-gray-500 text-center py-8">No posts match.</p>}
          </div>
        </aside>

        <section className="bg-[#111111] border border-[#2F3336]/60 rounded-2xl p-5 sm:p-6">
          {selected && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start mb-5">
                <div className="relative w-full sm:w-32 aspect-[16/9] sm:h-20 sm:aspect-auto rounded-xl overflow-hidden flex-shrink-0 bg-[#0A0A0A]">
                  <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="128px" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-bold text-white leading-tight mb-1.5">{selected.title}</h2>
                  <p className="text-xs text-gray-500 mb-2">By {selected.author} · {selected.date} · Updated {selected.dateModified}</p>
                  <Link href={`${SITE}/blog/${selected.slug}`} target="_blank" className="text-xs text-kuwex-cyan hover:underline inline-flex items-center gap-1">
                    View live article <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {PLATFORMS.map(p => {
                  const Icon = p.icon;
                  const active = platform === p.id;
                  return (
                    <button key={p.id} onClick={() => setPlatform(p.id)} className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${active ? p.color : "border-[#2F3336]/60 bg-[#0A0A0A] text-gray-400 hover:text-white hover:border-[#3F4347]"}`}>
                      <Icon size={15} /> {p.label}
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#0A0A0A] border border-[#2F3336]/60 rounded-xl p-4 mb-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Ready-to-send message</p>
                <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{message}</pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleCopy} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#2F3336]/60 bg-[#0A0A0A] hover:border-kuwex-cyan/40 text-white font-semibold transition-all">
                  {copied ? <><Check size={16} className="text-green-400" /> Copied!</> : <><Copy size={16} /> Copy Message</>}
                </button>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] transition-all">
                  Open in {PLATFORMS.find(p => p.id === platform)?.label} <ExternalLink size={15} />
                </a>
              </div>

              {platform === "whatsapp" && (
                <div className="mt-5 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <p className="text-xs uppercase tracking-wider text-green-400 font-bold mb-2">📲 How to post to your WhatsApp Channel</p>
                  <ol className="text-sm text-gray-300 space-y-1.5 list-decimal list-inside">
                    <li>Tap <strong className="text-white">Copy Message</strong> above.</li>
                    <li>Open WhatsApp on your phone → go to the <strong className="text-white">KuWeX Studios</strong> Channel (admin view).</li>
                    <li>Paste the message and hit Send. The link will auto-preview with the article image and title.</li>
                  </ol>
                  <p className="text-xs text-gray-500 mt-3">
                    <em>Why no full automation?</em> WhatsApp Channels don&apos;t have a public posting API yet — only admins can publish from the WhatsApp app. This helper gets you 90% of the way there in one tap.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
