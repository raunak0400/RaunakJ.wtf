<div align="center">

# RaunakJ.wtf — Personal Portfolio

**Raunak Kumar Jha** · Backend Engineer · Distributed Systems · Open-Source Contributor

A high-motion, dark-themed personal portfolio built with the modern Next.js App Router,
GSAP timelines, Framer Motion, and Lenis smooth scrolling.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)](./LICENSE)

**🌐 Live:** [raunakj.wtf](https://raunakj.wtf) &nbsp;·&nbsp; **Alt build:** [portfolio.raunakj.wtf](https://portfolio.raunakj.wtf)

[Report a Bug](https://github.com/raunak0400/RaunakJ.wtf/issues) · [Contact](mailto:raunakkumarjha233@gmail.com)

</div>

---

## Overview

This is my personal portfolio — a single-page, scroll-driven experience that presents who I am,
what I build, and how I work. Every section is animated with GSAP scroll triggers and Framer Motion,
wrapped in a Lenis smooth-scroll container, and rendered on a grainy, glow-lit dark canvas.

The entire site's copy lives in **one file** ([`content/profile.ts`](./content/profile.ts)) so the
content is fully decoupled from the presentation — update the data, and the whole site updates.

## Features

- **Scroll-driven storytelling** — GSAP `ScrollTrigger` timelines choreograph every section as you scroll.
- **Smooth momentum scrolling** — [Lenis](https://github.com/darkroomengineering/lenis) for buttery inertia, with a `prefers-reduced-motion` fallback.
- **Custom cursor & magnetic buttons** — a pointer-fine, physics-y interaction layer.
- **Live GitHub data** — the Open Source section fetches repos live, with a static fallback when the API is offline or rate-limited.
- **Ambient visuals** — animated background glow (`BackgroundFX`), film grain overlay, and a hero glow.
- **Interactive terminal** — a faux terminal that renders skills, experience, and education.
- **Fully responsive & accessible** — respects reduced-motion, keyboard-friendly, semantic markup.
- **Zero content in components** — all copy is centralized in `content/profile.ts`.

## Tech Stack

| Layer            | Tooling                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| Framework        | [Next.js 16](https://nextjs.org) (App Router)                           |
| UI Library       | [React 19](https://react.dev)                                           |
| Language         | [TypeScript 5](https://www.typescriptlang.org)                          |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com) + PostCSS                    |
| Animation        | [GSAP 3](https://gsap.com) + [`@gsap/react`](https://www.npmjs.com/package/@gsap/react), [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scroll    | [Lenis](https://github.com/darkroomengineering/lenis)                   |
| Fonts            | [Geist Mono](https://vercel.com/font), Inter & Space Grotesk (`next/font`) |
| Utilities        | `clsx`, `tailwind-merge`                                                 |
| Linting          | ESLint 9 (`eslint-config-next`)                                         |
| Deployment       | [Vercel](https://vercel.com)                                            |

## Project Structure

```
new_portfolio/
├── app/                      # Next.js App Router entry
│   ├── layout.tsx            # Root layout — fonts, providers, global chrome
│   ├── page.tsx              # Home page — composes all sections
│   ├── globals.css           # Global styles & Tailwind layers
│   └── icon.tsx / apple-icon # Generated favicons
├── components/
│   ├── layout/               # BackgroundFX, Grain, CustomCursor, Chrome, Footer, SmoothScrollProvider
│   ├── sections/             # Hero, WhoIAm, Timeline, TechStack, Projects, OpenSource, Terminal, Contact
│   └── ui/                   # Section, SectionLabel, LinkPill, MagneticButton
├── content/
│   └── profile.ts            # ⭐ Single source of truth for ALL site copy
├── hooks/                    # usePointerFine, useReducedMotion
├── lib/                      # github.ts (live repos), gsap.ts (registration), utils.ts
├── public/                   # Static assets (CV.pdf, images, icons)
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

> **`imraunak-dev/`** is a standalone HTML/CSS/JS portfolio build, deployed live at
> **[portfolio.raunakj.wtf](https://portfolio.raunakj.wtf)**. **`old-portfolio/`** is an earlier
> Vite/React iteration. Both are merged in with their git history preserved for reference.

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (Node 20 LTS recommended)
- **npm** (or your preferred package manager — `yarn`, `pnpm`, `bun`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/raunak0400/RaunakJ.wtf.git
cd RaunakJ.wtf

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page hot-reloads as you edit.

### Available Scripts

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Start the local development server              |
| `npm run build` | Create an optimized production build            |
| `npm run start` | Serve the production build locally              |
| `npm run lint`  | Run ESLint across the project                   |

## Editing the Content

All text, projects, timeline steps, tech stack, and social links live in
[`content/profile.ts`](./content/profile.ts). To personalize or update the site, edit the exported
objects there — no component changes required:

- `profile` — name, tagline, bio, email, resume URL, social links
- `timelineSteps` — education & experience timeline
- `techStack` — grouped skills
- `projects` — case studies (problem / solution / challenges / stack / metrics)
- `terminalContent` — the interactive terminal's output

## Deployment

### Live environments

| URL | Source | Description |
| --- | ------ | ----------- |
| **[raunakj.wtf](https://raunakj.wtf)** | root (`app/`) | Primary portfolio — this Next.js 16 site |
| **[portfolio.raunakj.wtf](https://portfolio.raunakj.wtf)** | [`imraunak-dev/`](./imraunak-dev) | Standalone HTML/CSS/JS portfolio build |

The primary site is optimized for [Vercel](https://vercel.com). Push to your connected repository and Vercel
builds and deploys automatically. You can also run a production build anywhere Node is available:

```bash
npm run build && npm run start
```

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other targets.

## Security

Found a vulnerability? Please review the [Security Policy](./SECURITY.md) and report it privately
rather than opening a public issue.

## License

**All Rights Reserved.** This source code is made publicly viewable for reference and evaluation only.
No permission is granted to copy, modify, distribute, or reuse any part of this project without explicit
written consent. See [LICENSE](./LICENSE) for full terms.

## Contact

**Raunak Kumar Jha** — Gandhinagar, Gujarat, India

[![Email](https://img.shields.io/badge/Email-raunakkumarjha233@gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:raunakkumarjha233@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-raunak0400-181717?logo=github&logoColor=white)](https://github.com/raunak0400)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-raunak0400-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/raunak0400)
[![Twitter](https://img.shields.io/badge/Twitter-raunak0400-1DA1F2?logo=x&logoColor=white)](https://twitter.com/raunak0400)

<div align="center">
<sub>Built with Next.js, GSAP & a lot of caffeine ☕</sub>
</div>
