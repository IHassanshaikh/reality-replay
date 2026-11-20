export interface PriorityOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export const DEFAULT_PRIORITIES: PriorityOption[] = [
  {
    id: "financial_stability",
    label: "Financial stability",
    description: "Predictable income, savings preservation, and low financial downside.",
    iconName: "Shield",
  },
  {
    id: "career_growth",
    label: "Career growth & leverage",
    description: "Accelerated skills development, industry recognition, and promotion potential.",
    iconName: "TrendingUp",
  },
  {
    id: "personal_freedom",
    label: "Personal freedom & autonomy",
    description: "Control over time, location independence, and ownership of decisions.",
    iconName: "Compass",
  },
  {
    id: "learning_opportunities",
    label: "Learning opportunities",
    description: "Steep learning curves, exposure to new tools, and expanding horizon.",
    iconName: "BookOpen",
  },
  {
    id: "work_life_balance",
    label: "Work-life balance & wellbeing",
    description: "Sustainable pace, mental peace, and time for health and passions.",
    iconName: "HeartPulse",
  },
  {
    id: "relationships",
    label: "Relationships & community",
    description: "Time for family, friendships, mentorship, and social connection.",
    iconName: "Users",
  },
  {
    id: "long_term_equity",
    label: "Long-term equity & upside",
    description: "Building asymmetric upside, equity ownership, or proprietary assets.",
    iconName: "Coins",
  },
];

export const HORIZON_LABELS = {
  "3_months": "Month 3 (Short Term)",
  "1_year": "Year 1 (Medium Term)",
  "3_years": "Year 3 (Long Term)",
};
