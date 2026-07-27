import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";
import { BrandLockup } from "./BrandLockup";

type BrandHeaderProps = {
  onNotifications?: () => void;
};

export function BrandHeader({ onNotifications }: BrandHeaderProps) {
  return (
    <View style={styles.brandHeader}>
      <BrandLockup />
      <View style={styles.headerActions}>
        <View style={styles.location}>
          <AppIcon name="location-outline" size={16} color={colors.muted} />
          <Text style={styles.locationText}>Bristol</Text>
        </View>
        <Pressable
          accessibilityLabel="Notifications"
          onPress={onNotifications}
          style={globalStyles.touchTarget}
        >
          <AppIcon name="notifications-outline" size={21} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandHeader: {
    minHeight: 64,
    paddingLeft: spacing.gutter - 4,
    paddingRight: spacing.gutter - 8,
    backgroundColor: colors.paper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  headerActions: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  location: { flexDirection: "row", gap: 4, alignItems: "center" },
  locationText: { ...type.meta, color: colors.muted },
  notificationDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.pink,
    right: 9,
    top: 10,
  },
});
