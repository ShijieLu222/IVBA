import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, PrimaryButton, Screen, SectionTitle } from "../src/ui";
import { colors, type } from "../src/theme";

const groups = [
  ["When", ["Today", "This week", "This weekend", "Pick a date"]],
  ["Price", ["Free", "Under £10", "Under £20"]],
  ["Category", ["Dance", "Live music", "Visual arts", "Talks & workshops"]],
  ["Access", ["Step-free", "BSL interpreted", "Quiet space", "Relaxed performance"]],
] as const;

export default function FiltersScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(["This week", "Under £20", "Step-free"]);
  const toggle = (item: string) => setSelected((values) => values.includes(item) ? values.filter((value) => value !== item) : [...values, item]);
  return <Screen><PageHeader title="Filters" right={<Pressable onPress={() => setSelected([])}><Text style={styles.clear}>Clear</Text></Pressable>} />
    {groups.map(([title, items]) => <View key={title} style={styles.group}><SectionTitle title={title} />{items.map((item) => { const active = selected.includes(item); return <Pressable key={item} onPress={() => toggle(item)} style={styles.option}><Text style={styles.optionText}>{item}</Text><View style={[styles.check, active && styles.checkActive]}>{active ? <AppIcon name="checkmark" size={17} color={colors.white} /> : null}</View></Pressable>; })}</View>)}
    <View style={styles.footer}><PrimaryButton label="Show 12 events" onPress={() => router.back()} /></View>
  </Screen>;
}
const styles = StyleSheet.create({ clear: { color: colors.pink, fontWeight: "800" }, group: { marginBottom: 8 }, option: { minHeight: 52, marginHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: colors.ink }, optionText: { ...type.body }, check: { width: 24, height: 24, borderWidth: 1.5, borderColor: colors.ink, alignItems: "center", justifyContent: "center" }, checkActive: { backgroundColor: colors.pink }, footer: { padding: 20 } });
