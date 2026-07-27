import { StyleSheet, Text, View } from "react-native";

import type { HireRequest } from "../../data/host";
import { colors, radii, spacing, type } from "../../theme";

type StatusBadgeProps = {
  status: HireRequest["status"];
};

const tones: Record<HireRequest["status"], { bg: string; fg: string }> = {
  New: { bg: colors.yellowWash, fg: colors.ink },
  "Under review": { bg: colors.soft, fg: colors.muted },
  Quoted: { bg: "#E4F5F4", fg: "#0F6E6A" },
  Accepted: { bg: "#E7F4EC", fg: colors.success },
  "Changes requested": { bg: colors.pinkWash, fg: colors.pink },
  Declined: { bg: "#F7E9E7", fg: colors.danger },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone = tones[status] ?? { bg: colors.soft, fg: colors.muted };

  return (
    <View style={[styles.badge, { backgroundColor: tone.bg }]}>
      <Text style={[styles.badgeText, { color: tone.fg }]}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.xs,
  },
  badgeText: { ...type.kicker, fontSize: 9.5, letterSpacing: 1.1 },
});
