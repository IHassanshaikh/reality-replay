"use client";

import React, { useState } from "react";
import { MilestoneEvent, ScenarioPath } from "@/types";
import { GitBranch, X, Sparkles, Loader2, Compass } from "lucide-react";

interface BranchCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: MilestoneEvent;
  scenario: ScenarioPath;
  replayId: string;
  onBranchCreated: (newScenarios: ScenarioPath[]) => void;
}

export function BranchCreationModal({
  isOpen,
  onClose,
  event,
  scenario,
  replayId,
  onBranchCreated,
}: BranchCreationModalProps) {
  const [newDecision, setNewDecision] = useState(
    scenario.suggestedFollowupQuestions?.[0] ||
      `What if you pivot your strategy at ${event.horizonLabel.split("·")[0]}?`
  );
  const [option1, setOption1] = useState("Double down on current approach with extra resources");
  const [option2, setOption2] = useState("Shift focus toward a complementary alternative strategy");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecision.trim() || !option1.trim() || !option2.trim()) {
      setError("Please fill out the dilemma question and both choices.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/scenarios/${scenario.id}/branch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replayId,
          parentScenarioId: scenario.id,
          parentEventId: event.id,
          newDecision,
          options: [option1, option2],
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate branch");
      }

      onBranchCreated(data.childScenarios);
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating branches.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-main/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-2xl border border-border shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-primary mb-1">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Branching Decision Tree</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-main">
              Explore This Moment
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Spawning child timelines from: <span className="font-semibold text-text-body">{event.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-main rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-main font-heading mb-1.5">
              What dilemma or new question arises at this milestone?
            </label>
            <textarea
              value={newDecision}
              onChange={(e) => setNewDecision(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="e.g. What if customer acquisition costs double?"
            />
          </div>

          {/* Quick Suggestions */}
          {scenario.suggestedFollowupQuestions && scenario.suggestedFollowupQuestions.length > 0 && (
            <div>
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
                Suggested exploration questions:
              </span>
              <div className="space-y-1">
                {scenario.suggestedFollowupQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNewDecision(q)}
                    className="w-full text-left text-xs p-2 rounded-lg bg-background hover:bg-sky-soft/60 border border-border text-text-body transition-colors line-clamp-1"
                  >
                    ↳ {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divergent Choices */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-text-main font-heading mb-1">
                Choice A
              </label>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main font-heading mb-1">
                Choice B
              </label>
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl text-sm font-medium text-text-body hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-sky" />
                  <span>Simulating Branches...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sky" />
                  <span>Generate Divergent Branches</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
