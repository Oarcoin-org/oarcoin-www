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
