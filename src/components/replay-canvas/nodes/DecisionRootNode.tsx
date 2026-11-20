"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { GitCommit, User, Sparkles, AlertCircle } from "lucide-react";
import { UserProfile, ReplayDiagnostics } from "@/types";

interface DecisionRootData {
  title: string;
  decision: string;
  optionsCount: number;
  priorities: string[];
  userProfile?: UserProfile;
  diagnostics?: ReplayDiagnostics;
}

export const DecisionRootNode = memo(({ data }: any) => {
  const nodeData = data as DecisionRootData;

  return (
    <div className="w-[320px] bg-surface rounded-2xl border-2 border-primary/40 shadow-card p-5 transition-all hover:shadow-hover hover:border-primary relative text-left">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-primary-light text-primary uppercase tracking-wide">
          <GitCommit className="w-3 h-3" />
          Primary Decision
        </span>
        <span className="text-xs text-text-muted font-mono ml-auto font-semibold">
          {nodeData.optionsCount} paths
        </span>
      </div>

      {nodeData.userProfile && (
        <div className="mb-2.5 flex items-center gap-1.5 text-[11px] text-text-body bg-background px-2.5 py-1 rounded-lg border border-border">
          <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="font-semibold text-text-main line-clamp-1">
            {nodeData.userProfile.occupation}
          </span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted truncate">{nodeData.userProfile.industry}</span>
        </div>
      )}

      <h3 className="font-heading font-extrabold text-base text-text-main line-clamp-2 leading-snug mb-2">
        {nodeData.decision}
      </h3>

      {nodeData.diagnostics?.worstCaseFear && (
        <div className="mb-2.5 text-[11px] text-rose-800 bg-rose-50 border border-rose-200/80 rounded-lg p-2 flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 text-rose-600 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2 leading-tight">
            <strong className="font-bold">Deal-breaker: </strong>
            {nodeData.diagnostics.worstCaseFear}
          </span>
        </div>
      )}

      {nodeData.priorities && nodeData.priorities.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
          {nodeData.priorities.slice(0, 2).map((p, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-background text-text-body font-semibold border border-border"
            >
              {p}
            </span>
          ))}
          {nodeData.priorities.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 text-text-muted font-mono">
              +{nodeData.priorities.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-primary !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
});

DecisionRootNode.displayName = "DecisionRootNode";
