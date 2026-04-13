import { tv } from "tailwind-variants";
import {
  AnalysisCardBadge,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
  Button,
  CodeBlock,
  DiffBlockCode,
  DiffBlockPrefix,
  DiffBlockRoot,
  DiffBlockRow,
  ScoreRing,
} from "@/components/ui";

const pageVariants = tv({
  slots: {
    main: "mx-auto w-full max-w-320 space-y-10 px-6 py-10",
    scoreHero: "flex flex-row items-center justify-center gap-12",
    shareRow: "mt-4 flex justify-center",
    divider: "h-px w-full bg-border-primary",
    codeSection: "space-y-4",
    codeTitle: "flex items-center gap-2 font-mono text-sm font-bold",
  },
});

export default function RoastPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { main, scoreHero, shareRow, divider, codeSection, codeTitle } =
    pageVariants();

  // Static data as requested
  const roastData = {
    score: 3.5,
    verdict: "critical", // Mapped to AnalysisCardBadge status
    verdictText: "needs_serious_help",
    title:
      '"this code looks like it was written during a power outage... in 2005."',
    lang: "javascript",
    lines: 7,
    code: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }
  return total;
}`,
    analysis: [
      {
        id: "sec-1",
        title: "using var instead of const/let",
        description:
          "The use of 'var' is outdated. Switch to 'let' or 'const' to avoid hoisting issues and ensure block-scoping.",
        status: "critical",
      },
      {
        id: "time-1",
        title: "O(n) complexity in simple loop",
        description:
          "The current implementation uses a simple for-loop, which is O(n). While acceptable for small lists, consider using a reduce function for better readability.",
        status: "warning",
      },
      {
        id: "cor-1",
        title: "correct logic implementation",
        description:
          "The logic correctly handles the discount application and returns the expected total.",
        status: "good",
      },
      {
        id: "name-1",
        title: "clear naming conventions",
        description:
          "Variable names like 'total' and 'items' are clear and follow standard conventions.",
        status: "good",
      },
    ],
    suggestedFix: [
      {
        id: "fix-1",
        kind: "context",
        content: "function calculateTotal(items) {",
      },
      { id: "fix-2", kind: "removed", content: "  var total = 0;" },
      { id: "fix-3", kind: "added", content: "  let total = 0;" },
      {
        id: "fix-4",
        kind: "removed",
        content: "  for (var i = 0; i < items.length; i++) {",
      },
      {
        id: "fix-5",
        kind: "added",
        content: "  for (let i = 0; i < items.length; i++) {",
      },
      {
        id: "fix-6",
        kind: "context",
        content: "    total = total + items[i].price;",
      },
      { id: "fix-7", kind: "context", content: "  }" },
      { id: "fix-8", kind: "context", content: "  if (total > 100) {" },
      {
        id: "fix-9",
        kind: "context",
        content: '    console.log("discount applied");',
      },
      { id: "fix-10", kind: "context", content: "    total = total * 0.9;" },
      { id: "fix-11", kind: "context", content: "  }" },
      { id: "fix-12", kind: "context", content: "  return total;" },
      { id: "fix-13", kind: "context", content: "}" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={main()}>
        <section className={scoreHero()}>
          <ScoreRing value={roastData.score} />

          <div className="flex flex-col gap-4">
            <AnalysisCardRoot>
              <AnalysisCardBadge status={roastData.verdict as any}>
                {roastData.verdictText}
              </AnalysisCardBadge>
              <AnalysisCardTitle>{roastData.title}</AnalysisCardTitle>
              <AnalysisCardDescription>
                lang: {roastData.lang} · {roastData.lines} lines
              </AnalysisCardDescription>
            </AnalysisCardRoot>

            <div className={shareRow()}>
              <Button variant="outline" size="sm">
                $ share_roast
              </Button>
            </div>
          </div>
        </section>

        <section className={codeSection()}>
          <div className={codeTitle()}>
            <span className="text-accent-green">{"//"}</span>
            <span className="text-foreground">your_submission</span>
          </div>
          <CodeBlock
            code={roastData.code}
            lang={roastData.lang as any}
            filename={`${roastData.lang}.js`}
          />
        </section>

        <section className="space-y-6">
          <div className={codeTitle()}>
            <span className="text-accent-green">{"//"}</span>
            <span className="text-foreground">detailed_analysis</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roastData.analysis.map((item) => (
              <AnalysisCardRoot key={item.id}>
                <AnalysisCardBadge status={item.status as any} />
                <AnalysisCardTitle>{item.title}</AnalysisCardTitle>
                <AnalysisCardDescription>
                  {item.description}
                </AnalysisCardDescription>
              </AnalysisCardRoot>
            ))}
          </div>
        </section>

        <div className={divider()} />

        <section className="space-y-4">
          <div className={codeTitle()}>
            <span className="text-accent-green">{"//"}</span>
            <span className="text-foreground">suggested_fix</span>
          </div>
          <DiffBlockRoot filename="your_code.js → improved_code.js">
            {roastData.suggestedFix.map((row) => (
              <DiffBlockRow key={row.id} kind={row.kind as any}>
                <DiffBlockPrefix kind={row.kind as any} />
                <DiffBlockCode kind={row.kind as any}>
                  {row.content}
                </DiffBlockCode>
              </DiffBlockRow>
            ))}
          </DiffBlockRoot>
        </section>
      </main>
    </div>
  );
}
