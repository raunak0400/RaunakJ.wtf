"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkPill } from "@/components/ui/LinkPill";
import { projects, type Project } from "@/content/profile";

function ProjectBackground({ accent }: { accent: Project["accent"] }) {
  const glow = accent === "blue" ? "var(--color-accent)" : "var(--color-warn)";
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 15% 20%, ${glow}26, transparent 60%), radial-gradient(50% 40% at 85% 80%, ${glow}1a, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink-500) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink-500) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="from-void via-void/10 to-void absolute inset-0 bg-gradient-to-t" />
    </div>
  );
}

function ProjectCardBody({ project, index }: { project: Project; index: number }) {
  const accentText = project.accent === "blue" ? "text-accent" : "text-warn";
  const accentDot = project.accent === "blue" ? "bg-accent" : "bg-warn";

  return (
    <>
      <div>
        <p className={cn("font-mono text-xs tracking-[0.3em] uppercase", accentText)}>
          {String(index + 1).padStart(2, "0")} — Case Study
        </p>
        <h3 className="text-paper mt-4 font-display text-4xl font-semibold sm:text-5xl">
          {project.name}
        </h3>
        <p className="text-ink-200 mt-4 max-w-md">{project.tagline}</p>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">
              Problem
            </p>
            <p className="text-ink-200 mt-1 text-sm">{project.problem}</p>
          </div>
          <div>
            <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">
              Solution
            </p>
            <p className="text-ink-200 mt-1 text-sm">{project.solution}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkPill href={project.liveUrl}>Live Demo</LinkPill>
          <LinkPill href={project.githubUrl}>GitHub</LinkPill>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8">
        <div>
          <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">
            Challenges
          </p>
          <ul className="mt-3 space-y-2">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="text-ink-200 flex gap-3 text-sm">
                <span className={cn("mt-1.5 h-1 w-1 shrink-0 rounded-full", accentDot)} />
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border-ink-600 text-ink-200 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-ink-300 font-mono text-[10px] tracking-[0.25em] uppercase">
            Pipeline
          </p>
          <div className="text-ink-300 mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
            {project.pipeline.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {step}
                {i < project.pipeline.length - 1 && <span className="text-ink-500">→</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="border-ink-700 grid grid-cols-3 gap-4 border-t pt-6">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-paper font-display text-2xl font-semibold">{metric.value}</p>
              <p className="text-ink-300 mt-1 text-[10px] tracking-wide uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        cards.forEach((card, i) => {
          card.style.opacity = i === 0 ? "1" : "0";
          card.style.transform = i === 0 ? "translateY(0px)" : "translateY(24px)";
        });

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance() * 0.55}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIndex = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length),
              );
              cards.forEach((card, i) => {
                const isActive = i === activeIndex;
                card.style.opacity = isActive ? "1" : "0";
                card.style.transform = isActive ? "translateY(0px)" : "translateY(24px)";
              });
            },
          },
        });

        tl.to(track, { x: () => -getDistance(), ease: "none" }, 0);
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-project-item]");
        gsap.set(items, { autoAlpha: 0, y: 24 });
        items.forEach((item) => {
          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section
      ref={sectionRef}
      id="projects"
      index={5}
      label="Projects"
      className="relative md:h-screen md:overflow-hidden"
    >
      <div className="relative z-20 px-6 pt-24 md:absolute md:top-16 md:left-6 md:px-0">
        <SectionLabel index="05" title="Projects" />
      </div>

      <div className="hidden h-full w-full md:flex md:items-center">
        <div ref={trackRef} className="flex">
          {projects.map((project, i) => (
            <div key={project.id} className="relative flex h-screen w-screen shrink-0 items-center">
              <ProjectBackground accent={project.accent} />
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative z-10 mx-auto grid w-full max-w-5xl gap-10 px-6 transition-none md:grid-cols-[1.1fr_0.9fr] md:px-16"
              >
                <ProjectCardBody project={project} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-24 px-6 py-24 md:hidden">
        {projects.map((project, i) => (
          <div key={project.id} data-project-item className="relative overflow-hidden rounded-2xl">
            <ProjectBackground accent={project.accent} />
            <div className="relative z-10 grid gap-10 p-6">
              <ProjectCardBody project={project} index={i} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
