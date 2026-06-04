"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Star,
  Quote,
  Smartphone,
  Monitor,
  Sparkles,
  Palette,
  Search,
  MessageSquare,
  BarChart3,
  Filter,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "hospitality", label: "Hospitality" },
  { id: "energy", label: "Energy" },
  { id: "education", label: "Education" },
  { id: "construction", label: "Construction" },
  { id: "ngo", label: "NGO & Community" },
  { id: "services", label: "Services" },
  { id: "health", label: "Health & Wellness" },
];

const projects = [
  {
    name: "Kupuona Integral Engineers",
    industry: "Energy & Engineering",
    category: "energy",
    url: "https://www.kupuonazim.co.zw/",
    description: "Full-service energy company website covering solar systems, generator installations, and electrical services. Positioned as Zimbabwe's trusted energy partner with clear CTAs and lead capture.",
    services: ["Web Design", "SEO", "Lead Generation"],
    color: "#00C47A",
    screenshot: "/portfolio/kupuona-engineers.png",
  },
  {
    name: "Matopo Africa Construction",
    industry: "Construction",
    category: "construction",
    url: "https://www.matopoafricaconstruction.co.zw/",
    description: "Corporate construction and aluminium solutions website — homes, commercial structures, windows, pergolas, shower cubicles and more. Built to command trust and convert enquiries.",
    services: ["Web Design", "Branding", "SEO"],
    color: "#00E5FF",
    screenshot: "/portfolio/matopo-construction.png",
  },
  {
    name: "Bluefin Energy",
    industry: "Solar Energy",
    category: "energy",
    url: "#",
    description: "Bold solar energy platform serving 500+ Zimbabwe homes and businesses. High-converting landing pages for residential and commercial solar packages with real project proof.",
    services: ["Web Design", "Digital Marketing"],
    color: "#0085FF",
    screenshot: "/portfolio/bluefin-energy.png",
  },
  {
    name: "Springboard Beauty College",
    industry: "Beauty & Education",
    category: "education",
    url: "#",
    description: "Zimbabwe's premier beauty academy — elegant branding, course showcase, certifications, gallery, and a streamlined admissions pipeline to attract the next generation of professionals.",
    services: ["Web Design", "Branding"],
    color: "#E91E8C",
    screenshot: "/portfolio/springboard-beauty.png",
  },
  {
    name: "Springboard College",
    industry: "Professional Training",
    category: "education",
    url: "https://springboardedu.co.zw",
    description: "ABMA & ICM-aligned training institution for Aviation, Hospitality, Culinary Arts, Beauty, and Business programmes. A world-class site built to attract serious students.",
    services: ["Web Design", "SEO", "Content Strategy"],
    color: "#F59E0B",
    screenshot: "/portfolio/springboard-college.png",
  },
  {
    name: "Mutasa Youth Forum",
    industry: "NGO & Community",
    category: "ngo",
    url: "#",
    description: "A powerful community empowerment website for Manicaland's youth — programs, gallery, impact metrics, partner visibility, and donation facilitation. Digital presence for real change.",
    services: ["Web Design", "Digital Presence"],
    color: "#F97316",
    screenshot: "/portfolio/mutasa-youth-forum.png",
  },
  {
    name: "Fountain Blue Pools",
    industry: "Pool Construction & Services",
    category: "services",
    url: "https://www.fountainpoolrepairs.co.zw/",
    description: "Premium pool construction, repairs, fibreglass relining, and pump solutions. A professional digital brand that replaced word-of-mouth with direct Google-driven enquiries.",
    services: ["Web Design", "Lead Generation"],
    color: "#06B6D4",
    screenshot: "/portfolio/fountain-blue-pools.png",
  },
  {
    name: "Metro Antelope Lodge",
    industry: "Hospitality",
    category: "hospitality",
    url: "https://www.metroantelopelodge.co.zw/",
    description: "Zimbabwe's hidden gem at Antelope Dam near Matobo Hills UNESCO World Heritage Site. Rooms, thatched cottages, lake views — booking-focused and built to convert travellers.",
    services: ["Web Design", "Branding", "SEO"],
    color: "#3B82F6",
    screenshot: "/portfolio/matobo-lodge.png",
  },
  {
    name: "Rock Perfect Fisheries ZW",
    industry: "Agriculture & Aquaculture",
    category: "services",
    url: "#",
    description: "High-converting fish farming platform helping Zimbabwean entrepreneurs build profitable fish farms — complete pond construction, fingerlings, training, and start-to-harvest solutions.",
    services: ["Web Design", "Digital Marketing"],
    color: "#EF4444",
    screenshot: "/portfolio/rock-perfect-fisheries.png",
  },
  {
    name: "Victoria Falls Mental Health",
    industry: "Health & Wellness",
    category: "health",
    url: "https://vicfallsmentalhealth.co.zw",
    description: "Zimbabwe's premier mental health and wellness retreat. Mind. Body. Soul. A serene, trust-centred website for psychotherapy, wellness retreats, and corporate wellbeing. 500+ lives touched.",
    services: ["Web Design", "Branding", "Content Strategy"],
    color: "#A855F7",
    screenshot: "/portfolio/vicfalls-mental-health.png",
  },
  {
    name: "Tribe Lodge",
    industry: "Hospitality",
    category: "hospitality",
    url: "#",
    description: "Luxury boutique lodge in Bulawayo — eight individually styled presidential suites, curated African tours, and warm hospitality. A place where comfort meets culture.",
    services: ["Web Design", "Branding"],
    color: "#D97706",
    screenshot: "/portfolio/tribe-lodge.png",
  },
];

