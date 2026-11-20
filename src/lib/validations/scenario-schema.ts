import { z } from "zod";

export const MilestoneEventSchema = z.object({
  id: z.string(),
  horizon: z.enum(["3_months", "1_year", "3_years"]),
  horizonLabel: z.string(),
  title: z.string(),
  description: z.string(),
  opportunities: z.array(z.string()),
  challenges: z.array(z.string()),
  assumptions: z.array(z.string()),
  uncertaintyLevel: z.enum(["lower", "moderate", "higher"]),
  uncertaintyReason: z.string(),
  turningPoints: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      possibleImpact: z.string(),
    })
  ),
});

export const ScenarioAssumptionSchema = z.object({
  id: z.string(),
  statement: z.string(),
  status: z.enum(["likely", "uncertain", "unlikely"]).default("uncertain"),
});

export const ScenarioPathSchema = z.object({
  id: z.string(),
  optionLabel: z.string(),
  optionDescription: z.string(),
  pathTitle: z.string(),
  overview: z.string(),
  colorTheme: z.enum(["blue", "teal", "lavender", "neutral"]),
  timeline: z.array(MilestoneEventSchema).min(3),
  overallUncertainty: z.object({
    level: z.enum(["lower", "moderate", "higher"]),
    reason: z.string(),
  }),
  assumptions: z.array(ScenarioAssumptionSchema),
  suggestedFollowupQuestions: z.array(z.string()),
});

export const ScenarioResponseSchema = z.object({
  decisionTitle: z.string(),
  scenarios: z.array(ScenarioPathSchema).min(2),
});

export const BranchGenerationRequestSchema = z.object({
  replayId: z.string(),
  parentScenarioId: z.string(),
  parentEventId: z.string(),
  newDecision: z.string().min(5),
  options: z.array(z.string()).min(2).max(3),
});

export const BranchGenerationResponseSchema = z.object({
  parentEventTitle: z.string(),
  branchPrompt: z.string(),
  childScenarios: z.array(ScenarioPathSchema).min(2),
});

export const ComparisonResponseSchema = z.object({
  dimensions: z.array(
    z.object({
      dimension: z.string(),
      assessment: z.record(z.string()),
      explanation: z.string(),
    })
  ),
  keyDifferences: z.array(z.string()),
  importantUnknowns: z.array(z.string()),
  priorityAlignment: z.array(
    z.object({
      priority: z.string(),
      bestAlignedPathId: z.string(),
      rationale: z.string(),
    })
  ),
});
