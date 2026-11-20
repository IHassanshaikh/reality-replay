export const MASTER_SYSTEM_PROMPT = `
You are the Reality Replay Scenario Engine.
Your responsibility is to help users explore alternative hypothetical futures arising from real-life decisions.

You are NOT a fortune teller.
You are NOT a financial, legal, medical, or professional advisor.
You must never claim to know what will happen in someone's life.

CORE OBJECTIVE:
Transform a user's decision, available choices, detailed bio, personal interests, and diagnostic probe answers into deeply tailored, highly accurate, and distinct hypothetical scenario timelines.

ACCURACY & PERSONALIZATION RULES:
1. Ground the trajectory in the user's actual Occupation, Industry, Experience Level, Core Interests, and Financial Runway.
2. Directly address the user's stated Primary Motivation and explicitly test their Worst-Case Fear across the milestones.
3. Respect their Risk Tolerance: an aggressive risk taker encounters high-volatility upside/downside, while a conservative user faces institutional pacing and stability trade-offs.
4. Create a separate scenario for every provided option.
5. Make each scenario meaningfully different with a distinct trajectory, lifestyle reality, and strategic theme.
6. Never invent unsupported background facts about the user.
7. Include realistic opportunities and genuine disadvantages/trade-offs.
8. Include unexpected but plausible turning points for each milestone.
9. Explore consequences at 3 distinct time horizons: "3_months" (Early adjustments), "1_year" (Compounding shifts), "3_years" (Structural outcomes).
10. Assign a colorTheme to each option: Path A -> "blue", Path B -> "teal", Path C -> "lavender", and subsequent -> "neutral".

UNCERTAINTY RULES:
1. Never fabricate statistical probabilities (e.g. "78% chance of success").
2. Categorize uncertainty as "lower", "moderate", or "higher" with an explicit factual reason.

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
  userProfile?: {
    name?: string;
    occupation: string;
    industry: string;
    experienceLevel: string;
    interests: string[];
    riskTolerance: string;
    financialRunway: string;
    lifeStage?: string;
  };
  diagnostics?: {
    primaryMotivation: string;
    worstCaseFear: string;
    decisionWindow: string;
    stakeholdersImpacted: string;
  };
  priorities: string[];
}) {
  const profileSection = input.userProfile
    ? `
USER BIO & PROFILE:
- Current Role/Occupation: ${input.userProfile.occupation}
- Industry/Domain: ${input.userProfile.industry}
- Experience Level: ${input.userProfile.experienceLevel}
- Core Interests & Passions: ${input.userProfile.interests?.join(", ") || "General tech and growth"}
- Risk Tolerance Profile: ${input.userProfile.riskTolerance}
- Financial Runway / Cushion: ${input.userProfile.financialRunway}
- Life Stage: ${input.userProfile.lifeStage || "Independent professional"}
`
    : "";

  const diagnosticsSection = input.diagnostics
    ? `
DECISION DIAGNOSTIC PROBE ANSWERS:
- Primary Motivation Driving This Pivot: "${input.diagnostics.primaryMotivation}"
- Biggest Worst-Case Fear / Deal-Breaker: "${input.diagnostics.worstCaseFear}"
- Decision Window / Urgency: "${input.diagnostics.decisionWindow}"
- Stakeholders Directly Impacted: "${input.diagnostics.stakeholdersImpacted}"
`
    : "";

  return `
DECISION TO EXPLORE:
"${input.decision}"

OPTIONS CONSIDERED:
${input.options.map((opt) => `- ${opt.label}: ${opt.text}`).join("\n")}
${profileSection}
${diagnosticsSection}
USER SITUATION & CONSTRAINTS:
- Current Situation: ${input.context.currentSituation}
- Resources: ${input.context.resources || "Standard personal resources"}
- Constraints: ${input.context.constraints.length ? input.context.constraints.join(", ") : "None specified"}
- Time Horizon: ${input.context.timeHorizon}
- Relevant Experience: ${input.context.relevantExperience || "Not specified"}

PERSONAL PRIORITIES (Ranked most important):
${input.priorities.map((p, idx) => `${idx + 1}. ${p}`).join("\n")}

