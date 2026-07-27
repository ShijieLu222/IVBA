import { StyleSheet, Text, TextInput, View } from "react-native";
import type { KeyboardTypeOptions, TextInputProps } from "react-native";

import { colors, radii, spacing, type } from "../../theme";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  hint?: string;
  error?: string;
  secure?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
};

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  hint,
  error,
  secure = false,
  multiline = false,
  keyboardType,
  autoCapitalize = "sentences",
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          error ? styles.inputError : null,
        ]}
        secureTextEntry={secure}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.sm - 2 },
  label: { ...type.label, color: colors.muted },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
    fontSize: 15,
    color: colors.ink,
  },
  inputMultiline: { minHeight: 104, textAlignVertical: "top" },
  inputError: { borderColor: colors.danger },
  hint: { ...type.meta, fontSize: 12, color: colors.muted },
  error: { ...type.meta, fontSize: 12, color: colors.danger },
});
