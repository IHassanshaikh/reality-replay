"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_PRIORITIES } from "@/lib/constants/default-priorities";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Shield,
  TrendingUp,
  Compass,
  BookOpen,
  HeartPulse,
  Users,
  Coins,
  Loader2,
  HelpCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Coins: <Coins className="w-4 h-4" />,
};

export function DecisionWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [decision, setDecision] = useState(
    "Should I stay in my current job, join an early-stage startup, or build my own SaaS product?"
  );
  const [options, setOptions] = useState([
    { id: "opt_1", label: "Option A", text: "Stay in current job & seek internal promotion" },
    { id: "opt_2", label: "Option B", text: "Join an early-stage venture-backed startup" },
    { id: "opt_3", label: "Option C", text: "Bootstrap an independent SaaS product" },
  ]);
  const [currentSituation, setCurrentSituation] = useState(
    "Mid-level software engineer with 4 years experience, steady income, and 6 months emergency savings."
  );
  const [constraints, setConstraints] = useState(
    "Need to maintain at least \$3,000/mo income within 9 months; family health insurance."
  );
  const [timeHorizon, setTimeHorizon] = useState("3 years");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Financial stability",
    "Personal freedom & autonomy",
    "Learning opportunities",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add / Remove options
  const handleAddOption = () => {
    if (options.length >= 4) return;
    const labelChar = String.fromCharCode(65 + options.length);
    setOptions([
      ...options,
      { id: `opt_${Date.now()}`, label: `Option ${labelChar}`, text: "" },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const updated = options.filter((_, idx) => idx !== index);
    setOptions(
      updated.map((opt, idx) => ({
        ...opt,
        label: `Option ${String.fromCharCode(65 + idx)}`,
      }))
    );
  };

  const handleOptionChange = (index: number, text: string) => {
    const updated = [...options];
    updated[index].text = text;
    setOptions(updated);
  };

  const togglePriority = (label: string) => {
    if (selectedPriorities.includes(label)) {
      setSelectedPriorities(selectedPriorities.filter((p) => p !== label));
    } else {
      if (selectedPriorities.length < 3) {
        setSelectedPriorities([...selectedPriorities, label]);
      }
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        decision,
        options,
        context: {
          currentSituation,
          constraints: constraints
            .split(";")
            .map((c) => c.trim())
            .filter(Boolean),
          timeHorizon,
        },
        priorities: selectedPriorities,
      };

      const res = await fetch("/api/replays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate replay");
      }

      router.push(`/replay/${data.replay.id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred while generating scenarios.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text-main mt-0.5">
              {currentStep === 1 && "Describe your decision"}
              {currentStep === 2 && "Define your options"}
              {currentStep === 3 && "Provide your personal context"}
              {currentStep === 4 && "Define your personal priorities"}
            </h1>
          </div>
          <span className="text-sm font-mono text-text-muted">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Step Form Card (2 Columns) */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}

          {/* STEP 1: Describe Decision */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block font-heading font-semibold text-sm text-text-main mb-2">
                  What decision would you like to explore?
                </label>
                <textarea
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base leading-relaxed resize-none"
                  placeholder="e.g. I am considering leaving my current corporate tech role to start an AI agent agency."
                />
                <p className="text-xs text-text-muted mt-2">
                  Tip: Framing this as a genuine fork in the road gives the AI Scenario Engine richer context to project meaningful trade-offs.
                </p>
              </div>

              {/* Sample Decision Injections */}
              <div className="pt-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2 font-semibold">
                  Or pick a sample dilemma:
                </span>
                <div className="space-y-2">
                  {[
                    "Should I focus on university, accept a startup internship, or build my own product?",
                    "Should I relocate to San Francisco or stay in my current city to build remotely?",
                    "Should I pursue a Master's degree in Machine Learning or join an AI lab as an engineer?",
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDecision(sample)}
                      className="w-full text-left p-3 rounded-xl border border-border bg-background hover:bg-sky-soft/60 text-xs text-text-body transition-colors"
                    >
                      "{sample}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Define Options */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-sm text-text-main">
                    Enter the distinct paths you are weighing (2 to 4 options)
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Each choice will generate a dedicated timeline of events, challenges, and outcomes.
                  </p>
                </div>
                {options.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background hover:bg-sky-soft border border-border text-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Option</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className="p-4 rounded-xl border border-border bg-background space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary-light text-primary">
                        {opt.label}
                      </span>
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="text-text-muted hover:text-rose-600 transition-colors p-1"
                          title="Remove option"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Describe ${opt.label}...`}
                      className="w-full px-3.5 py-2 rounded-lg border border-border bg-surface text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Context & Constraints */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block font-heading font-semibold text-sm text-text-main mb-1.5">
                  Current Situation & Background
                </label>
                <textarea
                  value={currentSituation}
                  onChange={(e) => setCurrentSituation(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="e.g. Currently employed, have 6 months runway, supportive partner..."
                />
              </div>

              <div>
                <label className="block font-heading font-semibold text-sm text-text-main mb-1.5">
                  Major Constraints or Commitments (Separate with semicolons)
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. Visa requirements; strict monthly rent; limited time"
                />
              </div>

              <div>
                <label className="block font-heading font-semibold text-sm text-text-main mb-1.5">
                  Time Horizon
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["1 year", "3 years", "5 years"].map((hz) => (
                    <button
                      key={hz}
                      type="button"
                      onClick={() => setTimeHorizon(hz)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                        timeHorizon === hz
                          ? "border-primary bg-primary text-white shadow-subtle"
                          : "border-border bg-background text-text-body hover:border-secondary/40"
                      }`}
                    >
                      {hz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Personal Priorities */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-sm text-text-main">
                  What matters most in this decision? (Select up to 3)
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  These priorities anchor the qualitative comparison and scenario trade-off scores.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEFAULT_PRIORITIES.map((priority) => {
                  const isSelected = selectedPriorities.includes(priority.label);
                  return (
                    <div
                      key={priority.id}
                      onClick={() => togglePriority(priority.label)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary-light/50 ring-1 ring-primary shadow-subtle"
                          : "border-border bg-background hover:border-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-primary">
                          {ICON_MAP[priority.iconName]}
                          <span className="font-heading font-semibold text-xs text-text-main">
                            {priority.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-text-body leading-relaxed">
                        {priority.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-body hover:bg-background border border-border transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all active:scale-[0.98]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-sky" />
                    <span>Replaying Your Decision...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-sky" />
                    <span>Replay My Decision</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Live Preview Panel (Right Column) */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>Simulation Blueprint</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-text-muted">Target Decision:</span>
                <p className="font-heading font-semibold text-sm text-text-main line-clamp-2 mt-0.5">
                  {decision || "Not specified yet"}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-text-muted">Options ({options.length}):</span>
                <div className="space-y-1.5 mt-1">
                  {options.map((opt, i) => (
                    <div
                      key={i}
                      className="text-xs p-2 rounded-lg bg-background border border-border text-text-body line-clamp-1"
                    >
                      <strong className="text-primary font-mono mr-1.5">{opt.label}:</strong>
                      {opt.text || "Empty..."}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-text-muted">Priorities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedPriorities.map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-sky-soft text-primary font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-background border border-border text-[11px] text-text-muted leading-relaxed mt-6">
            <span className="font-semibold text-text-body block mb-0.5">How it works:</span>
            The AI Scenario Engine takes your choices and projects 3 divergent paths across Month 3, Year 1, and Year 3, identifying key assumptions and branch points.
          </div>
        </div>
      </div>
    </div>
  );
}
