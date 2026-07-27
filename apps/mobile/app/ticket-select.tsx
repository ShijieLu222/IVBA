import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../src/data";
import { AppIcon, InfoBanner, PageHeader, PrimaryButton, Screen } from "../src/ui";
import { colors, type } from "../src/theme";

function Stepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <View style={styles.stepper}><Pressable style={styles.stepButton} onPress={() => onChange(Math.max(0, value - 1))}><AppIcon name="remove" /></Pressable><Text style={styles.count}>{value}</Text><Pressable style={styles.stepButton} onPress={() => onChange(Math.min(6, value + 1))}><AppIcon name="add" /></Pressable></View>;
}

export default function TicketSelectScreen() {
  const { event: id } = useLocalSearchParams<{ event: string }>();
  const router = useRouter();
  const event = events.find((item) => item.id === id) ?? events[0]!;
  const [standard, setStandard] = useState(1);
  const [supporter, setSupporter] = useState(0);
  const total = standard * 8 + supporter * 14;
  return (
    <Screen>
      <PageHeader eyebrow="STEP 1 OF 2" title="Choose tickets" />
      <View style={styles.summary}><Text style={type.h2}>{event.title}</Text><Text style={styles.meta}>{event.venue}</Text><Text style={styles.meta}>{event.date} · {event.time}</Text></View>
      <InfoBanner icon="time-outline" title="Tickets held for 10 minutes" body="Your place is reserved while you complete checkout." tone="yellow" />
      <View style={styles.list}>
        <View style={styles.ticketType}><View style={styles.typeCopy}><Text style={type.h3}>Standard</Text><Text style={styles.description}>General admission</Text><Text style={styles.price}>£8.00</Text></View><Stepper value={standard} onChange={setStandard} /></View>
        <View style={styles.ticketType}><View style={styles.typeCopy}><Text style={type.h3}>Supporter</Text><Text style={styles.description}>Includes a £6 donation to Artspace Lifespace</Text><Text style={styles.price}>£14.00</Text></View><Stepper value={supporter} onChange={setSupporter} /></View>
      </View>
      <View style={styles.total}><Text style={type.h3}>Total</Text><Text style={styles.totalPrice}>£{total.toFixed(2)}</Text></View>
      <View style={styles.actions}><PrimaryButton label="Continue to checkout" onPress={() => router.push(`/checkout?event=${event.id}&total=${total}`)} disabled={total === 0} /></View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  summary: { paddingHorizontal: 20, paddingBottom: 20, gap: 4 }, meta: { color: colors.muted, fontSize: 14 }, list: { margin: 20, borderTopWidth: 2, borderColor: colors.ink },
  ticketType: { minHeight: 138, paddingVertical: 18, flexDirection: "row", alignItems: "center", gap: 14, borderBottomWidth: 1, borderColor: colors.ink }, typeCopy: { flex: 1, gap: 4 }, description: { color: colors.muted, fontSize: 13, lineHeight: 18 }, price: { fontSize: 17, fontWeight: "800", marginTop: 5 },
  stepper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.ink }, stepButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" }, count: { width: 34, textAlign: "center", fontSize: 17, fontWeight: "800" },
  total: { marginHorizontal: 20, paddingVertical: 16, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 2, borderBottomWidth: 2, borderColor: colors.ink }, totalPrice: { fontSize: 22, fontWeight: "900" }, actions: { padding: 20 },
});
