import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data";
import { BrandHeader, EventRow, InfoBanner, Screen } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function SavedScreen() {
  const router = useRouter();
  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />
      <View style={styles.heading}><Text style={type.h1}>Saved for later</Text><Text style={styles.sub}>Your shortlist of Bristol events.</Text></View>
      <InfoBanner icon="notifications-outline" title="One useful reminder" body="We’ll tell you if a saved event is nearly sold out or changes time." tone="yellow" />
      <View style={{ marginTop: 14 }}>{events.slice(0, 3).map((event) => <EventRow key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />)}</View>
    </Screen>
  );
}
const styles = StyleSheet.create({ heading: { padding: 20, gap: 6 }, sub: { ...type.body, color: colors.muted } });
