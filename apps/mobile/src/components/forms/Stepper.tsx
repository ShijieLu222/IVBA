import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 6,
  label = "quantity",
}: StepperProps) {
  return (
    <View style={styles.stepper}>
      <Pressable
        accessibilityLabel={`Decrease ${label}`}
        disabled={value <= min}
        onPress={() => onChange(Math.max(min, value - 1))}
        style={({ pressed }) => [
          styles.stepButton,
          pressed && globalStyles.pressed,
          value <= min && globalStyles.disabled,
        ]}
      >
        <AppIcon name="remove" size={16} />
      </Pressable>
      <Text style={styles.count}>{value}</Text>
      <Pressable
        accessibilityLabel={`Increase ${label}`}
        disabled={value >= max}
        onPress={() => onChange(Math.min(max, value + 1))}
        style={({ pressed }) => [
          styles.stepButton,
          pressed && globalStyles.pressed,
          value >= max && globalStyles.disabled,
        ]}
      >
        <AppIcon name="add" size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  stepButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: spacing.xs,
  },
});
