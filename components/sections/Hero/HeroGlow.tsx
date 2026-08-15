"use client";

import { useEffect, useRef } from "react";

export function HeroGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const hasPointer = window.matchMedia("(pointer: fine)").matches;

    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = targetX;
    let currentY = targetY;
    let time = 0;

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    if (hasPointer) {
      window.addEventListener("pointermove", handleMove);
    }

    let raf = 0;

    const draw = () => {
      time += 1;

      if (!hasPointer) {
        targetX = width / 2 + Math.sin(time * 0.004) * width * 0.18;
        targetY = height / 2 + Math.cos(time * 0.003) * height * 0.14;
      }

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const radius = Math.max(width, height) * 0.55;
      const gradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        radius,
      );
      gradient.addColorStop(0, "rgba(10, 132, 255, 0.16)");
      gradient.addColorStop(0.25, "rgba(10, 132, 255, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (hasPointer) window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
