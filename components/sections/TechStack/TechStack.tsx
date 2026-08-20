"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile, techStack, techCategoryColor } from "@/content/profile";

const DOT_OFF = "#26272e";
const STATUS_OFF = "#55575f";

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statusRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const promptRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
      const statuses = statusRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (rows.length === 0) return;

      if (reducedMotion) {
        gsap.set(railRef.current, { scaleY: 1 });
        gsap.set(rows, { opacity: 1 });
        gsap.set(promptRef.current, { autoAlpha: 1, y: 0 });
        techStack.forEach((group, i) => {
          const color = techCategoryColor[group.category];
          gsap.set(dots[i], { scale: 1, backgroundColor: color });
          gsap.set(statuses[i], { color });
          const el = statusRefs.current[i];
          if (el) el.textContent = "[ OK ]";
        });
        return;
      }

      gsap.set(railRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(rows, { opacity: 0.32 });
      gsap.set(dots, { scale: 0.55, backgroundColor: DOT_OFF });
      gsap.set(statuses, { color: STATUS_OFF });
      gsap.set(promptRef.current, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });

      tl.to(railRef.current, { scaleY: 1, duration: 1, ease: "power2.inOut" });

      techStack.forEach((group, i) => {
        const color = techCategoryColor[group.category];
        const position = i === 0 ? "-=0.7" : "-=0.35";

        tl.to(dots[i], { scale: 1, duration: 0.3, ease: "back.out(2.5)" }, position)
          .set(dots[i], { backgroundColor: color }, "<")
          .set(statuses[i], { color }, "<")
          .call(
            () => {
              const el = statusRefs.current[i];
              if (el) el.textContent = "[ OK ]";
            },
            [],
            "<",
          )
          .to(rows[i], { opacity: 1, duration: 0.4, ease: "power2.out" }, "<");
      });

      tl.to(promptRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.1");
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <Section ref={sectionRef} id="tech-stack" index={4} label="Tech Stack" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionLabel index="04" title="Tech Stack" />

        <p className="text-ink-300 mt-6 max-w-md text-sm">
          The stack that ships to production — each subsystem loads in sequence, like a clean boot.
        </p>

        <div className="relative mt-16">
          <div
            ref={railRef}
            className="bg-ink-700 absolute inset-y-4 left-4 w-px sm:left-5"
          />

          <div className="flex flex-col gap-8">
            {techStack.map((group, i) => (
              <div key={group.category} className="flex items-start gap-4 sm:gap-6">
                <div className="flex h-8 w-8 flex-none items-center justify-center sm:h-10 sm:w-10">
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                </div>

                <div
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-2 pt-1.5 sm:pt-2"
                >
                  <span
                    ref={(el) => {
                      statusRefs.current[i] = el;
                    }}
                    className="w-14 shrink-0 font-mono text-[11px] tracking-[0.2em] uppercase"
                  >
                    [ .. ]
                  </span>

                  <span className="text-paper w-24 shrink-0 font-mono text-xs tracking-[0.25em] uppercase">
                    {group.label}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border-ink-600 text-ink-200 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={promptRef}
          className="border-ink-700 mt-16 border-t pt-6 font-mono text-xs invisible"
        >
          <span className="text-accent">guest@{profile.initials.toLowerCase()}-systems</span>
          <span className="text-ink-400">:~$ </span>
          <span className="text-ink-200">stack --status</span>
          <div className="text-good mt-2 flex items-center gap-2">
            {techStack.length}/{techStack.length} subsystems online
            <span className="bg-good h-3 w-[7px] animate-pulse" />
          </div>
        </div>
      </div>
    </Section>
  );
}
