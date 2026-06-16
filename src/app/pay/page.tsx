"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Smartphone,
  Lock,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

const SERVICE_PRESETS = [
  { label: "Website Design (Starter)", amount: 350 },
  { label: "Website Design (Business)", amount: 750 },
  { label: "Website Design (Premium)", amount: 1500 },
  { label: "SEO Package (Monthly)", amount: 200 },
  { label: "Google Ads Management (Monthly)", amount: 250 },
  { label: "Branding Package", amount: 400 },
  { label: "Custom / Other", amount: 0 },
];

export default function PayPage() {
  const [serviceLabel, setServiceLabel] = useState(SERVICE_PRESETS[0].label);
  const [customService, setCustomService] = useState("");
  const [amount, setAmount] = useState<string>(SERVICE_PRESETS[0].amount.toString());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCustom = serviceLabel === "Custom / Other";

  const handlePresetChange = (label: string) => {
    setServiceLabel(label);
    const found = SERVICE_PRESETS.find((s) => s.label === label);
    if (found && found.amount > 0) setAmount(found.amount.toString());
    else setAmount("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalService = isCustom ? customService.trim() : serviceLabel;
    const numAmount = parseFloat(amount);

    if (!finalService) return setError("Please describe the service you are paying for.");
    if (!email.trim()) return setError("Email is required.");
    if (!Number.isFinite(numAmount) || numAmount < 1)
      return setError("Amount must be at least $1.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/smileandpay/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: finalService,
          amount: numAmount,
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start payment.");
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start payment.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-kuwex-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kuwex-cyan/30 bg-kuwex-cyan/5 text-kuwex-cyan text-xs font-semibold uppercase tracking-wider mb-5">
            <Lock size={12} />
            Secure Payment via Smile&Pay (ZB Bank)
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Pay for Your{" "}
            <span className="bg-gradient-to-r from-kuwex-cyan to-kuwex-blue bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Pay securely with EcoCash, InnBucks, OneMoney, Visa, Mastercard, and more. You&apos;ll be redirected to
            ZB Bank&apos;s secure Smile&amp;Pay gateway to complete your transaction.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,360px] gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-[#0F1114]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
              <select
                value={serviceLabel}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
              >
                {SERVICE_PRESETS.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                    {s.amount > 0 ? ` — $${s.amount}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {isCustom && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe the service
                </label>
                <input
                  type="text"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="e.g. Logo redesign for Acme Co."
                  className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tinashe Moyo"
                  className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+263 77 123 4567"
                  className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-kuwex-cyan">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Receipt and payment confirmation will be sent here.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any details we should know..."
                className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50 focus:ring-1 focus:ring-kuwex-cyan/30 transition-all resize-none"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold py-4 rounded-xl text-base hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Redirecting to Smile&Pay...
                </>
              ) : (
                <>
                  Continue to Secure Payment
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <Lock size={11} />
              You&apos;ll be redirected to ZB Bank&apos;s Smile&amp;Pay gateway
            </p>
          </motion.form>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-[#0F1114]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-kuwex-cyan" />
                Accepted Methods
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-gray-300">
                  <Smartphone size={16} className="text-green-400" /> EcoCash
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Smartphone size={16} className="text-orange-400" /> InnBucks
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Smartphone size={16} className="text-yellow-400" /> OneMoney
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CreditCard size={16} className="text-blue-400" /> Visa / Mastercard
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CreditCard size={16} className="text-purple-400" /> ZimSwitch
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Smartphone size={16} className="text-cyan-400" /> SmileCash
                </li>
              </ul>
            </div>

            <div className="bg-[#0F1114]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Shield size={16} className="text-kuwex-cyan" />
                Secure &amp; Verified
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Payments processed by ZB Bank via Smile&amp;Pay (RBZ-licensed).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>PCI-DSS compliant with end-to-end encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>We never see or store your card or mobile money PIN.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Receipt emailed instantly upon successful payment.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-2">Need help?</h3>
              <p className="text-xs text-gray-400 mb-3">
                Not sure which package is right for you? Talk to us first.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm text-kuwex-cyan font-semibold hover:text-white transition-colors"
              >
                Contact Us <ArrowRight size={14} />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
