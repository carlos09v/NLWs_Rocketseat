import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Badge } from "./badge";

const analysisCardVariants = tv({
  base: "flex w-full max-w-120 flex-col gap-3 rounded-md border border-border-strong p-5",
});

const titleVariants = tv({
  base: "font-mono text-13 font-normal text-content-text-primary",
});

const descriptionVariants = tv({
  base: "font-sans text-xs leading-relaxed text-content-text-secondary",
});

export function AnalysisCardRoot({
  className,
  ...props
}: ComponentProps<"article">) {
  return <article className={analysisCardVariants({ className })} {...props} />;
}

export function AnalysisCardBadge({
  status,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  status: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
  children?: React.ReactNode;
}) {
  return (
    <div className={className} {...props}>
      <Badge variant={status}>{children || status}</Badge>
    </div>
  );
}

export function AnalysisCardTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return <h3 className={titleVariants({ className })} {...props} />;
}

export function AnalysisCardDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={descriptionVariants({ className })} {...props} />;
}
