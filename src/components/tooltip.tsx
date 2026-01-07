"use client";

import type { ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="relative inline-flex items-center group">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg border border-amber-100 bg-white px-2 py-1 text-[11px] text-muted opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </span>
  );
}
