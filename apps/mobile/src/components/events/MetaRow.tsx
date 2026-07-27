import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, type } from "../../theme";
import { AppIcon, type IconName } from "../icons";

type MetaRowProps = PropsWithChildren<{
  icon: IconName;
  pink?: boolean;
}>;

export function MetaRow({ icon, children, pink = false }: MetaRowProps) {
  return (
    <View style={styles.metaRow}>
      <AppIcon name={icon} size={16} color={pink ? colors.pink : colors.muted} />
      <Text style={styles.metaText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    minHeight: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  metaText: { ...type.body, fontSize: 14, flex: 1 },
});
