"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  HelpCircle,
  AlertTriangle,
  Flame,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Mail,
  Instagram,
  ArrowUpRight,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { Footer } from "../shared/Footer";

// Dilemma Archetypes for the interactive explorer
const EXPLORATION_PREVIEWS = [
  {
    id: "career",
    label: "Career Crossroads",
    tagline: "Corporate Stability vs. Early-Stage Equity vs. Indie Bootstrapping",
    decision: "Should I stay at my senior engineer position or leave to start a venture?",
    paths: [
      {
        title: "Path A · The Corporate Fortress",
        badge: "Low Uncertainty",
        badgeColor: "bg-emerald-100 text-emerald-800",
        m3: "Staff architecture review passed; predictable salary + bonus",
        y1: "Promoted to Staff; 70% calendar spent in design meetings",
        y3: "$340k total compensation, golden vesting, creative restlessness",
      },
      {
        title: "Path B · The Venture Crucible",
        badge: "Higher Uncertainty",
        badgeColor: "bg-rose-100 text-rose-800",
        m3: "60 customer discovery calls; 1st paid enterprise pilot",
        y1: "Closing $1.8M seed round; hiring first 2 backend engineers",
        y3: "$1.4M ARR, 14-person team, 40% equity worth $6M on paper",
      },
      {
        title: "Path C · The 4-Day Hedged Studio",
        badge: "Moderate Uncertainty",
        badgeColor: "bg-amber-100 text-amber-800",
        m3: "Negotiated 80% salary; protected Fridays building prototype",
        y1: "$3k MRR cashflow before resigning with zero panic",
        y3: "Profitable $40k/mo solo studio, 100% time and location sovereignty",
      },
    ],
  },
  {
    id: "relocation",
    label: "Global Relocation",
    tagline: "Silicon Valley In-Person vs. Zurich AI Lab vs. London Remote",
    decision: "Should I relocate to San Francisco for network density or build remotely in Europe?",
    paths: [
      {
        title: "Path A · San Francisco Density",
        badge: "Moderate Uncertainty",
        badgeColor: "bg-amber-100 text-amber-800",
        m3: "Living in Hayes Valley; meeting founders 4 nights a week",
        y1: "Angel round closed from tier-1 scout network in coffee shops",
        y3: "Core Silicon Valley insider network; high living cost overhead",
      },
      {
        title: "Path B · European Remote Studio",
        badge: "Lower Uncertainty",
        badgeColor: "bg-emerald-100 text-emerald-800",
        m3: "Low burn rate; focused 6-hour deep work days without city noise",
        y1: "Global customer base; higher net savings despite lower headline revenue",
        y3: "High lifestyle freedom, balanced wellbeing, occasional travel bursts",
      },
    ],
  },
  {
    id: "education",
    label: "Degree vs. Building",
    tagline: "Elite Master's / PhD vs. Immediate Commercial Shipping",
    decision: "Should I pursue a specialized AI Master's degree or ship indie products full-time?",
    paths: [
      {
        title: "Path A · Academic Specialization",
        badge: "Lower Uncertainty",
        badgeColor: "bg-emerald-100 text-emerald-800",
        m3: "Coursework in distributed training; research lab fellowship",
        y1: "First tier-1 symposium submission; high academic recognition",
        y3: "Top-tier AI residency offer; deep mathematical foundation",
      },
      {
        title: "Path B · Direct Indie Shipping",
        badge: "Higher Uncertainty",
        badgeColor: "bg-rose-100 text-rose-800",
        m3: "3 failed micro-apps before discovering customer willingness to pay",
        y1: "Break-even at $4,500 MRR; full-stack marketing & sales mastery",
        y3: "Sovereign creator brand; direct relationship with 600 subscribers",
      },
    ],
  },
];

