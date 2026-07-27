import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { spaces, venue } from "../../src/host-data";
import { HostHeader } from "../../src/host-ui";
import { AppIcon, Screen, SectionTitle, Tag } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";
import { globalStyles } from "../../src/theme/globalStyles";

export default function VenueScreen() {
  const router = useRouter();

  return (
    <Screen>
      <HostHeader title="Venue & spaces" />

      <View style={styles.venue}>
        <View style={styles.venueTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>PUBLISHED VENUE</Text>
            <Text style={type.h2}>{venue.name}</Text>
          </View>
          <View style={styles.live}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        <Text style={styles.address}>{venue.address}</Text>
        <Text style={styles.venueMeta}>
          {spaces.length} hireable spaces · Profile 92% complete
        </Text>
      </View>

      <SectionTitle title="Hireable spaces" />
      {spaces.map((space) => (
        <Pressable
          key={space.id}
          onPress={() => router.push(`/host-space/${space.id}`)}
          style={({ pressed }) => [styles.space, pressed && globalStyles.pressed]}
        >
          <Image source={space.image} style={styles.image} />
          <View style={styles.copy}>
            <Text style={type.h3}>{space.name}</Text>
            <Text style={styles.summary} numberOfLines={2}>
              {space.summary}
            </Text>
            <View style={styles.facts}>
              <Tag label={space.area} />
              <Tag label={`Up to ${space.standing}`} />
            </View>
            <Text style={styles.price}>{space.price}</Text>
          </View>
        </Pressable>
      ))}

      <Pressable style={styles.add}>
        <AppIcon name="add" size={17} color={colors.muted} />
        <Text style={styles.addText}>Add another space</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  venue: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.xs + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  venueTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  kicker: { ...type.kicker, color: colors.pink, marginBottom: 2 },
  live: {
    flexDirection: "row",
    gap: spacing.xs + 1,
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.xs,
    backgroundColor: "#E7F4EC",
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  liveText: { ...type.kicker, fontSize: 9.5, color: colors.success },
  address: { ...type.meta, color: colors.muted },
  venueMeta: { ...type.meta, fontSize: 12, color: colors.muted },
  space: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md + 2,
    flexDirection: "row",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  copy: { flex: 1, gap: spacing.xs + 1 },
  summary: { ...type.meta, fontSize: 12.5, color: colors.muted },
  facts: { flexDirection: "row", gap: spacing.xs + 2, flexWrap: "wrap" },
  price: { ...type.label, marginTop: 2 },
  add: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    minHeight: 50,
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: radii.xs,
  },
  addText: { ...type.label, color: colors.muted },
});
