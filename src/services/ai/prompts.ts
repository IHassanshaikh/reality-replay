export const MASTER_SYSTEM_PROMPT = `
You are the Reality Replay Scenario Engine.
Your responsibility is to help users explore alternative hypothetical futures arising from real-life decisions.

You are NOT a fortune teller.
You are NOT a financial, legal, medical, or professional advisor.
You must never claim to know what will happen in someone's life.

CORE OBJECTIVE:
Transform a user's decision and available choices into distinct, coherent, hypothetical scenario timelines.

SCENARIO RULES:
1. Create a separate scenario for every provided option.
2. Make each scenario meaningfully different with a distinct trajectory and theme.
3. Respect the user's actual circumstances, constraints, and priorities.
4. Never invent unsupported personal information or fake background facts.
5. Clearly distinguish provided facts from assumptions.
6. Include realistic opportunities and genuine disadvantages/trade-offs.
7. Avoid making every scenario unrealistically positive or overly catastrophic.
8. Include unexpected but plausible turning points for each milestone.
9. Explore consequences at 3 distinct time horizons: "3_months" (Early developments), "1_year" (Medium-term developments), "3_years" (Long-term possibilities).
10. Assign a colorTheme to each option: Path A -> "blue", Path B -> "teal", Path C -> "lavender", and subsequent -> "neutral".

UNCERTAINTY RULES:
1. Never fabricate statistical probabilities (e.g. "78% chance of success").
2. Never claim an outcome is guaranteed.
3. Categorize uncertainty as "lower", "moderate", or "higher" with an explicit reason.
4. Distinguish plausible possibilities from established facts.

OUTPUT RULES:
Return strictly valid JSON matching the requested JSON schema without any surrounding markdown backticks or commentary.
`;

export function buildScenarioGenerationPrompt(input: {
  decision: string;
  options: { label: string; text: string }[];
  context: {
    currentSituation: string;
    resources?: string;
    constraints: string[];
    timeHorizon: string;
    relevantExperience?: string;
  };
  priorities: string[];
}) {
  return `
DECISION TO EXPLORE:
"${input.decision}"

OPTIONS CONSIDERED:
${input.options.map((opt) => `- ${opt.label}: ${opt.text}`).join("\n")}

USER CONTEXT:
- Current Situation: ${input.context.currentSituation}
- Resources: ${input.context.resources || "Standard personal resources"}
- Constraints: ${input.context.constraints.length ? input.context.constraints.join(", ") : "None specified"}
- Time Horizon: ${input.context.timeHorizon}
- Relevant Experience: ${input.context.relevantExperience || "Not specified"}

PERSONAL PRIORITIES (Ranked most important):
${input.priorities.map((p, idx) => `${idx + 1}. ${p}`).join("\n")}

INSTRUCTIONS:
Generate a scenario path for EACH of the ${input.options.length} options.
Each scenario must include 3 milestone events:
- 3_months: Short term early friction or momentum
- 1_year: Consolidation, compounding effects, or operational shifts
- 3_years: Structural outcomes, personal satisfaction, and lasting trade-offs

Also include 3 key assumptions for each path with status ("likely", "uncertain", or "unlikely"), and 2 provocative follow-up questions that could trigger branching.

Ensure your JSON strictly adheres to the schema.
`;
}

export function buildBranchGenerationPrompt(input: {
  originalDecision: string;
  parentPathTitle: string;
  eventTitle: string;
  eventDescription: string;
  horizon: string;
  newDecision: string;
  options: string[];
  context: any;
}) {
  return `
You are expanding a decision tree branch in Reality Replay.

ORIGINAL CONTEXT:
Decision: "${input.originalDecision}"
Parent Timeline Path: "${input.parentPathTitle}"
Branching Point (At ${input.horizon}): "${input.eventTitle}"
Event Context: "${input.eventDescription}"

NEW DILEMMA AT THIS MOMENT:
"${input.newDecision}"

BRANCH CHOICES:
${input.options.map((opt, idx) => `Choice ${idx + 1}: ${opt}`).join("\n")}

INSTRUCTIONS:
Generate ${input.options.length} divergent child scenario paths stemming directly from this milestone moment.
For each choice, project how this specific pivot ripples forward across the subsequent milestones up to 3 years.
Return valid JSON.
`;
}

export function buildComparisonPrompt(input: {
  decision: string;
  priorities: string[];
  scenarios: {
    id: string;
    title: string;
    optionLabel: string;
    overview: string;
  }[];
}) {
  return `
Compare the following hypothetical futures for the decision: "${input.decision}"

SCENARIOS:
${input.scenarios.map((s) => `- [${s.id}] ${s.optionLabel}: "${s.title}" (${s.overview})`).join("\n")}

USER'S CHOSEN PRIORITIES:
${input.priorities.join(", ")}

INSTRUCTIONS:
1. Provide qualitative assessments across dimensions like Financial Stability, Learning Velocity, Personal Autonomy, Stress/Risk, and Career Compounding.
2. DO NOT declare one future objectively superior or calculate fake percentages.
3. Explain which path best aligns with each of the user's specific priorities and why.
4. Highlight the 3 biggest differences between these futures and the critical unknowns.
`;
}
