import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { dates, events } from "../../src/data";
import {
  AppIcon,
  BrandHeader,
  EventRow,
  MetaRow,
  PrimaryButton,
  Screen,
  SectionTitle,
  Tag,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

export default function DiscoverScreen() {
  const router = useRouter();
  const featured = events[0]!;

  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />

      <View style={styles.heroHeading}>
        <Text style={type.display}>What’s on</Text>
        <Text style={[type.display, { color: colors.pink }]}>this week</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateRail}
      >
        {dates.map(([day, date, month], index) => (
          <Pressable
            key={day}
            style={[styles.dateCell, index === 0 && styles.dateActive]}
          >
            <Text style={styles.dateDay}>{day}</Text>
            <Text style={styles.dateNumber}>{date}</Text>
            <Text style={styles.dateMonth}>{month}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.featureCard}>
        <View style={styles.featureImageWrap}>
          <Image source={featured.image} style={styles.featureImage} />
          <View style={styles.featureTag}>
            <Tag label="Featured · Dance" tone="ink" />
          </View>
        </View>
        <View style={styles.featureCopy}>
          <View style={styles.featureTitleRow}>
            <Text style={[type.h1, { flex: 1 }]}>{featured.title}</Text>
            <Pressable accessibilityLabel="Save event" style={styles.save}>
              <AppIcon name="bookmark-outline" size={21} />
            </Pressable>
          </View>
          <View style={styles.featureMeta}>
            <MetaRow icon="location-outline" pink>
              {featured.venue}
            </MetaRow>
            <MetaRow icon="calendar-outline" pink>
              {featured.date} · 19:00
            </MetaRow>
            <MetaRow icon="accessibility-outline" pink>
              {featured.accessibility}
            </MetaRow>
          </View>
          <View style={styles.featureCta}>
            <View>
              <Text style={styles.priceLabel}>FROM</Text>
              <Text style={styles.price}>{featured.price}</Text>
            </View>
            <View style={styles.ctaButton}>
              <PrimaryButton
                label="Get tickets"
                onPress={() => router.push(`/event/${featured.id}`)}
              />
            </View>
          </View>
        </View>
      </View>

      <SectionTitle
        title="More this week"
        action="See all"
        onAction={() => router.push("/(tabs)/search")}
      />
      {events.slice(1, 3).map((event) => (
        <EventRow
          key={event.id}
          event={event}
          onPress={() => router.push(`/event/${event.id}`)}
        />
      ))}

      <Pressable
        style={styles.organiserLink}
        onPress={() => router.push("/for-organisers")}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.organiserKicker}>MAKE SOMETHING HAPPEN</Text>
          <Text style={type.h3}>Find a space for your own event</Text>
        </View>
        <AppIcon name="arrow-forward" size={19} color={colors.pink} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroHeading: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  dateRail: { paddingHorizontal: spacing.gutter, gap: spacing.sm, paddingBottom: spacing.lg },
  dateCell: {
    width: 58,
    paddingVertical: spacing.md,
    alignItems: "center",
    gap: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  dateActive: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  dateDay: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  dateNumber: { fontSize: 22, lineHeight: 27, fontWeight: "600" },
  dateMonth: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  featureCard: { marginHorizontal: spacing.gutter },
  featureImageWrap: {
    height: 220,
    borderRadius: radii.xs,
    overflow: "hidden",
    backgroundColor: colors.soft,
  },
  featureImage: { width: "100%", height: "100%" },
  featureTag: { position: "absolute", left: spacing.md, top: spacing.md },
  featureCopy: { paddingTop: spacing.md, gap: spacing.sm },
  featureTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  save: { minWidth: 32, minHeight: 32, alignItems: "flex-end" },
  featureMeta: { gap: 0 },
  featureCta: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  priceLabel: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  price: { fontSize: 16, lineHeight: 21, fontWeight: "600" },
  ctaButton: { flex: 1 },
  organiserLink: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    paddingVertical: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  organiserKicker: {
    ...type.kicker,
    color: colors.pink,
    marginBottom: spacing.xs,
  },
});
