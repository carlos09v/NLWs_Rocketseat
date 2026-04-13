export function MetricsSkeleton() {
  return (
    <div className="flex justify-center gap-4 py-8 font-mono text-xs text-content-text-tertiary">
      <div className="h-4 w-32 animate-pulse rounded bg-content-text-tertiary/20" />
      <div className="h-4 w-1 animate-pulse rounded bg-content-text-tertiary/20" />
      <div className="h-4 w-24 animate-pulse rounded bg-content-text-tertiary/20" />
    </div>
  );
}
