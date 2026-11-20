import { CreateDecisionInput } from "@/lib/validations/decision-schema";
import { DecisionReplay } from "@/types";
import { callGeminiStructured } from "./gemini-client";
import { buildScenarioGenerationPrompt } from "./prompts";
import { generateMockScenarios } from "./mock-engine";
import { ScenarioResponseSchema } from "@/lib/validations/scenario-schema";
import { generateId } from "@/lib/utils";

export async function generateScenariosForDecision(
  input: CreateDecisionInput
): Promise<DecisionReplay> {
  const prompt = buildScenarioGenerationPrompt(input);
  const rawAIResponse = await callGeminiStructured<any>(prompt);

  if (rawAIResponse) {
    try {
      const parsed = ScenarioResponseSchema.safeParse(rawAIResponse);
      if (parsed.success) {
        return {
          id: generateId("replay"),
          title: parsed.data.decisionTitle || input.decision,
          decision: input.decision,
          options: input.options,
          context: input.context,
          priorities: input.priorities,
          branchesExploredCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          scenarios: parsed.data.scenarios.map((s, idx) => ({
            ...s,
            id: s.id || generateId(`path_${idx}`),
            parentScenarioId: null,
            parentEventId: null,
            branchDepth: 1,
            timeline: s.timeline.map((evt) => ({
              ...evt,
              id: evt.id || generateId(`evt_${idx}`),
            })),
          })),
        };
      } else {
        console.warn("[ScenarioEngine] Zod validation failed for live output, using fallback:", parsed.error.format());
      }
    } catch (e) {
      console.warn("[ScenarioEngine] Parsing error, falling back to mock engine:", e);
    }
  }

  return generateMockScenarios(input);
}
