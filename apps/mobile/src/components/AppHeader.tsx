import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";

export function AppHeader({
  title,
  subtitle,
  onAction,
  theme = DEFAULT_THEME,
}: {
  title: string;
  subtitle?: string;
  onAction?: () => void;
  theme?: AppTheme;
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {onAction ? (
        <Pressable style={[styles.action, { backgroundColor: theme.accentSoft }]} onPress={onAction}>
          <Ionicons name="flash" size={18} color={theme.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Archivo_400Regular",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  action: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
