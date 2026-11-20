"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { MilestoneEvent, PathColorTheme } from "@/types";
import { COLOR_THEME_MAP } from "@/lib/constants/design-tokens";
import { UncertaintyBadge } from "@/components/shared/UncertaintyBadge";
import { ArrowUpRight, Zap, GitBranch } from "lucide-react";

interface TimelineMilestoneData {
  scenarioId: string;
  scenarioTitle: string;
  optionLabel: string;
  colorTheme: PathColorTheme;
  event: MilestoneEvent;
  isSelected?: boolean;
  isBranch?: boolean;
}

export const TimelineMilestoneNode = memo(({ data }: any) => {
  const nodeData = data as TimelineMilestoneData;
  const theme = COLOR_THEME_MAP[nodeData.colorTheme] || COLOR_THEME_MAP.blue;
  const { event, isSelected, isBranch } = nodeData;

  return (
    <div
      className={`w-[290px] bg-surface rounded-2xl border transition-all duration-200 cursor-pointer relative group text-left ${
        isSelected
          ? `${theme.border} border-2 shadow-hover ring-4 ring-primary/10`
          : "border-border hover:border-secondary/40 shadow-card hover:shadow-hover"
      }`}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
        style={{ backgroundColor: theme.accent }}
      />

      {/* Top Header Strip */}
      <div className="p-4 pb-2.5">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider ${theme.badge}`}
          >
            {isBranch && <GitBranch className="w-2.5 h-2.5" />}
            {nodeData.optionLabel}
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            {event.horizonLabel.split("·")[0]}
          </span>
        </div>

        <h4 className="font-heading font-semibold text-sm text-text-main leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h4>
      </div>

      {/* Description Snippet */}
      <div className="px-4 pb-3">
        <p className="text-xs text-text-body line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="px-4 py-2.5 bg-background/50 border-t border-border rounded-b-2xl flex items-center justify-between">
        <UncertaintyBadge
          level={event.uncertaintyLevel}
          showIcon={false}
          className="text-[10px] py-0.5 px-2"
        />

        <div className="flex items-center gap-1 text-[11px] font-medium text-primary group-hover:translate-x-0.5 transition-transform">
          <span>Inspect</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !border-2 !border-white"
        style={{ backgroundColor: theme.accent }}
      />
    </div>
  );
});

TimelineMilestoneNode.displayName = "TimelineMilestoneNode";
