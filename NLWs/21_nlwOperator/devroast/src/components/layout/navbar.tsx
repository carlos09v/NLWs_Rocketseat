import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border-strong bg-background px-10">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-mono text-xl font-bold text-accent-green">
          {">"}
        </span>
        <span className="font-mono text-lg font-medium text-foreground">
          devroast
        </span>
      </Link>
      <Link
        href="/leaderboard"
        className="font-mono text-sm text-content-text-secondary hover:text-foreground"
      >
        leaderboard
      </Link>
    </nav>
  );
}
