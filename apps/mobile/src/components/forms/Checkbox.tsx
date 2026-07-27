import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export function Checkbox({ label, checked, onToggle }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={({ pressed }) => [styles.row, pressed && globalStyles.pressed]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <AppIcon name="checkmark" size={14} color={colors.white} />
        ) : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md - 2,
  },
  box: {
    width: 20,
    height: 20,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  boxChecked: { backgroundColor: colors.pink, borderColor: colors.pink },
  label: { ...type.meta, flex: 1, color: colors.muted },
});
