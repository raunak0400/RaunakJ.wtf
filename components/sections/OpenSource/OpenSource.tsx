"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gitCommits, contributionWeeks, type Repo } from "@/content/profile";

const COMMIT_SPACING = 72;
const COMMIT_START_X = 40;
const MAIN_Y = 110;
const FEATURE_Y = 40;

const commitPoints = gitCommits.map((commit, i) => ({
  ...commit,
  x: COMMIT_START_X + i * COMMIT_SPACING,
  y: commit.branch === "feature" ? FEATURE_Y : MAIN_Y,
}));

const lastX = COMMIT_START_X + (gitCommits.length - 1) * COMMIT_SPACING;
const mainPathD = `M${COMMIT_START_X},${MAIN_Y} L${lastX},${MAIN_Y}`;

const featureCommits = commitPoints.filter((c) => c.branch === "feature");
const featureStartX = featureCommits[0]?.x ?? 0;
const featureEndX = featureCommits[featureCommits.length - 1]?.x ?? 0;
const branchOutX = featureStartX - COMMIT_SPACING;
const mergeInX = featureEndX + COMMIT_SPACING;

const featurePathD =
  featureCommits.length > 0
    ? `M${branchOutX},${MAIN_Y} C${branchOutX + 28},${MAIN_Y} ${featureStartX - 28},${FEATURE_Y} ${featureStartX},${FEATURE_Y} L${featureEndX},${FEATURE_Y} C${featureEndX + 28},${FEATURE_Y} ${mergeInX - 28},${MAIN_Y} ${mergeInX},${MAIN_Y}`
    : "";

const svgWidth = lastX + 40;

const intensityClass: Record<number, string> = {
  0: "bg-ink-800",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

interface OpenSourceProps {
  repos: Repo[];
}

export function OpenSource({ repos }: OpenSourceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const featurePathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);
  const repoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const weekRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const dots = dotRefs.current.filter(Boolean) as SVGCircleElement[];
      const repoCards = repoRefs.current.filter(Boolean) as HTMLDivElement[];
      const weeks = weekRefs.current.filter(Boolean) as HTMLDivElement[];

      if (reducedMotion) {
        gsap.set(dots, { scale: 1 });
        gsap.set(repoCards, { autoAlpha: 1, y: 0 });
        gsap.set(weeks, { autoAlpha: 1, y: 0 });
        gsap.set([mainPathRef.current, featurePathRef.current], { strokeDashoffset: 0 });
        return;
      }

      gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(repoCards, { autoAlpha: 0, y: 16 });
      gsap.set(weeks, { autoAlpha: 0, y: 6 });

      const mainLength = mainPathRef.current?.getTotalLength() ?? 0;
      const featureLength = featurePathRef.current?.getTotalLength() ?? 0;
      gsap.set(mainPathRef.current, { strokeDasharray: mainLength, strokeDashoffset: mainLength });
      gsap.set(featurePathRef.current, {
        strokeDasharray: featureLength,
        strokeDashoffset: featureLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      tl.to(mainPathRef.current, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
        .to(
          featurePathRef.current,
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .to(dots, { scale: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2)" }, "-=0.6")
        .to(
          repoCards,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          "-=0.4",
        )
        .to(weeks, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.012, ease: "power2.out" }, "-=0.5");
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <Section
      ref={sectionRef}
      id="open-source"
      index={6}
      label="Open Source"
      className="relative py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="06" title="Open Source" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="border-ink-700 rounded-2xl border p-6">
            <svg viewBox={`0 0 ${svgWidth} 150`} className="h-auto w-full" fill="none">
              <path ref={mainPathRef} d={mainPathD} stroke="var(--color-ink-400)" strokeWidth={2} />
              {featurePathD && (
                <path
                  ref={featurePathRef}
                  d={featurePathD}
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                />
              )}
              {commitPoints.map((commit, i) => (
                <circle
                  key={commit.id}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  cx={commit.x}
                  cy={commit.y}
                  r={commit.merge ? 7 : 5.5}
                  className={
                    commit.merge
                      ? "fill-good"
                      : commit.branch === "feature"
                        ? "fill-accent"
                        : "fill-paper"
                  }
                />
              ))}
            </svg>
            <ul className="mt-4 space-y-1.5">
              {gitCommits.map((commit) => (
                <li
                  key={commit.id}
                  className="text-ink-300 flex items-center gap-3 font-mono text-[11px]"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      commit.merge ? "bg-good" : commit.branch === "feature" ? "bg-accent" : "bg-paper",
                    )}
                  />
                  {commit.message}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            {repos.map((repo, i) => (
              <div
                key={repo.name}
                ref={(el) => {
                  repoRefs.current[i] = el;
                }}
                className="border-ink-700 hover:border-accent/60 rounded-xl border p-4 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-paper font-mono text-sm">{repo.name}</p>
                  <span className="text-ink-300 font-mono text-[10px] uppercase">
                    {repo.language}
                  </span>
                </div>
                <p className="text-ink-300 mt-1.5 text-sm">{repo.description}</p>
                <div className="text-ink-400 mt-3 flex gap-4 font-mono text-[10px]">
                  <span>★ {repo.stars}</span>
                  <span>⑂ {repo.forks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">
            Contribution Activity
          </p>
          <div className="mt-4 flex gap-[3px] overflow-x-auto pb-2">
            {contributionWeeks.map((week, wi) => (
              <div
                key={wi}
                ref={(el) => {
                  weekRefs.current[wi] = el;
                }}
                className="flex flex-col gap-[3px]"
              >
                {week.map((intensity, di) => (
                  <span
                    key={di}
                    className={cn("h-[10px] w-[10px] rounded-[2px]", intensityClass[intensity])}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
