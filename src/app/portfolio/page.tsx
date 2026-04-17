"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Zap,
  Clock,
  ChevronRight,
  Star,
  TrendingUp,
  Target,
  CheckCircle2,
  Quote,
  Smartphone,
  Monitor,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    name: "Kwedu Experience",
    industry: "Tourism / Hospitality",
    url: "https://kwedu-experience.vercel.app/",
    description: "A modern tourism website designed to showcase village experiences, culture, and attract both local and international visitors.",
    impact: ["Improved digital presence", "Strong storytelling for tourism brand", "Mobile-optimized for travellers"],
    color: "#00E5FF",
    icon: "🏕️",
    screenshot: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
  },
  {
    name: "Metro Antelope Lodge",
    industry: "Hospitality",
    url: "https://www.metroantelopelodge.co.zw/",
    description: "A professional lodge website designed to attract bookings and present accommodation services clearly.",
    impact: ["Increased trust and brand visibility", "Clean booking-focused layout", "Higher conversion on enquiries"],
    color: "#0085FF",
    icon: "🏨",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
  },
  {
    name: "Fountain Blue Pool Repairs",
    industry: "Services / Construction",
    url: "https://www.fountainpoolrepairs.co.zw/",
    description: "A service-based website showcasing pool repair solutions with strong visuals and client trust positioning.",
    impact: ["Better service presentation", "Increased customer enquiries", "Professional brand positioning"],
    color: "#00D4AA",
    icon: "🏊",
    screenshot: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=800&h=500&fit=crop",
  },
  {
    name: "Matopo Africa Construction",
    industry: "Construction",
    url: "https://www.matopoafricaconstruction.co.zw/",
    description: "A corporate construction website highlighting projects, services, and professionalism.",
    impact: ["Strong brand positioning", "Corporate credibility established", "Lead generation structure"],
    color: "#FF6B35",
    icon: "🏗️",
    screenshot: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  },
  {
    name: "Kupona Integrated Engineering",
    industry: "Engineering / Energy",
    url: "https://www.kupuonazim.co.zw/",
    description: "A technical services website covering solar, generators, and engineering solutions across Zimbabwe.",
    impact: ["Multi-service clarity achieved", "Lead generation structure built", "Technical authority established"],
    color: "#FFD700",
    icon: "⚡",
    screenshot: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
  },
  {
    name: "Sui Generis IT Solutions",
    industry: "Technology / E-commerce",
    url: "https://suigeneriszim.co.zw/",
    description: "A tech-focused website supporting product sales and financing systems for laptops and electronics.",
    impact: ["Online product visibility", "Customer acquisition system", "E-commerce ready platform"],
    color: "#A855F7",
    icon: "💻",
    screenshot: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=500&fit=crop",
  },
];

const caseStudies = [
  {
    project: "Metro Antelope Lodge",
    problem: "Metro Antelope Lodge had zero online presence. Potential guests couldn't find them, had no way to view rooms, and relied on word-of-mouth. They were losing bookings to competitors with modern websites.",
    solution: "KuWeX Studios designed a premium hospitality website with stunning room galleries, a clear booking flow, Google Maps integration, and SEO-optimized pages targeting 'lodge accommodation Harare' keywords.",
    results: ["Professional online presence in under 2 weeks", "Direct enquiry system reducing reliance on 3rd parties", "Google-indexed within days of launch", "Mobile-first design capturing travellers on the go"],
  },
  {
    project: "Kupona Integrated Engineering",
    problem: "Kupona offered solar installations, generator services, and electrical engineering — but had no way to present these clearly online. Clients didn't understand their full range, leading to missed revenue.",
    solution: "We built a structured multi-service website with dedicated pages for each service line, clear CTAs, project showcases, and a WhatsApp-integrated lead capture system for Zimbabwe's mobile-first market.",
    results: ["All services clearly presented with dedicated pages", "WhatsApp enquiry integration driving direct leads", "Search visibility for 'solar installation Zimbabwe'", "Professional positioning against larger competitors"],
  },
];

