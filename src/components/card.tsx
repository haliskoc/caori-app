import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`app-card rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
