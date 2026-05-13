"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  Mail,
} from "lucide-react";

interface StatusResponse {
  reference: string;
  amount: number;
  paid_amount: number;
  status: string;
  service: string;
  customer: string;
  updated_at: string;
}

function PayReturnInner() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polls, setPolls] = useState(0);

  const fetchStatus = useCallback(async () => {
    if (!ref) {
      setError("Missing payment reference.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/paynow/status?ref=${encodeURIComponent(ref)}`, {
        cache: "no-store",
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Could not retrieve status");
      setData(j);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not retrieve status");
    } finally {
      setLoading(false);
    }
  }, [ref]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Auto-poll every 4s while still pending, up to 15 times (~1 min)
  useEffect(() => {
    if (!data) return;
    if (data.status === "paid") return;
    if (polls >= 15) return;
    const t = setTimeout(() => {
      setPolls((n) => n + 1);
      fetchStatus();
    }, 4000);
    return () => clearTimeout(t);
  }, [data, polls, fetchStatus]);

  const isPaid = data?.status === "paid";
  const isFailed = data?.status === "draft" && polls >= 15;

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl ${
            isPaid ? "bg-green-500/10" : isFailed ? "bg-red-500/10" : "bg-kuwex-cyan/10"
          }`}
        />
      </div>

      <div className="relative max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F1114]/80 backdrop-blur-sm border border-[#2F3336]/60 rounded-3xl p-8 sm:p-10"
        >
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 text-kuwex-cyan animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Checking payment status...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
              <p className="text-gray-400 mb-6">{error}</p>
              <Link
                href="/pay"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all"
              >
                Try Again <ArrowRight size={16} />
              </Link>
            </div>
          ) : isPaid ? (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 mb-5"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Payment Received</h1>
              <p className="text-gray-400 mb-8">
                Thank you for your payment. A receipt has been sent to your email.
              </p>
              <DetailsBlock data={data!} />
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-kuwex-cyan to-kuwex-blue text-black font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all"
                >
                  Back to Home <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-[#2F3336] text-white font-semibold px-6 py-3 rounded-xl hover:border-kuwex-cyan/50 transition-all"
                >
                  <Mail size={16} /> Contact Us
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-kuwex-cyan/10 border border-kuwex-cyan/30 mb-5"
              >
                <Clock className="w-10 h-10 text-kuwex-cyan" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Confirming Your Payment
              </h1>
              <p className="text-gray-400 mb-8">
                We&apos;re awaiting confirmation from Paynow. This page refreshes automatically.
              </p>
              {data && <DetailsBlock data={data} />}
              <button
                onClick={() => {
                  setPolls(0);
                  fetchStatus();
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm text-kuwex-cyan hover:text-white transition-colors"
              >
                <RefreshCw size={14} /> Check again
              </button>
              {isFailed && (
                <p className="mt-6 text-xs text-gray-500">
                  Still no confirmation? Your payment may not have completed. You can{" "}
                  <Link href="/pay" className="text-kuwex-cyan hover:underline">
                    try again
                  </Link>{" "}
                  or <Link href="/contact" className="text-kuwex-cyan hover:underline">contact us</Link>.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function DetailsBlock({ data }: { data: StatusResponse }) {
  return (
    <div className="text-left bg-[#16181C]/60 border border-[#2F3336]/60 rounded-2xl p-5 space-y-3">
      <Row label="Reference" value={data.reference} mono />
      <Row label="Service" value={data.service} />
      <Row label="Customer" value={data.customer} />
      <Row label="Amount" value={`$${data.amount.toLocaleString()}`} />
      <Row
        label="Paid"
        value={`$${data.paid_amount.toLocaleString()}`}
        highlight={data.paid_amount >= data.amount}
      />
      <Row label="Status" value={data.status.toUpperCase()} highlight={data.status === "paid"} />
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span
        className={`${mono ? "font-mono" : ""} ${
          highlight ? "text-green-400 font-semibold" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function PayReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white pt-32 pb-24 px-4 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-kuwex-cyan animate-spin" />
        </main>
      }
    >
      <PayReturnInner />
    </Suspense>
  );
}
