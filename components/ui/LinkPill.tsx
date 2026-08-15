import { cn } from "@/lib/utils";

type LinkPillProps = React.ComponentPropsWithoutRef<"a">;

export function LinkPill({ className, children, ...props }: LinkPillProps) {
  return (
    <a
      data-cursor-hover
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "border-ink-500 text-paper hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
