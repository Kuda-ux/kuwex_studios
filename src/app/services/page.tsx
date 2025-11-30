"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Palette, Code, Video, TrendingUp, Lightbulb, Check, ArrowRight,
  Figma, PenTool, Layers, Sparkles, Brush,
  Globe, Smartphone, Database, Server, Layout,
  Camera, Play, Mic, Film, ImageIcon,
  BarChart3, Target, Search, Mail, Megaphone,
  GraduationCap, Rocket, LineChart, Users, Brain
} from "lucide-react";
import Link from "next/link";

// 3D Visual Components for each service
const BrandingVisual = () => {
  const designTools = [
    { icon: Figma, name: "Figma", color: "#F24E1E" },
    { icon: PenTool, name: "Illustrator", color: "#FF9A00" },
    { icon: Layers, name: "Photoshop", color: "#31A8FF" },
    { icon: Sparkles, name: "After Effects", color: "#9999FF" },
    { icon: Brush, name: "Creative", color: "#FF61F6" },
  ];
  
  return (
    <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      
      {/* 3D Canvas/Artboard */}
      <div className="relative">
        {/* Main artboard */}
        <motion.div 
          initial={{ rotateY: -15, rotateX: 10 }}
          animate={{ rotateY: [-15, -10, -15], rotateX: [10, 5, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-52 h-52 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-purple-500/30 shadow-2xl"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* KuWeX Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-black">
              <span className="text-white">KuWe</span>
              <span className="text-kuwex-cyan">X</span>
            </div>
          </div>
          
          {/* Floating design elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full"
          />
        </motion.div>
        
        {/* Orbiting design tools */}
        {designTools.map((tool, i) => {
          const angle = (i * 360) / designTools.length;
          const radius = 115;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute w-12 h-12 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-purple-500/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 20px)`, 
                top: `calc(50% + ${y}px - 20px)` 
              }}
            >
              <tool.icon size={22} style={{ color: tool.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tool.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const WebDevVisual = () => {
  const techStack = [
    { icon: Globe, name: "Web", color: "#00E5FF" },
    { icon: Smartphone, name: "Mobile", color: "#34D399" },
    { icon: Database, name: "Database", color: "#F59E0B" },
    { icon: Server, name: "Backend", color: "#8B5CF6" },
    { icon: Layout, name: "Frontend", color: "#EC4899" },
  ];
  
  return (
    <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
      
      {/* 3D Browser/Device */}
      <div className="relative">
        {/* Main browser window */}
        <motion.div 
          initial={{ rotateY: 15, rotateX: 5 }}
          animate={{ rotateY: [15, 10, 15], rotateX: [5, 0, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-44 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-cyan-500/30 shadow-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Browser header */}
          <div className="h-6 bg-[#1a1a1a] border-b border-[#2F3336] flex items-center px-2 gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="flex-1 mx-2 h-3 bg-[#0a0a0a] rounded text-[6px] text-gray-500 flex items-center justify-center">kuwex.co</div>
          </div>
          
          {/* Screen content */}
          <div className="p-2 space-y-1">
            <div className="h-2 w-16 bg-kuwex-cyan/40 rounded" />
            <div className="h-1.5 w-full bg-[#2F3336] rounded" />
            <div className="h-1.5 w-3/4 bg-[#2F3336] rounded" />
            <div className="flex gap-1 mt-2">
              <div className="h-8 w-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded border border-cyan-500/30" />
              <div className="h-8 w-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded border border-purple-500/30" />
              <div className="h-8 w-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded border border-green-500/30" />
            </div>
          </div>
        </motion.div>
        
        {/* Floating phone */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -bottom-6 w-16 h-28 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-cyan-500/30 shadow-xl overflow-hidden"
        >
          <div className="h-2 bg-[#1a1a1a] flex items-center justify-center">
            <div className="w-4 h-0.5 bg-[#2F3336] rounded" />
          </div>
          <div className="p-1 space-y-0.5">
            <div className="h-1 w-6 bg-kuwex-cyan/40 rounded" />
            <div className="h-0.5 w-full bg-[#2F3336] rounded" />
            <div className="h-3 w-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded mt-1" />
          </div>
        </motion.div>
        
        {/* Orbiting tech icons */}
        {techStack.map((tech, i) => {
          const angle = (i * 360) / techStack.length;
          const radius = 120;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute w-12 h-12 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-cyan-500/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 20px)`, 
                top: `calc(50% + ${y}px - 20px)` 
              }}
            >
              <tech.icon size={22} style={{ color: tech.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const MultimediaVisual = () => {
  const mediaTools = [
    { icon: Camera, name: "Photo", color: "#F59E0B" },
    { icon: Play, name: "Video", color: "#EF4444" },
    { icon: Mic, name: "Audio", color: "#8B5CF6" },
    { icon: Film, name: "Film", color: "#EC4899" },
    { icon: ImageIcon, name: "Graphics", color: "#10B981" },
  ];
  
  return (
    <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
      
      {/* 3D Video Player */}
      <div className="relative">
        <motion.div 
          initial={{ rotateY: -10, rotateX: 5 }}
          animate={{ rotateY: [-10, -5, -10], rotateX: [5, 0, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-60 h-40 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-orange-500/30 shadow-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Video content area */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
            >
              <Play size={28} className="text-white ml-1" fill="white" />
            </motion.div>
          </div>
          
          {/* Timeline */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60 backdrop-blur-sm flex items-center px-3 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="flex-1 h-1.5 bg-[#2F3336] rounded overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "60%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded"
              />
            </div>
            <span className="text-[10px] text-gray-400">2:34</span>
          </div>
        </motion.div>
        
        {/* Floating waveform */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [12, 24 + i * 6, 12] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-1.5 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-full"
            />
          ))}
        </motion.div>
        
        {/* Orbiting media icons */}
        {mediaTools.map((tool, i) => {
          const angle = (i * 360) / mediaTools.length;
          const radius = 120;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute w-12 h-12 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-orange-500/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 24px)`, 
                top: `calc(50% + ${y}px - 24px)` 
              }}
            >
              <tool.icon size={22} style={{ color: tool.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tool.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const MarketingVisual = () => {
  const marketingTools = [
    { icon: BarChart3, name: "Analytics", color: "#10B981" },
    { icon: Target, name: "Targeting", color: "#EF4444" },
    { icon: Search, name: "SEO", color: "#F59E0B" },
    { icon: Mail, name: "Email", color: "#6366F1" },
    { icon: Megaphone, name: "Ads", color: "#EC4899" },
  ];
  
  return (
    <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
      
      {/* 3D Dashboard */}
      <div className="relative">
        <motion.div 
          initial={{ rotateY: 10, rotateX: 5 }}
          animate={{ rotateY: [10, 5, 10], rotateX: [5, 0, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-44 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-green-500/30 shadow-2xl overflow-hidden p-4"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Chart bars */}
          <div className="flex items-end gap-1.5 h-24 mb-3">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
              />
            ))}
          </div>
          
          {/* Stats row */}
          <div className="flex gap-3">
            <div className="flex-1 bg-[#16181C] rounded-lg p-2">
              <div className="text-[10px] text-gray-500">Growth</div>
              <div className="text-sm font-bold text-green-400">+127%</div>
            </div>
            <div className="flex-1 bg-[#16181C] rounded-lg p-2">
              <div className="text-[10px] text-gray-500">ROI</div>
              <div className="text-sm font-bold text-cyan-400">4.8x</div>
            </div>
          </div>
        </motion.div>
        
        {/* Floating trend line */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-6 -top-4"
        >
          <svg width="50" height="40" viewBox="0 0 50 40">
            <motion.path
              d="M0,35 Q12,28 18,20 T30,12 T50,5"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx="50" cy="5" r="4" fill="#10B981" />
          </svg>
        </motion.div>
        
        {/* Orbiting marketing icons */}
        {marketingTools.map((tool, i) => {
          const angle = (i * 360) / marketingTools.length;
          const radius = 120;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute w-12 h-12 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-green-500/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 24px)`, 
                top: `calc(50% + ${y}px - 24px)` 
              }}
            >
              <tool.icon size={22} style={{ color: tool.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tool.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ConsultancyVisual = () => {
  const consultTools = [
    { icon: GraduationCap, name: "Training", color: "#F59E0B" },
    { icon: Rocket, name: "Startups", color: "#EF4444" },
    { icon: LineChart, name: "Strategy", color: "#10B981" },
    { icon: Users, name: "Teams", color: "#6366F1" },
    { icon: Brain, name: "Innovation", color: "#EC4899" },
  ];
  
  return (
    <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#16181C] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />
      
      {/* 3D Lightbulb/Idea visualization */}
      <div className="relative">
        <motion.div 
          initial={{ rotateY: -5 }}
          animate={{ rotateY: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Central idea/brain */}
          <div className="relative w-44 h-44 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-full border border-yellow-500/30 shadow-2xl flex items-center justify-center">
            {/* Glowing core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-sm"
            />
            
            {/* KuWeX Logo */}
            <div className="relative z-10 text-2xl font-black">
              <span className="text-white">KuWe</span>
              <span className="text-kuwex-cyan">X</span>
            </div>
            
            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
                  style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(2.2)' }}>
            {consultTools.map((_, i) => {
              const angle = (i * 360) / consultTools.length - 90;
              const x2 = 50 + Math.cos(angle * (Math.PI / 180)) * 40;
              const y2 = 50 + Math.sin(angle * (Math.PI / 180)) * 40;
              return (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="#F59E0B"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              );
            })}
          </svg>
        </motion.div>
        
        {/* Orbiting consultancy icons */}
        {consultTools.map((tool, i) => {
          const angle = (i * 360) / consultTools.length;
          const radius = 115;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="absolute w-12 h-12 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-yellow-500/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 24px)`, 
                top: `calc(50% + ${y}px - 24px)` 
              }}
            >
              <tool.icon size={22} style={{ color: tool.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tool.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const services = [
  {
    id: "branding",
    title: "Digital Branding & Creative Design",
    icon: Palette,
    description: "We help brands stand out with powerful designs that communicate value instantly. Our creative team crafts bold, memorable, and timeless brand identities that command attention in a competitive market.",
    features: ["Logo Design", "Brand Identity", "Corporate Profiles", "Marketing Materials", "UI Kits", "Visual Guidelines"],
    visual: <BrandingVisual />,
    gradient: "from-purple-600 to-pink-600"
  },
  {
    id: "web-dev",
    title: "Web & Mobile App Development",
    icon: Code,
    description: "We build high-performance products with clean code and exceptional UX. From custom websites and PWAs to mobile apps, dashboards, portals, and enterprise systems — we deliver digital excellence.",
    features: ["Custom Websites", "Progressive Web Apps", "Mobile Applications", "Admin Dashboards", "Enterprise Portals", "API Development"],
    visual: <WebDevVisual />,
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    id: "multimedia",
    title: "Multimedia Production",
    icon: Video,
    description: "Our multimedia team delivers visuals that inspire and convert. From corporate videos and advertisements to animations, photography, voice-overs, and creative content — we produce content that elevates brands and tells powerful stories.",
    features: ["Corporate Videos", "Advertisements", "Motion Graphics", "Photography", "Voice-overs", "Creative Content"],
    visual: <MultimediaVisual />,
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    description: "We use intelligent marketing to drive measurable results and business growth. Our data-driven, AI-powered marketing strategies are built for conversions and visibility across all digital channels.",
    features: ["SEO Optimization", "Social Media Marketing", "Paid Advertising", "Email Marketing", "Analytics & Insights", "Growth Campaigns"],
    visual: <MarketingVisual />,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "consultancy",
    title: "Innovation Research, Training & Consultancy",
    icon: Lightbulb,
    description: "We guide organizations into the future with professional technology insights, training programs, and industry-leading advisory. From corporate innovation programs to digital transformation training and startup consultancy.",
    features: ["Corporate Innovation Programs", "Digital Transformation Training", "Startup Consultancy", "Feasibility Studies", "Strategy Development", "Technology Advisory"],
    visual: <ConsultancyVisual />,
    gradient: "from-yellow-500 to-orange-500"
  }
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We dive deep into understanding your business, goals, and target audience." },
  { step: "02", title: "Strategy", desc: "We develop a comprehensive plan tailored to your specific needs and objectives." },
  { step: "03", title: "Design", desc: "Our creative team brings your vision to life with stunning, user-centric designs." },
  { step: "04", title: "Development", desc: "We build robust, scalable solutions using cutting-edge technologies." },
  { step: "05", title: "Launch", desc: "We deploy your project and ensure everything runs smoothly." },
  { step: "06", title: "Support", desc: "We provide ongoing maintenance, updates, and optimization." }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-blue/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">What We Offer</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-kuwex-cyan">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions designed to transform your business and help you compete on the global stage.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-24 px-4">
        <div className="container mx-auto space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[#16181C] border border-[#2F3336] rounded-3xl overflow-hidden hover:border-kuwex-cyan/50 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Visual Side */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {service.visual}
                  
                  {/* Service Icon Badge */}
                  <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-kuwex-cyan transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-kuwex-cyan/20 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-kuwex-cyan" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-kuwex-cyan hover:text-white transition-colors font-semibold w-fit"
                  >
                    Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our <span className="text-kuwex-cyan">Process</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">A proven methodology that delivers results every time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#16181C] border border-[#2F3336] rounded-3xl p-8 hover:border-kuwex-cyan/50 transition-all duration-300 group"
              >
                <div className="text-5xl font-bold text-kuwex-cyan/20 mb-4 group-hover:text-kuwex-cyan/40 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black border-t border-[#2F3336] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kuwex-cyan/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Ready to <span className="text-kuwex-cyan">transform</span> your business?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let <span className="text-kuwex-cyan">KuWeX</span> Studios help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-kuwex-cyan text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-white transition-all group"
              >
                Start Your Project
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 border border-kuwex-cyan/50 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-kuwex-cyan/10 transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
