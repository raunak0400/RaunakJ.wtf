"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/content/profile";

interface ActiveSection {
  index: number;
  total: number;
  label: string;
}

export function Chrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveSection>({ index: 1, total: 1, label: "" });

  useEffect(() => {
    const setScale = gsap.quickSetter(barRef.current, "scaleX") as (value: number) => void;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScale(self.progress),
    });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-label]"),
    );
    const total = sections.length;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.sectionIndex ?? 0);
          const label = el.dataset.sectionLabel ?? "";
          setActive({ index, total, label });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      trigger.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-[80] h-px bg-ink-700">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="pointer-events-none fixed top-6 left-6 z-[80] font-mono text-[11px] tracking-[0.25em] text-ink-300 uppercase">
        {profile.initials} — Systems
      </div>

      <div className="pointer-events-none fixed top-6 right-6 z-[80] hidden font-mono text-[11px] tracking-[0.25em] text-ink-300 uppercase sm:block">
        {profile.location}
      </div>

      <div className="pointer-events-none fixed bottom-6 left-6 z-[80] font-mono text-[11px] tracking-[0.25em] text-ink-300 uppercase">
        {String(active.index).padStart(2, "0")} / {String(active.total).padStart(2, "0")}
        <span className="ml-3 text-paper-dim">{active.label}</span>
      </div>

      <div className="pointer-events-none fixed right-6 bottom-6 z-[80] flex items-center gap-4">
        {profile.openToOpportunities && (
          <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-ink-300 uppercase sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="bg-good absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-good relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Open to Opportunities
          </span>
        )}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="border-ink-500 text-paper hover:border-accent hover:text-accent pointer-events-auto rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
        >
          Resume
        </a>
      </div>
    </>
  );
}
