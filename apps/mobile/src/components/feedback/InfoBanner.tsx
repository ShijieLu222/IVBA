import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { AppIcon, type IconName } from "../icons";

type InfoBannerProps = {
  icon: IconName;
  title: string;
  body: string;
  tone?: "yellow" | "pink" | "soft";
};

export function InfoBanner({
  icon,
  title,
  body,
  tone = "yellow",
}: InfoBannerProps) {
  const backgroundColor =
    tone === "yellow"
      ? colors.yellow
      : tone === "pink"
        ? "#FCE8F0"
        : colors.soft;

  return (
    <View style={[styles.infoBanner, { backgroundColor }]}>
      <AppIcon name={icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    marginHorizontal: 20,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  infoTitle: { fontSize: 15, lineHeight: 20, fontWeight: "800" },
  infoBody: { fontSize: 13, lineHeight: 18, marginTop: 2 },
});
