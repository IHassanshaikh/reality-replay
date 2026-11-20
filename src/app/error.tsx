"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, Sparkles } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Reality Replay Caught Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-surface rounded-3xl border border-border shadow-card p-8 sm:p-10 max-w-lg w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center mx-auto shadow-subtle">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
            Simulation Interrupted
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-text-main">
            Something went off course
          </h2>
          <p className="text-sm text-text-body leading-relaxed">
            An unexpected error occurred while processing your decision timeline. Don&apos;t worry—your data is safe.
          </p>
        </div>

        {/* Error Detail Pill */}
        {error.message && (
          <div className="p-4 rounded-xl bg-background border border-border text-left overflow-x-auto text-xs font-mono text-rose-900 bg-rose-50/40">
            <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1 font-bold">
              Error Diagnostic:
            </span>
            <code className="break-all">{error.message}</code>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-xs bg-background border border-border text-text-body hover:bg-sky-soft transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Safety</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
