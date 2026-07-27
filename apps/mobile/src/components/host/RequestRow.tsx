import { Pressable, StyleSheet, Text, View } from "react-native";

import type { HireRequest } from "../../data/host";
import { colors } from "../../theme";
import { AppIcon } from "../icons";
import { StatusBadge } from "./StatusBadge";

type RequestRowProps = {
  request: HireRequest;
  onPress?: () => void;
};

export function RequestRow({ request, onPress }: RequestRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.request, pressed && { opacity: 0.65 }]}
    >
      <View style={styles.requestTop}>
        <StatusBadge status={request.status} />
        <Text style={styles.received}>{request.received}</Text>
      </View>
      <Text style={styles.event}>{request.eventName}</Text>
      <Text style={styles.organiser}>{request.organiser}</Text>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <AppIcon name="calendar-outline" size={17} />
          <Text style={styles.metaText}>
            {request.date.replace(" 2026", "")}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <AppIcon name="time-outline" size={17} />
          <Text style={styles.metaText}>{request.time}</Text>
        </View>
      </View>
      <View style={styles.requestBottom}>
        <Text style={styles.space}>
          {request.space} · {request.guests} guests
        </Text>
        <AppIcon name="chevron-forward" color={colors.pink} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  request: {
    marginHorizontal: 20,
    paddingVertical: 16,
    gap: 5,
    borderBottomWidth: 1,
    borderColor: colors.ink,
  },
  requestTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  received: { color: colors.muted, fontSize: 11 },
  event: { marginTop: 6, fontSize: 18, lineHeight: 22, fontWeight: "800" },
  organiser: { color: colors.muted, fontSize: 13 },
  meta: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12, fontWeight: "600" },
  requestBottom: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  space: { fontSize: 12, fontWeight: "800" },
});
