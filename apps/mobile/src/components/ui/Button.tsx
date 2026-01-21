import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";

export function Button({
  label,
  onPress,
  theme = DEFAULT_THEME,
  variant = "primary",
  style,
}: {
  label: string;
  onPress?: () => void;
  theme?: AppTheme;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary && { backgroundColor: theme.accent },
        isSecondary && { backgroundColor: theme.accentSoft, borderColor: theme.accent, borderWidth: 1 },
        variant === "ghost" && { backgroundColor: "transparent" },
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: isPrimary ? "#fff" : theme.accentText },
          variant === "ghost" && { color: theme.muted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: "Archivo_600SemiBold",
  },
});
