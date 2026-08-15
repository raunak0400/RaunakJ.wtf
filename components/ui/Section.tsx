import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, index, label, className, children },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      data-section-index={index}
      data-section-label={label}
      className={cn("relative w-full", className)}
    >
      {children}
    </section>
  );
});
