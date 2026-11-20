"useContent";
"use client";

import Link from "next/link";
import { GitBranch, Compass, Plus, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
            <GitBranch className="w-5 h-5 text-sky" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg text-text-main tracking-tight group-hover:text-primary transition-colors">
              Reality Replay
            </span>
            <span className="text-[10px] uppercase font-mono text-text-muted tracking-wider -mt-1">
              Decision Simulator
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-background/80 p-1 rounded-xl border border-border">
          <Link
            href="/dashboard"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              pathname === "/dashboard"
                ? "bg-surface text-primary shadow-subtle font-semibold"
                : "text-text-body hover:text-text-main"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/replay/replay_showcase_career_choice"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              pathname.includes("replay_showcase_career_choice")
                ? "bg-surface text-primary shadow-subtle font-semibold"
                : "text-text-body hover:text-text-main"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            Showcase Replay
          </Link>
          <Link
            href="/replay/new"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              pathname === "/replay/new"
                ? "bg-surface text-primary shadow-subtle font-semibold"
                : "text-text-body hover:text-text-main"
            }`}
          >
            Create Replay
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/replay/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Replay</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
