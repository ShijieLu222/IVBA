import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { HostHeader } from "../../src/host-ui";
import { AppIcon, InfoBanner, Screen } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

const links = [
  ["Venue team & permissions", "people-outline"],
  ["Hire settings", "settings-outline"],
  ["Payout details", "wallet-outline"],
  ["Help for Venue Hosts", "help-circle-outline"],
] as const;

export default function HostProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HostHeader title="Host profile" />

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>MR</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.h2}>Maya Roberts</Text>
          <Text style={styles.email}>host@artspace.uk</Text>
          <Text style={styles.role}>VENUE MANAGER</Text>
        </View>
      </View>

      <Pressable style={styles.switcher}>
        <View style={{ flex: 1 }}>
          <Text style={styles.switcherLabel}>ACTIVE VENUE</Text>
          <Text style={type.h3}>The Island</Text>
          <Text style={styles.switcherMeta}>Artspace Lifespace · Bristol</Text>
        </View>
        <AppIcon name="chevron-forward" size={16} color={colors.muted} />
      </Pressable>

      <InfoBanner
        icon="checkmark-circle-outline"
        title="Host access verified"
        body="You can manage spaces, availability, hire requests and venue team access."
        tone="pink"
      />

      <View style={styles.links}>
        {links.map(([label, icon]) => (
          <Pressable key={label} style={styles.link}>
            <View style={styles.linkLeft}>
              <AppIcon name={icon} size={18} color={colors.muted} />
              <Text style={styles.linkText}>{label}</Text>
            </View>
            <AppIcon name="chevron-forward" size={16} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.signOut}
        onPress={() => router.replace("/welcome")}
      >
        <Text style={styles.signOutText}>Sign out</Text>
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
    backgroundColor: colors.pink,
  },
  initials: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  email: { ...type.meta, color: colors.muted, marginTop: 2 },
  role: { ...type.kicker, color: colors.pink, marginTop: spacing.xs },
  switcher: {
    marginHorizontal: spacing.gutter,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  switcherLabel: { ...type.kicker, color: colors.pink, marginBottom: 2 },
  switcherMeta: { ...type.meta, fontSize: 12, color: colors.muted, marginTop: 2 },
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
  signOut: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.danger,
    borderRadius: radii.xs,
  },
  signOutText: { fontSize: 15, fontWeight: "600", color: colors.danger },
});
