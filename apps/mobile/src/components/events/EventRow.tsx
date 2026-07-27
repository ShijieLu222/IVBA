import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { EventItem } from "../../data";
import { colors } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";

type EventRowProps = {
  event: EventItem;
  onPress?: () => void;
};

export function EventRow({ event, onPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.eventRow, pressed && globalStyles.pressed]}
    >
      <Image source={event.image} style={styles.eventThumb} />
      <View style={styles.eventCopy}>
        <Text style={styles.eventCategory}>{event.category.toUpperCase()}</Text>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.eventMeta}>{event.venue}</Text>
        <Text style={styles.eventMeta}>
          {event.date.replace(" 2026", "")} · {event.time}
        </Text>
      </View>
      <View style={styles.eventAside}>
        <Text style={styles.eventPrice}>{event.price}</Text>
        <AppIcon name="chevron-forward" color={colors.pink} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventRow: {
    minHeight: 132,
    marginHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    gap: 13,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  eventThumb: { width: 94, height: 100, backgroundColor: colors.soft },
  eventCopy: { flex: 1, justifyContent: "center" },
  eventCategory: {
    color: colors.pink,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  eventTitle: { fontSize: 16, lineHeight: 19, fontWeight: "800", marginTop: 3 },
  eventMeta: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.muted,
    marginTop: 3,
  },
  eventAside: {
    width: 62,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: 4,
  },
  eventPrice: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "right",
  },
});
