import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { dates, events } from "../../src/data";
import { AppIcon, BrandHeader, EventRow, MetaRow, PrimaryButton, Screen, SectionTitle } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function DiscoverScreen() {
  const router = useRouter();
  const featured = events[0]!;
  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />
      <View style={styles.heroHeading}><Text style={type.display}>What’s on</Text><Text style={[type.display, { color: colors.pink }]}>this week</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRail}>
        {dates.map(([day, date, month], index) => (
          <Pressable key={day} style={[styles.dateCell, index === 0 && styles.dateActive]}>
            <Text style={styles.dateDay}>{day}</Text><Text style={styles.dateNumber}>{date}</Text><Text style={styles.dateMonth}>{month}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.featureCard}>
        <View style={styles.featureImageWrap}>
          <Image source={featured.image} style={styles.featureImage} />
          <Text style={styles.featureLabel}>FEATURED · DANCE</Text>
        </View>
        <View style={styles.featureCopy}>
          <View style={styles.featureTitleRow}><Text style={type.h1}>{featured.title}</Text><Pressable style={styles.save}><AppIcon name="bookmark-outline" size={26} /></Pressable></View>
          <MetaRow icon="location" pink>{featured.venue}</MetaRow>
          <MetaRow icon="calendar-outline" pink>{featured.date} · 19:00</MetaRow>
          <MetaRow icon="accessibility-outline" pink>{featured.accessibility}</MetaRow>
          <View style={styles.featureCta}><Text style={styles.price}>{featured.price}</Text><View style={{ flex: 1 }}><PrimaryButton label="Get tickets" onPress={() => router.push(`/event/${featured.id}`)} /></View></View>
        </View>
      </View>

      <SectionTitle title="More this week" action="See all" onAction={() => router.push("/(tabs)/search")} />
      {events.slice(1, 3).map((event) => <EventRow key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />)}
      <Pressable style={styles.organiserLink} onPress={() => router.push("/for-organisers")}><View><Text style={styles.organiserKicker}>MAKE SOMETHING HAPPEN</Text><Text style={type.h3}>Find a space for your own event</Text></View><AppIcon name="arrow-forward" color={colors.pink} /></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroHeading: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 20 },
  dateRail: { paddingHorizontal: 20, paddingBottom: 24 },
  dateCell: { width: 67, height: 106, alignItems: "center", justifyContent: "center", borderWidth: 1, borderRightWidth: 0, borderColor: colors.ink, backgroundColor: colors.white },
  dateActive: { backgroundColor: colors.yellow, borderWidth: 2 },
  dateDay: { fontSize: 11, fontWeight: "800" }, dateNumber: { fontSize: 34, lineHeight: 39, fontWeight: "900" }, dateMonth: { fontSize: 11, fontWeight: "700" },
  featureCard: { marginHorizontal: 20, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.ink },
  featureImageWrap: { height: 250 }, featureImage: { width: "100%", height: "100%" },
  featureLabel: { position: "absolute", top: 0, left: 0, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.pink, color: colors.white, fontSize: 12, fontWeight: "900", letterSpacing: 0.6 },
  featureCopy: { padding: 16, gap: 3 }, featureTitleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  save: { minWidth: 44, minHeight: 44, alignItems: "flex-end", justifyContent: "center" },
  featureCta: { borderTopWidth: 1, borderColor: colors.ink, marginTop: 12, paddingTop: 14, flexDirection: "row", alignItems: "center", gap: 18 },
  price: { fontSize: 16, fontWeight: "800" },
  organiserLink: { margin: 20, padding: 18, borderWidth: 2, borderColor: colors.ink, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, backgroundColor: colors.yellow },
  organiserKicker: { color: colors.pink, fontSize: 11, letterSpacing: 1, fontWeight: "900", marginBottom: 5 },
});
