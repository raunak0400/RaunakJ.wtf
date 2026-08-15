"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";

export function CustomCursor() {
  const enabled = usePointerFine();
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest("[data-cursor-hover]")));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div
        className="bg-paper absolute top-0 left-0 rounded-full"
        style={{ x: springX, y: springY }}
        animate={{
          width: hovering ? 56 : 8,
          height: hovering ? 56 : 8,
          marginLeft: hovering ? -28 : -4,
          marginTop: hovering ? -28 : -4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.4 }}
      />
    </div>
  );
}
