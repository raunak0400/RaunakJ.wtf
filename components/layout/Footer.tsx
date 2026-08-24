"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { LinkPill } from "@/components/ui/LinkPill";
import { profile } from "@/content/profile";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(footerRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="relative border-t border-ink-700 px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-paper">{profile.name}</p>
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-ink-300 uppercase">
              {profile.tagline}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-ink-400 uppercase">
              {profile.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
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

        <div className="flex flex-col gap-4 border-t border-ink-800 pt-6 font-mono text-[11px] tracking-[0.2em] text-ink-400 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <a href="#hero" data-cursor-hover className="transition-colors hover:text-accent">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
