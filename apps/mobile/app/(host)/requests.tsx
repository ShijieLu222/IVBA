import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { hireRequests } from "../../src/host-data";
import { HostHeader, RequestRow } from "../../src/host-ui";
import { FilterChip, Screen } from "../../src/ui";
import { colors, spacing, type } from "../../src/theme";

const filters = ["All", "New", "Under review", "Accepted"] as const;

export default function RequestsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible =
    filter === "All"
      ? hireRequests
      : hireRequests.filter((item) => item.status === filter);

  return (
    <Screen>
      <HostHeader title="Hire requests" />

      <View style={styles.summary}>
        <Text style={styles.count}>{visible.length}</Text>
        <Text style={styles.summaryText}>
          {filter === "All"
            ? "active enquiries and bookings"
            : `${filter.toLowerCase()} requests`}
        </Text>
      </View>

      <View style={styles.filters}>
        {filters.map((item) => (
          <FilterChip
            key={item}
            label={item}
            active={filter === item}
            onPress={() => setFilter(item)}
          />
        ))}
      </View>

      {visible.map((request) => (
        <RequestRow
          key={request.id}
          request={request}
          onPress={() => router.push(`/hire-request/${request.id}`)}
        />
      ))}
      {visible.length === 0 ? (
        <Text style={styles.empty}>No requests in this view.</Text>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.sm,
  },
  count: { fontSize: 30, lineHeight: 35, fontWeight: "600" },
  summaryText: { ...type.meta, color: colors.muted },
  filters: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  empty: {
    ...type.meta,
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.xl,
    color: colors.muted,
    textAlign: "center",
  },
});
