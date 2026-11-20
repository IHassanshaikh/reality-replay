"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  BackgroundVariant,
} from "@xyflow/react";
import { DecisionReplay, MilestoneEvent, ScenarioPath } from "@/types";
import { buildReplayGraph } from "@/lib/layout/tree-layout";
import { DecisionRootNode } from "./nodes/DecisionRootNode";
import { TimelineMilestoneNode } from "./nodes/TimelineMilestoneNode";
import { ScenarioDrawer } from "./ScenarioDrawer";
import { BranchCreationModal } from "./BranchCreationModal";
import { COLOR_THEME_MAP } from "@/lib/constants/design-tokens";
import { GitBranch, Sparkles, SlidersHorizontal, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface TimelineCanvasProps {
  initialReplay: DecisionReplay;
}

const nodeTypes = {
  decisionRoot: DecisionRootNode as any,
  timelineMilestone: TimelineMilestoneNode as any,
};

export function TimelineCanvas({ initialReplay }: TimelineCanvasProps) {
  const [replay, setReplay] = useState<DecisionReplay>(initialReplay);
  const [selectedEvent, setSelectedEvent] = useState<MilestoneEvent | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPath | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [branchModalState, setBranchModalState] = useState<{
    isOpen: boolean;
    event: MilestoneEvent | null;
    scenario: ScenarioPath | null;
  }>({
    isOpen: false,
    event: null,
    scenario: null,
  });

  // Calculate layout graph
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildReplayGraph(replay, selectedEvent?.id || null),
    [replay, selectedEvent]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state whenever replay or selectedEvent changes
  React.useEffect(() => {
    const layout = buildReplayGraph(replay, selectedEvent?.id || null);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [replay, selectedEvent, setNodes, setEdges]);

  // Node click handler
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.type === "timelineMilestone" && node.data?.event) {
        const evt = node.data.event as MilestoneEvent;
        const sc = replay.scenarios.find((s) => s.id === node.data.scenarioId) || null;
        setSelectedEvent(evt);
        setSelectedScenario(sc);
        setIsDrawerOpen(true);
      }
    },
    [replay]
  );

  const handleOpenBranchModal = (event: MilestoneEvent, scenario: ScenarioPath) => {
    setIsDrawerOpen(false);
    setBranchModalState({
      isOpen: true,
      event,
      scenario,
    });
  };

  const handleBranchCreated = (childScenarios: ScenarioPath[]) => {
    setReplay((prev) => ({
      ...prev,
      scenarios: [...prev.scenarios, ...childScenarios],
      branchesExploredCount: prev.branchesExploredCount + childScenarios.length,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-background overflow-hidden flex flex-col">
      {/* Top Canvas Bar */}
      <div className="h-14 border-b border-border bg-surface/80 backdrop-blur-md px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-heading font-bold text-sm text-text-main line-clamp-1 max-w-md">
              {replay.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
            ({replay.scenarios.length} timelines · {replay.branchesExploredCount} branches)
          </span>
        </div>

        {/* Legend & Action Shortcuts */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-border">
            {replay.scenarios
              .filter((s) => !s.parentScenarioId)
              .map((s) => {
                const theme = COLOR_THEME_MAP[s.colorTheme] || COLOR_THEME_MAP.blue;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-1.5 text-xs text-text-body font-medium"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span>{s.optionLabel}</span>
                  </div>
                );
              })}
          </div>

          <Link
            href={`/replay/${replay.id}/compare`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background hover:bg-sky-soft border border-border text-primary transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Compare Futures</span>
          </Link>
        </div>
      </div>

      {/* Main Flow Canvas Area */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          className="bg-[#F6F8FC]"
        >
          <Background
            color="#CCD7E6"
            gap={24}
            size={1.5}
            variant={BackgroundVariant.Dots}
          />
          <Controls className="!bg-surface !border !border-border !rounded-xl !shadow-card !p-1" />
          <MiniMap
            zoomable
            pannable
            nodeColor={(n) => {
              if (n.type === "decisionRoot") return "#315B82";
              return "#399C91";
            }}
            className="!bg-surface !border !border-border !rounded-xl !shadow-subtle !overflow-hidden"
          />
        </ReactFlow>

        {/* Floating Instruction Banner */}
        <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/90 border border-border/80 shadow-card text-xs text-text-body backdrop-blur-sm pointer-events-none">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Click any milestone card to inspect assumptions and branch futures</span>
        </div>
      </div>

      {/* Side Detail Drawer */}
      <ScenarioDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        event={selectedEvent}
        scenario={selectedScenario}
        onExploreBranch={handleOpenBranchModal}
      />

      {/* Branch Creation Modal */}
      {branchModalState.event && branchModalState.scenario && (
        <BranchCreationModal
          isOpen={branchModalState.isOpen}
          onClose={() =>
            setBranchModalState({ isOpen: false, event: null, scenario: null })
          }
          event={branchModalState.event}
          scenario={branchModalState.scenario}
          replayId={replay.id}
          onBranchCreated={handleBranchCreated}
        />
      )}
    </div>
  );
}
