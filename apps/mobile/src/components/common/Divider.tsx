import { StyleSheet, View } from "react-native";

import { colors, spacing } from "../../theme";

type DividerProps = {
  /** Keeps the rule inside the screen gutter instead of running full bleed. */
  inset?: boolean;
  space?: number;
};

export function Divider({ inset = true, space = spacing.lg }: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        inset && styles.inset,
        { marginVertical: space },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  inset: { marginHorizontal: spacing.gutter },
});
