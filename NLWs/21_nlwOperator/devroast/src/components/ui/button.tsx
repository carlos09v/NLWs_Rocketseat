import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-accent-green font-medium hover:brightness-110 active:brightness-95",
      secondary:
        "border border-border-strong bg-transparent text-foreground font-normal text-xs py-2 px-4 hover:bg-muted/30",
      link: "border border-border-strong bg-transparent font-normal text-xs py-1.5 px-3 text-content-text-secondary hover:text-foreground",
      outline:
        "border border-border-strong bg-transparent text-foreground font-normal text-xs py-2 px-4 hover:bg-muted/30",
      ghost:
        "border border-transparent bg-transparent text-foreground font-normal hover:bg-muted/30",
      destructive:
        "border border-transparent bg-destructive text-white font-medium hover:brightness-110 active:brightness-95",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "sm",
      class: "gap-1.5 py-1.5 px-3 text-xs text-background",
    },
    {
      variant: "primary",
      size: "default",
      class: "gap-2 py-2.5 px-6 text-13 text-background",
    },
    {
      variant: "primary",
      size: "lg",
      class: "gap-2.5 py-3 px-8 text-sm text-background",
    },
    {
      variant: "ghost",
      size: "sm",
      class: "gap-1.5 py-1.5 px-3 text-xs",
    },
    {
      variant: "ghost",
      size: "default",
      class: "gap-2 py-2.5 px-6 text-13",
    },
    {
      variant: "ghost",
      size: "lg",
      class: "gap-2.5 py-3 px-8 text-sm",
    },
    {
      variant: "destructive",
      size: "sm",
      class: "gap-1.5 py-1.5 px-3 text-xs",
    },
    {
      variant: "destructive",
      size: "default",
      class: "gap-2 py-2.5 px-6 text-13",
    },
    {
      variant: "destructive",
      size: "lg",
      class: "gap-2.5 py-3 px-8 text-sm",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    showPrefix?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  type = "button",
  showPrefix = true,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {showPrefix && "$ "}
      {children}
    </button>
  );
}
