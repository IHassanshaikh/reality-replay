"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import {
  Mail,
  Instagram,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Clock,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Feedback & Product Ideas");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, subject, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-xs font-mono font-bold text-primary">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-main">
              Let&apos;s Connect
            </h1>
            <p className="text-sm sm:text-base text-text-body leading-relaxed">
              Have questions about Reality Replay, feedback on the AI simulation engine, or want to collaborate with creator Hassan Shaikh? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
                <h3 className="font-heading font-extrabold text-xl text-text-main">
                  Direct Channels
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Email */}
                  <a
                    href="mailto:hassanshaikh9717@gmail.com"
                    className="p-4 rounded-xl border border-border bg-background hover:border-primary transition-all flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block font-bold">
                        Personal Email
                      </span>
                      <span className="font-heading font-bold text-text-main group-hover:text-primary transition-colors">
                        hassanshaikh9717@gmail.com
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">
                        Expect a response within 24 hours.
                      </p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/hassan.techlife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-border bg-background hover:border-pink-500/60 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block font-bold">
                        Instagram
                      </span>
                      <span className="font-heading font-bold text-text-main group-hover:text-pink-600 transition-colors">
                        @hassan.techlife
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">
                        Follow updates on tech, code, and new releases.
                      </p>
                    </div>
                  </a>
                </div>

                {/* Quick Info Badges */}
                <div className="pt-4 border-t border-border space-y-2 text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Response Time: Typically under 1 business day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal" />
                    <span>Open to Hackathon feedback & Product collaborations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-7 bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-subtle">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-text-main">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-text-body max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Hassan has received your inquiry and will follow up with you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading font-bold text-xs uppercase tracking-wider text-text-main mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                        placeholder="Alex Morgan"
                      />
                    </div>

                    <div>
                      <label className="block font-heading font-bold text-xs uppercase tracking-wider text-text-main mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                        placeholder="alex@domain.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading font-bold text-xs uppercase tracking-wider text-text-main mb-1.5">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                      >
                        <option>Feedback & Product Ideas</option>
                        <option>Hackathon & Judging Inquiry</option>
                        <option>Feature Request / AI Simulation</option>
                        <option>Collaboration / Press</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-heading font-bold text-xs uppercase tracking-wider text-text-main mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                        placeholder="e.g. Thoughts on branching mechanics"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading font-bold text-xs uppercase tracking-wider text-text-main mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-medium leading-relaxed"
                      placeholder="Share your thoughts, suggestions, or feedback here..."
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-mono">
                      Sent directly to hassanshaikh9717@gmail.com
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-extrabold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle disabled:opacity-50 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-sky" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-sky" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
