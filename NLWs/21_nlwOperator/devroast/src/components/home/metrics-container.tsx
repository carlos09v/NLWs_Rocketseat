"use client";

import { trpc } from "@/utils/trpc-client";
import { Metrics } from "./metrics";

export function MetricsContainer() {
  const { data: metrics } = trpc.roast.getMetrics.useQuery();

  return (
    <Metrics
      totalRoasted={metrics?.totalRoasted ?? 0}
      avgScore={metrics?.avgScore ?? 0}
    />
  );
}
