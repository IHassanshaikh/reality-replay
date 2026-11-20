import { DecisionReplay, MilestoneEvent, ScenarioPath } from "@/types";
import { callGeminiStructured } from "./gemini-client";
import { buildBranchGenerationPrompt } from "./prompts";
import { generateMockBranch } from "./mock-engine";
import { BranchGenerationResponseSchema } from "@/lib/validations/scenario-schema";
import { generateId } from "@/lib/utils";

export async function generateBranchScenarios(params: {
  replay: DecisionReplay;
  parentScenario: ScenarioPath;
  parentEvent: MilestoneEvent;
  newDecision: string;
  options: string[];
}): Promise<ScenarioPath[]> {
  const prompt = buildBranchGenerationPrompt({
    originalDecision: params.replay.decision,
    parentPathTitle: params.parentScenario.pathTitle,
    eventTitle: params.parentEvent.title,
    eventDescription: params.parentEvent.description,
    horizon: params.parentEvent.horizonLabel,
    newDecision: params.newDecision,
    options: params.options,
    context: params.replay.context,
  });

  const rawAI = await callGeminiStructured<any>(prompt);
  if (rawAI) {
    try {
      const parsed = BranchGenerationResponseSchema.safeParse(rawAI);
      if (parsed.success && parsed.data.childScenarios.length > 0) {
        return parsed.data.childScenarios.map((cs, idx) => ({
          ...cs,
          id: cs.id || generateId(`branch_${params.parentScenario.id}`),
          parentScenarioId: params.parentScenario.id,
          parentEventId: params.parentEvent.id,
          branchDepth: (params.parentScenario.branchDepth || 1) + 1,
          timeline: cs.timeline.map((evt) => ({
            ...evt,
            id: evt.id || generateId(`evt_child_${idx}`),
          })),
        }));
      }
    } catch (e) {
      console.warn("[BranchEngine] Branch schema validation error, falling back:", e);
    }
  }

  return generateMockBranch(params);
}
