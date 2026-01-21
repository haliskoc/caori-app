import React from "react";
import { Modal, View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";
import { t } from "@/lib/i18n";

export type QuickAction = {
  id: string;
  label: string;
  hint?: string;
  onPress: () => void;
};

export function QuickActionsSheet({
  visible,
  onClose,
  actions,
  theme = DEFAULT_THEME,
}: {
  visible: boolean;
  onClose: () => void;
  actions: QuickAction[];
  theme?: AppTheme;
}) {
  const [query, setQuery] = React.useState("");

  const filtered = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>{t("Hızlı Komutlar")}</Text>
            <Text style={[styles.subtitle, { color: theme.muted }]}>{t("Hızlı işlemler")}</Text>
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t("Komut ara...")}
            placeholderTextColor={theme.muted}
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          />
          {filtered.map((action) => (
            <Pressable
              key={action.id}
              onPress={() => {
                action.onPress();
                onClose();
              }}
              style={[styles.actionRow, { borderColor: theme.border }]}
            >
              <Text style={[styles.actionLabel, { color: theme.text }]}>{action.label}</Text>
              {action.hint ? (
                <Text style={[styles.actionHint, { color: theme.muted }]}>{action.hint}</Text>
              ) : null}
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sheet: {
    width: "100%",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "Archivo_400Regular",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "Archivo_400Regular",
    marginBottom: 12,
  },
  actionRow: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionLabel: {
    fontFamily: "Archivo_600SemiBold",
    fontSize: 13,
  },
  actionHint: {
    fontFamily: "Archivo_400Regular",
    fontSize: 11,
  },
});
