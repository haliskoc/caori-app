import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, G, Circle, Text as SvgText } from 'react-native-svg';
import { THEME } from '../../theme';
import { Text } from './Text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DataPoint {
  label: string;
  value: number;
  date?: string;
}

interface Props {
  data: DataPoint[];
  height?: number;
  width?: number;
  color?: string;
  showLabels?: boolean;
  showDots?: boolean;
  showGradient?: boolean;
  animate?: boolean;
}

export function AnimatedLineChart({
  data,
  height = 180,
  width = SCREEN_WIDTH - 64,
  color = THEME.colors.primary[500],
  showLabels = true,
  showDots = true,
  showGradient = true,
}: Props) {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height, width }]}>
        <Text style={styles.noData}>No data available</Text>
      </View>
    );
  }

  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value), 0);
  const valueRange = maxValue - minValue || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1 || 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
    ...d,
  }));

  // Create smooth bezier curve path
  const createSmoothPath = () => {
    if (points.length < 2) {
      return `M ${points[0]?.x || 0} ${points[0]?.y || 0}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;
      
      path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }
    
    return path;
  };

  const createAreaPath = () => {
    const linePath = createSmoothPath();
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const bottomY = padding.top + chartHeight;
    
    return `${linePath} L ${lastPoint.x} ${bottomY} L ${firstPoint.x} ${bottomY} Z`;
  };

  return (
    <View style={[styles.container, { height, width }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={THEME.colors.primary[400]} />
            <Stop offset="100%" stopColor={THEME.colors.primary[600]} />
          </LinearGradient>
          <LinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <G key={i}>
            <Path
              d={`M ${padding.left} ${padding.top + chartHeight * (1 - ratio)} H ${width - padding.right}`}
              stroke={THEME.colors.primary[100]}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          </G>
        ))}

        {/* Area fill */}
        {showGradient && (
          <Path
            d={createAreaPath()}
            fill="url(#areaGradient)"
          />
        )}

        {/* Line */}
        <Path
          d={createSmoothPath()}
          stroke="url(#lineGradient)"
          strokeWidth={3}
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glow effect */}
        <Path
          d={createSmoothPath()}
          stroke={color}
          strokeWidth={8}
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.15}
        />

        {/* Dots */}
        {showDots && points.map((point, i) => (
          <G key={i}>
            {/* Outer glow */}
            <Circle
              cx={point.x}
              cy={point.y}
              r={8}
              fill={color}
              opacity={0.2}
            />
            {/* Inner dot */}
            <Circle
              cx={point.x}
              cy={point.y}
              r={4}
              fill="white"
              stroke={color}
              strokeWidth={2}
            />
          </G>
        ))}

        {/* Labels */}
        {showLabels && points.map((point, i) => (
          <SvgText
            key={i}
            x={point.x}
            y={height - 10}
            fontSize={10}
            fontWeight="600"
            fill={THEME.colors.text.muted}
            textAnchor="middle"
          >
            {point.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    color: THEME.colors.text.muted,
    fontSize: 14,
  },
});
