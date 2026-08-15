"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { HeroGlow } from "./HeroGlow";
import { heroCopy } from "@/content/profile";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      gsap.set(contentRef.current, { autoAlpha: 1 });

      if (reducedMotion) {
        gsap.set([kickerRef.current, headlineRef.current, sublineRef.current, cueRef.current], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      const split = new SplitText(headlineRef.current, { type: "chars", charsClass: "char" });

      gsap.set(split.chars, { autoAlpha: 0, yPercent: 120, rotateZ: 4 });
      gsap.set([kickerRef.current, sublineRef.current, cueRef.current], { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "expo.out" } });

      tl.to(kickerRef.current, { autoAlpha: 1, y: 0, duration: 0.8 })
        .to(
          split.chars,
          { autoAlpha: 1, yPercent: 0, rotateZ: 0, stagger: 0.02, duration: 1.1 },
          "-=0.5",
        )
        .to(sublineRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(cueRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5");

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=60%",
          scrub: 1,
          pin: true,
        },
      });

      exitTl
        .to(cueRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
        .to(
          contentRef.current,
          { scale: 1.12, autoAlpha: 0, y: -40, ease: "none" },
          0.1,
        )
        .to(glowRef.current, { autoAlpha: 0, ease: "none" }, 0);

      return () => split.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <Section
      ref={sectionRef}
      id="hero"
      index={1}
      label="Hero"
      className="flex h-screen items-center justify-center overflow-hidden"
    >
      <div ref={glowRef} className="absolute inset-0">
        <HeroGlow />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-6 text-center invisible"
      >
        <p
          ref={kickerRef}
          className="mb-8 font-mono text-[11px] tracking-[0.35em] text-ink-300 uppercase sm:text-xs"
        >
          {heroCopy.kicker}
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3rem,11vw,9.5rem)] leading-[0.92] font-semibold tracking-tight text-paper"
        >
          {heroCopy.headline}
        </h1>

        <p
          ref={sublineRef}
          className="mt-8 max-w-md text-balance font-sans text-base text-ink-200 sm:text-lg"
        >
          {heroCopy.subline}
        </p>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 invisible"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-300 uppercase">
          {heroCopy.scrollCue}
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ink-600">
          <span className="absolute inset-x-0 top-0 h-1/2 w-full animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>
    </Section>
  );
}
