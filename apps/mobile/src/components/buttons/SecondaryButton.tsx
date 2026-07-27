import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, spacing } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon, type IconName } from "../icons";

type SecondaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
};

export function SecondaryButton({
  label,
  onPress,
  icon,
}: SecondaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && globalStyles.pressed,
      ]}
    >
      {icon ? <AppIcon name={icon} size={17} /> : null}
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  secondaryButton: {
    minHeight: 50,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
});
