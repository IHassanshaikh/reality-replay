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

BRUTAL HONESTY & ANTI-OPTIMISM BIAS RULES (CRITICAL):
1. NEVER sugarcoat outcomes or force a happy ending. Resist default AI positivity.
2. Be real, candid, and unvarnished—even bitter or blunt—whenever the user's plan has serious flaws, weak assumptions, or structural mismatches.
3. If the user's Financial Runway, Experience Level, or Constraints make an option unsustainable or naive, DO NOT magically rescue it. Show the actual failure mode: cash depletion, zero traction, burnout, layoff, toxic politics, relationship strain, forced retreat, or bitter regret.
4. Not every path should end in success at Year 3. Some paths plateau into golden handcuffs and quiet resentment; some crash within 12 months; some succeed financially at the cost of health or personal life.
5. Expose blind spots directly in the milestone descriptions and challenges. Mark fragile or wishful premises honestly as "unlikely" in the assumptions list.
6. Keep it grounded and realistic—not cartoonishly bleak, just ruthlessly honest about real-world odds, friction, and human psychology.

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
Be brutally honest and realistic—DO NOT make every path succeed or end happily. If an option clashes with their financial runway, experience level, or constraints, explicitly show the harsh consequences (runway burn, stalled traction, burnout, forced retreat, golden handcuffs, or bitter regret). Call out flawed premises bluntly in challenges and mark unrealistic assumptions as "unlikely".
Each scenario must project 3 milestone events tailored specifically to the user's bio, interests, and worst-case fear:
- 3_months: Short term early friction, reality checks, or initial momentum
- 1_year: Compounding consequences, operational strain, or painful crossroads
- 3_years: Structural outcomes, lasting trade-offs, regret, or earned stability

Also include 3 key assumptions for each path with status ("likely", "uncertain", or "unlikely"), and 2 provocative follow-up questions that could trigger branching.

Return strictly valid JSON matching this exact structure:
{
  "decisionTitle": "Concise title for the overall dilemma",
  "scenarios": [
    {
      "optionLabel": "Option A",
      "optionDescription": "Full description of option",
      "pathTitle": "Memorable 3-5 word thematic title (e.g., The Corporate Ascent)",
      "overview": "2-sentence overview of this trajectory",
      "colorTheme": "blue",
      "overallUncertainty": {
        "level": "moderate",
        "reason": "Specific factual reason for this uncertainty level"
      },
      "assumptions": [
        {
          "id": "asm_1",
          "statement": "Specific premise that must hold true for this path to succeed",
          "status": "likely"
        },
        {
          "id": "asm_2",
          "statement": "Second key assumption",
          "status": "uncertain"
        },
        {
          "id": "asm_3",
          "statement": "Third key assumption",
          "status": "unlikely"
        }
      ],
      "suggestedFollowupQuestions": [
        "Provocative what-if question 1?",
        "Provocative what-if question 2?"
      ],
      "timeline": [
        {
          "id": "evt_1",
          "horizon": "3_months",
          "horizonLabel": "Month 3 · Early Phase",
          "title": "Specific milestone title",
          "description": "Detailed narrative of what happens at Month 3",
          "opportunities": ["Opportunity 1", "Opportunity 2"],
          "challenges": ["Challenge 1", "Challenge 2"],
          "assumptions": ["Milestone-specific assumption"],
          "uncertaintyLevel": "lower",
          "uncertaintyReason": "Why this milestone has this uncertainty",
          "turningPoints": [
            {
              "title": "Unexpected Catalyst",
              "description": "What unexpected event occurs",
              "possibleImpact": "How it changes the trajectory"
            }
          ]
        }
      ]
    }
  ]
}
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
1. Provide candid, unvarnished qualitative assessments across dimensions like Financial Stability, Learning Velocity, Personal Autonomy, Stress/Risk, and Career Compounding.
2. Be brutally honest—if a path carries high burnout, financial ruin, or stagnation risk, state it plainly without softening the blow.
3. DO NOT declare one future objectively superior or calculate fake percentages.
4. Explain which path best aligns with each of the user's specific priorities and what painful sacrifice it demands in return.
5. Highlight the 3 biggest differences between these futures and the critical unknowns.
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
