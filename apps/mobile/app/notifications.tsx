import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, Screen } from "../src/ui";
import { colors, type } from "../src/theme";

const items = [
  ["ticket-outline", "Your ticket is ready", "Broadmead XP · Order AS-10482", "Just now", true],
  ["time-outline", "Broadmead XP starts tomorrow", "Doors open at 18:30 at The Island.", "Yesterday", true],
  ["bookmark-outline", "A saved event is filling up", "Summer Sounds has fewer than 20 tickets left.", "24 Jul", false],
  ["megaphone-outline", "New at Sparks Bristol", "Four community events were added this week.", "22 Jul", false],
] as const;

export default function NotificationsScreen() {
  const router = useRouter();
  return <Screen><PageHeader title="Notifications" right={<Pressable><Text style={styles.mark}>Mark all read</Text></Pressable>} /><View style={styles.list}>{items.map(([icon, title, body, date, unread]) => <Pressable key={title} onPress={() => title.includes("ticket") && router.push("/ticket/TKT-2817")} style={[styles.item, unread && styles.unread]}><View style={styles.icon}><AppIcon name={icon} /></View><View style={{ flex: 1 }}><View style={styles.row}><Text style={styles.title}>{title}</Text><Text style={styles.date}>{date}</Text></View><Text style={styles.body}>{body}</Text></View>{unread ? <View style={styles.dot} /> : null}</Pressable>)}</View></Screen>;
}
const styles = StyleSheet.create({ mark: { color: colors.pink, fontSize: 12, fontWeight: "800" }, list: { borderTopWidth: 2, borderColor: colors.ink }, item: { minHeight: 104, padding: 18, flexDirection: "row", gap: 12, borderBottomWidth: 1, borderColor: colors.ink, backgroundColor: colors.paper }, unread: { backgroundColor: "#FFF6C7" }, icon: { width: 42, height: 42, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.ink, alignItems: "center", justifyContent: "center" }, row: { flexDirection: "row", gap: 8, justifyContent: "space-between" }, title: { ...type.h3, flex: 1 }, date: { color: colors.muted, fontSize: 11 }, body: { ...type.body, color: colors.muted, marginTop: 4 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.pink } });
