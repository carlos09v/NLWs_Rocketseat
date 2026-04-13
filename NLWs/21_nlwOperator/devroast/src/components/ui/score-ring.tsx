import { tv } from "tailwind-variants";

export type ScoreRingProps = {
  value: number;
  max?: number;
  className?: string;
  /** Unique when multiple rings share one document (SVG gradient id). */
  gradientId?: string;
};

const R = 88;
const C = 2 * Math.PI * R;

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

const scoreRingVariants = tv({
  base: "relative inline-flex size-45 items-center justify-center",
});

export function ScoreRing({
  value,
  max = 10,
  className,
  gradientId = "score-ring-gradient",
}: ScoreRingProps) {
  const pct = Math.min(1, Math.max(0, value / max));
  const dash = pct * C;

  const label = `Score ${formatScore(value)} out of ${max}`;

  return (
    <div
      role="img"
      aria-label={label}
      className={scoreRingVariants({ className })}
    >
      <svg
        className="absolute inset-0 size-full -rotate-90"
        viewBox="0 0 180 180"
        aria-hidden
      >
        <title>{label}</title>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-score-ring-from)" />
            <stop offset="100%" stopColor="var(--color-score-ring-to)" />
          </linearGradient>
        </defs>
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="var(--color-score-ring-track)"
          strokeWidth="4"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`}
        />
      </svg>
      <div className="relative z-10 flex items-baseline gap-0.5">
        <span className="font-mono text-5xl font-bold leading-none tracking-tight text-content-text-primary">
          {formatScore(value)}
        </span>
        <span className="font-mono text-base font-normal text-content-text-tertiary">
          /{max}
        </span>
      </div>
    </div>
  );
}
