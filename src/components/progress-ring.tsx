import React from "react";

type ProgressRingProps = {
  value: number;
  goal: number;
  size?: number;
  stroke?: number;
};

export function ProgressRing({ value, goal, size = 120, stroke = 12 }: ProgressRingProps) {
  const safeGoal = goal > 0 ? goal : 1;
  const progress = Math.min(value / safeGoal, 1);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffe6cc"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7a00" />
            <stop offset="100%" stopColor="#ffb56b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-semibold text-ink">{Math.round(progress * 100)}%</p>
        <p className="text-xs text-muted">{Math.round(value)} ml</p>
      </div>
    </div>
  );
}
