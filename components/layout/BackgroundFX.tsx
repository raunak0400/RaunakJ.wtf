export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="bg-fx-blob-a absolute h-[70vmax] w-[70vmax] rounded-full"
        style={{
          left: "-15%",
          top: "-20%",
          background: "radial-gradient(circle, rgba(10,132,255,0.10), transparent 60%)",
        }}
      />
      <div
        className="bg-fx-blob-b absolute h-[60vmax] w-[60vmax] rounded-full"
        style={{
          right: "-18%",
          bottom: "-15%",
          background: "radial-gradient(circle, rgba(90,166,255,0.07), transparent 60%)",
        }}
      />
      <div
        className="absolute h-[45vmax] w-[45vmax] rounded-full"
        style={{
          left: "30%",
          bottom: "-12%",
          background: "radial-gradient(circle, rgba(255,106,57,0.05), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink-500) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink-500) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
