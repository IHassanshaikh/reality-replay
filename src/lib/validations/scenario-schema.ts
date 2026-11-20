import { z } from "zod";

export const MilestoneEventSchema = z.object({
  id: z.string().optional().default(""),
  horizon: z.enum(["3_months", "1_year", "3_years"]).optional().default("1_year"),
  horizonLabel: z.string().optional().default("Milestone Horizon"),
  title: z.string().default("Milestone"),
  description: z.string().default("Hypothetical development event."),
  opportunities: z.array(z.string()).optional().default([]),
  challenges: z.array(z.string()).optional().default([]),
  assumptions: z.array(z.string()).optional().default([]),
  uncertaintyLevel: z.enum(["lower", "moderate", "higher"]).optional().default("moderate"),
  uncertaintyReason: z.string().optional().default("General uncertainty across this horizon."),
  turningPoints: z
    .array(
      z.object({
        title: z.string().default("Turning Point"),
        description: z.string().default("Catalyst event"),
        possibleImpact: z.string().default("High potential impact on trajectory"),
      })
    )
    .optional()
    .default([]),
});

export const ScenarioAssumptionSchema = z.object({
  id: z.string().optional().default(""),
  statement: z.string(),
  status: z.enum(["likely", "uncertain", "unlikely"]).optional().default("uncertain"),
});

export const ScenarioPathSchema = z.object({
  id: z.string().optional().default(""),
  optionLabel: z.string().optional().default("Option"),
  optionDescription: z.string().optional().default(""),
  pathTitle: z.string().default("Hypothetical Path"),
  overview: z.string().default("An alternative future trajectory."),
  colorTheme: z.enum(["blue", "teal", "lavender", "neutral"]).optional().default("blue"),
  timeline: z.array(MilestoneEventSchema).default([]),
  overallUncertainty: z
    .object({
      level: z.enum(["lower", "moderate", "higher"]).optional().default("moderate"),
      reason: z.string().optional().default("Outcome depends on multiple external variables."),
    })
    .optional()
    .default({
      level: "moderate",
      reason: "Outcome depends on multiple external variables.",
    }),
  assumptions: z.array(ScenarioAssumptionSchema).optional().default([]),
  suggestedFollowupQuestions: z.array(z.string()).optional().default([]),
});

export const ScenarioResponseSchema = z.object({
  decisionTitle: z.string().optional().default("Decision Exploration"),
  scenarios: z.array(ScenarioPathSchema).default([]),
});

export const BranchGenerationRequestSchema = z.object({
  replayId: z.string(),
  parentScenarioId: z.string(),
  parentEventId: z.string(),
  newDecision: z.string().min(5),
  options: z.array(z.string()).min(2).max(3),
});

export const BranchGenerationResponseSchema = z.object({
  parentEventTitle: z.string().optional().default("Branch Point"),
  branchPrompt: z.string().optional().default("New branch dilemma"),
  childScenarios: z.array(ScenarioPathSchema).default([]),
});

export const ComparisonResponseSchema = z.object({
  dimensions: z
    .array(
      z.object({
        dimension: z.string(),
        assessment: z.record(z.string()).default({}),
        explanation: z.string().default(""),
      })
    )
    .default([]),
  keyDifferences: z.array(z.string()).default([]),
  importantUnknowns: z.array(z.string()).default([]),
  priorityAlignment: z
    .array(
      z.object({
        priority: z.string(),
        bestAlignedPathId: z.string(),
        rationale: z.string(),
      })
    )
    .default([]),
});
