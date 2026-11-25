"use client";

import React, { useState } from "react";
import { DecisionReplay, ScenarioAssumption, ScenarioPath, AssumptionStatus } from "@/types";
import { COLOR_THEME_MAP } from "@/lib/constants/design-tokens";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Plus,
  Sparkles,
  SlidersHorizontal,
  Save,
  Check,
  ShieldAlert,
  Loader2,
} from "lucide-react";

interface AssumptionExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  replay: DecisionReplay;
  activeScenarioId?: string;
  onUpdateReplay: (updatedReplay: DecisionReplay) => void;
}

export function AssumptionExplorerModal({
  isOpen,
  onClose,
  replay,
  activeScenarioId,
  onUpdateReplay,
}: AssumptionExplorerModalProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    activeScenarioId || replay.scenarios[0]?.id || ""
  );
  const [assumptionsMap, setAssumptionsMap] = useState<Record<string, ScenarioAssumption[]>>(() => {
    const map: Record<string, ScenarioAssumption[]> = {};
    replay.scenarios.forEach((s) => {
      map[s.id] = [...(s.assumptions || [])];
    });
    return map;
  });
  const [newStatement, setNewStatement] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if replay changes
  React.useEffect(() => {
    const map: Record<string, ScenarioAssumption[]> = {};
    replay.scenarios.forEach((s) => {
      map[s.id] = [...(s.assumptions || [])];
    });
    setAssumptionsMap(map);
    if (!selectedScenarioId && replay.scenarios[0]) {
      setSelectedScenarioId(replay.scenarios[0].id);
    }
  }, [replay, selectedScenarioId]);

  if (!isOpen) return null;

  const currentScenario = replay.scenarios.find((s) => s.id === selectedScenarioId) || replay.scenarios[0];
  const currentAssumptions = assumptionsMap[currentScenario.id] || [];

  const handleStatusChange = (assumptionId: string, status: AssumptionStatus) => {
    setAssumptionsMap((prev) => ({
      ...prev,
      [currentScenario.id]: (prev[currentScenario.id] || []).map((a) =>
        a.id === assumptionId ? { ...a, status } : a
      ),
    }));
    setSaveSuccess(false);
  };

  const handleAddAssumption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatement.trim()) return;

    const newAssump: ScenarioAssumption = {
      id: `asm_custom_${Date.now()}`,
      statement: newStatement.trim(),
      status: "uncertain",
    };

    setAssumptionsMap((prev) => ({
      ...prev,
      [currentScenario.id]: [...(prev[currentScenario.id] || []), newAssump],
    }));
    setNewStatement("");
    setIsAdding(false);
    setSaveSuccess(false);
  };

  const handleRemoveAssumption = (id: string) => {
    setAssumptionsMap((prev) => ({
      ...prev,
      [currentScenario.id]: (prev[currentScenario.id] || []).filter((a) => a.id !== id),
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch(`/api/scenarios/${currentScenario.id}/assumptions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replayId: replay.id,
          assumptions: currentAssumptions,
          replay,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update assumptions");
      }

      onUpdateReplay(data.replay);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      console.error("Save assumptions error:", err);
      alert(err.message || "Failed to save assumptions.");
    } finally {
      setIsSaving(false);
    }
  };

  // Metrics
  const likelyCount = currentAssumptions.filter((a) => a.status === "likely").length;
  const uncertainCount = currentAssumptions.filter((a) => a.status === "uncertain").length;
  const unlikelyCount = currentAssumptions.filter((a) => a.status === "unlikely").length;
  const total = currentAssumptions.length;

  const theme = COLOR_THEME_MAP[currentScenario.colorTheme] || COLOR_THEME_MAP.blue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-main/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Assumption Explorer (Feature 6)</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-text-main">
              Inspect What Needs to Be True
            </h3>
            <p className="text-xs text-text-body mt-1">
              Every simulation relies on hidden premises. Mark assumptions as Likely, Uncertain, or Unlikely to test scenario fragility.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-main rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-border bg-surface flex items-center gap-2 overflow-x-auto">
          {replay.scenarios.map((sc) => {
            const scTheme = COLOR_THEME_MAP[sc.colorTheme] || COLOR_THEME_MAP.blue;
            const isSelected = sc.id === currentScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white shadow-subtle"
                    : "bg-background text-text-body hover:bg-sky-soft/60 border border-border"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? "#FFFFFF" : scTheme.accent }}
                />
                <span>{sc.optionLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Scenario Banner */}
          <div className="p-4 rounded-xl bg-background border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-medium text-text-muted">
                {currentScenario.optionLabel} · {currentScenario.pathTitle}
              </div>
              <p className="text-xs text-text-body mt-0.5 line-clamp-1">
                {currentScenario.overview}
              </p>
            </div>

            {/* Assumption Ratio Pills */}
            <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-medium">
                {likelyCount} Likely
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-medium">
                {uncertainCount} Uncertain
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-medium">
                {unlikelyCount} Unlikely
              </span>
            </div>
          </div>

          {/* Fragility Analysis Alert */}
          {unlikelyCount > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5 text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Fragility Warning: </span>
                {unlikelyCount} critical {unlikelyCount === 1 ? "assumption is" : "assumptions are"} marked unlikely. This timeline has high failure exposure if unexpected market or resource shocks occur.
              </div>
            </div>
          )}

          {/* Assumptions List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider font-semibold">
                Foundational Assumptions ({total})
              </h4>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAdding ? "Cancel" : "Add Assumption"}</span>
              </button>
            </div>

            {/* Add inline form */}
            {isAdding && (
              <form onSubmit={handleAddAssumption} className="p-3.5 rounded-xl border border-primary/30 bg-sky-soft/30 space-y-2">
                <input
                  type="text"
                  placeholder="e.g., Target market continues hiring contractors through Q4..."
                  value={newStatement}
                  onChange={(e) => setNewStatement(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-main"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-1 rounded-md text-xs text-text-muted hover:text-text-main"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-md text-xs font-semibold bg-primary text-white hover:bg-primary-hover shadow-subtle"
                  >
                    Add Card
                  </button>
                </div>
              </form>
            )}

            {currentAssumptions.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border rounded-xl text-text-muted text-xs">
                No assumptions listed for this timeline yet. Click &quot;Add Assumption&quot; above to create one.
              </div>
            ) : (
              <div className="space-y-2.5">
                {currentAssumptions.map((asm, idx) => (
                  <div
                    key={asm.id || idx}
                    className="p-3.5 rounded-xl border border-border bg-surface shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-secondary/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="text-xs font-mono font-bold text-text-muted mt-0.5">
                        {idx + 1}.
                      </span>
                      <p className="text-xs text-text-main font-medium leading-relaxed">
                        {asm.statement}
                      </p>
                    </div>

                    {/* 3 Status Buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(asm.id, "likely")}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-heading font-semibold transition-all border ${
                          asm.status === "likely"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-subtle"
                            : "bg-surface hover:bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        Likely
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(asm.id, "uncertain")}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-heading font-semibold transition-all border ${
                          asm.status === "uncertain"
                            ? "bg-amber-600 text-white border-amber-600 shadow-subtle"
                            : "bg-surface hover:bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        Uncertain
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(asm.id, "unlikely")}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-heading font-semibold transition-all border ${
                          asm.status === "unlikely"
                            ? "bg-rose-600 text-white border-rose-600 shadow-subtle"
                            : "bg-surface hover:bg-rose-50 text-rose-800 border-rose-200"
                        }`}
                      >
                        Unlikely
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveAssumption(asm.id)}
                        className="p-1 text-text-muted hover:text-rose-600 ml-1"
                        title="Remove assumption"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md flex items-center justify-between">
          <div className="text-xs text-text-muted font-medium">
            {saveSuccess && (
              <span className="text-emerald-700 flex items-center gap-1 font-semibold animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                Updated and synced with decision model!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-text-body hover:bg-background border border-border transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-primary text-white hover:bg-primary-hover shadow-subtle transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Assumptions</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
