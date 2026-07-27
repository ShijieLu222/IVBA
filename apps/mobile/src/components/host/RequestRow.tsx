import { Pressable, StyleSheet, Text, View } from "react-native";

import type { HireRequest } from "../../data/host";
import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { StatusBadge } from "./StatusBadge";

type RequestRowProps = {
  request: HireRequest;
  onPress?: () => void;
};

export function RequestRow({ request, onPress }: RequestRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.request, pressed && globalStyles.pressed]}
    >
      <View style={styles.requestTop}>
        <StatusBadge status={request.status} />
        <Text style={styles.received}>{request.received}</Text>
      </View>
      <Text style={type.h3}>{request.eventName}</Text>
      <Text style={styles.organiser}>{request.organiser}</Text>
      <Text style={styles.detail}>
        {request.date.replace(" 2026", "")} · {request.time}
      </Text>
      <Text style={styles.detail}>
        {request.space} · {request.guests} guests
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  request: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md + 2,
    gap: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  requestTop: {
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  received: { ...type.meta, fontSize: 11.5, color: colors.muted },
  organiser: { ...type.meta, color: colors.muted },
  detail: { ...type.meta, fontSize: 12.5, color: colors.muted },
});
