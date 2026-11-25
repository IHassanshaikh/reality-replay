"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_PRIORITIES } from "@/lib/constants/default-priorities";
import { saveClientReplay } from "@/lib/storage/client-replays";
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
  User,
  Briefcase,
  HelpCircle,
  AlertCircle,
  Clock,
  Flame,
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

const SUGGESTED_INTERESTS = [
  "Artificial Intelligence",
  "Building Products & Indie SaaS",
  "Career Leverage & Equity",
  "Financial Independence",
  "Writing & Public Creative Work",
  "Deep Tech & Robotics",
  "Leadership & Management",
  "Work-Life Balance & Wellness",
  "Philosophy & Decision Theory",
  "Global Mobility & Remote Work",
];

export function DecisionWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // STEP 1: User Bio & Background State
  const [occupation, setOccupation] = useState("Software Engineer & Systems Builder");
  const [industry, setIndustry] = useState("Technology & AI");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level (4-7 yrs)");
  const [interests, setInterests] = useState<string[]>([
    "Artificial Intelligence",
    "Building Products & Indie SaaS",
    "Financial Independence",
  ]);
  const [customInterest, setCustomInterest] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("Moderate (Calculated Risks)");
  const [financialRunway, setFinancialRunway] = useState("6-12 months");

  // STEP 2: The Decision & Options
  const [decision, setDecision] = useState(
    "Should I stay in my current job, join an early-stage startup, or build my own SaaS product?"
  );
  const [options, setOptions] = useState([
    { id: "opt_1", label: "Option A", text: "Stay in current job & seek internal promotion" },
    { id: "opt_2", label: "Option B", text: "Join an early-stage venture-backed startup" },
    { id: "opt_3", label: "Option C", text: "Bootstrap an independent SaaS product" },
  ]);

  // STEP 3: Replay Diagnostic Probes (Questions for this specific replay)
  const [primaryMotivation, setPrimaryMotivation] = useState(
    "Feeling that my current growth curve is flattening, and I want greater autonomy over my work."
  );
  const [worstCaseFear, setWorstCaseFear] = useState(
    "Running out of personal savings without achieving product-market fit or career momentum."
  );
  const [decisionWindow, setDecisionWindow] = useState("Next 30 to 60 days");
  const [stakeholdersImpacted, setStakeholdersImpacted] = useState(
    "Self and my partner (sharing living expenses)."
  );

  // STEP 4: Personal Priorities
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Financial stability",
    "Personal freedom & autonomy",
    "Learning opportunities",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Interest toggling
  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      if (interests.length < 5) {
        setInterests([...interests, item]);
      }
    }
  };

  const handleAddCustomInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customInterest.trim()) {
      e.preventDefault();
      if (!interests.includes(customInterest.trim()) && interests.length < 6) {
        setInterests([...interests, customInterest.trim()]);
        setCustomInterest("");
      }
    }
  };

  // Option adding & removing
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
          currentSituation: `${occupation} in ${industry} (${experienceLevel}). Runway: ${financialRunway}.`,
          resources: `Runway: ${financialRunway}. Risk profile: ${riskTolerance}.`,
          constraints: [
            `Worst case fear: ${worstCaseFear}`,
            `Decision window: ${decisionWindow}`,
            `Impacted: ${stakeholdersImpacted}`,
          ],
          timeHorizon: "3 years",
          relevantExperience: `${experienceLevel} in ${industry}`,
        },
        userProfile: {
          occupation,
          industry,
          experienceLevel,
          interests,
          riskTolerance,
          financialRunway,
        },
        diagnostics: {
          primaryMotivation,
          worstCaseFear,
          decisionWindow,
          stakeholdersImpacted,
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

      saveClientReplay(data.replay);
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
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-main mt-0.5">
              {currentStep === 1 && "Your Bio, Background & Interests"}
              {currentStep === 2 && "Describe Your Decision & Choices"}
              {currentStep === 3 && "Decision Diagnostics & Probe Questions"}
              {currentStep === 4 && "Define Your Priorities & Review"}
            </h1>
          </div>
          <span className="text-sm font-mono text-text-muted font-semibold">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
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
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
              {error}
            </div>
          )}

          {/* STEP 1: Bio & Interests */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-sky-soft/60 border border-border/80 flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-xs text-text-body">
                  <strong className="text-text-main block mb-0.5">Personalized AI Simulation Grounding:</strong>
                  Reality Replay uses your background, interests, and risk posture to project authentic career and life reverberations rather than generic templates.
                </div>
              </div>

              {/* Occupation & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    What do you do? (Role / Profession)
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="e.g. Lead Software Engineer, Product Designer, Student..."
                  />
                </div>

                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    Domain / Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="e.g. AI & SaaS, Fintech, Academia, Healthcare..."
                  />
                </div>
              </div>

              {/* Experience Level & Risk Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                  >
                    <option>Student / Transitioning into Tech</option>
                    <option>Early Career (1-3 yrs)</option>
                    <option>Mid-Level (4-7 yrs)</option>
                    <option>Senior / Tech Lead (8+ yrs)</option>
                    <option>Executive / Founder / Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    Risk Tolerance Profile
                  </label>
                  <select
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                  >
                    <option>Conservative (Prioritize Stability & Downside Protection)</option>
                    <option>Moderate (Calculated Risks with Safety Net)</option>
                    <option>Aggressive (High Upside / Volatility Tolerant)</option>
                  </select>
                </div>
              </div>

              {/* Financial Runway */}
              <div>
                <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                  Available Financial Runway / Cushion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["< 3 months", "3-6 months", "6-12 months", "1-2 years+"].map((runway) => (
                    <button
                      key={runway}
                      type="button"
                      onClick={() => setFinancialRunway(runway)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        financialRunway === runway
                          ? "border-primary bg-primary text-white shadow-subtle"
                          : "border-border bg-background text-text-body hover:border-secondary/40"
                      }`}
                    >
                      {runway}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests & Passions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-heading font-bold text-xs text-text-main uppercase tracking-wider">
                    Core Personal Interests & Passions (Select up to 5)
                  </label>
                  <span className="text-[11px] font-mono text-text-muted">
                    {interests.length}/5 selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_INTERESTS.map((interest) => {
                    const isSelected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white font-semibold shadow-subtle"
                            : "border-border bg-background text-text-body hover:border-secondary/50"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: The Decision & Options */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block font-heading font-bold text-sm text-text-main mb-2">
                  What decision would you like to explore?
                </label>
                <textarea
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base leading-relaxed resize-none font-medium"
                  placeholder="e.g. Should I leave my senior role to join an early-stage robotics startup, or start an AI studio?"
                />
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-text-main">
                    Define Your Alternative Choices (2 to 4 options)
                  </h3>
                  {options.length < 4 && (
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-background hover:bg-sky-soft border border-border text-primary transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Option</span>
                    </button>
                  )}
                </div>

                {options.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className="p-4 rounded-xl border border-border bg-background space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary-light text-primary">
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
                      className="w-full px-3.5 py-2 rounded-lg border border-border bg-surface text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Replay Diagnostic Probe Questions */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-sky-soft/60 border border-border/80 flex items-start gap-3">
                <Flame className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-xs text-text-body">
                  <strong className="text-text-main block mb-0.5">Dilemma Diagnostic Probes:</strong>
                  Answering these targeted questions helps the AI Scenario Engine stress-test your worst-case scenarios and reflect your true personal stakes.
                </div>
              </div>

              <div>
                <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                  1. What is the primary motivation or catalyst driving this decision right now?
                </label>
                <textarea
                  value={primaryMotivation}
                  onChange={(e) => setPrimaryMotivation(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-medium"
                  placeholder="e.g. Feeling stagnant, wanting to capitalize on the AI boom, desiring remote freedom..."
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                  2. What is your worst-case fear or deal-breaker for this decision?
                </label>
                <textarea
                  value={worstCaseFear}
                  onChange={(e) => setWorstCaseFear(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-medium"
                  placeholder="e.g. Burning all savings with zero revenue, getting stuck in corporate bureaucracy, burnout..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    3. Decision Window / Urgency
                  </label>
                  <input
                    type="text"
                    value={decisionWindow}
                    onChange={(e) => setDecisionWindow(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="e.g. Next 30 days, by end of quarter..."
                  />
                </div>

                <div>
                  <label className="block font-heading font-bold text-xs text-text-main uppercase tracking-wider mb-1.5">
                    4. Who else is directly impacted?
                  </label>
                  <input
                    type="text"
                    value={stakeholdersImpacted}
                    onChange={(e) => setStakeholdersImpacted(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    placeholder="e.g. Just myself, partner, family dependents..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Personal Priorities */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-sm text-text-main">
                  What matters most in this decision? (Select up to 3)
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  The AI Scenario Engine compares and scores each path against these specific priorities.
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
                          ? "border-primary bg-primary-light/60 ring-2 ring-primary shadow-subtle"
                          : "border-border bg-background hover:border-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-primary font-bold">
                          {ICON_MAP[priority.iconName]}
                          <span className="font-heading text-xs text-text-main">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-text-body hover:bg-background border border-border transition-colors"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all active:scale-[0.98]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-extrabold text-sm bg-primary text-white hover:bg-primary-hover shadow-glow disabled:opacity-50 transition-all active:scale-[0.98]"
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

        {/* Live Blueprint Preview Panel (Right Column) */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Blueprint</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-text-muted">User Profile:</span>
                <p className="font-heading font-bold text-xs text-text-main mt-0.5">
                  {occupation} · {industry}
                </p>
                <span className="text-[10px] text-text-muted font-mono block">
                  {experienceLevel} · Runway: {financialRunway}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-text-muted">Interests ({interests.length}):</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {interests.slice(0, 3).map((it, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-background border border-border text-text-body font-medium"
                    >
                      {it}
                    </span>
                  ))}
                  {interests.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-text-muted font-mono">
                      +{interests.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-text-muted">Target Decision:</span>
                <p className="font-heading font-bold text-xs text-text-main line-clamp-2 mt-0.5">
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
                      className="text-[10px] px-2 py-0.5 rounded-md bg-sky-soft text-primary font-semibold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-background border border-border text-[11px] text-text-muted leading-relaxed mt-6">
            <span className="font-bold text-text-body block mb-0.5">Prediction Precision:</span>
            By incorporating your background, interests, and worst-case fears, Gemini projects accurate timelines that reflect your genuine risk and resource constraints.
          </div>
        </div>
      </div>
    </div>
  );
}
