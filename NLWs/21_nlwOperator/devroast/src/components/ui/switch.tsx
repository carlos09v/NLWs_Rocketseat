"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const switchVariants = tv({
  slots: {
    root: [
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-border-strong bg-muted transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[checked]:border-accent-green data-[checked]:bg-accent-green",
    ],
    thumb: [
      "pointer-events-none block rounded-full bg-foreground shadow-sm ring-0 transition-transform",
      "data-[checked]:bg-layer-page-alt",
      "data-[disabled]:data-[checked]:bg-muted-foreground",
    ],
  },
  variants: {
    size: {
      sm: {
        root: "h-5 w-9 px-0.5",
        thumb: "size-4 translate-x-0 data-[checked]:translate-x-4",
      },
      default: {
        root: "h-6 w-11 px-0.5",
        thumb: "size-5 translate-x-0 data-[checked]:translate-x-5",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type BaseSwitchRootProps = ComponentPropsWithoutRef<typeof BaseSwitch.Root>;

export type SwitchProps = Omit<BaseSwitchRootProps, "className"> &
  VariantProps<typeof switchVariants> & {
    className?: string;
    thumbClassName?: string;
  };

export const Switch = forwardRef<HTMLSpanElement, SwitchProps>(function Switch(
  { className, thumbClassName, size, ...props },
  ref,
) {
  const { root, thumb } = switchVariants({ size });
  const rootClass = twMerge(root(), className);
  const thumbClass = twMerge(thumb(), thumbClassName);

  return (
    <BaseSwitch.Root ref={ref} className={rootClass} {...props}>
      <BaseSwitch.Thumb className={thumbClass} />
    </BaseSwitch.Root>
  );
});
