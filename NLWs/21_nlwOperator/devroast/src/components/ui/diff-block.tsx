import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const rowVariants = tv({
  base: "flex gap-2 px-4 py-2 font-mono text-13 font-normal",
  variants: {
    kind: {
      removed: "bg-diff-removed-bg",
      added: "bg-diff-added-bg",
      context: "bg-transparent",
    },
  },
});

const prefixVariants = tv({
  base: "w-3 shrink-0 select-none text-center font-mono text-13",
  variants: {
    kind: {
      removed: "text-diff-prefix-removed",
      added: "text-diff-prefix-added",
      context: "text-diff-prefix-context",
    },
  },
});

const codeVariants = tv({
  base: "min-w-0 flex-1 font-mono text-13",
  variants: {
    kind: {
      removed: "text-diff-removed-code",
      added: "text-diff-added-code",
      context: "text-diff-context-code",
    },
  },
});

const diffBlockVariants = tv({
  slots: {
    root: "w-full overflow-hidden rounded-md border border-border-strong bg-layer-bg-input",
    header:
      "flex h-10 items-center px-4 border-b border-border-strong bg-background/50",
    headerText: "font-mono text-12 font-medium text-content-text-secondary",
    body: "flex flex-col py-1",
  },
});

export function DiffBlockRoot({
  className,
  children,
  filename = "your_code.ts → improved_code.ts",
  ...props
}: ComponentProps<"div"> & { filename?: string }) {
  const { root, header, headerText, body } = diffBlockVariants();
  return (
    <div className={root({ className })} {...props}>
      <div className={header()}>
        <span className={headerText()}>{filename}</span>
      </div>
      <div className={body()}>{children}</div>
    </div>
  );
}

export function DiffBlockRow({
  kind,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  kind: NonNullable<VariantProps<typeof rowVariants>["kind"]>;
}) {
  return (
    <div className={rowVariants({ kind, className })} {...props}>
      {children}
    </div>
  );
}

export function DiffBlockPrefix({
  kind,
  className,
  ...props
}: ComponentProps<"span"> & {
  kind: NonNullable<VariantProps<typeof rowVariants>["kind"]>;
}) {
  return <span className={prefixVariants({ kind, className })} {...props} />;
}

export function DiffBlockCode({
  kind,
  className,
  ...props
}: ComponentProps<"span"> & {
  kind: NonNullable<VariantProps<typeof rowVariants>["kind"]>;
}) {
  return <span className={codeVariants({ kind, className })} {...props} />;
}