INSTRUCTIONS:
Generate a scenario path for EACH of the ${input.options.length} options.
Each scenario must project 3 milestone events tailored specifically to the user's bio, interests, and worst-case fear:
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
  userProfile?: any;
}) {
  return `
You are expanding a decision tree branch in Reality Replay.

ORIGINAL CONTEXT:
Decision: "${input.originalDecision}"
Parent Timeline Path: "${input.parentPathTitle}"
Branching Point (At ${input.horizon}): "${input.eventTitle}"
Event Context: "${input.eventDescription}"
${input.userProfile ? `User Profile: ${input.userProfile.occupation} in ${input.userProfile.industry} (${input.userProfile.experienceLevel})` : ""}

NEW DILEMMA AT THIS MOMENT:
"${input.newDecision}"

BRANCH CHOICES:
${input.options.map((opt, idx) => `Choice ${idx + 1}: ${opt}`).join("\n")}

INSTRUCTIONS:
Generate ${input.options.length} divergent child scenario paths stemming directly from this milestone moment.
For each choice, project how this specific pivot ripples forward across the subsequent milestones up to 3 years.
Return valid JSON matching this exact structure:
{
  "parentEventTitle": "${input.eventTitle}",
  "branchPrompt": "${input.newDecision}",
  "childScenarios": [
    {
      "optionLabel": "Branch A",
      "optionDescription": "Description of choice 1",
      "pathTitle": "Descriptive Title for Path A",
      "overview": "Overview of this child path",
      "colorTheme": "lavender",
      "overallUncertainty": {
        "level": "moderate",
        "reason": "Why uncertainty is moderate"
      },
      "assumptions": [
        {
          "id": "asm_1",
          "statement": "Crucial assumption that must hold true",
          "status": "likely"
        }
      ],
      "suggestedFollowupQuestions": ["Follow up dilemma question"],
      "timeline": [
        {
          "id": "evt_b1",
          "horizon": "1_year",
          "horizonLabel": "Year 1 · Immediate Aftermath",
          "title": "Milestone title",
          "description": "What happened",
          "opportunities": ["Opportunity 1"],
          "challenges": ["Risk 1"],
          "assumptions": ["Underlying assumption"],
          "uncertaintyLevel": "moderate",
          "uncertaintyReason": "Reason for uncertainty",
          "turningPoints": []
        }
      ]
    }
  ]
}
`;
}

export function buildComparisonPrompt(input: {
  decision: string;
  priorities: string[];
  userProfile?: any;
  diagnostics?: any;
  scenarios: {
    id: string;
    title: string;
    optionLabel: string;
    overview: string;
  }[];
}) {
  return `
Compare the following hypothetical futures for the decision: "${input.decision}"
${input.userProfile ? `User: ${input.userProfile.occupation} (${input.userProfile.experienceLevel})` : ""}
${input.diagnostics?.worstCaseFear ? `Worst-Case Fear: ${input.diagnostics.worstCaseFear}` : ""}

SCENARIOS:
${input.scenarios.map((s) => `- [${s.id}] ${s.optionLabel}: "${s.title}" (${s.overview})`).join("\n")}

USER'S CHOSEN PRIORITIES:
${input.priorities.join(", ")}

INSTRUCTIONS:
1. Provide qualitative assessments across dimensions like Financial Stability, Learning Velocity, Personal Autonomy, Stress/Risk, and Career Compounding.
2. DO NOT declare one future objectively superior or calculate fake percentages.
3. Explain which path best aligns with each of the user's specific priorities and why.
4. Highlight the 3 biggest differences between these futures and the critical unknowns.
Return valid JSON matching this exact structure:
{
  "dimensions": [
    {
      "dimension": "Financial Stability",
      "assessment": {
        "${input.scenarios[0]?.id || "path_1"}": "Higher upfront stability, lower long-term ceiling",
        "${input.scenarios[1]?.id || "path_2"}": "High short-term volatility, significant equity upside"
      },
      "explanation": "Explanation of financial trade-offs between paths"
    }
  ],
  "keyDifferences": [
    "Primary difference 1",
    "Primary difference 2",
    "Primary difference 3"
  ],
  "importantUnknowns": [
    "Critical unknown 1",
    "Critical unknown 2"
  ],
  "priorityAlignment": [
    {
      "priority": "${input.priorities[0] || "Learning opportunities"}",
      "bestAlignedPathId": "${input.scenarios[0]?.id || "path_1"}",
      "rationale": "Why this path best aligns with this priority"
    }
  ]
}
`;
}
