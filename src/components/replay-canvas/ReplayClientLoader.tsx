"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DecisionReplay } from "@/types";
import { getClientReplayById, saveClientReplay } from "@/lib/storage/client-replays";
import { TimelineCanvas } from "./TimelineCanvas";
import { Compass, Home, ArrowRight } from "lucide-react";

interface ReplayClientLoaderProps {
  replayId: string;
  initialReplay: DecisionReplay | null;
}

export function ReplayClientLoader({ replayId, initialReplay }: ReplayClientLoaderProps) {
  const [replay, setReplay] = useState<DecisionReplay | null>(initialReplay);
  const [checkedStorage, setCheckedStorage] = useState<boolean>(!!initialReplay);

  useEffect(() => {
    const local = getClientReplayById(replayId);
    if (local) {
      // Prefer the richer/newer version between server & localStorage
      if (!initialReplay || new Date(local.updatedAt) >= new Date(initialReplay.updatedAt)) {
        setReplay(local);
      } else {
        saveClientReplay(initialReplay);
      }
    } else if (initialReplay) {
      saveClientReplay(initialReplay);
    }
    setCheckedStorage(true);
  }, [replayId, initialReplay]);

  if (!checkedStorage) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-text-body">
            Loading decision timeline...
          </p>
        </div>
      </div>
    );
  }

  if (!replay) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-6 text-center">
        <div className="bg-surface rounded-3xl border border-border shadow-card p-8 sm:p-12 max-w-lg w-full space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary border border-primary/20 flex items-center justify-center mx-auto shadow-subtle">
            <Compass className="w-8 h-8 animate-spin text-primary" style={{ animationDuration: "12s" }} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Timeline 404 · Uncharted Vector
            </span>
            <h1 className="font-heading font-extrabold text-3xl text-text-main">
              This timeline does not exist
            </h1>
            <p className="text-sm text-text-body leading-relaxed">
              The decision, branch, or scenario coordinate you are looking for has either dissolved or never branched from the main timeline.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Reality Replay</span>
            </Link>

            <Link
              href="/replay/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-xs bg-background border border-border text-text-body hover:bg-sky-soft transition-colors"
            >
              <span>Create New Replay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <TimelineCanvas initialReplay={replay} />;
}
