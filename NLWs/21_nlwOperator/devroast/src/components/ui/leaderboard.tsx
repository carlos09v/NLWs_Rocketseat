import Link from "next/link";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { CodeBlock } from "./code-block";

const leaderboardVariants = tv({
  slots: {
    container: "overflow-hidden rounded-md border border-border-strong",
    header:
      "flex w-full items-center gap-6 border-b border-border-strong bg-layer-surface-alt px-5 py-3 font-mono text-13 font-bold text-content-text-tertiary",
    row: "flex w-full max-w-full items-center gap-6 border-b border-border-strong px-5 py-4",
    rank: "w-10 shrink-0 font-mono text-13 font-normal text-content-text-secondary",
    score: "w-15 shrink-0 font-mono text-13 font-bold text-accent-red",
    code: "min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-xs font-normal text-foreground",
    lang: "w-25 shrink-0 text-right font-mono text-xs font-normal text-content-text-secondary",
  },
});

export function LeaderboardRowRoot({
  className,
  ...props
}: ComponentProps<"div">) {
  const { row } = leaderboardVariants();
  return <div className={row({ className })} {...props} />;
}

export function LeaderboardRowRank({
  className,
  ...props
}: ComponentProps<"div">) {
  const { rank } = leaderboardVariants();
  return <div className={rank({ className })} {...props} />;
}

export function LeaderboardRowScore({
  className,
  ...props
}: ComponentProps<"div">) {
  const { score } = leaderboardVariants();
  return <div className={score({ className })} {...props} />;
}

export function LeaderboardRowCode({
  className,
  ...props
}: ComponentProps<"div">) {
  const { code } = leaderboardVariants();
  return <div className={code({ className })} {...props} />;
}

export function LeaderboardRowLang({
  className,
  ...props
}: ComponentProps<"div">) {
  const { lang } = leaderboardVariants();
  return <div className={lang({ className })} {...props} />;
}

const entryVariants = tv({
  slots: {
    root: "flex w-full flex-col rounded-md border border-border-strong bg-background overflow-hidden",
    meta: "flex w-full items-center justify-between px-5 py-3 border-b border-border-strong font-mono text-13",
    metaLeft: "flex items-center gap-4",
    metaRight: "flex items-center gap-3 text-content-text-tertiary",
    codeWrapper: "p-4",
  },
});

export function LeaderboardEntry({
  rank,
  score,
  lang,
  lines,
  code,
  className,
}: {
  rank: string;
  score: string;
  lang: string;
  lines: number;
  code: string;
  className?: string;
}) {
  const { root, meta, metaLeft, metaRight, codeWrapper } = entryVariants();

  return (
    <div className={root({ className })}>
      <div className={meta()}>
        <div className={metaLeft()}>
          <span className="font-bold text-content-text-tertiary">
            #
            <span
              className={
                rank === "1" ? "text-amber-accent" : "text-content-text-primary"
              }
            >
              {rank}
            </span>
          </span>
          <span className="ml-2 font-bold">
            <span className="text-content-text-tertiary">score: </span>
            <span className="text-accent-red">{score}</span>
          </span>
        </div>
        <div className={metaRight()}>
          <span>{lang}</span>
          <span>{lines} lines</span>
        </div>
      </div>
      <div className={codeWrapper()}>
        <CodeBlock code={code} lang={lang} />
      </div>
    </div>
  );
}

export function Leaderboard() {
  const { container, header } = leaderboardVariants();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-accent-green">
            {"//"}
          </span>
          <h2 className="font-mono text-lg font-bold text-foreground">
            shame_leaderboard
          </h2>
        </div>
        <Link
          href="/leaderboard"
          className="font-mono text-xs text-content-text-tertiary hover:text-foreground transition-colors border border-border-strong px-3 py-1 rounded-sm"
        >
          $ view_all &gt;&gt;
        </Link>
      </div>
      <p className="font-sans text-13 text-content-text-tertiary">
        {"// the worst code on the internet, ranked by shame"}
      </p>
      <div className={container()}>
        <div className={header()}>
          <div className="w-10 shrink-0">#</div>
          <div className="w-15 shrink-0">score</div>
          <div className="min-w-0 flex-1">code</div>
          <div className="w-25 shrink-0 text-right">lang</div>
        </div>
        <LeaderboardRowRoot>
          <LeaderboardRowRank>
            <span className="text-amber-accent">1</span>
          </LeaderboardRowRank>
          <LeaderboardRowScore>
            <span className="text-accent-red font-bold">9.8</span>
          </LeaderboardRowScore>
          <LeaderboardRowCode>
            {
              'eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol'
            }
          </LeaderboardRowCode>
          <LeaderboardRowLang>javascript</LeaderboardRowLang>
        </LeaderboardRowRoot>
        <LeaderboardRowRoot>
          <LeaderboardRowRank>
            <span className="text-content-text-primary">2</span>
          </LeaderboardRowRank>
          <LeaderboardRowScore>
            <span className="text-accent-red font-bold">1.8</span>
          </LeaderboardRowScore>
          <LeaderboardRowCode>
            {
              "if (x == true) { return true; }\nelse if (x == false) { return false; }\nelse { return !false; }"
            }
          </LeaderboardRowCode>
          <LeaderboardRowLang>typescript</LeaderboardRowLang>
        </LeaderboardRowRoot>
        <LeaderboardRowRoot>
          <LeaderboardRowRank>
            <span className="text-content-text-primary">3</span>
          </LeaderboardRowRank>
          <LeaderboardRowScore>
            <span className="text-accent-red font-bold">2.1</span>
          </LeaderboardRowScore>
          <LeaderboardRowCode>
            {"SELECT * FROM users WHERE 1=1\n-- TODO: add authentication"}
          </LeaderboardRowCode>
          <LeaderboardRowLang>sql</LeaderboardRowLang>
        </LeaderboardRowRoot>
        <div className="px-5 py-3 text-center">
          <p className="font-sans text-12 text-content-text-tertiary">
            showing top 3 of 2,847 · view full leaderboard &gt;&gt;
          </p>
        </div>
      </div>
    </section>
  );
}
