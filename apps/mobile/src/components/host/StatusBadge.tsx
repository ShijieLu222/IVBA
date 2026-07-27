import { StyleSheet, Text, View } from "react-native";

import type { HireRequest } from "../../data/host";
import { colors } from "../../theme";

type StatusBadgeProps = {
  status: HireRequest["status"];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const backgroundColor =
    status === "New"
      ? colors.yellow
      : status === "Accepted"
        ? "#DFF4E8"
        : status === "Quoted"
          ? "#DDF4F2"
          : status === "Changes requested"
            ? "#FCE8F0"
            : status === "Declined"
              ? "#F4DEDC"
              : colors.soft;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  badgeText: { fontSize: 10, letterSpacing: 0.7, fontWeight: "900" },
});
