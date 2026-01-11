"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  /**
   * If provided, this Reveal becomes a "stagger group" and will wrap each direct child
   * in a motion element with staggered timing.
   */
  stagger?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = 12,
  once = true,
  stagger,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    // Minimal fade only (no transforms) to reduce motion while keeping gentle polish.
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: 0.2 }}
        transition={{ duration: 0.2, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    );
  }

  if (typeof stagger === "number") {
    const kids = React.Children.toArray(children);
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.2 }}
        transition={{ delayChildren: delay, staggerChildren: stagger }}
        variants={{ hidden: {}, show: {} }}
      >
        {kids.map((child, idx) => (
          <motion.div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            variants={{
              hidden: { opacity: 0, y },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}


