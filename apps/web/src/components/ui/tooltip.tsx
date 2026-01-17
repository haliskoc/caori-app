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
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-xl border border-emerald-100 bg-white px-3 py-1.5 text-[11px] font-bold text-gray-500 opacity-0 shadow-xl transition-all group-hover:opacity-100 z-50">
        {label}
      </span>
    </span>
  );
}
