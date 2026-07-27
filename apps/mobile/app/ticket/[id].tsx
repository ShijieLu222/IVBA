import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, InfoBanner, PageHeader, Screen, SecondaryButton } from "../../src/ui";
import { colors, type } from "../../src/theme";

export default function TicketScreen() {
  const router = useRouter();
  return (
    <Screen>
      <PageHeader title="Your ticket" right={<View style={styles.valid}><Text style={styles.validText}>VALID</Text></View>} />
      <View style={styles.card}>
        <View style={styles.top}><Text style={styles.kicker}>MON 27 JUL · 19:00</Text><Text style={type.h1}>Broadmead XP</Text><Text style={styles.meta}>The Island · Standard admission</Text></View>
        <View style={styles.cutLine}><View style={styles.cutLeft} /><View style={styles.dash} /><View style={styles.cutRight} /></View>
        <View style={styles.qr}><Image source={require("../../assets/artspace/ticket-qr.png")} style={styles.qrImage} /><Text style={styles.ticketId}>TKT-2817</Text><Text style={styles.hint}>Show this code at the entrance</Text></View>
      </View>
      <InfoBanner icon="cloud-done-outline" title="Saved on this device" body="This ticket remains available without an internet connection." tone="soft" />
      <View style={styles.actions}><SecondaryButton label="Add to wallet" icon="wallet-outline" /><SecondaryButton label="View order details" onPress={() => router.push("/orders")} icon="receipt-outline" /></View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  valid: { paddingVertical: 7, paddingHorizontal: 10, backgroundColor: colors.yellow, borderWidth: 1, borderColor: colors.ink }, validText: { fontSize: 12, fontWeight: "900" }, card: { margin: 20, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.white }, top: { padding: 20, gap: 7 }, kicker: { color: colors.pink, fontSize: 12, letterSpacing: 1, fontWeight: "900" }, meta: { ...type.body, color: colors.muted },
  cutLine: { height: 28, flexDirection: "row", alignItems: "center" }, cutLeft: { width: 15, height: 28, borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: colors.paper, borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink }, cutRight: { width: 15, height: 28, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: colors.paper, borderLeftWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink }, dash: { flex: 1, borderTopWidth: 1, borderStyle: "dashed", borderColor: colors.ink },
  qr: { padding: 26, alignItems: "center", gap: 9 }, qrImage: { width: 210, height: 210 }, ticketId: { fontSize: 15, fontWeight: "900", letterSpacing: 2 }, hint: { fontSize: 13, color: colors.muted }, actions: { padding: 20, gap: 12 },
});
