import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { EventItem } from "../../data";
import { colors, radii, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";

type EventRowProps = {
  event: EventItem;
  onPress?: () => void;
};

export function EventRow({ event, onPress }: EventRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.eventRow, pressed && globalStyles.pressed]}
    >
      <Image source={event.image} style={styles.eventThumb} />
      <View style={styles.eventCopy}>
        <Text style={styles.eventCategory}>{event.category.toUpperCase()}</Text>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.eventMeta} numberOfLines={1}>
          {event.venue}
        </Text>
        <Text style={styles.eventMeta}>
          {event.date.replace(" 2026", "")} · {event.time}
        </Text>
      </View>
      <Text style={styles.eventPrice}>{event.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventRow: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md + 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  eventThumb: {
    width: 92,
    height: 69,
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  eventCopy: { flex: 1, gap: 3 },
  eventCategory: { ...type.kicker, color: colors.pink },
  eventTitle: { ...type.h3 },
  eventMeta: { ...type.meta, fontSize: 12.5, color: colors.muted },
  eventPrice: {
    ...type.label,
    alignSelf: "flex-start",
    paddingTop: 2,
    textAlign: "right",
  },
});
