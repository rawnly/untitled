import * as React from "react";
import { VariantProps, tv } from "tailwind-variants";

import clsx from "clsx";

const badgeVariants = tv({
  base: "inline-flex items-center border rounded px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default:
        "bg-primary-6 hover:bg-primary-70 border-neutral-7 text-primary-11",
      secondary:
        "bg-neutral-6 hover:bg-neutral-7 border-neutral-7 text-neutral-12",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={clsx(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
