import React from "react";
import Svg, { Circle } from "react-native-svg";
import { View } from "react-native";
import { Text } from "./Text";

type Segment = {
  value: number;
  color: string;
  label: string;
};

type Props = {
  size?: number;
  strokeWidth?: number;
  segments: Segment[];
  centerLabel?: string;
};

export function DonutChart({
  size = 140,
  strokeWidth = 18,
  segments,
  centerLabel,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const rawTotal = segments.reduce((sum, s) => sum + s.value, 0);
  const total = rawTotal || 1;

  let cumulative = 0;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        {rawTotal === 0 && (
          <Circle
            stroke="#E5E7EB"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
        )}
        {segments.map((segment, idx) => {
          const fraction = segment.value / total;
          const dashArray = circumference * fraction;
          const dashOffset = circumference - cumulative;
          cumulative -= dashArray;
          return (
            <Circle
              key={`${segment.label}-${idx}`}
              stroke={segment.color}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              rotation="-90"
              originX={size / 2}
              originY={size / 2}
            />
          );
        })}
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        {centerLabel && (
          <Text className="text-xs text-gray-400 font-bold">{centerLabel}</Text>
        )}
        <Text className="text-lg font-black text-gray-900">
          {rawTotal === 0 ? "-" : Math.round(total)}
        </Text>
      </View>
    </View>
  );
}
