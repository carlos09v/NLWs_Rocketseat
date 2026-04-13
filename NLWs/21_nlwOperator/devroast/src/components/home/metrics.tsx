"use client";

import NumberFlow from "@number-flow/react";

interface MetricsProps {
  totalRoasted: number;
  avgScore: number;
}

export function Metrics({ totalRoasted, avgScore }: MetricsProps) {
  return (
    <div className="flex justify-center gap-4 py-8 font-mono text-xs text-content-text-tertiary">
      <span>
        <NumberFlow
          value={totalRoasted}
          format={{ thousandsSeparator: true }}
        />
        {" codes roasted"}
      </span>
      <span>·</span>
      <span>
        avg score: <NumberFlow value={avgScore} />
        /10
      </span>
    </div>
  );
}
