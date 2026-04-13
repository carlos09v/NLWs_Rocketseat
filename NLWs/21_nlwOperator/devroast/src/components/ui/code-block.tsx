import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";

/** Server-only: do not add `"use client"`. Do not import from Client Components without splitting the tree. */

const codeBlockVariants = tv({
  slots: {
    root: "not-prose w-full overflow-hidden rounded-md border border-border-strong bg-layer-bg-input font-mono text-13 font-normal leading-normal",
    header: "flex h-10 items-center gap-3 border-b border-border-strong px-4",
    dot: "size-2.5 shrink-0 rounded-full",
    filename: "truncate text-xs text-content-text-tertiary",
    inner: "flex min-h-0",
    gutter:
      "flex w-10 shrink-0 flex-col gap-1.5 border-r border-border-strong bg-layer-surface-alt py-3 pr-2.5 pl-2.5 text-right text-13 text-content-text-tertiary select-none",
    content:
      "min-w-0 flex-1 overflow-x-auto p-3 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:font-mono",
  },
});

export type CodeBlockProps = {
  code: string;
  lang: BundledLanguage;
  filename?: string;
  className?: string;
} & VariantProps<typeof codeBlockVariants>;

export async function CodeBlock({
  code,
  lang,
  filename,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trimEnd(), {
    lang,
    theme: "vesper",
  });

  const {
    root,
    header,
    dot,
    filename: filenameSlot,
    inner,
    gutter,
    content,
  } = codeBlockVariants();

  const lines = code.trimEnd().split("\n");

  return (
    <figure className={root({ className })}>
      <header className={header()}>
        <div className="flex items-center gap-2">
          <span className={dot({ class: "bg-accent-red" })} aria-hidden />
          <span className={dot({ class: "bg-accent-amber" })} aria-hidden />
          <span className={dot({ class: "bg-accent-green" })} aria-hidden />
        </div>
        <div className="min-w-0 flex-1" aria-hidden />
        {filename && <span className={filenameSlot()}>{filename}</span>}
      </header>
      <div className={inner()}>
        <div className={gutter()} aria-hidden>
          {lines.map((line, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className={content()} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </figure>
  );
}