const FAQS = [
  {
    q: "Does Reality Replay claim to predict my actual future?",
    a: "No. Reality Replay is explicitly an exploratory decision simulator, not a predictive forecast. In life, unpredictable external events always occur. The engine helps you think through non-obvious second-order consequences, examine fragile assumptions, and compare trade-offs before taking irreversible action.",
  },
  {
    q: "Why does Reality Replay reject fake probability percentages?",
    a: "Standard generative AI cannot compute the true statistical probability of your personal future from a 3-paragraph prompt. Claims like '78% chance of success' are deceptive pseudo-science. Reality Replay uses honest qualitative uncertainty bands (Lower, Moderate, Higher) based on the number of unproven assumptions in the scenario.",
  },
  {
    q: "What is the signature 'Explore This Moment' branching tree?",
    a: "When viewing any milestone event (e.g. at Year 1), you can click 'Explore this moment' to introduce a new dilemma. The engine projects divergent child branches directly from that milestone, letting you navigate an evolving tree of possibilities.",
  },
  {
    q: "How does the AI personalize scenarios to my specific background?",
    a: "In Step 1 of the Decision Builder, you specify your profession, industry, experience level, financial runway, and risk profile. In Step 3, you answer targeted diagnostic questions (such as your worst-case fear and core motivation). Google Gemini 2.5 Flash incorporates these exact constraints into every milestone.",
  },
  {
    q: "Is my personal decision data private?",
    a: "Yes. Your decisions are private by default. They are never published in public search feeds or shared with advertisers. You can permanently delete any replay from your Dashboard at any time.",
  },
];

