import { z } from "zod";

export const UserProfileSchema = z.object({
  name: z.string().optional().default("Explorer"),
  occupation: z.string().default("Software Engineer / Builder"),
  industry: z.string().default("Technology & AI"),
  experienceLevel: z.string().default("Mid-Level (4-7 yrs)"),
  interests: z.array(z.string()).default(["Artificial Intelligence", "Building Products", "Financial Independence"]),
  riskTolerance: z.string().default("Moderate (Calculated Risks)"),
  financialRunway: z.string().default("6-12 months"),
  lifeStage: z.string().optional().default("Independent professional"),
});

export const ReplayDiagnosticsSchema = z.object({
  primaryMotivation: z.string().default("Seeking accelerated growth and higher personal autonomy."),
  worstCaseFear: z.string().default("Running out of runway or experiencing deep career regret."),
  decisionWindow: z.string().default("Next 30 to 90 days."),
  stakeholdersImpacted: z.string().default("Self and close family."),
});

export const CreateDecisionSchema = z.object({
  decision: z.string().min(5, "Decision description must be at least 5 characters long"),
  options: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        text: z.string().min(2, "Option description cannot be empty"),
      })
    )
    .min(2, "Please provide at least 2 options")
    .max(4, "Maximum 4 options allowed"),
  context: z.object({
    currentSituation: z.string().min(3, "Current situation is required"),
    resources: z.string().optional().default(""),
    constraints: z.array(z.string()).default([]),
    timeHorizon: z.string().default("3 years"),
    relevantExperience: z.string().optional().default(""),
  }),
  userProfile: UserProfileSchema.optional(),
  diagnostics: ReplayDiagnosticsSchema.optional(),
  priorities: z
    .array(z.string())
    .min(1, "Select at least 1 personal priority")
    .max(3, "Select up to 3 personal priorities"),
});

export type CreateDecisionInput = z.infer<typeof CreateDecisionSchema>;
