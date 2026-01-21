import { TextInput, StyleSheet, ViewStyle } from "react-native";
import { AppTheme, DEFAULT_THEME } from "@/lib/theme";

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  theme = DEFAULT_THEME,
  style,
}: {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  theme?: AppTheme;
  style?: ViewStyle;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.muted}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={[
        styles.input,
        {
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.surface,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: "Archivo_400Regular",
    fontSize: 14,
  },
});
