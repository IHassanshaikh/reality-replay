import { DecisionReplay, ScenarioComparison } from "@/types";

export const SHOWCASE_REPLAY: DecisionReplay = {
  id: "replay_showcase_career_choice",
  title: "Career Dilemma: University vs. Startup vs. Independent Product",
  decision: "Should I focus on university, accept a startup internship, or build my own product?",
  options: [
    {
      id: "opt_a",
      label: "Option A",
      text: "Focus exclusively on University academics and structured thesis research",
    },
    {
      id: "opt_b",
      label: "Option B",
      text: "Accept the fast-paced Seed-stage Startup internship (30 hrs/week)",
    },
    {
      id: "opt_c",
      label: "Option C",
      text: "Build an independent AI product and bootstrap an indie business",
    },
  ],
  context: {
    currentSituation: "Third-year Computer Science student with 3 semesters remaining and moderate financial cushion.",
    resources: "12 months of living expenses saved; laptop and cloud credits.",
    constraints: [
      "Strict university attendance requirement for graduation",
      "Limited runway if revenue does not materialize within 9 months",
    ],
    timeHorizon: "3 years",
    relevantExperience: "Full-stack development, prototype shipping, prior summer tech internship.",
  },
  priorities: [
    "Learning opportunities",
    "Personal freedom & autonomy",
    "Financial stability",
  ],
  branchesExploredCount: 2,
  createdAt: "2026-11-20T10:00:00.000Z",
  updatedAt: "2026-11-20T14:30:00.000Z",
  scenarios: [
    {
      id: "path_univ",
      optionLabel: "Path A",
      optionDescription: "Focus on University & Academic Foundation",
      pathTitle: "The Academic Crucible",
      overview: "Deep theoretical grounding, top-tier GPA, and structured master's/research pathway with predictable security.",
      colorTheme: "blue",
      overallUncertainty: {
        level: "lower",
        reason: "Academic curriculum and graduation pipelines follow well-charted institutional paths.",
      },
      assumptions: [
        {
          id: "asm_a1",
          statement: "Top academic standing will translate directly into premier postgraduate or R&D roles.",
          status: "likely",
        },
        {
          id: "asm_a2",
          statement: "Delaying commercial product shipping won't diminish practical market edge.",
          status: "uncertain",
        },
        {
          id: "asm_a3",
          statement: "Tuition and living costs remain comfortably sustainable without external income.",
          status: "likely",
        },
      ],
      suggestedFollowupQuestions: [
        "What if an international lab offers a fully funded research fellowship?",
        "What if tech recruiting slows down right at graduation?",
      ],
      timeline: [
        {
          id: "evt_a_3m",
          horizon: "3_months",
          horizonLabel: "Month 3 · Academic Immersion",
          title: "Deep Research Rhythm & Academic Honors",
          description: "You settle into advanced algorithms and distributed systems courses, securing a spot in the faculty AI lab.",
          opportunities: [
            "Co-author a workshop paper with your department chair",
            "Maintain a flawless 3.9+ GPA and secure dean's commendation",
          ],
          challenges: [
            "Theoretical coursework feels disconnected from rapid real-world AI shifts",
            "FOMO observing peers shipping live consumer apps",
          ],
          assumptions: ["Lab bandwidth remains open for undergraduate researchers"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Semester schedule and lab assignments are strictly structured.",
          turningPoints: [
            {
              title: "Lab Grants Renewal",
              description: "A major research grant opens a paid stipend for your project.",
              possibleImpact: "Eliminates financial pressure and guarantees thesis mentorship.",
            },
          ],
        },
        {
          id: "evt_a_1y",
          horizon: "1_year",
          horizonLabel: "Year 1 · Specialization & Recognition",
          title: "First Tier-1 Conference Submission",
          description: "Your benchmark study is submitted to an academic symposium. High GPA unlocks competitive international fellowship applications.",
          opportunities: [
            "Direct recruitment from premier R&D labs (DeepMind, FAIR, Microsoft Research)",
            "Strong letters of recommendation from recognized professors",
          ],
          challenges: [
            "Lack of production systems experience compared to industry peers",
            "Academic publication cycle can take 6-12 months for review",
          ],
          assumptions: ["The research domain remains novel and un-scooped"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Peer review acceptance rates have inherent stochastic variance.",
          turningPoints: [
            {
              title: "Conference Paper Spotlight",
              description: "Your paper receives an oral presentation invitation.",
              possibleImpact: "Direct fast-track to fully funded PhD programs globally.",
            },
          ],
        },
        {
          id: "evt_a_3y",
          horizon: "3_years",
          horizonLabel: "Year 3 · The Institutional Launchpad",
          title: "Graduation with Distinction & Elite R&D Placement",
          description: "You graduate summa cum laude and transition into an elite research engineering residency with substantial stability.",
          opportunities: [
            "Substantial starting compensation with excellent work-life balance",
            "Clear 5-year ladder toward research scientist roles",
          ],
          challenges: [
            "Limited entrepreneurial autonomy or equity upside",
            "Corporate bureaucracy may constrain personal side projects",
          ],
          assumptions: ["Corporate R&D budgets continue sponsoring exploratory science"],
          uncertaintyLevel: "lower",
          uncertaintyReason: "Credentialed research engineers maintain steady market demand.",
          turningPoints: [
            {
              title: "Commercialization Spin-off",
              description: "University tech transfer office offers to spin out your research IP into a venture.",
              possibleImpact: "Bridges the gap between research purity and founder upside.",
            },
          ],
        },
      ],
    },
    {
      id: "path_startup",
      optionLabel: "Path B",
      optionDescription: "Seed-stage Startup Internship",
      pathTitle: "The High-Velocity Firehose",
      overview: "Direct exposure to chaotic startup velocity, real customer fires, and rapid full-stack execution at the cost of intense schedule tension.",
      colorTheme: "teal",
      overallUncertainty: {
        level: "moderate",
        reason: "Early-stage startups possess volatile product-market fit and uncertain runway.",
      },
      assumptions: [
        {
          id: "asm_b1",
          statement: "The startup's leadership is competent and willing to mentor interns intensely.",
          status: "likely",
        },
        {
          id: "asm_b2",
          statement: "University administration tolerates reduced coursework load and attendance flexibility.",
          status: "uncertain",
        },
        {
          id: "asm_b3",
          statement: "The startup extends full-time early employee equity upon graduation.",
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        "What if the startup faces a down-round or sudden executive pivot?",
        "What happens if academic grades drop below minimum degree requirements?",
      ],
      timeline: [
        {
          id: "evt_b_3m",
          horizon: "3_months",
          horizonLabel: "Month 3 · The Deep End",
          title: "Shipping Production Features in Week Two",
          description: "You take ownership of the core analytics microservice. You learn CI/CD, production incident triage, and fast code reviews.",
          opportunities: [
            "Learn more in 90 days than two semesters of theoretical lab assignments",
            "Mentorship from a battle-tested ex-FAANG technical founder",
          ],
          challenges: [
            "Sleep deprivation juggling sprint deadlines with midterm exams",
            "Occasional weekend on-call interrupts personal life",
          ],
          assumptions: ["Company runway covers at least the next 12 months"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Startup priorities can shift overnight based on customer churn.",
          turningPoints: [
            {
              title: "Outage Heroics",
              description: "You diagnose and resolve a severe production database deadlock during peak traffic.",
              possibleImpact: "Founders grant unvested advisor shares and promise early full-time offer.",
            },
          ],
        },
        {
          id: "evt_b_1y",
          horizon: "1_year",
          horizonLabel: "Year 1 · Key Contributor & Full-Time Offer",
          title: "Lead Engineer on New Flagship Product",
          description: "The startup raises a Series A. You are offered a founding engineer package with 1.2% equity upon graduation.",
          opportunities: [
            "Massive equity upside if the company becomes a category winner",
            "Proven track record of shipping 0-to-1 systems under pressure",
          ],
          challenges: [
            "University GPA slips to 3.1; academic backup options close",
            "Founders increase expectations, blurring work-life boundaries",
          ],
          assumptions: ["Series A round closes on favorable valuation terms"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Market climate determines venture appetite for expansion rounds.",
          turningPoints: [
            {
              title: "Key Co-founder Departure",
              description: "The VP of Engineering leaves abruptly due to founder friction.",
              possibleImpact: "You are thrust into technical lead responsibilities prematurely.",
            },
          ],
        },
        {
          id: "evt_b_3y",
          horizon: "3_years",
          horizonLabel: "Year 3 · Battle-Tested Operator",
          title: "Senior Founding Engineer at Scaling Scale-Up",
          description: "The startup scales to 40 employees. Your equity carries tangible secondary value and your network is top-tier.",
          opportunities: [
            "Reputation as a high-output engineer capable of leading teams",
            "Financial windfall if liquidity events or tender offers occur",
          ],
          challenges: [
            "Golden handcuffs tied to 4-year vesting schedules",
            "High chronic stress and delayed personal passion projects",
          ],
          assumptions: ["Product achieves sustained retention and net negative churn"],
          uncertaintyLevel: "higher",
          uncertaintyReason: "Early-stage survival over 3 years carries statistical attrition.",
          turningPoints: [
            {
              title: "Strategic Acquisition Offer",
              description: "A major enterprise competitor offers a \$45M talent acquisition.",
              possibleImpact: "Accelerates your equity vesting and yields an immediate cash payout.",
            },
          ],
        },
      ],
    },
    {
      id: "path_product",
      optionLabel: "Path C",
      optionDescription: "Build an Independent AI Product",
      pathTitle: "The Sovereign Bootstrapper",
      overview: "Maximum autonomy, 100% equity ownership, and brutal accountability directly to paying customers without institutional safety nets.",
      colorTheme: "lavender",
      overallUncertainty: {
        level: "higher",
        reason: "Customer acquisition, pricing elasticity, and solo founder endurance are inherently unpredictable.",
      },
      assumptions: [
        {
          id: "asm_c1",
          statement: "The target micro-niche is willing to pay \$29–\$99/month for the automated workflow.",
          status: "uncertain",
        },
        {
          id: "asm_c2",
          statement: "Solo discipline is sufficient to build, market, and support without co-founder support.",
          status: "likely",
        },
        {
          id: "asm_c3",
          statement: "Personal savings will cover living costs until Ramen profitability.",
          status: "uncertain",
        },
      ],
      suggestedFollowupQuestions: [
        "What if customer acquisition cost (CAC) exceeds subscription lifetime value (LTV)?",
        "What if you pivot from B2C to B2B enterprise workflows after 6 months?",
      ],
      timeline: [
        {
          id: "evt_c_3m",
          horizon: "3_months",
          horizonLabel: "Month 3 · The Zero-to-One Void",
          title: "MVP Launch & First 10 Paying Subscribers",
          description: "You launch on Product Hunt and X/Twitter. Initial viral spike settles into \$420 MRR with 12 passionate daily active users.",
          opportunities: [
            "Incredible pride from shipping your own software directly into the wild",
            "Complete freedom over your daily calendar and technical stack choices",
          ],
          challenges: [
            "Loneliness and isolation of working solo without coworker camaraderie",
            "Customer support tickets at 2 AM disrupt coursework focus",
          ],
          assumptions: ["Target users have genuine willingness to pay rather than just browse"],
          uncertaintyLevel: "higher",
          uncertaintyReason: "Initial conversion rates in month 3 are noisy and small-sample.",
          turningPoints: [
            {
              title: "Influencer Video Feature",
              description: "A prominent creator features your tool in a workflow tutorial.",
              possibleImpact: "Drives 2,500 signups overnight and validates viral marketing channel.",
            },
          ],
        },
        {
          id: "evt_c_1y",
          horizon: "1_year",
          horizonLabel: "Year 1 · The Growth Chasm (Branching Point)",
          title: "Reaching \$6,500 MRR & Customer Acquisition Squeeze",
          description: "You reach sustainable ramen profitability. However, organic growth plateaus and acquisition costs begin climbing.",
          opportunities: [
            "Full financial self-sufficiency before finishing your university degree",
            "Optionality to take outside angel investment or stay 100% bootstrapped",
          ],
          challenges: [
            "Context switching between frontend, infrastructure, marketing, and taxes",
            "Copycat clones launch with lower pricing",
          ],
          assumptions: ["Retention curves flatten above 60% after month 3"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Market response to rising CAC determines business longevity.",
          turningPoints: [
            {
              title: "Enterprise Pilot Inbound",
              description: "A mid-market agency requests a custom 50-seat team plan.",
              possibleImpact: "Forces an immediate pivot from self-serve SaaS to enterprise sales.",
            },
          ],
        },
        {
          id: "evt_c_3y",
          horizon: "3_years",
          horizonLabel: "Year 3 · The Sovereign Studio",
          title: "\$28,000 MRR Automated Cashflow Engine",
          description: "Your product matures into an established niche brand with 400+ active subscriptions, minimal churn, and automated ops.",
          opportunities: [
            "True location and time freedom: work 20 hours a week from anywhere",
            "High enterprise valuation: ability to exit for \$1M–\$1.5M on Acquire.com",
          ],
          challenges: [
            "Plateauing technical challenge compared to frontier research labs",
            "Platform risk if underlying foundational models or APIs change pricing",
          ],
          assumptions: ["Competitors cannot trivially reproduce proprietary customer data loops"],
          uncertaintyLevel: "moderate",
          uncertaintyReason: "Long-term SaaS defensibility requires continuous innovation.",
          turningPoints: [
            {
              title: "Unsolicited Acquisition Offer",
              description: "A private equity roll-up firm makes an all-cash buyout offer.",
              possibleImpact: "Life-changing financial liquidity in your early twenties.",
            },
          ],
        },
      ],
    },
  ],
};

export const SHOWCASE_COMPARISON: ScenarioComparison = {
  replayId: "replay_showcase_career_choice",
  dimensions: [
    {
      dimension: "Financial Stability",
      assessment: {
        path_univ: "High Stability",
        path_startup: "Moderate with High Volatility",
        path_product: "Initially Fragile, High Long-term Resilience",
      },
      explanation: "University yields predictable living costs and established starting salaries. The startup relies on venture runway, while the indie product starts with zero income but can compound into debt-free cashflow.",
    },
    {
      dimension: "Learning Velocity",
      assessment: {
        path_univ: "Rigorous Depth (Theoretical)",
        path_startup: "Explosive Breadth (Systems & Scaling)",
        path_product: "Comprehensive Autodidact (Code + Marketing + Sales)",
      },
      explanation: "The university path hones mathematical and algorithmic rigor. The startup teaches battle-tested team practices, and the indie product forces mastery of the entire commercial value chain.",
    },
    {
      dimension: "Personal Freedom & Autonomy",
      assessment: {
        path_univ: "Moderate (Curriculum Boundaries)",
        path_startup: "Low (Bound to Sprint Deadlines & Leadership)",
        path_product: "Maximum (Absolute Control of Time & Vision)",
      },
      explanation: "Bootstrapping is the only path where you own 100% of your calendar, technical decisions, and strategic roadmap.",
    },
    {
      dimension: "Career Downside Risk",
      assessment: {
        path_univ: "Minimal Downside",
        path_startup: "Low (Experience Is Highly Valued Even If Startup Fails)",
        path_product: "Moderate (If Zero Revenue, Must Explain Resume Gap)",
      },
      explanation: "Even a failed startup internship counts as strong engineering experience on a resume. A solo project requires tangible metrics or open-source artifacts to prove equivalent rigor.",
    },
  ],
  keyDifferences: [
    "Ownership: Path C grants 100% equity; Path B grants ~1% equity; Path A grants academic credentials.",
    "Stress Profile: Path A carries acute exam/thesis bursts; Path B brings ongoing operational sprint tension; Path C brings existential uncertainty regarding revenue.",
    "Network Gravity: Path A connects to professors & researchers; Path B connects to venture-backed operators; Path C connects to founders, customers, and creators.",
  ],
  importantUnknowns: [
    "Macro hiring environment for junior engineers upon graduation year",
    "Customer Willingness-To-Pay (WTP) in the chosen SaaS problem domain",
    "Personal threshold for isolated solo work versus collaborative team momentum",
  ],
  priorityAlignment: [
    {
      priority: "Learning opportunities",
      bestAlignedPathId: "path_startup",
      rationale: "Working alongside seasoned senior engineers under real customer pressure creates the steepest short-term growth curve.",
    },
    {
      priority: "Personal freedom & autonomy",
      bestAlignedPathId: "path_product",
      rationale: "An independent product gives you total sovereignty over your schedule, technology choices, and lifestyle.",
    },
    {
      priority: "Financial stability",
      bestAlignedPathId: "path_univ",
      rationale: "Structured degree completion and corporate/lab entry paths provide the lowest variance and most reliable compensation baseline.",
    },
  ],
};
