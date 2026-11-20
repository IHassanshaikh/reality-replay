"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, Instagram, ArrowUpRight, Heart, Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-text-main mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <Logo size="lg" />
            </Link>
            <p className="text-sm text-text-body leading-relaxed max-w-sm">
              Don&apos;t just ask what will happen. Explore what could happen. An AI-powered decision simulation engine mapping hypothetical multi-horizon futures.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="mailto:hassanshaikh9717@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border text-text-body hover:text-primary hover:border-primary transition-all"
                title="Email Hassan Shaikh"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>hassanshaikh9717@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/hassan.techlife"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border text-text-body hover:text-primary hover:border-primary transition-all"
                title="Instagram @hassan.techlife"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@hassan.techlife</span>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-text-muted">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-text-body">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Decision Library
                </Link>
              </li>
              <li>
                <Link href="/replay/new" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>Create Replay</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-primary-light text-primary">New</span>
                </Link>
              </li>
              <li>
                <Link href="/replay/replay_showcase_career_choice" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>Showcase Simulator</span>
                  <Sparkles className="w-3 h-3 text-teal" />
                </Link>
              </li>
              <li>
                <Link href="/replay/replay_showcase_career_choice/compare" className="hover:text-primary transition-colors">
                  Compare Futures
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Story */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-text-muted">
              About & Creator
            </h4>
            <ul className="space-y-2 text-sm text-text-body">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Reality Replay
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/hassan.techlife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Hassan Shaikh</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  Gemini 2.5 Flash Verified
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-text-muted">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm text-text-body">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms#ai-ethics" className="hover:text-primary transition-colors">
                  AI Limitations & Ethics
                </Link>
              </li>
              <li>
                <span className="text-xs text-text-muted block pt-1">
                  Private by Default · Zero Tracking
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} Reality Replay. Crafted with care by{" "}
            <a
              href="https://instagram.com/hassan.techlife"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-text-main hover:text-primary underline underline-offset-2"
            >
              Hassan Shaikh
            </a>
            . All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Hypothetical decision simulations for reflection. Not financial, medical, or legal advice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
