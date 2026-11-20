import React from "react";
import { UncertaintyLevel } from "@/types";
import { UNCERTAINTY_CONFIG } from "@/lib/constants/design-tokens";
import { HelpCircle, AlertCircle, CheckCircle2 } from "lucide-react";

interface UncertaintyBadgeProps {
  level: UncertaintyLevel;
  showIcon?: boolean;
  className?: string;
}

export function UncertaintyBadge({
  level,
  showIcon = true,
  className = "",
}: UncertaintyBadgeProps) {
  const config = UNCERTAINTY_CONFIG[level] || UNCERTAINTY_CONFIG.moderate;

  const renderIcon = () => {
    switch (level) {
      case "lower":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case "moderate":
        return <HelpCircle className="w-3.5 h-3.5 text-amber-600" />;
      case "higher":
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badgeClass} ${className}`}
      title={config.description}
    >
      {showIcon && renderIcon()}
      <span>{config.label}</span>
    </span>
  );
}
