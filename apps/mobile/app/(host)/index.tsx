import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { hireRequests } from "../../src/host-data";
import { HostHeader, RequestRow } from "../../src/host-ui";
import { AppIcon, PrimaryButton, Screen, SectionTitle } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function HostTodayScreen() {
  const router = useRouter();
  return <Screen><HostHeader title="Good morning, Maya" />
    <View style={styles.date}><Text style={styles.dateKicker}>MONDAY · 27 JULY</Text><Text style={type.h2}>Today at The Island</Text></View>
    <View style={styles.stats}><Stat value="3" label="New requests" tone="yellow" /><Stat value="2" label="Bookings today" tone="pink" /><Stat value="£1.8k" label="Aug. confirmed" tone="paper" /></View>
    <View style={styles.next}><Text style={styles.nextKicker}>NEXT IN THE BUILDING · 14:30</Text><Text style={type.h2}>Sound check</Text><Text style={styles.nextEvent}>Neighbourhood Shorts · Gallery</Text><View style={styles.nextMeta}><AppIcon name="people-outline" size={18} /><Text style={styles.nextMetaText}>55 expected</Text><AppIcon name="time-outline" size={18} /><Text style={styles.nextMetaText}>14:30–16:00</Text></View><PrimaryButton label="Open booking" tone="black" onPress={() => router.push("/hire-request/HR-2038")} /></View>
    <SectionTitle title="Needs your attention" action="All requests" onAction={() => router.push("/(host)/requests")} />
    {hireRequests.slice(0, 2).map((request) => <RequestRow key={request.id} request={request} onPress={() => router.push(`/hire-request/${request.id}`)} />)}
    <Pressable style={styles.shortcut} onPress={() => router.push("/(host)/calendar")}><View><Text style={styles.shortcutKicker}>AVAILABILITY</Text><Text style={type.h3}>Review and block hire times</Text></View><AppIcon name="arrow-forward" color={colors.pink} /></Pressable>
  </Screen>;
}

function Stat({ value, label, tone }: { value: string; label: string; tone: "yellow" | "pink" | "paper" }) { const bg = tone === "yellow" ? colors.yellow : tone === "pink" ? colors.pink : colors.paper; return <View style={[styles.stat, { backgroundColor: bg }]}><Text style={[styles.statValue, tone === "pink" && { color: colors.white }]}>{value}</Text><Text style={[styles.statLabel, tone === "pink" && { color: colors.white }]}>{label}</Text></View>; }
const styles = StyleSheet.create({ date: { padding: 20, paddingBottom: 14 }, dateKicker: { color: colors.pink, fontSize: 11, fontWeight: "900", letterSpacing: 1 }, stats: { paddingHorizontal: 20, flexDirection: "row" }, stat: { flex: 1, minHeight: 104, padding: 10, justifyContent: "space-between", borderWidth: 1, borderColor: colors.ink }, statValue: { fontSize: 27, fontWeight: "900" }, statLabel: { fontSize: 11, lineHeight: 14, fontWeight: "800" }, next: { margin: 20, padding: 17, gap: 7, backgroundColor: "#DDF4F2", borderWidth: 2, borderColor: colors.ink }, nextKicker: { color: colors.pink, fontSize: 10, fontWeight: "900", letterSpacing: 0.7 }, nextEvent: { color: colors.muted, fontSize: 14 }, nextMeta: { marginVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 }, nextMetaText: { marginRight: 8, fontSize: 12, fontWeight: "700" }, shortcut: { margin: 20, paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink }, shortcutKicker: { color: colors.pink, fontSize: 10, fontWeight: "900", letterSpacing: 1 } });
