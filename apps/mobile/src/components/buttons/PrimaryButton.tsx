import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon, type IconName } from "../icons";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  tone?: "pink" | "yellow" | "black";
  disabled?: boolean;
  centered?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  icon = "arrow-forward",
  tone = "pink",
  disabled = false,
  centered = false,
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
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor },
        pressed && globalStyles.pressed,
        disabled && globalStyles.disabled,
      ]}
    >
      <Text
        style={[
          styles.primaryButtonText,
          { color },
          centered && styles.primaryButtonTextCentered,
        ]}
      >
        {label}
      </Text>
      <View style={centered ? styles.primaryButtonIconCentered : undefined}>
        <AppIcon name={icon} size={22} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 52,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  primaryButtonText: { fontSize: 17, fontWeight: "800" },
  primaryButtonTextCentered: { width: "100%", textAlign: "center" },
  primaryButtonIconCentered: { position: "absolute", right: 18 },
});
