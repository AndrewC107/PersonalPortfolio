import * as React from "react";

import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export function Divider({ className, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0",
        "bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent",
        className
      )}
      {...props}
    />
  );
}


