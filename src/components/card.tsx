import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`app-card rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
