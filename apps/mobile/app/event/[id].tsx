import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../../src/data";
import {
  AppIcon,
  Divider,
  InfoBanner,
  MetaRow,
  PageHeader,
  PrimaryButton,
  Screen,
  SectionTitle,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = events.find((item) => item.id === id) ?? events[0]!;

  return (
    <Screen>
      <PageHeader
        title="Event details"
        right={
          <Pressable accessibilityLabel="Save event" style={styles.headerSave}>
            <AppIcon name="bookmark-outline" size={18} />
          </Pressable>
        }
      />

      <Image source={event.image} style={styles.hero} />

      <View style={styles.content}>
        <Text style={styles.category}>{event.category.toUpperCase()}</Text>
        <Text style={type.h1}>{event.title}</Text>
        <Text style={styles.lede}>
          A bold, joyful gathering connecting Bristol through movement, sound and
          shared creative space.
        </Text>
        <View style={styles.metaBlock}>
          <MetaRow icon="calendar-outline" pink>
            {event.date} · {event.time}
          </MetaRow>
          <MetaRow icon="location-outline" pink>
            {event.venue}, Nelson Street, Bristol
          </MetaRow>
          <MetaRow icon="accessibility-outline" pink>
            {event.accessibility}
          </MetaRow>
          <MetaRow icon="ticket-outline" pink>
            {event.price}
          </MetaRow>
        </View>
      </View>

      <InfoBanner
        icon="checkmark-circle-outline"
        title="Tickets available"
        body="Low-cost tickets are still available for this event."
        tone="yellow"
      />

      <SectionTitle title="About this event" />
      <View style={styles.content}>
        <Text style={styles.body}>
          Broadmead XP brings artists and neighbours together for an open,
          welcoming evening at The Island. Expect an energetic live programme, a
          relaxed social space and time to meet the people making work across the
          city.
        </Text>
      </View>

      <Divider />

      <View style={styles.content}>
        <Text style={type.h2}>Good to know</Text>
        <View style={styles.notes}>
          <MetaRow icon="time-outline">Doors open at 18:30</MetaRow>
          <MetaRow icon="people-outline">
            Ages 14+ · under 16s with an adult
          </MetaRow>
          <MetaRow icon="refresh-outline">
            Refunds available up to 48 hours before
          </MetaRow>
        </View>
        <PrimaryButton
          label="Choose tickets"
          onPress={() => router.push(`/ticket-select?event=${event.id}`)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerSave: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
  },
  hero: { width: "100%", height: 250, backgroundColor: colors.soft },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  category: { ...type.kicker, color: colors.pink },
  lede: { ...type.body, color: colors.muted },
  metaBlock: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  body: { ...type.body },
  notes: { paddingVertical: spacing.sm },
});
