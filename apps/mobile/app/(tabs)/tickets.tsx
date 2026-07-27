import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  AppIcon,
  BrandHeader,
  EmptyState,
  InfoBanner,
  Screen,
  Tag,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

export default function TicketsScreen() {
  const router = useRouter();

  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />

      <View style={styles.heading}>
        <Text style={type.h1}>Your tickets</Text>
        <Text style={styles.sub}>
          Ready when you are—even if reception is patchy.
        </Text>
      </View>

      <InfoBanner
        icon="cloud-done-outline"
        title="Available offline"
        body="Your saved tickets stay on this device for quick entry."
        tone="soft"
      />

      <Pressable
        style={styles.ticket}
        onPress={() => router.push("/ticket/TKT-2817")}
      >
        <View style={styles.ticketDate}>
          <Text style={styles.day}>MON</Text>
          <Text style={styles.number}>27</Text>
          <Text style={styles.month}>JUL</Text>
        </View>
        <View style={styles.ticketCopy}>
          <Tag label="Upcoming · 1 ticket" tone="yellow" />
          <Text style={type.h2}>Broadmead XP</Text>
          <Text style={styles.meta}>The Island · 19:00</Text>
          <Text style={styles.meta}>Order AS-10482</Text>
        </View>
        <AppIcon name="chevron-forward" size={18} color={colors.muted} />
      </Pressable>

      <View style={styles.past}>
        <Text style={type.h2}>Past tickets</Text>
        <EmptyState
          icon="ticket-outline"
          title="Nothing here yet"
          body="Past events and cancelled tickets will appear here."
          action="Discover events"
          onAction={() => router.replace("/(tabs)")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  sub: { ...type.body, color: colors.muted },
  ticket: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  ticketDate: {
    width: 60,
    paddingVertical: spacing.md,
    alignItems: "center",
    gap: 2,
    borderRadius: radii.xs,
    backgroundColor: colors.yellowWash,
  },
  day: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  number: { fontSize: 24, lineHeight: 29, fontWeight: "600" },
  month: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  ticketCopy: { flex: 1, gap: spacing.xs },
  meta: { ...type.meta, fontSize: 12.5, color: colors.muted },
  past: { paddingHorizontal: spacing.gutter, paddingTop: spacing.section },
});
