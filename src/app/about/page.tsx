"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Target, Globe2, Star, Lightbulb, Shield, Users, Sparkles, ArrowRight,
  Globe, Zap, Heart, Rocket, Code, Palette, TrendingUp
} from "lucide-react";
import Link from "next/link";

// 3D Globe Visual for About Hero
const AboutHeroVisual = () => {
  const orbitingElements = [
    { icon: Code, name: "Development", color: "#00E5FF", delay: 0 },
    { icon: Palette, name: "Design", color: "#EC4899", delay: 0.1 },
    { icon: TrendingUp, name: "Growth", color: "#10B981", delay: 0.2 },
    { icon: Zap, name: "Innovation", color: "#F59E0B", delay: 0.3 },
    { icon: Heart, name: "Passion", color: "#EF4444", delay: 0.4 },
    { icon: Rocket, name: "Launch", color: "#8B5CF6", delay: 0.5 },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-kuwex-cyan/20 rounded-full blur-3xl" />
      
      {/* 3D Globe Container */}
      <div className="relative aspect-square flex items-center justify-center">
        {/* Animated rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-80 h-80 rounded-full border border-kuwex-cyan/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 rounded-full border border-dashed border-kuwex-cyan/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-72 h-72 rounded-full border border-[#2F3336]"
        />
        
        {/* Main Globe */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Globe body */}
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] border border-kuwex-cyan/30 shadow-2xl overflow-hidden">
            {/* Globe grid lines */}
            <div className="absolute inset-0">
              {/* Horizontal lines */}
              <div className="absolute top-1/4 left-0 right-0 h-px bg-kuwex-cyan/10" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-kuwex-cyan/20" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-kuwex-cyan/10" />
              {/* Vertical curves */}
              <div className="absolute top-0 bottom-0 left-1/4 w-px bg-kuwex-cyan/10" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-kuwex-cyan/20" />
              <div className="absolute top-0 bottom-0 left-3/4 w-px bg-kuwex-cyan/10" />
            </div>
            
            {/* Africa highlight */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/3 left-1/3 w-20 h-24 bg-gradient-to-br from-kuwex-cyan/30 to-kuwex-blue/20 rounded-full blur-sm"
            />
            
            {/* KuWeX Logo Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-1">
                  <span className="text-white">KuWe</span>
                  <span className="text-kuwex-cyan">X</span>
                </div>
                <div className="text-[10px] text-gray-500 tracking-widest">STUDIOS</div>
              </motion.div>
            </div>
            
            {/* Glowing pulse */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-kuwex-cyan/10 to-transparent"
            />
          </div>
          
          {/* Connection dots on globe */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="absolute top-8 left-12 w-2 h-2 bg-kuwex-cyan rounded-full shadow-lg shadow-kuwex-cyan/50"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-16 right-8 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute bottom-12 left-8 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          />
        </motion.div>
        
        {/* Orbiting service icons */}
        {orbitingElements.map((item, i) => {
          const angle = (i * 360) / orbitingElements.length;
          const radius = 170;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + item.delay }}
              className="absolute w-14 h-14 bg-[#16181C] rounded-xl border border-[#2F3336] flex items-center justify-center shadow-lg hover:scale-110 hover:border-kuwex-cyan/50 transition-all cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px - 28px)`, 
                top: `calc(50% + ${y}px - 28px)` 
              }}
            >
              <item.icon size={26} style={{ color: item.color }} />
              <span className="absolute -bottom-6 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.name}</span>
            </motion.div>
          );
        })}
        
      </div>
    </div>
  );
};

const coreValues = [
  { icon: Star, title: "Excellence", desc: "We deliver nothing less than world-class quality in everything we create." },
  { icon: Lightbulb, title: "Innovation", desc: "We push boundaries and embrace cutting-edge technologies to stay ahead." },
  { icon: Shield, title: "Integrity", desc: "We build trust through transparency, honesty, and ethical practices." },
  { icon: Users, title: "Collaboration", desc: "We work as partners with our clients, not just service providers." },
  { icon: Sparkles, title: "Impact", desc: "We measure success by the real-world difference we make for our clients." }
];

const team = [
  {
    name: "Kuda",
    role: "Co-Founder & Tech Lead",
    bio: "Visionary technologist passionate about scalable architecture and futuristic interfaces. Leading KuWeX's technical innovation.",
    color: "#00E5FF"
  },
  {
    name: "Weston",
    role: "Co-Founder & Creative Director",
    bio: "Design maestro obsessed with pixel-perfect precision and user-centric experiences. Crafting KuWeX's visual identity.",
    color: "#0085FF"
  }
];

