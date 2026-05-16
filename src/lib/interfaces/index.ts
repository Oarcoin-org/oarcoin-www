export type HeaderNavItem = {
  label: string;
  href?: string;
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
