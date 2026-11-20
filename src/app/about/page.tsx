import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import {
  Compass,
  GitBranch,
  Sparkles,
  ShieldCheck,
  Mail,
  Instagram,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Reality Replay | The Vision & Philosophy",
  description:
    "Learn about Reality Replay, created by Hassan Shaikh. An AI-powered decision exploration platform mapping hypothetical multi-horizon futures instead of prescribing single answers.",
  openGraph: {
    title: "About Reality Replay — The Decision Exploration Platform",
    description: "Explore the philosophy and team behind Reality Replay.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-border bg-gradient-to-b from-surface via-background to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-xs font-mono font-bold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE REALITY REPLAY MANIFESTO</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-main tracking-tight leading-tight">
              Don&apos;t just ask what will happen. <br />
              <span className="text-primary underline decoration-teal decoration-wavy underline-offset-8">
                Explore what could happen.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-body max-w-2xl mx-auto leading-relaxed">
              Every major decision has multiple divergent paths. Once someone chooses one, the alternatives usually remain forever unexplored. Reality Replay was created to turn decisions into interactive, navigable possibility maps.
            </p>
          </div>
        </section>

        {/* The Core Contrast */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-surface shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                The Chatbot Illusion
              </h3>
              <p className="text-sm text-text-body leading-relaxed">
                Standard conversational AI tends to give confident, prescriptive answers: <em>&ldquo;You should choose Option B because the market is growing.&rdquo;</em> This creates a dangerous illusion of predictive certainty where none exists. Real life decisions are complex trade-offs, not single-answer trivia questions.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-primary/30 bg-primary-light/30 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                The Reality Replay Method
              </h3>
              <p className="text-sm text-text-body leading-relaxed">
                We believe in <strong>possibility exploration over prophetic claims</strong>. By projecting your choices across Month 3, Year 1, and Year 3, we surface the underlying assumptions, honest uncertainty bands, and latent turning points so you can think clearly for yourself.
              </p>
            </div>
          </div>
        </section>

        {/* Creator Profile */}
        <section className="py-16 bg-surface border-y border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 text-center md:text-left space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#1B3B6F] to-[#0D9488] text-white flex items-center justify-center font-heading font-extrabold text-3xl shadow-glow mx-auto md:mx-0">
                  HS
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-text-main">
                    Hassan Shaikh
                  </h3>
                  <span className="text-xs font-mono text-primary font-bold">
                    Creator & Lead Engineer · Reality Replay
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a
                    href="mailto:hassanshaikh9717@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-background border border-border text-text-body hover:text-primary hover:border-primary transition-all"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>hassanshaikh9717@gmail.com</span>
                  </a>
                  <a
                    href="https://instagram.com/hassan.techlife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-background border border-border text-text-body hover:text-primary hover:border-primary transition-all"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>hassan.techlife</span>
                  </a>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-sm text-text-body leading-relaxed">
                <p>
                  &ldquo;I designed Reality Replay because I was tired of AI tools pretending to know the future. When making career pivots or life crossroads, what people really need isn&apos;t another automated opinion—it is structured simulation.&rdquo;
                </p>
                <p>
                  Reality Replay combines high-speed structured generative AI (Google Gemini 2.5 Flash), graph topology algorithms, and the Quiet Futures visual identity to transform personal dilemmas into navigable timelines.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <span className="font-heading font-bold text-xs text-text-main block">100% Private</span>
                    <span className="text-[11px] text-text-muted">No public feeds or data selling</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <span className="font-heading font-bold text-xs text-text-main block">Gemini 2.5 Engine</span>
                    <span className="text-[11px] text-text-muted">Structured multi-horizon output</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl text-text-main">
            Ready to explore your own decision?
          </h2>
          <p className="text-sm text-text-body max-w-lg mx-auto">
            Input your dilemma, define your alternatives, and inspect three distinct timelines in under 30 seconds.
          </p>
          <div>
            <Link
              href="/replay/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow transition-all"
            >
              <span>Create Your Decision Replay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
