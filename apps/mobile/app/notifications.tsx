import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, Screen } from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

const items = [
  [
    "ticket-outline",
    "Your ticket is ready",
    "Broadmead XP · Order AS-10482",
    "Just now",
    true,
  ],
  [
    "time-outline",
    "Broadmead XP starts tomorrow",
    "Doors open at 18:30 at The Island.",
    "Yesterday",
    true,
  ],
  [
    "bookmark-outline",
    "A saved event is filling up",
    "Summer Sounds has fewer than 20 tickets left.",
    "24 Jul",
    false,
  ],
  [
    "megaphone-outline",
    "New at Sparks Bristol",
    "Four community events were added this week.",
    "22 Jul",
    false,
  ],
] as const;

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <Screen>
      <PageHeader
        title="Notifications"
        right={
          <Pressable style={styles.markWrap}>
            <Text style={styles.mark}>Mark all read</Text>
          </Pressable>
        }
      />
      <View>
        {items.map(([icon, title, body, date, unread]) => (
          <Pressable
            key={title}
            onPress={() =>
              title.includes("ticket") && router.push("/ticket/TKT-2817")
            }
            style={styles.item}
          >
            <View style={[styles.icon, unread && styles.iconUnread]}>
              <AppIcon
                name={icon}
                size={17}
                color={unread ? colors.ink : colors.muted}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
              </View>
              <Text style={styles.body}>{body}</Text>
            </View>
            {unread ? <View style={styles.dot} /> : null}
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  markWrap: { minHeight: 44, justifyContent: "center" },
  mark: { ...type.label, color: colors.pink },
  item: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.md + 2,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md - 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.soft,
    alignItems: "center",
    justifyContent: "center",
  },
  iconUnread: { backgroundColor: colors.yellowWash },
  row: { flexDirection: "row", gap: spacing.sm, justifyContent: "space-between" },
  title: { ...type.h3, flex: 1 },
  date: { ...type.meta, fontSize: 11.5, color: colors.muted, paddingTop: 2 },
  body: { ...type.meta, color: colors.muted, marginTop: 3 },
  dot: {
    width: 6,
    height: 6,
    marginTop: spacing.sm,
    borderRadius: 3,
    backgroundColor: colors.pink,
  },
});
