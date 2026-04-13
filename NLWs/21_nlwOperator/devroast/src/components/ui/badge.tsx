import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2 font-mono font-normal",
    dot: "size-2 shrink-0 rounded-full",
    label: "text-xs",
  },
  variants: {
    variant: {
      critical: {
        root: "",
        dot: "bg-accent-red",
        label: "text-accent-red",
      },
      warning: {
        root: "",
        dot: "bg-amber-accent",
        label: "text-amber-accent",
      },
      good: {
        root: "",
        dot: "bg-accent-green",
        label: "text-accent-green",
      },
      verdict: {
        root: "",
        dot: "bg-accent-red",
        label: "text-accent-red text-13",
      },
    },
  },
  defaultVariants: {
    variant: "good",
  },
});

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode;
  className?: string;
};

export function Badge({ variant, children, className }: BadgeProps) {
  const { root, dot, label } = badgeVariants({ variant });
  return (
    <span className={root({ className })}>
      <span className={dot()} aria-hidden />
      <span className={label()}>{children}</span>
    </span>
  );
}