export function LandingView() {
  const [activeHeroPath, setActiveHeroPath] = useState<"a" | "b" | "c">("b");
  const [selectedArchetype, setSelectedArchetype] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* 1. EXPANSIVE HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 border-b border-border bg-gradient-to-b from-surface via-background to-background">
        {/* Subtle Ambient Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-sky/40 via-teal-light/30 to-lavender-light/30 blur-3xl pointer-events-none rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Value Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs font-mono font-bold text-primary shadow-subtle">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DECISION EXPLORATION ENGINE · POWERED BY GEMINI 2.5</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-main tracking-tight leading-[1.12]">
                Every decision opens a{" "}
                <span className="text-primary underline decoration-teal decoration-wavy underline-offset-8">
                  different timeline
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-text-body max-w-xl leading-relaxed">
                Don&apos;t just ask what will happen. Explore what could happen. Reality Replay maps your choices across <strong>Month 3</strong>, <strong>Year 1</strong>, and <strong>Year 3</strong>, testing your assumptions and letting you branch whenever a new crossroad appears.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/replay/new"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-extrabold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow transition-all active:scale-[0.98]"
                >
                  <span>Replay Your Decision</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/replay/replay_showcase_career_choice"
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl font-heading font-bold text-sm bg-surface hover:bg-sky-soft/80 border border-border text-text-main shadow-subtle transition-all"
                >
                  <Sparkles className="w-4 h-4 text-teal" />
                  <span>Launch Showcase Demo</span>
                </Link>
              </div>

              {/* Verified Metrics / Trust Banner */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs text-text-muted font-mono font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Personal Bio Grounding</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recursive Branching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Fake Probabilities</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Interactive Live Simulation Sandbox */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="bg-surface rounded-3xl border border-border shadow-card p-6 sm:p-7 relative overflow-hidden ring-1 ring-border/50">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-text-main">
                      Interactive Possibility Canvas
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted font-semibold">
                    Sample: Career Crossroads
                  </span>
                </div>

                {/* Path Selector Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    onClick={() => setActiveHeroPath("a")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
                      activeHeroPath === "a"
                        ? "bg-[#1B3B6F] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path A: University
                  </button>
                  <button
                    onClick={() => setActiveHeroPath("b")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
                      activeHeroPath === "b"
                        ? "bg-[#1E8276] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path B: Startup
                  </button>
                  <button
                    onClick={() => setActiveHeroPath("c")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold font-heading transition-all ${
                      activeHeroPath === "c"
                        ? "bg-[#6D64A8] text-white shadow-subtle"
                        : "bg-background text-text-body hover:bg-sky-soft"
                    }`}
                  >
                    Path C: Product
                  </button>
                </div>

                {/* Simulated Milestone Stream */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroPath}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border"
                  >
                    {/* Milestone 1: Month 3 */}
                    <div className="relative group cursor-pointer">
                      <span
                        className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                          activeHeroPath === "a"
                            ? "bg-[#1B3B6F]"
                            : activeHeroPath === "b"
                            ? "bg-[#1E8276]"
                            : "bg-[#6D64A8]"
                        }`}
                      />
                      <div className="p-4 rounded-xl border border-border bg-background group-hover:border-primary/40 transition-colors shadow-subtle space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-text-muted font-bold">Month 3</span>
                          <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                            Early Calibration
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-xs text-text-main">
                          {activeHeroPath === "a" && "Deep Research Rhythm & Academic Honors"}
                          {activeHeroPath === "b" && "Shipping Core Production Microservices"}
                          {activeHeroPath === "c" && "MVP Launch & First 10 Paying Subscribers"}
                        </h4>
                        <p className="text-[11px] text-text-body line-clamp-1">
                          {activeHeroPath === "a" && "Co-author paper; 3.9+ GPA maintained in faculty lab."}
                          {activeHeroPath === "b" && "High iteration velocity; real incident triage experience."}
                          {activeHeroPath === "c" && "$420 MRR on Product Hunt; initial customer feedback loops."}
                        </p>
                      </div>
                    </div>

                    {/* Milestone 2: Year 1 */}
                    <div className="relative group cursor-pointer">
                      <span
                        className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                          activeHeroPath === "a"
                            ? "bg-[#1B3B6F]"
                            : activeHeroPath === "b"
                            ? "bg-[#1E8276]"
                            : "bg-[#6D64A8]"
                        }`}
                      />
                      <div className="p-4 rounded-xl border-2 border-primary/40 bg-primary-light/40 group-hover:border-primary transition-colors shadow-subtle space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-primary font-extrabold flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            Year 1 · Branching Crossroads
                          </span>
                          <span className="text-primary text-[10px] font-bold bg-white px-2 py-0.2 rounded border border-primary/20">
                            Explorable Point
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-xs text-text-main">
                          {activeHeroPath === "a" && "Conference Paper Spotlight & Direct R&D Inbound"}
                          {activeHeroPath === "b" && "Series A Lead Engineer with 1.2% Equity Grant"}
                          {activeHeroPath === "c" && "$6,500 MRR & Customer Acquisition Squeeze"}
                        </h4>
                        <p className="text-[11px] text-text-body line-clamp-1">
                          {activeHeroPath === "a" && "International fellowships open; academic prestige consolidates."}
                          {activeHeroPath === "b" && "High performance rewarded; heavy sprint pressure."}
                          {activeHeroPath === "c" && "Organic growth slows; dilemma whether to hire or stay solo."}
                        </p>
                      </div>
                    </div>

                    {/* Milestone 3: Year 3 */}
                    <div className="relative group cursor-pointer">
                      <span
                        className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                          activeHeroPath === "a"
                            ? "bg-[#1B3B6F]"
                            : activeHeroPath === "b"
                            ? "bg-[#1E8276]"
                            : "bg-[#6D64A8]"
                        }`}
                      />
                      <div className="p-4 rounded-xl border border-border bg-background group-hover:border-primary/40 transition-colors shadow-subtle space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-text-muted font-bold">Year 3</span>
                          <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.2 rounded border border-amber-200">
                            Structural Compounding
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-xs text-text-main">
                          {activeHeroPath === "a" && "Summa Cum Laude Graduation & Elite Lab Residency"}
                          {activeHeroPath === "b" && "Senior Operator at 40-Person Scaling Scale-Up"}
                          {activeHeroPath === "c" && "$28,000 MRR Sovereign Independent Studio"}
                        </h4>
                        <p className="text-[11px] text-text-body line-clamp-1">
                          {activeHeroPath === "a" && "High institutional prestige; zero entrepreneurial equity."}
                          {activeHeroPath === "b" && "Substantial equity valuation; high chronic stress."}
                          {activeHeroPath === "c" && "True 20-hour workweek freedom; platform risk to manage."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer preview note */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
                  <span className="font-mono">React Flow graph with bezier edges</span>
                  <Link
                    href="/replay/replay_showcase_career_choice"
                    className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Full Graph Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VALUE COMPARISON: CHATBOTS VS REALITY REPLAY */}
      <section className="py-20 lg:py-28 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Paradigm Shift
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
              Why Decision Exploration Beats Single Answers
            </h2>
            <p className="text-sm text-text-body">
              How Reality Replay differs fundamentally from standard generative chatbots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Standard Chatbot */}
            <div className="p-8 rounded-3xl border border-border bg-background shadow-card space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-mono font-bold">
                  <span>TRADITIONAL CHATBOT</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-text-main">
                  &ldquo;Here is the one thing you should do...&rdquo;
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-text-body">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold mt-0.5">✕</span>
                    <span>Outputs a single wall of text declaring a recommended path.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold mt-0.5">✕</span>
                    <span>Fabricates fake percentages (e.g. &ldquo;78% probability of success&rdquo;).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold mt-0.5">✕</span>
                    <span>Hides the assumptions needed for the scenario to survive.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold mt-0.5">✕</span>
                    <span>Static response with no way to branch or explore turning points.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-rose-800 font-medium">
                Result: False confidence without understanding trade-offs.
              </div>
            </div>

            {/* Reality Replay */}
            <div className="p-8 rounded-3xl border-2 border-primary/40 bg-gradient-to-b from-primary-light/30 to-surface shadow-hover space-y-6 flex flex-col justify-between ring-1 ring-primary/20">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>REALITY REPLAY</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-text-main">
                  &ldquo;Here is how different choices could unfold...&rdquo;
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-text-body">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary font-bold mt-0.5 flex-shrink-0" />
                    <span>Projects multiple parallel timelines across Month 3, Year 1, and Year 3.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary font-bold mt-0.5 flex-shrink-0" />
                    <span>Transparent uncertainty ratings (Lower, Moderate, Higher) with explicit reasons.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary font-bold mt-0.5 flex-shrink-0" />
                    <span>Interrogates assumptions: explicitly surfaces what needs to be true.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary font-bold mt-0.5 flex-shrink-0" />
                    <span>Recursive branching graph: click any milestone to spawn child decisions.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-primary-light border border-primary/20 text-xs text-primary font-bold">
                Result: Genuine clarity, stress-tested fears, and trade-off literacy.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE EXPLORATION ARCHETYPES */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Real-World Archetypes
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
              Explore Common Forks in the Road
            </h2>
            <p className="text-sm text-text-body">
              See how Reality Replay structures complex multi-year choices across different life domains.
            </p>
          </div>

          {/* Archetype Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {EXPLORATION_PREVIEWS.map((arch, idx) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetype(idx)}
                className={`px-5 py-2.5 rounded-xl font-heading text-xs font-extrabold transition-all ${
                  selectedArchetype === idx
                    ? "bg-primary text-white shadow-subtle scale-105"
                    : "bg-surface border border-border text-text-body hover:border-secondary/50"
                }`}
              >
                {arch.label}
              </button>
            ))}
          </div>

          {/* Active Archetype Card */}
          <div className="bg-surface rounded-3xl border border-border shadow-card p-6 sm:p-10 space-y-8">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                {EXPLORATION_PREVIEWS[selectedArchetype].tagline}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-text-main">
                &ldquo;{EXPLORATION_PREVIEWS[selectedArchetype].decision}&rdquo;
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXPLORATION_PREVIEWS[selectedArchetype].paths.map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl border border-border bg-background space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-text-main">
                        {p.title}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs pt-2">
                      <div className="p-2.5 rounded-lg bg-surface border border-border">
                        <strong className="text-text-main block mb-0.5">Month 3:</strong>
                        <span className="text-text-body">{p.m3}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface border border-border">
                        <strong className="text-text-main block mb-0.5">Year 1:</strong>
                        <span className="text-text-body">{p.y1}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface border border-border">
                        <strong className="text-text-main block mb-0.5">Year 3:</strong>
                        <span className="text-text-body">{p.y3}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/replay/new"
                    className="text-xs font-heading font-bold text-primary hover:underline inline-flex items-center gap-1 pt-2"
                  >
                    <span>Simulate your version</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 3 LAYERS OF REALITY REPLAY */}
      <section className="py-20 lg:py-28 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Full Spectrum Architecture
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
              Engineered Across Three Core Layers
            </h2>
            <p className="text-sm text-text-body">
              From guided decision formulation to deep recursive graph branching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layer A */}
            <div className="p-8 rounded-3xl border border-border bg-background shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-heading font-extrabold text-base shadow-subtle">
                A
              </div>
              <h3 className="font-heading font-extrabold text-xl text-text-main">
                The Essential Experience
              </h3>
              <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                4-step guided builder collecting your background bio, decision choices, financial runway, and top personal priorities, backed by an interactive React Flow timeline canvas.
              </p>
              <ul className="space-y-1.5 text-xs text-text-body pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span>3-horizon projections (Month 3, Year 1, Year 3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span>Clickable milestone inspection drawer</span>
                </li>
              </ul>
            </div>

            {/* Layer B */}
            <div className="p-8 rounded-3xl border border-border bg-background shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1E8276] text-white flex items-center justify-center font-heading font-extrabold text-base shadow-subtle">
                B
              </div>
              <h3 className="font-heading font-extrabold text-xl text-text-main">
                The Intelligence Layer
              </h3>
              <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                Replaces fake probabilities with qualitative uncertainty bands, interrogates fragile assumptions, and highlights catalysts with &ldquo;What Could Change Everything?&rdquo;
              </p>
              <ul className="space-y-1.5 text-xs text-text-body pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal" />
                  <span>Assumption editing & fragility testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal" />
                  <span>Stress-testing worst-case fears</span>
                </li>
              </ul>
            </div>

            {/* Layer C */}
            <div className="p-8 rounded-3xl border border-border bg-background shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6D64A8] text-white flex items-center justify-center font-heading font-extrabold text-base shadow-subtle">
                C
              </div>
              <h3 className="font-heading font-extrabold text-xl text-text-main">
                Recursive Branching Graph
              </h3>
              <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                Click &ldquo;Explore this moment&rdquo; on any milestone to formulate a child dilemma and generate new divergent sub-branches connected with bezier curves.
              </p>
              <ul className="space-y-1.5 text-xs text-text-body pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lavender" />
                  <span>Recursive child scenarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lavender" />
                  <span>Side-by-side priority trade-off matrix</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQS */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface overflow-hidden transition-all shadow-subtle"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-text-main hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-text-body leading-relaxed border-t border-border/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HIGH-IMPACT FINAL CTA */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary-light/40 via-surface to-sky-soft/40 p-8 sm:p-14 text-center space-y-6 shadow-glow relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-subtle">
              <Compass className="w-7 h-7 text-sky animate-spin" style={{ animationDuration: "16s" }} />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
                Explore your next chapter before choosing it.
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                Take the decision keeping you up at night, define two or three paths, and walk through their hypothetical consequences in minutes.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/replay/new"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-extrabold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow transition-all active:scale-[0.98]"
              >
                <span>Create Your First Replay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-heading font-bold text-sm bg-surface border border-border text-text-main hover:bg-background transition-colors"
              >
                <span>View Decision Library</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
