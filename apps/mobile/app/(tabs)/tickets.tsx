import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, BrandHeader, EmptyState, InfoBanner, Screen } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function TicketsScreen() {
  const router = useRouter();
  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />
      <View style={styles.heading}><Text style={type.h1}>Your tickets</Text><Text style={styles.sub}>Ready when you are—even if reception is patchy.</Text></View>
      <InfoBanner icon="cloud-done-outline" title="Available offline" body="Your saved tickets stay on this device for quick entry." tone="soft" />
      <Pressable style={styles.ticket} onPress={() => router.push("/ticket/TKT-2817")}>
        <View style={styles.ticketDate}><Text style={styles.day}>MON</Text><Text style={styles.number}>27</Text><Text style={styles.month}>JUL</Text></View>
        <View style={styles.ticketCopy}><Text style={styles.kicker}>UPCOMING · 1 TICKET</Text><Text style={type.h2}>Broadmead XP</Text><Text style={styles.meta}>The Island · 19:00</Text><Text style={styles.meta}>Order AS-10482</Text></View>
        <AppIcon name="chevron-forward" color={colors.pink} />
      </Pressable>
      <View style={styles.past}><Text style={type.h2}>Past tickets</Text><EmptyState icon="ticket-outline" title="Nothing here yet" body="Past events and cancelled tickets will appear here." action="Discover events" onAction={() => router.replace("/(tabs)")} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { padding: 20, gap: 6 }, sub: { ...type.body, color: colors.muted },
  ticket: { margin: 20, minHeight: 164, padding: 16, flexDirection: "row", alignItems: "center", gap: 16, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.white },
  ticketDate: { width: 74, height: 118, backgroundColor: colors.yellow, borderWidth: 1, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  day: { fontSize: 12, fontWeight: "900" }, number: { fontSize: 38, lineHeight: 43, fontWeight: "900" }, month: { fontSize: 12, fontWeight: "800" },
  ticketCopy: { flex: 1 }, kicker: { color: colors.pink, fontSize: 11, fontWeight: "900", letterSpacing: 0.8, marginBottom: 5 }, meta: { fontSize: 13, color: colors.muted, marginTop: 5 },
  past: { paddingTop: 10, paddingHorizontal: 20 },
});
