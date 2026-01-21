import { View, Text, StyleSheet } from "react-native";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";

export function SectionHeader({
  title,
  subtitle,
  theme = DEFAULT_THEME,
}: {
  title: string;
  subtitle?: string;
  theme?: AppTheme;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
  },
});
