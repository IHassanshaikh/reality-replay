import { CreateDecisionInput } from "@/lib/validations/decision-schema";
import {
  DecisionReplay,
  MilestoneEvent,
  ScenarioPath,
  ScenarioComparison,
  UncertaintyLevel,
  PathColorTheme,
} from "@/types";
import { generateId } from "@/lib/utils";
import { SHOWCASE_REPLAY, SHOWCASE_COMPARISON } from "./showcase-data";

export function generateMockScenarios(input: CreateDecisionInput): DecisionReplay {
  const isShowcase =
    input.decision.toLowerCase().includes("university") ||
    input.decision.toLowerCase().includes("internship") ||
    input.decision.toLowerCase().includes("product");

  if (isShowcase && input.options.length === 3) {
    return {
      ...SHOWCASE_REPLAY,
      id: generateId("replay"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const themes: PathColorTheme[] = ["blue", "teal", "lavender", "neutral"];

  const scenarios: ScenarioPath[] = input.options.map((opt, idx) => {
    const theme = themes[idx % themes.length];
    const pathTitle = derivePathTitle(opt.text, idx);
    const uncertaintyLevel: UncertaintyLevel =
      idx === 0 ? "lower" : idx === 1 ? "moderate" : "higher";

    const timeline: MilestoneEvent[] = [
      {
        id: generateId(`evt_${idx}_3m`),
        horizon: "3_months",
        horizonLabel: "Month 3 · Initial Adjustments",
        title: `Adapting to ${opt.label}: Early Feedback & Momentum`,
        description: `You commit fully to "${opt.text}". In the first 90 days, you establish new operating rhythms and encounter the first real-world friction points.`,
        opportunities: [
          `Rapid initial calibration in ${input.priorities[0] || "primary focus"}`,
          `Building early confidence through immediate daily commitments`,
        ],
        challenges: [
          `Unanticipated cognitive load adjusting to new lifestyle routines`,
          `Slight friction balancing secondary personal priorities`,
        ],
        assumptions: [
          `Initial energy and motivation remain high throughout the transition`,
          `External support system remains positive regarding this choice`,
        ],
        uncertaintyLevel,
        uncertaintyReason: `Early adoption depends on how quickly you overcome the 90-day learning curve.`,
        turningPoints: [
          {
            title: "Unexpected Catalyst",
            description: "An unpredicted contact or early breakthrough changes your initial timeline.",
            possibleImpact: "Accelerates milestones ahead of the anticipated 6-month projection.",
          },
        ],
      },
      {
        id: generateId(`evt_${idx}_1y`),
        horizon: "1_year",
        horizonLabel: "Year 1 · Compounding Realities",
        title: `Consolidation & First Major Crossroads`,
        description: `Twelve months in, the initial novelty has dissolved into daily execution. Core trade-offs of "${opt.text}" become unavoidable.`,
        opportunities: [
          `Tangible results visible in ${input.priorities[0] || "key areas"}`,
          `Expanded network and credibility inside this specific domain`,
        ],
        challenges: [
          `Opportunity cost: seeing alternative paths advance in different directions`,
          `Need for renewed discipline or capital injection to sustain trajectory`,
        ],
        assumptions: [
          `Market and environmental conditions stay reasonably stable`,
          `Your personal priorities don't experience a radical values shift`,
        ],
        uncertaintyLevel: idx === 0 ? "moderate" : uncertaintyLevel,
        uncertaintyReason: `Annual milestones reveal whether long-term compounding is taking root.`,
        turningPoints: [
          {
            title: "The Strategic Pivot",
            description: "A critical external change forces you to choose between doubling down or adjusting scope.",
            possibleImpact: "Can create a major divergent branch in your long-term outcome.",
          },
        ],
      },
      {
        id: generateId(`evt_${idx}_3y`),
        horizon: "3_years",
        horizonLabel: "Year 3 · Structural Horizons",
        title: `The Established Identity & Lasting Trade-offs`,
        description: `Three years in, "${opt.text}" has fundamentally reshaped your professional identity, peer circle, and daily reality.`,
        opportunities: [
          `Deep domain mastery and strong positioning within this niche`,
          `Clear clarity on your true tolerance for risk vs. security`,
        ],
        challenges: [
          `Switching costs to other paths are now significantly higher`,
          `Ongoing management of the sacrifices made in secondary life areas`,
        ],
        assumptions: [
          `This path continues offering upward leverage and personal meaning`,
        ],
        uncertaintyLevel,
        uncertaintyReason: `3-year horizons naturally incorporate macro shifts and personal maturation.`,
        turningPoints: [
          {
            title: "The Legacy Decision",
            description: "You reach a plateau where you can either institutionalize this path or make an entirely new pivot.",
            possibleImpact: "Determines your trajectory for the subsequent five years.",
          },
        ],
      },
    ];

    return {
      id: generateId(`path_${idx}`),
      optionLabel: opt.label,
      optionDescription: opt.text,
      pathTitle,
      overview: `A distinct hypothetical trajectory exploring the immediate and 3-year reverberations of choosing "${opt.text}".`,
      colorTheme: theme,
      timeline,
      overallUncertainty: {
        level: uncertaintyLevel,
        reason:
          uncertaintyLevel === "lower"
            ? "Path leverages established conventions and predictable rules."
            : uncertaintyLevel === "moderate"
            ? "Trajectory balances known execution with external variables."
            : "Path contains high volatility and relies heavily on external timing and market reception.",
      },
      assumptions: [
        {
          id: generateId("asm_1"),
          statement: `Key constraints (${input.context.constraints.join(", ") || "standard parameters"}) can be actively managed.`,
          status: "likely",
        },
        {
          id: generateId("asm_2"),
          statement: `Your commitment to "${opt.text}" sustains through the low-motivation troughs.`,
          status: "uncertain",
        },
        {
          id: generateId("asm_3"),
          statement: `Prioritizing ${input.priorities[0] || "this goal"} brings personal fulfillment over monetary certainty.`,
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        `What if you face an unexpected financial roadblock at month 6?`,
        `What if a mentor advises you to change strategic directions?`,
      ],
    };
  });

  return {
    id: generateId("replay"),
    title: input.decision,
    decision: input.decision,
    options: input.options,
    context: input.context,
    priorities: input.priorities,
    branchesExploredCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    scenarios,
  };
}

export function generateMockBranch(params: {
  replay: DecisionReplay;
  parentScenario: ScenarioPath;
  parentEvent: MilestoneEvent;
  newDecision: string;
  options: string[];
}): ScenarioPath[] {
  const themes: PathColorTheme[] = ["lavender", "teal", "blue"];
  return params.options.map((optText, idx) => {
    const branchColor = themes[idx % themes.length];
    return {
      id: generateId(`branch_${params.parentScenario.id}`),
      optionLabel: `Branch ${String.fromCharCode(65 + idx)}`,
      optionDescription: optText,
      pathTitle: `Pivot: ${optText.slice(0, 32)}...`,
      overview: `Child timeline branching from "${params.parentEvent.title}" at ${params.parentEvent.horizonLabel}. Exploring: ${optText}`,
      colorTheme: branchColor,
      parentScenarioId: params.parentScenario.id,
      parentEventId: params.parentEvent.id,
      branchDepth: (params.parentScenario.branchDepth || 1) + 1,
      overallUncertainty: {
        level: "moderate",
        reason: "Branching outcomes introduce new localized uncertainties.",
      },
      assumptions: [
        {
          id: generateId("asm_b1"),
          statement: `The decision to "${optText}" can be executed within 60 days.`,
          status: "likely",
        },
        {
          id: generateId("asm_b2"),
          statement: `Parent timeline momentum is not completely lost during this pivot.`,
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        "What if the team or market resists this strategic shift?",
      ],
      timeline: [
        {
          id: generateId(`evt_child_${idx}_6m`),
          horizon: "1_year",
          horizonLabel: "Branch Horizon +6 Months",
          title: `Immediate Aftermath of: ${optText.slice(0, 30)}`,
          description: `After choosing to "${optText}", you observe immediate downstream effects on your primary goals.`,
          opportunities: [
            "Resolution of the dilemma that triggered this branch",
            "Renewed focus on the newly chosen sub-strategy",
          ],
          challenges: [
            "Temporary friction from shifting operational direction",
          ],
          assumptions: ["Key stakeholders align with the revised roadmap"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "New direction requires fresh validation.",
          turningPoints: [
            {
              title: "Branching Validation Moment",
              description: "A clear early indicator signals whether this branch was superior.",
              possibleImpact: "Provides confidence to double down.",
            },
          ],
        },
        {
          id: generateId(`evt_child_${idx}_3y`),
          horizon: "3_years",
          horizonLabel: "Branch Horizon +2 Years",
          title: `Long-term Resolution of the ${optText.slice(0, 24)} Branch`,
          description: `The ripple effects of this mid-stream decision solidify into your steady-state situation.`,
          opportunities: [
            "Distinct competitive or personal differentiation from this unique choice",
          ],
          challenges: [
            "Living with the permanent departure from the original parent path",
          ],
          assumptions: ["External landscape continues to support this branch"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Long-term compounding of a secondary decision.",
          turningPoints: [],
        },
      ],
    };
  });
}

export function generateMockComparison(replay: DecisionReplay): ScenarioComparison {
  if (replay.id === SHOWCASE_REPLAY.id || replay.decision.toLowerCase().includes("university")) {
    return SHOWCASE_COMPARISON;
  }

  const paths = replay.scenarios;
  const dimensions = [
    {
      dimension: "Primary Priority Alignment",
      assessment: paths.reduce((acc, p, i) => {
        acc[p.id] = i === 0 ? "High Direct Alignment" : i === 1 ? "Moderate Alignment" : "Alternative Value Focus";
        return acc;
      }, {} as Record<string, string>),
      explanation: `Each path trades off immediate alignment with "${replay.priorities[0] || "your goals"}" against broader optionality.`,
    },
    {
      dimension: "Downside Volatility",
      assessment: paths.reduce((acc, p, i) => {
        acc[p.id] = p.overallUncertainty.level === "lower" ? "Low Risk / High Stability" : p.overallUncertainty.level === "moderate" ? "Balanced Managed Risk" : "High Volatility / Asymmetric Risk";
        return acc;
      }, {} as Record<string, string>),
      explanation: "Risk profiles range from predictable institutional guarantees to volatile self-directed environments.",
    },
    {
      dimension: "Operational Autonomy",
      assessment: paths.reduce((acc, p, i) => {
        acc[p.id] = i === 0 ? "Moderate Independence" : i === 1 ? "Team / Stakeholder Constrained" : "High Autonomy";
        return acc;
      }, {} as Record<string, string>),
      explanation: "Autonomy dictates how much control you maintain over your schedule, methods, and strategic decisions.",
    },
  ];

  return {
    replayId: replay.id,
    dimensions,
    keyDifferences: [
      `Level of structural commitment required in the first 90 days.`,
      `The degree of personal autonomy vs. institutional backing.`,
      `Long-term compounding velocity for ${replay.priorities.slice(0, 2).join(" & ") || "career and lifestyle"}.`,
    ],
    importantUnknowns: [
      "Macro environment stability over the 3-year horizon",
      "Personal energy and health resilience during high-intensity periods",
      "Evolving personal values as new milestones are achieved",
    ],
    priorityAlignment: replay.priorities.map((priority, idx) => ({
      priority,
      bestAlignedPathId: paths[idx % paths.length]?.id || paths[0].id,
      rationale: `Offers the most direct mechanics to maximize ${priority} while managing the stated constraints.`,
    })),
  };
}

function derivePathTitle(optionText: string, index: number): string {
  const lower = optionText.toLowerCase();
  if (lower.includes("stay") || lower.includes("job") || lower.includes("university")) {
    return "The Grounded Foundation";
  }
  if (lower.includes("startup") || lower.includes("switch") || lower.includes("internship")) {
    return "The Accelerated Leap";
  }
  if (lower.includes("business") || lower.includes("product") || lower.includes("own")) {
    return "The Sovereign Venture";
  }
  const titles = [
    "The Deliberate Trajectory",
    "The Dynamic Horizon",
    "The Uncharted Vector",
    "The Balanced Compromise",
  ];
  return titles[index % titles.length];
}
