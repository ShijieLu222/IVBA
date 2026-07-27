import { StyleSheet, Text, View } from "react-native";
import { PageHeader, Screen } from "../src/ui";
import { colors, spacing, type } from "../src/theme";

const items = [
  {
    title: "New hire request",
    body: "Bristol Movement Lab requested the Dance Studio.",
    time: "18 min ago",
    unread: true,
  },
  {
    title: "Booking accepted",
    body: "Neighbourhood Shorts is confirmed for 7 August.",
    time: "Yesterday",
    unread: false,
  },
  {
    title: "Profile reminder",
    body: "Add an emergency contact to complete the venue profile.",
    time: "23 Jul",
    unread: false,
  },
];

export default function HostNotificationsScreen() {
  return (
    <Screen>
      <PageHeader title="Host notifications" eyebrow="The Island" />
      {items.map((item) => (
        <View key={item.title} style={styles.item}>
          <View style={item.unread ? styles.dot : styles.dotSpace} />
          <View style={{ flex: 1 }}>
            <Text style={type.h3}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md + 2,
    flexDirection: "row",
    gap: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  dot: {
    width: 6,
    height: 6,
    marginTop: spacing.sm,
    borderRadius: 3,
    backgroundColor: colors.pink,
  },
  dotSpace: { width: 6 },
  body: { ...type.meta, color: colors.muted, marginTop: 3 },
  time: { ...type.meta, fontSize: 11.5, color: colors.muted, marginTop: spacing.sm - 2 },
});
