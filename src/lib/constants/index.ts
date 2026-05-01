import { FooterLinkSection, HeaderNavSection } from "../interfaces";

export const NAV: HeaderNavSection[] = [
  {
    label: "Introduction",
    items: [
      { label: "Getting Started", href: "/start" },
      { label: "How it works", href: "/about" },
      { label: "OAR Progress", href: "/progress" },
      { label: "Whitepaper", disabled: true },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Exchanges", disabled: true },
      { label: "Community", href: "/communities" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "OAR Faucet", href: "/faucet" },
      { label: "Rafla", disabled: true },
      { label: "OAR Reserve Dashboard", href: "/reserve" },
    ],
  },
  {
    label: "FAQ",
    items: [{ label: "FAQs", href: "/faqs" }],
  },
];

export const FOOTER_LINKS: FooterLinkSection[] = [
  {
    title: "Introduction",
    items: [
      { label: "Getting started", href: "/start" },
      { label: "How it works", href: "/about" },
      { label: "OAR Progress", href: "/progress" },
      { label: "Whitepaper", disabled: true },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Exchanges", disabled: true },
      { label: "Community", href: "/communities" },
      { label: "Documentation", disabled: true },
    ],
  },
  {
    title: "Participate",
    items: [
      { label: "Faucet", href: "/faucet" },
      { label: "Rafla", disabled: true },
      { label: "Oar Reserve Dashboard", href: "/reserve" },
    ],
  },
  {
    title: "Socials",
    items: [
      { label: "X (Twitter)", externalHref: "https://x.com" },
      { label: "LinkedIn", disabled: true },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "Legal", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
