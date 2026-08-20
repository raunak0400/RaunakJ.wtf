"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile, projects, terminalContent } from "@/content/profile";

const COMMAND_LIST = [
  "help",
  "projects",
  "skills",
  "resume",
  "github",
  "contact",
  "experience",
  "education",
  "socials",
  "clear",
  "theme",
];

interface OutputEntry {
  id: number;
  kind: "input" | "output";
  lines: string[];
}

let entryId = 0;

function toggleAccentTheme(): "blue" | "orange" {
  const root = document.documentElement;
  const isOrange = root.dataset.accentTheme === "orange";
  const next = isOrange ? "blue" : "orange";
  root.dataset.accentTheme = next;
  root.style.setProperty("--color-accent", next === "orange" ? "#ff6a39" : "#0a84ff");
  return next;
}

function runCommand(raw: string): { lines: string[]; clear?: boolean } {
  const command = raw.trim().toLowerCase();

  switch (command) {
    case "":
      return { lines: [] };
    case "help":
      return { lines: ["Available commands:", ...COMMAND_LIST.map((c) => `  ${c}`)] };
    case "projects":
      return { lines: projects.map((project) => `${project.name} — ${project.tagline}`) };
    case "skills":
      return { lines: terminalContent.skills };
    case "resume":
      return { lines: ["Resume available on request.", "Run `contact` to get in touch."] };
    case "github":
      if (typeof window !== "undefined") {
        window.open(profile.socials.github, "_blank", "noopener,noreferrer");
      }
      return { lines: [`Opening ${profile.socials.github}`] };
    case "contact":
      if (typeof window !== "undefined") {
        window.location.href = `mailto:${profile.email}`;
      }
      return { lines: [`Opening mail client — ${profile.email}`] };
    case "socials":
      return {
        lines: [
          `GitHub    ${profile.socials.github}`,
          `LinkedIn  ${profile.socials.linkedin}`,
          `Twitter   ${profile.socials.twitter}`,
          `LeetCode  ${profile.socials.leetcode}`,
          `Instagram ${profile.socials.instagram}`,
        ],
      };
    case "experience":
      return { lines: terminalContent.experience };
    case "education":
      return { lines: terminalContent.education };
    case "clear":
      return { lines: [], clear: true };
    case "theme": {
      const next = toggleAccentTheme();
      return { lines: [`Accent theme set to ${next}.`] };
    }
    default:
      return { lines: [`command not found: ${command}`, "Type 'help' for available commands."] };
  }
}

export function Terminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<OutputEntry[]>([
    { id: entryId++, kind: "output", lines: ["Welcome. Type 'help' to see available commands."] },
  ]);
  const [value, setValue] = useState("");
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(0);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      gsap.from(wrapperRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [entries]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const raw = value;
    setValue("");

    if (raw.trim().length > 0) {
      historyRef.current.push(raw);
      historyIndexRef.current = historyRef.current.length;
    }

    const result = runCommand(raw);

    setEntries((prev) => {
      if (result.clear) return [];
      const inputEntry: OutputEntry = { id: entryId++, kind: "input", lines: [raw] };
      if (result.lines.length === 0) return [...prev, inputEntry];
      const outputEntry: OutputEntry = { id: entryId++, kind: "output", lines: result.lines };
      return [...prev, inputEntry, outputEntry];
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndexRef.current > 0) {
        historyIndexRef.current -= 1;
        setValue(historyRef.current[historyIndexRef.current] ?? "");
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndexRef.current < historyRef.current.length) {
        historyIndexRef.current += 1;
        setValue(historyRef.current[historyIndexRef.current] ?? "");
      }
    }
  };

  return (
    <Section
      ref={sectionRef}
      id="terminal"
      index={7}
      label="Operating System"
      className="relative py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel index="07" title="Operating System" />

        <div
          ref={wrapperRef}
          onClick={() => inputRef.current?.focus()}
          className="border-ink-700 bg-ink-950/90 mt-16 overflow-hidden rounded-2xl border"
        >
          <div className="border-ink-700 bg-ink-900 flex items-center gap-2 border-b px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="text-ink-300 ml-3 font-mono text-xs">
              guest@{profile.initials.toLowerCase()}-systems: ~
            </span>
          </div>

          <div
            ref={outputRef}
            className="max-h-[50vh] min-h-[40vh] overflow-y-auto p-5 font-mono text-[13px] leading-6"
          >
            {entries.map((entry) =>
              entry.lines.map((line, i) => (
                <div
                  key={`${entry.id}-${i}`}
                  className={entry.kind === "input" ? "text-paper" : "text-ink-200"}
                >
                  {entry.kind === "input" && i === 0 ? (
                    <span>
                      <span className="text-accent">guest@systems</span>
                      <span className="text-ink-400">:~$ </span>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </div>
              )),
            )}

            <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
              <span className="text-accent">guest@systems</span>
              <span className="text-ink-400">:~$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="text-paper flex-1 bg-transparent outline-none"
                aria-label="Terminal command input"
              />
            </form>
          </div>
        </div>

        <p className="text-ink-400 mt-4 text-center font-mono text-[10px] tracking-[0.2em] uppercase">
          Try: help · projects · skills · theme
        </p>
      </div>
    </Section>
  );
}
