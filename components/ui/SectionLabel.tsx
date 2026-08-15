import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  title: string;
  className?: string;
}

export function SectionLabel({ index, title, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-ink-300 uppercase",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-ink-500" />
      <span>{title}</span>
    </div>
  );
}
