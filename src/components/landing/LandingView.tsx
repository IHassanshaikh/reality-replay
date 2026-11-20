"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  Compass,
  SlidersHorizontal,
  CheckCircle2,
  TrendingUp,
  Shield,
  Layers,
  Zap,
} from "lucide-react";

export function LandingView() {
  const [activeHeroPath, setActiveHeroPath] = useState<"a" | "b" | "c">("b");

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-border bg-gradient-to-b from-background via-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-soft border border-sky/80 text-xs font-mono font-medium text-primary">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AN INTERACTIVE DECISION EXPLORER</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-main tracking-tight leading-[1.12]">
                Every decision opens a{" "}
                <span className="text-primary underline decoration-sky decoration-wavy underline-offset-8">
                  different timeline
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-text-body max-w-xl leading-relaxed">
                Explore the paths you didn't take. Discover alternative possibilities. Navigate through hypothetical futures across 3 months, 1 year, and 3 years—and branch whenever a new dilemma appears.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/replay/new"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow transition-all active:scale-[0.98]"
                >
                  <span>Create Your First Replay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/replay/replay_showcase_career_choice"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-heading font-semibold text-sm bg-surface hover:bg-sky-soft/60 border border-border text-text-main shadow-subtle transition-all"
                >
                  <Sparkles className="w-4 h-4 text-teal" />
                  <span>Explore Showcase Demo</span>
                </Link>
              </div>

              {/* Micro Metric Banner */}
              <div className="pt-6 border-t border-border/80 flex items-center gap-6 text-xs text-text-muted font-mono">
                <div>
                  <span className="font-bold text-text-main">3-Horizon</span> Projections
                </div>
                <div>•</div>
                <div>
                  <span className="font-bold text-text-main">Recursive</span> Branching
                </div>
                <div>•</div>
                <div>
                  <span className="font-bold text-text-main">Qualitative</span> Trade-offs
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Hero Timeline Preview */}
            <div className="lg:col-span-6">
              <div className="bg-surface rounded-3xl border border-border shadow-card p-6 relative overflow-hidden">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-text-main">
                      Interactive Simulation Canvas
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">
                    Decision: Career Dilemma
                  </span>
                </div>

                {/* Path Selector Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    onClick={() => setActiveHeroPath("a")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold font-heading transition-all ${
                      activeHeroPath === "a"
                        ? "bg-[#315B82] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path A: University
                  </button>
                  <button
                    onClick={() => setActiveHeroPath("b")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold font-heading transition-all ${
                      activeHeroPath === "b"
                        ? "bg-[#399C91] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path B: Startup
                  </button>
                  <button
                    onClick={() => setActiveHeroPath("c")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold font-heading transition-all ${
                      activeHeroPath === "c"
                        ? "bg-[#918AC7] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path C: Product
                  </button>
                </div>

                {/* Simulated Timeline Track */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {/* Milestone 1: Month 3 */}
                  <div className="relative group cursor-pointer">
                    <span
                      className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                        activeHeroPath === "a"
                          ? "bg-[#315B82]"
                          : activeHeroPath === "b"
                          ? "bg-[#399C91]"
                          : "bg-[#918AC7]"
                      }`}
                    />
                    <div className="p-3.5 rounded-xl border border-border bg-background group-hover:border-primary/40 transition-colors shadow-subtle">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-text-muted">Month 3</span>
                        <span className="text-emerald-700 font-medium">Early Calibration</span>
                      </div>
                      <h4 className="font-heading font-semibold text-xs text-text-main">
                        {activeHeroPath === "a" && "Deep Research Rhythm & Academic Honors"}
                        {activeHeroPath === "b" && "Shipping Production Microservices"}
                        {activeHeroPath === "c" && "MVP Launch & First 10 Paying Subscribers"}
                      </h4>
                    </div>
                  </div>

                  {/* Milestone 2: Year 1 */}
                  <div className="relative group cursor-pointer">
                    <span
                      className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                        activeHeroPath === "a"
                          ? "bg-[#315B82]"
                          : activeHeroPath === "b"
                          ? "bg-[#399C91]"
                          : "bg-[#918AC7]"
                      }`}
                    />
                    <div className="p-3.5 rounded-xl border-2 border-primary/30 bg-primary-light/30 group-hover:border-primary transition-colors shadow-subtle">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-primary font-bold">Year 1 · Branch Point</span>
                        <span className="text-primary font-medium flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          Explorable
                        </span>
                      </div>
                      <h4 className="font-heading font-semibold text-xs text-text-main">
                        {activeHeroPath === "a" && "Tier-1 Conference Acceptance & Direct Lab Offers"}
                        {activeHeroPath === "b" && "Series A Lead Engineer with 1.2% Equity Package"}
                        {activeHeroPath === "c" && "\$6,500 MRR & Customer Acquisition Squeeze"}
                      </h4>
                    </div>
                  </div>

                  {/* Milestone 3: Year 3 */}
                  <div className="relative group cursor-pointer">
                    <span
                      className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                        activeHeroPath === "a"
                          ? "bg-[#315B82]"
                          : activeHeroPath === "b"
                          ? "bg-[#399C91]"
                          : "bg-[#918AC7]"
                      }`}
                    />
                    <div className="p-3.5 rounded-xl border border-border bg-background group-hover:border-primary/40 transition-colors shadow-subtle">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-text-muted">Year 3</span>
                        <span className="text-amber-700 font-medium">Long-term Compounding</span>
                      </div>
                      <h4 className="font-heading font-semibold text-xs text-text-main">
                        {activeHeroPath === "a" && "Summa Cum Laude Graduation & Elite R&D Placement"}
                        {activeHeroPath === "b" && "Senior Operator at 40-Person Scaling Scale-Up"}
                        {activeHeroPath === "c" && "\$28,000 MRR Sovereign Independent Studio"}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Bottom preview note */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
                  <span>Interactive canvas powered by @xyflow/react</span>
                  <Link
                    href="/replay/replay_showcase_career_choice"
                    className="text-primary font-semibold hover:underline"
                  >
                    Open Live Simulation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW REALITY REPLAY WORKS */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              Core Architecture
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-main">
              How Reality Replay Works
            </h2>
            <p className="text-sm text-text-body">
              A structured scenario generation pipeline that turns single decisions into navigable possibility graphs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl border border-border bg-background shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                Describe Your Decision
              </h3>
              <p className="text-xs text-text-body leading-relaxed">
                Provide your dilemma, available options, personal context, and 3 key priorities. The AI captures your constraints rather than inventing facts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl border border-border bg-background shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                Explore Alternative Futures
              </h3>
              <p className="text-xs text-text-body leading-relaxed">
                Navigate interactive horizontal timelines across Month 3, Year 1, and Year 3. Inspect individual milestones, opportunities, and underlying assumptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl border border-border bg-background shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-lavender text-white flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                Branch & Discover Turning Points
              </h3>
              <p className="text-xs text-text-body leading-relaxed">
                Whenever a crossroad appears within a scenario, click "Explore this moment" to spawn recursive child branches and compare trade-offs side by side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS GRID */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              Intellectual Integrity
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-main">
              Built Different from Conversational AI
            </h2>
            <p className="text-sm text-text-body">
              Reality Replay never fabricates statistical certainty or tells you what to choose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-3">
              <Compass className="w-5 h-5 text-primary" />
              <h4 className="font-heading font-bold text-sm text-text-main">
                No Fake Probabilities
              </h4>
              <p className="text-xs text-text-body leading-relaxed">
                Replaces fabricated numbers with honest qualitative uncertainty bands (Lower, Moderate, Higher).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-3">
              <GitBranch className="w-5 h-5 text-teal" />
              <h4 className="font-heading font-bold text-sm text-text-main">
                Recursive Branching Graph
              </h4>
              <p className="text-xs text-text-body leading-relaxed">
                Click any milestone to create children scenarios, forming an explorable decision tree.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-3">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <h4 className="font-heading font-bold text-sm text-text-main">
                Assumption Explorer
              </h4>
              <p className="text-xs text-text-body leading-relaxed">
                Surfaces what needs to be true for each path to materialize so you can test fragility.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-3">
              <SlidersHorizontal className="w-5 h-5 text-lavender" />
              <h4 className="font-heading font-bold text-sm text-text-main">
                Trade-off Comparisons
              </h4>
              <p className="text-xs text-text-body leading-relaxed">
                Direct side-by-side matrices comparing your chosen priorities without declaring a winner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-border bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-subtle">
              <GitBranch className="w-4 h-4 text-sky" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-text-main block">
                Reality Replay
              </span>
              <span className="text-[11px] text-text-muted">
                Don't just ask what will happen. Explore what could happen.
              </span>
            </div>
          </div>

          <div className="text-xs text-text-muted max-w-md text-center md:text-right">
            Designed for reflection and decision exploration. Hypothetical scenario projections do not constitute professional, legal, or financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