const deliverables = [
  {
    icon: Monitor,
    title: "Website Design & Development",
    desc: "Custom websites that load fast, rank on Google, and convert visitors into clients. Built for every Zimbabwe industry from scratch.",
    color: "#00E5FF",
  },
  {
    icon: Palette,
    title: "Brand Identity & Logo Design",
    desc: "Complete visual identity — logos, colour systems, typography, and brand guidelines that command respect and instant recognition.",
    color: "#0085FF",
  },
  {
    icon: Search,
    title: "SEO & Google Visibility",
    desc: "We optimise your site to rank where your customers search — local SEO, technical SEO, keyword strategy, and structured content.",
    color: "#A855F7",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & Social Integration",
    desc: "Connect WhatsApp, Facebook, Instagram, and enquiry forms into one seamless digital growth system that never sleeps.",
    color: "#25D366",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing Strategy",
    desc: "Campaigns, content calendars, Google Ads, and analytics dashboards. A connected strategy that turns online attention into revenue.",
    color: "#F59E0B",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Development",
    desc: "70%+ of your customers browse on phones. Every site we build is pixel-perfect on mobile — fast, sharp, and smooth.",
    color: "#EF4444",
  },
];

const testimonials = [
  {
    name: "Takudzwa M.",
    role: "Owner, Metro Antelope Lodge",
    text: "KuWeX Studios delivered beyond our expectations. The website looks world-class and we started receiving enquiries within the first week. Professional, fast, and they truly understood our vision.",
    rating: 5,
  },
  {
    name: "Farai C.",
    role: "Director, Matopo Africa Construction",
    text: "We needed a website that screamed professionalism and credibility. KuWeX nailed it. Our clients now see us differently — as the premium construction company we are. The ROI has been incredible.",
    rating: 5,
  },
  {
    name: "Tinashe R.",
    role: "Founder, Sui Generis IT",
    text: "Fast, reliable, and the end product was amazing. KuWeX Studios understands what Zimbabwe businesses need — not just a pretty website, but a system that actually brings in customers.",
    rating: 5,
  },
  {
    name: "Grace N.",
    role: "Manager, Fountain Blue Pools",
    text: "Before KuWeX, we relied purely on referrals. Now customers find us on Google, see our work, and call us directly. The website paid for itself within the first month. These guys are the real deal.",
    rating: 5,
  },
];

