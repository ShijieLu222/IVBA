import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon, type IconName } from "../icons";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  tone?: "pink" | "yellow" | "black";
  disabled?: boolean;
  /** Off-centre labels are only used inside dense rows next to a price. */
  centered?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  icon,
  tone = "pink",
  disabled = false,
  centered = true,
}: PrimaryButtonProps) {
  const backgroundColor =
    tone === "yellow"
      ? colors.yellow
      : tone === "black"
        ? colors.ink
        : colors.pink;
  const color = tone === "yellow" ? colors.ink : colors.white;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor },
        centered && styles.centered,
        pressed && globalStyles.pressed,
        disabled && globalStyles.disabled,
      ]}
    >
      <Text style={[styles.primaryButtonText, { color }]}>{label}</Text>
      {icon ? (
        <View style={centered ? styles.iconCentered : undefined}>
          <AppIcon name={icon} size={18} color={color} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  centered: { justifyContent: "center" },
  primaryButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: 0.1,
  },
  iconCentered: { position: "absolute", right: spacing.lg },
});
