"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenSquare, Plus, Trash2, Edit3, Eye, Globe, FileText,
  X, Save, RefreshCw, Image as ImageIcon, BookOpen,
  CheckCircle, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const CATEGORIES = [
  "AI & Tech","AI & Policy","Fintech & AI","Digital Marketing",
  "Web Design","SEO","Business","Zimbabwe Tech","AI & Digital Transformation",
];
const AUTHORS = [
  { name: "Kuda", role: "Lead Developer, KuWeX Studios" },
  { name: "Weston", role: "Digital Strategist, KuWeX Studios" },
];

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,80);
}

interface FormState {
  id?: string; slug: string; title: string; excerpt: string;
  image: string; og_image: string; author: string; author_role: string;
  post_date: string; category: string; contentText: string;
  keywords: string; related_slugs: string; status: "draft"|"published";
}
const EMPTY: FormState = {
  slug:"",title:"",excerpt:"",image:"",og_image:"",
  author:"Kuda",author_role:"Lead Developer, KuWeX Studios",
  post_date:new Date().toISOString().slice(0,10),
  category:"AI & Tech",contentText:"",keywords:"",related_slugs:"",status:"draft",
};

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{msg:string;type:"success"|"error"}|null>(null);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [slugManual, setSlugManual] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  async function fetchPosts() {
    setLoading(true);
    try { const r=await fetch("/api/blog"); const d=await r.json(); setPosts(d.posts||[]); }
    catch { showToast("Failed to load posts.","error"); }
    finally { setLoading(false); }
  }
  useEffect(()=>{fetchPosts();},[]);

  function showToast(msg:string,type:"success"|"error"){
    setToast({msg,type}); setTimeout(()=>setToast(null),3500);
  }

  function openCreate(){ setForm(EMPTY); setSlugManual(false); setDrawerOpen(true); setTimeout(()=>titleRef.current?.focus(),100); }

  function openEdit(p:BlogPost){
    setForm({id:p.id,slug:p.slug,title:p.title,excerpt:p.excerpt,image:p.image,
      og_image:p.og_image||p.image,author:p.author,author_role:p.author_role,
      post_date:p.post_date,category:p.category,contentText:p.content.join("\n\n"),
      keywords:p.keywords.join(", "),related_slugs:p.related_slugs.join(", "),status:p.status});
    setSlugManual(true); setDrawerOpen(true);
  }

  async function handleSave(){
    if(!form.title||!form.slug||!form.contentText){showToast("Title, slug and content required.","error");return;}
    setSaving(true);
    const content=form.contentText.split(/\n\n+/).map(p=>p.trim()).filter(Boolean);
    const payload={...form,content,og_image:form.og_image||form.image,
      keywords:form.keywords.split(",").map(k=>k.trim()).filter(Boolean),
      related_slugs:form.related_slugs.split(",").map(s=>s.trim()).filter(Boolean)};
    try{
      const res=form.id
        ? await fetch(`/api/blog/${form.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})
        : await fetch("/api/blog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if(!res.ok){const d=await res.json();showToast(d.error||"Save failed.","error");}
      else{showToast(form.id?"Post updated!":"Post created!","success");setDrawerOpen(false);fetchPosts();}
    }catch{showToast("Network error.","error");}
    finally{setSaving(false);}
  }

  async function handleDelete(id:string){
    try{
      const r=await fetch(`/api/blog/${id}`,{method:"DELETE"});
      if(r.ok){showToast("Post deleted.","success");fetchPosts();}
      else showToast("Delete failed.","error");
    }catch{showToast("Network error.","error");}
    finally{setDeleteId(null);}
  }

  const published=posts.filter(p=>p.status==="published").length;
  const drafts=posts.filter(p=>p.status==="draft").length;

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>{toast&&(
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
          className={`fixed top-5 right-5 z-[200] flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium ${toast.type==="success"?"bg-emerald-500/10 border border-emerald-500/30 text-emerald-400":"bg-red-500/10 border border-red-500/30 text-red-400"}`}>
          {toast.type==="success"?<CheckCircle size={16}/>:<AlertCircle size={16}/>}{toast.msg}
        </motion.div>
      )}</AnimatePresence>

      {/* Delete modal */}
      <AnimatePresence>{deleteId&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-[150] bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-white mb-2">Delete Post?</h3>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-[#2F3336] text-gray-400 text-sm hover:bg-white/[0.03]">Cancel</button>
              <button onClick={()=>handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><PenSquare size={22} className="text-kuwex-cyan"/>Blog Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage blog posts published to the public site.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchPosts} className="p-2 text-gray-400 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all"><RefreshCw size={18}/></button>
          <button onClick={openCreate} className="flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-all"><Plus size={16}/>New Post</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[{label:"Total Posts",value:posts.length,icon:BookOpen,color:"text-blue-400"},
          {label:"Published",value:published,icon:Globe,color:"text-emerald-400"},
          {label:"Drafts",value:drafts,icon:FileText,color:"text-yellow-400"}].map(s=>(
          <div key={s.label} className="bg-[#111111]/80 border border-[#2F3336]/60 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{s.label}</span>
              <s.icon size={18} className={s.color}/>
            </div>
            <p className="text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Posts list */}
      <div className="bg-[#111111]/80 border border-[#2F3336]/60 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2F3336]/60">
          <h2 className="font-semibold text-white">All Posts</h2>
        </div>
        {loading?(
          <div className="p-12 text-center text-gray-500">Loading posts...</div>
        ):posts.length===0?(
          <div className="p-12 text-center">
            <PenSquare size={36} className="text-gray-700 mx-auto mb-3"/>
            <p className="text-gray-400 font-medium">No posts yet</p>
            <p className="text-sm text-gray-600 mt-1">Click &quot;New Post&quot; to create your first blog post.</p>
          </div>
        ):(
          <div className="divide-y divide-[#2F3336]/40">
            {posts.map(p=>(
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                {p.image&&(
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover"/>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{p.category}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{p.author}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{p.post_date}</span>
                  </div>
                </div>
                <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${p.status==="published"?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":"bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>
                  {p.status}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Link href={`/blog/${p.slug}`} target="_blank" className="p-1.5 text-gray-500 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"><Eye size={15}/></Link>
                  <button onClick={()=>openEdit(p)} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"><Edit3 size={15}/></button>
                  <button onClick={()=>setDeleteId(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/[0.05] rounded-lg transition-all"><Trash2 size={15}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Drawer */}
      <AnimatePresence>{drawerOpen&&(
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[100] bg-black/60" onClick={()=>setDrawerOpen(false)}/>
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
            transition={{type:"spring",damping:28,stiffness:280}}
            className="fixed right-0 top-0 h-full z-[110] w-full max-w-2xl bg-[#111111] border-l border-[#2F3336]/60 flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]/60 flex-shrink-0">
              <h2 className="font-semibold text-white">{form.id?"Edit Post":"New Blog Post"}</h2>
              <div className="flex items-center gap-2">
                <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as "draft"|"published"}))}
                  className="bg-[#1a1a1a] border border-[#2F3336] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-kuwex-cyan/40">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-semibold px-4 py-1.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50 transition-all">
                  <Save size={14}/>{saving?"Saving...":"Save Post"}
                </button>
                <button onClick={()=>setDrawerOpen(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"><X size={18}/></button>
              </div>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Post Title *</label>
                <input ref={titleRef} type="text" value={form.title}
                  onChange={e=>{ setForm(f=>({...f,title:e.target.value,slug:slugManual?f.slug:generateSlug(e.target.value)})); }}
                  placeholder="Zimbabwe Just Got Its Own AI Cloud Factory..."
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40 focus:ring-1 focus:ring-kuwex-cyan/10"/>
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">URL Slug *</label>
                <input type="text" value={form.slug}
                  onChange={e=>{setSlugManual(true);setForm(f=>({...f,slug:e.target.value}));}}
                  placeholder="auto-generated-from-title"
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white/70 font-mono placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40"/>
                <p className="text-xs text-gray-600 mt-1">URL: kuwexstudios.co.zw/blog/<span className="text-gray-500">{form.slug||"your-slug-here"}</span></p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Excerpt (1–2 sentences shown on blog list)</label>
                <textarea value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))}
                  rows={2} placeholder="Short summary shown on the blog listing page..."
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40 resize-none"/>
              </div>

              {/* Author + Category row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Author</label>
                  <select value={form.author} onChange={e=>{ const a=AUTHORS.find(x=>x.name===e.target.value); setForm(f=>({...f,author:e.target.value,author_role:a?.role||f.author_role})); }}
                    className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-kuwex-cyan/40">
                    {AUTHORS.map(a=><option key={a.name} value={a.name}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                  <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                    className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-kuwex-cyan/40">
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Publish Date</label>
                <input type="date" value={form.post_date} onChange={e=>setForm(f=>({...f,post_date:e.target.value}))}
                  className="bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-kuwex-cyan/40"/>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Featured Image URL</label>
                <input type="url" value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))}
                  placeholder="https://images.unsplash.com/photo-... or /blog/image.jpg"
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40"/>
                {form.image&&(
                  <div className="mt-2 h-28 rounded-xl overflow-hidden bg-[#1a1a1a]">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover"/>
                  </div>
                )}
              </div>

              {/* OG Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Social Share Image URL <span className="text-gray-600">(OG image — use JPEG for WhatsApp; defaults to above)</span></label>
                <input type="url" value={form.og_image} onChange={e=>setForm(f=>({...f,og_image:e.target.value}))}
                  placeholder="Leave blank to use the featured image"
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40"/>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Content * <span className="text-gray-600 font-normal">— Separate paragraphs with a blank line. Start a line with ## for heading, ### for subheading.</span>
                </label>
                <textarea value={form.contentText} onChange={e=>setForm(f=>({...f,contentText:e.target.value}))}
                  rows={18} placeholder={"Write your opening paragraph here...\n\n## First Section Heading\nYour content under this heading...\n\n## Second Section\nMore content here..."}
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40 font-mono leading-relaxed resize-y"/>
                <p className="text-xs text-gray-600 mt-1">{form.contentText.split(/\s+/).filter(Boolean).length} words · ~{Math.max(1,Math.round(form.contentText.split(/\s+/).filter(Boolean).length/200))} min read</p>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">SEO Keywords <span className="text-gray-600">(comma-separated)</span></label>
                <input type="text" value={form.keywords} onChange={e=>setForm(f=>({...f,keywords:e.target.value}))}
                  placeholder="AI Zimbabwe, ChatGPT Africa, digital marketing Harare..."
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40"/>
              </div>

              {/* Related posts */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Related Post Slugs <span className="text-gray-600">(comma-separated, optional)</span></label>
                <input type="text" value={form.related_slugs} onChange={e=>setForm(f=>({...f,related_slugs:e.target.value}))}
                  placeholder="econet-ai-launch-zimbabwe, zimbabwe-ai-economy-business..."
                  className="w-full bg-[#0d0d0d] border border-[#2F3336] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/40"/>
              </div>
            </div>
          </motion.div>
        </>
      )}</AnimatePresence>
    </div>
  );
}
