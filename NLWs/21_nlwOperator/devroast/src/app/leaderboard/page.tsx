import { Navbar } from "@/components/layout/navbar";
import { LeaderboardEntry } from "@/components/ui/leaderboard";

const STATIC_ENTRIES = [
  {
    rank: "1",
    score: "9.8",
    lang: "javascript",
    lines: 3,
    code: `eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol`,
  },
  {
    rank: "2",
    score: "8.4",
    lang: "typescript",
    lines: 12,
    code: `function check(x: any) {\n  if (x == true) return true;\n  if (x == false) return false;\n  return !false;\n}`,
  },
  {
    rank: "3",
    score: "7.2",
    lang: "sql",
    lines: 2,
    code: `SELECT * FROM users WHERE 1=1\n-- TODO: add authentication`,
  },
  {
    rank: "4",
    score: "6.5",
    lang: "python",
    lines: 5,
    code: `def calculate():\n    res = 0\n    for i in range(10):\n        res += i\n    return res`,
  },
  {
    rank: "5",
    score: "5.9",
    lang: "rust",
    lines: 8,
    code: `fn main() {\n    let mut v = Vec::new();\n    v.push(1);\n    println!("{:?}", v);\n}`,
  },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-12">
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-4xl font-bold text-accent-green">
              {">"}
            </span>
            <h1 className="font-mono text-4xl font-bold tracking-tight">
              shame_leaderboard
            </h1>
          </div>
          <p className="font-mono text-sm text-content-text-secondary max-w-md">
            {`// the most roasted code on the internet, ranked by shame`}
          </p>

          <div className="flex items-center gap-4 font-mono text-xs text-content-text-tertiary">
            <span>2,847 submissions</span>
            <span>·</span>
            <span>avg score: 4.2/10</span>
          </div>
        </header>

        <div className="flex flex-col gap-6">
          {STATIC_ENTRIES.map((entry) => (
            <LeaderboardEntry key={entry.rank} {...entry} />
          ))}
        </div>
      </div>
    </main>
  );
}
