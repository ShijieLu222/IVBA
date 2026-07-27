import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
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
          <AppIcon name="location-outline" size={20} />
          <Text style={styles.locationText}>Bristol</Text>
        </View>
        <Pressable
          accessibilityLabel="Notifications"
          onPress={onNotifications}
          style={globalStyles.touchTarget}
        >
          <AppIcon name="notifications-outline" size={24} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandHeader: {
    minHeight: 82,
    paddingHorizontal: 18,
    backgroundColor: colors.yellow,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.ink,
  },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 6 },
  location: { flexDirection: "row", gap: 3, alignItems: "center" },
  locationText: { fontSize: 16, fontWeight: "800" },
  notificationDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pink,
    right: 7,
    top: 7,
  },
});
