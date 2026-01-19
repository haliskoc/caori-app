import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { THEME } from '../../theme';

interface Segment {
  value: number;
  color: string;
  label?: string;
}

interface Props {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
  innerRadius?: number;
  children?: React.ReactNode;
}

export function AnimatedDonutChart({
  segments,
  size = 160,
  strokeWidth = 24,
  innerRadius,
  children,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const calculatedInnerRadius = innerRadius ?? radius - strokeWidth;
  
  const total = segments.reduce((sum, seg) => sum + seg.value, 0) || 1;
  
  let currentAngle = -90; // Start from top
  
  const createArcPath = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          {segments.map((segment, i) => (
            <LinearGradient key={i} id={`gradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={segment.color} stopOpacity="1" />
              <Stop offset="100%" stopColor={segment.color} stopOpacity="0.7" />
            </LinearGradient>
          ))}
        </Defs>

        {/* Background ring */}
        <Path
          d={createArcPath(0, 359.99)}
          stroke={THEME.colors.primary[50]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Segments */}
        {segments.map((segment, i) => {
          const segmentAngle = (segment.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + segmentAngle - 2; // Gap between segments
          currentAngle += segmentAngle;

          if (segment.value === 0) return null;

          return (
            <G key={i}>
              {/* Glow effect */}
              <Path
                d={createArcPath(startAngle, Math.max(startAngle + 1, endAngle))}
                stroke={segment.color}
                strokeWidth={strokeWidth + 8}
                fill="transparent"
                strokeLinecap="round"
                opacity={0.2}
              />
              {/* Main segment */}
              <Path
                d={createArcPath(startAngle, Math.max(startAngle + 1, endAngle))}
                stroke={`url(#gradient${i})`}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
              />
            </G>
          );
        })}
      </Svg>

      {children && (
        <View style={[styles.content, { width: calculatedInnerRadius * 2, height: calculatedInnerRadius * 2 }]}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
