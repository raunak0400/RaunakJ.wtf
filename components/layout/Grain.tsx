export function Grain() {
  return (
    <div
      aria-hidden
      className="grain-layer pointer-events-none fixed -inset-[200%] z-[95] opacity-[0.05] mix-blend-soft-light"
    >
      <svg className="h-full w-full">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
