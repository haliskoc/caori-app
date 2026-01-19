import React from "react";
import { View } from "react-native";
import Svg, { Polyline, Circle } from "react-native-svg";
import { Text } from "./Text";

type Point = { label: string; value: number };

type Props = {
  data: Point[];
  width?: number;
  height?: number;
  color?: string;
};

export function LineChart({ data, width = 320, height = 160, color = "#10b981" }: Props) {
  const max = Math.max(1, ...data.map((item) => item.value));
  const min = Math.min(0, ...data.map((item) => item.value));
  const range = Math.max(1, max - min);

  const stepX = data.length > 1 ? width / (data.length - 1) : width;
  const points = data.map((item, idx) => {
    const x = idx * stepX;
    const y = height - ((item.value - min) / range) * height;
    return { x, y, label: item.label, value: item.value };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <View>
      <Svg width={width} height={height}>
        <Polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((point, idx) => (
          <Circle key={idx} cx={point.x} cy={point.y} r="4" fill={color} />
        ))}
      </Svg>
      <View className="flex-row justify-between mt-2">
        {points.map((point, idx) => (
          <Text key={idx} className="text-[10px] text-gray-400 font-bold">
            {point.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
