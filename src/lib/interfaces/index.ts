export type HeaderNavItem = {
  label: string;
  href?: string;
  disabled?: boolean;
};

export type HeaderNavSection = {
  label: string;
  items: HeaderNavItem[];
};
