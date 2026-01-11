import * as React from "react";

import { cn } from "@/lib/cn";

export type CardVariant = "default" | "subtle" | "highlight";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variants: Record<CardVariant, string> = {
  default:
    "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-[0_1px_0_hsl(var(--text)/0.02),0_8px_24px_hsl(var(--text)/0.06)]",
  subtle:
    "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-[0_1px_0_hsl(var(--text)/0.02),0_6px_18px_hsl(var(--text)/0.05)]",
  highlight:
    "bg-[hsl(var(--surface))] border border-[hsl(var(--accent)/0.28)] shadow-[0_1px_0_hsl(var(--text)/0.02),0_10px_28px_hsl(var(--text)/0.06)] " +
    "bg-gradient-to-b from-[hsl(var(--accent)/0.06)] to-transparent",
};

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "transition-[transform,box-shadow,border-color] duration-220 motion-reduce:transition-none motion-reduce:transform-none",
        "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
        "hover:border-[hsl(var(--accent)/0.35)] hover:shadow-[0_1px_0_hsl(var(--text)/0.02),0_12px_34px_hsl(var(--text)/0.08)]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}


