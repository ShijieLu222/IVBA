import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../../src/data";
import { AppIcon, InfoBanner, MetaRow, PageHeader, PrimaryButton, Screen, SectionTitle } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = events.find((item) => item.id === id) ?? events[0]!;
  return (
    <Screen>
      <PageHeader title="Event details" right={<Pressable style={styles.headerSave}><AppIcon name="bookmark-outline" /></Pressable>} />
      <Image source={event.image} style={styles.hero} />
      <View style={styles.content}>
        <Text style={styles.category}>{event.category.toUpperCase()}</Text>
        <Text style={type.h1}>{event.title}</Text>
        <Text style={styles.lede}>A bold, joyful gathering connecting Bristol through movement, sound and shared creative space.</Text>
        <View style={styles.metaBlock}>
          <MetaRow icon="calendar-outline" pink>{event.date} · {event.time}</MetaRow>
          <MetaRow icon="location-outline" pink>{event.venue}, Nelson Street, Bristol</MetaRow>
          <MetaRow icon="accessibility-outline" pink>{event.accessibility}</MetaRow>
          <MetaRow icon="ticket-outline" pink>{event.price}</MetaRow>
        </View>
      </View>
      <InfoBanner icon="checkmark-circle-outline" title="Tickets available" body="Low-cost tickets are still available for this event." tone="yellow" />
      <View style={styles.content}>
        <SectionTitle title="About this event" />
        <Text style={styles.body}>Broadmead XP brings artists and neighbours together for an open, welcoming evening at The Island. Expect an energetic live programme, a relaxed social space and time to meet the people making work across the city.</Text>
        <View style={styles.rule} />
        <Text style={type.h2}>Good to know</Text>
        <MetaRow icon="time-outline">Doors open at 18:30</MetaRow>
        <MetaRow icon="people-outline">Ages 14+ · under 16s with an adult</MetaRow>
        <MetaRow icon="refresh-outline">Refunds available up to 48 hours before</MetaRow>
        <PrimaryButton label="Choose tickets" onPress={() => router.push(`/ticket-select?event=${event.id}`)} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  headerSave: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.ink }, hero: { width: "100%", height: 290 },
  content: { padding: 20, gap: 11 }, category: { color: colors.pink, fontSize: 12, letterSpacing: 1, fontWeight: "900" }, lede: { ...type.body, color: colors.muted },
  metaBlock: { marginTop: 10, paddingVertical: 12, borderTopWidth: 2, borderBottomWidth: 1, borderColor: colors.ink, gap: 4 },
  body: { ...type.body }, rule: { height: 2, backgroundColor: colors.ink, marginVertical: 12 },
});
