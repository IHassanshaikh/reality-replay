"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DecisionReplay, ScenarioComparison } from "@/types";
import { COLOR_THEME_MAP } from "@/lib/constants/design-tokens";
import { UncertaintyBadge } from "@/components/shared/UncertaintyBadge";
import {
  ArrowLeft,
  Sparkles,
  SlidersHorizontal,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  GitBranch,
} from "lucide-react";

interface CompareFuturesViewProps {
  replayId: string;
}

export function CompareFuturesView({ replayId }: CompareFuturesViewProps) {
  const [replay, setReplay] = useState<DecisionReplay | null>(null);
  const [comparison, setComparison] = useState<ScenarioComparison | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/replays/${replayId}/compare`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load comparison");
        }
        setReplay(data.replay);
        setComparison(data.comparison);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [replayId]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-text-body">
            Synthesizing qualitative trade-offs between futures...
          </p>
        </div>
      </div>
    );
  }

  if (error || !replay || !comparison) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-rose-600 mb-4">{error || "Could not find comparison data."}</p>
        <Link
          href={`/replay/${replayId}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Timeline
        </Link>
      </div>
    );
  }

  // Filter root scenarios for clean column comparison
  const paths = replay.scenarios.filter((s) => !s.parentScenarioId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            href={`/replay/${replay.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Interactive Canvas</span>
          </Link>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text-main">
            Compare Alternative Futures
          </h1>
          <p className="text-sm text-text-body mt-1">
            Qualitative trade-offs for: <span className="font-semibold text-text-main">"{replay.decision}"</span>
          </p>
        </div>

        <Link
          href={`/replay/${replay.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-surface border border-border shadow-subtle hover:bg-sky-soft text-primary transition-colors self-start md:self-auto"
        >
          <GitBranch className="w-4 h-4" />
          <span>Explore Timeline Graph</span>
        </Link>
      </div>

      {/* 3-Column Scenario Card Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((scenario) => {
          const theme = COLOR_THEME_MAP[scenario.colorTheme] || COLOR_THEME_MAP.blue;
          const month3 = scenario.timeline.find((e) => e.horizon === "3_months");
          const year1 = scenario.timeline.find((e) => e.horizon === "1_year");
          const year3 = scenario.timeline.find((e) => e.horizon === "3_years");

          return (
            <div
              key={scenario.id}
              className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${theme.badge}`}
                  >
                    {scenario.optionLabel}
                  </span>
                  <UncertaintyBadge level={scenario.overallUncertainty.level} />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">
                    {scenario.pathTitle}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    {scenario.optionDescription}
                  </p>
                </div>

                <p className="text-xs text-text-body leading-relaxed bg-background p-3 rounded-xl border border-border">
                  {scenario.overview}
                </p>

                {/* Milestone Arc Overview */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider block">
                    Key Milestones Arc:
                  </span>
                  <div className="space-y-2 text-xs">
                    {month3 && (
                      <div className="p-2.5 rounded-lg bg-background border border-border">
                        <strong className="text-text-main font-heading block">Month 3:</strong>
                        <span className="text-text-body">{month3.title}</span>
                      </div>
                    )}
                    {year1 && (
                      <div className="p-2.5 rounded-lg bg-background border border-border">
                        <strong className="text-text-main font-heading block">Year 1:</strong>
                        <span className="text-text-body">{year1.title}</span>
                      </div>
                    )}
                    {year3 && (
                      <div className="p-2.5 rounded-lg bg-background border border-border">
                        <strong className="text-text-main font-heading block">Year 3:</strong>
                        <span className="text-text-body">{year3.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Uncertainty Reason */}
              <div className="p-4 bg-background/60 border-t border-border text-xs text-text-muted">
                <span className="font-semibold text-text-body block mb-0.5">Uncertainty Factor:</span>
                {scenario.overallUncertainty.reason}
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Alignment Section */}
      <div className="bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-text-main">
            Priority Alignment Analysis
          </h2>
        </div>
        <p className="text-xs text-text-muted -mt-4">
          How each hypothetical path aligns with what you stated matters most to your life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparison.priorityAlignment.map((pa, idx) => {
            const matchedPath =
              paths.find(
                (p) =>
                  p.id === pa.bestAlignedPathId ||
                  p.optionLabel.toLowerCase() === pa.bestAlignedPathId.toLowerCase() ||
                  p.pathTitle.toLowerCase().includes(pa.bestAlignedPathId.toLowerCase())
              ) || paths[idx % paths.length] || paths[0];
            const theme = COLOR_THEME_MAP[matchedPath.colorTheme] || COLOR_THEME_MAP.blue;

            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-border bg-background space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-text-main">
                    {pa.priority}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${theme.badge}`}
                  >
                    Best: {matchedPath.optionLabel}
                  </span>
                </div>
                <p className="text-xs text-text-body leading-relaxed">
                  {pa.rationale}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dimensional Breakdown Matrix */}
      <div className="bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
        <h2 className="font-heading font-bold text-xl text-text-main">
          Qualitative Dimensional Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 font-heading font-semibold text-xs text-text-muted uppercase tracking-wider">
                  Dimension
                </th>
                {paths.map((p) => (
                  <th
                    key={p.id}
                    className="py-3 px-4 font-heading font-semibold text-xs text-text-main"
                  >
                    {p.optionLabel}: {p.pathTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {comparison.dimensions.map((dim, idx) => (
                <tr key={idx} className="hover:bg-background/40 transition-colors">
                  <td className="py-4 px-4 font-heading font-bold text-text-main align-top w-1/4">
                    <div>{dim.dimension}</div>
                    <span className="text-[11px] font-normal text-text-muted mt-1 block">
                      {dim.explanation}
                    </span>
                  </td>
                  {paths.map((p, pIdx) => {
                    const assessmentText =
                      dim.assessment[p.id] ||
                      dim.assessment[p.optionLabel] ||
                      dim.assessment[p.pathTitle] ||
                      Object.entries(dim.assessment).find(([k]) =>
                        k.toLowerCase().includes(p.optionLabel.toLowerCase())
                      )?.[1] ||
                      Object.values(dim.assessment)[pIdx] ||
                      "Moderate qualitative trade-off";

                    return (
                      <td
                        key={p.id}
                        className="py-4 px-4 text-text-body align-top font-medium"
                      >
                        <div className="p-2.5 rounded-lg bg-background border border-border">
                          {assessmentText}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Synthesis: What changes the most & Important unknowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6 space-y-3">
          <h3 className="font-heading font-bold text-base text-text-main flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            What Changes the Most Between These Futures?
          </h3>
          <ul className="space-y-2 text-xs text-text-body">
            {comparison.keyDifferences.map((kd, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{kd}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface rounded-2xl border border-border shadow-card p-6 space-y-3">
          <h3 className="font-heading font-bold text-base text-text-main flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Critical Unknowns & External Variables
          </h3>
          <ul className="space-y-2 text-xs text-text-body">
            {comparison.importantUnknowns.map((iu, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{iu}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
