import { HeaderNavSection } from "../interfaces";

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
