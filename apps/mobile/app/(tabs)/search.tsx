import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data";
import { AppIcon, BrandHeader, EventRow, Screen, SectionTitle } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

const categories = ["All", "Today", "Free", "Dance", "Music", "Visual arts"];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      events.filter(
        (event) =>
          (active === "All" || active === "Today" || active === "Free"
            ? true
            : event.category.toLowerCase().includes(active.toLowerCase())) &&
          `${event.title} ${event.venue}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, active],
  );

  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />

      <View style={styles.heading}>
        <Text style={type.h1}>Find your next thing</Text>
        <Text style={styles.sub}>
          Independent events and creative spaces across Bristol.
        </Text>
      </View>

      <View style={styles.searchBar}>
        <AppIcon name="search-outline" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search events, venues or artists"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Pressable
          accessibilityLabel="Filters"
          onPress={() => router.push("/filters")}
          style={styles.filter}
        >
          <AppIcon name="options-outline" size={18} />
        </Pressable>
      </View>

      <View style={styles.chips}>
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <Pressable
              key={category}
              onPress={() => setActive(category)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title={`${filtered.length} events`} action="Map" />
      {filtered.map((event) => (
        <EventRow
          key={event.id}
          event={event}
          onPress={() => router.push(`/event/${event.id}`)}
        />
      ))}
      {filtered.length === 0 ? (
        <View style={styles.noResults}>
          <AppIcon name="search-outline" size={22} color={colors.muted} />
          <Text style={type.h3}>No exact matches</Text>
          <Text style={[styles.sub, styles.noResultsBody]}>
            Try a broader date, category or venue name.
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  sub: { ...type.body, color: colors.muted },
  searchBar: {
    minHeight: 48,
    marginHorizontal: spacing.gutter,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  input: { flex: 1, minHeight: 46, fontSize: 15, color: colors.ink },
  filter: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  chips: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    minHeight: 34,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { ...type.label, color: colors.muted },
  chipTextActive: { color: colors.white },
  noResults: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.sm,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  noResultsBody: { ...type.meta, textAlign: "center" },
});
