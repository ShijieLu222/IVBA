import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, type } from "../../theme";
import { AppIcon, type IconName } from "../icons";

type InfoBannerProps = {
  icon: IconName;
  title: string;
  body: string;
  tone?: "yellow" | "pink" | "soft";
};

/** Brand colour reads as a tint plus an accent edge rather than a solid block. */
const tones = {
  yellow: { backgroundColor: colors.yellowWash, accent: colors.yellow },
  pink: { backgroundColor: colors.pinkWash, accent: colors.pink },
  soft: { backgroundColor: colors.soft, accent: colors.border },
} as const;

export function InfoBanner({
  icon,
  title,
  body,
  tone = "yellow",
}: InfoBannerProps) {
  const { backgroundColor, accent } = tones[tone];

  return (
    <View style={[styles.infoBanner, { backgroundColor }]}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <AppIcon name={icon} size={18} color={colors.ink} />
      <View style={styles.copy}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md + 3,
    paddingRight: spacing.md,
    flexDirection: "row",
    gap: spacing.md - 2,
    borderRadius: radii.xs,
    overflow: "hidden",
  },
  accent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3 },
  copy: { flex: 1, gap: 2 },
  infoTitle: { ...type.h3, fontSize: 14 },
  infoBody: { ...type.meta, color: colors.muted },
});
