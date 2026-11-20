import { z } from "zod";

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
  priorities: z
    .array(z.string())
    .min(1, "Select at least 1 personal priority")
    .max(3, "Select up to 3 personal priorities"),
});

export type CreateDecisionInput = z.infer<typeof CreateDecisionSchema>;
