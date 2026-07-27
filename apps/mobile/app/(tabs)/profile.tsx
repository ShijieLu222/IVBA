import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, BrandHeader, InfoBanner, Screen } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

const links = [
  ["Orders & refunds", "receipt-outline", "/orders"],
  ["Notifications", "notifications-outline", "/notifications"],
  ["Accessibility", "accessibility-outline", "/accessibility"],
  ["Privacy & settings", "settings-outline", "/settings"],
] as const;

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>KM</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.h2}>Ken Morgan</Text>
          <Text style={styles.email}>ken@example.com</Text>
        </View>
        <Pressable
          accessibilityLabel="Edit profile"
          onPress={() => router.push("/edit-profile")}
          style={styles.edit}
        >
          <AppIcon name="pencil-outline" size={17} />
        </Pressable>
      </View>

      <InfoBanner
        icon="heart-outline"
        title="Creativity stays local"
        body="Ticket and hire income supports independent venues and artists across Bristol."
        tone="pink"
      />

      <View style={styles.links}>
        {links.map(([label, icon, href]) => (
          <Pressable
            key={label}
            onPress={() => router.push(href)}
            style={styles.link}
          >
            <View style={styles.linkLeft}>
              <AppIcon name={icon} size={18} color={colors.muted} />
              <Text style={styles.linkText}>{label}</Text>
            </View>
            <AppIcon name="chevron-forward" size={16} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.organiser}
        onPress={() => router.push("/for-organisers")}
      >
        <View style={{ flex: 1, gap: spacing.xs }}>
          <Text style={styles.organiserKicker}>FOR ORGANISERS</Text>
          <Text style={type.h3}>Manage events or find a space</Text>
          <Text style={styles.organiserBody}>
            Professional tools continue on the web.
          </Text>
        </View>
        <AppIcon name="arrow-forward" size={19} color={colors.pink} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },
  initials: { fontSize: 17, fontWeight: "600", letterSpacing: 0.3 },
  email: { ...type.meta, color: colors.muted, marginTop: 2 },
  edit: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
  },
  links: { marginHorizontal: spacing.gutter, marginTop: spacing.section },
  link: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  linkLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md - 2 },
  linkText: { ...type.body, fontSize: 15 },
  organiser: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    paddingVertical: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  organiserKicker: { ...type.kicker, color: colors.pink },
  organiserBody: { ...type.meta, color: colors.muted },
});
