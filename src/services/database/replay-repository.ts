import fs from "fs";
import path from "path";
import { DecisionReplay, ScenarioAssumption, ScenarioPath } from "@/types";
import { SHOWCASE_REPLAY } from "../ai/showcase-data";

// Seed second demo replay: Startup vs Job
export const SECOND_DEMO_REPLAY: DecisionReplay = {
  id: "replay_startup_vs_corp",
  title: "Leaving Corporate Engineering to Co-Found a B2B AI Workflow Platform",
  decision: "Should I stay at my senior engineer position or leave to start a B2B SaaS startup with an ex-colleague?",
  options: [
    {
      id: "opt_corp",
      label: "Option A",
      text: "Stay at senior engineer role and push for Staff promotion",
    },
    {
      id: "opt_startup",
      label: "Option B",
      text: "Leave and co-found the B2B venture with 18 months personal savings",
    },
    {
      id: "opt_hybrid",
      label: "Option C",
      text: "Negotiate a 4-day workweek and build the prototype on Fridays & weekends",
    },
  ],
  context: {
    currentSituation: "Senior Engineer at mid-sized tech company with stock vesting every quarter.",
    resources: "$85,000 liquid savings, deep backend distributed systems expertise.",
    constraints: ["Non-compete clauses on company hardware", "Mortgage payments require steady cashflow"],
    timeHorizon: "3 years",
    relevantExperience: "8 years in software architecture, 2 open-source libraries with 5k stars.",
  },
  priorities: ["Financial stability", "Personal freedom & autonomy", "Long-term equity & upside"],
  branchesExploredCount: 1,
  createdAt: "2026-11-18T09:00:00.000Z",
  updatedAt: "2026-11-19T16:00:00.000Z",
  scenarios: [
    {
      id: "path_corp_stay",
      optionLabel: "Path A",
      optionDescription: "Stay & Push for Staff Promotion",
      pathTitle: "The Corporate Ascent",
      overview: "Continued equity vesting, high base salary, and systematic progression into technical leadership.",
      colorTheme: "blue",
      overallUncertainty: {
        level: "lower",
        reason: "Corporate ladder review cycles and compensation bands are transparent.",
      },
      assumptions: [
        {
          id: "asm_s1",
          statement: "Company share price remains steady or appreciates.",
          status: "likely",
        },
        {
          id: "asm_s2",
          statement: "Internal sponsor successfully advocates for your Staff promotion packet.",
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        "What if an executive reorg changes the engineering leadership team?",
      ],
      timeline: [
        {
          id: "evt_c1",
          horizon: "3_months",
          horizonLabel: "Month 3 · Architecture Charter",
          title: "Leading Company-Wide AI Ingestion Architecture",
          description: "You pitch and win approval for the next-generation data ingestion architecture, elevating your internal visibility.",
          opportunities: ["Recognition across the broader 200-engineer department"],
          challenges: ["Increasing committee meetings and consensus-building overhead"],
          assumptions: ["Executive priorities don't shift toward cost-cutting"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Clear quarterly roadmap deliverables.",
          turningPoints: [],
        },
        {
          id: "evt_c2",
          horizon: "1_year",
          horizonLabel: "Year 1 · Staff Review Board",
          title: "Promotion Confirmed: Staff Software Engineer",
          description: "Your promotion goes through with a 22% total compensation bump and accelerated refresher grants.",
          opportunities: ["Total compensation hits $340,000/year", "Mentoring 6 senior engineers"],
          challenges: ["Very little hands-on coding; 70% calendar spent in design reviews"],
          assumptions: ["Company performance meets shareholder expectations"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Promotion quotas can freeze during macroeconomic caution.",
          turningPoints: [],
        },
        {
          id: "evt_c3",
          horizon: "3_years",
          horizonLabel: "Year 3 · The Comfortable Fortress",
          title: "Principal Engineer Track & Golden Vesting",
          description: "You have built unmatched institutional capital. However, you wonder what could have happened with your own startup.",
          opportunities: ["Effortless lifestyle stability and generous 401(k) / healthcare coverage"],
          challenges: ["Creative restlessness and regret over untaken entrepreneurial risks"],
          assumptions: ["Company avoids disruption from newer startups"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Established corporate hierarchy.",
          turningPoints: [],
        },
      ],
    },
    {
      id: "path_startup_leap",
      optionLabel: "Path B",
      optionDescription: "Full-Time B2B Co-founder",
      pathTitle: "The Founder's Crucible",
      overview: "Extreme ownership, intense high-stakes customer discovery, and building proprietary enterprise software from a blank canvas.",
      colorTheme: "teal",
      overallUncertainty: {
        level: "higher",
        reason: "Early enterprise sales cycles and co-founder dynamics are volatile.",
      },
      assumptions: [
        {
          id: "asm_l1",
          statement: "Ex-colleague co-founder relationship thrives under mutual stress.",
          status: "likely",
        },
        {
          id: "asm_l2",
          statement: "B2B enterprise buyers will trust a 2-person startup with mission-critical workflows.",
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        "What if seed funding markets contract by 50%?",
      ],
      timeline: [
        {
          id: "evt_l1",
          horizon: "3_months",
          horizonLabel: "Month 3 · Customer Discovery Grind",
          title: "60 Prospect Interviews & First Design Partner",
          description: "You leave your job. After 60 customer discovery calls, you sign your first pilot agreement with a mid-market fintech.",
          opportunities: ["Unfiltered feedback directly from decision makers", "Pure focus on high-impact code"],
          challenges: ["Initial shock of zero monthly direct deposit into your bank account"],
          assumptions: ["Pilot partner actually integrates the software into their daily stack"],
          uncertaintyLevel: "higher",
          uncertaintyReason: "Pilot conversion into annual contracts is unproven.",
          turningPoints: [],
        },
        {
          id: "evt_l2",
          horizon: "1_year",
          horizonLabel: "Year 1 · Seed Round & $240k ARR",
          title: "Closing $1.8M Seed Round from Top Tier VC",
          description: "Backed by 4 paying enterprise contracts, you close institutional seed funding and hire your first two backend engineers.",
          opportunities: ["Substantial runway for 24 months", "Validation from tier-1 investors"],
          challenges: ["Now accountable to a board of directors; monthly investor updates"],
          assumptions: ["Gross margins exceed 80% at scale"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Venture-backed trajectory shifts to high-growth expectations.",
          turningPoints: [],
        },
        {
          id: "evt_l3",
          horizon: "3_years",
          horizonLabel: "Year 3 · Series A Scale or Churn Squeeze",
          title: "$1.4M ARR & 14-Person Team",
          description: "Your product becomes a recognized player in automated data reconciliation. You lead engineering while your co-founder leads sales.",
          opportunities: ["Your 40% equity is now valued at $6M on paper", "Deep pride in building an enduring entity"],
          challenges: ["Constant hiring and personnel management replaces coding time"],
          assumptions: ["Competitors do not bundle your product as a free feature"],
          uncertaintyLevel: "higher",
          uncertaintyReason: "Enterprise competition intensifies.",
          turningPoints: [],
        },
      ],
    },
    {
      id: "path_hybrid_step",
      optionLabel: "Path C",
      optionDescription: "4-Day Workweek Hybrid",
      pathTitle: "The Hedged Pioneer",
      overview: "Preserving 80% salary while carving out deliberate protected days to validate customer demand before burning savings.",
      colorTheme: "lavender",
      overallUncertainty: {
        level: "moderate",
        reason: "Requires high personal boundary management between employer and side venture.",
      },
      assumptions: [
        {
          id: "asm_h1",
          statement: "Manager genuinely respects 4-day workload boundaries without passive penalty.",
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [],
      timeline: [
        {
          id: "evt_h1",
          horizon: "3_months",
          horizonLabel: "Month 3 · The Dual Engine",
          title: "Disciplined Friday Build Rhythms",
          description: "You transition to 80% pay. Every Friday and Sunday morning is devoted exclusively to building the prototype.",
          opportunities: ["Zero financial stress; mortgage is comfortably covered"],
          challenges: ["Slower iteration velocity compared to full-time founders"],
          assumptions: ["Workload at day job doesn't spill into Fridays"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Company culture regarding reduced hours varies.",
          turningPoints: [],
        },
        {
          id: "evt_h2",
          horizon: "1_year",
          horizonLabel: "Year 1 · De-risked Launch",
          title: "First $3k/mo Revenue Before Quitting",
          description: "With 3 paying customers live, you have concrete proof of product-market fit before ever taking a leap of faith.",
          opportunities: ["Ability to resign with absolute confidence rather than blind hope"],
          challenges: ["Physical fatigue from operating dual tracks for 12 months"],
          assumptions: ["Clients are satisfied with async support"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Real revenue in hand removes survival panic.",
          turningPoints: [],
        },
        {
          id: "evt_h3",
          horizon: "3_years",
          horizonLabel: "Year 3 · Clean Full-Time Transition",
          title: "Profitable Bootstrapped Studio",
          description: "You transitioned to full-time founder 18 months ago. You now run a lean, profitable $40k MRR business with no external debt.",
          opportunities: ["Complete balance of freedom, financial health, and equity"],
          challenges: ["Took 12 months longer to reach this milestone than going all-in"],
          assumptions: ["Market opportunity remained patient during the slower build"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Profitable operations fund their own continuity.",
          turningPoints: [],
        },
      ],
    },
  ],
};

// File-based backup persistence
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "replays.json");

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial: Record<string, DecisionReplay> = {
        [SHOWCASE_REPLAY.id]: SHOWCASE_REPLAY,
        [SECOND_DEMO_REPLAY.id]: SECOND_DEMO_REPLAY,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
    }
  } catch (e) {
    console.warn("Could not ensure data file:", e);
  }
}

function loadFromDisk(): Map<string, DecisionReplay> {
  const store = new Map<string, DecisionReplay>();
  store.set(SHOWCASE_REPLAY.id, SHOWCASE_REPLAY);
  store.set(SECOND_DEMO_REPLAY.id, SECOND_DEMO_REPLAY);

  try {
    ensureDataFile();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      for (const [k, v] of Object.entries(parsed)) {
        store.set(k, v as DecisionReplay);
      }
    }
  } catch (e) {
    console.warn("Could not load from disk:", e);
  }
  return store;
}

function persistToDisk(store: Map<string, DecisionReplay>) {
  try {
    ensureDataFile();
    const obj: Record<string, DecisionReplay> = {};
    for (const [k, v] of store.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not persist to disk:", e);
  }
}

// Global memory store persistent across Next.js dev server hot-reloads
const globalForReplays = globalThis as unknown as {
  replayMemoryStore?: Map<string, DecisionReplay>;
};

const memoryStore = globalForReplays.replayMemoryStore ?? loadFromDisk();

if (!globalForReplays.replayMemoryStore) {
  globalForReplays.replayMemoryStore = memoryStore;
}

export const ReplayRepository = {
  async getAll(): Promise<DecisionReplay[]> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    return Array.from(store.values()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  async getById(id: string): Promise<DecisionReplay | null> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    return store.get(id) || null;
  },

  async save(replay: DecisionReplay): Promise<DecisionReplay> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    const updated = {
      ...replay,
      updatedAt: new Date().toISOString(),
    };
    store.set(updated.id, updated);
    globalForReplays.replayMemoryStore = store;
    persistToDisk(store);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    const deleted = store.delete(id);
    if (deleted) {
      persistToDisk(store);
    }
    return deleted;
  },

  async updateAssumptions(
    replayId: string,
    scenarioId: string,
    updatedAssumptions: ScenarioAssumption[]
  ): Promise<DecisionReplay | null> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    const replay = store.get(replayId);
    if (!replay) return null;

    const updatedScenarios = replay.scenarios.map((sc) => {
      if (sc.id === scenarioId) {
        return {
          ...sc,
          assumptions: updatedAssumptions,
        };
      }
      return sc;
    });

    const updatedReplay: DecisionReplay = {
      ...replay,
      scenarios: updatedScenarios,
      updatedAt: new Date().toISOString(),
    };

    store.set(replayId, updatedReplay);
    persistToDisk(store);
    return updatedReplay;
  },

  async addBranch(
    replayId: string,
    childScenarios: ScenarioPath[]
  ): Promise<DecisionReplay | null> {
    const store = globalForReplays.replayMemoryStore ?? loadFromDisk();
    const replay = store.get(replayId);
    if (!replay) return null;

    const updatedReplay: DecisionReplay = {
      ...replay,
      scenarios: [...replay.scenarios, ...childScenarios],
      branchesExploredCount: replay.branchesExploredCount + childScenarios.length,
      updatedAt: new Date().toISOString(),
    };

    store.set(replayId, updatedReplay);
    persistToDisk(store);
    return updatedReplay;
  },
};
