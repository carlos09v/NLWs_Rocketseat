import { CodeEditor, Leaderboard } from "@/components/ui";
import { MetricsContainer } from "@/components/home/metrics-container";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-195 space-y-16 px-6 py-12">
      <header className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="font-mono text-3xl font-bold text-accent-green">
            $
          </span>
          <h1 className="font-mono text-3xl font-bold text-foreground">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-mono text-sm text-content-text-secondary">
          drop your code below and we'll rate it — brutally honest or full roast
          mode
        </p>
      </header>

      <section className="space-y-4">
        <CodeEditor />

        <MetricsContainer />
      </section>

      <Leaderboard />
    </main>
  );
}
