"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GitCommit, Sparkles } from "lucide-react";

interface DecisionRootData {
  title: string;
  decision: string;
  optionsCount: number;
  priorities: string[];
}

export const DecisionRootNode = memo(({ data }: any) => {
  const nodeData = data as DecisionRootData;

  return (
    <div className="w-[300px] bg-surface rounded-2xl border-2 border-primary/40 shadow-card p-5 transition-all hover:shadow-hover hover:border-primary relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-primary-light text-primary uppercase tracking-wide">
          <GitCommit className="w-3 h-3" />
          Primary Decision
        </span>
        <span className="text-xs text-text-muted font-mono ml-auto">
          {nodeData.optionsCount} paths
        </span>
      </div>

      <h3 className="font-heading font-bold text-base text-text-main line-clamp-2 leading-snug mb-2">
        {nodeData.decision}
      </h3>

      {nodeData.priorities && nodeData.priorities.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
          {nodeData.priorities.slice(0, 2).map((p, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-background text-text-body font-medium"
            >
              {p}
            </span>
          ))}
          {nodeData.priorities.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 text-text-muted">
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
