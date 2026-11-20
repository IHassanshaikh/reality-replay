import { PathColorTheme } from "@/types";

export const COLOR_THEME_MAP: Record<
  PathColorTheme,
  {
    border: string;
    bg: string;
    badge: string;
    text: string;
    accent: string;
    glow: string;
    edgeColor: string;
    dotColor: string;
  }
> = {
  blue: {
    border: "border-[#315B82]",
    bg: "bg-[#EBF2F8]",
    badge: "bg-[#315B82] text-white",
    text: "text-[#315B82]",
    accent: "#315B82",
    glow: "rgba(49, 91, 130, 0.25)",
    edgeColor: "#315B82",
    dotColor: "#264868",
  },
  teal: {
    border: "border-[#399C91]",
    bg: "bg-[#EBF7F5]",
    badge: "bg-[#399C91] text-white",
    text: "text-[#399C91]",
    accent: "#399C91",
    glow: "rgba(57, 156, 145, 0.25)",
    edgeColor: "#399C91",
    dotColor: "#2d7d74",
  },
  lavender: {
    border: "border-[#918AC7]",
    bg: "bg-[#F2F1FA]",
    badge: "bg-[#918AC7] text-white",
    text: "text-[#918AC7]",
    accent: "#918AC7",
    glow: "rgba(145, 138, 199, 0.25)",
    edgeColor: "#918AC7",
    dotColor: "#756fb1",
  },
  neutral: {
    border: "border-[#8995A5]",
    bg: "bg-[#F6F8FC]",
    badge: "bg-[#8995A5] text-white",
    text: "text-[#59677A]",
    accent: "#6687A8",
    glow: "rgba(102, 135, 168, 0.2)",
    edgeColor: "#8995A5",
    dotColor: "#59677A",
  },
};

export const UNCERTAINTY_CONFIG = {
  lower: {
    label: "Lower Uncertainty",
    description: "Relatively few unresolved assumptions and established variables.",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    color: "#10b981",
  },
  moderate: {
    label: "Moderate Uncertainty",
    description: "Several important variables and market conditions remain unknown.",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    color: "#f59e0b",
  },
  higher: {
    label: "Higher Uncertainty",
    description: "Outcome strongly hinges on unpredictable external factors.",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    color: "#f43f5e",
  },
};
