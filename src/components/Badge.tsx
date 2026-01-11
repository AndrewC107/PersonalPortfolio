import * as React from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  neutral:
    "border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--text))] shadow-sm",
  accent:
    "border border-[hsl(var(--accent)/0.25)] bg-[hsl(var(--accent)/0.08)] text-[hsl(var(--text))]",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        "whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}


