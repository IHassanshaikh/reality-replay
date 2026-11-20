import { DecisionReplay, ScenarioPath } from "@/types";
import { Node, Edge, Position } from "@xyflow/react";
import { COLOR_THEME_MAP } from "../constants/design-tokens";

export interface GraphLayoutResult {
  nodes: Node[];
  edges: Edge[];
}

export function buildReplayGraph(
  replay: DecisionReplay,
  selectedEventId: string | null
): GraphLayoutResult {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const rootX = 60;
  const rootY = 320;

  // 1. Root Decision Node
  nodes.push({
    id: "node_root",
    type: "decisionRoot",
    position: { x: rootX, y: rootY },
    data: {
      title: replay.title,
      decision: replay.decision,
      optionsCount: replay.options.length,
      priorities: replay.priorities,
      userProfile: replay.userProfile,
      diagnostics: replay.diagnostics,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });

  // Top-level root scenarios (those without parentScenarioId)
  const rootScenarios = replay.scenarios.filter((s) => !s.parentScenarioId);
  const totalRootScenarios = rootScenarios.length;

  const scenarioSpacingY = 280;
  const startY = rootY - ((totalRootScenarios - 1) * scenarioSpacingY) / 2;

  rootScenarios.forEach((scenario, sIndex) => {
    const laneY = startY + sIndex * scenarioSpacingY;
    const theme = COLOR_THEME_MAP[scenario.colorTheme] || COLOR_THEME_MAP.blue;

    // Connect Root to first milestone of each scenario
    const firstEvent = scenario.timeline[0];
    const firstEventNodeId = `node_${scenario.id}_${firstEvent.id}`;

    edges.push({
      id: `edge_root_to_${scenario.id}`,
      source: "node_root",
      target: firstEventNodeId,
      type: "smoothstep",
      animated: true,
      style: {
        stroke: theme.edgeColor,
        strokeWidth: 2.5,
      },
    });

    // Milestone Event Nodes: Month 3, Year 1, Year 3
    const milestoneSpacingX = 340;
    const startX = rootX + 360;

    scenario.timeline.forEach((event, eIndex) => {
      const eventNodeId = `node_${scenario.id}_${event.id}`;
      const eventX = startX + eIndex * milestoneSpacingX;

      nodes.push({
        id: eventNodeId,
        type: "timelineMilestone",
        position: { x: eventX, y: laneY },
        data: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.pathTitle,
          optionLabel: scenario.optionLabel,
          colorTheme: scenario.colorTheme,
          event,
          isSelected: selectedEventId === event.id,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      // Connect milestone to subsequent milestone within the same scenario
      if (eIndex > 0) {
        const prevEvent = scenario.timeline[eIndex - 1];
        const prevEventNodeId = `node_${scenario.id}_${prevEvent.id}`;

        edges.push({
          id: `edge_${prevEventNodeId}_to_${eventNodeId}`,
          source: prevEventNodeId,
          target: eventNodeId,
          type: "smoothstep",
          style: {
            stroke: theme.edgeColor,
            strokeWidth: 2.5,
          },
        });
      }
    });

    // Handle Child Branches that stem from this scenario
    const childBranches = replay.scenarios.filter(
      (s) => s.parentScenarioId === scenario.id
    );

    childBranches.forEach((childBranch, bIndex) => {
      // Find the parent milestone event node
      const parentEventNodeId = `node_${scenario.id}_${childBranch.parentEventId}`;
      const parentNode = nodes.find((n) => n.id === parentEventNodeId);

      const branchStartY = (parentNode?.position.y ?? laneY) + 160 + bIndex * 220;
      const branchStartX = (parentNode?.position.x ?? startX + 340) + 220;
      const childTheme = COLOR_THEME_MAP[childBranch.colorTheme] || COLOR_THEME_MAP.lavender;

      childBranch.timeline.forEach((childEvt, cIndex) => {
        const childNodeId = `node_${childBranch.id}_${childEvt.id}`;
        const childX = branchStartX + cIndex * 320;

        nodes.push({
          id: childNodeId,
          type: "timelineMilestone",
          position: { x: childX, y: branchStartY },
          data: {
            scenarioId: childBranch.id,
            scenarioTitle: childBranch.pathTitle,
            optionLabel: childBranch.optionLabel,
            colorTheme: childBranch.colorTheme,
            event: childEvt,
            isSelected: selectedEventId === childEvt.id,
            isBranch: true,
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });

        if (cIndex === 0) {
          // Edge from Parent Milestone to Child Milestone
          edges.push({
            id: `edge_branch_${parentEventNodeId}_to_${childNodeId}`,
            source: parentEventNodeId,
            target: childNodeId,
            type: "smoothstep",
            animated: true,
            style: {
              stroke: childTheme.edgeColor,
              strokeWidth: 2.5,
              strokeDasharray: "4 4",
            },
          });
        } else {
          const prevChildEvt = childBranch.timeline[cIndex - 1];
          const prevChildNodeId = `node_${childBranch.id}_${prevChildEvt.id}`;
          edges.push({
            id: `edge_${prevChildNodeId}_to_${childNodeId}`,
            source: prevChildNodeId,
            target: childNodeId,
            type: "smoothstep",
            style: {
              stroke: childTheme.edgeColor,
              strokeWidth: 2.5,
            },
          });
        }
      });
    });
  });

  return { nodes, edges };
}
