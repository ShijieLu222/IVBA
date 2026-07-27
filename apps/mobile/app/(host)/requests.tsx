import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { hireRequests } from "../../src/host-data";
import { HostHeader, RequestRow } from "../../src/host-ui";
import { Screen } from "../../src/ui";
import { colors } from "../../src/theme";

const filters = ["All", "New", "Under review", "Accepted"] as const;
export default function RequestsScreen() {
  const router = useRouter(); const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? hireRequests : hireRequests.filter((item) => item.status === filter);
  return <Screen><HostHeader title="Hire requests" /><View style={styles.summary}><Text style={styles.count}>{visible.length}</Text><Text style={styles.summaryText}>{filter === "All" ? "active enquiries and bookings" : `${filter.toLowerCase()} requests`}</Text></View><View style={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, filter === item && styles.chipActive]}><Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</View>{visible.map((request) => <RequestRow key={request.id} request={request} onPress={() => router.push(`/hire-request/${request.id}`)} />)}{visible.length === 0 ? <Text style={styles.empty}>No requests in this view.</Text> : null}</Screen>;
}
const styles = StyleSheet.create({ summary: { margin: 20, marginBottom: 10, flexDirection: "row", alignItems: "baseline", gap: 8 }, count: { fontSize: 38, fontWeight: "900" }, summaryText: { color: colors.muted, fontSize: 14 }, filters: { paddingHorizontal: 20, paddingBottom: 8, flexDirection: "row", flexWrap: "wrap", gap: 7 }, chip: { paddingHorizontal: 13, paddingVertical: 9, borderWidth: 1, borderColor: colors.ink }, chipActive: { backgroundColor: colors.ink }, chipText: { fontSize: 12, fontWeight: "800" }, chipTextActive: { color: colors.white }, empty: { margin: 20, paddingVertical: 30, color: colors.muted, textAlign: "center" } });
