import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data";
import { AppIcon, BrandHeader, EventRow, Screen, SectionTitle } from "../../src/ui";
import { colors, type } from "../../src/theme";

const categories = ["All", "Today", "Free", "Dance", "Music", "Visual arts"];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => events.filter((event) => (active === "All" || active === "Today" || active === "Free" ? true : event.category.toLowerCase().includes(active.toLowerCase())) && `${event.title} ${event.venue}`.toLowerCase().includes(query.toLowerCase())), [query, active]);
  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />
      <View style={styles.heading}><Text style={type.h1}>Find your next thing</Text><Text style={styles.sub}>Independent events and creative spaces across Bristol.</Text></View>
      <View style={styles.searchBar}><AppIcon name="search" /><TextInput value={query} onChangeText={setQuery} placeholder="Search events, venues or artists" placeholderTextColor={colors.muted} style={styles.input} /><Pressable onPress={() => router.push("/filters")} style={styles.filter}><AppIcon name="options-outline" color={colors.white} /></Pressable></View>
      <View style={styles.chips}>{categories.map((category) => <Pressable key={category} onPress={() => setActive(category)} style={[styles.chip, active === category && styles.chipActive]}><Text style={[styles.chipText, active === category && styles.chipTextActive]}>{category}</Text></Pressable>)}</View>
      <SectionTitle title={`${filtered.length} events`} action="Map" />
      {filtered.map((event) => <EventRow key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />)}
      {filtered.length === 0 ? <View style={styles.noResults}><AppIcon name="search-outline" size={36} /><Text style={type.h2}>No exact matches</Text><Text style={styles.sub}>Try a broader date, category or venue name.</Text></View> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { padding: 20, gap: 7 }, sub: { ...type.body, color: colors.muted },
  searchBar: { minHeight: 56, marginHorizontal: 20, paddingLeft: 14, flexDirection: "row", alignItems: "center", borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.white },
  input: { flex: 1, minHeight: 52, paddingHorizontal: 11, fontSize: 15, color: colors.ink }, filter: { width: 52, minHeight: 52, alignItems: "center", justifyContent: "center", backgroundColor: colors.pink },
  chips: { paddingHorizontal: 20, paddingTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { minHeight: 40, paddingHorizontal: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.ink, backgroundColor: colors.white },
  chipActive: { backgroundColor: colors.yellow, borderWidth: 2 }, chipText: { fontSize: 13, fontWeight: "700" }, chipTextActive: { fontWeight: "900" },
  noResults: { padding: 32, margin: 20, gap: 10, alignItems: "center", borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink },
});