const stats = [
  { value: "11+", label: "Projects Delivered" },
  { value: "8+", label: "Industries Served" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2–5", label: "Day Delivery" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

function ServiceTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  const hasLink = project.url !== "#";
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 overflow-hidden hover:border-kuwex-cyan/25 transition-all duration-500 flex flex-col"
    >
      <div className="relative h-52 sm:h-56 overflow-hidden flex-shrink-0">
        <Image
          src={project.screenshot}
          alt={`${project.name} — Website by KuWeX Studios`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className="text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border"
            style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}35`, color: project.color }}
          >
            {project.industry}
          </span>
        </div>
        {hasLink && (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-kuwex-cyan hover:text-black hover:border-kuwex-cyan transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={13} />
          </motion.a>
        )}
        <div className="absolute bottom-3 left-3 right-10">
          <h3 className="text-base font-bold text-white leading-tight drop-shadow-lg">{project.name}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.services.map((s) => (
            <ServiceTag key={s} label={s} color={project.color} />
          ))}
        </div>
        {hasLink ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group/btn"
            style={{ color: project.color }}
          >
            View Live Site <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Globe size={13} /> Project Showcase
          </span>
        )}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: project.color }}
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_70%,rgba(0,133,255,0.05),transparent_55%)]" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-kuwex-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kuwex-blue/5 rounded-full blur-[130px]" />
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-full px-5 py-2 mb-8"
            >
              <Sparkles size={14} className="text-kuwex-cyan" />
              <span className="text-kuwex-cyan text-sm font-medium">11 Live Projects · 8 Industries</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              The Work Speaks.
              <br />
              <span className="bg-gradient-to-r from-kuwex-cyan via-kuwex-blue to-kuwex-cyan bg-clip-text text-transparent">
                The Results Prove It.
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              From solar companies to luxury lodges, beauty colleges to NGOs — this is what KuWeX Studios has built for Zimbabwe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
              >
                Explore Our Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border border-[#2F3336] hover:border-kuwex-cyan/50 bg-white/[0.03] text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-white/[0.06] transition-all duration-300"
              >
                Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-6 border-y border-[#2F3336]/50 bg-[#080808]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-[#2F3336]/50 py-2"
              >
                <div className="text-2xl font-black bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section id="projects" className="py-20 sm:py-28 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,229,255,0.02),transparent_65%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Projects That{" "}
                <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
                  Change Businesses
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Real websites. Real clients. Real Zimbabwe industries.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black border-transparent shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                    : "border-[#2F3336]/60 text-gray-400 hover:border-kuwex-cyan/40 hover:text-white bg-[#0A0A0A]"
                }`}
              >
                {cat.id === "all" && <Filter size={12} />}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== WHAT WE DELIVER ===== */}
      <section className="py-20 sm:py-28 px-4 bg-[#080808] border-y border-[#2F3336]/50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                More Than Websites —{" "}
                <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
                  Complete Digital Solutions
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Every project above involved more than just code. Here&apos;s the full range of what KuWeX Studios delivers.
              </p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 p-6 hover:border-kuwex-cyan/25 transition-all duration-500 group overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${item.color}07, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeUp}>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
              >
                View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.03),transparent_60%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <span className="text-kuwex-cyan text-sm font-bold tracking-widest uppercase mb-4 block">
                Client Voices
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
                What Our Clients{" "}
                <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
                  Say About Us
                </span>
              </h2>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-2xl border border-[#2F3336]/50 p-6 sm:p-8 hover:border-kuwex-cyan/20 transition-all duration-500"
                >
                  <Quote size={28} className="text-kuwex-cyan/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kuwex-cyan/30 to-kuwex-blue/30 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
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

      {/* ===== INDUSTRIES ===== */}
      <section className="py-14 px-4 bg-[#080808] border-y border-[#2F3336]/50">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-8">
            <motion.div variants={fadeUp}>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Industries We&apos;ve Transformed</h2>
              <p className="text-gray-500 text-sm">No sector is off-limits. If your business needs to grow, we build for it.</p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Tourism & Hospitality",
                "Construction & Aluminium",
                "Solar & Energy",
                "Professional Training",
                "Beauty & Wellness",
                "NGO & Community",
                "Agriculture & Aquaculture",
                "Health & Mental Wellness",
                "Technology & E-commerce",
                "Pool & Home Services",
              ].map((ind, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="px-4 py-2 rounded-full border border-[#2F3336]/60 bg-[#111] text-gray-400 text-sm font-medium hover:border-kuwex-cyan/35 hover:text-kuwex-cyan transition-all duration-300 cursor-default"
                >
                  {ind}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.08),transparent_55%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-[150px]" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Your Business Deserves to Be{" "}
                <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
                  on This Page
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Join the growing list of Zimbabwe businesses that KuWeX Studios has transformed. Let&apos;s build
                something powerful together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/263719066891?text=Hi%20KuWeX%20Studios%2C%20I%27d%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
