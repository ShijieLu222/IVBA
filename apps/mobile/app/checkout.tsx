import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppIcon, InfoBanner, PageHeader, PrimaryButton, Screen } from "../src/ui";
import { colors, type } from "../src/theme";

export default function CheckoutScreen() {
  const router = useRouter();
  const { total = "8" } = useLocalSearchParams<{ total: string }>();
  const [agreed, setAgreed] = useState(true);
  return (
    <Screen>
      <PageHeader eyebrow="STEP 2 OF 2" title="Checkout" />
      <View style={styles.section}><Text style={type.h2}>Your details</Text><Field label="Email" value="ken@example.com" /><Field label="Full name" value="Ken Morgan" /></View>
      <View style={styles.section}><Text style={type.h2}>Pay securely</Text><InfoBanner icon="lock-closed-outline" title="Powered by Stripe" body="Card details are encrypted and never stored by Artspace Lifespace." tone="soft" /><Field label="Card number" value="4242 4242 4242 4242" /><View style={styles.row}><View style={{ flex: 1 }}><Field label="Expiry" value="08/29" /></View><View style={{ flex: 1 }}><Field label="CVC" value="123" /></View></View></View>
      <View style={styles.section}><View style={styles.cost}><Text style={styles.costLabel}>Tickets</Text><Text style={styles.costValue}>£{Number(total).toFixed(2)}</Text></View><View style={styles.cost}><Text style={styles.costLabel}>Booking fee</Text><Text style={styles.costValue}>£0.80</Text></View><View style={[styles.cost, styles.grand]}><Text style={type.h3}>Total</Text><Text style={styles.grandValue}>£{(Number(total) + 0.8).toFixed(2)}</Text></View>
        <Pressable onPress={() => setAgreed(!agreed)} style={styles.checkRow}><View style={[styles.checkbox, agreed && styles.checkboxActive]}>{agreed ? <AppIcon name="checkmark" size={18} color={colors.white} /> : null}</View><Text style={styles.checkText}>I agree to the event refund policy and platform terms.</Text></Pressable>
        <PrimaryButton label={`Pay £${(Number(total) + 0.8).toFixed(2)}`} icon="lock-closed-outline" disabled={!agreed} onPress={() => router.replace("/confirmation")} />
      </View>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput defaultValue={value} style={styles.input} /></View>;
}
const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingBottom: 26, gap: 14 }, field: { gap: 6 }, label: { fontSize: 13, fontWeight: "800" }, input: { height: 52, paddingHorizontal: 14, borderWidth: 1.5, borderColor: colors.ink, backgroundColor: colors.white, fontSize: 16 }, row: { flexDirection: "row", gap: 12 },
  cost: { flexDirection: "row", justifyContent: "space-between" }, costLabel: { ...type.body, color: colors.muted }, costValue: { ...type.body, fontWeight: "700" }, grand: { paddingVertical: 16, borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink }, grandValue: { fontSize: 23, fontWeight: "900" },
  checkRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 }, checkbox: { width: 24, height: 24, borderWidth: 1.5, borderColor: colors.ink, alignItems: "center", justifyContent: "center" }, checkboxActive: { backgroundColor: colors.pink }, checkText: { flex: 1, fontSize: 13, lineHeight: 19 },
});
