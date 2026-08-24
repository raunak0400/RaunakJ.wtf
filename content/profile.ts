/**
 * SITE CONTENT.
 *
 * Single source of truth for copy on the site — edit the values here and the
 * whole site updates.
 *
 * NOTE: `projects` below is still placeholder — swap in real case studies
 * (problem/solution/challenges/stack/metrics/links) before shipping.
 */

export const profile = {
  name: "Raunak Kumar Jha",
  initials: "RJ",
  tagline: "Backend Engineer | Distributed Systems | Open source contributor",
  location: "Gandhinagar, Gujarat, India",
  email: "raunakkumarjha233@gmail.com",
  bio: "Results-driven Full Stack Developer with expertise in building scalable web applications, backend systems, and cloud deployments. Proficient in frontend frameworks, API integration, and database management. Strong foundation in DevOps practices with hands-on experience in containerization and CI/CD pipelines.",
  resumeUrl: "/CV.pdf",
  openToOpportunities: true,
  githubUsername: "raunak0400",
  socials: {
    github: "https://github.com/raunak0400",
    linkedin: "https://linkedin.com/in/raunak0400",
    twitter: "https://twitter.com/raunak0400",
    leetcode: "https://leetcode.com/u/raunak0400/",
    instagram: "https://instagram.com/raunak.1812",
  },
};

export const heroCopy = {
  kicker: "BACKEND — DEVOPS — OPEN SOURCE",
  headline: profile.name,
  subline: profile.tagline,
  scrollCue: "Scroll",
};

export const identityStatements = [
  "I BUILD BACKENDS.",
  "I BEND APIs TO MY WILL.",
  "I AUTOMATE INFRASTRUCTURE.",
  "I SHIP TO THE CLOUD.",
  "I CONTRIBUTE TO OPEN SOURCE.",
];

export interface TimelineStep {
  label: string;
  year: string;
  detail: string;
}

export const timelineSteps: TimelineStep[] = [
  { label: "High School", year: "2024", detail: "Om Landmark School — PCM, 88%" },
  { label: "B.Tech Computer Science", year: "2024", detail: "Gandhinagar University, batch of 2028" },
  {
    label: "IIT Guwahati Micro-Credential",
    year: "2025",
    detail: "Micro-credit program in Computer Science & Engineering",
  },
  {
    label: "SDE Intern — Backend",
    year: "2025",
    detail: "Tech Mahindra — REST APIs, Redis caching, query optimization",
  },
  {
    label: "Software Dev Intern",
    year: "2026",
    detail: "Mangalam Information Technologies — backend & DevOps",
  },
  { label: "Open Source", year: "2026", detail: "Public contributions — backend & DevOps tooling" },
  {
    label: "Open to Opportunities",
    year: "Now",
    detail: "Backend-centric full stack, DevOps, exploring Web3",
  },
];

export type TechCategory = "languages" | "backend" | "database" | "tools";

export interface TechGroup {
  category: TechCategory;
  label: string;
  items: string[];
}

export const techCategoryColor: Record<TechCategory, string> = {
  languages: "#ff6a39",
  backend: "#0a84ff",
  database: "#ff6a39",
  tools: "#0a84ff",
};

