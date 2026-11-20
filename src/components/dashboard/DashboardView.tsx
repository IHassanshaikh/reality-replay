"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DecisionReplay } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  GitBranch,
  Sparkles,
  Plus,
  SlidersHorizontal,
  ArrowRight,
  Trash2,
  Compass,
  Calendar,
  Layers,
} from "lucide-react";

export function DashboardView() {
  const [replays, setReplays] = useState<DecisionReplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReplays() {
      try {
        const res = await fetch("/api/replays");
        const data = await res.json();
        if (data.success && data.replays) {
          setReplays(data.replays);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard replays:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReplays();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this decision exploration?")) return;

    try {
      const res = await fetch(`/api/replays/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReplays((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete replay:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-text-main">
            Your Possibilities
          </h1>
          <p className="text-sm text-text-body mt-1">
            Every decision has more than one story. Revisit, branch, and inspect alternative timelines.
          </p>
        </div>

        <Link
          href="/replay/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all self-start sm:self-auto active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Decision Replay</span>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-surface border border-border animate-pulse p-6"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card (Slot 1) */}
          <Link
            href="/replay/new"
            className="group rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary bg-sky-soft/30 hover:bg-sky-soft/60 p-6 flex flex-col justify-center items-center text-center transition-all cursor-pointer min-h-[260px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-subtle group-hover:scale-110 transition-transform mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-text-main group-hover:text-primary transition-colors">
              Explore a New Decision
            </h3>
            <p className="text-xs text-text-muted mt-1 max-w-xs">
              Project multiple timelines, uncover hidden trade-offs, and spawn branches.
            </p>
          </Link>

          {/* Replay Cards */}
          {replays.map((replay) => {
            const rootScenarios = replay.scenarios.filter((s) => !s.parentScenarioId);

            return (
              <div
                key={replay.id}
                className="bg-surface rounded-2xl border border-border shadow-card hover:shadow-hover hover:border-secondary/40 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(replay.createdAt)}
                    </span>
                    <button
                      onClick={(e) => handleDelete(e, replay.id)}
                      className="text-text-muted hover:text-rose-600 transition-colors p-1"
                      title="Delete replay"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-text-main line-clamp-2 group-hover:text-primary transition-colors">
                      {replay.title}
                    </h3>
                    <p className="text-xs text-text-body line-clamp-2 mt-1 leading-relaxed">
                      {replay.decision}
                    </p>
                  </div>

                  {/* Scenarios Badges */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block font-semibold">
                      Explored Paths:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rootScenarios.map((sc) => (
                        <span
                          key={sc.id}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-background border border-border text-text-body font-medium"
                        >
                          {sc.optionLabel}
                        </span>
                      ))}
                      {replay.branchesExploredCount > 0 && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-lavender-light text-[#756fb1] font-mono font-medium flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          +{replay.branchesExploredCount} branch
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-background/50 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/replay/${replay.id}/compare`}
                    className="text-xs font-semibold text-text-body hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Compare</span>
                  </Link>

                  <Link
                    href={`/replay/${replay.id}`}
                    className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Open Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
