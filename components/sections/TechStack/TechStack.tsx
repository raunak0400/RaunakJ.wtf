"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TechStackScene = dynamic(() => import("./TechStackScene"), {
  ssr: false,
  loading: () => null,
});

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        progressRef.current = 1;
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <Section
      ref={sectionRef}
      id="tech-stack"
      index={4}
      label="Tech Stack"
      className="relative h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute top-24 left-6 z-10">
        <SectionLabel index="04" title="Tech Stack" />
      </div>

      <div className="pointer-events-none absolute right-6 bottom-10 left-6 z-10 max-w-md">
        <p className="text-sm text-ink-300">
          A distributed system of languages, frameworks, and infrastructure — each connection
          formed as it enters production.
        </p>
      </div>

      <div className="absolute inset-0">
        <TechStackScene progressRef={progressRef} />
      </div>
    </Section>
  );
}
