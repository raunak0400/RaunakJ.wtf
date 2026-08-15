/**
 * PLACEHOLDER CONTENT.
 *
 * Every value in this file is a placeholder. This is the single source of
 * truth for copy on the site — replace the values here and the whole site
 * updates. Nothing below is real.
 */

export const profile = {
  name: "Jordan Vance",
  initials: "JV",
  role: "Software Engineer",
  focus: "Backend & Distributed Systems",
  location: "Based in San Francisco, CA — Remote",
  email: "hello@jordanvance.dev",
  resumeUrl: "/resume.pdf",
  openToOpportunities: true,
  socials: {
    github: "https://github.com/jordanvance",
    linkedin: "https://linkedin.com/in/jordanvance",
    twitter: "https://twitter.com/jordanvance",
  },
};

export const heroCopy = {
  kicker: "BACKEND — DISTRIBUTED SYSTEMS — INFRASTRUCTURE",
  headline: profile.name,
  subline: `${profile.role} — ${profile.focus}`,
  scrollCue: "Scroll",
};

export const identityStatements = [
  "I BUILD BACKENDS.",
  "I DESIGN SYSTEMS.",
  "I SCALE INFRASTRUCTURE.",
  "I SHIP RELIABILITY.",
];

export interface TimelineStep {
  label: string;
  year: string;
  detail: string;
}

export const timelineSteps: TimelineStep[] = [
  { label: "Student", year: "2016", detail: "Systems, algorithms, first lines of code" },
  { label: "Developer", year: "2018", detail: "First production deploy, first outage" },
  { label: "Backend Engineer", year: "2020", detail: "APIs, databases, service design" },
  { label: "DevOps", year: "2021", detail: "CI/CD, containers, infrastructure as code" },
  { label: "Distributed Systems", year: "2022", detail: "Queues, consistency, failure modes" },
  { label: "Open Source", year: "2023", detail: "Public contributions, code review at scale" },
  { label: "Building at Scale", year: "Now", detail: "Millions of requests, zero drama" },
];

export type TechCategory =
  | "language"
  | "backend"
  | "data"
  | "infra"
  | "cloud"
  | "observability";

export interface TechNode {
  id: string;
  label: string;
  category: TechCategory;
  position: [number, number, number];
}

export const techCategoryColor: Record<TechCategory, string> = {
  language: "#f5f5f5",
  backend: "#0a84ff",
  data: "#ff6a39",
  infra: "#0a84ff",
  cloud: "#f5f5f5",
  observability: "#ff6a39",
};

export const techNodes: TechNode[] = [
  { id: "typescript", label: "TypeScript", category: "language", position: [-3.2, 1.4, 0] },
  { id: "go", label: "Go", category: "language", position: [-2.4, -1.3, 1.2] },
  { id: "python", label: "Python", category: "language", position: [-3.6, -0.2, -1.4] },
  { id: "node", label: "Node.js", category: "backend", position: [-1.1, 2.1, -0.6] },
  { id: "express", label: "Express", category: "backend", position: [-0.4, 0.5, 1.7] },
  { id: "fastapi", label: "FastAPI", category: "backend", position: [-1.8, -1.9, 0.3] },
  { id: "postgres", label: "PostgreSQL", category: "data", position: [0.8, -2.1, 1] },
  { id: "redis", label: "Redis", category: "data", position: [1.7, -0.6, -1.6] },
  { id: "kafka", label: "Kafka", category: "data", position: [0.3, 1.9, -1.8] },
  { id: "docker", label: "Docker", category: "infra", position: [2.4, 1.4, 0.8] },
  { id: "kubernetes", label: "Kubernetes", category: "infra", position: [3.3, 0, -0.4] },
  { id: "terraform", label: "Terraform", category: "infra", position: [2.8, -1.7, 1.2] },
  { id: "aws", label: "AWS", category: "cloud", position: [3.9, 1.8, -1.2] },
  { id: "grafana", label: "Grafana", category: "observability", position: [1.2, 2.7, 1] },
  { id: "prometheus", label: "Prometheus", category: "observability", position: [0, 3.1, -0.2] },
];

export const techEdges: [string, string][] = [
  ["typescript", "node"],
  ["node", "express"],
  ["python", "fastapi"],
  ["express", "postgres"],
  ["fastapi", "postgres"],
  ["node", "redis"],
  ["express", "kafka"],
  ["kafka", "redis"],
  ["node", "docker"],
  ["fastapi", "docker"],
  ["docker", "kubernetes"],
  ["kubernetes", "terraform"],
  ["kubernetes", "aws"],
  ["terraform", "aws"],
  ["kubernetes", "prometheus"],
  ["prometheus", "grafana"],
  ["go", "docker"],
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
    githubUrl: "https://github.com/jordanvance/ledger",
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
    githubUrl: "https://github.com/jordanvance/meshline",
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
  { id: "a2", message: "feat: add auth middleware", branch: "main" },
  { id: "b1", message: "feat: rate limiter", branch: "feature" },
  { id: "b2", message: "test: rate limiter edge cases", branch: "feature" },
  { id: "b3", message: "fix: race condition in limiter", branch: "feature" },
  { id: "a3", message: "merge: rate-limiter into main", branch: "main", merge: true },
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

export const repos: Repo[] = [
  {
    name: "event-mesh",
    description: "Lightweight event bus for service-to-service messaging",
    stars: 842,
    forks: 61,
    language: "Go",
  },
  {
    name: "pg-migrate-lite",
    description: "Zero-dependency Postgres migration runner",
    stars: 431,
    forks: 28,
    language: "TypeScript",
  },
  {
    name: "rate-limiter-rs",
    description: "Sliding-window rate limiter, Redis-backed",
    stars: 276,
    forks: 19,
    language: "Rust",
  },
  {
    name: "observability-kit",
    description: "Drop-in Prometheus + Grafana starter for Node services",
    stars: 198,
    forks: 14,
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
    "Languages      TypeScript, Go, Python",
    "Backend        Node.js, Express, FastAPI",
    "Data           PostgreSQL, Redis, Kafka",
    "Infra          Docker, Kubernetes, Terraform",
    "Cloud          AWS",
    "Observability  Grafana, Prometheus",
  ],
  experience: [
    "Building at Scale        Now    Distributed systems, platform reliability",
    "Open Source Contributor  2023   Public repos, code review at scale",
    "Distributed Systems      2022   Queues, consistency, failure modes",
    "DevOps                   2021   CI/CD, containers, infrastructure as code",
    "Backend Engineer         2020   APIs, databases, service design",
  ],
  education: [
    "B.S. Computer Science — Systems & Algorithms track",
    "Self-directed study — distributed systems, database internals",
  ],
};

export const connectionSequence = [
  "Initializing secure channel...",
  "Resolving endpoint...",
  "Handshake complete.",
  "Connection established.",
];
