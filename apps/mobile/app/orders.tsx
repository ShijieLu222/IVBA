import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, InfoBanner, PageHeader, Screen, SectionTitle } from "../src/ui";
import { colors, type } from "../src/theme";

export default function OrdersScreen() {
  const router = useRouter();
  return <Screen><PageHeader title="Orders & refunds" /><InfoBanner icon="information-circle-outline" title="Clear, traceable payments" body="Each order shows payment, refund and ticket status separately." tone="soft" /><SectionTitle title="Recent" />
    <Pressable style={styles.order} onPress={() => router.push("/ticket/TKT-2817")}><View style={styles.row}><View><Text style={styles.kicker}>PAID · 27 JUL 2026</Text><Text style={type.h2}>Broadmead XP</Text></View><Text style={styles.amount}>£8.80</Text></View><View style={styles.rule} /><View style={styles.row}><View><Text style={styles.meta}>Order AS-10482</Text><Text style={styles.meta}>1 ticket · Visa •••• 4242</Text></View><AppIcon name="chevron-forward" color={colors.pink} /></View></Pressable>
    <View style={styles.help}><AppIcon name="help-circle-outline" size={28} /><View style={{ flex: 1 }}><Text style={type.h3}>Need help with an order?</Text><Text style={styles.meta}>Refund eligibility depends on the organiser’s policy and event status.</Text></View></View>
  </Screen>;
}
const styles = StyleSheet.create({ order: { margin: 20, padding: 18, gap: 16, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.white }, row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }, kicker: { color: colors.success, fontSize: 11, letterSpacing: 1, fontWeight: "900", marginBottom: 5 }, amount: { fontSize: 20, fontWeight: "900" }, rule: { height: 1, backgroundColor: colors.ink }, meta: { color: colors.muted, fontSize: 13, lineHeight: 19 }, help: { margin: 20, paddingTop: 18, flexDirection: "row", gap: 12, borderTopWidth: 2, borderColor: colors.ink } });