const testimonials = [
  { name: "Takudzwa M.", role: "Owner, Metro Antelope Lodge", text: "KuWeX Studios delivered beyond our expectations. The website looks world-class and we started receiving enquiries within the first week. Professional, fast, and they truly understood our vision.", rating: 5 },
  { name: "Farai C.", role: "Director, Matopo Africa Construction", text: "We needed a website that screamed professionalism and credibility. KuWeX nailed it. Our clients now see us differently — as the premium construction company we are. The ROI has been incredible.", rating: 5 },
  { name: "Tinashe R.", role: "Founder, Sui Generis IT", text: "Fast, reliable, and the end product was amazing. KuWeX Studios understands what Zimbabwe businesses need — not just a pretty website, but a system that actually brings in customers.", rating: 5 },
  { name: "Grace N.", role: "Manager, Fountain Blue Pool Repairs", text: "Before KuWeX, we relied purely on referrals. Now customers find us on Google, see our work, and call us directly. The website paid for itself within the first month. These guys are the real deal.", rating: 5 },
];

const statItems = [
  { value: "6+", label: "Live Projects", icon: Globe },
  { value: "5+", label: "Industries Served", icon: Target },
  { value: "2–5", label: "Day Delivery", icon: Clock },
  { value: "100%", label: "Client Satisfaction", icon: Star },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 overflow-hidden hover:border-kuwex-cyan/30 transition-all duration-500"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image src={project.screenshot} alt={`${project.name} — Website by KuWeX Studios`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-2xl">{project.icon}</span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border" style={{ backgroundColor: `${project.color}15`, borderColor: `${project.color}30`, color: project.color }}>{project.industry}</span>
        </div>
        <motion.a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-kuwex-cyan hover:text-black hover:border-kuwex-cyan transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ExternalLink size={16} />
        </motion.a>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="space-y-2.5 mb-6">
          {project.impact.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
              <span className="text-gray-300 text-sm">{point}</span>
            </div>
          ))}
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn" style={{ color: project.color }}>
          View Live Site <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </a>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-[2px]" style={{ backgroundColor: project.color }} initial={{ width: "0%" }} animate={{ width: hovered ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
    </motion.div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-kuwex-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kuwex-blue/5 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-full px-5 py-2 mb-8">
              <Sparkles size={14} className="text-kuwex-cyan" />
              <span className="text-kuwex-cyan text-sm font-medium">Our Work &amp; Impact</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Real Work.{" "}
              <span className="bg-gradient-to-r from-kuwex-cyan via-kuwex-blue to-kuwex-cyan bg-clip-text text-transparent">Real Results.</span>
              <br />Real Impact.
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore how KuWeX Studios transforms businesses into powerful digital brands that generate real results across Zimbabwe and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#projects" className="group inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300">
                View Our Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="group inline-flex items-center gap-2 border border-[#2F3336] hover:border-kuwex-cyan/50 bg-white/[0.03] text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-white/[0.06] transition-all duration-300">
                Start Your Project <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="relative py-6 border-y border-[#2F3336]/50 bg-[#080808]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {statItems.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-center gap-3 md:border-r last:border-r-0 border-[#2F3336]/50">
                <div className="p-2 rounded-lg bg-kuwex-cyan/10"><s.icon size={18} className="text-kuwex-cyan" /></div>
                <div>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section id="projects" className="py-20 sm:py-28 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.02),transparent_70%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Projects That <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Speak for Themselves</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Every project is a partnership. Every website is a growth engine. Here&apos;s what we&apos;ve built for Zimbabwe businesses.</p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (<ProjectCard key={p.name} project={p} />))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== VISUAL SHOWCASE ===== */}
      <section className="py-20 sm:py-24 px-4 bg-gradient-to-b from-[#080808] to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">Design Excellence</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                Built for <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Every Screen</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">Every website we build is fully responsive — pixel-perfect on desktop, tablet, and mobile.</p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <motion.div variants={fadeUp} className="relative">
              <div className="relative mx-auto max-w-4xl">
                <div className="bg-[#1A1A1A] rounded-xl border border-[#2F3336]/60 overflow-hidden shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#2F3336]/60">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-[#0A0A0A] rounded-md px-4 py-1.5 text-xs text-gray-500 flex items-center gap-2">
                        <Globe size={12} /> metroantelopelodge.co.zw
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] sm:h-[400px] md:h-[450px]">
                    <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=700&fit=crop" alt="Metro Antelope Lodge — Desktop View" fill className="object-cover" />
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="absolute -bottom-8 -right-4 sm:right-8 w-[140px] sm:w-[180px]">
                  <div className="bg-[#1A1A1A] rounded-[20px] border-2 border-[#2F3336] overflow-hidden shadow-2xl shadow-black/80">
                    <div className="h-6 bg-[#111] flex items-center justify-center"><div className="w-16 h-2.5 bg-[#0A0A0A] rounded-full" /></div>
                    <div className="relative h-[240px] sm:h-[300px]">
                      <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop" alt="Metro Antelope Lodge — Mobile View" fill className="object-cover" />
                    </div>
                    <div className="h-4 bg-[#111]" />
                  </div>
                </motion.div>
              </div>
              <div className="flex items-center justify-center gap-8 mt-16">
                <div className="flex items-center gap-2 text-gray-500 text-sm"><Monitor size={16} className="text-kuwex-cyan" /> Desktop Optimized</div>
                <div className="flex items-center gap-2 text-gray-500 text-sm"><Smartphone size={16} className="text-kuwex-cyan" /> Mobile First</div>
                <div className="flex items-center gap-2 text-gray-500 text-sm"><Zap size={16} className="text-kuwex-cyan" /> Fast Loading</div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-20 sm:py-28 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">Case Studies</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                The <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Full Story</span> Behind the Work
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Real problems. Strategic solutions. Measurable results.</p>
            </motion.div>
          </AnimatedSection>
          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <AnimatedSection key={i}>
                <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 overflow-hidden">
                  <div className="px-6 sm:px-8 py-5 border-b border-[#2F3336]/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kuwex-cyan/20 to-kuwex-blue/20 flex items-center justify-center">
                      <TrendingUp size={18} className="text-kuwex-cyan" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{study.project}</h3>
                      <span className="text-gray-500 text-xs">Case Study</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2F3336]/50">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-red-400 text-xs font-bold uppercase tracking-wider">The Problem</span></div>
                      <p className="text-gray-400 text-sm leading-relaxed">{study.problem}</p>
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-kuwex-cyan" /><span className="text-kuwex-cyan text-xs font-bold uppercase tracking-wider">Our Solution</span></div>
                      <p className="text-gray-400 text-sm leading-relaxed">{study.solution}</p>
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-green-400 text-xs font-bold uppercase tracking-wider">The Results</span></div>
                      <div className="space-y-3">
                        {study.results.map((r, j) => (
                          <div key={j} className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" /><span className="text-gray-300 text-sm">{r}</span></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-black to-[#080808] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.03),transparent_60%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">Client Voices</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                What Our Clients <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Say About Us</span>
              </h2>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} variants={fadeUp} className="relative bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 p-6 sm:p-8 hover:border-kuwex-cyan/20 transition-all duration-500">
                  <Quote size={32} className="text-kuwex-cyan/20 mb-4" />
                  <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} size={14} className="text-yellow-500 fill-yellow-500" />))}</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan/30 to-kuwex-blue/30 flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-20 sm:py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">Our Process</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                How We <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Deliver Excellence</span>
              </h2>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery", desc: "We understand your business, goals, and target audience deeply before writing a single line of code.", icon: Target },
                { step: "02", title: "Design", desc: "Premium UI/UX design tailored to your brand — modern, clean, and conversion-focused.", icon: Sparkles },
                { step: "03", title: "Build", desc: "Fast development using Next.js and modern tech. Your website is built to perform at the highest level.", icon: Zap },
                { step: "04", title: "Launch & Grow", desc: "We deploy, optimize for SEO, and set up analytics. Then we help you grow with ongoing support.", icon: TrendingUp },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="relative bg-[#111] rounded-2xl border border-[#2F3336]/50 p-6 hover:border-kuwex-cyan/30 transition-all duration-500 group">
                  <span className="text-5xl font-black text-kuwex-cyan/[0.07] absolute top-4 right-4 select-none">{item.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kuwex-cyan/15 to-kuwex-blue/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} className="text-kuwex-cyan" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="py-16 px-4 bg-[#080808] border-y border-[#2F3336]/50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-10">
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Industries We&apos;ve Transformed</h2>
              <p className="text-gray-500 text-sm">From hospitality to engineering — we build for every sector.</p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Tourism & Hospitality", "Construction", "Engineering & Energy", "Technology & E-commerce", "Services & Maintenance", "Corporate & Professional"].map((ind, i) => (
                <motion.div key={i} variants={fadeUp} className="px-5 py-2.5 rounded-full border border-[#2F3336]/60 bg-[#111] text-gray-400 text-sm font-medium hover:border-kuwex-cyan/30 hover:text-kuwex-cyan transition-all duration-300">
                  {ind}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.08),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-[150px]" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">Powerful</span>{" "}
                Together
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Ready to transform your business with a world-class digital presence? Let&apos;s talk about what we can build for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300">
                  Get Your Website <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/263719066891?text=Hi%20KuWeX%20Studios%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Now
                </a>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
