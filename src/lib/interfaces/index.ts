export type HeaderNavItem = {
  label: string;
  href?: string;
  externalHref?: string;
  disabled?: boolean;
};

export type HeaderNavSection = {
  label: string;
  items: HeaderNavItem[];
};

export type FooterLinkItem =
  | { label: string; href: string }
  | { label: string; disabled: true }
  | { label: string; externalHref: string };

export type FooterLinkSection = {
  title: string;
  items: FooterLinkItem[];
};

export type Step = {
  number: string;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
};

export type TextHighlight = {
  text: string;
  className?: string;
  match?: "first" | "all";
};

export type ProcessIntroParagraph = {
  text: string;
  highlightWords?: TextHighlight[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  number: string;
  icon: string;
  text: string;
};

export type CommunityCategory = {
  title: string;
  icon: string;
  items: string[];
};

export type LiveProduct = {
  title: string;
  icon: string;
  items: string[];
};

export type ProgressBulletGroup = {
  title: string;
  items: string[];
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type FaucetTask = {
  id: string;
  label: string;
  href: string;
  platform: "x" | "telegram";
  completed: boolean;
};

export type ReserveChartTimeframe = "24H" | "7D" | "30D";

export type ReservePageData = {
  hero: {
    title: string;
    description: string;
  };
  stats: {
    reserveBalanceOar: number;
    reserveBalanceUsd: number;
    holders: number;
    livePrice: number;
    priceChange24h: number;
    marketCapLabel: string;
  };
  reserveWallet: string;
  growthChart: Record<
    ReserveChartTimeframe,
    {
      labels: string[];
      values: number[];
    }
  >;
};

export type DirectoryProjectCategory =
  | "Identity"
  | "Infrastructure"
  | "Finance"
  | "Social"
  | "Utility"
  | "DAO"
  | "Data and Analytics"
  | "Developer Tools"
  | "Marketplace"
  | "Public Goods";

export type DirectoryProjectType =
  | "project"
  | "community"
  | "infrastructure"
  | "public-good";

export type DirectoryProject = {
  id: string;
  name: string;
  category: DirectoryProjectCategory;
  description: string;
  href: string;
  type: DirectoryProjectType;
  featured?: boolean;
  usersCount?: number;
  logoUrl?: string;
};

export type DirectoryStat = {
  value: number;
  label: string;
};

export type DirectoryPageData = {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
    submitProjectLabel: string;
  };
  submit: {
    title: string;
    description: string;
    email: string;
    ctaLabel: string;
    mailSubject: string;
  };
  stats: DirectoryStat[];
  featuredSectionTitle: string;
  exploreSectionTitle: string;
  projects: DirectoryProject[];
};

export type FaucetPageData = {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
    connectWalletLabel: string;
  };
  stats: {
    totalDistributed: number;
    dailyReward: number;
    nextClaimTime: string;
    totalEarned: number;
    streakDays: number;
  };
  tasksSectionTitle: string;
  claimLabel: string;
  tasks: FaucetTask[];
};
