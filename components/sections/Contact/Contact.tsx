"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkPill } from "@/components/ui/LinkPill";
import { profile, connectionSequence } from "@/content/profile";

type Phase = "idle" | "connecting" | "connected";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const packetRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const channelsRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.from(panelRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef },
  );

  // Runs after React has committed the phase change, so the previously
  // display:none panel has real layout by the time we measure the track.
  useGSAP(
    () => {
      if (phase !== "connecting") return;

      const lines = lineRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(lines, { autoAlpha: 0, x: -8 });
      gsap.set(channelsRef.current, { autoAlpha: 0, y: 12 });
      gsap.set(packetRef.current, { x: 0, autoAlpha: 1 });

      const distance = (trackRef.current?.clientWidth ?? 0) - 8;

      const tl = gsap.timeline({ onComplete: () => setPhase("connected") });
      tl.to(lines, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" });
      tl.to(packetRef.current, { x: distance, duration: 1.4, ease: "power1.inOut" }, 0.2);
      tl.to(channelsRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "+=0.15");
    },
    { scope: sectionRef, dependencies: [phase] },
  );

  const handleConnect = () => {
    if (phase !== "idle") return;

    if (reducedMotion) {
      gsap.set(lineRefs.current.filter(Boolean), { autoAlpha: 1, x: 0 });
      gsap.set(channelsRef.current, { autoAlpha: 1, y: 0 });
      setPhase("connected");
      return;
    }

    setPhase("connecting");
  };

  return (
    <Section
      ref={sectionRef}
      id="contact"
      index={8}
      label="Contact"
      className="relative flex min-h-screen items-center justify-center py-32"
    >
      <div className="mx-auto w-full max-w-2xl px-6">
        <SectionLabel index="08" title="Contact" className="justify-center" />

        <div
          ref={panelRef}
          className="border-ink-700 bg-ink-950/80 mt-16 overflow-hidden rounded-2xl border"
        >
          <div className="border-ink-700 bg-ink-900 flex items-center gap-2 border-b px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="text-ink-300 ml-3 font-mono text-xs">secure-channel</span>
          </div>

          <div className="p-8 text-center">
            <h3 className="text-paper font-display text-3xl font-semibold sm:text-4xl">
              Establish Connection
            </h3>
            <p className="text-ink-300 mt-3 text-sm">
              Open a channel to discuss systems, roles, or ideas worth building.
            </p>

            {phase === "idle" && (
              <div className="mt-8 flex justify-center">
                <MagneticButton onClick={handleConnect}>Establish Connection</MagneticButton>
              </div>
            )}

            <div className={phase === "idle" ? "hidden" : "mt-8 text-left"}>
              <div className="text-ink-300 relative mb-6 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
                <span>You</span>
                <span ref={trackRef} className="bg-ink-700 relative mx-4 h-px flex-1">
                  <span
                    ref={packetRef}
                    className="bg-accent shadow-[0_0_8px_var(--color-accent)] absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full opacity-0"
                  />
                </span>
                <span>Server</span>
              </div>

              <div className="space-y-1.5 font-mono text-[13px]">
                {connectionSequence.map((line, i) => (
                  <div
                    key={line}
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="text-ink-200"
                  >
                    <span className="text-good">✓</span> {line}
                  </div>
                ))}
              </div>

              <div ref={channelsRef} className="mt-8 flex flex-wrap justify-center gap-3 opacity-0">
                <LinkPill href={`mailto:${profile.email}`} target="_self">
                  {profile.email}
                </LinkPill>
                <LinkPill href={profile.socials.github}>GitHub</LinkPill>
                <LinkPill href={profile.socials.linkedin}>LinkedIn</LinkPill>
                <LinkPill href={profile.socials.twitter}>Twitter</LinkPill>
                <LinkPill href={profile.socials.leetcode}>LeetCode</LinkPill>
                <LinkPill href={profile.socials.instagram}>Instagram</LinkPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
