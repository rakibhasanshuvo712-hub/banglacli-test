import { FlowerMark } from "@/components/flower-mark";

/** Hand-drawn leaf branch used as a quiet background accent. */
export function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 210"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
    >
      <path
        d="M62 208C57 162 68 116 86 72c11-27 12-49 2-66"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M68 173c-22-2-38-15-45-35 22 1 38 13 45 35Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M70 145c-24-5-41-20-47-41 23 4 40 19 47 41Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M74 115c-23-8-37-24-41-45 22 9 36 24 41 45Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M80 86c-20-11-31-27-32-47 19 13 29 28 32 47Z" fill="currentColor" fillOpacity="0.11" />
      <path d="M87 57c-16-13-23-29-20-48 15 15 21 31 20 48Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M68 132c14-18 31-27 51-27-9 19-25 29-51 27Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M78 94c12-16 27-23 44-21-8 17-22 25-44 21Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M60 190c-12-14-18-30-17-48 12 13 18 29 17 48Z" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

/** Minimal botanical line drawing, like a pressed flower on stationery. */
export function BloomSketch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M60 44c-8-19-4-34 8-42 9 11 10 26 2 42" />
      <path d="M76 46c4-20 16-30 31-29-1 16-11 27-29 32" />
      <path d="M80 64c19-9 34-5 41 9-13 10-28 9-43-3" />
      <path d="M72 80c13 16 14 31 4 42-13-8-18-22-12-40" />
      <path d="M50 80c-3 20-13 31-29 31 1-16 10-28 27-34" />
      <path d="M40 64c-19 8-34 3-40-11 14-9 29-8 43 5" />
      <path d="M44 46c-5-19-17-29-32-27 2 16 12 26 30 30" />
      <circle cx="60" cy="62" r="11" />
      <circle cx="60" cy="62" r="4" fill="currentColor" fillOpacity="0.28" stroke="none" />
      <path d="M60 73v38" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

/** A delicate centre ornament for section headings. */
export function FlourishDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose/45" />
      <span className="h-1 w-1 rotate-45 bg-gold/70" />
      <FlowerMark className="h-4 w-4 text-rose/75" />
      <span className="h-1 w-1 rotate-45 bg-gold/70" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose/45" />
    </div>
  );
}

/** Rotating circular stamp for hero and editorial moments. */
export function RoundSeal({
  id,
  text = "HAND TIED · FRESH DAILY · MADE WITH LOVE · ",
  className = "",
}: {
  id: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full text-gold">
        <defs>
          <path
            id={id}
            d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <circle
          cx="60"
          cy="60"
          r="33"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="1 5"
        />
        <g className="spin-slow">
          <text
            fill="currentColor"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="2.3"
          >
            <textPath href={`#${id}`}>{text}</textPath>
          </text>
        </g>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <FlowerMark className="h-7 w-7 text-rose" />
      </span>
    </div>
  );
}
