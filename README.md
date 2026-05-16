# Oarcoin

Marketing and product website for **Oarcoin (OAR)** — The Open Asset Reserve. An open, community-driven digital currency designed for fair access, transparent growth, and everyday use.

## About

OAR is built around open participation: no insiders, no presales, and no central authority. The site covers how to get started, how the system works, community resources, and product surfaces such as the faucet and reserve dashboard.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev) icons

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io) (recommended; lockfile included)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # run ESLint
```

`npm` and `yarn` work as well if you prefer them over pnpm.

## Project structure

```
src/
├── app/              # App Router pages and layouts
├── components/       # UI and page sections (home, about, faqs, …)
│   └── ui/           # shadcn/ui primitives
└── lib/
    ├── constants/    # Nav, copy, FAQs, product data
    ├── interfaces/   # Shared TypeScript types
    └── utils.ts      # Utilities (e.g. cn)
public/
└── assets/           # Illustrations, icons, hero art, video
```

## Routes

| Path           | Description                    |
| -------------- | ------------------------------ |
| `/`            | Home                           |
| `/start`       | Getting started                |
| `/about`       | How it works                   |
| `/progress`    | OAR progress & roadmap         |
| `/get-oarcoin` | Acquire OAR (e.g. via Uniswap) |
| `/communities` | Community                      |
| `/faucet`      | OAR faucet                     |
| `/reserve`     | Reserve dashboard              |
| `/faqs`        | Frequently asked questions     |
| `/terms`       | Terms of service               |
| `/privacy`     | Privacy policy                 |

## Deployment

Build the app with `pnpm build`, then run `pnpm start` or deploy to any platform that supports Next.js (e.g. [Vercel](https://vercel.com)).

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
