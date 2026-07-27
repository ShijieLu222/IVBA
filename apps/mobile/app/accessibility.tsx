import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { AppIcon, InfoBanner, PageHeader, Screen } from "../src/ui";
import { colors, type } from "../src/theme";

const needs = [["Step-free access", "accessibility-outline"], ["Quiet space", "volume-mute-outline"], ["BSL interpreted", "hand-left-outline"], ["Relaxed performance", "heart-outline"]] as const;
export default function AccessibilityScreen() {
  const [selected, setSelected] = useState(["Step-free access", "Quiet space"]);
  return <Screen><PageHeader title="Accessibility" /><InfoBanner icon="information-circle-outline" title="Your preferences stay private" body="We use them only to make relevant access information easier to find." tone="yellow" /><View style={styles.copy}><Text style={type.h2}>Make access info easier to spot</Text><Text style={styles.body}>Choose the details you want highlighted across event and venue pages.</Text></View><View style={styles.list}>{needs.map(([label, icon]) => { const active = selected.includes(label); return <View key={label} style={styles.row}><View style={styles.left}><AppIcon name={icon} /><Text style={styles.label}>{label}</Text></View><Switch value={active} onValueChange={() => setSelected((items) => active ? items.filter((item) => item !== label) : [...items, label])} trackColor={{ false: "#C8C3BB", true: colors.pink }} thumbColor={colors.white} /></View>; })}</View></Screen>;
}
const styles = StyleSheet.create({ copy: { padding: 20, gap: 7 }, body: { ...type.body, color: colors.muted }, list: { marginHorizontal: 20, borderTopWidth: 2, borderColor: colors.ink }, row: { minHeight: 64, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: colors.ink }, left: { flexDirection: "row", alignItems: "center", gap: 12 }, label: { fontSize: 16, fontWeight: "700" } });
