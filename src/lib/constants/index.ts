import { FooterLinkSection, HeaderNavSection, Step } from "../interfaces";

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

export const START_STEPS: Step[] = [
  {
    number: "01.",
    title: "Inform Yourself",
    description:
      "Oarcoin (OAR) is an open, community-driven system designed for fair access to digital value. There are no insiders, no presales, and no central authority; participation is open to anyone from day one. Every token enters the system transparently, and anyone can take part. Before getting started, take a moment to understand how OAR works, how distribution happens, and how the system grows over time.",
    buttonLabel: "View Whitepaper",
  },
  {
    number: "02.",
    title: "Claim Oar",
    description:
      "You don't need to buy OAR to get started. OAR can be claimed daily through the faucet, giving anyone, anywhere, a simple way to participate without upfront cost. This makes OAR accessible from the very beginning, removing traditional barriers to entry.",
    buttonLabel: "Claim Free OAR",
    href: "/faucet",
  },
  {
    number: "03.",
    title: "Use Oar",
    description:
      "Once you have OAR, you can start using it. OAR powers applications like Rafla, a social experience where participation creates opportunity. You can also send and receive OAR, making it useful for simple, peer-to-peer transactions. OAR is designed to be used, not just held.",
    buttonLabel: "Play Rafla",
  },
  {
    number: "04.",
    title: "Verify the system",
    description:
      "The reserve and system activity can be viewed in real time, allowing anyone to verify how the network grows and operates. There are no hidden mechanisms; everything is open and observable. This ensures trust is built through visibility, not promises.",
    buttonLabel: "View Reserve Dashboard",
    href: "/reserve",
  },
];
