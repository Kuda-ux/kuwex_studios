"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react";

interface ServiceQuoteFormProps {
  serviceName: string;
  serviceValue: string;
}

export default function ServiceQuoteForm({ serviceName, serviceValue }: ServiceQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: "",
          email: formData.email,
          company: "",
          service: serviceValue,
          message: formData.message || `Requested a free quote for ${serviceName}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-gray-400 mb-2 max-w-sm">
          Thank you for your interest in our {serviceName}. We&apos;ll get back to you within 24 hours with a personalised quote.
        </p>
        <p className="text-gray-500 text-sm">Check your email for a confirmation message.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-kuwex-cyan hover:text-kuwex-blue transition-colors text-sm font-medium"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="x-card-vibrant rounded-3xl p-8 md:p-10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-kuwex-cyan" />
        <span className="text-xs font-bold text-kuwex-cyan uppercase tracking-wider">Free Quote</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
        Get a Free <span className="vibrant-gradient-text">{serviceName}</span> Quote
      </h3>
      <p className="text-gray-400 mb-8">
        Tell us about your project and we&apos;ll send you a personalised quote within 24 hours. No obligations.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {status === "error" && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-400 mb-2 block">Phone Number <span className="text-gray-600">(optional)</span></label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all"
            placeholder="+263 7XX XXX XXX"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-400 mb-2 block">Project Details <span className="text-gray-600">(optional)</span></label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/50 transition-all resize-none"
            placeholder="Tell us about your project, timeline, and budget..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-[#00E5FF] to-[#0085FF] text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get My Free Quote <Send size={18} />
            </>
          )}
        </button>

        <p className="text-center text-gray-600 text-xs">
          Free consultation · No obligations · Response within 24 hours
        </p>
      </form>
    </motion.div>
  );
}
