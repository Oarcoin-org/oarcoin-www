import {
  CommunityCategory,
  DirectoryPageData,
  Faq,
  FaucetPageData,
  FooterLinkSection,
  HeaderNavSection,
  HowItWorksStep,
  LiveProduct,
  ProcessIntroParagraph,
  ProcessStep,
  ProgressBulletGroup,
  ReservePageData,
  Step,
} from "../interfaces";

export const NAV: HeaderNavSection[] = [
  {
    label: "Introduction",
    items: [
      { label: "Getting Started", href: "/start" },
      { label: "How it works", href: "/about" },
      { label: "OAR Progress", href: "/progress" },
      { label: "Whitepaper", href: "/whitepaper", newTab: true },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Exchanges", href: "/get-oarcoin" },
      { label: "Community", href: "/communities" },
    ],
  },
  {
    label: "Explore",
    items: [
      { label: "OAR Faucet", href: "/faucet" },
      { label: "Oar Directory", href: "/directory" },
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
      { label: "Whitepaper", href: "/whitepaper", newTab: true },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Exchanges", href: "/get-oarcoin" },
      { label: "Community", href: "/communities" },
    ],
  },
  {
    title: "Participate",
    items: [
      { label: "Faucet", href: "/faucet" },
      { label: "Rafla", externalHref: "https://rafla.xyz" },
      { label: "Oar Reserve Dashboard", href: "/reserve" },
    ],
  },
  {
    title: "Socials",
    items: [
      { label: "X (Twitter)", externalHref: "https://x.com/oarcoin" },
      { label: "Telegram", externalHref: "https://t.me/oarcoin" },
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
    href: "/whitepaper",
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
    href: "https://rafla.xyz",
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

export const BE_PART_BANNER_TITLE = "Be Part of the Progress";

export const BE_PART_BANNER_BODY =
  "OAR is not something you wait for. It's something you join. Claim it, Use it and contribute to its growth.";

export const BE_PART_BANNER_CTA = {
  label: "Get Started with OAR",
  href: "/start",
} as const;

export const IN_DEVELOPMENT: ProgressBulletGroup[] = [
  {
    title: "Expanded Applications",
    items: [
      "New ways to use OAR across social, financial and community driven experiences",
    ],
  },
  {
    title: "Ecosystem Tools",
    items: ["Infrastructure to support developers, users and broader adoption"],
  },
];

export const DIRECTION_FOCUS = [
  "Expanding access to OAR globally",
  "Increasing real world and digital use cases",
  "Strengthening the reserve through activity",
  "Supporting a broader ecosystem of applications and contributors",
];

export const BUILT_TO_EVOLVE = [
  "There is no fixed roadmap",
  "OAR progresses through real usage, community participation and ongoing development",
  "As the system grows, new components will emerge - shaped by how people use it",
];

export const LIVE_PRODUCTS: LiveProduct[] = [
  {
    title: "Oar Faucet",
    icon: "/assets/icons/faucet.svg",
    items: [
      "Claim OAR daily and enter the system without an upfront cost.",
      "Accessible to anyone, anywhere.",
    ],
  },
  {
    title: "Rafla",
    icon: "/assets/icons/rafla.svg",
    items: [
      "The first application built on OAR",
      "A social experience where participation creates opportunity",
    ],
  },
  {
    title: "Reserve Dashboard",
    icon: "/assets/icons/reserve.svg",
    items: [
      "A transparent view into the system",
      "Track how the reserve grows over time through real activity",
    ],
  },
];

export const FAQS: Faq[] = [
  {
    id: "what-is-oar",
    question: "What is Oarcoin (OAR)?",
    answer:
      "Oarcoin (OAR) is the Open Asset Reserve — a community-owned crypto system built on fairness, transparency, and open access.\n\nIt launched with no presale and no insider allocation. Anyone can participate from day one.",
  },
  {
    id: "how-is-oar-different",
    question: "How is OAR different from other cryptocurrencies?",
    answer:
      "OAR is designed around fairness and open participation.\n\nThere are no early investors or privileged access. Distribution happens publicly, and the system grows through real usage rather than pre-allocated control.",
  },
  {
    id: "how-to-get-oar",
    question: "How can I get OAR?",
    answer:
      "You can get OAR in two main ways:\n\n• Claim it daily through the faucet\n• Buy it on Uniswap\n\nThis allows anyone to participate, regardless of starting capital.",
  },
  {
    id: "need-money",
    question: "Do I need money to start using OAR?",
    answer:
      "No.\n\nOAR is designed to be accessible without upfront cost. You can begin by claiming tokens from the faucet and participating in the system from there.",
  },
  {
    id: "use-oar",
    question: "What can I do with OAR?",
    answer:
      "OAR can be used for:\n\n• Peer-to-peer transfers (sending and receiving value)\n• Participating in applications like Rafla\n• Engaging in an open system for value exchange\n\nOver time, more use cases may be added to the ecosystem.",
  },
  {
    id: "what-is-rafla",
    question: "What is Rafla?",
    answer:
      "Rafla is the first application built on OAR.\n\nIt is a social experience where users can participate, engage, and create opportunities using OAR.",
  },
  {
    id: "oar-reserve",
    question: "What is the OAR Reserve?",
    answer:
      "The reserve is a transparent pool that grows over time through network activity. It is built to grow organically and can be viewed in real time through the dashboard.",
  },
  {
    id: "total-supply",
    question: "What is the total supply of OAR?",
    answer:
      "The total supply of OAR is 10 billion tokens.\n\nAll tokens are part of an open system designed for public access and participation.",
  },
  {
    id: "blockchain",
    question: "What blockchain is OAR built on?",
    answer:
      "OAR is built on Base, a secure and scalable Ethereum Layer 2 network.\n\nThis allows for fast transactions and lower fees while maintaining strong network security.",
  },
  {
    id: "is-oar-safe",
    question: "Is OAR safe to use?",
    answer:
      "OAR is built on transparent, verifiable systems.\n\nHowever, users should always take responsibility for their own security:\n\n• Verify official links\n• Confirm contract addresses\n• Avoid scams or impersonators",
  },
  {
    id: "where-to-buy",
    question: "Where can I buy OAR?",
    answer:
      "OAR is currently available on Uniswap, where you can trade directly from your wallet without intermediaries.",
  },
  {
    id: "more-exchanges",
    question: "Will OAR be listed on more exchanges?",
    answer:
      "OAR is an open system, and additional listings may be added over time.\n\nFuture availability will depend on ecosystem growth and adoption.",
  },
  {
    id: "investment",
    question: "Is OAR an investment?",
    answer:
      "OAR is designed as an open system for participation and use.\n\nLike any digital asset, its value may change over time. Users should make their own decisions and understand the risks involved.",
  },
  {
    id: "stay-updated",
    question: "How can I stay updated?",
    answer:
      "You can follow OAR through its official channels and community platforms for updates, announcements, and new developments.",
  },
];

export const RESERVE: ReservePageData = {
  hero: {
    title: "Reserve Dashboard V1",
    description:
      "A real-time view of the OAR Reserve — a self-growing treasury powered by every transaction.",
  },
  stats: {
    reserveBalanceOar: 0,
    reserveBalanceUsd: 0,
    holders: 0,
    livePrice: 0,
    priceChange24h: 0,
    marketCapLabel: "$0",
  },
  reserveWallet: "0x123hg7a86gf987a97gbdabcd",
  growthChart: {
    "24H": {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
      values: [0, 0, 0, 0, 0, 0, 0],
    },
    "7D": {
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      values: [0, 0, 0, 0, 0, 0, 0],
    },
    "30D": {
      labels: ["W1", "W2", "W3", "W4"],
      values: [0, 0, 0, 0],
    },
  },
};

export const DIRECTORY: DirectoryPageData = {
  hero: {
    title: "OAR Directory",
    description:
      "Discover a curated directory of projects, communities and tools shaping the Oarcoin ecosystem.",
    backgroundImage: "/assets/hero/directory.svg",
    submitProjectLabel: "Submit Project",
  },
  submit: {
    title: "Submit your project",
    description:
      "To be listed in the OAR Directory, send us your project name, description, website, and any relevant links.",
    email: "oarcoin@gmail.com",
    ctaLabel: "Send email",
    mailSubject: "OAR Directory — Project submission",
  },
  featuredSectionTitle: "Featured Projects",
  exploreSectionTitle: "Explore the Ecosystem",
};

export const FAUCET: FaucetPageData = {
  hero: {
    title: "OAR Faucet",
    description:
      "Earn OAR. Every Day. The fairest way to earn Oarcoin — no insiders, just participation.",
    backgroundImage: "/assets/hero/faucet.svg",
    connectWalletLabel: "Connect Wallet",
  },
  stats: {
    totalDistributed: 12_450_000,
    dailyReward: 15,
    nextClaimTime: "23:45:12",
    totalEarned: 0,
    streakDays: 5,
  },
  tasksSectionTitle: "Mandatory Tasks",
  claimLabel: "Claim",
};

export const COMMUNITIES: CommunityCategory[] = [
  {
    title: "Meetups",
    icon: "/assets/icons/family.svg",
    items: [{ label: "Oarcoin meetups", disabled: true }],
  },
  {
    title: "Social Networks",
    icon: "/assets/icons/globe.svg",
    items: [
      { label: "Twitter/X", externalHref: "https://x.com" },
      { label: "Telegram", externalHref: "https://t.me/oarcoin" },
    ],
  },
];

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
