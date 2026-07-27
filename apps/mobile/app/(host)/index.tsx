import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { hireRequests } from "../../src/host-data";
import { HostHeader, RequestRow } from "../../src/host-ui";
import { AppIcon, PrimaryButton, Screen, SectionTitle } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

const stats = [
  ["3", "New requests"],
  ["2", "Bookings today"],
  ["£1.8k", "Aug. confirmed"],
] as const;

export default function HostTodayScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HostHeader title="Good morning, Maya" />

      <View style={styles.date}>
        <Text style={styles.dateKicker}>MONDAY · 27 JULY</Text>
        <Text style={type.h2}>Today at The Island</Text>
      </View>

      <View style={styles.stats}>
        {stats.map(([value, label]) => (
          <View key={label} style={styles.stat}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.next}>
        <Text style={styles.nextKicker}>NEXT IN THE BUILDING · 14:30</Text>
        <Text style={type.h2}>Sound check</Text>
        <Text style={styles.nextEvent}>Neighbourhood Shorts · Gallery</Text>
        <View style={styles.nextMeta}>
          <AppIcon name="people-outline" size={15} color={colors.muted} />
          <Text style={styles.nextMetaText}>55 expected</Text>
          <AppIcon name="time-outline" size={15} color={colors.muted} />
          <Text style={styles.nextMetaText}>14:30–16:00</Text>
        </View>
        <PrimaryButton
          label="Open booking"
          tone="black"
          onPress={() => router.push("/hire-request/HR-2038")}
        />
      </View>

      <SectionTitle
        title="Needs your attention"
        action="All requests"
        onAction={() => router.push("/(host)/requests")}
      />
      {hireRequests.slice(0, 2).map((request) => (
        <RequestRow
          key={request.id}
          request={request}
          onPress={() => router.push(`/hire-request/${request.id}`)}
        />
      ))}

      <Pressable
        style={styles.shortcut}
        onPress={() => router.push("/(host)/calendar")}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.shortcutKicker}>AVAILABILITY</Text>
          <Text style={type.h3}>Review and block hire times</Text>
        </View>
        <AppIcon name="arrow-forward" size={19} color={colors.pink} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  dateKicker: { ...type.kicker, color: colors.pink },
  stats: {
    paddingHorizontal: spacing.gutter,
    flexDirection: "row",
    gap: spacing.sm,
  },
  stat: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md - 2,
    gap: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  statValue: { fontSize: 21, lineHeight: 26, fontWeight: "600" },
  statLabel: { ...type.meta, fontSize: 11.5, color: colors.muted },
  next: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    padding: spacing.lg - 4,
    gap: spacing.xs + 2,
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  nextKicker: { ...type.kicker, color: colors.pink },
  nextEvent: { ...type.meta, color: colors.muted },
  nextMeta: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
  },
  nextMetaText: {
    ...type.meta,
    fontSize: 12,
    color: colors.muted,
    marginRight: spacing.sm,
  },
  shortcut: {
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
  shortcutKicker: {
    ...type.kicker,
    color: colors.pink,
    marginBottom: spacing.xs,
  },
});
