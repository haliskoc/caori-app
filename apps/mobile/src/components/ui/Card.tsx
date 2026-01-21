import { View, StyleSheet, ViewStyle } from "react-native";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";

export function Card({
  children,
  style,
  theme = DEFAULT_THEME,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  theme?: AppTheme;
}) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, shadowColor: theme.shadow }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 2,
  },
});
