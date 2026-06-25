export function GothicBackground() {
  const runes = [
    { x: "12%", y: "30%", r: 0, d: 8 },
    { x: "88%", y: "45%", r: 45, d: 6 },
    { x: "5%", y: "70%", r: 20, d: 10 },
    { x: "92%", y: "78%", r: 60, d: 7 },
  ]

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* corner crystals */}
      <svg
        className="absolute left-0 top-0 h-48 w-48 text-primary opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <polygon
          points="20,180 100,10 180,180"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <line
          x1="100"
          y1="10"
          x2="100"
          y2="180"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3,5"
        />
      </svg>
      <svg
        className="absolute right-0 top-0 h-48 w-48 -scale-x-100 text-brand-rose opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <polygon
          points="20,180 100,10 180,180"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      {/* floating runes */}
      {runes.map((p, i) => (
        <div
          key={i}
          className="sparkle absolute text-primary"
          style={{
            left: p.x,
            top: p.y,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + p.d * 0.3}s`,
          }}
        >
          <svg
            width={p.d * 3}
            height={p.d * 3}
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${p.r}deg)` }}
          >
            <path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              fill="currentColor"
              fillOpacity="0.45"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      {/* chain lines */}
      <div className="absolute left-[20%] top-0 h-full w-px -skew-x-6 bg-gradient-to-b from-primary/20 to-transparent" />
      <div className="absolute right-[25%] top-0 h-full w-px skew-x-6 bg-gradient-to-b from-brand-rose/15 to-transparent" />
    </div>
  )
}
