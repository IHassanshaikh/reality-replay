import { CreateDecisionInput } from "@/lib/validations/decision-schema";
import { DecisionReplay, PathColorTheme } from "@/types";
import { callGeminiStructured } from "./gemini-client";
import { buildScenarioGenerationPrompt } from "./prompts";
import { generateMockScenarios } from "./mock-engine";
import { ScenarioResponseSchema } from "@/lib/validations/scenario-schema";
import { generateId } from "@/lib/utils";

const THEMES: PathColorTheme[] = ["blue", "teal", "lavender", "neutral"];

export async function generateScenariosForDecision(
  input: CreateDecisionInput
): Promise<DecisionReplay> {
  const prompt = buildScenarioGenerationPrompt(input);
  const rawAIResponse = await callGeminiStructured<any>(prompt);

  if (rawAIResponse) {
    try {
      const parsed = ScenarioResponseSchema.safeParse(rawAIResponse);
      if (parsed.success && parsed.data.scenarios.length >= 2) {
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
          scenarios: parsed.data.scenarios.map((s, idx) => {
            const matchingOption = input.options[idx];
            return {
              ...s,
              id: s.id || generateId(`path_${idx}`),
              optionLabel: matchingOption?.label || s.optionLabel || `Option ${String.fromCharCode(65 + idx)}`,
              optionDescription: matchingOption?.text || s.optionDescription || "",
              colorTheme: s.colorTheme || THEMES[idx % THEMES.length],
              parentScenarioId: null,
              parentEventId: null,
              branchDepth: 1,
              timeline: s.timeline.map((evt, eIdx) => ({
                ...evt,
                id: evt.id || generateId(`evt_${idx}_${eIdx}`),
                horizonLabel:
                  evt.horizonLabel ||
                  (evt.horizon === "3_months"
                    ? "Month 3 · Initial Phase"
                    : evt.horizon === "1_year"
                    ? "Year 1 · Compounding Horizon"
                    : "Year 3 · Structural Outcome"),
              })),
            };
          }),
        };
      } else {
        console.warn(
          "[ScenarioEngine] Zod validation had issues, falling back to mock engine:",
          parsed.error?.format()
        );
      }
    } catch (e) {
      console.warn("[ScenarioEngine] Parsing error, falling back to mock engine:", e);
    }
  }

  return generateMockScenarios(input);
}
