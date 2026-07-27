import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme";
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
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        pressed && globalStyles.pressed,
      ]}
    >
      <Text style={styles.secondaryButtonText}>{label}</Text>
      {icon ? <AppIcon name={icon} size={20} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  secondaryButton: {
    minHeight: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.ink,
    backgroundColor: colors.paper,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
});
