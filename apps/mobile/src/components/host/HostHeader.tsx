import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";
import { BrandLockup } from "../layout";

type HostHeaderProps = {
  title: string;
  subtitle?: string;
};

export function HostHeader({
  title,
  subtitle = "The Island",
}: HostHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.top}>
        <BrandLockup compact />
        <Pressable
          accessibilityLabel="Host notifications"
          onPress={() => router.push("/host-notifications")}
          style={globalStyles.touchTarget}
        >
          <AppIcon name="notifications-outline" size={21} />
          <View style={styles.dot} />
        </Pressable>
      </View>
      <Text style={styles.role}>VENUE HOST · {subtitle.toUpperCase()}</Text>
      <Text style={type.h1}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    backgroundColor: colors.paper,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  top: {
    marginLeft: -4,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  role: { ...type.kicker, color: colors.pink, marginBottom: spacing.xs },
  dot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.pink,
    right: 9,
    top: 10,
  },
});
