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
    border: "border-[#1B3B6F]",
    bg: "bg-[#E6EDF8]",
    badge: "bg-[#1B3B6F] text-white",
    text: "text-[#1B3B6F]",
    accent: "#1B3B6F",
    glow: "rgba(27, 59, 111, 0.3)",
    edgeColor: "#1B3B6F",
    dotColor: "#12284C",
  },
  teal: {
    border: "border-[#1E8276]",
    bg: "bg-[#E6F5F3]",
    badge: "bg-[#1E8276] text-white",
    text: "text-[#1E8276]",
    accent: "#1E8276",
    glow: "rgba(30, 130, 118, 0.3)",
    edgeColor: "#1E8276",
    dotColor: "#145951",
  },
  lavender: {
    border: "border-[#6D64A8]",
    bg: "bg-[#F0EEF8]",
    badge: "bg-[#6D64A8] text-white",
    text: "text-[#6D64A8]",
    accent: "#6D64A8",
    glow: "rgba(109, 100, 168, 0.3)",
    edgeColor: "#6D64A8",
    dotColor: "#4E467C",
  },
  neutral: {
    border: "border-[#476685]",
    bg: "bg-[#EDF2F7]",
    badge: "bg-[#476685] text-white",
    text: "text-[#2A4461]",
    accent: "#476685",
    glow: "rgba(71, 102, 133, 0.25)",
    edgeColor: "#476685",
    dotColor: "#2A4461",
  },
};

export const UNCERTAINTY_CONFIG = {
  lower: {
    label: "Lower Uncertainty",
    description: "Relatively few unresolved assumptions and established variables.",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold",
    color: "#059669",
  },
  moderate: {
    label: "Moderate Uncertainty",
    description: "Several important variables and market conditions remain unknown.",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300 font-semibold",
    color: "#d97706",
  },
  higher: {
    label: "Higher Uncertainty",
    description: "Outcome strongly hinges on unpredictable external factors.",
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300 font-semibold",
    color: "#e11d48",
  },
};
