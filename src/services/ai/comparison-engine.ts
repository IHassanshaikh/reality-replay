import { DecisionReplay, ScenarioComparison } from "@/types";
import { callGeminiStructured } from "./gemini-client";
import { buildComparisonPrompt } from "./prompts";
import { generateMockComparison } from "./mock-engine";
import { ComparisonResponseSchema } from "@/lib/validations/scenario-schema";

export async function generateComparison(replay: DecisionReplay): Promise<ScenarioComparison> {
  const prompt = buildComparisonPrompt({
    decision: replay.decision,
    priorities: replay.priorities,
    scenarios: replay.scenarios.map((s) => ({
      id: s.id,
      title: s.pathTitle,
      optionLabel: s.optionLabel,
      overview: s.overview,
    })),
  });

  const rawAI = await callGeminiStructured<any>(prompt);
  if (rawAI) {
    try {
      const parsed = ComparisonResponseSchema.safeParse(rawAI);
      if (parsed.success && parsed.data.dimensions.length > 0) {
        return {
          replayId: replay.id,
          dimensions: parsed.data.dimensions,
          keyDifferences: parsed.data.keyDifferences,
          importantUnknowns: parsed.data.importantUnknowns,
          priorityAlignment: parsed.data.priorityAlignment,
        };
      }
    } catch (e) {
      console.warn("[ComparisonEngine] Schema validation error, using mock:", e);
    }
  }

  return generateMockComparison(replay);
}
