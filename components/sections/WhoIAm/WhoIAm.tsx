"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mapRange } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { identityStatements } from "@/content/profile";

export function WhoIAm() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const statements = statementRefs.current.filter(Boolean) as HTMLHeadingElement[];
      if (statements.length === 0) return;

      if (reducedMotion) {
        gsap.set(statements, { autoAlpha: 0, position: "static", display: "block" });
        gsap.set(statements[statements.length - 1], { autoAlpha: 1 });
        return;
      }

      gsap.set(statements, { autoAlpha: 0, filter: "blur(14px)", yPercent: 6 });
      gsap.set(statements[0], { autoAlpha: 1, filter: "blur(0px)", yPercent: 0 });

      const setBg = gsap.quickSetter(bgRef.current, "opacity") as (value: number) => void;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${statements.length * window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => setBg(mapRange(self.progress, 0, 1, 0.12, 0.55)),
        },
      });

      statements.forEach((el, i) => {
        if (i === 0) return;
        const prev = statements[i - 1];
        tl.to(prev, { autoAlpha: 0, filter: "blur(14px)", yPercent: -6, duration: 0.5 })
          .fromTo(
            el,
            { autoAlpha: 0, filter: "blur(14px)", yPercent: 6 },
            { autoAlpha: 1, filter: "blur(0px)", yPercent: 0, duration: 0.5 },
            "<",
          )
          .to({}, { duration: 0.6 });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <Section
      ref={sectionRef}
      id="who-i-am"
      index={2}
      label="Who I Am"
      className="flex h-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-b from-ink-900 via-void to-void opacity-10"
      />

      <SectionLabel index="02" title="Who I Am" className="absolute top-24 left-6 z-10" />

      <div className="relative z-10 flex w-full max-w-5xl items-center justify-center px-6">
        <div className="relative flex h-[40vw] max-h-64 min-h-40 w-full items-center justify-center">
          {identityStatements.map((statement, i) => (
            <h2
              key={statement}
              ref={(el) => {
                statementRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center text-center font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-paper"
            >
              {statement}
            </h2>
          ))}
        </div>
      </div>
    </Section>
  );
}