// Abstract Holographic Human Avatar Component
const HolographicAvatar = ({ color }: { color: string }) => {
  return (
    <div className="relative w-32 h-32">
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `conic-gradient(from 0deg, ${color}40, transparent, ${color}40)`,
          filter: 'blur(8px)'
        }}
      />
      
      {/* Main avatar circle */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2F3336] overflow-hidden">
        {/* Holographic grid */}
        <div className="absolute inset-0">
          {/* Vertical lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px"
              style={{ 
                left: `${(i + 1) * 16.66}%`,
                background: `linear-gradient(to bottom, transparent, ${color}30, transparent)`
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px"
              style={{ 
                top: `${(i + 1) * 16.66}%`,
                background: `linear-gradient(to right, transparent, ${color}30, transparent)`
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        {/* Abstract human silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative"
          >
            {/* Head */}
            <div 
              className="w-8 h-8 rounded-full mx-auto mb-1"
              style={{ 
                background: `radial-gradient(circle, ${color}60, ${color}20)`,
                boxShadow: `0 0 20px ${color}40`
              }}
            />
            {/* Body */}
            <div 
              className="w-12 h-16 rounded-t-full"
              style={{ 
                background: `linear-gradient(to bottom, ${color}40, ${color}10)`,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
              }}
            />
          </motion.div>
        </div>
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: color }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Particle effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              background: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>
      
      {/* Pulsing outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.2, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};


export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-kuwex-cyan/5 via-transparent to-kuwex-blue/5" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-kuwex-blue/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="vibrant-badge mb-8">
                <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Our Story</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.05]">
                Born in Africa.<br />
                <span className="vibrant-gradient-text">Built for the World.</span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                KuWeX Studios is a cutting-edge digital innovation company dedicated to transforming African businesses through world-class digital products.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-7 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
                >
                  Work With Us
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border border-[#2F3336] text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AboutHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 px-4 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,229,255,0.04),transparent_50%)]" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="x-card-vibrant rounded-3xl p-10 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                <Target size={28} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our <span className="vibrant-gradient-text">Mission</span></h3>
              <p className="text-gray-400 leading-relaxed">
                To empower Africa with global-standard digital solutions that spark growth, increase efficiency, and unlock new opportunities. We build digital infrastructure that propels businesses and governments into the future.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="x-card-vibrant rounded-3xl p-10 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kuwex-blue/10 to-kuwex-cyan/10 border border-kuwex-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(0,133,255,0.2)] transition-all duration-300">
                <Globe2 size={28} className="text-kuwex-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our <span className="vibrant-gradient-text">Vision</span></h3>
              <p className="text-gray-400 leading-relaxed">
                To be Africa&apos;s leading digital innovation hub, recognized globally for setting new standards in design, technology, and user experience. We envision a digitally empowered Africa competing on the world stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 px-4 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.03),transparent_50%)]" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="vibrant-badge mx-auto mb-6">
              <span className="w-2 h-2 bg-kuwex-cyan rounded-full" />
              <span className="text-sm text-gray-400">What Drives Us</span>
            </div>
            <h2 className="section-heading mb-4">Our Core <span className="vibrant-gradient-text">Values</span></h2>
            <p className="section-subheading mx-auto">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-3xl p-8 text-center group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <value.icon size={28} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 px-4 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="vibrant-badge mx-auto mb-6">
              <span className="w-2 h-2 bg-kuwex-blue rounded-full" />
              <span className="text-sm text-gray-400">Leadership</span>
            </div>
            <h2 className="section-heading mb-4">The Minds Behind <span className="vibrant-gradient-text">KuWeX</span></h2>
            <p className="section-subheading mx-auto">Meet the visionaries leading Africa&apos;s digital transformation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-3xl p-8 group"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <HolographicAvatar color={member.color} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-kuwex-cyan transition-colors duration-300">{member.name}</h3>
                    <p className="vibrant-gradient-text font-medium mb-4 text-sm">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-kuwex-cyan/30 to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="vibrant-badge mx-auto mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Let&apos;s collaborate</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
              Ready to work <span className="vibrant-gradient-text">with us?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the growing list of businesses transforming their digital presence with KuWeX Studios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 border border-[#2F3336] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/5 hover:border-kuwex-cyan/30 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
