import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", iconOnly = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Logomark */}
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1B3B6F] to-[#0B1528] text-white shadow-md shadow-[#1B3B6F]/20 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Background subtle grid aura */}
          <circle cx="18" cy="18" r="14" stroke="#B8D0E8" strokeOpacity="0.15" strokeWidth="1" />
          
          {/* Primary root decision point */}
          <circle cx="8" cy="18" r="3" fill="#FFFFFF" />
          <circle cx="8" cy="18" r="4.5" stroke="#B8D0E8" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Divergent Path Upper (Path A) */}
          <path
            d="M8 18C13 18 16 10 24 10H28"
            stroke="#B8D0E8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="10" r="2.5" fill="#38BDF8" />

          {/* Divergent Path Center (Path B) */}
          <path
            d="M8 18H29"
            stroke="#1E8276"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="29" cy="18" r="2.5" fill="#2DD4BF" />

          {/* Divergent Path Lower (Path C) */}
          <path
            d="M8 18C13 18 16 26 24 26H28"
            stroke="#A78BFA"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="26" r="2.5" fill="#C084FC" />

          {/* Intermediate pulsing milestone node on Path A */}
          <circle cx="18" cy="12" r="1.8" fill="#FFFFFF" />
          {/* Branch node on Path C */}
          <circle cx="18" cy="24" r="1.8" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {!iconOnly && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold ${textClasses[size]} text-[#0B1528] tracking-tight leading-none group-hover:text-primary transition-colors`}
          >
            Reality<span className="text-[#1B3B6F]">Replay</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] font-bold mt-1">
            Decision Simulator
          </span>
        </div>
      )}
    </div>
  );
}
