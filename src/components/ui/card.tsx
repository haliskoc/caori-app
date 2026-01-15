import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`app-card rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-soft transition-all ${className}`}
    >
      {children}
    </div>
  );
}
