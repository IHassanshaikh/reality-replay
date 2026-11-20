"use client";

import React, { useState } from "react";
import { MilestoneEvent, ScenarioPath, UncertaintyLevel } from "@/types";
import { COLOR_THEME_MAP } from "@/lib/constants/design-tokens";
import { UncertaintyBadge } from "@/components/shared/UncertaintyBadge";
import {
  X,
  Sparkles,
  GitBranch,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  CheckCircle,
  HelpCircle,
  Plus,
  Compass,
} from "lucide-react";

interface ScenarioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: MilestoneEvent | null;
  scenario: ScenarioPath | null;
  onExploreBranch: (event: MilestoneEvent, scenario: ScenarioPath) => void;
}

export function ScenarioDrawer({
  isOpen,
  onClose,
  event,
  scenario,
  onExploreBranch,
}: ScenarioDrawerProps) {
  if (!isOpen || !event || !scenario) return null;

  const theme = COLOR_THEME_MAP[scenario.colorTheme] || COLOR_THEME_MAP.blue;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] lg:w-[540px] bg-surface shadow-2xl border-l border-border flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Top Header */}
      <div className="p-6 border-b border-border bg-background/40 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${theme.badge}`}
            >
              {scenario.optionLabel}
            </span>
            <span className="text-xs font-mono text-text-muted">
              {event.horizonLabel}
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl text-text-main leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-text-muted mt-1 font-medium">
            Path: {scenario.pathTitle}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-background transition-colors"
          aria-label="Close detail drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Section 1: What happened? */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Hypothetical Development
          </h4>
          <div className="p-4 rounded-xl bg-background border border-border">
            <p className="text-sm text-text-body leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* Section 2: Uncertainty Assessment */}
        <div className="p-4 rounded-xl border border-border bg-sky-soft/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
              Simulation Uncertainty
            </span>
            <UncertaintyBadge level={event.uncertaintyLevel} />
          </div>
          <p className="text-xs text-text-body leading-relaxed">
            {event.uncertaintyReason}
          </p>
        </div>

        {/* Section 3: Opportunities & Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Opportunities */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2.5">
            <h5 className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 font-heading">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Opportunities
            </h5>
            <ul className="space-y-1.5">
              {event.opportunities.map((opp, idx) => (
                <li
                  key={idx}
                  className="text-xs text-emerald-950/80 leading-relaxed flex items-start gap-1.5"
                >
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges / What could go wrong */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-2.5">
            <h5 className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 font-heading">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Challenges & Risks
            </h5>
            <ul className="space-y-1.5">
              {event.challenges.map((ch, idx) => (
                <li
                  key={idx}
                  className="text-xs text-amber-950/80 leading-relaxed flex items-start gap-1.5"
                >
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Underlying Assumptions */}
        {event.assumptions && event.assumptions.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider flex items-center gap-1.5 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              What Needs to Be True
            </h4>
            <div className="space-y-2">
              {event.assumptions.map((asm, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-border bg-surface text-xs text-text-body flex items-start gap-2 shadow-subtle"
                >
                  <span className="text-secondary font-mono font-bold mt-0.5">
                    {idx + 1}.
                  </span>
                  <span>{asm}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Potential Turning Points */}
        {event.turningPoints && event.turningPoints.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider flex items-center gap-1.5 font-semibold">
              <Zap className="w-3.5 h-3.5 text-teal" />
              What Could Change Everything?
            </h4>
            <div className="space-y-2.5">
              {event.turningPoints.map((tp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-teal/20 bg-teal-light/40 space-y-1"
                >
                  <h6 className="font-heading font-semibold text-xs text-teal-800">
                    {tp.title}
                  </h6>
                  <p className="text-xs text-text-body">{tp.description}</p>
                  <p className="text-[11px] text-text-muted font-medium pt-1">
                    <span className="text-teal font-semibold">Impact: </span>
                    {tp.possibleImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action: Explore this moment */}
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md flex items-center gap-3">
        <button
          onClick={() => onExploreBranch(event, scenario)}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-heading font-semibold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all active:scale-[0.99]"
        >
          <GitBranch className="w-4 h-4 text-sky" />
          <span>Explore This Moment (Create Branch)</span>
        </button>
      </div>
    </div>
  );
}
