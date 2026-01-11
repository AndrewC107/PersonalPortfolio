import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-220 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent)/0.9)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))] " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "motion-reduce:transition-none motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[hsl(var(--accent))] text-white shadow-sm motion-safe:hover:-translate-y-0.5 hover:shadow-md motion-safe:active:translate-y-0 border border-transparent",
  secondary:
    "bg-[hsl(var(--surface))] text-[hsl(var(--text))] border border-[hsl(var(--border))] shadow-sm motion-safe:hover:-translate-y-0.5 hover:shadow-md motion-safe:active:translate-y-0 hover:border-[hsl(var(--accent)/0.22)]",
  ghost:
    "bg-transparent text-[hsl(var(--text))] border border-transparent hover:bg-[hsl(var(--surface2))] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
};

const sizes = {
  md: "h-10 px-4",
  sm: "h-9 px-3",
} as const;

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type AnchorLikeProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonLikeProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export function Button(props: AnchorLikeProps): React.ReactElement;
export function Button(props: ButtonLikeProps): React.ReactElement;
export function Button(props: AnchorLikeProps | ButtonLikeProps) {
  // Note: We intentionally destructure via `any` to keep the API ergonomic (href vs button)
  // while avoiding TS rest-type issues with union props during `next build` type-checking.
  const { variant = "primary", size = "md", leftIcon, rightIcon, className, children, ...rest } =
    props as any;

  const resolvedVariant: Variant =
    typeof variant === "string" && variant in variants ? (variant as Variant) : "primary";
  const resolvedSize: keyof typeof sizes =
    typeof size === "string" && size in sizes ? (size as keyof typeof sizes) : "md";

  const classes = cn(base, sizes[resolvedSize], variants[resolvedVariant], className);
  const content = (
    <>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorRest } = rest as AnchorLikeProps;
    const isHash = href.startsWith("#");
    const isInternal = href.startsWith("/") || isHash;

    if (isInternal) {
      // Link supports hash anchors as well as internal routes.
      return (
        <Link href={href} className={classes} {...(anchorRest as any)}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} target={target} rel={rel} {...(anchorRest as any)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonLikeProps)}>
      {content}
    </button>
  );
}


