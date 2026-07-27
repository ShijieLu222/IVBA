import type { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, type } from "../../theme";
import { AppIcon, type IconName } from "../icons";

type MetaRowProps = PropsWithChildren<{
  icon: IconName;
  pink?: boolean;
}>;

export function MetaRow({ icon, children, pink = false }: MetaRowProps) {
  return (
    <View style={styles.metaRow}>
      <AppIcon name={icon} size={19} color={pink ? colors.pink : colors.ink} />
      <Text style={styles.metaText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  metaText: { ...type.body, flex: 1 },
});
