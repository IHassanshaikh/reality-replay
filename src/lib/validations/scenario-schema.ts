import { z } from "zod";

function normalizeHorizon(val: unknown): "3_months" | "1_year" | "3_years" {
  const s = String(val || "").toLowerCase();
  if (s.includes("3_m") || s.includes("3 m") || s.includes("month 3") || s.includes("three month")) return "3_months";
  if (s.includes("3_y") || s.includes("3 y") || s.includes("year 3") || s.includes("three year")) return "3_years";
  return "1_year";
}

function normalizeUncertainty(val: unknown): "lower" | "moderate" | "higher" {
  const s = String(val || "").toLowerCase();
  if (s.includes("low")) return "lower";
  if (s.includes("high")) return "higher";
  return "moderate";
}

function normalizeColorTheme(val: unknown): "blue" | "teal" | "lavender" | "neutral" {
  const s = String(val || "").toLowerCase();
  if (s.includes("teal") || s.includes("green") || s.includes("emerald")) return "teal";
  if (s.includes("lavender") || s.includes("purple") || s.includes("violet")) return "lavender";
  if (s.includes("neutral") || s.includes("slate") || s.includes("gray")) return "neutral";
  return "blue";
}

function normalizeAssumptionStatus(val: unknown): "likely" | "uncertain" | "unlikely" {
  const s = String(val || "").toLowerCase();
  if (s.includes("unlikely")) return "unlikely";
  if (s.includes("likely")) return "likely";
  return "uncertain";
}

export const MilestoneEventSchema = z.preprocess(
  (val: any) => {
    if (typeof val !== "object" || val === null) return val;
    return {
      ...val,
      title: val.title || val.eventTitle || val.name || "Milestone Development",
      description: val.description || val.summary || "Hypothetical event details.",
      horizon: normalizeHorizon(val.horizon || val.timeHorizon || val.horizonLabel),
      uncertaintyLevel: normalizeUncertainty(val.uncertaintyLevel || val.uncertainty),
      opportunities: Array.isArray(val.opportunities || val.benefits || val.pros) ? (val.opportunities || val.benefits || val.pros) : [],
      challenges: Array.isArray(val.challenges || val.risks || val.obstacles || val.cons) ? (val.challenges || val.risks || val.obstacles || val.cons) : [],
      assumptions: Array.isArray(val.assumptions) ? val.assumptions : [],
      turningPoints: Array.isArray(val.turningPoints || val.turning_points) ? (val.turningPoints || val.turning_points) : [],
    };
  },
  z.object({
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
  })
);

export const ScenarioAssumptionSchema = z.preprocess(
  (val: any) => {
    if (typeof val === "string") {
      return { statement: val, status: "uncertain" };
    }
    if (typeof val === "object" && val !== null) {
      return {
        ...val,
        statement: val.statement || val.assumption || val.text || "Key scenario assumption",
        status: normalizeAssumptionStatus(val.status),
      };
    }
    return val;
  },
  z.object({
    id: z.string().optional().default(""),
    statement: z.string(),
    status: z.enum(["likely", "uncertain", "unlikely"]).optional().default("uncertain"),
  })
);

export const ScenarioPathSchema = z.preprocess(
  (val: any) => {
    if (typeof val !== "object" || val === null) return val;
    const rawUncertainty = val.overallUncertainty;
    const normalizedUncertainty =
      typeof rawUncertainty === "string"
        ? { level: normalizeUncertainty(rawUncertainty), reason: "Outcome depends on external variables." }
        : typeof rawUncertainty === "object" && rawUncertainty !== null
        ? {
            level: normalizeUncertainty(rawUncertainty.level),
            reason: rawUncertainty.reason || "Outcome depends on multiple external variables.",
          }
        : undefined;

    return {
      ...val,
      pathTitle: val.pathTitle || val.title || val.scenarioTitle || val.name || "Hypothetical Path",
      overview: val.overview || val.summary || val.description || "Alternative trajectory overview.",
      colorTheme: normalizeColorTheme(val.colorTheme || val.theme || val.color),
      overallUncertainty: normalizedUncertainty,
      timeline: Array.isArray(val.timeline || val.events || val.milestones) ? (val.timeline || val.events || val.milestones) : [],
      assumptions: Array.isArray(val.assumptions) ? val.assumptions : [],
      suggestedFollowupQuestions: Array.isArray(val.suggestedFollowupQuestions || val.nextDecisions || val.questions)
        ? (val.suggestedFollowupQuestions || val.nextDecisions || val.questions)
        : [],
    };
  },
  z.object({
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
  })
);

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
