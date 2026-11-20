"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Plus, Sparkles, LayoutDashboard, Info, Mail } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/replay/replay_showcase_career_choice", label: "Showcase Demo", icon: Sparkles, badge: "Live" },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group">
          <Logo size="md" />
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-background/80 p-1 rounded-xl border border-border">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-surface text-primary shadow-subtle font-bold"
                    : "text-text-body hover:text-text-main hover:bg-surface/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-text-muted"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-teal-light text-teal border border-teal/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/replay/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Replay</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
