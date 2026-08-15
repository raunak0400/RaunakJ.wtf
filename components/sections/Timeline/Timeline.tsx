"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { timelineSteps } from "@/content/profile";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drawLineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
        const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(drawLineRef.current, { scaleX: 0 });
        dots.forEach((dot) => {
          dot.style.backgroundColor = "var(--color-ink-600)";
          dot.style.transform = "scale(1)";
        });
        labels.forEach((label) => {
          label.style.opacity = "0.35";
        });

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance() * 0.6}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              dots.forEach((dot, i) => {
                const threshold = i / Math.max(dots.length - 1, 1);
                const active = self.progress >= threshold - 0.015;
                dot.style.backgroundColor = active ? "var(--color-accent)" : "var(--color-ink-600)";
                dot.style.transform = active ? "scale(1.5)" : "scale(1)";
                if (labels[i]) labels[i]!.style.opacity = active ? "1" : "0.35";
              });
            },
          },
        });

        tl.to(track, { x: () => -getDistance(), ease: "none" }, 0);
        tl.to(drawLineRef.current, { scaleX: 1, ease: "none" }, 0);
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-timeline-item]");
        gsap.set(items, { autoAlpha: 0, y: 24 });
        items.forEach((item) => {
          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section
      ref={sectionRef}
      id="timeline"
      index={3}
      label="Timeline"
      className="relative md:h-screen md:overflow-hidden"
    >
      <div className="relative z-10 px-6 pt-24 md:absolute md:top-16 md:left-6 md:px-0">
        <SectionLabel index="03" title="Timeline" />
      </div>

      {/* Desktop: horizontal pinned scroll */}
      <div className="hidden h-full w-full items-center md:flex">
        <div ref={trackRef} className="flex items-center pr-[40vw] pl-[8vw]">
          <div className="relative flex items-center">
            <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-ink-700" />
            <div
              ref={drawLineRef}
              className="absolute top-1/2 h-px w-full origin-left -translate-y-1/2 bg-accent"
            />

            {timelineSteps.map((step, i) => (
              <div key={step.label} className="relative flex w-[26vw] max-w-96 min-w-72 shrink-0 justify-center">
                <div
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className={cn(
                    "absolute left-1/2 w-64 -translate-x-1/2 text-center transition-opacity duration-500",
                    i % 2 === 0 ? "bottom-[calc(50%+2rem)]" : "top-[calc(50%+2rem)]",
                  )}
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] text-ink-300 uppercase">
                    {step.year}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">
                    {step.label}
                  </p>
                  <p className="mt-2 text-sm text-ink-300">{step.detail}</p>
                </div>

                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="relative z-10 h-3 w-3 rounded-full transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stacked fallback */}
      <div className="flex flex-col gap-10 border-l border-ink-700 px-6 py-16 md:hidden">
        {timelineSteps.map((step) => (
          <div key={step.label} data-timeline-item className="relative pl-8">
            <div className="absolute top-1.5 -left-[calc(1.5rem+1px)] h-3 w-3 rounded-full bg-accent" />
            <p className="font-mono text-[10px] tracking-[0.25em] text-ink-300 uppercase">
              {step.year}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-paper">{step.label}</p>
            <p className="mt-2 text-sm text-ink-300">{step.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
