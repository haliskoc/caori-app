import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";
import { t } from "@/lib/i18n";

export function ProgressRing({
  value,
  goal,
  size = 140,
  stroke = 12,
  theme = DEFAULT_THEME,
}: {
  value: number;
  goal: number;
  size?: number;
  stroke?: number;
  theme?: AppTheme;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, goal > 0 ? value / goal : 0);
  const offset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke={theme.border}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <Circle
          stroke={theme.accent}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.labelWrap}>
        <Text style={[styles.value, { color: theme.text }]}>{Math.round(value)}</Text>
        <Text style={[styles.goal, { color: theme.muted }]}>
          {t("/{value} ml", { value: Math.round(goal) })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelWrap: {
    position: "absolute",
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  goal: {
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
  },
});
