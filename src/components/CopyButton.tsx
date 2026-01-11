"use client";

import * as React from "react";

import { Button } from "@/components/Button";

export interface CopyButtonProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through to legacy copy
  }

  try {
    const el = document.createElement("textarea");
    el.value = value;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.top = "-9999px";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied!",
  className,
}: CopyButtonProps) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "failed">("idle");

  React.useEffect(() => {
    if (status === "idle") return;
    const t = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(t);
  }, [status]);

  const onCopy = async () => {
    const ok = await copyToClipboard(value);
    setStatus(ok ? "copied" : "failed");
  };

  const text = status === "copied" ? copiedLabel : label;

  return (
    <div className={className}>
      <Button
        type="button"
        variant="secondary"
        onClick={onCopy}
        aria-label={`Copy ${value} to clipboard`}
      >
        {text}
      </Button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Copied to clipboard." : status === "failed" ? "Copy failed." : ""}
      </span>
    </div>
  );
}