export const techStack: TechGroup[] = [
  {
    category: "languages",
    label: "Languages",
    items: ["Python", "Go", "JavaScript", "TypeScript"],
  },
  {
    category: "backend",
    label: "Backend",
    items: ["Django", "Flask", "FastAPI", "REST API", "Node.js", "Express.js"],
  },
  { category: "database", label: "Database", items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"] },
  {
    category: "tools",
    label: "Tools",
    items: ["AWS", "Docker", "Git", "Kubernetes", "Jenkins", "Nginx", "Kafka"],
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  challenges: string[];
  stack: string[];
  pipeline: string[];
  metrics: ProjectMetric[];
  liveUrl: string;
  githubUrl: string;
  accent: "blue" | "orange";
}

// PLACEHOLDER — replace with real case studies.
export const projects: Project[] = [
  {
    id: "ledger",
    name: "Ledger",
    tagline: "Real-time transaction ledger for a multi-tenant payments platform",
    problem:
      "Every write needed strict ordering and full auditability across tenants, but a single Postgres instance was buckling under write contention during peak load.",
    solution:
      "Partitioned writes by tenant through a Kafka-backed event log, replayed into per-tenant materialized views, with idempotency keys guaranteeing exactly-once application.",
    challenges: [
      "Guaranteeing ordering across partitions without a global lock",
      "Backfilling 18 months of history with zero downtime",
      "Keeping read replicas under 200ms of replication lag",
    ],
    stack: ["TypeScript", "Kafka", "PostgreSQL", "Redis", "Kubernetes"],
    pipeline: ["Kafka", "Consumer Group", "Postgres", "Redis Cache", "Kubernetes"],
    metrics: [
      { label: "Events / day", value: "14.2M" },
      { label: "P99 latency", value: "38ms" },
      { label: "Uptime", value: "99.97%" },
    ],
    liveUrl: "https://ledger.example.com",
    githubUrl: "https://github.com/raunak0400/ledger",
    accent: "blue",
  },
  {
    id: "meshline",
    name: "Meshline",
    tagline: "Service-mesh observability layer for a 60-microservice fleet",
    problem:
      "Incident response took 40+ minutes because no single view connected request traces, deploys, and infrastructure metrics.",
    solution:
      "Built a correlation layer that stitches OpenTelemetry traces to Grafana dashboards and deploy events, surfacing the likely root cause automatically.",
    challenges: [
      "Sampling traces at scale without losing the rare failure paths",
      "Correlating deploy timestamps across independently-shipped services",
      "Keeping the ingestion pipeline cheaper than the incidents it prevents",
    ],
    stack: ["Go", "Prometheus", "Grafana", "OpenTelemetry", "Docker"],
    pipeline: ["OTel Collector", "Prometheus", "Grafana", "Alertmanager"],
    metrics: [
      { label: "MTTR reduction", value: "-62%" },
      { label: "Services covered", value: "60" },
      { label: "Traces / sec", value: "9.1K" },
    ],
    liveUrl: "https://meshline.example.com",
    githubUrl: "https://github.com/raunak0400/meshline",
    accent: "orange",
  },
];

export interface GitCommit {
  id: string;
  message: string;
  branch: "main" | "feature";
  merge?: boolean;
}

export const gitCommits: GitCommit[] = [
  { id: "a1", message: "init: project scaffold", branch: "main" },
  { id: "a2", message: "feat: add JWT auth middleware", branch: "main" },
  { id: "b1", message: "feat: redis caching layer", branch: "feature" },
  { id: "b2", message: "test: cache invalidation edge cases", branch: "feature" },
  { id: "b3", message: "fix: race condition in cache writer", branch: "feature" },
  { id: "a3", message: "merge: redis-cache into main", branch: "main", merge: true },
  { id: "a4", message: "chore: bump dependencies", branch: "main" },
  { id: "a5", message: "perf: connection pooling", branch: "main" },
];

export interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
}

// Used only if the live GitHub fetch in lib/github.ts fails (offline, rate-limited, etc).
export const fallbackRepos: Repo[] = [
  {
    name: "Modern_Portfolio",
    description:
      "Modern, responsive personal portfolio built with Vite, React, TypeScript, and Framer Motion.",
    stars: 13,
    forks: 1,
    language: "TypeScript",
  },
  {
    name: "Flask-CXR",
    description:
      "Comment-driven code editor that converts comments into functional code and flags errors across languages.",
    stars: 4,
    forks: 0,
    language: "Python",
  },
  {
    name: "Good-Jobs-Backend",
    description:
      "Production-ready Express.js REST API serving job listings, accommodation data, and CV delivery via email.",
    stars: 0,
    forks: 0,
    language: "JavaScript",
  },
  {
    name: "Nullpoint-x-ITNU",
    description:
      "Aurora-Air — air quality intelligence system fusing NASA TEMPO satellite data with ground sensors. Built for NASA Space Apps Challenge.",
    stars: 0,
    forks: 1,
    language: "TypeScript",
  },
];

function mulberry32(seed: number) {
  let state = seed | 0;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const contributionRandom = mulberry32(20260716);

export const contributionWeeks: number[][] = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => {
    const r = contributionRandom();
    if (r > 0.97) return 4;
    if (r > 0.9) return 3;
    if (r > 0.75) return 2;
    if (r > 0.5) return 1;
    return 0;
  }),
);

export const terminalContent = {
  skills: [
    "Languages      Python, Go, JavaScript, TypeScript",
    "Backend        Django, Flask, FastAPI, REST API, Node.js, Express.js",
    "Database       MongoDB, MySQL, PostgreSQL, Redis",
    "Tools          AWS, Docker, Git, Kubernetes, Jenkins, Nginx, Kafka",
    "Interests      Web3, Blockchain, Crypto",
  ],
  experience: [
    "Open to Opportunities        Now     Backend-centric full stack, DevOps, exploring Web3",
    "Software Development Intern  2026    Mangalam Information Technologies — backend & DevOps",
    "SDE Intern — Backend         2025    Tech Mahindra — Django REST APIs, Redis caching, query optimization",
    "Open Source Contributor      2025    Public repos — dev tooling, backend & DevOps projects",
  ],
  education: [
    "B.Tech Computer Science — Gandhinagar University (2024–2028)",
    "Micro-Credential Program, CSE — IIT Guwahati",
    "Higher Secondary (PCM) — Om Landmark School, 88%",
  ],
};

export const connectionSequence = [
  "Initializing secure channel...",
  "Resolving endpoint...",
  "Handshake complete.",
  "Connection established.",
];
