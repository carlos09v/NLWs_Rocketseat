import { Navbar } from "@/components/layout/navbar";
import {
  AnalysisCardBadge,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
  Badge,
  Button,
  CodeBlock,
  DiffBlockCode,
  DiffBlockPrefix,
  DiffBlockRoot,
  DiffBlockRow,
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowRoot,
  LeaderboardRowScore,
  ScoreRing,
  Switch,
} from "@/components/ui";

const sampleTs = `export function greet(name: string): string {
  return \`Hello, \${name}\`;
}`;

const sampleCss = `.panel {
  padding: 1rem;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
}`;

const variantOptions = [
  "primary",
  "secondary",
  "link",
  "outline",
  "ghost",
  "destructive",
] as const;

const sizeOptions = ["sm", "default", "lg"] as const;

const variantsWithSizes = ["primary", "ghost", "destructive"] as const;

const variantsPencilFixed = ["secondary", "outline", "link"] as const;

const diffContext = "for (let i = 0; i < items.length; i++) {";
const leaderboardPreview =
  "function calculateTotal(items) { var total = 0; ...";

export default function UiShowcasePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-2">
          <h1 className="font-mono text-2xl font-semibold tracking-tight">
            UI components
          </h1>
          <p className="text-sm text-muted-foreground">
            Referência visual de variantes e tamanhos. Novos componentes entram
            aqui conforme o guia em{" "}
            <code className="rounded-md bg-card px-1.5 py-0.5 text-xs text-accent-green">
              src/components/ui/AGENTS.md
            </code>
            .
          </p>
        </header>

        <section className="space-y-6" aria-labelledby="button-heading">
          <h2
            id="button-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            buttons
          </h2>

          <div className="space-y-3">
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              buttonsSection (Pencil)
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="button" variant="primary" size="default">
                roast_my_code
              </Button>
              <Button type="button" variant="secondary">
                share_roast
              </Button>
              <Button type="button" variant="link">
                view_all &gt;&gt;
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Tamanhos (sm / default / lg): primary, ghost, destructive. Variantes
            secondary, outline e link usam padding do .pen (fixo).
          </p>

          <div className="space-y-10">
            {variantsWithSizes.map((variant) => (
              <div key={variant} className="space-y-3">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {variant}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size}
                      variant={variant}
                      size={size}
                      type="button"
                      showPrefix={false}
                    >
                      {variant} / {size}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {variantsPencilFixed.map((variant) => (
              <div key={variant} className="space-y-3">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {variant}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant={variant} type="button" showPrefix={false}>
                    {variant} (Pencil spacing)
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-border pt-8">
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Disabled
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              {variantOptions.map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  type="button"
                  disabled
                  showPrefix={false}
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              className override (via tv merge)
            </h3>
            <Button
              type="button"
              className="ring-2 ring-border-focus/50 ring-offset-2 ring-offset-background"
              showPrefix={false}
            >
              primary + ring extra
            </Button>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="switch-heading">
          <h2
            id="switch-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            toggle
          </h2>
          <p className="text-sm text-muted-foreground">
            Base UI <code className="text-accent-green">Switch</code> com
            variantes de tamanho. Use sempre nome acessível (label + id ou label
            a envolver).
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-8">
              <label
                htmlFor="ui-switch-default"
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <Switch id="ui-switch-default" defaultChecked size="default" />
                roast mode
              </label>
              <label
                htmlFor="ui-switch-sm"
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <Switch id="ui-switch-sm" size="sm" />
                roast mode
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <Switch disabled defaultChecked size="default" />
                Disabled on
              </span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <Switch disabled size="default" />
                Disabled off
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="codeblock-heading">
          <h2
            id="codeblock-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            CodeBlock
          </h2>
          <p className="text-sm text-muted-foreground">
            Shiki, tema <strong className="text-foreground">vesper</strong>,
            apenas server component (HTML estático).
          </p>
          <div className="space-y-6">
            <CodeBlock code={sampleTs} lang="tsx" />
            <CodeBlock code={sampleCss} lang="css" />
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="badge-heading">
          <h2
            id="badge-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            badge_status
          </h2>
          <div className="flex flex-wrap gap-6">
            <Badge variant="critical">critical</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="good">good</Badge>
            <Badge variant="verdict">needs_serious_help</Badge>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="card-heading">
          <h2
            id="card-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            cards
          </h2>
          <AnalysisCardRoot>
            <AnalysisCardBadge status="critical" />
            <AnalysisCardTitle>
              using var instead of const/let
            </AnalysisCardTitle>
            <AnalysisCardDescription>
              the var keyword is function-scoped rather than block-scoped, which
              can lead to unexpected behavior and bugs. modern javascript uses
              const for immutable bindings and let for mutable ones.
            </AnalysisCardDescription>
          </AnalysisCardRoot>
        </section>

        <section className="space-y-6" aria-labelledby="diff-heading">
          <h2
            id="diff-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            diff_line
          </h2>
          <DiffBlockRoot>
            <DiffBlockRow kind="removed">
              <DiffBlockPrefix kind="removed">-</DiffBlockPrefix>
              <DiffBlockCode kind="removed">var total = 0;</DiffBlockCode>
            </DiffBlockRow>
            <DiffBlockRow kind="added">
              <DiffBlockPrefix kind="added">+</DiffBlockPrefix>
              <DiffBlockCode kind="added">const total = 0;</DiffBlockCode>
            </DiffBlockRow>
            <DiffBlockRow kind="context">
              <DiffBlockPrefix kind="context"> </DiffBlockPrefix>
              <DiffBlockCode kind="context">{diffContext}</DiffBlockCode>
            </DiffBlockRow>
          </DiffBlockRoot>
        </section>

        <section className="space-y-6" aria-labelledby="row-heading">
          <h2
            id="row-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            table_row
          </h2>
          <div className="overflow-hidden rounded-md border border-border-strong">
            <LeaderboardRowRoot>
              <LeaderboardRowRank>#1</LeaderboardRowRank>
              <LeaderboardRowScore>2.1</LeaderboardRowScore>
              <LeaderboardRowCode>{leaderboardPreview}</LeaderboardRowCode>
              <LeaderboardRowLang>javascript</LeaderboardRowLang>
            </LeaderboardRowRoot>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="score-heading">
          <h2
            id="score-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            ScoreRing
          </h2>
          <ScoreRing value={3.5} gradientId="ui-showcase-score-ring" />
        </section>

        <section className="space-y-6" aria-labelledby="navbar-heading">
          <h2
            id="navbar-heading"
            className="font-mono text-lg font-medium text-foreground"
          >
            <span className="text-accent-green">{"// "}</span>
            navbar
          </h2>
          <div className="border border-border-strong rounded-md p-4 bg-background">
            <Navbar />
          </div>
        </section>
      </div>
    </main>
  );
}
