export type UncertaintyLevel = 'lower' | 'moderate' | 'higher';
export type AssumptionStatus = 'likely' | 'uncertain' | 'unlikely';
export type Horizon = '3_months' | '1_year' | '3_years';
export type PathColorTheme = 'blue' | 'teal' | 'lavender' | 'neutral';

export interface UserProfile {
  name?: string;
  occupation: string;
  industry: string;
  experienceLevel: string;
  interests: string[];
  riskTolerance: string;
  financialRunway: string;
  lifeStage?: string;
}

export interface ReplayDiagnostics {
  primaryMotivation: string;
  worstCaseFear: string;
  decisionWindow: string;
  stakeholdersImpacted: string;
}

export interface MilestoneEvent {
  id: string;
  horizon: Horizon;
  horizonLabel: string;
  title: string;
  description: string;
  opportunities: string[];
  challenges: string[];
  assumptions: string[];
  uncertaintyLevel: UncertaintyLevel;
  uncertaintyReason: string;
  turningPoints: {
    title: string;
    description: string;
    possibleImpact: string;
  }[];
}

export interface ScenarioAssumption {
  id: string;
  statement: string;
  status: AssumptionStatus;
}

export interface ScenarioPath {
  id: string;
  optionLabel: string;
  optionDescription: string;
  pathTitle: string;
  overview: string;
  colorTheme: PathColorTheme;
  timeline: MilestoneEvent[];
  overallUncertainty: {
    level: UncertaintyLevel;
    reason: string;
  };
  assumptions: ScenarioAssumption[];
  suggestedFollowupQuestions: string[];
  parentScenarioId?: string | null;
  parentEventId?: string | null;
  branchDepth?: number;
}

export interface DecisionReplay {
  id: string;
  title: string;
  decision: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  context: {
    currentSituation: string;
    resources?: string;
    constraints: string[];
    timeHorizon: string;
    relevantExperience?: string;
  };
  userProfile?: UserProfile;
  diagnostics?: ReplayDiagnostics;
  priorities: string[];
  scenarios: ScenarioPath[];
  branchesExploredCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonDimension {
  dimension: string;
  assessment: Record<string, string>;
  explanation: string;
}

export interface ScenarioComparison {
  replayId: string;
  dimensions: ComparisonDimension[];
  keyDifferences: string[];
  importantUnknowns: string[];
  priorityAlignment: {
    priority: string;
    bestAlignedPathId: string;
    rationale: string;
  }[];
}
