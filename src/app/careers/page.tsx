"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, 
  Coffee, Laptop, Globe, Rocket, Star
} from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Laptop, title: "Remote-First", desc: "Work from anywhere in the world" },
  { icon: Clock, title: "Flexible Hours", desc: "We trust you to manage your time" },
  { icon: Zap, title: "Growth", desc: "Continuous learning opportunities" },
  { icon: Heart, title: "Health", desc: "Comprehensive health coverage" },
  { icon: Coffee, title: "Team Events", desc: "Regular team bonding activities" },
  { icon: Globe, title: "Global Impact", desc: "Work on projects across Africa" },
];

const openPositions = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / Harare",
    type: "Full-time",
    description: "We're looking for an experienced full-stack developer to help build cutting-edge web applications for our clients."
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / Harare",
    type: "Full-time",
    description: "Join our design team to create beautiful, user-centric interfaces that delight users and drive business results."
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Help our clients grow their digital presence through data-driven marketing strategies and campaigns."
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "Harare",
    type: "Full-time",
    description: "Lead and coordinate projects from inception to delivery, ensuring client satisfaction and team success."
  },
];

const values = [
  { icon: Rocket, title: "Innovation", desc: "We push boundaries and embrace new technologies" },
  { icon: Users, title: "Collaboration", desc: "We work together to achieve extraordinary results" },
  { icon: Star, title: "Excellence", desc: "We deliver nothing less than world-class quality" },
];

export default function Careers() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(0,133,255,0.04),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-kuwex-cyan/[0.03] rounded-full blur-[150px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vibrant-badge mx-auto mb-8"
          >
            <span className="w-2 h-2 bg-kuwex-cyan rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Join Our Team</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Build the <span className="vibrant-gradient-text">Future</span> with Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Join a team of passionate innovators dedicated to transforming Africa&apos;s digital landscape. We&apos;re always looking for talented individuals who share our vision.
          </motion.p>
        </div>
      </section>

      {/* Why Join Us */}
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
              <span className="text-sm text-gray-400">Benefits</span>
            </div>
            <h2 className="section-heading mb-4">Why Join <span className="vibrant-gradient-text">KuWeX</span>?</h2>
            <p className="section-subheading mx-auto">We offer more than just a job — we offer a chance to make a real impact</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-3xl p-8 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <benefit.icon size={28} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              <span className="text-sm text-gray-400">Culture</span>
            </div>
            <h2 className="section-heading mb-4">Our <span className="vibrant-gradient-text">Values</span></h2>
            <p className="section-subheading mx-auto">The principles that guide how we work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <value.icon size={36} className="text-kuwex-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-kuwex-cyan transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Hiring</span>
            </div>
            <h2 className="section-heading mb-4">Open <span className="vibrant-gradient-text">Positions</span></h2>
            <p className="section-subheading mx-auto">Find your next opportunity with us</p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="x-card-vibrant rounded-3xl p-8 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 text-kuwex-cyan text-xs font-medium px-3 py-1.5 rounded-full">
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={14} />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock size={14} />
                        {position.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-kuwex-cyan transition-colors duration-300">
                      {position.title}
                    </h3>
                    <p className="text-gray-500">{position.description}</p>
                  </div>
                  <Link 
                    href="/contact"
                    className="group/btn flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 text-kuwex-cyan hover:from-kuwex-cyan hover:to-kuwex-blue hover:text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                  >
                    Apply Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
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
              <span className="text-sm text-gray-400">Open to talent</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
              Don&apos;t see your <span className="vibrant-gradient-text">role?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              We&apos;re always looking for talented people. Send us your CV and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
            >
              Get in Touch
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
