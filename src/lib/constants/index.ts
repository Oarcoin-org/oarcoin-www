import {
  FooterLinkSection,
  HeaderNavSection,
  HowItWorksStep,
  ProcessIntroParagraph,
  ProcessStep,
  Step,
} from "../interfaces";

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

export const ABOUT_PROCESS_INTRO: ProcessIntroParagraph[] = [
  {
    text: "Oarcoin (OAR) is designed as an open system for accessing, using, and growing digital value, without insiders or centralized control.",
    highlightWords: [{ text: "Oarcoin (OAR)", className: "text-primary" }],
  },
  {
    text: "It operates through three core principles: fair distribution, open participation, and transparent growth.",
  },
  {
    text: "Anyone can enter the system, interact with it, and verify how it works.",
  },
];

export const ABOUT_IDEA_INTRO: ProcessIntroParagraph[] = [
  {
    text: "Oarcoin is built around a simple idea:",
    highlightWords: [{ text: "Oarcoin", className: "text-primary" }],
  },
];

export const ABOUT_IDEA_BODY = [
  "A financial system where anyone can participate, and where fairness is built into how it works.",
  "By combining open access, real utility, and transparent growth, OAR creates a system that is not just held, but actively used and verified by its community.",
];

export const GET_OARCOIN_HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01.",
    icon: "/assets/icons/wallet.svg",
    text: "Connect your wallet to Uniswap",
  },
  {
    number: "02.",
    icon: "/assets/illustrations/coin-hole.svg",
    text: "Select the token you want to swap (e.g USDC or ETH)",
  },
  {
    number: "03.",
    icon: "/assets/illustrations/coin.svg",
    text: "Enter OAR as the token to receive",
  },
  {
    number: "04.",
    icon: "/assets/illustrations/check.svg",
    text: "Confirm the transaction",
  },
];

export const GET_OARCOIN_HOW_IT_WORKS_WARNINGS = [
  "Always verify the official OAR contract address before trading",
  "Only use the trusted links provided on this website",
  "Be aware of fake tokens or impersonators",
];

export const GET_OARCOIN_BANNER_TITLE = "More Exchanges coming";

export const GET_OARCOIN_BANNER_BODY =
  "OAR is designed as an open system, and additional exchange listings may be added over time. As the ecosystem grows, more ways to access OAR will become available.";

export const ABOUT_PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01.",
    title: "Open and Fair Distribution",
    description:
      "OAR began with a fully public launch. There were no presales, private allocations, or early access. Every token entered the market openly, allowing anyone to acquire OAR under the same conditions. To maintain fairness over time, anti-whale protections are built into the system, limiting how much any single wallet can control. The result is a distribution model where participation — not privilege — determines ownership.",
  },
  {
    number: "02.",
    title: "Access without Limits",
    description:
      "Getting started with OAR does not require upfront capital. Through the faucet, anyone can claim OAR daily by verifying their humanity. This creates a simple entry point into the OAR ecosystem, especially for users who would otherwise be excluded from traditional financial or crypto systems.",
  },
  {
    number: "03.",
    title: "Using OAR",
    description:
      "OAR is meant to be used, not just held. It can be transferred between users for simple peer-to-peer payments, allowing value to move freely without intermediaries. OAR also powers a host of applications, such as Rafla, a social experience where participation creates opportunity. These applications give OAR practical use within the ecosystem.",
  },
  {
    number: "04.",
    title: "A System That Grows Through Activity",
    description:
      "OAR does not rely on a pre-funded treasury. Instead, a reserve is built gradually through activity across the network. As users interact with OAR, whether through transactions or applications, the system strengthens over time. This creates a model where growth is driven by real usage, not artificial allocation.",
  },
  {
    number: "05.",
    title: "Transparency by Design",
    description:
      "All core parts of the OAR system are visible and verifiable. The reserve, transaction activity, and overall system behavior can be viewed in real time through the dashboard. There are no hidden controls or opaque mechanisms; trust is established through openness.",
  },
  {
    number: "06.",
    title: "No Central Authority",
    description:
      "OAR operates without a central authority controlling supply or access. The system is governed by its design and by the collective activity of its users. This ensures that no single party can alter the system for its own advantage.",
  },
];
